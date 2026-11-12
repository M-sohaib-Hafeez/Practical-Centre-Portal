import React, { useState } from 'react';
import { Student, ShiftType, AttendanceRecord } from '../../types';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { calculateAttendanceStatus } from '../../utils/institutionRules';
import { Wifi, Search, CheckCircle2, AlertCircle, Laptop, Smartphone, HelpCircle } from 'lucide-react';

interface MacDetectorProps {
  date: string;
  shift: ShiftType;
  section: string;
}

export const MacDetector: React.FC<MacDetectorProps> = ({ date, shift, section }) => {
  const { students, attendance, batchMarkAttendance } = useDemoData();
  const { showToast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [detectedDevices, setDetectedDevices] = useState<
    {
      mac: string;
      hostname: string;
      signalDbm: number;
      matchedStudent?: Student;
      selected: boolean;
    }[]
  >([]);

  // Filter students by current shift and section
  const sectionStudents = students.filter(
    (s) => s.shift === shift && (section === 'All' || s.section === section)
  );

  const handleDetectDevices = () => {
    setIsScanning(true);

    setTimeout(() => {
      // Simulate gateway AP scan
      const detected: {
        mac: string;
        hostname: string;
        signalDbm: number;
        matchedStudent?: Student;
        selected: boolean;
      }[] = sectionStudents.map((st, idx) => ({
        mac: st.macAddress,
        hostname: `${st.name.split(' ')[0]}-${st.deviceModel.replace(/\s+/g, '')}`,
        signalDbm: -45 - Math.floor(Math.random() * 25),
        matchedStudent: st,
        selected: idx < 8, // select majority by default
      }));

      // Add a couple of unknown/guest devices on the campus router
      detected.push({
        mac: '00:1A:2B:3C:4D:5E',
        hostname: 'Guest-Infinix-Hot',
        signalDbm: -72,
        matchedStudent: undefined,
        selected: false,
      });

      setDetectedDevices(detected);
      setIsScanning(false);
      showToast({
        type: 'info',
        title: 'Wi-Fi Gateway Scan Complete',
        message: `Detected ${detected.length} active device BSSIDs on campus access point.`,
      });
    }, 900);
  };

  const toggleSelect = (mac: string) => {
    setDetectedDevices((prev) =>
      prev.map((d) => (d.mac === mac ? { ...d, selected: !d.selected } : d))
    );
  };

  const handleApplyMacAttendance = () => {
    const selected = detectedDevices.filter((d) => d.selected && d.matchedStudent);
    if (selected.length === 0) {
      showToast({
        type: 'warning',
        title: 'No Matching Devices Selected',
        message: 'Select at least one registered student device to mark attendance.',
      });
      return;
    }

    const arrivalTime = shift === 'Morning' ? '15:28' : '18:25';
    const status = calculateAttendanceStatus(arrivalTime, shift);

    const records: Omit<AttendanceRecord, 'id' | 'markedAt'>[] = selected.map((d) => ({
      studentId: d.matchedStudent!.id,
      date,
      shift,
      section: d.matchedStudent!.section,
      status,
      arrivalTime,
      method: 'MAC-Detection',
      notes: `Auto-verified via campus AP (${d.hostname}) [MAC: ${d.mac}]`,
    }));

    batchMarkAttendance(records);
    showToast({
      type: 'success',
      title: 'Attendance Auto-Marked',
      message: `Marked ${records.length} students as ${status} from Wi-Fi MAC telemetry.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Technical note */}
      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-3">
        <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Wi-Fi Gateway Simulation Notice:</span>
          <p className="text-blue-800/90 mt-0.5">
            Modern web browsers cannot read device MAC addresses directly due to security sandboxing. In production, Practical Centre runs a Python daemon on the Mikrotik / Cisco campus gateway router that ingests DHCP lease logs and posts device MACs to this API.
          </p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-teal-600" />
            Campus Wi-Fi AP Lease Scanner
          </h4>
          <p className="text-xs text-slate-500">
            Scanning 5GHz campus access points for {shift} shift (Section: {section})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDetectDevices}
            disabled={isScanning}
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs disabled:opacity-50"
          >
            <Search className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Querying Router Gateway...' : 'Detect Active Devices'}
          </button>

          {detectedDevices.length > 0 && (
            <button
              type="button"
              onClick={handleApplyMacAttendance}
              className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Apply Attendance ({detectedDevices.filter((d) => d.selected && d.matchedStudent).length})
            </button>
          )}
        </div>
      </div>

      {/* Detected Devices List */}
      {detectedDevices.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700 uppercase">
            <span>Detected Gateway Hardware</span>
            <span>Matched Student / Roll #</span>
            <span>Signal & Status</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {detectedDevices.map((device) => {
              const student = device.matchedStudent;
              const alreadyMarked = student
                ? attendance.find(
                    (a) => a.studentId === student.id && a.date === date && a.shift === shift
                  )
                : undefined;

              return (
                <div
                  key={device.mac}
                  onClick={() => student && toggleSelect(device.mac)}
                  className={`p-3.5 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    device.selected ? 'bg-teal-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={device.selected}
                      disabled={!student}
                      onChange={() => student && toggleSelect(device.mac)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-900">{device.hostname}</span>
                      </div>
                      <p className="font-mono text-[11px] text-slate-500">{device.mac}</p>
                    </div>
                  </div>

                  <div className="text-left">
                    {student ? (
                      <div>
                        <p className="font-bold text-slate-900">{student.name}</p>
                        <p className="text-[11px] font-mono text-blue-700">
                          {student.id} • Sec {student.section}
                        </p>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[11px]">
                        <AlertCircle className="w-3 h-3 text-amber-500" /> Unknown device (Unregistered MAC)
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[11px] text-slate-500">
                      {device.signalDbm} dBm
                    </span>
                    {alreadyMarked && (
                      <p className="text-[10px] font-bold text-emerald-600 mt-0.5">
                        Marked: {alreadyMarked.status}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
