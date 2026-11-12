import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  BookOpen,
  Plus,
  Upload,
  FileText,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { ClassLevel, StreamType } from '../../types';

export const AdminNotesManager: React.FC = () => {
  const { notes, addNote } = useDemoData();
  const { showToast } = useToast();

  const [title, setTitle] = useState('');
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class XII');
  const [stream, setStream] = useState<StreamType>('Pre-Engineering');
  const [subject, setSubject] = useState('Physics');
  const [chapterNumber, setChapterNumber] = useState(13);
  const [chapterTitle, setChapterTitle] = useState('Current Electricity & Kirchhoff’s Laws');
  const [resourceType, setResourceType] = useState<
    'Chapter Notes' | 'Exercise Solutions' | 'MCQ Bank' | 'Formula Sheet' | 'Past Papers'
  >('Chapter Notes');
  const [fileName, setFileName] = useState('Physics_Ch13_Theory_Notes.pdf');
  const [sampleContent, setSampleContent] = useState(
    `PRACTICAL CENTRE KARACHI\nDEPARTMENT OF PHYSICS | CLASS XII\nCHAPTER 13: CURRENT ELECTRICITY\n\n1. Ohm's Law & Limitations:\nAt constant temperature, current I flowing through a conductor is directly proportional to the potential difference V across its ends: V = IR.\n\n2. Kirchhoff's Laws:\n- First Law (KCL): The algebraic sum of all currents meeting at a junction is zero: Σ I = 0.\n- Second Law (KVL): The algebraic sum of all potential changes across a closed circuit loop is zero: Σ V = 0.`
  );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !chapterTitle.trim()) return;

    addNote({
      title: title.trim(),
      classLevel,
      stream,
      subject,
      chapterNumber: Number(chapterNumber),
      chapterTitle: chapterTitle.trim(),
      resourceType,
      fileSize: '3.4 MB',
      pageCount: 1,
      contentPages: [sampleContent],
    });

    showToast({
      type: 'success',
      title: 'Digital Note Published',
      message: `"${title}" is now available in student study portal with DRM watermark.`,
    });

    setTitle('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-900" />
            Study Notes & DRM Library Manager
          </h1>
          <p className="text-xs text-slate-500">
            Publish official Practical Centre study materials, derivations, and solved test papers.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 self-start md:self-auto">
          {notes.length} Handouts Published
        </span>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Upload className="w-4 h-4 text-teal-600" />
            Upload & Publish Academic Handout
          </h2>
          <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Auto DRM Watermarking Enabled
          </span>
        </div>

        <form onSubmit={handleUpload} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-slate-700">Document Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Kirchhoff's Laws & Wheatstone Bridge Comprehensive Derivations"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Class Level</label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Class XII">Class XII (HSC-II)</option>
                <option value="Class XI">Class XI (HSC-I)</option>
                <option value="Class X">Class X (SSC-II)</option>
                <option value="Class IX">Class IX (SSC-I)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value as StreamType)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Pre-Engineering">Pre-Engineering</option>
                <option value="Pre-Medical">Pre-Medical</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Chapter #</label>
              <input
                type="number"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Resource Category</label>
              <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Chapter Notes">Chapter Notes</option>
                <option value="Exercise Solutions">Exercise Solutions</option>
                <option value="MCQ Bank">MCQ Bank</option>
                <option value="Formula Sheet">Formula Sheet</option>
                <option value="Past Papers">Past Papers</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Chapter Name</label>
            <input
              type="text"
              required
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="e.g. Chapter 13: Current Electricity"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">Document Body Content (Page 1)</label>
            <textarea
              rows={4}
              value={sampleContent}
              onChange={(e) => setSampleContent(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50/50 font-mono text-[11px]"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-300" /> Publish Digital Note
          </button>
        </form>
      </div>

      {/* Existing Notes Inventory */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Current Notes Catalog</h3>
          <span className="text-xs text-slate-500 font-mono">{notes.length} documents live</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {notes.map((n) => (
            <div key={n.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-blue-900 text-sm">{n.title}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
                    {n.subject}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                    {n.resourceType}
                  </span>
                </div>
                <p className="text-slate-500">
                  {n.classLevel} ({n.stream}) • Ch. {n.chapterNumber}: {n.chapterTitle} • {n.pageCount} Pages ({n.fileSize})
                </p>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                Uploaded: {n.uploadedAt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
