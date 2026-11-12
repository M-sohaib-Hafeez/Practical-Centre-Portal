import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDemoData } from '../context/DemoDataContext';
import { useToast } from '../context/ToastContext';
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Printer,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { ClassLevel, StreamType, ShiftType, CampusLocation } from '../types';

export const AdmissionApplyPage: React.FC = () => {
  const { submitAdmissionForm } = useDemoData();
  const { showToast } = useToast();

  const [admissionStep, setAdmissionStep] = useState(1);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    gender: 'Male' as 'Male' | 'Female',
    dob: '2008-04-10',
    guardianPhone: '0300-8291456',
    guardianEmail: 'guardian@gmail.com',
    previousSchool: 'Karachi Public School',
    sscMarks: '945 / 1100 (85.9%)',
    sscBoard: 'BSEK Karachi',
    preferredClass: 'Class XI' as ClassLevel,
    preferredStream: 'Pre-Engineering' as StreamType,
    preferredShift: 'Day' as ShiftType,
    preferredCampus: 'Gulshan-e-Iqbal Block 1' as CampusLocation,
  });

  const DRAFT_KEY = 'pc_public_admission_draft';
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        setFormData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleChange = (field: string, val: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: val };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = submitAdmissionForm(formData);
    setSubmittedRef(res.referenceNumber);
    localStorage.removeItem(DRAFT_KEY);
    showToast({
      type: 'success',
      title: 'Application Received Successfully',
      message: `Assigned Reference Number: ${res.referenceNumber}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Session 2026–27 Academic Admissions</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Practical Centre Admission Application
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Complete your registration for Class IX, X, XI, or XII across Pre-Engineering, Pre-Medical, Computer Science, and Commerce.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        {submittedRef ? (
          /* Success Screen */
          <div className="text-center py-8 space-y-6 max-w-lg mx-auto animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-200 shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Application Registered</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your admission application dossier has been cataloged in the Practical Centre Admissions database. Please retain this reference receipt for your interview.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-300 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Application Reference</p>
                  <p className="font-mono text-xl font-black text-blue-900">{submittedRef}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                    PENDING VERIFICATION
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Applicant</span>
                  <p className="font-bold text-slate-900">{formData.studentName}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Guardian Contact</span>
                  <p className="font-mono font-bold text-slate-900">{formData.guardianPhone}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Program</span>
                  <p className="font-bold text-slate-900">{formData.preferredClass} ({formData.preferredStream})</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Shift & Campus</span>
                  <p className="font-bold text-slate-900">{formData.preferredShift} Shift • {formData.preferredCampus}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 bg-blue-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-blue-800 transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4" /> Print Admission Receipt
              </button>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-slate-200 transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">
                  Step {admissionStep} of 5: {
                    admissionStep === 1 ? 'Applicant Identification' :
                    admissionStep === 2 ? 'Guardian & Cellular Details' :
                    admissionStep === 3 ? 'Matric / Secondary Record' :
                    admissionStep === 4 ? 'Program Preference' : 'Declaration & Final Review'
                  }
                </span>
                <span className="font-mono text-slate-400 font-bold">{Math.round((admissionStep / 5) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-900 transition-all duration-300"
                  style={{ width: `${(admissionStep / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={admissionStep === 5 ? handleSubmit : (e) => { e.preventDefault(); setAdmissionStep(s => s + 1); }}>
              {admissionStep === 1 && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  <h3 className="font-bold text-sm text-slate-900">Step 1: Student Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => handleChange('studentName', e.target.value)}
                        placeholder="e.g. Sara Qureshi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Father's Name</label>
                      <input
                        type="text"
                        required
                        value={formData.fatherName}
                        onChange={(e) => handleChange('fatherName', e.target.value)}
                        placeholder="e.g. Irfan Qureshi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Gender & Cohort</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
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
                        value={formData.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {admissionStep === 2 && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  <h3 className="font-bold text-sm text-slate-900">Step 2: Guardian & SMS Alert Contact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Guardian Mobile Number (Pakistani Format)</label>
                      <input
                        type="text"
                        required
                        value={formData.guardianPhone}
                        onChange={(e) => handleChange('guardianPhone', e.target.value)}
                        placeholder="03XX-XXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Guardian Email</label>
                      <input
                        type="email"
                        required
                        value={formData.guardianEmail}
                        onChange={(e) => handleChange('guardianEmail', e.target.value)}
                        placeholder="guardian@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {admissionStep === 3 && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  <h3 className="font-bold text-sm text-slate-900">Step 3: Academic Background</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="font-bold text-slate-700">Previous School / College</label>
                      <input
                        type="text"
                        required
                        value={formData.previousSchool}
                        onChange={(e) => handleChange('previousSchool', e.target.value)}
                        placeholder="e.g. Mama Parsi Girls Secondary School"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">SSC Marks / Grade</label>
                      <input
                        type="text"
                        required
                        value={formData.sscMarks}
                        onChange={(e) => handleChange('sscMarks', e.target.value)}
                        placeholder="e.g. 980 / 1100 (89.0%)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Board</label>
                      <select
                        value={formData.sscBoard}
                        onChange={(e) => handleChange('sscBoard', e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      >
                        <option value="BSEK Karachi">BSEK Karachi</option>
                        <option value="BIEK Karachi">BIEK Karachi</option>
                        <option value="Federal Board (FBISE)">Federal Board (FBISE)</option>
                        <option value="Cambridge O Levels">Cambridge O Levels</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {admissionStep === 4 && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  <h3 className="font-bold text-sm text-slate-900">Step 4: Academic Program & Shift Selection</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Enrolling Class</label>
                      <select
                        value={formData.preferredClass}
                        onChange={(e) => handleChange('preferredClass', e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      >
                        <option value="Class IX">Class IX</option>
                        <option value="Class X">Class X</option>
                        <option value="Class XI">Class XI (First Year HSC)</option>
                        <option value="Class XII">Class XII (Second Year HSC)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Stream</label>
                      <select
                        value={formData.preferredStream}
                        onChange={(e) => handleChange('preferredStream', e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      >
                        <option value="Pre-Engineering">Pre-Engineering</option>
                        <option value="Pre-Medical">Pre-Medical</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Commerce">Commerce</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Shift</label>
                      <select
                        value={formData.preferredShift}
                        onChange={(e) => handleChange('preferredShift', e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      >
                        <option value="Day">Day Shift (15:20 – 18:00)</option>
                        <option value="Evening">Evening Shift (18:20 – 21:00)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Campus</label>
                      <select
                        value={formData.preferredCampus}
                        onChange={(e) => handleChange('preferredCampus', e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50"
                      >
                        <option value="Gulshan-e-Iqbal Block 1">Gulshan-e-Iqbal Block 1</option>
                        <option value="PECHS Campus">PECHS Campus</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {admissionStep === 5 && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  <h3 className="font-bold text-sm text-slate-900">Step 5: Review & Submit Dossier</h3>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold">Applicant</span>
                        <p className="font-bold text-slate-900">{formData.studentName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold">Father's Name</span>
                        <p className="font-bold text-slate-900">{formData.fatherName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold">Academic Stream</span>
                        <p className="font-bold text-blue-900">{formData.preferredClass} ({formData.preferredStream})</p>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase font-bold">Shift & Campus</span>
                        <p className="font-bold text-slate-900">{formData.preferredShift} Shift • {formData.preferredCampus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Nav */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {admissionStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setAdmissionStep((s) => s - 1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  {admissionStep === 5 ? 'Submit Application Dossier' : 'Next Step'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
