import React, { useState } from 'react';
import { useDemoData } from '../../context/DemoDataContext';
import { useToast } from '../../context/ToastContext';
import { StudentFilterBar, FilterCriteria } from '../../components/common/StudentFilterBar';
import { Student } from '../../types';
import {
  Users,
  KeyRound,
  Shield,
  Eye,
  EyeOff,
  Edit3,
  Check,
  X,
  Smartphone,
  Wifi,
  Phone,
  UserCheck,
  Sparkles,
  RefreshCw,
  Search,
  Lock,
  User,
  GraduationCap,
} from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const { students, updateStudentPassword, updateStudentDetails } = useDemoData();
  const { showToast } = useToast();

  // Filter State
  const [filters, setFilters] = useState<FilterCriteria>({
    classLevel: 'All',
    shift: 'All',
    cohort: 'All',
    stream: 'All',
    section: 'All',
    searchQuery: '',
  });

  // Password Visibility Toggle for Table
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});

  // Active Student for Password Edit Modal
  const [selectedStudentForPassword, setSelectedStudentForPassword] = useState<Student | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // Active Student for Details View Drawer
  const [profileStudent, setProfileStudent] = useState<Student | null>(null);

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
      const matchFather = st.fatherName.toLowerCase().includes(q);
      const matchPhone = st.guardianPhone.includes(q);
      if (!matchName && !matchRoll && !matchId && !matchFather && !matchPhone) return false;
    }

    return true;
  });

  const togglePasswordVisibility = (studentId: string) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleOpenPasswordModal = (student: Student) => {
    setSelectedStudentForPassword(student);
    setNewPasswordInput(student.password || 'pcstudent123');
  };

  const handleGenerateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$';
    let generated = 'PC-';
    for (let i = 0; i < 6; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPasswordInput(generated);
  };

  const handleSavePassword = () => {
    if (!selectedStudentForPassword) return;
    if (!newPasswordInput.trim() || newPasswordInput.trim().length < 4) {
      showToast({
        type: 'error',
        title: 'Invalid Password',
        message: 'Student password must be at least 4 characters long.',
      });
      return;
    }

    updateStudentPassword(selectedStudentForPassword.id, newPasswordInput.trim());

    showToast({
      type: 'success',
      title: 'Student Password Updated',
      message: `Password changed for ${selectedStudentForPassword.name} (${selectedStudentForPassword.id}). Student can now log in using the new password.`,
      duration: 4000,
    });

    setSelectedStudentForPassword(null);
  };

  // Quick Stats
  const totalDayStudents = students.filter((s) => s.shift === 'Morning').length;
  const totalNightStudents = students.filter((s) => s.shift === 'Evening').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-[#0B4F9C] px-2.5 py-0.5 rounded-full">
              Student Records & Credentials Directory
            </span>
            <span className="text-xs font-mono text-slate-500">Master Roster</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#0B4F9C]" />
            Student Data Directory & Password Management
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Institutional directory with full administrator access to view records and modify student portal login passwords for any student.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-400 block font-medium">Enrolled Candidates</span>
            <span className="text-lg font-black text-[#0B4F9C]">{students.length} Total</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Morning Shift Students (Sec A)
          </span>
          <p className="text-2xl font-black text-[#0B4F9C] mt-1">{totalDayStudents}</p>
          <span className="text-[11px] text-slate-500">Sections A, A1, A2</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Night Shift Students (Sec C)
          </span>
          <p className="text-2xl font-black text-indigo-900 mt-1">{totalNightStudents}</p>
          <span className="text-[11px] text-slate-500">Sections C, C1, C2</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Male Cohort (Mon–Wed)
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {students.filter((s) => s.cohort === 'Male').length}
          </p>
          <span className="text-[11px] text-slate-500">Boys Campuses</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Female Cohort (Thu–Sat)
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {students.filter((s) => s.cohort === 'Female').length}
          </p>
          <span className="text-[11px] text-slate-500">Girls Campuses</span>
        </div>
      </div>

      {/* Hierarchical Filter */}
      <StudentFilterBar
        filters={filters}
        onFilterChange={setFilters}
        totalCount={students.length}
        filteredCount={filteredStudents.length}
        title="Hierarchical Student Filter"
      />

      {/* Students Master Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              All Students Roster & Credentials
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredStudents.length} students matching active filters
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Click <strong>"Edit Password"</strong> to change any student's password instantly
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Users className="w-8 h-8 mx-auto text-slate-400" />
            <p className="font-bold text-sm text-slate-700">No students match current filter criteria.</p>
            <p className="text-xs text-slate-500">Reset filters to view all enrolled students.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student ID & Roll</th>
                  <th className="py-3 px-4">Student Name & Parent</th>
                  <th className="py-3 px-4">Shift & Section</th>
                  <th className="py-3 px-4">Class & Stream</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4">Portal Password</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => {
                  const isRevealed = !!revealedPasswords[st.id];
                  const currentPw = st.password || 'pcstudent123';

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B4F9C]">
                        {st.id}
                        <span className="block text-[10px] text-slate-500 font-normal">
                          Roll #{st.rollNumber}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0B4F9C] font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">
                            {st.photoInitial}
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => setProfileStudent(st)}
                              className="font-bold text-slate-900 hover:text-[#0B4F9C] text-left block hover:underline"
                            >
                              {st.name}
                            </button>
                            <span className="text-[10px] text-slate-500">
                              S/D/O {st.fatherName} • {st.cohort} Cohort
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${
                            st.shift === 'Morning'
                              ? 'bg-blue-50 text-[#0B4F9C] border-blue-200'
                              : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                          }`}
                        >
                          Sec {st.section}
                        </span>
                        <span className="block text-[10px] text-slate-500 mt-0.5">
                          {st.shift} Shift ({st.shift === 'Morning' ? '15:20-18:00' : '18:20-21:00'})
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-800">{st.classLevel}</span>
                        <span className="block text-[10px] text-slate-500">{st.stream}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-mono text-slate-800">{st.guardianPhone}</span>
                        <span className="block text-[10px] text-slate-500">{st.guardianName}</span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono bg-slate-100 px-2 py-1 rounded text-slate-800 font-bold border border-slate-200 text-xs">
                            {isRevealed ? currentPw : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(st.id)}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                            title={isRevealed ? 'Hide Password' : 'Show Password'}
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenPasswordModal(st)}
                            className="inline-flex items-center gap-1 bg-[#0B4F9C] hover:bg-[#073B75] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                          >
                            <KeyRound className="w-3.5 h-3.5" /> Edit Password
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfileStudent(st)}
                            className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
                          >
                            Profile
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Password Edit Modal */}
      {selectedStudentForPassword && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0B4F9C] flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Edit Student Password</h3>
                  <p className="text-xs text-slate-500">Administrator Access Override</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudentForPassword(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Student Identity Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">
                  {selectedStudentForPassword.name}
                </span>
                <span className="font-mono font-bold text-[#0B4F9C]">
                  {selectedStudentForPassword.id}
                </span>
              </div>
              <p className="text-slate-500">
                {selectedStudentForPassword.classLevel} ({selectedStudentForPassword.stream}) • Section {selectedStudentForPassword.section} ({selectedStudentForPassword.shift} Shift)
              </p>
              <p className="text-slate-500">
                Guardian: {selectedStudentForPassword.guardianName} ({selectedStudentForPassword.guardianPhone})
              </p>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  New Student Password
                </label>
                <button
                  type="button"
                  onClick={handleGenerateRandomPassword}
                  className="text-xs font-bold text-[#0B4F9C] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Generate Random
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter new student password"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] bg-white shadow-2xs"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Default password for new students is <code className="font-bold text-slate-800">pcstudent123</code>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedStudentForPassword(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePassword}
                className="inline-flex items-center gap-2 bg-[#0B4F9C] hover:bg-[#073B75] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <Check className="w-4 h-4 text-emerald-400" /> Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile Drawer / Modal */}
      {profileStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0B4F9C] text-white flex items-center justify-center font-black text-base">
                  {profileStudent.photoInitial}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">{profileStudent.name}</h3>
                  <p className="text-xs text-[#0B4F9C] font-mono font-bold">{profileStudent.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setProfileStudent(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Father's Name</span>
                <span className="font-bold text-slate-900">{profileStudent.fatherName}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Roll Number</span>
                <span className="font-mono font-bold text-[#0B4F9C]">#{profileStudent.rollNumber}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Class & Stream</span>
                <span className="font-bold text-slate-900">{profileStudent.classLevel} • {profileStudent.stream}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Shift & Section</span>
                <span className="font-bold text-slate-900">{profileStudent.shift} Shift (Sec {profileStudent.section})</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Cohort Schedule</span>
                <span className="font-bold text-slate-900">{profileStudent.cohort} ({profileStudent.cohort === 'Male' ? 'Mon-Wed' : 'Thu-Sat'})</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Registered Campus</span>
                <span className="font-bold text-slate-900">{profileStudent.campus}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Guardian Phone</span>
                <span className="font-mono font-bold text-slate-900">{profileStudent.guardianPhone}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Device MAC Address</span>
                <span className="font-mono text-slate-700">{profileStudent.macAddress}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-600 block">Current Student Password:</span>
                <span className="font-mono font-bold text-[#0B4F9C] text-sm">
                  {profileStudent.password || 'pcstudent123'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileStudent(null);
                  handleOpenPasswordModal(profileStudent);
                }}
                className="bg-[#0B4F9C] hover:bg-[#073B75] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
