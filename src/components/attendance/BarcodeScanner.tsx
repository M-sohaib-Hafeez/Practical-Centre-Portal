import React, { useState, useRef, useEffect } from 'react';
import { ShiftType, Student, AttendanceStatus } from '../../types';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { calculateAttendanceStatus } from '../../utils/institutionRules';
import { ScanLine, CheckCircle2, AlertTriangle, User, Clock, ArrowRight } from 'lucide-react';

interface BarcodeScannerProps {
  date: string;
  shift: ShiftType;
  section: string;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ date, shift, section }) => {
  const { students, attendance, markAttendance } = useDemoData();
  const { showToast } = useToast();

  const [inputVal, setInputVal] = useState('');
  const [selectedSimStudent, setSelectedSimStudent] = useState('');
  const [scanResult, setScanResult] = useState<{
    status: 'success' | 'duplicate' | 'not-found';
    student?: Student;
    attendanceStatus?: AttendanceStatus;
    scannedTime?: string;
    message?: string;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus barcode input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const relevantStudents = students.filter(
    (s) => s.shift === shift && (section === 'All' || s.section === section)
  );

  const processScan = (rawScan: string) => {
    const clean = rawScan.trim().toUpperCase();
    if (!clean) return;

    // Match student by ID or roll number
    const matched = students.find(
      (s) => s.id.toUpperCase() === clean || s.rollNumber === clean
    );

    const now = new Date();
    const timeHHMM = now.toTimeString().substring(0, 5); // e.g. "15:32" or "18:45"
    // Use realistic simulated shift time if outside shift window
    const effectiveTime = shift === 'Morning' ? '15:34' : '18:28';

    if (!matched) {
      setScanResult({
        status: 'not-found',
        message: `Student barcode ID "${rawScan}" was not found in institutional database.`,
      });
      setInputVal('');
      return;
    }

    // Check duplicate scan for this date and shift
    const existing = attendance.find(
      (a) => a.studentId === matched.id && a.date === date && a.shift === shift
    );

    if (existing) {
      setScanResult({
        status: 'duplicate',
        student: matched,
        attendanceStatus: existing.status,
        scannedTime: existing.arrivalTime || existing.markedAt,
        message: `Already marked as ${existing.status} at ${existing.arrivalTime || existing.markedAt}. Duplicate scan ignored.`,
      });
      setInputVal('');
      return;
    }

    // Determine status (Present vs Late)
    const attStatus = calculateAttendanceStatus(effectiveTime, shift);

    markAttendance({
      studentId: matched.id,
      date,
      shift,
      section: matched.section,
      status: attStatus,
      method: 'Scanner',
      arrivalTime: effectiveTime,
      notes: `Scanned via Physical Optical Reader (${attStatus})`,
    });

    setScanResult({
      status: 'success',
      student: matched,
      attendanceStatus: attStatus,
      scannedTime: effectiveTime,
      message: `Verified and marked ${attStatus} for Section ${matched.section}.`,
    });

    showToast({
      type: 'success',
      title: `Attendance Marked: ${matched.name}`,
      message: `${attStatus} (${effectiveTime}) • Section ${matched.section}`,
    });

    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processScan(inputVal);
  };

  const handleSimulateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedSimStudent(val);
    if (val) {
      processScan(val);
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Control Container */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ScanLine className="w-5 h-5 text-blue-700" />
              Smart ID Barcode / RFID Hardware Reader
            </h3>
            <p className="text-xs text-slate-500">
              Input is auto-focused. Compatible with standard USB wedge laser scanners and numeric keypads.
            </p>
          </div>

          {/* Quick Simulate dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Quick Simulation:</span>
            <select
              value={selectedSimStudent}
              onChange={handleSimulateSelect}
              className="text-xs font-medium border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              <option value="">-- Choose student to simulate scan --</option>
              {relevantStudents.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.id} - Sec {st.section})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Real Scan Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Awaiting barcode reader pulse (e.g. PC-2026-A1-042 or 042)..."
              className="w-full text-sm font-mono px-4 py-3 bg-slate-50 border-2 border-dashed border-blue-400 focus:border-blue-700 focus:bg-white rounded-xl focus:outline-none transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-3 top-3 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
              READY
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
          >
            Submit Pulse <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Visual Feedback Display */}
      {scanResult && (
        <div
          className={`p-6 rounded-2xl border transition-all duration-300 animate-in zoom-in-95 ${
            scanResult.status === 'success'
              ? scanResult.attendanceStatus === 'Present'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
              : scanResult.status === 'duplicate'
              ? 'bg-blue-50 border-blue-200 text-blue-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar block */}
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl shadow-md shrink-0 border ${
                scanResult.status === 'success'
                  ? scanResult.attendanceStatus === 'Present'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-amber-600 text-white border-amber-500'
                  : scanResult.status === 'duplicate'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-rose-600 text-white border-rose-500'
              }`}
            >
              {scanResult.student?.photoInitial || '!'}
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span
                  className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                    scanResult.status === 'success'
                      ? scanResult.attendanceStatus === 'Present'
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-amber-200 text-amber-900'
                      : scanResult.status === 'duplicate'
                      ? 'bg-blue-200 text-blue-900'
                      : 'bg-rose-200 text-rose-900'
                  }`}
                >
                  {scanResult.status === 'success'
                    ? scanResult.attendanceStatus
                    : scanResult.status === 'duplicate'
                    ? 'Duplicate Prevented'
                    : 'Card Not Recognized'}
                </span>
                <span className="text-xs font-mono font-semibold opacity-75">
                  Arrival: {scanResult.scannedTime || 'Now'}
                </span>
              </div>

              <h4 className="text-xl font-black text-slate-900">
                {scanResult.student?.name || 'Unknown Identification'}
              </h4>

              {scanResult.student && (
                <p className="text-xs font-medium text-slate-600">
                  Roll # {scanResult.student.rollNumber} • {scanResult.student.classLevel} (
                  {scanResult.student.stream}) • Section {scanResult.student.section}
                </p>
              )}

              <p className="text-xs opacity-90 pt-1 font-medium">{scanResult.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
