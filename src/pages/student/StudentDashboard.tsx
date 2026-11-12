import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import {
  CalendarCheck,
  Award,
  TrendingUp,
  FileText,
  Calendar,
  Bell,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Layers,
  Sparkles,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { student } = useAuth();
  const { reports, upcomingTests, notifications, notes, attendance } = useDemoData();

  if (!student) {
    return (
      <div className="p-8 text-center text-slate-500">
        No active student session. Please log in.
      </div>
    );
  }

  // Find report for this student or default fallback
  const report = reports[student.id] || reports['PC-2026-A1-042'];

  // Attendance metrics from actual attendance records
  const studentAttendance = attendance.filter((a) => a.studentId === student.id);
  const presentCount = studentAttendance.filter(
    (a) => a.status === 'Present' || a.status === 'Late'
  ).length;
  const attendanceRate =
    studentAttendance.length > 0
      ? Math.round((presentCount / studentAttendance.length) * 100)
      : report.monthlySummary.attendanceRate;

  const latestTest = report.weeks[report.weeks.length - 1]?.test;

  // Relevant upcoming tests for this student's stream & cohort
  const relevantTests = upcomingTests.filter(
    (t) => t.cohort === student.cohort || t.shift === student.shift
  );

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#073B75] via-[#0B4F9C] to-[#0A4A90] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
              {student.cohort} Cohort • {student.shift} Shift
            </span>
            <span className="text-xs font-mono text-blue-200">Section {student.section}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome Back, {student.name}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            {student.classLevel} ({student.stream}) • {student.campus} • Roll #{student.rollNumber}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/student/reports"
            className="bg-white text-[#0B4F9C] hover:bg-slate-100 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-emerald-600" /> View Report Card
          </Link>
          <Link
            to="/student/attendance"
            className="bg-[#073B75]/80 hover:bg-[#073B75] text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-blue-400/30 transition-colors"
          >
            Attendance Logs
          </Link>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Attendance Rate */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Attendance Rate
            </span>
            <p className="text-3xl font-black text-slate-900">{attendanceRate}%</p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Above 80% Requirement
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Latest Weekly Test Score */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Latest Test (Week {latestTest?.weekNumber || 4})
            </span>
            <p className="text-3xl font-black text-slate-900">
              {latestTest?.marksObtained || 46}/{latestTest?.totalMarks || 50}
            </p>
            <p className="text-xs font-semibold text-[#0B4F9C]">
              {latestTest?.percentage || 92}% in {latestTest?.subject || 'Physics'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B4F9C] flex items-center justify-center border border-blue-100">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Monthly Class Rank */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Monthly Section Rank
            </span>
            <p className="text-3xl font-black text-slate-900">
              #{report.monthlySummary.sectionRank}
            </p>
            <p className="text-xs font-semibold text-emerald-700">
              Top 5% in Section {student.section}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Weekly Examination Progression Matrix (Simpler Table - NO GRAPHS) + Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Clean Weekly Examination Progression Matrix (No graphs/charts) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Weekly Examination Progression
              </h2>
              <p className="text-xs text-slate-500">
                Official marks recorded across 4 weeks of {report.month}
              </p>
            </div>
            <Link
              to="/student/reports"
              className="text-xs font-bold text-[#0B4F9C] hover:underline flex items-center gap-1"
            >
              Full Academic Report &rarr;
            </Link>
          </div>

          {/* Simple Structured Score Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Week</th>
                  <th className="py-2.5 px-3">Subject & Topic</th>
                  <th className="py-2.5 px-3">Test Date</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Percentage</th>
                  <th className="py-2.5 px-3">Section Avg</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.weeks.map((w) => {
                  const pct = w.test.percentage;
                  return (
                    <tr key={w.weekNumber} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        Week {w.weekNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{w.test.subject}</span>
                        <span className="text-[10px] text-slate-500 line-clamp-1">{w.test.topic}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                        {w.test.testDate}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 font-mono">
                        {w.test.marksObtained}{' '}
                        <span className="text-slate-400 font-normal">/ {w.test.totalMarks}</span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold">
                        <span className={pct >= 85 ? 'text-emerald-600' : pct >= 60 ? 'text-[#0B4F9C]' : 'text-amber-600'}>
                          {pct}%
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                        {w.test.sectionAverage}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            pct >= 85
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : pct >= 60
                              ? 'bg-blue-50 text-[#0B4F9C] border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          {pct >= 85 ? 'Distinction' : pct >= 60 ? 'Satisfactory' : 'Needs Review'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50/60 rounded-xl p-3 border border-blue-100 flex items-center justify-between text-xs text-[#0B4F9C]">
            <span className="font-semibold">Cumulative Assessment:</span>
            <span className="font-bold">
              {report.monthlySummary.totalMarks} / {report.monthlySummary.maxMarks} Total Marks ({report.monthlySummary.monthlyPercentage}%)
            </span>
          </div>
        </div>

        {/* Right: Upcoming Subject Tests */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Upcoming Tests
            </h2>
            <Link to="/student/schedule" className="text-xs text-[#0B4F9C] font-semibold hover:underline">
              Timetable
            </Link>
          </div>

          <div className="space-y-3">
            {relevantTests.slice(0, 3).map((test) => (
              <div
                key={test.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0B4F9C]">{test.subject}</span>
                  <span className="text-[10px] font-bold bg-blue-100 text-[#0B4F9C] px-2 py-0.5 rounded">
                    {test.date}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {test.topics}
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-1">
                  <span>Marks: {test.totalMarks}</span>
                  <span>Duration: {test.durationMinutes} mins</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Study Materials & Latest Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notes Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0B4F9C]" />
              Recent Digital Study Notes
            </h2>
            <Link to="/student/notes" className="text-xs text-[#0B4F9C] font-semibold hover:underline">
              All Handouts &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {notes.slice(0, 3).map((n) => (
              <Link
                key={n.id}
                to="/student/notes"
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 transition-colors flex items-center justify-between group"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#0B4F9C]">
                    {n.title}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {n.subject} • {n.resourceType} • Ch. {n.chapterNumber}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B4F9C] shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Announcements Feed */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-600" />
              Campus Announcements
            </h2>
            <Link
              to="/student/notifications"
              className="text-xs text-[#0B4F9C] font-semibold hover:underline"
            >
              All Alerts &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {notifications.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{item.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.createdAt}</span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
