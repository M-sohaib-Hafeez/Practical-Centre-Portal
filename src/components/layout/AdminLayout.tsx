import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  LayoutDashboard,
  UserCheck,
  FileBarChart2,
  BellRing,
  CalendarDays,
  FileSpreadsheet,
  BookOpen,
  LockKeyhole,
  MessageSquareShare,
  Users,
  LogOut,
  Clock,
  RotateCcw,
  Menu,
  X,
  ChevronRight,
  Shield,
  FastForward,
  Award,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { admin, logout } = useAuth();
  const { timeLock, simulatedNow, resetDemoData, adjustSimulatedTime, resetSimulatedTime } = useDemoData();
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/marks-entry', label: 'Enter Weekly Test Marks', icon: Award },
    { to: '/admin/students', label: 'Students & Passwords', icon: Users },
    { to: '/admin/attendance', label: 'Attendance Hub', icon: UserCheck },
    { to: '/admin/reports', label: 'Student Reports Dossier', icon: FileBarChart2 },
    { to: '/admin/notifications', label: 'Notifications Center', icon: BellRing },
    { to: '/admin/schedule', label: 'Schedule & Upcoming Tests', icon: CalendarDays },
    { to: '/admin/forms', label: 'Online Forms Manager', icon: FileSpreadsheet },
    { to: '/admin/notes', label: 'Notes & Resources Manager', icon: BookOpen },
    { to: '/admin/time-lock', label: 'Portal Time Lock', icon: LockKeyhole },
    { to: '/admin/parent-messages', label: 'Parent Message Log', icon: MessageSquareShare },
    { to: '/community', label: 'Peer Discussion Forum', icon: Users },
  ];

  const simulatedTimeString = simulatedNow.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin Top Status Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white">Central Admin Terminal:</span>
          <span className="text-slate-400">{admin?.campus || 'Gulshan & PECHS Campuses'}</span>
          {timeLock.isEmergencyLocked && (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded font-bold text-[10px]">
              LOCK ACTIVE
            </span>
          )}
        </div>

        {/* Demo Clock Simulator Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono text-teal-300 font-bold">{simulatedTimeString}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              adjustSimulatedTime(60);
              showToast({
                type: 'info',
                title: 'Demo Clock Fast-Forwarded',
                message: 'Advanced simulated time by +1 Hour',
              });
            }}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded border border-slate-700 transition-colors"
            title="Fast forward simulated time by 1 hour"
          >
            <FastForward className="w-3 h-3 text-cyan-400" />
            <span>+1h</span>
          </button>
          <button
            type="button"
            onClick={() => {
              resetSimulatedTime();
              showToast({
                type: 'info',
                title: 'Demo Clock Reset',
                message: 'Synchronized with real system time',
              });
            }}
            className="text-slate-400 hover:text-white px-1.5 py-1"
            title="Reset to real time"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => {
              resetDemoData();
              showToast({
                type: 'warning',
                title: 'Demo Reset Completed',
                message: 'All mock state returned to factory default',
              });
            }}
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 px-2 py-1 rounded border border-rose-900/50 transition-colors font-medium text-[11px]"
          >
            Reset All Data
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-1 rounded text-xs transition-colors shadow-xs ml-1 cursor-pointer"
            title="Log Out of Central Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

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
          className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/image_70928a07.png"
                  alt="Practical Centre Logo"
                  className="w-9 h-9 object-contain drop-shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-white">Admin Console</h3>
                  <p className="text-[10px] text-slate-400">Practical Centre Karachi</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                        isActive
                          ? 'bg-[#0B4F9C] text-white shadow-xs font-semibold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Sidebar Footer User Info */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center text-teal-300 font-bold shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{admin?.name || 'Administrator'}</p>
                    <p className="text-[10px] text-slate-400 truncate">Academic Head</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-rose-900/60 border border-slate-700 hover:border-rose-700/60 rounded-lg text-xs font-semibold transition-colors shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Logout</span>
                </button>
              </div>
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
              <span className="font-bold text-xs text-slate-900">Admin Control Panel</span>
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
