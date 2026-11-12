import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Student,
  AttendanceRecord,
  StudentReport,
  NotificationItem,
  TimetableSlot,
  UpcomingTest,
  NoteItem,
  AdmissionFormSubmission,
  ExamFormSubmission,
  ParentMessage,
  TimeLockConfig,
  CommunityPost,
  ShiftType,
  AttendanceStatus,
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE,
  MOCK_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TIMETABLE,
  INITIAL_UPCOMING_TESTS,
  INITIAL_NOTES,
  INITIAL_PARENT_MESSAGES,
  INITIAL_ADMISSIONS,
  INITIAL_EXAM_FORMS,
  INITIAL_TIME_LOCK,
  INITIAL_COMMUNITY_POSTS,
} from '../data/mockData';
import { generateParentNotification } from '../utils/institutionRules';

interface DemoDataContextType {
  students: Student[];
  attendance: AttendanceRecord[];
  reports: Record<string, StudentReport>;
  notifications: NotificationItem[];
  timetable: TimetableSlot[];
  upcomingTests: UpcomingTest[];
  notes: NoteItem[];
  parentMessages: ParentMessage[];
  admissions: AdmissionFormSubmission[];
  examForms: ExamFormSubmission[];
  timeLock: TimeLockConfig;
  communityPosts: CommunityPost[];
  simulatedNow: Date;

  // Actions
  markAttendance: (params: {
    studentId: string;
    date: string;
    shift: ShiftType;
    section: string;
    status: AttendanceStatus;
    method: 'MAC-Detection' | 'Scanner' | 'Manual';
    arrivalTime?: string;
    notes?: string;
  }) => void;
  batchMarkAttendance: (records: Omit<AttendanceRecord, 'id' | 'markedAt'>[]) => void;
  finalizeAttendance: (params: {
    date: string;
    shift: ShiftType;
    section: string;
  }) => { absentCount: number; newMessages: ParentMessage[] };
  resendParentMessage: (messageId: string) => void;
  sendManualParentMessage: (studentId: string, customMessage: string) => void;

  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (notificationId: string, studentId: string) => void;
  markAllNotificationsAsRead: (studentId: string) => void;

  addNote: (note: Omit<NoteItem, 'id' | 'uploadedAt'>) => void;
  addUpcomingTest: (test: Omit<UpcomingTest, 'id'>) => void;

  submitAdmissionForm: (form: Omit<AdmissionFormSubmission, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>) => AdmissionFormSubmission;
  updateAdmissionStatus: (id: string, status: 'Approved' | 'Rejected', remarks?: string) => void;

  submitExamForm: (form: Omit<ExamFormSubmission, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>) => ExamFormSubmission;
  updateExamFormStatus: (id: string, status: 'Approved' | 'Rejected', remarks?: string) => void;

  updateTimeLock: (config: Partial<TimeLockConfig>) => void;
  adjustSimulatedTime: (minutes: number) => void;
  resetSimulatedTime: () => void;
  toggleEmergencyLock: () => void;

  addCommunityPost: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'replies'>) => void;
  likeCommunityPost: (id: string) => void;
  replyToCommunityPost: (postId: string, reply: { authorName: string; isAnonymous: boolean; content: string }) => void;

  // Student password and details management (Admin access)
  updateStudentPassword: (studentId: string, newPassword: string) => void;
  updateStudentDetails: (studentId: string, updates: Partial<Student>) => void;

  // Weekly test marks entry (Admin access)
  enterWeeklyMarks: (params: {
    studentId: string;
    weekNumber: number;
    subject: string;
    marksObtained: number;
    totalMarks: number;
    topic?: string;
    testDate?: string;
  }) => void;
  batchEnterWeeklyMarks: (params: {
    weekNumber: number;
    subject: string;
    totalMarks: number;
    topic?: string;
    testDate?: string;
    entries: { studentId: string; marksObtained: number }[];
  }) => void;

  resetDemoData: () => void;
}

const STORAGE_KEY = 'pc_student_portal_state_v1';

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

