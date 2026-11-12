import React, { useState } from 'react';
import { NoteItem, Student } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  AlertCircle,
  Menu,
  FileText,
  Lock,
} from 'lucide-react';

interface SecureNotesViewerProps {
  note: NoteItem;
  allNotes: NoteItem[];
  onClose: () => void;
  onSelectNote: (note: NoteItem) => void;
}

export const SecureNotesViewer: React.FC<SecureNotesViewerProps> = ({
  note,
  allNotes,
  onClose,
  onSelectNote,
}) => {
  const { student, admin } = useAuth();
  const { showToast } = useToast();

  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showChapterIndex, setShowChapterIndex] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportText, setReportText] = useState('');

  // Student details for dynamic security watermark
  const watermarkName = student?.name || admin?.name || 'Authorized Portal Reader';
  const watermarkId = student?.id || admin?.email || 'PC-SECURE-AUDIT';
  const mockIp = '172.16.24.89';
  const timestampStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' PKT';

  // Prevent right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    showToast({
      type: 'warning',
      title: 'Protected Intellectual Property',
      message: 'Right-click and text copying are disabled on Practical Centre notes.',
    });
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    showToast({
      type: 'success',
      title: 'Feedback Dispatched',
      message: 'Academic department received your correction ticket.',
    });
    setReportText('');
    setIsReportModalOpen(false);
  };

  const totalPages = note.contentPages.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col text-slate-100 select-none animate-in fade-in"
      onContextMenu={handleContextMenu}
    >
      {/* Top Controls Toolbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 z-10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setShowChapterIndex(!showChapterIndex)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Chapter Index"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase bg-blue-900 text-teal-300 px-2 py-0.5 rounded border border-blue-700">
                {note.subject}
              </span>
              <span className="text-[10px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {note.resourceType}
              </span>
            </div>
            <h2 className="text-sm font-bold text-white truncate mt-0.5">{note.title}</h2>
          </div>
        </div>

        {/* Center: Pagination & Zoom */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-semibold px-2">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages - 1}
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              className="p-1.5 rounded hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="p-1.5 rounded hover:bg-slate-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
              className="p-1.5 rounded hover:bg-slate-700"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Security Badge, Report & Close */}
        <div className="flex items-center gap-2">
          <span className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-lg">
            <Lock className="w-3.5 h-3.5" /> DRM Protected
          </span>

          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            Report Error
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
            title="Close Viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Collapsible Chapter Index Drawer */}
        {showChapterIndex && (
          <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col z-20 shrink-0 animate-in slide-in-from-left">
            <div className="p-3 border-b border-slate-800 flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
              <span>Related {note.subject} Notes</span>
              <button
                type="button"
                onClick={() => setShowChapterIndex(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {allNotes
                .filter((n) => n.subject === note.subject)
                .map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectNote(item);
                      setCurrentPage(0);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                      item.id === note.id
                        ? 'bg-blue-900 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0 mt-0.5 text-teal-400" />
                    <div>
                      <p className="line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Ch. {item.chapterNumber} • {item.resourceType}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </aside>
        )}

        {/* Canvas-Style Secure Document Stage */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-slate-950/80">
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl p-8 sm:p-12 relative min-h-[900px] flex flex-col justify-between transition-transform duration-150"
          >
            {/* Repeating Diagonal Dynamic Watermark */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center opacity-15"
              style={{
                backgroundImage: `radial-gradient(circle at center, transparent 0%, transparent 100%)`,
              }}
            >
              <div
                className="w-[140%] h-[140%] flex flex-wrap content-around justify-around -rotate-25 select-none"
                style={{ userSelect: 'none' }}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="p-8 text-center text-slate-900">
                    <p className="text-base font-extrabold uppercase tracking-widest text-slate-950">
                      PRACTICAL CENTRE KARACHI
                    </p>
                    <p className="text-xs font-mono font-bold mt-0.5">
                      {watermarkName} • {watermarkId}
                    </p>
                    <p className="text-[10px] font-mono text-slate-700">
                      IP: {mockIp} • {timestampStr}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 relative z-0 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Practical Centre Karachi • Academic Resources
                </p>
                <h1 className="text-xl font-black text-slate-900 mt-0.5">{note.title}</h1>
                <p className="text-xs text-slate-500">
                  {note.classLevel} ({note.stream}) • {note.chapterTitle}
                </p>
              </div>
              <img
                src="/assets/aistudio/image_70928a07.png"
                alt="Practical Centre Logo"
                className="w-14 h-14 object-contain shrink-0"
              />
            </div>

            {/* Document Content */}
            <div className="flex-1 relative z-0 text-sm leading-relaxed whitespace-pre-line font-serif text-slate-800">
              {note.contentPages[currentPage] || 'End of chapter document.'}
            </div>

            {/* Document Footer */}
            <div className="border-t border-slate-200 pt-4 mt-8 relative z-0 flex items-center justify-between text-xs text-slate-500 font-sans">
              <span>Practical Centre Official Study Handout</span>
              <span className="font-mono font-bold">
                Page {currentPage + 1} of {totalPages}
              </span>
              <span>Karachi, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Error Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              Report Correction in Study Material
            </h3>
            <p className="text-xs text-slate-600">
              Found a typo or numerical calculation discrepancy in {note.title}? Submit a report directly to the subject review committee.
            </p>
            <form onSubmit={handleReportSubmit} className="space-y-3">
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Describe page, question or equation with suggested correction..."
                rows={4}
                required
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-900 text-white hover:bg-blue-800 rounded-xl"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
