import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import {
  Users,
  UserCheck,
  FileSpreadsheet,
  MessageSquareShare,
  LockKeyhole,
  Wifi,
  ScanLine,
  BellRing,
  ArrowRight,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Award,
  KeyRound,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { admin } = useAuth();
  const { students, attendance, admissions, examForms, parentMessages, timeLock, simulatedNow } = useDemoData();

  const totalStudents = students.length;
  const pendingAdmissions = admissions.filter((a) => a.status === 'Pending').length;
  const pendingExams = examForms.filter((e) => e.status === 'Pending').length;
  const totalPendingForms = pendingAdmissions + pendingExams;
  const totalSmsSent = parentMessages.length;

  const todayStr = '2026-11-10'; // Default active session day
  const todayAttendance = attendance.filter((a) => a.date === todayStr);
  const presentCount = todayAttendance.filter((a) => a.status === 'Present' || a.status === 'Late').length;
  const todayAttendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 92;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Admin Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-teal-400/20 text-teal-300 border border-teal-400/30 px-2.5 py-0.5 rounded-full">
              Directorate of Academics & Examination
            </span>
            <span className="text-xs font-mono text-slate-300">Active Shift: Morning (Sec A, A1, A2)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Administrator Command Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Logged in: <strong className="text-white">{admin?.name || 'Prof. Rashid Khan'}</strong> ({admin?.campus || 'Gulshan-e-Iqbal Block 1 Campus'})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/marks-entry"
            className="bg-[#0B4F9C] hover:bg-[#073B75] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 border border-blue-400/30"
          >
            <Award className="w-4 h-4 text-emerald-400" /> Enter Weekly Test Marks
          </Link>
          <Link
            to="/admin/students"
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 border border-slate-700"
          >
            <KeyRound className="w-4 h-4 text-amber-400" /> Students & Passwords
          </Link>
          <Link
            to="/admin/attendance"
            className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" /> Attendance Hub
          </Link>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Enrolled Students
            </span>
            <p className="text-3xl font-black text-slate-900">{totalStudents}</p>
            <p className="text-xs text-slate-500 font-medium">Both Morning & Evening Shifts</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Today's Attendance
            </span>
            <p className="text-3xl font-black text-slate-900">{todayAttendanceRate}%</p>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Punctuality
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Pending Online Forms
            </span>
            <p className="text-3xl font-black text-slate-900">{totalPendingForms}</p>
            <p className="text-xs text-amber-600 font-semibold">
              {pendingAdmissions} Admissions • {pendingExams} Exams
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Parent SMS Log
            </span>
            <p className="text-3xl font-black text-slate-900">{totalSmsSent}</p>
            <p className="text-xs text-teal-700 font-semibold">Simulated Gateway Active</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
            <MessageSquareShare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Launchpad Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/attendance"
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors">
            <Wifi className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Wi-Fi Gateway MAC Simulator</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Scan campus network access points to detect student hardware addresses and auto-mark attendance.
          </p>
          <span className="text-xs font-bold text-blue-900 group-hover:underline inline-flex items-center gap-1">
            Launch Simulator &rarr;
          </span>
        </Link>

        <Link
          to="/admin/attendance"
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
            <ScanLine className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Barcode / RFID Smart Reader</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Optical card scanner simulator with 20-minute cutoff logic and duplicate pulse prevention.
          </p>
          <span className="text-xs font-bold text-teal-700 group-hover:underline inline-flex items-center gap-1">
            Open Optical Terminal &rarr;
          </span>
        </Link>

        <Link
          to="/admin/notifications"
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center group-hover:bg-indigo-900 group-hover:text-white transition-colors">
            <BellRing className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Broadcast Campus Notice</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Dispatch announcements with cohort/shift audience targeting (Male, Female, Morning, Evening).
          </p>
          <span className="text-xs font-bold text-indigo-900 group-hover:underline inline-flex items-center gap-1">
            Compose Broadcast &rarr;
          </span>
        </Link>
      </div>

      {/* Roster Overview by Section & Recent Parent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sections Roster */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">Current Academic Sections</h3>
            <span className="text-xs text-slate-500">6 Active Sections</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { name: 'Section A1', shift: 'Morning', stream: 'Pre-Engineering', count: 48, maleCohort: true },
              { name: 'Section A2', shift: 'Morning', stream: 'Pre-Medical', count: 44, maleCohort: true },
              { name: 'Section A', shift: 'Morning', stream: 'Matric / General Science', count: 38, maleCohort: true },
              { name: 'Section C1', shift: 'Evening', stream: 'Computer Science', count: 42, maleCohort: false },
              { name: 'Section C2', shift: 'Evening', stream: 'Pre-Medical', count: 46, maleCohort: false },
              { name: 'Section C', shift: 'Evening', stream: 'Commerce', count: 32, maleCohort: false },
            ].map((sec) => (
              <div
                key={sec.name}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{sec.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        sec.maleCohort ? 'bg-blue-100 text-blue-900' : 'bg-purple-100 text-purple-900'
                      }`}
                    >
                      {sec.maleCohort ? 'Male (Mon–Wed)' : 'Female (Thu–Sat)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {sec.shift} Shift • {sec.stream}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800 text-sm">{sec.count} Students</span>
                  <p className="text-[10px] text-emerald-600 font-semibold">Active Roster</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Parent SMS Dispatches */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900">Recent Parent SMS Dispatches</h3>
            <Link to="/admin/parent-messages" className="text-xs text-blue-900 font-semibold hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {parentMessages.slice(0, 3).map((msg) => (
              <div key={msg.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{msg.studentName}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {msg.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 italic">
                  "{msg.messageText}"
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>To: {msg.guardianName} ({msg.phone})</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
