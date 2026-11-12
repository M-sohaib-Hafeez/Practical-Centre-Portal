import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  FileSpreadsheet,
  FileCheck2,
  CheckCircle2,
  User,
  Clock,
  ArrowRight,
  ArrowLeft,
  Save,
  Printer,
  Sparkles,
  AlertCircle,
  QrCode,
} from 'lucide-react';
import { ClassLevel, StreamType, ShiftType, CampusLocation } from '../../types';

export const StudentForms: React.FC = () => {
  const { student } = useAuth();
  const { examForms, submitExamForm, admissions, submitAdmissionForm } = useDemoData();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'exam' | 'admission' | 'history'>('exam');

  // Comprehensive Exam Form States
  const [examType, setExamType] = useState<'Monthly Comprehensive' | 'Term Assessment' | 'Pre-Board Mock'>('Monthly Comprehensive');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Physics', 'Chemistry', 'Mathematics', 'English']);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [examSubmittedRef, setExamSubmittedRef] = useState<string | null>(null);

  // Admission Form Multi-step Wizard States
  const [admissionStep, setAdmissionStep] = useState(1);
  const [admissionData, setAdmissionData] = useState({
    studentName: student?.name || '',
    fatherName: student?.fatherName || '',
    gender: (student?.gender || 'Male') as 'Male' | 'Female',
    dob: '2008-05-12',
    guardianPhone: student?.guardianPhone || '0300-8291456',
    guardianEmail: 'guardian@gmail.com',
    previousSchool: 'Karachi Grammar School / Habib Public School',
    sscMarks: '950 / 1100 (86.3%)',
    sscBoard: 'BIEK Karachi',
    preferredClass: 'Class XII' as ClassLevel,
    preferredStream: 'Pre-Engineering' as StreamType,
    preferredShift: 'Day' as ShiftType,
    preferredCampus: 'Gulshan-e-Iqbal Block 1' as CampusLocation,
  });
  const [admissionSubmittedRef, setAdmissionSubmittedRef] = useState<string | null>(null);

  // LocalStorage draft auto-save for admission form
  const DRAFT_KEY = 'pc_admission_wizard_draft';
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        setAdmissionData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleAdmissionChange = (field: string, val: any) => {
    setAdmissionData((prev) => {
      const updated = { ...prev, [field]: val };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Exam Form Submit
  const handleExamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!declarationAccepted) {
      showToast({
        type: 'warning',
        title: 'Declaration Required',
        message: 'Please check the examination protocol agreement checkbox.',
      });
      return;
    }
    if (selectedSubjects.length === 0) {
      showToast({
        type: 'warning',
        title: 'Subjects Required',
        message: 'Please choose at least one examination subject.',
      });
      return;
    }

    const res = submitExamForm({
      studentId: student?.id || 'PC-2026-A1-042',
      studentName: student?.name || 'Muhammad Sohaib Hafeez',
      rollNumber: student?.rollNumber || '042',
      classLevel: student?.classLevel || 'Class XII',
      stream: student?.stream || 'Pre-Engineering',
      examType,
      selectedSubjects,
      declarationAccepted,
    });

    setExamSubmittedRef(res.referenceNumber);
    showToast({
      type: 'success',
      title: 'Examination Registration Submitted',
      message: `Reference: ${res.referenceNumber}`,
    });
  };

  // Admission Form Submit
  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitAdmissionForm(admissionData);
    setAdmissionSubmittedRef(res.referenceNumber);
    localStorage.removeItem(DRAFT_KEY);
    showToast({
      type: 'success',
      title: 'Admission Application Submitted',
      message: `Assigned Reference Number: ${res.referenceNumber}`,
    });
  };

  // Subjects list based on stream
  const availableSubjects = [
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'Computer Science',
    'English',
    'Urdu / Pakistan Studies',
  ];

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  // Filter history for current student
  const studentExamSubmissions = examForms.filter(
    (f) => !student || f.studentId === student.id
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-900" />
            Institutional Forms & Examination Registration
          </h1>
          <p className="text-xs text-slate-500">
            Submit formal examination slips, admission preferences, and track verification statuses.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('exam')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'exam'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Comprehensive Exam Form
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('admission')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'admission'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admission Wizard
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Submissions ({studentExamSubmissions.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Comprehensive Exam Form */}
      {activeTab === 'exam' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {examSubmittedRef ? (
            /* Success confirmation view */
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Registration Confirmed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your examination registration has been registered with Practical Centre Examination Committee.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-center">
                <p className="text-[11px] text-slate-500 uppercase font-bold">Slip Reference Number</p>
                <p className="text-xl font-bold text-blue-900 mt-1">{examSubmittedRef}</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">STATUS: PENDING DEAN REVIEW</p>
              </div>
              <button
                type="button"
                onClick={() => setExamSubmittedRef(null)}
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                Submit another examination form
              </button>
            </div>
          ) : (
            <form onSubmit={handleExamSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-bold text-slate-900">
                  Comprehensive Examination Registration Slip
                </h2>
                <p className="text-xs text-slate-500">
                  Student details are auto-verified from your active enrollment card.
                </p>
              </div>

              {/* Student Auto-filled Info Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Candidate Name</span>
                  <p className="font-bold text-slate-900">{student?.name || 'Muhammad Sohaib Hafeez'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Roll Number</span>
                  <p className="font-mono font-bold text-blue-900">{student?.id || 'PC-2026-A1-042'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Class & Stream</span>
                  <p className="font-bold text-slate-900">
                    {student?.classLevel || 'Class XII'} ({student?.stream || 'Pre-Engineering'})
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Campus</span>
                  <p className="font-bold text-slate-900">{student?.campus || 'Gulshan-e-Iqbal Block 1'}</p>
                </div>
              </div>

              {/* Exam Type Radio */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Examination Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'Monthly Comprehensive', desc: 'Standard cycle assessment' },
                    { val: 'Term Assessment', desc: 'Mid-session midterm board' },
                    { val: 'Pre-Board Mock', desc: 'Full 100-mark Sindh Board simulation' },
                  ].map((tier) => (
                    <label
                      key={tier.val}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer flex flex-col justify-between transition-all ${
                        examType === tier.val
                          ? 'border-blue-700 bg-blue-50/50 text-blue-950 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="examType"
                          value={tier.val}
                          checked={examType === tier.val}
                          onChange={() => setExamType(tier.val as any)}
                          className="text-blue-900"
                        />
                        <span>{tier.val}</span>
                      </div>
                      <span className="text-[10px] font-normal text-slate-500 mt-1">{tier.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject Selection Checkboxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Registered Exam Subjects
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableSubjects.map((sub) => {
                    const isChecked = selectedSubjects.includes(sub);
                    return (
                      <label
                        key={sub}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center gap-2.5 transition-colors ${
                          isChecked
                            ? 'bg-blue-50 border-blue-400 text-blue-950 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSubject(sub)}
                          className="rounded text-blue-900 focus:ring-blue-600"
                        />
                        <span>{sub}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={declarationAccepted}
                    onChange={(e) => setDeclarationAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-blue-900 focus:ring-blue-600"
                  />
                  <span>
                    I solemnly declare that all information furnished is accurate. I agree to abide by Practical Centre examination conduct regulations, arrive in proper attire, and understand that any unfair means will lead to immediate cancellation of enrolment.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-8 py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                Submit Examination Slip <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Admission Form Wizard (5 steps) */}
      {activeTab === 'admission' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {admissionSubmittedRef ? (
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Application Registered</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thank you for applying to Practical Centre Karachi. Your merit dossier is being audited by the Admissions Board.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-center">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Application Dossier Reference</p>
                <p className="text-xl font-bold text-teal-800 mt-1">{admissionSubmittedRef}</p>
                <p className="text-[10px] text-blue-700 font-semibold mt-1">STATUS: PENDING VERIFICATION</p>
              </div>
              <button
                type="button"
                onClick={() => setAdmissionSubmittedRef(null)}
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                Start new application
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">
                    Step {admissionStep} of 5: {
                      admissionStep === 1 ? 'Student Information' :
                      admissionStep === 2 ? 'Guardian & Contact Details' :
                      admissionStep === 3 ? 'Academic Background (Matric/SSC)' :
                      admissionStep === 4 ? 'Program & Shift Preference' : 'Review & Final Declaration'
                    }
                  </span>
                  <span className="font-mono text-slate-400">{Math.round((admissionStep / 5) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 transition-all duration-300"
                    style={{ width: `${(admissionStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Wizard Steps Form */}
              <form onSubmit={admissionStep === 5 ? handleAdmissionSubmit : (e) => { e.preventDefault(); setAdmissionStep(s => s + 1); }}>
                {/* Step 1: Student Information */}
                {admissionStep === 1 && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="font-bold text-sm text-slate-900">Step 1: Student Personal Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Full Legal Name</label>
                        <input
                          type="text"
                          required
                          value={admissionData.studentName}
                          onChange={(e) => handleAdmissionChange('studentName', e.target.value)}
                          placeholder="e.g. Usman Ghani"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Father's Name</label>
                        <input
                          type="text"
                          required
                          value={admissionData.fatherName}
                          onChange={(e) => handleAdmissionChange('fatherName', e.target.value)}
                          placeholder="e.g. Ghani-ur-Rahman"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Gender & Cohort</label>
                        <select
                          value={admissionData.gender}
                          onChange={(e) => handleAdmissionChange('gender', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        >
                          <option value="Male">Male (Mon–Wed Cohort)</option>
                          <option value="Female">Female (Thu–Sat Cohort)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Date of Birth</label>
                        <input
                          type="date"
                          value={admissionData.dob}
                          onChange={(e) => handleAdmissionChange('dob', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Guardian Details */}
                {admissionStep === 2 && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="font-bold text-sm text-slate-900">Step 2: Guardian Contact & SMS Alert Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Guardian Mobile Number (Pakistani Format)</label>
                        <input
                          type="text"
                          required
                          value={admissionData.guardianPhone}
                          onChange={(e) => handleAdmissionChange('guardianPhone', e.target.value)}
                          placeholder="03XX-XXXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 font-mono"
                        />
                        <p className="text-[10px] text-slate-400">Used for automated attendance SMS alerts</p>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Guardian Email Address</label>
                        <input
                          type="email"
                          required
                          value={admissionData.guardianEmail}
                          onChange={(e) => handleAdmissionChange('guardianEmail', e.target.value)}
                          placeholder="guardian@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Academic Background */}
                {admissionStep === 3 && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="font-bold text-sm text-slate-900">Step 3: Matric / Secondary Education Record</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="font-bold text-slate-700">Previous School / College Attended</label>
                        <input
                          type="text"
                          required
                          value={admissionData.previousSchool}
                          onChange={(e) => handleAdmissionChange('previousSchool', e.target.value)}
                          placeholder="e.g. St. Paul's English High School, Karachi"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">SSC Marks / Percentage</label>
                        <input
                          type="text"
                          required
                          value={admissionData.sscMarks}
                          onChange={(e) => handleAdmissionChange('sscMarks', e.target.value)}
                          placeholder="e.g. 942 / 1100 (85.6%)"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Examination Board</label>
                        <select
                          value={admissionData.sscBoard}
                          onChange={(e) => handleAdmissionChange('sscBoard', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        >
                          <option value="BSEK Karachi">BSEK Karachi (Board of Secondary Education)</option>
                          <option value="BIEK Karachi">BIEK Karachi</option>
                          <option value="Federal Board (FBISE)">Federal Board (FBISE)</option>
                          <option value="Cambridge O Levels">Cambridge O Levels</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Class & Stream Preference */}
                {admissionStep === 4 && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="font-bold text-sm text-slate-900">Step 4: Academic Program & Campus Preference</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Enrolment Class Level</label>
                        <select
                          value={admissionData.preferredClass}
                          onChange={(e) => handleAdmissionChange('preferredClass', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        >
                          <option value="Class IX">Class IX (Matric Science)</option>
                          <option value="Class X">Class X (Matric Science)</option>
                          <option value="Class XI">Class XI (First Year HSC)</option>
                          <option value="Class XII">Class XII (Second Year HSC)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Academic Stream</label>
                        <select
                          value={admissionData.preferredStream}
                          onChange={(e) => handleAdmissionChange('preferredStream', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        >
                          <option value="Pre-Engineering">Pre-Engineering</option>
                          <option value="Pre-Medical">Pre-Medical</option>
                          <option value="Computer Science">Computer Science</option>
                          <option value="Commerce">Commerce</option>
                          <option value="Matric Science">Matric Science</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Preferred Shift</label>
                        <select
                          value={admissionData.preferredShift}
                          onChange={(e) => handleAdmissionChange('preferredShift', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        >
                          <option value="Day">Day Shift (15:20 – 18:00)</option>
                          <option value="Evening">Evening Shift (18:20 – 21:00)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Campus Branch</label>
                        <select
                          value={admissionData.preferredCampus}
                          onChange={(e) => handleAdmissionChange('preferredCampus', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                        >
                          <option value="Gulshan-e-Iqbal Block 1">Gulshan-e-Iqbal Block 1</option>
                          <option value="PECHS Campus">PECHS Campus</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {admissionStep === 5 && (
                  <div className="space-y-4 animate-in fade-in">
                    <h3 className="font-bold text-sm text-slate-900">Step 5: Review Application Dossier</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-slate-400 uppercase text-[10px]">Student Name:</span>
                          <p className="font-bold text-slate-900">{admissionData.studentName}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase text-[10px]">Father's Name:</span>
                          <p className="font-bold text-slate-900">{admissionData.fatherName}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase text-[10px]">Class & Stream:</span>
                          <p className="font-bold text-blue-900">
                            {admissionData.preferredClass} ({admissionData.preferredStream})
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase text-[10px]">Shift & Campus:</span>
                          <p className="font-bold text-slate-900">
                            {admissionData.preferredShift} Shift • {admissionData.preferredCampus}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200 text-slate-600 text-[11px]">
                        Guardian Contact: <strong>{admissionData.guardianPhone}</strong> • Previous SSC Score: <strong>{admissionData.sscMarks}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wizard navigation buttons */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  {admissionStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setAdmissionStep((s) => s - 1)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous Step
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    {admissionStep === 5 ? 'Confirm & Submit Application' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Submission History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Registered Examination Slips</h3>
            <span className="text-xs text-slate-500 font-mono">{studentExamSubmissions.length} filed</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {studentExamSubmissions.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No examination slips filed yet.</div>
            ) : (
              studentExamSubmissions.map((sub) => (
                <div key={sub.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-900">{sub.referenceNumber}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          sub.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : sub.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900">{sub.examType}</p>
                    <p className="text-[11px] text-slate-500">
                      Subjects: {sub.selectedSubjects.join(', ')}
                    </p>
                    {sub.remarks && (
                      <p className="text-[11px] text-teal-800 italic mt-0.5">Faculty note: {sub.remarks}</p>
                    )}
                  </div>

                  <div className="text-right text-[11px] text-slate-400 font-mono">
                    Filed: {sub.submittedAt}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
