import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import {
  CalendarDays,
  Clock,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const StudentSchedule: React.FC = () => {
  const { student } = useAuth();
  const { timetable, upcomingTests } = useDemoData();

  if (!student) {
    return <div className="p-8 text-center text-slate-500">Student session not found.</div>;
  }

  // Days corresponding to student cohort
  const cohortDays =
    student.cohort === 'Male' ? ['Mon', 'Tue', 'Wed'] : ['Thu', 'Fri', 'Sat'];

  // Filter timetable for this student's shift
  const studentTimetable = timetable.filter((slot) => slot.shift === student.shift);

  // Relevant upcoming tests
  const relevantTests = upcomingTests.filter(
    (t) => t.cohort === student.cohort || t.shift === student.shift
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-900" />
            Weekly Academic Schedule & Tests
          </h1>
          <p className="text-xs text-slate-500">
            Cohort: <span className="font-bold text-blue-900">{student.cohort}</span> (
            {student.cohort === 'Male' ? 'Monday to Wednesday' : 'Thursday to Saturday'}) •{' '}
            <span className="font-bold text-teal-700">{student.shift} Shift</span> (
            {student.shift === 'Morning' ? '15:20 – 18:00' : '18:20 – 21:00'})
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-semibold self-start sm:self-auto">
          <Clock className="w-4 h-4 text-blue-700" />
          <span>Cutoff: {student.shift === 'Morning' ? '15:40' : '18:40'} (+20m grace)</span>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center justify-between">
          <span>Weekly Lecture & Lab Timetable</span>
          <span className="text-xs text-slate-500 font-normal">Section {student.section}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cohortDays.map((dayName) => {
            const daySlots = studentTimetable
              .filter((slot) => slot.day === dayName)
              .sort((a, b) => a.period - b.period);

            const dayFullNames: Record<string, string> = {
              Mon: 'Monday',
              Tue: 'Tuesday',
              Wed: 'Wednesday',
              Thu: 'Thursday',
              Fri: 'Friday',
              Sat: 'Saturday',
            };

            return (
              <div
                key={dayName}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
              >
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4">
                  <span className="text-xs uppercase font-bold text-teal-300">Cohort Day</span>
                  <h3 className="text-lg font-black tracking-tight">{dayFullNames[dayName]}</h3>
                  <p className="text-xs text-blue-200">
                    {student.shift === 'Morning' ? '15:20 to 18:00' : '18:20 to 21:00'}
                  </p>
                </div>

                <div className="p-4 space-y-3 flex-1 divide-y divide-slate-100">
                  {daySlots.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">
                      No lectures scheduled.
                    </p>
                  ) : (
                    daySlots.map((slot) => (
                      <div key={slot.id} className="pt-3 first:pt-0 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-blue-900">{slot.subject}</span>
                          <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {slot.timeRange}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-700">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{slot.teacher}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{slot.room}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Subject Tests */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              Upcoming Mandatory Subject Tests
            </h2>
            <p className="text-xs text-slate-500">
              Conducted within your 3-day cohort block. Marks are incorporated into the monthly report card.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
            {relevantTests.length} Scheduled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relevantTests.map((t, idx) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  {t.subject}
                </span>
                <span className="text-xs font-bold font-mono bg-blue-900 text-white px-2.5 py-0.5 rounded-full">
                  {idx === 0 ? 'In 2 Days' : 'Next Week'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900">{t.topics}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scheduled Date: <strong className="text-slate-800">{t.date}</strong> (
                  {t.shift} Shift)
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-600">
                <span>Total Marks: {t.totalMarks}</span>
                <span>Time Allowed: {t.durationMinutes} mins</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
