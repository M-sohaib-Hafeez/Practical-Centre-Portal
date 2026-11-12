import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import {
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  User,
  Clock,
  Filter,
} from 'lucide-react';
import { AdmissionFormSubmission, ExamFormSubmission } from '../../types';

export const AdminForms: React.FC = () => {
  const { admissions, updateAdmissionStatus, examForms, updateExamFormStatus } = useDemoData();
  const { showToast } = useToast();

  const [formType, setFormType] = useState<'admission' | 'exam'>('admission');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  // Drawer / modal inspect state
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionFormSubmission | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamFormSubmission | null>(null);
  const [remarksInput, setRemarksInput] = useState('');

  const filteredAdmissions = admissions.filter(
    (a) => statusFilter === 'All' || a.status === statusFilter
  );

  const filteredExams = examForms.filter(
    (e) => statusFilter === 'All' || e.status === statusFilter
  );

  const handleUpdateAdmission = (id: string, status: 'Approved' | 'Rejected') => {
    updateAdmissionStatus(id, status, remarksInput || undefined);
    showToast({
      type: status === 'Approved' ? 'success' : 'warning',
      title: `Admission Application ${status}`,
      message: `Updated status for applicant`,
    });
    setSelectedAdmission(null);
    setRemarksInput('');
  };

  const handleUpdateExam = (id: string, status: 'Approved' | 'Rejected') => {
    updateExamFormStatus(id, status, remarksInput || undefined);
    showToast({
      type: status === 'Approved' ? 'success' : 'warning',
      title: `Examination Registration ${status}`,
      message: `Updated candidate registration status`,
    });
    setSelectedExam(null);
    setRemarksInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-900" />
            Online Forms Review & Approval Center
          </h1>
          <p className="text-xs text-slate-500">
            Audit candidate admission dossiers and approve comprehensive examination slips.
          </p>
        </div>

        {/* Form Type Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setFormType('admission')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              formType === 'admission'
                ? 'bg-white text-blue-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Admissions ({admissions.length})
          </button>
          <button
            type="button"
            onClick={() => setFormType('exam')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              formType === 'exam'
                ? 'bg-white text-blue-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Exam Registrations ({examForms.length})
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Pending', 'Approved', 'Rejected'].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st as any)}
            className={`px-4 py-1.5 rounded-xl font-semibold border transition-all ${
              statusFilter === st
                ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {formType === 'admission' ? (
          /* Admission table */
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase">
                <tr>
                  <th className="p-3">Reference #</th>
                  <th className="p-3">Applicant Name</th>
                  <th className="p-3">Class & Stream Preference</th>
                  <th className="p-3">Campus & Shift</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAdmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      No admission applications found.
                    </td>
                  </tr>
                ) : (
                  filteredAdmissions.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-blue-900">{adm.referenceNumber}</td>
                      <td className="p-3 font-bold text-slate-900">{adm.studentName}</td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">{adm.preferredClass}</span> • {adm.preferredStream}
                      </td>
                      <td className="p-3 text-slate-600">{adm.preferredCampus} ({adm.preferredShift} Shift)</td>
                      <td className="p-3">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            adm.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : adm.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {adm.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAdmission(adm);
                            setRemarksInput(adm.remarks || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs inline-flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Review Dossier
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Exam Form table */
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase">
                <tr>
                  <th className="p-3">Roll Slip #</th>
                  <th className="p-3">Candidate & ID</th>
                  <th className="p-3">Exam Tier</th>
                  <th className="p-3">Selected Subjects</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredExams.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      No exam registrations found.
                    </td>
                  </tr>
                ) : (
                  filteredExams.map((exm) => (
                    <tr key={exm.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-blue-900">{exm.referenceNumber}</td>
                      <td className="p-3">
                        <p className="font-bold text-slate-900">{exm.studentName}</p>
                        <p className="font-mono text-[10px] text-slate-500">{exm.studentId}</p>
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{exm.examType}</td>
                      <td className="p-3 text-slate-600 line-clamp-1">{exm.selectedSubjects.join(', ')}</td>
                      <td className="p-3">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            exm.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : exm.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {exm.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedExam(exm);
                            setRemarksInput(exm.remarks || '');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs inline-flex items-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Review Slip
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Admission Modal Drawer */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedAdmission.referenceNumber}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">
                  Applicant: {selectedAdmission.studentName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAdmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700">
              <p><strong>Father's Name:</strong> {selectedAdmission.fatherName}</p>
              <p><strong>Gender / Cohort:</strong> {selectedAdmission.gender}</p>
              <p><strong>Guardian Contact:</strong> {selectedAdmission.guardianPhone} ({selectedAdmission.guardianEmail})</p>
              <p><strong>Previous Institution:</strong> {selectedAdmission.previousSchool}</p>
              <p><strong>SSC Examination Marks:</strong> {selectedAdmission.sscMarks} ({selectedAdmission.sscBoard})</p>
              <p><strong>Requested Stream:</strong> {selectedAdmission.preferredClass} • {selectedAdmission.preferredStream}</p>
              <p><strong>Preferred Shift & Campus:</strong> {selectedAdmission.preferredShift} Shift • {selectedAdmission.preferredCampus}</p>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Admissions Committee Notes / Section Assignment</label>
              <input
                type="text"
                value={remarksInput}
                onChange={(e) => setRemarksInput(e.target.value)}
                placeholder="e.g. Approved for Section A1. Merit interview cleared."
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleUpdateAdmission(selectedAdmission.id, 'Rejected')}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold transition-colors"
              >
                Reject Application
              </button>
              <button
                type="button"
                onClick={() => handleUpdateAdmission(selectedAdmission.id, 'Approved')}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
              >
                Approve & Enroll Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Exam Modal Drawer */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedExam.referenceNumber}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">
                  Candidate: {selectedExam.studentName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedExam(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700">
              <p><strong>Student ID / Roll:</strong> {selectedExam.studentId} (#{selectedExam.rollNumber})</p>
              <p><strong>Class & Stream:</strong> {selectedExam.classLevel} ({selectedExam.stream})</p>
              <p><strong>Examination Type:</strong> {selectedExam.examType}</p>
              <p><strong>Selected Subject Slips:</strong> {selectedExam.selectedSubjects.join(', ')}</p>
              <p><strong>Declaration Signed:</strong> {selectedExam.declarationAccepted ? 'Yes (Electronically Confirmed)' : 'No'}</p>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Exam Controller Remarks / Hall Assignment</label>
              <input
                type="text"
                value={remarksInput}
                onChange={(e) => setRemarksInput(e.target.value)}
                placeholder="e.g. Assigned to Hall 1, Row 3."
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleUpdateExam(selectedExam.id, 'Rejected')}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold transition-colors"
              >
                Reject Slip
              </button>
              <button
                type="button"
                onClick={() => handleUpdateExam(selectedExam.id, 'Approved')}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-colors"
              >
                Approve & Generate Roll Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