export const DemoDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or seed
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [reports, setReports] = useState<Record<string, StudentReport>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_reports');
    return saved ? JSON.parse(saved) : MOCK_REPORTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [timetable, setTimetable] = useState<TimetableSlot[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_timetable');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [upcomingTests, setUpcomingTests] = useState<UpcomingTest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_upcomingTests');
    return saved ? JSON.parse(saved) : INITIAL_UPCOMING_TESTS;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [parentMessages, setParentMessages] = useState<ParentMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_parentMessages');
    return saved ? JSON.parse(saved) : INITIAL_PARENT_MESSAGES;
  });

  const [admissions, setAdmissions] = useState<AdmissionFormSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_admissions');
    return saved ? JSON.parse(saved) : INITIAL_ADMISSIONS;
  });

  const [examForms, setExamForms] = useState<ExamFormSubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_examForms');
    return saved ? JSON.parse(saved) : INITIAL_EXAM_FORMS;
  });

  const [timeLock, setTimeLock] = useState<TimeLockConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_timeLock');
    return saved ? JSON.parse(saved) : INITIAL_TIME_LOCK;
  });

  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_communityPosts');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });

  // Simulated Time: base real time + offset minutes
  const [timeOffsetMinutes, setTimeOffsetMinutes] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_timeOffset');
    return saved ? Number(saved) : 0;
  });

  const [simulatedNow, setSimulatedNow] = useState<Date>(() => {
    return new Date(Date.now() + timeOffsetMinutes * 60 * 1000);
  });

  // Clock tick every second to keep live countdowns fresh
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedNow(new Date(Date.now() + timeOffsetMinutes * 60 * 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeOffsetMinutes]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_students', JSON.stringify(students));
    localStorage.setItem(STORAGE_KEY + '_attendance', JSON.stringify(attendance));
    localStorage.setItem(STORAGE_KEY + '_reports', JSON.stringify(reports));
    localStorage.setItem(STORAGE_KEY + '_notifications', JSON.stringify(notifications));
    localStorage.setItem(STORAGE_KEY + '_timetable', JSON.stringify(timetable));
    localStorage.setItem(STORAGE_KEY + '_upcomingTests', JSON.stringify(upcomingTests));
    localStorage.setItem(STORAGE_KEY + '_notes', JSON.stringify(notes));
    localStorage.setItem(STORAGE_KEY + '_parentMessages', JSON.stringify(parentMessages));
    localStorage.setItem(STORAGE_KEY + '_admissions', JSON.stringify(admissions));
    localStorage.setItem(STORAGE_KEY + '_examForms', JSON.stringify(examForms));
    localStorage.setItem(STORAGE_KEY + '_timeLock', JSON.stringify(timeLock));
    localStorage.setItem(STORAGE_KEY + '_communityPosts', JSON.stringify(communityPosts));
    localStorage.setItem(STORAGE_KEY + '_timeOffset', String(timeOffsetMinutes));
  }, [
    students,
    attendance,
    reports,
    notifications,
    timetable,
    upcomingTests,
    notes,
    parentMessages,
    admissions,
    examForms,
    timeLock,
    communityPosts,
    timeOffsetMinutes,
  ]);

  // Mark single attendance
  const markAttendance = useCallback(
    ({
      studentId,
      date,
      shift,
      section,
      status,
      method,
      arrivalTime,
      notes,
    }: {
      studentId: string;
      date: string;
      shift: ShiftType;
      section: string;
      status: AttendanceStatus;
      method: 'MAC-Detection' | 'Scanner' | 'Manual';
      arrivalTime?: string;
      notes?: string;
    }) => {
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      setAttendance((prev) => {
        const existingIdx = prev.findIndex(
          (r) => r.studentId === studentId && r.date === date && r.shift === shift
        );
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            status,
            method,
            arrivalTime: arrivalTime || updated[existingIdx].arrivalTime,
            notes: notes || updated[existingIdx].notes,
            markedAt: nowStr,
          };
          return updated;
        } else {
          const newRecord: AttendanceRecord = {
            id: 'att-' + Math.random().toString(36).substring(2, 9),
            studentId,
            date,
            shift,
            section,
            status,
            arrivalTime: arrivalTime || (status === 'Present' || status === 'Late' ? '15:25' : undefined),
            method,
            markedAt: nowStr,
            notes,
          };
          return [newRecord, ...prev];
        }
      });
    },
    []
  );

  // Batch mark attendance (from MAC detection simulator)
  const batchMarkAttendance = useCallback((records: Omit<AttendanceRecord, 'id' | 'markedAt'>[]) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setAttendance((prev) => {
      let updated = [...prev];
      for (const rec of records) {
        const existingIdx = updated.findIndex(
          (r) => r.studentId === rec.studentId && r.date === rec.date && r.shift === rec.shift
        );
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            ...rec,
            markedAt: nowStr,
          };
        } else {
          updated.unshift({
            ...rec,
            id: 'att-' + Math.random().toString(36).substring(2, 9),
            markedAt: nowStr,
          });
        }
      }
      return updated;
    });
  }, []);

  // Finalize attendance: automatically turns all unmarked enrolled students into Absent and generates Module 09 parent notifications
  const finalizeAttendance = useCallback(
    ({ date, shift, section }: { date: string; shift: ShiftType; section: string }) => {
      const relevantStudents = students.filter(
        (s) => s.shift === shift && (section === 'All' || s.section === section)
      );

      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
      const newParentMessages: ParentMessage[] = [];
      const updatedAttendance = [...attendance];

      for (const st of relevantStudents) {
        const existing = updatedAttendance.find(
          (a) => a.studentId === st.id && a.date === date && a.shift === shift
        );

        if (!existing) {
          // Unmarked -> Mark Absent
          const msgText = generateParentNotification(st.name, st.rollNumber, date, shift, st.campus);
          const newMsg: ParentMessage = {
            id: 'pm-' + Math.random().toString(36).substring(2, 9),
            studentId: st.id,
            studentName: st.name,
            guardianName: st.guardianName,
            phone: st.guardianPhone,
            channel: 'SMS',
            messageText: msgText,
            timestamp: nowStr,
            status: 'Delivered',
            date,
            shift,
          };
          newParentMessages.push(newMsg);

          updatedAttendance.unshift({
            id: 'att-' + Math.random().toString(36).substring(2, 9),
            studentId: st.id,
            date,
            shift,
            section: st.section,
            status: 'Absent',
            method: 'Manual',
            markedAt: nowStr,
            parentNotifiedAt: nowStr,
            notes: 'Unmarked at session finalize cutoff — marked Absent automatically.',
          });
        } else if (existing.status === 'Absent' && !existing.parentNotifiedAt) {
          // Explicitly marked absent without prior parent SMS
          const msgText = generateParentNotification(st.name, st.rollNumber, date, shift, st.campus);
          const newMsg: ParentMessage = {
            id: 'pm-' + Math.random().toString(36).substring(2, 9),
            studentId: st.id,
            studentName: st.name,
            guardianName: st.guardianName,
            phone: st.guardianPhone,
            channel: 'SMS',
            messageText: msgText,
            timestamp: nowStr,
            status: 'Delivered',
            date,
            shift,
          };
          newParentMessages.push(newMsg);
          existing.parentNotifiedAt = nowStr;
        }
      }

      setAttendance(updatedAttendance);
      if (newParentMessages.length > 0) {
        setParentMessages((prev) => [...newParentMessages, ...prev]);
      }

      return {
        absentCount: newParentMessages.length,
        newMessages: newParentMessages,
      };
    },
    [students, attendance]
  );

  // Resend parent message
  const resendParentMessage = useCallback((messageId: string) => {
    setParentMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              status: 'Delivered',
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            }
          : msg
      )
    );
  }, []);

  // Send manual parent message
  const sendManualParentMessage = useCallback(
    (studentId: string, customMessage: string) => {
      const student = students.find((s) => s.id === studentId);
      if (!student) return;

      const newMsg: ParentMessage = {
        id: 'pm-' + Math.random().toString(36).substring(2, 9),
        studentId: student.id,
        studentName: student.name,
        guardianName: student.guardianName,
        phone: student.guardianPhone,
        channel: 'SMS',
        messageText: customMessage,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'Delivered',
        date: new Date().toISOString().split('T')[0],
        shift: student.shift,
      };

      setParentMessages((prev) => [newMsg, ...prev]);
    },
    [students]
  );

  // Notifications
  const addNotification = useCallback(
    (notification: Omit<NotificationItem, 'id' | 'createdAt'>) => {
      const newNotif: NotificationItem = {
        ...notification,
        id: 'notif-' + Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        isReadBy: [],
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  const markNotificationAsRead = useCallback((notificationId: string, studentId: string) => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id === notificationId) {
          const reads = n.isReadBy || [];
          if (!reads.includes(studentId)) {
            return { ...n, isReadBy: [...reads, studentId] };
          }
        }
        return n;
      })
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(
    (studentId: string) => {
      setNotifications((prev) =>
        prev.map((n) => {
          const reads = n.isReadBy || [];
          if (!reads.includes(studentId)) {
            return { ...n, isReadBy: [...reads, studentId] };
          }
          return n;
        })
      );
    },
    []
  );

  // Notes & Tests
  const addNote = useCallback((note: Omit<NoteItem, 'id' | 'uploadedAt'>) => {
    const newNote: NoteItem = {
      ...note,
      id: 'note-' + Math.random().toString(36).substring(2, 9),
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setNotes((prev) => [newNote, ...prev]);
  }, []);

  const addUpcomingTest = useCallback((test: Omit<UpcomingTest, 'id'>) => {
    const newTest: UpcomingTest = {
      ...test,
      id: 'ut-' + Math.random().toString(36).substring(2, 9),
    };
    setUpcomingTests((prev) => [newTest, ...prev]);
  }, []);

  // Forms
  const submitAdmissionForm = useCallback(
    (form: Omit<AdmissionFormSubmission, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>) => {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const newSubmission: AdmissionFormSubmission = {
        ...form,
        id: 'adm-' + Math.random().toString(36).substring(2, 9),
        referenceNumber: `PC-ADM-2026-${randNum}`,
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Pending',
      };
      setAdmissions((prev) => [newSubmission, ...prev]);
      return newSubmission;
    },
    []
  );

  const updateAdmissionStatus = useCallback(
    (id: string, status: 'Approved' | 'Rejected', remarks?: string) => {
      setAdmissions((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status, remarks: remarks || a.remarks } : a))
      );
    },
    []
  );

  const submitExamForm = useCallback(
    (form: Omit<ExamFormSubmission, 'id' | 'referenceNumber' | 'submittedAt' | 'status'>) => {
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const newSubmission: ExamFormSubmission = {
        ...form,
        id: 'exm-' + Math.random().toString(36).substring(2, 9),
        referenceNumber: `PC-EXM-2026-${randNum}`,
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Pending',
      };
      setExamForms((prev) => [newSubmission, ...prev]);
      return newSubmission;
    },
    []
  );

  const updateExamFormStatus = useCallback(
    (id: string, status: 'Approved' | 'Rejected', remarks?: string) => {
      setExamForms((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status, remarks: remarks || e.remarks } : e))
      );
    },
    []
  );

  // Time Lock & Demo Clock
  const updateTimeLock = useCallback((config: Partial<TimeLockConfig>) => {
    setTimeLock((prev) => ({ ...prev, ...config }));
  }, []);

  const adjustSimulatedTime = useCallback((minutes: number) => {
    setTimeOffsetMinutes((prev) => {
      const next = prev + minutes;
      return next;
    });
  }, []);

  const resetSimulatedTime = useCallback(() => {
    setTimeOffsetMinutes(0);
  }, []);

  const toggleEmergencyLock = useCallback(() => {
    setTimeLock((prev) => ({
      ...prev,
      isEmergencyLocked: !prev.isEmergencyLocked,
      isEnabled: true,
    }));
  }, []);

  // Community
  const addCommunityPost = useCallback(
    (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'replies'>) => {
      const newPost: CommunityPost = {
        ...post,
        id: 'post-' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        likes: 0,
        replies: [],
      };
      setCommunityPosts((prev) => [newPost, ...prev]);
    },
    []
  );

  const likeCommunityPost = useCallback((id: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  }, []);

  const replyToCommunityPost = useCallback(
    (postId: string, reply: { authorName: string; isAnonymous: boolean; content: string }) => {
      setCommunityPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              replies: [
                ...p.replies,
                {
                  id: 'rep-' + Math.random().toString(36).substring(2, 9),
                  ...reply,
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
                },
              ],
            };
          }
          return p;
        })
      );
    },
    []
  );

  // Student password and details management (Admin access)
  const updateStudentPassword = useCallback((studentId: string, newPassword: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, password: newPassword } : s))
    );
  }, []);

  const updateStudentDetails = useCallback((studentId: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, ...updates } : s))
    );
  }, []);

  // Enter weekly test marks for a student
  const enterWeeklyMarks = useCallback(
    ({
      studentId,
      weekNumber,
      subject,
      marksObtained,
      totalMarks,
      topic,
      testDate,
    }: {
      studentId: string;
      weekNumber: number;
      subject: string;
      marksObtained: number;
      totalMarks: number;
      topic?: string;
      testDate?: string;
    }) => {
      setReports((prev) => {
        const existingReport = prev[studentId] || prev['PC-2026-A1-042'];
        const percentage = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;
        const dateStr = testDate || new Date().toISOString().split('T')[0];

        let updatedWeeks = existingReport ? [...existingReport.weeks] : [];
        const weekIndex = updatedWeeks.findIndex((w) => w.weekNumber === weekNumber);

        if (weekIndex >= 0) {
          updatedWeeks[weekIndex] = {
            ...updatedWeeks[weekIndex],
            test: {
              ...updatedWeeks[weekIndex].test,
              subject,
              marksObtained,
              totalMarks,
              percentage,
              topic: topic || updatedWeeks[weekIndex].test.topic || `${subject} Weekly Assessment`,
              testDate: dateStr,
            },
          };
        } else {
          updatedWeeks.push({
            weekNumber,
            daysPresent: 3,
            daysLate: 0,
            daysAbsent: 0,
            test: {
              weekNumber,
              subject,
              marksObtained,
              totalMarks,
              percentage,
              sectionAverage: Math.round(totalMarks * 0.72),
              highestScore: Math.max(marksObtained, Math.round(totalMarks * 0.94)),
              testDate: dateStr,
              topic: topic || `${subject} Weekly Assessment`,
            },
          });
          updatedWeeks.sort((a, b) => a.weekNumber - b.weekNumber);
        }

        // Recalculate monthly cumulative summary
        const totalMarksSum = updatedWeeks.reduce((acc, w) => acc + (w.test?.marksObtained || 0), 0);
        const maxMarksSum = updatedWeeks.reduce((acc, w) => acc + (w.test?.totalMarks || 50), 0);
        const monthlyPercentage = maxMarksSum > 0 ? Math.round((totalMarksSum / maxMarksSum) * 1000) / 10 : 0;

        const newReport: StudentReport = {
          studentId,
          month: existingReport?.month || 'November 2026',
          monthlyCycle: existingReport?.monthlyCycle || 1,
          weeks: updatedWeeks,
          monthlySummary: {
            totalMarks: totalMarksSum,
            maxMarks: maxMarksSum,
            monthlyPercentage,
            sectionRank: existingReport?.monthlySummary?.sectionRank || 3,
            totalStudentsInSection: existingReport?.monthlySummary?.totalStudentsInSection || 48,
            attendanceRate: existingReport?.monthlySummary?.attendanceRate || 92.5,
            facultyRemarks:
              monthlyPercentage >= 85
                ? 'Excellent weekly test performance and analytical conceptual grip.'
                : 'Good ongoing effort. Recommended to practice numerical problem sets regularly.',
            teacherSignature: 'Prof. Rashid Khan (Head of Academics & Examination)',
          },
        };

        return {
          ...prev,
          [studentId]: newReport,
        };
      });
    },
    []
  );

  // Batch enter weekly test marks for multiple students in a class/section
  const batchEnterWeeklyMarks = useCallback(
    ({
      weekNumber,
      subject,
      totalMarks,
      topic,
      testDate,
      entries,
    }: {
      weekNumber: number;
      subject: string;
      totalMarks: number;
      topic?: string;
      testDate?: string;
      entries: { studentId: string; marksObtained: number }[];
    }) => {
      setReports((prev) => {
        const next = { ...prev };
        const dateStr = testDate || new Date().toISOString().split('T')[0];

        for (const entry of entries) {
          const stId = entry.studentId;
          const marks = entry.marksObtained;
          const percentage = totalMarks > 0 ? Math.round((marks / totalMarks) * 100) : 0;
          const existingReport = next[stId] || next['PC-2026-A1-042'];

          let updatedWeeks = existingReport ? [...existingReport.weeks] : [];
          const weekIndex = updatedWeeks.findIndex((w) => w.weekNumber === weekNumber);

          if (weekIndex >= 0) {
            updatedWeeks[weekIndex] = {
              ...updatedWeeks[weekIndex],
              test: {
                ...updatedWeeks[weekIndex].test,
                subject,
                marksObtained: marks,
                totalMarks,
                percentage,
                topic: topic || updatedWeeks[weekIndex].test.topic || `${subject} Weekly Assessment`,
                testDate: dateStr,
              },
            };
          } else {
            updatedWeeks.push({
              weekNumber,
              daysPresent: 3,
              daysLate: 0,
              daysAbsent: 0,
              test: {
                weekNumber,
                subject,
                marksObtained: marks,
                totalMarks,
                percentage,
                sectionAverage: Math.round(totalMarks * 0.72),
                highestScore: Math.max(marks, Math.round(totalMarks * 0.94)),
                testDate: dateStr,
                topic: topic || `${subject} Weekly Assessment`,
              },
            });
            updatedWeeks.sort((a, b) => a.weekNumber - b.weekNumber);
          }

          const totalMarksSum = updatedWeeks.reduce((acc, w) => acc + (w.test?.marksObtained || 0), 0);
          const maxMarksSum = updatedWeeks.reduce((acc, w) => acc + (w.test?.totalMarks || 50), 0);
          const monthlyPercentage = maxMarksSum > 0 ? Math.round((totalMarksSum / maxMarksSum) * 1000) / 10 : 0;

          next[stId] = {
            studentId: stId,
            month: existingReport?.month || 'November 2026',
            monthlyCycle: existingReport?.monthlyCycle || 1,
            weeks: updatedWeeks,
            monthlySummary: {
              totalMarks: totalMarksSum,
              maxMarks: maxMarksSum,
              monthlyPercentage,
              sectionRank: existingReport?.monthlySummary?.sectionRank || 3,
              totalStudentsInSection: existingReport?.monthlySummary?.totalStudentsInSection || 48,
              attendanceRate: existingReport?.monthlySummary?.attendanceRate || 92.5,
              facultyRemarks:
                monthlyPercentage >= 85
                  ? 'Excellent weekly test performance and analytical conceptual grip.'
                  : 'Good ongoing effort. Recommended to practice numerical problem sets regularly.',
              teacherSignature: 'Prof. Rashid Khan (Head of Academics & Examination)',
            },
          };
        }

        return next;
      });
    },
    []
  );

  // Reset demo data to seed
  const resetDemoData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY + '_students');
    localStorage.removeItem(STORAGE_KEY + '_attendance');
    localStorage.removeItem(STORAGE_KEY + '_reports');
    localStorage.removeItem(STORAGE_KEY + '_notifications');
    localStorage.removeItem(STORAGE_KEY + '_timetable');
    localStorage.removeItem(STORAGE_KEY + '_upcomingTests');
    localStorage.removeItem(STORAGE_KEY + '_notes');
    localStorage.removeItem(STORAGE_KEY + '_parentMessages');
    localStorage.removeItem(STORAGE_KEY + '_admissions');
    localStorage.removeItem(STORAGE_KEY + '_examForms');
    localStorage.removeItem(STORAGE_KEY + '_timeLock');
    localStorage.removeItem(STORAGE_KEY + '_communityPosts');
    localStorage.removeItem(STORAGE_KEY + '_timeOffset');

    setStudents(INITIAL_STUDENTS);
    setAttendance(INITIAL_ATTENDANCE);
    setReports(MOCK_REPORTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setTimetable(INITIAL_TIMETABLE);
    setUpcomingTests(INITIAL_UPCOMING_TESTS);
    setNotes(INITIAL_NOTES);
    setParentMessages(INITIAL_PARENT_MESSAGES);
    setAdmissions(INITIAL_ADMISSIONS);
    setExamForms(INITIAL_EXAM_FORMS);
    setTimeLock(INITIAL_TIME_LOCK);
    setCommunityPosts(INITIAL_COMMUNITY_POSTS);
    setTimeOffsetMinutes(0);
    setSimulatedNow(new Date());
  }, []);

  return (
    <DemoDataContext.Provider
      value={{
        students,
        attendance,
        reports,
        notifications,
        timetable,
        upcomingTests,
        notes,
        parentMessages,
        admissions,
        examForms,
        timeLock,
        communityPosts,
        simulatedNow,
        markAttendance,
        batchMarkAttendance,
        finalizeAttendance,
        resendParentMessage,
        sendManualParentMessage,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNote,
        addUpcomingTest,
        submitAdmissionForm,
        updateAdmissionStatus,
        submitExamForm,
        updateExamFormStatus,
        updateTimeLock,
        adjustSimulatedTime,
        resetSimulatedTime,
        toggleEmergencyLock,
        addCommunityPost,
        likeCommunityPost,
        replyToCommunityPost,
        updateStudentPassword,
        updateStudentDetails,
        enterWeeklyMarks,
        batchEnterWeeklyMarks,
        resetDemoData,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
};

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error('useDemoData must be used within DemoDataProvider');
  }
  return context;
}
