import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  BellRing,
  Send,
  PlusCircle,
  Trash2,
  Calendar,
  Users,
  Megaphone,
  Palmtree,
  CheckCircle2,
} from 'lucide-react';
import { NotificationCategory, NotificationAudience } from '../../types';

export const AdminNotifications: React.FC = () => {
  const { notifications, addNotification } = useDemoData();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<NotificationCategory>('Announcement');
  const [audience, setAudience] = useState<NotificationAudience>('All');
  const [holidayDate, setHolidayDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSubmitting(true);
    addNotification({
      title: title.trim(),
      message: message.trim(),
      category,
      audience,
      holidayDate: category === 'Holiday' ? holidayDate : undefined,
    });

    showToast({
      type: 'success',
      title: 'Announcement Broadcast Dispatched',
      message: `Audience: ${audience} • Category: ${category}`,
    });

    setTitle('');
    setMessage('');
    setHolidayDate('');
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-blue-900" />
            Campus Broadcast & Notification Manager
          </h1>
          <p className="text-xs text-slate-500">
            Dispatch institute circulars with audience targeting (Cohort, Shift, or Campus).
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 self-start md:self-auto">
          {notifications.length} Active Circulars
        </span>
      </div>

      {/* Broadcast Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-teal-600" />
            Compose New Institutional Notice
          </h2>
          <p className="text-xs text-slate-500">
            Will instantly appear on matching students' dashboards and navigation bells.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-slate-700">Notice Title / Headline</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Schedule for Monthly Comprehensive Pre-Board Mocks"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Category Tag</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NotificationCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-medium"
              >
                <option value="Announcement">Announcement (General)</option>
                <option value="Exam">Exam / Weekly Test</option>
                <option value="Holiday">Holiday (Classes Suspended)</option>
                <option value="Attendance">Attendance Warning / Policy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Audience Scope & Cohort</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as NotificationAudience)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-medium"
              >
                <option value="All">All Students & Faculty</option>
                <option value="Male cohort">Male Cohort (Mon–Wed Only)</option>
                <option value="Female cohort">Female Cohort (Thu–Sat Only)</option>
                <option value="Morning shift">Morning Shift Students (15:20 – 18:00)</option>
                <option value="Evening shift">Evening Shift Students (18:20 – 21:00)</option>
                <option value="Gulshan campus">Gulshan-e-Iqbal Block 1 Campus</option>
              </select>
            </div>

            {category === 'Holiday' && (
              <div className="space-y-1.5 animate-in fade-in">
                <label className="font-bold text-amber-800">Public Holiday Date</label>
                <input
                  type="date"
                  value={holidayDate}
                  onChange={(e) => setHolidayDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-xs font-medium"
                />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700">Message Body Content</label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide exact instructions, syllabus breakdown, or holiday details..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-xs font-normal focus:outline-none focus:ring-2 focus:ring-blue-600 leading-relaxed"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Broadcast to Selected Audience
            </button>
          </div>
        </form>
      </div>

      {/* Dispatched Notices List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Current Noticeboard Archive</h3>
          <span className="text-xs text-slate-500 font-mono">Live on Student Portal</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {notifications.map((item) => (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div className="space-y-1 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      item.category === 'Holiday'
                        ? 'bg-amber-100 text-amber-800'
                        : item.category === 'Exam'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="font-bold text-slate-900">{item.title}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                    Audience: {item.audience}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{item.message}</p>
                {item.holidayDate && (
                  <p className="text-amber-800 font-semibold text-[11px]">
                    Holiday Date: {item.holidayDate}
                  </p>
                )}
              </div>

              <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                {item.createdAt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
