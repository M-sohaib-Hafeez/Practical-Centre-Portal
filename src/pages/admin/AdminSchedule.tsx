import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  CalendarDays,
  Plus,
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { ShiftType, CohortType, ClassLevel, StreamType } from '../../types';

export const AdminSchedule: React.FC = () => {
  const { timetable, upcomingTests, addUpcomingTest } = useDemoData();
  const { showToast } = useToast();

  const [filterShift, setFilterShift] = useState<ShiftType>('Morning');

  // Test form state
  const [subject, setSubject] = useState('Physics');
  const [stream, setStream] = useState<StreamType>('Pre-Engineering');
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class XII');
  const [date, setDate] = useState('2026-11-19');
  const [testShift, setTestShift] = useState<ShiftType>('Morning');
  const [cohort, setCohort] = useState<CohortType>('Male');
  const [topics, setTopics] = useState('');
  const [totalMarks, setTotalMarks] = useState(50);
  const [duration, setDuration] = useState(45);

  const handleAddTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topics.trim()) return;

    addUpcomingTest({
      subject,
      stream,
      classLevel,
      date,
      shift: testShift,
      cohort,
      topics: topics.trim(),
      totalMarks: Number(totalMarks),
      durationMinutes: Number(duration),
    });

    showToast({
      type: 'success',
      title: 'Upcoming Test Scheduled',
      message: `${subject} test added for ${cohort} cohort on ${date}`,
    });

    setTopics('');
  };

  const filteredSlots = timetable.filter((t) => t.shift === filterShift);

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-900" />
            Schedule & Upcoming Subject Test Master
          </h1>
          <p className="text-xs text-slate-500">
            Configure weekly cohorts (Mon–Wed for males, Thu–Sat for females) and publish upcoming test topics.
          </p>
        </div>

        {/* Shift selector */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFilterShift('Morning')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterShift === 'Morning'
                ? 'bg-white text-blue-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Morning Shift (15:20 – 18:00)
          </button>
          <button
            type="button"
            onClick={() => setFilterShift('Evening')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterShift === 'Evening'
                ? 'bg-white text-blue-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Evening Shift (18:20 – 21:00)
          </button>
        </div>
      </div>

      {/* Add New Test Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-600" />
            Schedule New Weekly Subject Test
          </h2>
          <p className="text-xs text-slate-500">
            Students see upcoming tests with countdown timers on their dashboards.
          </p>
        </div>

        <form onSubmit={handleAddTest} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value as StreamType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Test Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
              </input>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Cohort & Shift</label>
              <div className="flex gap-2">
                <select
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value as CohortType)}
                  className="w-1/2 px-2 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select
                  value={testShift}
                  onChange={(e) => setTestShift(e.target.value as ShiftType)}
                  className="w-1/2 px-2 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
                >
                  <option value="Morning">Morning</option>
                  <option value="Evening">Eve</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Topics & Chapters Included</label>
            <input
              type="text"
              required
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="e.g. Chapter 14: Magnetism & Electromagnetism — Biot-Savart Law and Ampere's Circuital Law"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-300" /> Publish Upcoming Test
          </button>
        </form>
      </div>

      {/* Published Upcoming Tests List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Scheduled Test Calendar</h3>
          <span className="text-xs text-slate-500 font-mono">{upcomingTests.length} tests active</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {upcomingTests.map((t) => (
            <div key={t.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-blue-900 text-sm">{t.subject}</span>
                  <span className="font-mono text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {t.date}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                    {t.cohort} Cohort • {t.shift} Shift
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{t.topics}</p>
                <p className="text-[11px] text-slate-400">
                  {t.classLevel} ({t.stream}) • Marks: {t.totalMarks} • {t.durationMinutes} mins
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto shrink-0">
                Scheduled
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
