import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  UserCheck,
  Shield,
  KeyRound,
  Lock,
  ArrowRight,
  Copy,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const StudentLoginPage: React.FC = () => {
  const { loginStudent, switchUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState('PC-2026-A1-042');
  const [password, setPassword] = useState('pcstudent123');
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = loginStudent(studentId, password);
    if (res.success) {
      showToast({
        type: 'success',
        title: 'Student Authentication Verified',
        message: 'Welcome to Practical Centre Student Portal',
      });
      navigate('/student');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleCopy = (id: string, label: string) => {
    navigator.clipboard.writeText(id);
    setStudentId(id);
    setCopiedKey(label);
    showToast({
      type: 'info',
      title: 'Demo ID Applied',
      message: `Selected ${label} (${id})`,
      duration: 2000,
    });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Auth Mode Toggle Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80">
          <Link
            to="/student-login"
            className="flex-1 py-3.5 text-center text-xs font-bold border-b-2 border-blue-900 text-blue-900 bg-white flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" /> Student Portal
          </Link>
          <Link
            to="/admin-login"
            className="flex-1 py-3.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Shield className="w-4 h-4" /> Admin Console
          </Link>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <img
              src="/assets/aistudio/image_70928a07.png"
              alt="Practical Centre Logo"
              className="w-16 h-16 mx-auto object-contain drop-shadow-xs"
            />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Student Portal Sign In</h2>
            <p className="text-xs text-slate-500">
              Access your attendance, weekly test reports, timetable & study notes
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Student ID / Roll Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. PC-2026-A1-042"
                  required
                  className="w-full text-xs font-mono font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-700">Password</label>
                <span className="text-[11px] text-slate-400">Default: pcstudent123</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
            >
              Sign In to Student Portal <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Credentials Helper Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-blue-700" /> Demo Student Credentials
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-1.5 py-0.5 rounded">
                Click to Auto-fill
              </span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleCopy('PC-2026-A1-042', 'Muhammad Sohaib Hafeez')}
                className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">Muhammad Sohaib Hafeez</p>
                  <p className="text-[11px] font-mono text-blue-700">
                    PC-2026-A1-042 • Day Shift (Male)
                  </p>
                </div>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700" />
              </button>

              <button
                type="button"
                onClick={() => handleCopy('PC-2026-C1-019', 'Dua Sohail')}
                className="w-full text-left p-2.5 rounded-xl bg-white border border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">Dua Sohail</p>
                  <p className="text-[11px] font-mono text-purple-700">
                    PC-2026-C1-019 • Evening Shift (Female)
                  </p>
                </div>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-700" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Need admission or inquiry?{' '}
          <Link to="/admission-form" className="text-blue-900 font-bold hover:underline">
            Apply online here &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
