export type ShiftType = 'Day' | 'Evening';
export type CohortType = 'Male' | 'Female';
export type StreamType = 'Pre-Engineering' | 'Pre-Medical' | 'Computer Science' | 'Commerce' | 'Matric Science';
export type ClassLevel = 'Class IX' | 'Class X' | 'Class XI' | 'Class XII';
export type CampusLocation = 'Gulshan-e-Iqbal Block 1' | 'PECHS Campus';

export interface Student {
  id: string; // e.g. PC-2026-A1-042
  name: string;
  fatherName: string;
  email: string;
  password?: string; // portal authentication password
  gender: 'Male' | 'Female';
  cohort: CohortType;
  shift: ShiftType;
  section: string; // Day: A, A1, A2... | Evening: C, C1, C2...
  classLevel: ClassLevel;
  stream: StreamType;
  campus: CampusLocation;
  rollNumber: string;
  macAddress: string;
  deviceModel: string;
  guardianName: string;
  guardianPhone: string; // e.g. 0300-1234567
  photoInitial: string;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  shift: ShiftType;
  section: string;
  status: AttendanceStatus;
  arrivalTime?: string; // HH:MM:SS
  method: 'MAC-Detection' | 'Scanner' | 'Manual';
  markedAt: string;
  parentNotifiedAt?: string;
  notes?: string;
}

export interface WeeklyTestScore {
  weekNumber: number; // 1, 2, 3, 4
  subject: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  sectionAverage: number;
  highestScore: number;
  testDate: string;
  topic: string;
}

export interface StudentReport {
  studentId: string;
  month: string; // e.g. "November 2026"
  monthlyCycle: number;
  weeks: {
    weekNumber: number;
    daysPresent: number;
    daysLate: number;
    daysAbsent: number;
    test: WeeklyTestScore;
  }[];
  monthlySummary: {
    totalMarks: number;
    maxMarks: number;
    monthlyPercentage: number;
    sectionRank: number;
    totalStudentsInSection: number;
    attendanceRate: number;
    facultyRemarks: string;
    teacherSignature: string;
  };
}

export type NotificationCategory = 'Holiday' | 'Exam' | 'Announcement' | 'Attendance';
export type NotificationAudience = 'All' | 'Male cohort' | 'Female cohort' | 'Day shift' | 'Evening shift' | 'PECHS campus' | 'Gulshan campus';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  audience: NotificationAudience;
  createdAt: string;
  isReadBy?: string[]; // student IDs who marked read
  urgent?: boolean;
  holidayDate?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  shift: ShiftType;
  period: number;
  timeRange: string;
  subject: string;
  teacher: string;
  room: string;
  section: string;
}

export interface UpcomingTest {
  id: string;
  subject: string;
  stream: StreamType;
  classLevel: ClassLevel;
  date: string; // YYYY-MM-DD
  shift: ShiftType;
  cohort: CohortType;
  topics: string;
  totalMarks: number;
  durationMinutes: number;
}

export interface NoteItem {
  id: string;
  title: string;
  classLevel: ClassLevel;
  stream: StreamType;
  subject: string;
  chapterNumber: number;
  chapterTitle: string;
  resourceType: 'Chapter Notes' | 'Exercise Solutions' | 'MCQ Bank' | 'Formula Sheet' | 'Past Papers';
  uploadedAt: string;
  fileSize: string;
  pageCount: number;
  contentPages: string[];
}

export interface AdmissionFormSubmission {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  studentName: string;
  fatherName: string;
  gender: 'Male' | 'Female';
  dob: string;
  guardianPhone: string;
  guardianEmail: string;
  previousSchool: string;
  sscMarks: string;
  sscBoard: string;
  preferredClass: ClassLevel;
  preferredStream: StreamType;
  preferredShift: ShiftType;
  preferredCampus: CampusLocation;
  remarks?: string;
}

export interface ExamFormSubmission {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  studentId: string;
  studentName: string;
  rollNumber: string;
  classLevel: ClassLevel;
  stream: StreamType;
  examType: 'Monthly Comprehensive' | 'Term Assessment' | 'Pre-Board Mock';
  selectedSubjects: string[];
  declarationAccepted: boolean;
  remarks?: string;
}

export interface ParentMessage {
  id: string;
  studentId: string;
  studentName: string;
  guardianName: string;
  phone: string;
  channel: 'SMS' | 'WhatsApp';
  messageText: string;
  timestamp: string;
  status: 'Queued' | 'Sent' | 'Delivered';
  date: string;
  shift: ShiftType;
}

export type TimeLockTarget = 'Entire Student Portal' | 'Notes only' | 'Online Forms only' | 'Weekly Reports only';

export interface TimeLockConfig {
  isEnabled: boolean;
  target: TimeLockTarget;
  startTime: string; // ISO string or HH:MM
  endTime: string;   // ISO string or HH:MM
  reopenTimeDescription: string;
  isEmergencyLocked: boolean;
  simulatedTimeOffsetMinutes: number; // For demo fast-forward
}

export interface CommunityPost {
  id: string;
  subject: string; // Physics, Chemistry, etc.
  authorName: string;
  isAnonymous: boolean;
  authorStudentId?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: {
    id: string;
    authorName: string;
    isAnonymous: boolean;
    content: string;
    timestamp: string;
  }[];
}
