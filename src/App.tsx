import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DemoDataProvider } from './context/DemoDataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoGuideModal } from './components/common/DemoGuideModal';

// Layouts
import { StudentLayout } from './components/layout/StudentLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { StudentLoginPage } from './pages/auth/StudentLoginPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { AdmissionApplyPage } from './pages/AdmissionApplyPage';
import { CommunityPage } from './pages/CommunityPage';
import { LockedScreen } from './pages/LockedScreen';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentAttendance } from './pages/student/StudentAttendance';
import { StudentReports } from './pages/student/StudentReports';
import { StudentSchedule } from './pages/student/StudentSchedule';
import { StudentNotifications } from './pages/student/StudentNotifications';
import { StudentNotes } from './pages/student/StudentNotes';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAttendance } from './pages/admin/AdminAttendance';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminNotifications } from './pages/admin/AdminNotifications';
import { AdminSchedule } from './pages/admin/AdminSchedule';
import { AdminForms } from './pages/admin/AdminForms';
import { AdminNotesManager } from './pages/admin/AdminNotesManager';
import { AdminTimeLock } from './pages/admin/AdminTimeLock';
import { AdminParentMessages } from './pages/admin/AdminParentMessages';
import { AdminMarksEntry } from './pages/admin/AdminMarksEntry';
import { AdminStudents } from './pages/admin/AdminStudents';

// Route Guards
const RequireStudentAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, student } = useAuth();
  if (role !== 'student' || !student) {
    return <Navigate to="/student-login" replace />;
  }
  return <>{children}</>;
};

const RequireAdminAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, admin } = useAuth();
  if (role !== 'admin' || !admin) {
    return <Navigate to="/admin-login" replace />;
  }
  return <>{children}</>;
};

// Layout Wrapper with Navbar & Footer for non-panel views
const PublicLayoutWrapper: React.FC<{ children: React.ReactNode; onOpenDemoGuide: () => void }> = ({
  children,
  onOpenDemoGuide,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar onOpenDemoGuide={onOpenDemoGuide} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default function App() {
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);

  return (
    <DemoDataProvider>
      <AuthProvider>
        <ToastProvider>
          <HashRouter>
            <div className="relative font-sans antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900">
              <Routes>
                {/* Public & Visitor Routes */}
                <Route
                  path="/"
                  element={
                    <PublicLayoutWrapper onOpenDemoGuide={() => setIsDemoGuideOpen(true)}>
                      <HomePage />
                    </PublicLayoutWrapper>
                  }
                />
                <Route
                  path="/student-login"
                  element={
                    <PublicLayoutWrapper onOpenDemoGuide={() => setIsDemoGuideOpen(true)}>
                      <StudentLoginPage />
                    </PublicLayoutWrapper>
                  }
                />
                <Route
                  path="/admin-login"
                  element={
                    <PublicLayoutWrapper onOpenDemoGuide={() => setIsDemoGuideOpen(true)}>
                      <AdminLoginPage />
                    </PublicLayoutWrapper>
                  }
                />
                <Route
                  path="/admission-form"
                  element={
                    <PublicLayoutWrapper onOpenDemoGuide={() => setIsDemoGuideOpen(true)}>
                      <AdmissionApplyPage />
                    </PublicLayoutWrapper>
                  }
                />
                <Route
                  path="/community"
                  element={
                    <PublicLayoutWrapper onOpenDemoGuide={() => setIsDemoGuideOpen(true)}>
                      <div className="py-8 px-4">
                        <CommunityPage />
                      </div>
                    </PublicLayoutWrapper>
                  }
                />
                <Route
                  path="/locked"
                  element={
                    <PublicLayoutWrapper onOpenDemoGuide={() => setIsDemoGuideOpen(true)}>
                      <LockedScreen />
                    </PublicLayoutWrapper>
                  }
                />

                {/* Protected Student Portal Routes */}
                <Route
                  path="/student"
                  element={
                    <RequireStudentAuth>
                      <StudentLayout />
                    </RequireStudentAuth>
                  }
                >
                  <Route index element={<StudentDashboard />} />
                  <Route path="attendance" element={<StudentAttendance />} />
                  <Route path="reports" element={<StudentReports />} />
                  <Route path="schedule" element={<StudentSchedule />} />
                  <Route path="notifications" element={<StudentNotifications />} />
                  <Route path="notes" element={<StudentNotes />} />
                </Route>

                {/* Protected Admin Console Routes */}
                <Route
                  path="/admin"
                  element={
                    <RequireAdminAuth>
                      <AdminLayout />
                    </RequireAdminAuth>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="attendance" element={<AdminAttendance />} />
                  <Route path="marks-entry" element={<AdminMarksEntry />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="notifications" element={<AdminNotifications />} />
                  <Route path="schedule" element={<AdminSchedule />} />
                  <Route path="forms" element={<AdminForms />} />
                  <Route path="notes" element={<AdminNotesManager />} />
                  <Route path="time-lock" element={<AdminTimeLock />} />
                  <Route path="parent-messages" element={<AdminParentMessages />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

              {/* Global Floating Demo Guide Button */}
              <button
                type="button"
                onClick={() => setIsDemoGuideOpen(true)}
                className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border border-white/20"
                aria-label="Open Demo Presentation Guide"
              >
                <span className="w-2 h-2 rounded-full bg-teal-200 animate-ping" />
                <span>Demo Guide & Credentials</span>
              </button>

              {/* Demo Guide Modal */}
              <DemoGuideModal
                isOpen={isDemoGuideOpen}
                onClose={() => setIsDemoGuideOpen(false)}
              />
            </div>
          </HashRouter>
        </ToastProvider>
      </AuthProvider>
    </DemoDataProvider>
  );
}
