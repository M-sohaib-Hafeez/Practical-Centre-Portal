import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { StudentFilterBar, FilterCriteria } from '../../components/common/StudentFilterBar';
import {
  Award,
  CheckCircle2,
  Save,
  BookOpen,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

export const AdminMarksEntry: React.FC = () => {
  const { students, reports, enterWeeklyMarks, batchEnterWeeklyMarks } = useDemoData();
  const { showToast } = useToast();

  // Filter State
  const [filters, setFilters] = useState<FilterCriteria>({
    classLevel: 'Class XII',
    shift: 'Morning',
    cohort: 'All',
    stream: 'Pre-Engineering',
    section: 'A1',
    searchQuery: '',
  });

  // Test Configuration State
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [subject, setSubject] = useState<string>('Physics');
  const [totalMarks, setTotalMarks] = useState<number>(50);
  const [testDate, setTestDate] = useState<string>('2026-11-03');
  const [topic, setTopic] = useState<string>('Chapter 12: Electrostatics & Electric Potential');

  // Local entered marks map: studentId -> marks
  const [marksState, setMarksState] = useState<Record<string, number | ''>>({});

  // Filter Students
  const filteredStudents = students.filter((st) => {
    if (filters.classLevel !== 'All' && st.classLevel !== filters.classLevel) return false;
    if (filters.shift !== 'All' && st.shift !== filters.shift) return false;
    if (filters.cohort !== 'All' && st.cohort !== filters.cohort) return false;
    if (filters.stream !== 'All' && st.stream !== filters.stream) return false;
    if (filters.section !== 'All' && st.section !== filters.section) return false;

    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = st.name.toLowerCase().includes(q);
      const matchRoll = st.rollNumber.toLowerCase().includes(q);
      const matchId = st.id.toLowerCase().includes(q);
      if (!matchName && !matchRoll && !matchId) return false;
    }

    return true;
  });

  // Get current mark for student (from local state or reports)
  const getStudentMark = (studentId: string): number | '' => {
    if (marksState[studentId] !== undefined) {
      return marksState[studentId];
    }
    const report = reports[studentId];
    const weekData = report?.weeks.find((w) => w.weekNumber === selectedWeek);
    if (weekData && weekData.test && weekData.test.marksObtained !== undefined) {
      return weekData.test.marksObtained;
    }
    return '';
  };

  const handleMarkChange = (studentId: string, val: string) => {
    if (val === '') {
      setMarksState((prev) => ({ ...prev, [studentId]: '' }));
      return;
    }
    const num = Number(val);
    if (isNaN(num)) return;
    const clamped = Math.max(0, Math.min(totalMarks, num));
    setMarksState((prev) => ({ ...prev, [studentId]: clamped }));
  };

  const handleSaveAll = () => {
    const entriesToSave = filteredStudents.map((st) => {
      const current = getStudentMark(st.id);
      const marksObtained = typeof current === 'number' ? current : 0;
      return {
        studentId: st.id,
        marksObtained,
      };
    });

    batchEnterWeeklyMarks({
      weekNumber: selectedWeek,
      subject,
      totalMarks,
      topic,
      testDate,
      entries: entriesToSave,
    });

    showToast({
      type: 'success',
      title: 'Weekly Test Marks Published!',
      message: `Successfully saved Week ${selectedWeek} (${subject}) marks for ${entriesToSave.length} students. Visible immediately on Student Portals.`,
      duration: 4000,
    });
  };

  const handlePrefillAverage = () => {
    const target = Math.round(totalMarks * 0.84); // 84% benchmark
    const newMap: Record<string, number> = {};
    filteredStudents.forEach((st, idx) => {
      // slight realistic jitter
      const jitter = (idx % 5) - 2;
      newMap[st.id] = Math.max(0, Math.min(totalMarks, target + jitter));
    });
    setMarksState((prev) => ({ ...prev, ...newMap }));
    showToast({
      type: 'info',
      title: 'Sample Benchmark Marks Populated',
      message: `Filled sample marks (~${target}/${totalMarks}) for ${filteredStudents.length} candidates. You can fine-tune before saving.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0B4F9C] px-2.5 py-0.5 rounded-full">
              Directorate of Examinations
            </span>
            <span className="text-xs font-mono text-slate-500">Weekly Assessment Entry Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#0B4F9C]" />
            Enter & Publish Weekly Test Marks
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Input subject examination scores for students. Marks saved here update students' report cards and dashboards in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrefillAverage}
            className="text-xs font-bold text-[#0B4F9C] bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl border border-blue-200 transition-colors"
          >
            Auto-Fill Sample Marks
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 bg-[#0B4F9C] hover:bg-[#073B75] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-4 h-4 text-emerald-400" /> Save & Publish Marks
          </button>
        </div>
      </div>

      {/* Hierarchical Student Filter */}
      <StudentFilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalCount={students.length}
        filteredCount={filteredStudents.length}
        title="1. Filter Target Class & Section"
      />

      {/* Test Setup Config Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#0B4F9C]" />
            2. Configure Test Details for Selected Session
          </h2>
          <span className="text-xs text-slate-500 font-medium">Cycle: November 2026</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          {/* Week Selection */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Evaluation Week
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((wk) => (
                <button
                  key={wk}
                  type="button"
                  onClick={() => setSelectedWeek(wk)}
                  className={`py-2 rounded-xl font-bold text-xs transition-colors border ${
                    selectedWeek === wk
                      ? 'bg-[#0B4F9C] text-white border-[#0B4F9C] shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  W{wk}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Computer Science">Computer Science</option>
              <option value="English">English</option>
              <option value="Biology">Biology</option>
              <option value="Pakistan Studies">Pakistan Studies</option>
              <option value="Urdu Normal">Urdu Normal</option>
            </select>
          </div>

          {/* Total Marks */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Total Maximum Marks
            </label>
            <select
              value={totalMarks}
              onChange={(e) => setTotalMarks(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
            >
              <option value={25}>25 Marks (Quiz / Practical)</option>
              <option value={50}>50 Marks (Standard Weekly Test)</option>
              <option value={75}>75 Marks (Mid-Term Unit Test)</option>
              <option value={100}>100 Marks (Comprehensive Mock)</option>
            </select>
          </div>

          {/* Test Conduct Date */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Test Conduct Date
            </label>
            <input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
            />
          </div>

          {/* Topic */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Topic / Syllabus Examined
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Chapter 12 Theory & Numericals"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
            />
          </div>
        </div>
      </div>

      {/* Marks Entry Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              3. Student Marks Entry Grid — Week {selectedWeek} ({subject})
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredStudents.length} candidates enrolled in current selection
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-600 flex items-center gap-2">
            <span>Pass Threshold:</span>
            <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              &ge; {Math.round(totalMarks * 0.4)} / {totalMarks} (40%)
            </span>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-400" />
            <p className="font-bold text-sm text-slate-700">No students match current filter combination.</p>
            <p className="text-xs text-slate-500">
              Try adjusting the Class, Shift, Stream or Section filters above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student ID & Roll</th>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Shift & Section</th>
                  <th className="py-3 px-4">Class & Stream</th>
                  <th className="py-3 px-4 w-44">Marks Obtained (/{totalMarks})</th>
                  <th className="py-3 px-4">Percentage</th>
                  <th className="py-3 px-4">Grade & Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => {
                  const currentVal = getStudentMark(st.id);
                  const marksNum = typeof currentVal === 'number' ? currentVal : 0;
                  const pct = totalMarks > 0 ? Math.round((marksNum / totalMarks) * 100) : 0;
                  const isPassing = pct >= 40;

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B4F9C]">
                        {st.id} <br />
                        <span className="text-[10px] text-slate-500 font-normal">Roll #{st.rollNumber}</span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-[#0B4F9C] font-bold text-[10px] flex items-center justify-center border border-blue-200">
                            {st.photoInitial}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{st.name}</span>
                            <span className="text-[10px] text-slate-500">S/D/O {st.fatherName}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-slate-100 text-slate-800 border border-slate-200">
                          Sec {st.section}
                        </span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">
                          {st.shift} ({st.shift === 'Morning' ? '15:20-18:00' : '18:20-21:00'})
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800">{st.classLevel}</span>
                        <span className="block text-[10px] text-slate-500">{st.stream}</span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            max={totalMarks}
                            value={currentVal}
                            onChange={(e) => handleMarkChange(st.id, e.target.value)}
                            placeholder="0"
                            className="w-20 px-3 py-1.5 rounded-xl border border-slate-300 font-mono font-bold text-sm text-slate-900 text-center focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] bg-white shadow-2xs"
                          />
                          <span className="text-slate-400 font-medium">/ {totalMarks}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-slate-800">
                        {currentVal !== '' ? (
                          <span className={pct >= 80 ? 'text-emerald-600' : pct >= 50 ? 'text-blue-700' : 'text-rose-600'}>
                            {pct}%
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal text-xs">Unmarked</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {currentVal !== '' ? (
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              pct >= 80
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : pct >= 50
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {pct >= 80 ? 'A-1 Grade' : pct >= 70 ? 'A Grade' : pct >= 60 ? 'B Grade' : pct >= 50 ? 'C Grade' : pct >= 40 ? 'D Grade' : 'Needs Retest'}
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Pending Input</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Bottom Save Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>
              Changes update immediately in students' <strong>Weekly & Monthly Reports</strong> and <strong>Dashboard</strong>.
            </span>
          </div>

          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-2 bg-[#0B4F9C] hover:bg-[#073B75] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-4 h-4 text-emerald-400" /> Save & Publish Marks Now
          </button>
        </div>
      </div>
    </div>
  );
};
