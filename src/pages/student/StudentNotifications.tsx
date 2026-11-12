import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import {
  BellRing,
  CheckCheck,
  Calendar,
  AlertCircle,
  Megaphone,
  Palmtree,
  BookOpen,
  Clock,
  Filter,
} from 'lucide-react';
import { NotificationCategory } from '../../types';

export const StudentNotifications: React.FC = () => {
  const { student } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useDemoData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!student) {
    return <div className="p-8 text-center text-slate-500">Student session not found.</div>;
  }

  // Filter relevant notifications for current student
  const relevant = notifications.filter((n) => {
    if (n.audience === 'All') return true;
    if (n.audience === 'Male cohort' && student.cohort === 'Male') return true;
    if (n.audience === 'Female cohort' && student.cohort === 'Female') return true;
    if (n.audience === 'Morning shift' && student.shift === 'Morning') return true;
    if (n.audience === 'Evening shift' && student.shift === 'Evening') return true;
    if (n.audience === 'Gulshan campus' && student.campus.includes('Gulshan')) return true;
    return false;
  });

  const categories = ['All', 'Holiday', 'Exam', 'Announcement', 'Attendance'];

  const filtered = relevant.filter(
    (n) => selectedCategory === 'All' || n.category === selectedCategory
  );

  const unreadCount = relevant.filter((n) => !(n.isReadBy || []).includes(student.id)).length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-blue-900" />
            Central Notification Center
          </h1>
          <p className="text-xs text-slate-500">
            Official institute notices, holiday circulars, exam announcements & attendance alerts.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() => markAllNotificationsAsRead(student.id)}
            className="inline-flex items-center gap-1.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
          >
            <CheckCheck className="w-4 h-4 text-teal-300" /> Mark all ({unreadCount}) as read
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedCategory === cat
                ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
            No notifications in this category.
          </div>
        ) : (
          filtered.map((item) => {
            const isRead = (item.isReadBy || []).includes(student.id);
            const isHoliday = item.category === 'Holiday';
            const isExam = item.category === 'Exam';
            const isAttendance = item.category === 'Attendance';

            return (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id, student.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  !isRead
                    ? isHoliday
                      ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                      : 'bg-blue-50/60 border-blue-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isHoliday
                          ? 'bg-amber-500 text-white'
                          : isExam
                          ? 'bg-rose-600 text-white'
                          : isAttendance
                          ? 'bg-blue-600 text-white'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {isHoliday && <Palmtree className="w-5 h-5" />}
                      {isExam && <Calendar className="w-5 h-5" />}
                      {isAttendance && <Clock className="w-5 h-5" />}
                      {!isHoliday && !isExam && !isAttendance && <Megaphone className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            isHoliday
                              ? 'bg-amber-200 text-amber-900'
                              : isExam
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        {!isRead && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                        {item.message}
                      </p>
                      {item.holidayDate && (
                        <p className="text-[11px] font-bold text-amber-800 mt-1">
                          Observance Date: {item.holidayDate} (All classes suspended)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-[11px] text-slate-400 font-mono shrink-0">
                    {item.createdAt}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
