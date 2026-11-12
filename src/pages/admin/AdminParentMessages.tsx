import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  MessageSquareShare,
  Send,
  RotateCcw,
  Smartphone,
  CheckCircle2,
  Clock,
  HelpCircle,
  Plus,
  X,
  Search,
} from 'lucide-react';

export const AdminParentMessages: React.FC = () => {
  const { parentMessages, resendParentMessage, sendManualParentMessage, students } = useDemoData();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [manualText, setManualText] = useState(
    "Respected Parent, this is an official circular regarding tomorrow's mandatory Physics mock examination at Practical Centre."
  );

  const filteredMessages = parentMessages.filter(
    (m) =>
      m.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.messageText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResend = (id: string, name: string) => {
    resendParentMessage(id);
    showToast({
      type: 'sms',
      title: 'SMS Resent Successfully',
      message: `Parent notification redispatched for ${name}`,
    });
  };

  const handleSendManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim() || !selectedStudentId) return;

    sendManualParentMessage(selectedStudentId, manualText.trim());
    showToast({
      type: 'sms',
      title: 'Manual SMS Queued & Sent',
      message: 'Dispatched to guardian contact number.',
    });
    setIsManualModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MessageSquareShare className="w-5 h-5 text-blue-900" />
            Automatic Parent SMS & WhatsApp Notification Log
          </h1>
          <p className="text-xs text-slate-500">
            Real-time delivery log for automated absence notices and institutional parent alerts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsManualModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-teal-300" /> Dispatch Custom Parent Alert
        </button>
      </div>

      {/* Production Notice Disclaimer */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-950 flex items-start gap-3">
        <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold">Production Integration Architecture Note:</p>
          <p className="text-blue-900/90 leading-relaxed">
            <strong>Demo Simulation Active:</strong> In production at Practical Centre Karachi, this module connects to Telenor / Jazz Telco SMS Gateway and WhatsApp Business Cloud API to dispatch real-time cellular text messages directly to Pakistani numbers (03XX-XXXXXXX).
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student, guardian, phone number or text..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-slate-50/50"
          />
        </div>

        <span className="font-mono text-slate-500 font-semibold">
          {filteredMessages.length} Messages Recorded
        </span>
      </div>

      {/* Messages Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase">
              <tr>
                <th className="p-3">Candidate & Roll</th>
                <th className="p-3">Guardian & Phone</th>
                <th className="p-3">Channel</th>
                <th className="p-3">SMS Notification Body</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No parent messages recorded yet. Finalizing an attendance session with absences will automatically populate this log.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <p className="font-bold text-slate-900">{msg.studentName}</p>
                      <p className="font-mono text-[10px] text-blue-700">{msg.studentId}</p>
                    </td>

                    <td className="p-3">
                      <p className="font-semibold text-slate-800">{msg.guardianName}</p>
                      <p className="font-mono text-[11px] text-slate-500">{msg.phone}</p>
                    </td>

                    <td className="p-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          msg.channel === 'WhatsApp'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {msg.channel}
                      </span>
                    </td>

                    <td className="p-3 max-w-sm">
                      <p className="text-slate-700 text-[11px] leading-relaxed line-clamp-2">
                        {msg.messageText}
                      </p>
                    </td>

                    <td className="p-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {msg.timestamp}
                    </td>

                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {msg.status}
                      </span>
                    </td>

                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleResend(msg.id, msg.studentName)}
                        className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold text-[11px] text-slate-700 transition-colors inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3 text-slate-500" /> Resend
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual SMS Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-700" />
                Dispatch Custom Guardian Alert
              </h3>
              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendManual} className="space-y-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Select Student Candidate</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.guardianName} - {st.guardianPhone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">SMS Notification Message</label>
                <textarea
                  rows={4}
                  required
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Dispatch SMS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
