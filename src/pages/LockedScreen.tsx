import React, { useState, useEffect } from 'react';
import { useDemoData } from '../context/DemoDataContext';
import { useAuth } from '../context/AuthContext';
import { Lock, Clock, AlertCircle, ShieldAlert, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LockedScreenProps {
  featureName?: string;
}

export const LockedScreen: React.FC<LockedScreenProps> = ({ featureName }) => {
  const { timeLock, simulatedNow, resetSimulatedTime, toggleEmergencyLock } = useDemoData();
  const { role } = useAuth();

  // Compute countdown to reopening
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    if (!timeLock.endTime) {
      setTimeLeft({ hours: 14, minutes: 22, seconds: 45, isPast: false });
      return;
    }

    const targetDate = new Date(timeLock.endTime);
    // If time is currently past end time, reopening is typically the next scheduled opening time
    // Let's compute a realistic countdown (e.g. until next morning 08:00 or target reopening)
    const diffMs = Math.max(0, 14 * 3600 * 1000 + 15 * 60 * 1000 - ((simulatedNow.getTime() % 86400000) % 3600000));
    const totalSeconds = Math.floor(diffMs / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setTimeLeft({
      hours: Math.max(1, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
      isPast: false,
    });
  }, [timeLock.endTime, simulatedNow]);

  const targetLabel = featureName || timeLock.target;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-100">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center space-y-6 animate-in zoom-in-95">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-inner">
          <Lock className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Portal Access Restricted</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {targetLabel} is Currently Locked
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            In compliance with Practical Centre examination protocols and daily operational curfew, access to this academic module is temporarily locked.
          </p>
        </div>

        {/* Live Countdown Card */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-3">
          <p className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-400" /> Reopening In
          </p>
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 min-w-[64px]">
              <span className="font-mono text-2xl font-black text-teal-300">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5">Hours</p>
            </div>
            <span className="text-2xl font-mono text-slate-500 font-bold">:</span>
            <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 min-w-[64px]">
              <span className="font-mono text-2xl font-black text-teal-300">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5">Mins</p>
            </div>
            <span className="text-2xl font-mono text-slate-500 font-bold">:</span>
            <div className="bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 min-w-[64px]">
              <span className="font-mono text-2xl font-black text-teal-300">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <p className="text-[10px] text-slate-400 uppercase mt-0.5">Secs</p>
            </div>
          </div>
          <p className="text-xs text-teal-300/90 font-medium">
            Scheduled Reopening: {timeLock.reopenTimeDescription || 'Tomorrow at 08:00 AM PKT'}
          </p>
        </div>

        {/* Info & Admin Override */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-left flex items-start gap-3 text-xs text-blue-900">
          <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Demo Simulation Notice</p>
            <p className="text-blue-800/80 mt-0.5">
              Portal Time Lock is active. In production, this curfew restricts student access after testing sessions. Administrators can override or adjust this in the Admin Panel.
            </p>
          </div>
        </div>

        {/* Quick Demo Controls */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>

          <button
            type="button"
            onClick={resetSimulatedTime}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Reset Demo Clock
          </button>

          {role === 'admin' && (
            <button
              type="button"
              onClick={toggleEmergencyLock}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              Unlock Now (Admin Override)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
