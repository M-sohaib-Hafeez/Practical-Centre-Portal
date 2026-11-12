import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  LockKeyhole,
  Clock,
  FastForward,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { TimeLockTarget } from '../../types';

export const AdminTimeLock: React.FC = () => {
  const {
    timeLock,
    updateTimeLock,
    adjustSimulatedTime,
    resetSimulatedTime,
    toggleEmergencyLock,
    simulatedNow,
  } = useDemoData();
  const { showToast } = useToast();

  const [target, setTarget] = useState<TimeLockTarget>(timeLock.target);
  const [isEnabled, setIsEnabled] = useState(timeLock.isEnabled);
  const [startTime, setStartTime] = useState(
    timeLock.startTime ? timeLock.startTime.substring(0, 16) : '2026-11-10T08:00'
  );
  const [endTime, setEndTime] = useState(
    timeLock.endTime ? timeLock.endTime.substring(0, 16) : '2026-11-10T20:00'
  );
  const [reopenDesc, setReopenDesc] = useState(timeLock.reopenTimeDescription || 'Tomorrow 08:00 AM PKT');

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateTimeLock({
      isEnabled,
      target,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      reopenTimeDescription: reopenDesc,
    });

    showToast({
      type: 'success',
      title: 'Time Lock Configuration Applied',
      message: `Active window configured for ${target}`,
    });
  };

  const simulatedTimeString = simulatedNow.toLocaleString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <LockKeyhole className="w-5 h-5 text-rose-600" />
            Portal Time Lock & Operational Curfew Controller
          </h1>
          <p className="text-xs text-slate-500">
            Define access windows to prevent exam cheating, enforce night cutoffs, or simulate maintenance modes.
          </p>
        </div>

        {/* Emergency Lock/Unlock button */}
        <button
          type="button"
          onClick={() => {
            toggleEmergencyLock();
            showToast({
              type: !timeLock.isEmergencyLocked ? 'warning' : 'success',
              title: !timeLock.isEmergencyLocked ? 'Emergency Lock Activated' : 'Lock Overridden',
              message: !timeLock.isEmergencyLocked
                ? 'Students are now blocked from accessing target features.'
                : 'Portal access unlocked for students.',
            });
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors self-start md:self-auto flex items-center gap-2 ${
            timeLock.isEmergencyLocked
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-rose-600 hover:bg-rose-700 text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{timeLock.isEmergencyLocked ? 'Unlock Now (Release Lock)' : 'Lock Now (Instant Curfew)'}</span>
        </button>
      </div>

      {/* Demo Clock Simulator Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-extrabold tracking-tight">
                Simulated Master Clock
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Accelerate demo time forward to test lock enforcement without waiting hours.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 px-4 py-2 rounded-2xl text-center">
            <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider block">
              Simulated System Time
            </span>
            <span className="font-mono text-xl font-black text-white">
              {simulatedTimeString}
            </span>
          </div>
        </div>

        {/* Fast forward controls */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-bold text-slate-300">Fast-Forward Simulated Time:</span>
          <button
            type="button"
            onClick={() => {
              adjustSimulatedTime(30);
              showToast({ type: 'info', title: 'Clock Fast-Forwarded', message: '+30 Minutes added' });
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 font-semibold"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" /> +30 Mins
          </button>
          <button
            type="button"
            onClick={() => {
              adjustSimulatedTime(60);
              showToast({ type: 'info', title: 'Clock Fast-Forwarded', message: '+1 Hour added' });
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 font-semibold"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" /> +1 Hour
          </button>
          <button
            type="button"
            onClick={() => {
              adjustSimulatedTime(720);
              showToast({ type: 'info', title: 'Clock Fast-Forwarded', message: '+12 Hours added' });
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 font-semibold"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" /> +12 Hours
          </button>
          <button
            type="button"
            onClick={() => {
              adjustSimulatedTime(1440);
              showToast({ type: 'info', title: 'Clock Fast-Forwarded', message: '+1 Day added' });
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1 font-semibold"
          >
            <FastForward className="w-3.5 h-3.5 text-cyan-400" /> +1 Full Day
          </button>
          <button
            type="button"
            onClick={() => {
              resetSimulatedTime();
              showToast({ type: 'info', title: 'Clock Synchronized', message: 'Reset to local device time' });
            }}
            className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 px-3 py-1.5 rounded-xl border border-rose-800 flex items-center gap-1 font-semibold ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to Real Time
          </button>
        </div>
      </div>

      {/* Lock Configuration Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900">
            Automated Access Window Configuration
          </h2>
          <p className="text-xs text-slate-500">
            When current time is outside the permitted window, students are automatically redirected to the full-page countdown screen.
          </p>
        </div>

        <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="enableLock"
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-blue-900 focus:ring-blue-600"
            />
            <label htmlFor="enableLock" className="font-bold text-slate-900 text-sm cursor-pointer">
              Enable Scheduled Time Lock Enforcement
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Restricted Feature Target</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value as TimeLockTarget)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Entire Student Portal">Entire Student Portal</option>
                <option value="Notes only">Notes & Study Material Only</option>
                <option value="Online Forms only">Online Forms Only</option>
                <option value="Weekly Reports only">Weekly Reports Only</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Permitted Start Window</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Permitted End Window (Lock After)</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Reopening Announcement Description</label>
            <input
              type="text"
              value={reopenDesc}
              onChange={(e) => setReopenDesc(e.target.value)}
              placeholder="e.g. Tomorrow 08:00 AM PKT"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-300" /> Save Time Lock Rules
          </button>
        </form>
      </div>

      {/* Information Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Administrative Exemption Guarantee:</p>
          <p className="text-blue-900/90 leading-relaxed">
            Faculty and administrator accounts are never locked out by Portal Time Lock. You will always maintain full access to all admin tools regardless of configured curfew windows or simulated clock changes.
          </p>
        </div>
      </div>
    </div>
  );
};
