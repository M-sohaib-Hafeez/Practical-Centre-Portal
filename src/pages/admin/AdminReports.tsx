import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { Student } from '../../types';
import { PrintableReportCard } from '../../components/reports/PrintableReportCard';
import { StudentFilterBar, FilterCriteria } from '../../components/common/StudentFilterBar';
import {
  FileBarChart2,
  Printer,
  User,
  Award,
  TrendingUp,
  Calendar,
  Filter,
  CheckCircle2,
  Check,
  AlertCircle,
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { students, reports } = useDemoData();

  // Filter State
  const [filters, setFilters] = useState<FilterCriteria>({
    classLevel: 'All',
    shift: 'All',
    cohort: 'All',
    stream: 'All',
    section: 'All',
    searchQuery: '',
  });

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id || 'PC-2026-A1-042'
  );
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Filtered Students list
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

  // If current selected student is not in filtered list, pick the first filtered one
  const activeStudent =
    filteredStudents.find((s) => s.id === selectedStudentId) ||
    filteredStudents[0] ||
    students[0];

  const report =
    reports[activeStudent?.id] || reports['PC-2026-A1-042'];

  const activeWeekData =
    report?.weeks.find((w) => w.weekNumber === selectedWeek) || report?.weeks[0];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0B4F9C] px-2.5 py-0.5 rounded-full">
              Examination & Evaluation Directorate
            </span>
            <span className="text-xs font-mono text-slate-500">Official Student Dossiers</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <FileBarChart2 className="w-6 h-6 text-[#0B4F9C]" />
            Student Academic Evaluation & Report Cards
          </h1>
          <p className="text-xs text-slate-500">
            Audit individual student performance records, weekly test marks, and generate printable Sindh Board official report cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeStudent && (
            <button
              type="button"
              onClick={() => setIsPrintModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#0B4F9C] hover:bg-[#073B75] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-300" /> Print Official Report Card
            </button>
          )}
        </div>
      </div>

      {/* Hierarchical Filter */}
      <StudentFilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalCount={students.length}
        filteredCount={filteredStudents.length}
        title="1. Filter Student Cohort & Section"
      />

      {/* Student Selector Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0B4F9C] flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <label className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider">
              2. Select Active Candidate to Inspect:
            </label>
            <select
              value={activeStudent?.id || ''}
              onChange={(e) => {
                setSelectedStudentId(e.target.value);
                setSelectedWeek(1);
              }}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
            >
              {filteredStudents.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} — {st.id} (Sec {st.section} • {st.shift} Shift • Roll #{st.rollNumber})
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeStudent && (
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 font-medium">Quick Jump:</span>
            <span className="font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
              {activeStudent.classLevel}
            </span>
            <span className="font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-[#0B4F9C] border border-blue-200">
              {activeStudent.stream}
            </span>
          </div>
        )}
      </div>

      {!activeStudent ? (
        <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
          <AlertCircle className="w-8 h-8 mx-auto text-slate-400 mb-2" />
          <p className="font-bold text-sm text-slate-700">No student selected or matches active filters.</p>
          <p className="text-xs text-slate-500">Please clear or relax your filter selections above.</p>
        </div>
      ) : (
        <>
          {/* Active Candidate Profile Banner */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0B4F9C] text-white flex items-center justify-center font-black text-xl shadow-sm">
                {activeStudent.photoInitial}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {activeStudent.cohort} Cohort
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0B4F9C]">
                    {activeStudent.id}
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">{activeStudent.name}</h2>
                <p className="text-xs text-slate-500">
                  S/D/O {activeStudent.fatherName} • Roll #{activeStudent.rollNumber} • {activeStudent.classLevel} ({activeStudent.stream})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Shift & Section</span>
                <span className="font-bold text-slate-900 text-sm">
                  {activeStudent.shift} (Sec {activeStudent.section})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Guardian Contact</span>
                <span className="font-mono font-bold text-slate-900">{activeStudent.guardianPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Overall Average</span>
                <span className="font-bold text-emerald-600 text-sm">
                  {report.monthlySummary.monthlyPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* 4-Week Test Score Matrix (Clear Table - NO GRAPHS) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  4-Week Evaluation Score Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Subject examinations conducted in {report.month}
                </p>
              </div>
              <span className="text-xs font-bold text-[#0B4F9C] bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                Total: {report.monthlySummary.totalMarks} / {report.monthlySummary.maxMarks} Marks
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Week</th>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Topic Examined</th>
                    <th className="py-2.5 px-3">Test Date</th>
                    <th className="py-2.5 px-3">Obtained / Total</th>
                    <th className="py-2.5 px-3">Percentage</th>
                    <th className="py-2.5 px-3">Section Avg</th>
                    <th className="py-2.5 px-3">Highest</th>
                    <th className="py-2.5 px-3 text-right">Result Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.weeks.map((w) => {
                    const pct = w.test.percentage;
                    return (
                      <tr key={w.weekNumber} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">Week {w.weekNumber}</td>
                        <td className="py-3 px-3 font-bold text-[#0B4F9C]">{w.test.subject}</td>
                        <td className="py-3 px-3 text-slate-600 max-w-xs">{w.test.topic}</td>
                        <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{w.test.testDate}</td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">
                          {w.test.marksObtained} / {w.test.totalMarks}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold">
                          <span className={pct >= 85 ? 'text-emerald-600' : pct >= 60 ? 'text-[#0B4F9C]' : 'text-amber-600'}>
                            {pct}%
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">{w.test.sectionAverage}</td>
                        <td className="py-3 px-3 font-mono text-slate-500">{w.test.highestScore}</td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              pct >= 85
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : pct >= 60
                                ? 'bg-blue-50 text-[#0B4F9C] border border-blue-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5" />
                            {pct >= 85 ? 'Distinction' : 'Standard'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attendance Ledger Table (NO GRAPHS) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Candidate Attendance & Cutoff Compliance Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Weekly cohort records with 20-minute shift cutoff status
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                Punctuality Rate: {report.monthlySummary.attendanceRate}%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Week</th>
                    <th className="py-2.5 px-3">Days Present</th>
                    <th className="py-2.5 px-3">Days Late</th>
                    <th className="py-2.5 px-3">Days Absent</th>
                    <th className="py-2.5 px-3">Weekly Attendance %</th>
                    <th className="py-2.5 px-3 text-right">Discipline Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.weeks.map((w) => {
                    const total = w.daysPresent + w.daysLate + w.daysAbsent || 3;
                    const attended = w.daysPresent + w.daysLate;
                    const rate = Math.round((attended / total) * 100);

                    return (
                      <tr key={w.weekNumber} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-bold text-slate-900">Week {w.weekNumber}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-600">{w.daysPresent} Days</td>
                        <td className="py-3 px-3 font-mono font-bold text-amber-600">{w.daysLate} Days</td>
                        <td className="py-3 px-3 font-mono font-bold text-rose-600">{w.daysAbsent} Days</td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">{rate}%</td>
                        <td className="py-3 px-3 text-right">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Satisfactory
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Printable Report Card Modal */}
      {isPrintModalOpen && activeStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-base font-bold text-slate-900">
                Official Sindh Board Report Card Dossier Preview
              </h3>
              <button
                type="button"
                onClick={() => setIsPrintModalOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                Close Preview
              </button>
            </div>

            <PrintableReportCard student={activeStudent} report={report} />
          </div>
        </div>
      )}
    </div>
  );
};
