import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { NoteItem, ClassLevel, StreamType } from '../../types';
import { SecureNotesViewer } from '../../components/notes/SecureNotesViewer';
import {
  BookOpen,
  Search,
  Filter,
  FileText,
  Lock,
  Sparkles,
  HelpCircle,
  DownloadCloud,
  FileCheck2,
  BookmarkCheck,
} from 'lucide-react';

export const StudentNotes: React.FC = () => {
  const { notes } = useDemoData();
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeViewerNote, setActiveViewerNote] = useState<NoteItem | null>(null);

  const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science'];
  const resourceTypes = [
    'All',
    'Chapter Notes',
    'Exercise Solutions',
    'Formula Sheet',
    'Past Papers',
    'MCQ Bank',
  ];

  // Filtering
  const filteredNotes = notes.filter((n) => {
    const matchSub = selectedSubject === 'All' || n.subject === selectedSubject;
    const matchType = selectedResourceType === 'All' || n.resourceType === selectedResourceType;
    const matchSearch =
      searchQuery.trim() === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSub && matchType && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-700" />
            Digital Study Material & Handouts Library
          </h1>
          <p className="text-xs text-slate-500">
            DRM watermarked notes, derivations, exercise solutions, and past board papers.
          </p>
        </div>

        {/* Security badge notice */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-teal-300 text-xs font-semibold self-start md:self-auto border border-slate-800">
          <Lock className="w-3.5 h-3.5" />
          <span>Dynamic Watermark DRM Active</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters, formulas, or topics (e.g. Electrostatics, Equilibrium, Trees)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50/50"
          />
        </div>

        {/* Subject Filter Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Filter by Subject:
          </span>
          <div className="flex flex-wrap gap-2">
            {subjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedSubject === sub
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Type Filter Chips */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Filter by Resource Type:
          </span>
          <div className="flex flex-wrap gap-2">
            {resourceTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedResourceType(t)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedResourceType === t
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredNotes.length} verified academic items</span>
          <span>Click any card to launch Secure DRM Reader</span>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
            <p className="font-semibold text-sm">No notes match your current search filters.</p>
            <p className="text-xs text-slate-400">Try clearing your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setActiveViewerNote(note)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                      {note.subject}
                    </span>
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {note.resourceType}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2">
                    {note.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {note.classLevel} ({note.stream}) • {note.chapterTitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>{note.pageCount} Pages</span>
                  </span>

                  <span className="font-bold text-blue-900 group-hover:underline flex items-center gap-1">
                    Open Reader &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Study Resources Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-400" />
          <h3 className="font-extrabold text-base tracking-tight">Board Preparation Quick Kits</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Complimentary revision summaries compiled by Practical Centre subject chairs for Sindh Board examiners.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-xs space-y-1">
            <span className="font-bold text-teal-300">Physics Numerical Vault</span>
            <p className="text-slate-300 text-[11px]">All 10-year board numerical problems with step-by-step unit marking.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-xs space-y-1">
            <span className="font-bold text-teal-300">Chemistry Organic Reactions</span>
            <p className="text-slate-300 text-[11px]">Conversion mechanisms for Hydrocarbons, Alkyl Halides and Carbonyls.</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/10 text-xs space-y-1">
            <span className="font-bold text-teal-300">Maths Calculus Cheatsheet</span>
            <p className="text-slate-300 text-[11px]">Standard derivatives, integrals, and tangent normal slopes.</p>
          </div>
        </div>
      </div>

      {/* Active Secure DRM Viewer Modal */}
      {activeViewerNote && (
        <SecureNotesViewer
          note={activeViewerNote}
          allNotes={notes}
          onClose={() => setActiveViewerNote(null)}
          onSelectNote={(n) => setActiveViewerNote(n)}
        />
      )}
    </div>
  );
};
