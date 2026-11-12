import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Student } from '../types';
import { useDemoData } from './DemoDataContext';

export type UserRole = 'student' | 'admin' | null;

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  campus: string;
  designation: string;
}

interface AuthContextType {
  role: UserRole;
  student: Student | null;
  admin: AdminUser | null;
  isAuthenticated: boolean;

  // Student auth
  loginStudent: (studentId: string, password?: string) => { success: boolean; error?: string };

  // Admin auth step 1
  requestAdminOtp: (email: string, password?: string) => { success: boolean; error?: string; otp?: string };
  // Admin auth step 2
  verifyAdminOtp: (otp: string) => { success: boolean; error?: string };
  resendAdminOtp: () => { success: boolean; otp?: string };
  pendingAdminEmail: string | null;
  otpCountdown: number;
  otpAttemptsLeft: number;
  expectedOtp: string | null;

  logout: () => void;
  switchUser: (type: 'admin' | 'student', studentId?: string) => void;
}

const AUTH_STORAGE_KEY = 'pc_portal_auth_session_v1';
export const DEMO_ADMIN_OTP = '482913';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { students } = useDemoData();

  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.role || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [student, setStudent] = useState<Student | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.student || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.admin || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  // OTP workflow state
  const [pendingAdminEmail, setPendingAdminEmail] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState<number>(0);
  const [otpAttemptsLeft, setOtpAttemptsLeft] = useState<number>(3);
  const [expectedOtp, setExpectedOtp] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (role) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ role, student, admin })
      );
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [role, student, admin]);

  // Keep student data in sync if updated in DemoData
  useEffect(() => {
    if (role === 'student' && student) {
      const fresh = students.find((s) => s.id === student.id);
      if (fresh) {
        setStudent(fresh);
      }
    }
  }, [students, role]);

  // OTP Countdown timer
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => {
      setOtpCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  // Student Login
  const loginStudent = useCallback(
    (studentId: string, password?: string) => {
      const cleanId = studentId.trim().toUpperCase();
      const matched = students.find(
        (s) => s.id.toUpperCase() === cleanId || s.rollNumber === cleanId
      );

      if (!matched) {
        return {
          success: false,
          error: `Student ID "${studentId}" not found in registered institute records. Try PC-2026-A1-042.`,
        };
      }

      // Check student password
      const expectedPassword = matched.password || 'pcstudent123';
      if (password && password.trim() !== expectedPassword) {
        return {
          success: false,
          error: 'Incorrect student portal password. If you forgot your password, please contact the campus administrator.',
        };
      }

      setRole('student');
      setStudent(matched);
      setAdmin(null);
      return { success: true };
    },
    [students]
  );

  // Admin Login Step 1
  const requestAdminOtp = useCallback((email: string, _password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes('@') || !cleanEmail.includes('admin')) {
      return {
        success: false,
        error: 'Please enter a valid administrator email (e.g. admin@practicalcentre.edu.pk).',
      };
    }

    setPendingAdminEmail(cleanEmail);
    setExpectedOtp(DEMO_ADMIN_OTP);
    setOtpCountdown(60);
    setOtpAttemptsLeft(3);

    return {
      success: true,
      otp: DEMO_ADMIN_OTP,
    };
  }, []);

  // Admin Login Step 2: Verify OTP
  const verifyAdminOtp = useCallback(
    (enteredOtp: string) => {
      if (!expectedOtp || !pendingAdminEmail) {
        return { success: false, error: 'Session expired. Please restart admin login.' };
      }

      if (otpCountdown <= 0) {
        return { success: false, error: 'OTP has expired. Please click Resend Code.' };
      }

      if (enteredOtp.trim() !== expectedOtp) {
        const remaining = otpAttemptsLeft - 1;
        setOtpAttemptsLeft(remaining);

        if (remaining <= 0) {
          setExpectedOtp(null);
          setPendingAdminEmail(null);
          return {
            success: false,
            error: 'Maximum 3 attempts exceeded. OTP has been invalidated for security. Please restart.',
          };
        }

        return {
          success: false,
          error: `Incorrect OTP code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
        };
      }

      // Success
      const adminObj: AdminUser = {
        id: 'adm-001',
        name: 'Prof. Rashid Khan',
        email: pendingAdminEmail,
        role: 'admin',
        campus: 'Central Administration (Gulshan & PECHS)',
        designation: 'Head of Academics & Student Affairs',
      };

      setRole('admin');
      setAdmin(adminObj);
      setStudent(null);
      setPendingAdminEmail(null);
      setExpectedOtp(null);

      return { success: true };
    },
    [expectedOtp, pendingAdminEmail, otpCountdown, otpAttemptsLeft]
  );

  // Resend OTP
  const resendAdminOtp = useCallback(() => {
    if (!pendingAdminEmail) {
      return { success: false };
    }
    setExpectedOtp(DEMO_ADMIN_OTP);
    setOtpCountdown(60);
    setOtpAttemptsLeft(3);
    return { success: true, otp: DEMO_ADMIN_OTP };
  }, [pendingAdminEmail]);

  // Logout
  const logout = useCallback(() => {
    setRole(null);
    setStudent(null);
    setAdmin(null);
    setPendingAdminEmail(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  // Instant Switcher for Demo
  const switchUser = useCallback(
    (type: 'admin' | 'student', studentId?: string) => {
      if (type === 'admin') {
        const adminObj: AdminUser = {
          id: 'adm-001',
          name: 'Prof. Rashid Khan',
          email: 'admin@practicalcentre.edu.pk',
          role: 'admin',
          campus: 'Central Administration (Gulshan & PECHS)',
          designation: 'Head of Academics & Student Affairs',
        };
        setRole('admin');
        setAdmin(adminObj);
        setStudent(null);
      } else {
        const targetId = studentId || 'PC-2026-A1-042';
        const st = students.find((s) => s.id === targetId) || students[0];
        setRole('student');
        setStudent(st);
        setAdmin(null);
      }
    },
    [students]
  );

  return (
    <AuthContext.Provider
      value={{
        role,
        student,
        admin,
        isAuthenticated: !!role,
        loginStudent,
        requestAdminOtp,
        verifyAdminOtp,
        resendAdminOtp,
        pendingAdminEmail,
        otpCountdown,
        otpAttemptsLeft,
        expectedOtp,
        logout,
        switchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
