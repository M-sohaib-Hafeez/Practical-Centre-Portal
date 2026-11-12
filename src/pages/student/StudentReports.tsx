import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { PrintableReportCard } from '../../components/reports/PrintableReportCard';
import {
  FileBarChart2,
  Award,
  CheckCircle2,
  Printer,
  ChevronRight,
  TrendingUp,
  Clock,
  Sparkles,
  Calendar,
  AlertCircle,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const StudentReports: React.FC = () => {
  const { student } = useAuth();
  const { reports } = useDemoData();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  if (!student) {
    return <div className="p-8 text-center text-slate-500">Student session not found.</div>;
  }

  const report = reports[student.id] || reports['PC-2026-A1-042'];
  const activeWeekData = report.weeks.find((w) => w.weekNumber === selectedWeek) || report.weeks[0];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0B4F9C] px-2.5 py-0.5 rounded-full">
              HSC Board Preparation Dossier
            </span>
            <span className="text-xs font-mono text-slate-500">Official Evaluation Matrix</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-1">
            <FileBarChart2 className="w-5 h-5 text-[#0B4F9C]" />
            Weekly & Monthly Academic Report Cards
          </h1>
          <p className="text-xs text-slate-500">
            {report.month} (Monthly Cycle {report.monthlyCycle}) • Section {student.section} • Roll #{student.rollNumber}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsPrintModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#0B4F9C] hover:bg-[#073B75] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Printer className="w-4 h-4 text-emerald-300" /> Download & Print Official Card
        </button>
      </div>

      {/* Week Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {report.weeks.map((w) => (
          <button
            key={w.weekNumber}
            type="button"
            onClick={() => setSelectedWeek(w.weekNumber)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border shrink-0 flex items-center gap-2 ${
              selectedWeek === w.weekNumber
                ? 'bg-[#0B4F9C] text-white border-[#0B4F9C] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Week {w.weekNumber}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                selectedWeek === w.weekNumber
                  ? 'bg-[#073B75] text-emerald-300'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {w.test.percentage}%
            </span>
          </button>
        ))}
      </div>

      {/* Active Week Performance Details */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0B4F9C] px-2.5 py-0.5 rounded-full">
                Week {activeWeekData.weekNumber} Focus
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Test Conducted: {activeWeekData.test.testDate}
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              {activeWeekData.test.subject}: {activeWeekData.test.topic}
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Obtained Score</span>
            <p className="text-3xl font-black text-[#0B4F9C]">
              {activeWeekData.test.marksObtained}{' '}
              <span className="text-base font-normal text-slate-400">
                / {activeWeekData.test.totalMarks}
              </span>
            </p>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Score Percentage
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {activeWeekData.test.percentage}%
            </p>
            <span className="text-[11px] font-bold text-emerald-600">
              {activeWeekData.test.percentage >= 80 ? 'Grade A-1' : 'Grade A'}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Section Average
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {activeWeekData.test.sectionAverage}
            </p>
            <span className="text-[11px] font-bold text-[#0B4F9C]">
              +{Math.round(activeWeekData.test.marksObtained - activeWeekData.test.sectionAverage)} pts above avg
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Section Highest
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {activeWeekData.test.highestScore}
            </p>
            <span className="text-[11px] text-slate-500">Section {student.section} Top Benchmark</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Weekly Attendance
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {activeWeekData.daysPresent}/3 <span className="text-xs font-normal text-slate-500">Days</span>
            </p>
            <span className="text-[11px] font-bold text-emerald-600">100% Punctual</span>
          </div>
        </div>
      </div>

      {/* 4-Week Complete Test Matrix Table (Simple & Clear - NO GRAPHS) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Complete 4-Week Subject Examination Scorecard
            </h3>
            <p className="text-xs text-slate-500">
              Detailed performance metrics across all weekly assessment cycles
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md border border-emerald-200">
            Status: Fully Evaluated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Cycle Week</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Examined Topic</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Section Avg</th>
                <th className="py-3 px-4">Highest</th>
                <th className="py-3 px-4 text-right">Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {report.weeks.map((w) => {
                const pct = w.test.percentage;
                return (
                  <tr key={w.weekNumber} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      Week {w.weekNumber}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#0B4F9C]">
                      {w.test.subject}
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs">
                      {w.test.topic}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {w.test.testDate}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {w.test.marksObtained} / {w.test.totalMarks}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold">
                      <span className={pct >= 85 ? 'text-emerald-600' : pct >= 60 ? 'text-[#0B4F9C]' : 'text-amber-600'}>
                        {pct}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {w.test.sectionAverage}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {w.test.highestScore}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          pct >= 85
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : pct >= 60
                            ? 'bg-blue-50 text-[#0B4F9C] border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <Check className="w-3 h-3" />
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

      {/* Weekly Attendance Status Ledger (Table - NO GRAPHS) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Weekly Attendance & Discipline Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Sindh Board minimum attendance threshold requirement is 80%
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            Cumulative Attendance: {report.monthlySummary.attendanceRate}%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Week Cycle</th>
                <th className="py-3 px-4">Cohort Schedule</th>
                <th className="py-3 px-4 text-emerald-700">Days Present</th>
                <th className="py-3 px-4 text-amber-700">Days Late (&gt;20m cutoff)</th>
                <th className="py-3 px-4 text-rose-700">Days Absent</th>
                <th className="py-3 px-4">Attendance Rate</th>
                <th className="py-3 px-4 text-right">Board Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {report.weeks.map((w) => {
                const totalDays = w.daysPresent + w.daysLate + w.daysAbsent || 3;
                const attended = w.daysPresent + w.daysLate;
                const rate = Math.round((attended / totalDays) * 100);

                return (
                  <tr key={w.weekNumber} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">Week {w.weekNumber}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {student.cohort === 'Male' ? 'Mon, Tue, Wed' : 'Thu, Fri, Sat'} ({student.shift} Shift)
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600">{w.daysPresent} Days</td>
                    <td className="py-3 px-4 font-mono font-bold text-amber-600">{w.daysLate} Days</td>
                    <td className="py-3 px-4 font-mono font-bold text-rose-600">{w.daysAbsent} Days</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{rate}%</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Eligible
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Summary Card */}
      <div className="bg-gradient-to-br from-[#073B75] via-[#0B4F9C] to-[#0A4A90] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-400/30 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Cycle Performance Summary
            </span>
            <h3 className="text-2xl font-black tracking-tight mt-1">
              Monthly Cumulative Assessment
            </h3>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs text-blue-100">Total Consolidated Score:</span>
            <p className="text-3xl font-black text-emerald-300">
              {report.monthlySummary.totalMarks} / {report.monthlySummary.maxMarks}{' '}
              <span className="text-base font-normal text-blue-100">
                ({report.monthlySummary.monthlyPercentage}%)
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-blue-200">Section Rank</span>
            <p className="text-3xl font-black text-white mt-1">
              #{report.monthlySummary.sectionRank}
            </p>
            <span className="text-xs text-blue-200">
              Out of {report.monthlySummary.totalStudentsInSection} candidates
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-blue-200">Attendance Rate</span>
            <p className="text-3xl font-black text-emerald-300 mt-1">
              {report.monthlySummary.attendanceRate}%
            </p>
            <span className="text-xs text-blue-200">Punctuality Verified</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-blue-200">Board Status</span>
            <p className="text-2xl font-black text-emerald-300 mt-1">
              Cleared
            </p>
            <span className="text-xs text-blue-200">No Deficiencies</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] uppercase font-bold text-blue-200">Next Evaluation</span>
            <p className="text-xl font-black text-white mt-1">
              Dec 2026
            </p>
            <span className="text-xs text-blue-200">Pre-Board Series</span>
          </div>
        </div>

        {/* Faculty Remarks */}
        <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
            Official Faculty Remarks & Signature
          </span>
          <p className="text-xs sm:text-sm text-blue-50 leading-relaxed italic">
            "{report.monthlySummary.facultyRemarks}"
          </p>
          <div className="pt-2 flex items-center justify-between text-xs text-blue-200 border-t border-white/10">
            <span>Signed: <strong>{report.monthlySummary.teacherSignature}</strong></span>
            <span>Digital Hash: PC-VERIFIED-2026-HSC</span>
          </div>
        </div>
      </div>

      {/* Printable Report Card Modal */}
      {isPrintModalOpen && (
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

            <PrintableReportCard student={student} report={report} />
          </div>
        </div>
      )}
    </div>
  );
};
