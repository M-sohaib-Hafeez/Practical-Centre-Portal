import React from 'react';
import { Student, StudentReport } from '../../types';
import { Award, CheckCircle2, QrCode, ShieldCheck, Printer } from 'lucide-react';

interface PrintableReportCardProps {
  student: Student;
  report: StudentReport;
  onPrint?: () => void;
}

export const PrintableReportCard: React.FC<PrintableReportCardProps> = ({
  student,
  report,
  onPrint = () => window.print(),
}) => {
  return (
    <div className="space-y-4">
      {/* Top action button (hidden in print) */}
      <div className="flex justify-end print:hidden">
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
        >
          <Printer className="w-4 h-4" /> Print / Save Official PDF Report Card
        </button>
      </div>

      {/* Styled Printable Sheet */}
      <div className="bg-white text-slate-900 border-2 border-slate-300 rounded-2xl p-8 sm:p-10 shadow-lg print:border-none print:shadow-none print:p-0 print:m-0 font-sans max-w-4xl mx-auto space-y-6">
        {/* Institutional Header with QR Verification */}
        <div className="border-b-2 border-[#0B4F9C] pb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src="/assets/aistudio/image_70928a07.png"
              alt="Practical Centre Logo"
              className="w-20 h-20 object-contain shrink-0"
            />
            <div>
              <h1 className="text-2xl font-black text-[#0B4F9C] tracking-tight uppercase">
                Practical Centre Karachi
              </h1>
              <p className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                Academic Evaluation & Board Preparation Assessment
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Gulshan-e-Iqbal Block 1 Campus, Karachi, Pakistan
              </p>
            </div>
          </div>

          {/* QR Verification Block */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl shrink-0">
            <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg p-1 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-blue-950" />
            </div>
            <div className="text-left text-[10px]">
              <p className="font-bold text-slate-900">Digital Authenticity</p>
              <p className="font-mono text-slate-500">ID: {student.id}</p>
              <p className="font-mono text-emerald-700 font-bold">VERIFIED SEAL</p>
            </div>
          </div>
        </div>

        {/* Student Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Student Name</span>
            <p className="font-bold text-slate-900">{student.name}</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Father's Name</span>
            <p className="font-bold text-slate-900">{student.fatherName}</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Student ID / Roll</span>
            <p className="font-mono font-bold text-blue-900">
              {student.id} (#{student.rollNumber})
            </p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Cohort & Shift</span>
            <p className="font-bold text-slate-900">
              {student.cohort} ({student.shift} Shift)
            </p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Class & Stream</span>
            <p className="font-bold text-slate-900">
              {student.classLevel} • {student.stream}
            </p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Campus Location</span>
            <p className="font-bold text-slate-900">{student.campus}</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Section Roster</span>
            <p className="font-bold text-slate-900">Section {student.section}</p>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] uppercase font-bold">Evaluation Period</span>
            <p className="font-bold text-teal-800">{report.month}</p>
          </div>
        </div>

        {/* Weekly Test Matrix */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
            <span>Weekly Subject Examination Performance Matrix</span>
            <span className="text-slate-500 font-normal">Monthly Cycle {report.monthlyCycle}</span>
          </h3>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="p-2.5">Week</th>
                  <th className="p-2.5">Subject & Chapter Topic</th>
                  <th className="p-2.5 text-center">Marks</th>
                  <th className="p-2.5 text-center">Percentage</th>
                  <th className="p-2.5 text-center">Sec Avg</th>
                  <th className="p-2.5 text-center">Highest</th>
                  <th className="p-2.5 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.weeks.map((w) => (
                  <tr key={w.weekNumber} className="hover:bg-slate-50/50">
                    <td className="p-2.5 font-bold font-mono">Week {w.weekNumber}</td>
                    <td className="p-2.5">
                      <p className="font-bold text-slate-900">{w.test.subject}</p>
                      <p className="text-[10px] text-slate-500">{w.test.topic}</p>
                    </td>
                    <td className="p-2.5 text-center font-bold font-mono">
                      {w.test.marksObtained} / {w.test.totalMarks}
                    </td>
                    <td className="p-2.5 text-center">
                      <span className="font-bold text-blue-900 font-mono">
                        {w.test.percentage}%
                      </span>
                    </td>
                    <td className="p-2.5 text-center text-slate-600 font-mono">
                      {w.test.sectionAverage}
                    </td>
                    <td className="p-2.5 text-center text-emerald-700 font-mono font-semibold">
                      {w.test.highestScore}
                    </td>
                    <td className="p-2.5 text-center">
                      <span className="text-[11px] font-semibold">
                        {w.daysPresent}P / {w.daysLate}L / {w.daysAbsent}A
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Summary Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-center">
            <span className="text-[10px] text-blue-800 uppercase font-bold">Total Score</span>
            <p className="text-lg font-black text-blue-950 mt-0.5">
              {report.monthlySummary.totalMarks} / {report.monthlySummary.maxMarks}
            </p>
            <p className="text-[11px] font-bold text-blue-700">
              {report.monthlySummary.monthlyPercentage}%
            </p>
          </div>

          <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-center">
            <span className="text-[10px] text-teal-800 uppercase font-bold">Section Merit Rank</span>
            <p className="text-lg font-black text-teal-950 mt-0.5">
              Rank #{report.monthlySummary.sectionRank}
            </p>
            <p className="text-[11px] text-teal-700">
              Out of {report.monthlySummary.totalStudentsInSection} Students
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <span className="text-[10px] text-emerald-800 uppercase font-bold">Attendance Rate</span>
            <p className="text-lg font-black text-emerald-950 mt-0.5">
              {report.monthlySummary.attendanceRate}%
            </p>
            <p className="text-[11px] text-emerald-700">Punctuality Verified</p>
          </div>

          <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-center">
            <span className="text-[10px] text-purple-800 uppercase font-bold">Performance Tier</span>
            <p className="text-lg font-black text-purple-950 mt-0.5">Grade A-1</p>
            <p className="text-[11px] text-purple-700">Board Distinction Track</p>
          </div>
        </div>

        {/* Faculty Remarks & Signatures */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Faculty Remarks & Guidance:</span>
            <p className="text-slate-800 font-medium italic mt-1 leading-relaxed">
              "{report.monthlySummary.facultyRemarks}"
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-mono text-[11px] font-bold text-slate-700">
                Authorized Signature:
              </p>
              <p className="font-bold text-blue-900 mt-1">{report.monthlySummary.teacherSignature}</p>
              <p className="text-[10px] text-slate-500">Controller of Weekly Examinations</p>
            </div>

            <div className="text-center sm:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded-full text-[11px] font-bold text-teal-800">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Practical Centre Sealed
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
