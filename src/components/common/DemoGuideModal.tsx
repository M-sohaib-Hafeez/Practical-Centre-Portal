import React, { useState } from 'react';
import { useAuth, DEMO_ADMIN_OTP } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  Compass,
  X,
  UserCheck,
  Shield,
  KeyRound,
  CheckCircle,
  Copy,
  Clock,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface DemoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoGuideModal: React.FC<DemoGuideModalProps> = ({ isOpen, onClose }) => {
  const { switchUser, role, student } = useAuth();
  const { resetDemoData, adjustSimulatedTime, timeLock } = useDemoData();
  const { showToast } = useToast();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast({
      type: 'info',
      title: 'Copied to Clipboard',
      message: `${label}: ${text}`,
      duration: 2500,
    });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQuickLogin = (type: 'admin' | 'student', studentId?: string) => {
    switchUser(type, studentId);
    showToast({
      type: 'success',
      title: 'Logged in for Demo',
      message: type === 'admin' ? 'Active session: Administrator' : `Active student: ${studentId}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#073B75] via-[#0B4F9C] to-[#0A4A90] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/image_70928a07.png"
              alt="Practical Centre Logo"
              className="w-12 h-12 object-contain drop-shadow-xs"
            />
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                Presentation & Demo Guide
                <span className="text-[11px] font-semibold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  Quick Access
                </span>
              </h2>
              <p className="text-xs text-blue-100">Practical Centre Karachi • Live Evaluation Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800/50 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Quick Demo Credentials Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-blue-600" />
              Demo Credentials & 1-Click Access
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Admin Card */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">Admin Account</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                      OTP Required
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">admin@practicalcentre.edu.pk</p>
                  <p className="text-xs font-mono font-bold text-blue-700 mt-1">
                    OTP: {DEMO_ADMIN_OTP}
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" /> 1-Click Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(DEMO_ADMIN_OTP, 'Admin OTP')}
                    className="p-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600"
                    title="Copy OTP"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Student 1 Card */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">M. Sohaib Hafeez</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Day • Male
                    </span>
                  </div>
                  <p className="text-xs font-mono font-semibold text-slate-700 mt-1">PC-2026-A1-042</p>
                  <p className="text-[11px] text-slate-500">Class XII Pre-Eng (Gulshan)</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('student', 'PC-2026-A1-042')}
                    className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" /> 1-Click Student
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('PC-2026-A1-042', 'Student ID')}
                    className="p-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600"
                    title="Copy Student ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Student 2 Card */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">Dua Sohail</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                      Evening • Female
                    </span>
                  </div>
                  <p className="text-xs font-mono font-semibold text-slate-700 mt-1">PC-2026-C1-019</p>
                  <p className="text-[11px] text-slate-500">Class XII CS (PECHS)</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('student', 'PC-2026-C1-019')}
                    className="flex-1 bg-purple-700 hover:bg-purple-600 text-white text-xs font-medium py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" /> 1-Click Student
                  </button>
                  <button
                    type="button"
                    onClick={() => copyToClipboard('PC-2026-C1-019', 'Student ID')}
                    className="p-1.5 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600"
                    title="Copy Student ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Presentation Script */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-600" />
              Suggested Presentation Script (6 Key Steps)
            </h3>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Admin 2FA Login with Simulated OTP</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Navigate to <strong>Admin Login</strong>, enter credentials, and experience the 6-digit SMS OTP simulation with 60-second countdown and 3-attempt lock. Code is <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-bold">{DEMO_ADMIN_OTP}</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Attendance: Wi-Fi MAC Detection & Scanner</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Go to <strong>Admin Attendance</strong>. Test <em>Wi-Fi Gateway Simulator</em> to detect devices by MAC address, or <em>Barcode Scanner</em>. Notice cohort validation (Mon–Wed for males, Thu–Sat for females) and the 20-minute late arrival cutoff rule (15:40 Day / 18:40 Evening).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Finalize Session & Automatic Parent SMS</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Click <strong>Finalize Attendance</strong>. All unmarked students are automatically marked Absent, and instant official alerts are generated in the <strong>Parent Message Log</strong> with simulated delivery progression.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Student Portal: Reports & Printable Card</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Switch to <strong>Muhammad Sohaib Hafeez</strong> or <strong>Dua Sohail</strong>. View weekly test progression (Recharts line chart), attendance rate, monthly class rank (#3 out of 48), and click <strong>Download Report Card</strong> for a print-ready verification sheet.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                  5
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Secure Study Notes Viewer with Dynamic Watermark</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Open <strong>Notes & Study Material</strong>. Click any chapter (e.g. Physics Electrostatics). Inspect the secure canvas viewer with disabled right-click, selection blocking, and repeating diagonal watermark showing student name, roll number, IP, and timestamp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                  6
                </span>
                <div>
                  <p className="font-semibold text-slate-900">Portal Time Lock & Fast-Forward Clock</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    In Admin <strong>Portal Time Lock</strong>, click "Emergency Lock" or fast-forward simulated time. Switch to student portal to observe the live full-page countdown screen showing the reopening time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                showToast({
                  type: 'info',
                  title: 'Demo Data Reset',
                  message: 'All records restored to original mock seed state.',
                });
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Demo State to Default
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Close & Start Testing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
