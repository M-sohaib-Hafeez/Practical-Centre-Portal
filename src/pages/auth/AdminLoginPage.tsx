import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, DEMO_ADMIN_OTP } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  Shield,
  UserCheck,
  KeyRound,
  Lock,
  ArrowRight,
  AlertCircle,
  Clock,
  RotateCcw,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const {
    requestAdminOtp,
    verifyAdminOtp,
    resendAdminOtp,
    pendingAdminEmail,
    otpCountdown,
    otpAttemptsLeft,
    expectedOtp,
  } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Step 1 states
  const [email, setEmail] = useState('admin@practicalcentre.edu.pk');
  const [password, setPassword] = useState('admin123');

  // Step 2 OTP states
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'credentials' | 'otp'>(pendingAdminEmail ? 'otp' : 'credentials');

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = requestAdminOtp(email, password);
    if (res.success) {
      setStep('otp');
      showToast({
        type: 'sms',
        title: 'Demo: OTP Sent to Registered Mobile',
        message: `Your administrator verification code is ${res.otp || DEMO_ADMIN_OTP}`,
        duration: 9000,
      });
    } else {
      setError(res.error || 'Failed to authenticate administrator credentials.');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = verifyAdminOtp(otpInput);
    if (res.success) {
      showToast({
        type: 'success',
        title: 'Two-Factor Authentication Confirmed',
        message: 'Welcome, Administrator. Academic console session initiated.',
      });
      navigate('/admin');
    } else {
      setError(res.error || 'Incorrect OTP code entered.');
    }
  };

  const handleResend = () => {
    const res = resendAdminOtp();
    if (res.success) {
      showToast({
        type: 'sms',
        title: 'New OTP Dispatched',
        message: `Your code is ${res.otp || DEMO_ADMIN_OTP}`,
        duration: 8000,
      });
      setError(null);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Auth Mode Toggle Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/80">
          <Link
            to="/student-login"
            className="flex-1 py-3.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <UserCheck className="w-4 h-4" /> Student Portal
          </Link>
          <Link
            to="/admin-login"
            className="flex-1 py-3.5 text-center text-xs font-bold border-b-2 border-indigo-900 text-indigo-950 bg-white flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 text-indigo-900" /> Admin Console
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin & Faculty Login</h2>
            <p className="text-xs text-slate-500">
              {step === 'credentials'
                ? 'Enter authorized institutional credentials to continue'
                : 'Enter the 6-digit OTP sent to your registered mobile'}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === 'credentials' ? (
            /* Step 1: Email + Password */
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Official Admin Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@practicalcentre.edu.pk"
                  required
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">Password</label>
                  <span className="text-[11px] text-slate-400">Default: admin123</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
              >
                Continue to OTP Verification <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-[11px] text-blue-900">
                <p className="font-bold">Two-Factor Authentication Enforced:</p>
                <p className="mt-0.5 text-blue-800">
                  A 6-digit OTP code will be simulated for administrator access.
                </p>
              </div>
            </form>
          ) : (
            /* Step 2: 6-Digit OTP */
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-1.5 text-teal-300 text-xs font-bold">
                  <Smartphone className="w-4 h-4" />
                  <span>Simulated SMS Gateway</span>
                </div>
                <p className="text-xs text-slate-300">
                  Demo SMS dispatched: Use code{' '}
                  <span className="font-mono font-black text-teal-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {expectedOtp || DEMO_ADMIN_OTP}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block text-center">
                  Enter 6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="482913"
                  required
                  autoFocus
                  className="w-full text-center tracking-[0.5em] text-2xl font-mono font-bold py-3 rounded-xl border-2 border-indigo-400 focus:border-indigo-700 focus:outline-none bg-slate-50"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Expires in: {otpCountdown}s
                  </span>
                  <span>{otpAttemptsLeft} attempts remaining</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  disabled={otpInput.length !== 6 || otpCountdown <= 0}
                  className="w-full bg-indigo-950 hover:bg-indigo-900 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  Verify & Unlock Admin Console <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('credentials');
                      setError(null);
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    &larr; Back to Email
                  </button>

                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={otpCountdown > 0}
                    className="text-xs font-bold text-indigo-900 disabled:opacity-40 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Resend Code
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
