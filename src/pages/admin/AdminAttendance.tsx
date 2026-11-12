import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { isCohortDayValid } from '../../utils/institutionRules';
import { ShiftType, CohortType, AttendanceStatus } from '../../types';
import { MacDetector } from '../../components/attendance/MacDetector';
import { BarcodeScanner } from '../../components/attendance/BarcodeScanner';
import {
  UserCheck,
  Wifi,
  ScanLine,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Send,
  HelpCircle,
  Filter,
} from 'lucide-react';

export const AdminAttendance: React.FC = () => {
  const { students, attendance, markAttendance, finalizeAttendance } = useDemoData();
  const { showToast } = useToast();

  const [date, setDate] = useState('2026-11-10'); // Tuesday (Male cohort day)
  const [shift, setShift] = useState<ShiftType>('Morning');
  const [section, setSection] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'mac' | 'scanner' | 'roster'>('mac');

  // Check cohort day validity
  const currentCohort: CohortType = shift === 'Morning' ? 'Male' : 'Female';
  const cohortCheck = isCohortDayValid(date, currentCohort);

  // Filter students for chosen shift & section
  const filteredStudents = students.filter(
    (s) => s.shift === shift && (section === 'All' || s.section === section)
  );

  // Finalize attendance handler
  const handleFinalize = () => {
    const res = finalizeAttendance({ date, shift, section });
    showToast({
      type: 'sms',
      title: 'Attendance Finalized for Session',
      message: `Marked ${res.absentCount} unmarked students as Absent. Dispatched ${res.newMessages.length} parent notifications.`,
      duration: 6000,
    });
  };

  const handleManualOverride = (studentId: string, currentStatus: AttendanceStatus) => {
    const nextStatus: AttendanceStatus =
      currentStatus === 'Present' ? 'Late' : currentStatus === 'Late' ? 'Absent' : 'Present';

    const targetStudent = students.find((s) => s.id === studentId);
    if (!targetStudent) return;

    markAttendance({
      studentId,
      date,
      shift,
      section: targetStudent.section,
      status: nextStatus,
      method: 'Manual',
      arrivalTime: nextStatus === 'Present' ? '15:25' : nextStatus === 'Late' ? '15:48' : undefined,
      notes: `Admin manual override to ${nextStatus}`,
    });

    showToast({
      type: 'info',
      title: 'Manual Status Updated',
      message: `${targetStudent.name} is now ${nextStatus}`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-900" />
            Attendance Management & Wi-Fi / Scanner Hub
          </h1>
          <p className="text-xs text-slate-500">
            Log student arrivals within the 20-minute grace window. Finalizing triggers automatic parent SMS alerts.
          </p>
        </div>

        {/* Finalize Button */}
        <button
          type="button"
          onClick={handleFinalize}
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors active:scale-95 self-start md:self-auto"
        >
          <Send className="w-4 h-4" /> Finalize Session & Notify Parents
        </button>
      </div>

      {/* Cohort Rule Warning Notice */}
      {cohortCheck.warning && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-950 flex items-start gap-3 animate-in shake">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Cohort Timetable Alert: {cohortCheck.dayName}</p>
            <p className="text-amber-900">{cohortCheck.warning}</p>
            <p className="text-[11px] text-amber-800 font-semibold mt-1">
              • Male Students Attend: Monday – Wednesday | Female Students Attend: Thursday – Saturday
            </p>
          </div>
        </div>
      )}

      {/* Control Bar: Date, Shift, Section */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-900" /> Session Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-700" /> Shift & Timing Window
          </label>
          <select
            value={shift}
            onChange={(e) => {
              setShift(e.target.value as ShiftType);
              setSection('All');
            }}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
          >
            <option value="Morning">Morning Shift: 15:20 – 18:00 (Cutoff 15:40 • Sec A, A1, A2)</option>
            <option value="Evening">Night Shift: 18:20 – 21:00 (Cutoff 18:40 • Sec C, C1, C2)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-indigo-700" /> Section Filter
          </label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
          >
            <option value="All">All Sections in {shift} Shift</option>
            {shift === 'Morning' ? (
              <>
                <option value="A1">Section A1 (Pre-Engineering)</option>
                <option value="A2">Section A2 (Pre-Medical)</option>
                <option value="A">Section A (Computer Science / General)</option>
              </>
            ) : (
              <>
                <option value="C1">Section C1 (Computer Science / Pre-Eng)</option>
                <option value="C2">Section C2 (Pre-Medical)</option>
                <option value="C">Section C (Commerce)</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Tabs: MAC Detector | Barcode Scanner | Live Roster */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('mac')}
          className={`px-5 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'mac'
              ? 'border-teal-600 text-teal-900 bg-teal-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wifi className="w-4 h-4 text-teal-600" />
          <span>Wi-Fi Gateway MAC Simulator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('scanner')}
          className={`px-5 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'scanner'
              ? 'border-blue-900 text-blue-950 bg-blue-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ScanLine className="w-4 h-4 text-blue-900" />
          <span>Barcode / RFID Optical Scanner</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('roster')}
          className={`px-5 py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'roster'
              ? 'border-indigo-900 text-indigo-950 bg-indigo-50/50'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Live Session Roster ({filteredStudents.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'mac' && (
        <MacDetector date={date} shift={shift} section={section} />
      )}

      {activeTab === 'scanner' && (
        <BarcodeScanner date={date} shift={shift} section={section} />
      )}

      {/* Live Roster Table (also visible under Roster tab or below) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              Session Enrollment Roster: {date} ({shift} Shift)
            </h3>
            <p className="text-xs text-slate-500">
              Showing students enrolled in section {section}. Click any status to cycle override (Present &rarr; Late &rarr; Absent).
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            {filteredStudents.length} Students Active
          </span>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="p-3">Student Name & Roll</th>
                <th className="p-3">Class & Section</th>
                <th className="p-3">Device MAC Address</th>
                <th className="p-3">Arrival Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Manual Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No students found for this shift and section.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => {
                  const record = attendance.find(
                    (a) => a.studentId === st.id && a.date === date && a.shift === shift
                  );
                  const status = record?.status || 'Unmarked';

                  return (
                    <tr key={st.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {st.photoInitial}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{st.name}</p>
                            <p className="text-[11px] font-mono text-slate-500">
                              {st.id} (#{st.rollNumber})
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3">
                        <p className="font-semibold text-slate-800">{st.classLevel}</p>
                        <p className="text-[10px] text-blue-700 font-bold">Sec {st.section} • {st.stream}</p>
                      </td>

                      <td className="p-3">
                        <p className="font-mono text-[11px] text-slate-600">{st.macAddress}</p>
                        <p className="text-[10px] text-slate-400">{st.deviceModel}</p>
                      </td>

                      <td className="p-3 font-mono font-medium text-slate-700">
                        {record?.arrivalTime || '—'}
                      </td>

                      <td className="p-3">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800'
                              : status === 'Late'
                              ? 'bg-amber-100 text-amber-800'
                              : status === 'Absent'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleManualOverride(st.id, (record?.status || 'Absent'))}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold text-[11px] text-slate-700 transition-colors"
                        >
                          Toggle Status
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
