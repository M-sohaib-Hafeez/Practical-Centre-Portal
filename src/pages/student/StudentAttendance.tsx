import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import {
  CalendarCheck2,
  Calendar as CalendarIcon,
  List,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wifi,
  ScanLine,
  ShieldAlert,
} from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const { student } = useAuth();
  const { attendance } = useDemoData();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  if (!student) {
    return <div className="p-8 text-center text-slate-500">Student session not found.</div>;
  }

  // Attendance records for this student
  const studentRecords = attendance
    .filter((a) => a.studentId === student.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const presentCount = studentRecords.filter((a) => a.status === 'Present').length;
  const lateCount = studentRecords.filter((a) => a.status === 'Late').length;
  const absentCount = studentRecords.filter((a) => a.status === 'Absent').length;
  const totalSessions = studentRecords.length;
  const percentage = totalSessions > 0 ? Math.round(((presentCount + lateCount) / totalSessions) * 100) : 94;

  // Calendar dates for November 2026 (1st is Sunday, 30 days)
  const daysInNov = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-11-${String(dayNum).padStart(2, '0')}`;
    const record = studentRecords.find((r) => r.date === dateStr);
    const dateObj = new Date(`2026-11-${String(dayNum).padStart(2, '0')}T12:00:00`);
    const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon ...
    return {
      dayNum,
      dateStr,
      record,
      dayOfWeek,
      isSunday: dayOfWeek === 0,
      isCohortDay:
        student.cohort === 'Male'
          ? dayOfWeek >= 1 && dayOfWeek <= 3
          : dayOfWeek >= 4 && dayOfWeek <= 6,
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck2 className="w-5 h-5 text-blue-900" />
            My Attendance Record
          </h1>
          <p className="text-xs text-slate-500">
            {student.cohort} Cohort ({student.cohort === 'Male' ? 'Mon – Wed' : 'Thu – Sat'}) • {student.shift} Shift
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200">
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'calendar'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" /> Calendar View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" /> List View
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Overall Rate</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{percentage}%</p>
          <p className={`text-[11px] font-semibold mt-0.5 ${percentage >= 80 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {percentage >= 80 ? '✓ Compliant with Board Rule' : '⚠ Warning: Below 80%'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Present Sessions</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{presentCount}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">On-time entries</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Late Arrivals</span>
          <p className="text-2xl font-black text-amber-700 mt-1">{lateCount}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">After 20-min cutoff</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Absences</span>
          <p className="text-2xl font-black text-rose-700 mt-1">{absentCount}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Parent SMS generated</p>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">November 2026 Academic Calendar</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Late
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Absent
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="font-bold text-slate-500 py-1 uppercase text-[11px]">
                {d}
              </div>
            ))}

            {daysInNov.map((day) => {
              const status = day.record?.status;

              return (
                <div
                  key={day.dayNum}
                  className={`min-h-[72px] p-2 rounded-xl border flex flex-col justify-between text-left transition-colors ${
                    status === 'Present'
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : status === 'Late'
                      ? 'bg-amber-50/70 border-amber-200'
                      : status === 'Absent'
                      ? 'bg-rose-50/70 border-rose-200'
                      : day.isSunday
                      ? 'bg-slate-100/50 border-slate-200/50 text-slate-400'
                      : day.isCohortDay
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-white border-slate-100 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{day.dayNum}</span>
                    {day.isSunday && <span className="text-[9px] font-semibold">Closed</span>}
                  </div>

                  {status && (
                    <div className="mt-1">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          status === 'Present'
                            ? 'bg-emerald-200/80 text-emerald-900'
                            : status === 'Late'
                            ? 'bg-amber-200/80 text-amber-900'
                            : 'bg-rose-200/80 text-rose-900'
                        }`}
                      >
                        {status}
                      </span>
                      {day.record?.arrivalTime && (
                        <p className="text-[10px] font-mono text-slate-500 mt-1">
                          {day.record.arrivalTime}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Attendance Log History</h3>
            <span className="text-xs text-slate-500 font-mono">{studentRecords.length} sessions recorded</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {studentRecords.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No attendance logs available.</div>
            ) : (
              studentRecords.map((rec) => (
                <div key={rec.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        rec.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.status === 'Late'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {rec.status === 'Present' && <CheckCircle2 className="w-4 h-4" />}
                      {rec.status === 'Late' && <Clock className="w-4 h-4" />}
                      {rec.status === 'Absent' && <AlertTriangle className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{rec.date}</span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            rec.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800'
                              : rec.status === 'Late'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Shift: {rec.shift} ({rec.section}) • Arrival Time:{' '}
                        <span className="font-mono font-semibold">{rec.arrivalTime || 'N/A'}</span>
                      </p>
                      {rec.notes && <p className="text-[11px] text-slate-600 italic mt-0.5">{rec.notes}</p>}
                    </div>
                  </div>

                  <div className="text-right sm:text-right text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                      {rec.method === 'MAC-Detection' && <Wifi className="w-3 h-3 text-teal-600" />}
                      {rec.method === 'Scanner' && <ScanLine className="w-3 h-3 text-blue-600" />}
                      <span>{rec.method}</span>
                    </span>
                    {rec.parentNotifiedAt && (
                      <p className="text-rose-600 text-[10px] font-semibold mt-1">
                        Parent SMS Dispatched: {rec.parentNotifiedAt}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
