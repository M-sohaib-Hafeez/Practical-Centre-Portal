import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { isFeatureLocked } from '../../utils/institutionRules';
import { LockedScreen } from '../../pages/LockedScreen';
import {
  LayoutDashboard,
  CalendarCheck2,
  FileBarChart2,
  CalendarDays,
  BellRing,
  BookOpen,
  FileSpreadsheet,
  Users,
  LogOut,
  Menu,
  X,
  Clock,
  Shield,
  AlertCircle,
  GraduationCap,
} from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const { student, logout } = useAuth();
  const { timeLock, simulatedNow, notifications } = useDemoData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/student-login');
  };

  // Determine current feature based on path
  let currentFeature: 'portal' | 'notes' | 'forms' | 'reports' = 'portal';
  if (location.pathname.includes('/notes')) currentFeature = 'notes';
  else if (location.pathname.includes('/forms')) currentFeature = 'forms';
  else if (location.pathname.includes('/reports')) currentFeature = 'reports';

  // Check if locked
  const isLocked = isFeatureLocked(timeLock, simulatedNow, currentFeature);

  if (isLocked) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <LockedScreen featureName={timeLock.target} />
      </div>
    );
  }

  const navItems = [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/student/attendance', label: 'My Attendance', icon: CalendarCheck2 },
    { to: '/student/reports', label: 'Weekly & Monthly Reports', icon: FileBarChart2 },
    { to: '/student/schedule', label: 'Schedule & Upcoming Tests', icon: CalendarDays },
    { to: '/student/notifications', label: 'Notifications', icon: BellRing },
    { to: '/student/notes', label: 'Notes & Study Material', icon: BookOpen },
    { to: '/student/forms', label: 'Examination & Forms', icon: FileSpreadsheet },
    { to: '/community', label: 'Peer Discussion Forum', icon: Users },
  ];

  const unreadNotifCount = notifications.filter(
    (n) => student && !(n.isReadBy || []).includes(student.id)
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Student Banner showing Cohort & Shift Rule */}
      {student && (
        <div className="bg-gradient-to-r from-[#073B75] via-[#0B4F9C] to-[#0A4A90] text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-300 tracking-wide uppercase">
              {student.cohort} Cohort
            </span>
            <span className="text-blue-300">•</span>
            <span className="text-blue-100">
              {student.cohort === 'Male' ? 'Mon – Wed' : 'Thu – Sat'}
            </span>
            <span className="text-blue-300">•</span>
            <span className="bg-[#073B75] px-2 py-0.5 rounded text-[11px] font-mono border border-blue-400/40">
              {student.shift} Shift ({student.shift === 'Day' ? '15:20 – 18:00' : '18:20 – 21:00'})
            </span>
          </div>

          <div className="flex items-center gap-3 text-blue-200 text-[11px]">
            <span>{student.campus}</span>
            <span>•</span>
            <span className="font-mono font-bold text-emerald-300">Section {student.section}</span>
            <span>•</span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
              title="Logout from student portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 text-slate-800 flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0B4F9C] flex items-center justify-center font-black text-white text-sm shadow-xs">
                  {student?.photoInitial || 'PC'}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs text-slate-900 truncate">
                    {student?.name || 'Student Portal'}
                  </h3>
                  <p className="text-[11px] font-mono text-[#0B4F9C] truncate font-semibold">
                    {student?.id || 'PC-STUDENT'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isNotif = item.to.includes('notifications');
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                        isActive
                          ? 'bg-[#0B4F9C] text-white shadow-xs font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B4F9C]'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {isNotif && unreadNotifCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                        {unreadNotifCount}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Sidebar Student Academic Card */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] space-y-1 text-slate-600">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>{student?.classLevel}</span>
                <span className="text-blue-700">{student?.stream}</span>
              </div>
              <p className="text-[10px] text-slate-500">Roll # {student?.rollNumber}</p>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg font-semibold transition-colors border border-rose-200"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Mobile Top Header */}
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 -ml-1 text-slate-700 hover:bg-slate-100 rounded-lg"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
              <span className="font-bold text-xs text-slate-900">Student Portal</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-[11px] font-semibold text-blue-900 hover:underline">
                Home
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
