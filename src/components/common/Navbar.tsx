import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import {
  Bell,
  LogOut,
  User,
  Shield,
  Menu,
  X,
  Compass,
  CheckCheck,
  Calendar,
  AlertTriangle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenDemoGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoGuide }) => {
  const { role, student, admin, logout } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useDemoData();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Filter notifications relevant to current student if student is logged in
  const relevantNotifications = notifications.filter((n) => {
    if (!role || role === 'admin') return true;
    if (n.audience === 'All') return true;
    if (student) {
      if (n.audience === 'Male cohort' && student.cohort === 'Male') return true;
      if (n.audience === 'Female cohort' && student.cohort === 'Female') return true;
      if (n.audience === 'Day shift' && student.shift === 'Day') return true;
      if (n.audience === 'Evening shift' && student.shift === 'Evening') return true;
      if (n.audience === 'PECHS campus' && student.campus.includes('PECHS')) return true;
      if (n.audience === 'Gulshan campus' && student.campus.includes('Gulshan')) return true;
    }
    return false;
  });

  const unreadCount = relevantNotifications.filter((n) => {
    if (role === 'student' && student) {
      return !(n.isReadBy || []).includes(student.id);
    }
    return false;
  }).length;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const currentStudentId = student?.id || '';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] rounded-lg p-1"
          >
            <img
              src="/assets/aistudio/image_70928a07.png"
              alt="Practical Centre Logo"
              className="w-11 h-11 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-[#0B4F9C]">
                  Practical Centre
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  Karachi
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Smart Student Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-blue-950 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-blue-950 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/admission-form"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/admission-form'
                  ? 'text-blue-950 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-blue-950 hover:bg-slate-50'
              }`}
            >
              Apply Online
            </Link>
            <Link
              to="/student"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/student')
                  ? 'text-blue-950 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-blue-950 hover:bg-slate-50'
              }`}
            >
              Student Portal
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/admin')
                  ? 'text-blue-950 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-blue-950 hover:bg-slate-50'
              }`}
            >
              Admin Panel
            </Link>
            <Link
              to="/community"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/community'
                  ? 'text-blue-950 bg-blue-50 font-semibold'
                  : 'text-slate-600 hover:text-blue-950 hover:bg-slate-50'
              }`}
            >
              Peer Forum
            </Link>
          </nav>

          {/* Right Actions: Demo Guide Button, Notification Bell, User Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Demo Guide trigger button */}
            <button
              type="button"
              onClick={onOpenDemoGuide}
              className="flex items-center gap-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-all active:scale-95"
              aria-label="Open Demo Guide"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="hidden sm:inline">Demo Guide</span>
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotifOpen((prev) => !prev)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-blue-950 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label={`Notifications (${unreadCount} unread)`}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden text-slate-800 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Notifications & Alerts
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {unreadCount} unread update{unreadCount === 1 ? '' : 's'}
                      </p>
                    </div>
                    {unreadCount > 0 && currentStudentId && (
                      <button
                        type="button"
                        onClick={() => markAllNotificationsAsRead(currentStudentId)}
                        className="text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {relevantNotifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No notifications currently available.
                      </div>
                    ) : (
                      relevantNotifications.slice(0, 5).map((notif) => {
                        const isRead = currentStudentId
                          ? (notif.isReadBy || []).includes(currentStudentId)
                          : false;
                        const isHoliday = notif.category === 'Holiday';
                        const isExam = notif.category === 'Exam';

                        return (
                          <div
                            key={notif.id}
                            onClick={() => {
                              if (currentStudentId) {
                                markNotificationAsRead(notif.id, currentStudentId);
                              }
                            }}
                            className={`p-3 text-left transition-colors cursor-pointer ${
                              !isRead ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                                  isHoliday
                                    ? 'bg-amber-100 text-amber-800'
                                    : isExam
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {notif.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {notif.createdAt}
                              </span>
                            </div>
                            <h4 className="text-xs font-semibold text-slate-900 mt-1">
                              {notif.title}
                            </h4>
                            <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                              {notif.message}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                    <Link
                      to={role === 'admin' ? '/admin/notifications' : '/student/notifications'}
                      onClick={() => setIsNotifOpen(false)}
                      className="text-xs text-blue-700 font-semibold hover:underline"
                    >
                      View all notification archives &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Auth State Button */}
            {role === 'student' && student ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  to="/student"
                  className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-slate-100 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center border border-blue-700 shadow-xs">
                    {student.photoInitial}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{student.name}</p>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">{student.id}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 rounded-lg transition-all shadow-xs"
                  title="Logout from student portal"
                  aria-label="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : role === 'admin' && admin ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link
                  to="/admin"
                  className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-slate-100 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-950 text-teal-300 font-bold text-xs flex items-center justify-center border border-indigo-700 shadow-xs">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{admin.name}</p>
                    <p className="text-[10px] text-indigo-700 font-semibold mt-0.5">Admin Head</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 rounded-lg transition-all shadow-xs"
                  title="Logout from admin panel"
                  aria-label="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/student-login"
                  className="text-xs font-semibold text-blue-900 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                >
                  Student Login
                </Link>
                <Link
                  to="/admin-login"
                  className="text-xs font-semibold bg-blue-950 hover:bg-blue-900 text-white px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                >
                  Admin Login
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 animate-in slide-in-from-top-4">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-950"
          >
            Home
          </Link>
          <Link
            to="/admission-form"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-950"
          >
            Apply for Admission
          </Link>
          <Link
            to="/student"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-950"
          >
            Student Portal
          </Link>
          <Link
            to="/admin"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-950"
          >
            Admin Panel
          </Link>
          <Link
            to="/community"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-950"
          >
            Peer Discussion Forum
          </Link>

          {/* Mobile Logged-in Profile & Logout action */}
          {role === 'student' && student && (
            <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-3 p-2.5 bg-blue-50/70 rounded-xl border border-blue-100">
                <div className="w-9 h-9 rounded-full bg-[#0B4F9C] text-white font-bold text-xs flex items-center justify-center">
                  {student.photoInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{student.name}</p>
                  <p className="text-[10px] font-mono text-slate-500">{student.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Logout
              </button>
            </div>
          )}

          {role === 'admin' && admin && (
            <div className="pt-3 mt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-3 p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100">
                <div className="w-9 h-9 rounded-full bg-indigo-900 text-teal-300 font-bold text-xs flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{admin.name}</p>
                  <p className="text-[10px] text-indigo-700 font-semibold">Central Admin Head</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
