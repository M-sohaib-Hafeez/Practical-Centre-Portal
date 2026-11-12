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
} from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'PC-2026-A1-042',
    name: 'Muhammad Sohaib Hafeez',
    fatherName: 'Hafeez-ur-Rehman',
    email: 'sohaib.hafeez@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Male',
    cohort: 'Male',
    shift: 'Morning',
    section: 'A1',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '042',
    macAddress: '74:D0:2B:63:1A:4C',
    deviceModel: 'Samsung Galaxy A54 5G',
    guardianName: 'Hafeez-ur-Rehman',
    guardianPhone: '0300-8291456',
    photoInitial: 'SH',
  },
  {
    id: 'PC-2026-C1-019',
    name: 'Dua Sohail',
    fatherName: 'Sohail Anjum',
    email: 'dua.sohail@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Female',
    cohort: 'Female',
    shift: 'Evening',
    section: 'C1',
    classLevel: 'Class XII',
    stream: 'Computer Science',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '019',
    macAddress: 'A4:C3:F0:89:E2:11',
    deviceModel: 'iPhone 13',
    guardianName: 'Sohail Anjum',
    guardianPhone: '0321-9876543',
    photoInitial: 'DS',
  },
  {
    id: 'PC-2026-A1-011',
    name: 'Hamza Tariq',
    fatherName: 'Tariq Mehmood',
    email: 'hamza.tariq@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Male',
    cohort: 'Male',
    shift: 'Morning',
    section: 'A1',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '011',
    macAddress: '98:2C:BC:44:91:FA',
    deviceModel: 'Redmi Note 12',
    guardianName: 'Tariq Mehmood',
    guardianPhone: '0333-2198745',
    photoInitial: 'HT',
  },
  {
    id: 'PC-2026-A2-025',
    name: 'Syed Bilal Ahmed',
    fatherName: 'Syed Shakeel Ahmed',
    email: 'bilal.ahmed@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Male',
    cohort: 'Male',
    shift: 'Morning',
    section: 'A2',
    classLevel: 'Class XII',
    stream: 'Pre-Medical',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '025',
    macAddress: 'BC:D0:74:11:58:33',
    deviceModel: 'OnePlus 11R',
    guardianName: 'Syed Shakeel Ahmed',
    guardianPhone: '0312-4455667',
    photoInitial: 'BA',
  },
  {
    id: 'PC-2026-A-008',
    name: 'Zayan Ali Siddiqui',
    fatherName: 'Noman Siddiqui',
    email: 'zayan.ali@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Male',
    cohort: 'Male',
    shift: 'Morning',
    section: 'A',
    classLevel: 'Class XI',
    stream: 'Computer Science',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '008',
    macAddress: 'F2:A1:00:8B:19:CD',
    deviceModel: 'Google Pixel 7',
    guardianName: 'Noman Siddiqui',
    guardianPhone: '0345-8761234',
    photoInitial: 'ZS',
  },
  {
    id: 'PC-2026-C-005',
    name: 'Ayesha Siddiqa',
    fatherName: 'Rashid Siddiqa',
    email: 'ayesha.siddiqa@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Female',
    cohort: 'Female',
    shift: 'Evening',
    section: 'C',
    classLevel: 'Class XII',
    stream: 'Pre-Medical',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '005',
    macAddress: '5C:AA:FD:62:38:09',
    deviceModel: 'Samsung Galaxy S22',
    guardianName: 'Rashid Siddiqa',
    guardianPhone: '0301-2345678',
    photoInitial: 'AS',
  },
  {
    id: 'PC-2026-C1-033',
    name: 'Fatima Noor',
    fatherName: 'Muhammad Noor',
    email: 'fatima.noor@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Female',
    cohort: 'Female',
    shift: 'Evening',
    section: 'C1',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '033',
    macAddress: 'E0:2B:E9:55:04:78',
    deviceModel: 'Vivo V29',
    guardianName: 'Muhammad Noor',
    guardianPhone: '0322-8765412',
    photoInitial: 'FN',
  },
  {
    id: 'PC-2026-C2-014',
    name: 'Maham Khan',
    fatherName: 'Jahangir Khan',
    email: 'maham.khan@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Female',
    cohort: 'Female',
    shift: 'Evening',
    section: 'C2',
    classLevel: 'Class XI',
    stream: 'Commerce',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '014',
    macAddress: '48:73:97:CB:22:90',
    deviceModel: 'Realme 11 Pro',
    guardianName: 'Jahangir Khan',
    guardianPhone: '0334-9988776',
    photoInitial: 'MK',
  },
  {
    id: 'PC-2026-A-031',
    name: 'Abdullah Farooq',
    fatherName: 'Farooq Azam',
    email: 'abdullah.farooq@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Male',
    cohort: 'Male',
    shift: 'Morning',
    section: 'A',
    classLevel: 'Class X',
    stream: 'Matric Science',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '031',
    macAddress: '3C:06:30:4A:BC:D1',
    deviceModel: 'Xiaomi Redmi 10',
    guardianName: 'Farooq Azam',
    guardianPhone: '0315-3344556',
    photoInitial: 'AF',
  },
  {
    id: 'PC-2026-C2-028',
    name: 'Maryam Zehra',
    fatherName: 'Syed Baqir Raza',
    email: 'maryam.zehra@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Female',
    cohort: 'Female',
    shift: 'Evening',
    section: 'C2',
    classLevel: 'Class XII',
    stream: 'Pre-Medical',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '028',
    macAddress: '78:4F:43:9C:AA:61',
    deviceModel: 'iPhone 12 Mini',
    guardianName: 'Syed Baqir Raza',
    guardianPhone: '0308-7654321',
    photoInitial: 'MZ',
  },
  {
    id: 'PC-2026-A2-054',
    name: 'Saad Rehman',
    fatherName: 'Abdul Rehman',
    email: 'saad.rehman@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Male',
    cohort: 'Male',
    shift: 'Morning',
    section: 'A2',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '054',
    macAddress: '84:BA:20:CC:EE:12',
    deviceModel: 'Infinix Zero 30',
    guardianName: 'Abdul Rehman',
    guardianPhone: '0331-5566778',
    photoInitial: 'SR',
  },
  {
    id: 'PC-2026-C-041',
    name: 'Hania Imran',
    fatherName: 'Imran Bashir',
    email: 'hania.imran@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Female',
    cohort: 'Female',
    shift: 'Evening',
    section: 'C',
    classLevel: 'Class XI',
    stream: 'Computer Science',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '041',
    macAddress: '1A:B2:3C:4D:5E:6F',
    deviceModel: 'Oppo Reno 10',
    guardianName: 'Imran Bashir',
    guardianPhone: '0320-1122334',
    photoInitial: 'HI',
  },
  {
    id: 'PC-2026-A1-067',
    name: 'Ali Raza Qureshi',
    fatherName: 'Shahid Qureshi',
    email: 'ali.raza@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Male',
    cohort: 'Male',
    shift: 'Morning',
    section: 'A1',
    classLevel: 'Class IX',
    stream: 'Matric Science',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '067',
    macAddress: '6C:71:D9:82:43:10',
    deviceModel: 'Samsung Galaxy A14',
    guardianName: 'Shahid Qureshi',
    guardianPhone: '0302-9988112',
    photoInitial: 'AQ',
  },
  {
    id: 'PC-2026-C1-055',
    name: 'Zainab Mustafa',
    fatherName: 'Ghulam Mustafa',
    email: 'zainab.mustafa@student.pc.edu.pk',
    password: 'pcstudent123',
    gender: 'Female',
    cohort: 'Female',
    shift: 'Evening',
    section: 'C1',
    classLevel: 'Class IX',
    stream: 'Matric Science',
    campus: 'Gulshan-e-Iqbal Block 1',
    rollNumber: '055',
    macAddress: '24:5A:4C:90:BB:3E',
    deviceModel: 'Vivo Y27',
    guardianName: 'Ghulam Mustafa',
    guardianPhone: '0324-7711223',
    photoInitial: 'ZM',
  },
];

// 4-5 weeks attendance history
export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  // Muhammad Sohaib Hafeez (Male, Day, A1) - Mon, Tue, Wed
  { id: 'att-1', studentId: 'PC-2026-A1-042', date: '2026-11-02', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:25', method: 'MAC-Detection', markedAt: '2026-11-02 15:25:12' },
  { id: 'att-2', studentId: 'PC-2026-A1-042', date: '2026-11-03', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:32', method: 'Scanner', markedAt: '2026-11-03 15:32:05' },
  { id: 'att-3', studentId: 'PC-2026-A1-042', date: '2026-11-04', shift: 'Morning', section: 'A1', status: 'Late', arrivalTime: '15:46', method: 'Scanner', markedAt: '2026-11-04 15:46:21', notes: 'Arrived after 15:40 cutoff' },
  { id: 'att-4', studentId: 'PC-2026-A1-042', date: '2026-11-09', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:22', method: 'MAC-Detection', markedAt: '2026-11-09 15:22:40' },
  { id: 'att-5', studentId: 'PC-2026-A1-042', date: '2026-11-10', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:28', method: 'Scanner', markedAt: '2026-11-10 15:28:15' },
  { id: 'att-6', studentId: 'PC-2026-A1-042', date: '2026-10-26', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:20', method: 'MAC-Detection', markedAt: '2026-10-26 15:20:00' },
  { id: 'att-7', studentId: 'PC-2026-A1-042', date: '2026-10-27', shift: 'Morning', section: 'A1', status: 'Absent', method: 'Manual', markedAt: '2026-10-27 16:00:00', parentNotifiedAt: '2026-10-27 16:05:00', notes: 'Fever reported by guardian' },
  { id: 'att-8', studentId: 'PC-2026-A1-042', date: '2026-10-28', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:30', method: 'Scanner', markedAt: '2026-10-28 15:30:10' },

  // Dua Sohail (Female, Evening, C1) - Thu, Fri, Sat
  { id: 'att-9', studentId: 'PC-2026-C1-019', date: '2026-10-29', shift: 'Evening', section: 'C1', status: 'Present', arrivalTime: '18:25', method: 'MAC-Detection', markedAt: '2026-10-29 18:25:30' },
  { id: 'att-10', studentId: 'PC-2026-C1-019', date: '2026-10-30', shift: 'Evening', section: 'C1', status: 'Present', arrivalTime: '18:31', method: 'Scanner', markedAt: '2026-10-30 18:31:00' },
  { id: 'att-11', studentId: 'PC-2026-C1-019', date: '2026-10-31', shift: 'Evening', section: 'C1', status: 'Present', arrivalTime: '18:20', method: 'Scanner', markedAt: '2026-10-31 18:20:15' },
  { id: 'att-12', studentId: 'PC-2026-C1-019', date: '2026-11-05', shift: 'Evening', section: 'C1', status: 'Present', arrivalTime: '18:22', method: 'MAC-Detection', markedAt: '2026-11-05 18:22:45' },
  { id: 'att-13', studentId: 'PC-2026-C1-019', date: '2026-11-06', shift: 'Evening', section: 'C1', status: 'Late', arrivalTime: '18:48', method: 'Scanner', markedAt: '2026-11-06 18:48:10', notes: 'Traffic delay on Sharea Faisal' },
  { id: 'att-14', studentId: 'PC-2026-C1-019', date: '2026-11-07', shift: 'Evening', section: 'C1', status: 'Present', arrivalTime: '18:35', method: 'MAC-Detection', markedAt: '2026-11-07 18:35:00' },

  // Hamza Tariq (A1)
  { id: 'att-15', studentId: 'PC-2026-A1-011', date: '2026-11-02', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:20', method: 'MAC-Detection', markedAt: '2026-11-02 15:20:10' },
  { id: 'att-16', studentId: 'PC-2026-A1-011', date: '2026-11-03', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:25', method: 'Scanner', markedAt: '2026-11-03 15:25:00' },
  { id: 'att-17', studentId: 'PC-2026-A1-011', date: '2026-11-04', shift: 'Morning', section: 'A1', status: 'Absent', method: 'Manual', markedAt: '2026-11-04 16:00:00', parentNotifiedAt: '2026-11-04 16:02:11' },
  { id: 'att-18', studentId: 'PC-2026-A1-011', date: '2026-11-09', shift: 'Morning', section: 'A1', status: 'Present', arrivalTime: '15:35', method: 'Scanner', markedAt: '2026-11-09 15:35:40' },
  { id: 'att-19', studentId: 'PC-2026-A1-011', date: '2026-11-10', shift: 'Morning', section: 'A1', status: 'Late', arrivalTime: '15:48', method: 'Scanner', markedAt: '2026-11-10 15:48:20' },
];

// Reports data for Muhammad Sohaib Hafeez and Dua Sohail
export const MOCK_REPORTS: Record<string, StudentReport> = {
  'PC-2026-A1-042': {
    studentId: 'PC-2026-A1-042',
    month: 'November 2026',
    monthlyCycle: 1,
    weeks: [
      {
        weekNumber: 1,
        daysPresent: 3,
        daysLate: 0,
        daysAbsent: 0,
        test: {
          weekNumber: 1,
          subject: 'Physics',
          marksObtained: 46,
          totalMarks: 50,
          percentage: 92,
          sectionAverage: 37.8,
          highestScore: 49,
          testDate: '2026-10-28',
          topic: 'Chapter 12: Electrostatics & Gauss Law',
        },
      },
      {
        weekNumber: 2,
        daysPresent: 2,
        daysLate: 1,
        daysAbsent: 0,
        test: {
          weekNumber: 2,
          subject: 'Chemistry',
          marksObtained: 44,
          totalMarks: 50,
          percentage: 88,
          sectionAverage: 35.2,
          highestScore: 47,
          testDate: '2026-11-04',
          topic: 'Chapter 7: Chemical Equilibrium & Le Chatelier Principle',
        },
      },
      {
        weekNumber: 3,
        daysPresent: 3,
        daysLate: 0,
        daysAbsent: 0,
        test: {
          weekNumber: 3,
          subject: 'Mathematics',
          marksObtained: 48,
          totalMarks: 50,
          percentage: 96,
          sectionAverage: 36.4,
          highestScore: 50,
          testDate: '2026-11-11',
          topic: 'Calculus: Differentiation & Mean Value Theorems',
        },
      },
      {
        weekNumber: 4,
        daysPresent: 3,
        daysLate: 0,
        daysAbsent: 0,
        test: {
          weekNumber: 4,
          subject: 'English',
          marksObtained: 42,
          totalMarks: 50,
          percentage: 84,
          sectionAverage: 34.0,
          highestScore: 45,
          testDate: '2026-11-18',
          topic: 'Essay Writing & Comprehension Analysis',
        },
      },
    ],
    monthlySummary: {
      totalMarks: 180,
      maxMarks: 200,
      monthlyPercentage: 90.0,
      sectionRank: 3,
      totalStudentsInSection: 48,
      attendanceRate: 94.4,
      facultyRemarks: 'Exceptional analytical capability in Physics and Calculus. Maintains discipline and punctual submission of assignments.',
      teacherSignature: 'Prof. Rashid Khan (Head of Sciences)',
    },
  },
  'PC-2026-C1-019': {
    studentId: 'PC-2026-C1-019',
    month: 'November 2026',
    monthlyCycle: 1,
    weeks: [
      {
        weekNumber: 1,
        daysPresent: 3,
        daysLate: 0,
        daysAbsent: 0,
        test: {
          weekNumber: 1,
          subject: 'Computer Science',
          marksObtained: 49,
          totalMarks: 50,
          percentage: 98,
          sectionAverage: 39.5,
          highestScore: 49,
          testDate: '2026-10-31',
          topic: 'Data Structures: Arrays, Stacks, Queues & Linked Lists',
        },
      },
      {
        weekNumber: 2,
        daysPresent: 2,
        daysLate: 1,
        daysAbsent: 0,
        test: {
          weekNumber: 2,
          subject: 'Physics',
          marksObtained: 45,
          totalMarks: 50,
          percentage: 90,
          sectionAverage: 36.0,
          highestScore: 48,
          testDate: '2026-11-07',
          topic: 'Chapter 13: Current Electricity & Kirchhoff Rules',
        },
      },
      {
        weekNumber: 3,
        daysPresent: 3,
        daysLate: 0,
        daysAbsent: 0,
        test: {
          weekNumber: 3,
          subject: 'Mathematics',
          marksObtained: 46,
          totalMarks: 50,
          percentage: 92,
          sectionAverage: 35.8,
          highestScore: 49,
          testDate: '2026-11-14',
          topic: 'Analytic Geometry: Straight Lines & Circles',
        },
      },
      {
        weekNumber: 4,
        daysPresent: 3,
        daysLate: 0,
        daysAbsent: 0,
        test: {
          weekNumber: 4,
          subject: 'English',
          marksObtained: 44,
          totalMarks: 50,
          percentage: 88,
          sectionAverage: 35.5,
          highestScore: 46,
          testDate: '2026-11-21',
          topic: 'Technical Report Writing & Grammar Syntax',
        },
      },
    ],
    monthlySummary: {
      totalMarks: 184,
      maxMarks: 200,
      monthlyPercentage: 92.0,
      sectionRank: 2,
      totalStudentsInSection: 42,
      attendanceRate: 96.0,
      facultyRemarks: 'Top-tier programming proficiency and clear conceptual foundations. Outstanding performance in weekly test series.',
      teacherSignature: 'Dr. Asma Farooqui (Dean of Academics)',
    },
  },
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Admissions Open for Session 2026–27',
    message: 'Registrations are now open for Class IX, X, XI, and XII (Pre-Engineering, Pre-Medical, Computer Science, and Commerce). Early bird fee discount valid until end of month.',
    category: 'Announcement',
    audience: 'All',
    createdAt: '2026-11-08 09:30',
    urgent: true,
  },
  {
    id: 'notif-2',
    title: 'Mandatory Weekly Test: Chemistry Equilibrium',
    message: 'Section A1 and A2 Morning Shift students are reminded that the weekly subject test in Chemistry Chapter 7 will be conducted on Wednesday promptly at 16:30.',
    category: 'Exam',
    audience: 'Morning shift',
    createdAt: '2026-11-09 11:15',
  },
  {
    id: 'notif-3',
    title: 'Iqbal Day Public Holiday Notice',
    message: 'Practical Centre Gulshan-e-Iqbal Block 1 campus will remain closed on 9th November in observance of Iqbal Day. Classes resume as per regular cohort timetable.',
    category: 'Holiday',
    audience: 'All',
    holidayDate: '2026-11-09',
    createdAt: '2026-11-07 14:00',
  },
  {
    id: 'notif-4',
    title: 'Digital Notes Uploaded: Electrostatics & Magnetism',
    message: 'Comprehensive solved numericals, formula sheets, and 10-year past paper MCQ bank for Class XII Physics have been updated in the portal Notes section.',
    category: 'Announcement',
    audience: 'Male cohort',
    createdAt: '2026-11-06 17:20',
  },
  {
    id: 'notif-5',
    title: 'Automated Attendance Cutoff Reminder',
    message: 'Students are advised to scan their smart ID cards or connect to campus Wi-Fi within 20 minutes of shift commencement. Late entry is strictly logged after 15:40 (Morning) and 18:40 (Evening).',
    category: 'Attendance',
    audience: 'All',
    createdAt: '2026-11-05 10:00',
  },
  {
    id: 'notif-6',
    title: 'Gulshan Campus Special Physics Seminar',
    message: 'Renowned educationalist Prof. Tariq Mahmood will host a 2-hour problem-solving workshop for Evening Shift Class XII CS and Pre-Medical cohorts this Friday.',
    category: 'Announcement',
    audience: 'Gulshan campus',
    createdAt: '2026-11-04 16:45',
  },
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  // Day Shift - Male Cohort (Mon-Wed)
  { id: 'tt-1', day: 'Mon', shift: 'Morning', period: 1, timeRange: '15:20 – 16:10', subject: 'Physics', teacher: 'Prof. Tariq Mahmood', room: 'Hall A (Gulshan)', section: 'A1' },
  { id: 'tt-2', day: 'Mon', shift: 'Morning', period: 2, timeRange: '16:15 – 17:05', subject: 'Mathematics', teacher: 'Sir Rashid Khan', room: 'Hall A (Gulshan)', section: 'A1' },
  { id: 'tt-3', day: 'Mon', shift: 'Morning', period: 3, timeRange: '17:10 – 18:00', subject: 'Chemistry', teacher: 'Dr. Naveed Alam', room: 'Lab 2', section: 'A1' },

  { id: 'tt-4', day: 'Tue', shift: 'Morning', period: 1, timeRange: '15:20 – 16:10', subject: 'Chemistry', teacher: 'Dr. Naveed Alam', room: 'Hall A (Gulshan)', section: 'A1' },
  { id: 'tt-5', day: 'Tue', shift: 'Morning', period: 2, timeRange: '16:15 – 17:05', subject: 'Physics', teacher: 'Prof. Tariq Mahmood', room: 'Hall A (Gulshan)', section: 'A1' },
  { id: 'tt-6', day: 'Tue', shift: 'Morning', period: 3, timeRange: '17:10 – 18:00', subject: 'English', teacher: 'Prof. S. Qasim', room: 'Room 104', section: 'A1' },

  { id: 'tt-7', day: 'Wed', shift: 'Morning', period: 1, timeRange: '15:20 – 16:10', subject: 'Mathematics', teacher: 'Sir Rashid Khan', room: 'Hall A (Gulshan)', section: 'A1' },
  { id: 'tt-8', day: 'Wed', shift: 'Morning', period: 2, timeRange: '16:15 – 17:05', subject: 'Weekly Test Session', teacher: 'Exam Committee', room: 'Exam Hall 1', section: 'A1' },
  { id: 'tt-9', day: 'Wed', shift: 'Morning', period: 3, timeRange: '17:10 – 18:00', subject: 'Doubt Clearing & Numerical Workshop', teacher: 'Prof. Tariq Mahmood', room: 'Hall A', section: 'A1' },

  // Evening Shift - Female Cohort (Thu-Sat)
  { id: 'tt-10', day: 'Thu', shift: 'Evening', period: 1, timeRange: '18:20 – 19:10', subject: 'Computer Science', teacher: 'Dr. Asma Farooqui', room: 'CS Lab 1 (Gulshan)', section: 'C1' },
  { id: 'tt-11', day: 'Thu', shift: 'Evening', period: 2, timeRange: '19:15 – 20:05', subject: 'Physics', teacher: 'Sir Salman Ali', room: 'Room 201', section: 'C1' },
  { id: 'tt-12', day: 'Thu', shift: 'Evening', period: 3, timeRange: '20:10 – 21:00', subject: 'Mathematics', teacher: 'Sir Rashid Khan', room: 'Room 201', section: 'C1' },

  { id: 'tt-13', day: 'Fri', shift: 'Evening', period: 1, timeRange: '18:20 – 19:10', subject: 'Physics', teacher: 'Sir Salman Ali', room: 'Room 201', section: 'C1' },
  { id: 'tt-14', day: 'Fri', shift: 'Evening', period: 2, timeRange: '19:15 – 20:05', subject: 'Computer Science', teacher: 'Dr. Asma Farooqui', room: 'CS Lab 1', section: 'C1' },
  { id: 'tt-15', day: 'Fri', shift: 'Evening', period: 3, timeRange: '20:10 – 21:00', subject: 'English / Pak Studies', teacher: 'Prof. S. Qasim', room: 'Room 201', section: 'C1' },

  { id: 'tt-16', day: 'Sat', shift: 'Evening', period: 1, timeRange: '18:20 – 19:10', subject: 'Mathematics', teacher: 'Sir Rashid Khan', room: 'Room 201', section: 'C1' },
  { id: 'tt-17', day: 'Sat', shift: 'Evening', period: 2, timeRange: '19:15 – 20:05', subject: 'Weekly Test Session', teacher: 'Exam Committee', room: 'Auditorium', section: 'C1' },
  { id: 'tt-18', day: 'Sat', shift: 'Evening', period: 3, timeRange: '20:10 – 21:00', subject: 'Coding Lab & Algorithm Practice', teacher: 'Dr. Asma Farooqui', room: 'CS Lab 1', section: 'C1' },
];

export const INITIAL_UPCOMING_TESTS: UpcomingTest[] = [
  {
    id: 'ut-1',
    subject: 'Physics',
    stream: 'Pre-Engineering',
    classLevel: 'Class XII',
    date: '2026-11-11',
    shift: 'Morning',
    cohort: 'Male',
    topics: 'Chapter 12: Electrostatics — Coulomb’s Law, Electric Field Intensity, Gauss’s Law, and Capacitance',
    totalMarks: 50,
    durationMinutes: 45,
  },
  {
    id: 'ut-2',
    subject: 'Chemistry',
    stream: 'Pre-Medical',
    classLevel: 'Class XII',
    date: '2026-11-12',
    shift: 'Evening',
    cohort: 'Female',
    topics: 'Chapter 7: Chemical Equilibrium — Law of Mass Action, Equilibrium Constant (Kc, Kp), Le Chatelier’s Principle',
    totalMarks: 50,
    durationMinutes: 45,
  },
  {
    id: 'ut-3',
    subject: 'Computer Science',
    stream: 'Computer Science',
    classLevel: 'Class XII',
    date: '2026-11-14',
    shift: 'Evening',
    cohort: 'Female',
    topics: 'Data Structures & Algorithms: Binary Trees, Binary Search Trees, Inorder/Preorder/Postorder traversals',
    totalMarks: 50,
    durationMinutes: 45,
  },
  {
    id: 'ut-4',
    subject: 'Mathematics',
    stream: 'Pre-Engineering',
    classLevel: 'Class XII',
    date: '2026-11-18',
    shift: 'Morning',
    cohort: 'Male',
    topics: 'Calculus: Derivatives of Trigonometric, Exponential and Inverse Functions, Tangents and Normals',
    totalMarks: 50,
    durationMinutes: 50,
  },
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Electrostatics & Electric Potential Notes',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    subject: 'Physics',
    chapterNumber: 12,
    chapterTitle: 'Electrostatics',
    resourceType: 'Chapter Notes',
    uploadedAt: '2026-11-01',
    fileSize: '4.2 MB',
    pageCount: 3,
    contentPages: [
      `PRACTICAL CENTRE KARACHI
DEPARTMENT OF PHYSICS | CLASS XII (HSC PART II)
CHAPTER 12: ELECTROSTATICS — THEORY & DERIVATIONS

1.1 Coulomb's Law of Electrostatic Force:
The magnitude of electrostatic force between two point charges q₁ and q₂ separated by distance r in vacuum is given by:
F = (1 / 4πε₀) * (|q₁ q₂| / r²)
where ε₀ = 8.85 × 10⁻¹² C²/(N·m²). In a dielectric medium of permittivity εᵣ:
F_med = F_vac / εᵣ

1.2 Electric Field Intensity (E):
Electric intensity E at any point in an electric field is the force experienced per unit positive test charge:
E = lim (q₀→0) [F / q₀] = (1 / 4πε₀) * (q / r²) r̂
Units: N/C or V/m.

1.3 Electric Flux (Φ_e):
The total number of electric field lines passing normally through a given area:
Φ_e = E · A = E A cos(θ)
According to Gauss's Law: The total electric flux through any closed Gaussian surface is equal to 1/ε₀ times the total charge enclosed:
Φ_total = ∮ E · dA = Q_enclosed / ε₀`,

      `CHAPTER 12 (CONTINUED): APPLICATIONS OF GAUSS'S LAW

2.1 Electric Intensity due to an Infinite Sheet of Charge:
Consider a flat infinite sheet having uniform surface charge density σ = Q/A.
By constructing a cylindrical Gaussian surface penetrating through the sheet:
Total flux Φ = 2 * (E · A)
From Gauss's Law: 2 E A = σ A / ε₀
Therefore:
E = σ / (2ε₀)
Direction: Directed perpendicularly away from positive sheet or towards negative sheet.

2.2 Electric Field between Two Oppositely Charged Parallel Plates:
For two large conductive plates carrying equal and opposite surface charges (+σ and -σ):
Inside the plates, field contributions add:
E = σ/(2ε₀) + σ/(2ε₀) = σ / ε₀
Outside the plates, opposite fields cancel, yielding E = 0.

2.3 Capacitance of Parallel Plate Capacitor:
C = Q / V = ε₀ A / d
With dielectric material inserted:
C = εᵣ ε₀ A / d`,

      `CHAPTER 12: SOLVED NUMERICALS & EXAM DRILLS

Question 1:
Two point charges q₁ = +4 μC and q₂ = -6 μC are placed 20 cm apart in air.
Determine the point along the line joining them where the electric potential is zero.
Solution:
Let V = 0 at distance x from q₁:
V = V₁ + V₂ = (1/4πε₀) * [q₁/x + q₂/(20 - x)] = 0
4×10⁻⁶ / x + (-6×10⁻⁶)/(0.20 - x) = 0
4(0.20 - x) = 6x => 0.80 - 4x = 6x => 10x = 0.80 => x = 0.08 m (8 cm from q₁).

Question 2:
A 50 μF capacitor is charged to a potential difference of 200 V. Calculate stored energy:
U = 1/2 C V² = 0.5 × (50 × 10⁻⁶ F) × (200 V)² = 1.00 Joule.

Practical Centre Exam Tip: Always state SI units clearly in final answers to secure full board marks.`,
    ],
  },
  {
    id: 'note-2',
    title: 'Chemical Equilibrium Comprehensive Solutions',
    classLevel: 'Class XII',
    stream: 'Pre-Medical',
    subject: 'Chemistry',
    chapterNumber: 7,
    chapterTitle: 'Chemical Equilibrium',
    resourceType: 'Exercise Solutions',
    uploadedAt: '2026-11-03',
    fileSize: '3.8 MB',
    pageCount: 2,
    contentPages: [
      `PRACTICAL CENTRE KARACHI
DEPARTMENT OF CHEMISTRY | CLASS XII
CHAPTER 7: CHEMICAL EQUILIBRIUM & SOLUBILITY PRODUCT

1. Law of Mass Action (Guldberg & Waage):
The rate of a chemical reaction is directly proportional to the product of active masses (molar concentrations) of reacting substances raised to powers equal to their stoichiometric coefficients.
For reversible system: aA + bB ⇌ cC + dD
Forward Rate R_f = k_f [A]ᵃ [B]ᵇ
Reverse Rate R_r = k_r [C]ᶜ [D]ᵈ
At dynamic equilibrium: R_f = R_r
k_f [A]ᵃ [B]ᵇ = k_r [C]ᶜ [D]ᵈ
Kc = (k_f / k_r) = [C]ᶜ [D]ᵈ / ([A]ᵃ [B]ᵇ)

2. Relationship between Kp and Kc:
Kp = Kc (R T)^(Δn)
where Δn = (c + d) - (a + b), moles of gaseous products minus gaseous reactants.
Cases:
- When Δn = 0: Kp = Kc (e.g., H₂ + I₂ ⇌ 2HI)
- When Δn > 0: Kp > Kc (e.g., PCl₅ ⇌ PCl₃ + Cl₂)
- When Δn < 0: Kp < Kc (e.g., N₂ + 3H₂ ⇌ 2NH₃)`,

      `CHAPTER 7 (PAGE 2): LE CHATELIER'S PRINCIPLE & BUFFER SOLUTIONS

1. Principle Statement:
If a stress (change in concentration, pressure, volume, or temperature) is applied to a chemical system at equilibrium, the system will adjust itself in such a way as to nullify or minimize the effect of the stress.

2. Industrial Haber-Bosch Synthesis of Ammonia:
N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + 92.4 kJ/mol
- Effect of Pressure: Increasing pressure shifts equilibrium to the right (4 moles → 2 moles). Optimum: 200 atm.
- Effect of Temperature: Exothermic reaction. High temperature shifts reverse; very low slows rate. Optimum compromise: 450°C with Fe/Al₂O₃ catalyst.

3. Buffer Solutions:
Henderson-Hasselbalch Equation for Acidic Buffer:
pH = pKa + log([Salt] / [Acid])
For Basic Buffer:
pOH = pKb + log([Salt] / [Base])
pH = 14 - pOH`,
    ],
  },
  {
    id: 'note-3',
    title: 'Data Structures: Trees & Graphs Handouts',
    classLevel: 'Class XII',
    stream: 'Computer Science',
    subject: 'Computer Science',
    chapterNumber: 4,
    chapterTitle: 'Data Structures & Algorithms',
    resourceType: 'Chapter Notes',
    uploadedAt: '2026-11-05',
    fileSize: '5.1 MB',
    pageCount: 2,
    contentPages: [
      `PRACTICAL CENTRE KARACHI
DEPARTMENT OF COMPUTER SCIENCE | CLASS XII
CHAPTER 4: ADVANCED DATA STRUCTURES

1. Tree Terminology:
- Root: The topmost node without a parent.
- Degree of a node: Total number of subtrees or children.
- Depth / Height of tree: Length of the longest path from root to leaf node.

2. Binary Search Tree (BST) Invariant:
For every node N:
- All keys in left subtree(N) < key(N)
- All keys in right subtree(N) > key(N)

3. Tree Traversals:
- Preorder: Visit Node → Left Subtree → Right Subtree
- Inorder: Left Subtree → Visit Node → Right Subtree (Yields sorted order in BST!)
- Postorder: Left Subtree → Right Subtree → Visit Node`,

      `CHAPTER 4 (PAGE 2): ALGORITHM TIME COMPLEXITY & PSEUDOCODE

BST Search Algorithm:
function searchBST(root, target):
    if root is null or root.key == target:
        return root
    if target < root.key:
        return searchBST(root.left, target)
    else:
        return searchBST(root.right, target)

Time Complexities:
- Best / Average Case (Balanced BST): O(log₂ n)
- Worst Case (Skewed Degenerate Tree): O(n)
- Insertion / Deletion: O(log₂ n) average

Exam Warning: Remember that BST does not allow duplicate keys unless explicitly modeled with frequency counters.`,
    ],
  },
  {
    id: 'note-4',
    title: 'Class XII Mathematics Formula Sheet',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    subject: 'Mathematics',
    chapterNumber: 0,
    chapterTitle: 'Formula Sheet: Calculus & Analytic Geometry',
    resourceType: 'Formula Sheet',
    uploadedAt: '2026-11-04',
    fileSize: '2.1 MB',
    pageCount: 2,
    contentPages: [
      `PRACTICAL CENTRE KARACHI
MATHEMATICS COMPLETE HSC PART-II FORMULA REFERENCE

1. DIFFERENTIATION RULES:
d/dx [c] = 0
d/dx [xⁿ] = n xⁿ⁻¹
d/dx [sin x] = cos x | d/dx [cos x] = -sin x
d/dx [tan x] = sec² x | d/dx [sec x] = sec x tan x
d/dx [ln x] = 1/x | d/dx [eᵃˣ] = a eᵃˣ
Product Rule: d/dx [u · v] = u v' + v u'
Quotient Rule: d/dx [u / v] = (v u' - u v') / v²
Chain Rule: dy/dx = (dy/du) · (du/dx)

2. INTEGRATION FUNDAMENTALS:
∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C (for n ≠ -1)
∫ 1/x dx = ln|x| + C
∫ eᵏˣ dx = (1/k) eᵏˣ + C
∫ sec² x dx = tan x + C
Integration by Parts: ∫ u v dx = u ∫ v dx - ∫ [u' (∫ v dx)] dx`,

      `MATHEMATICS FORMULA REFERENCE (PAGE 2)

3. ANALYTIC GEOMETRY:
Distance Formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]
Slope of Line: m = (y₂ - y₁) / (x₂ - x₁) = -A/B for Ax + By + C = 0
Slope-Intercept Form: y = mx + c
Point-Slope Form: y - y₁ = m(x - x₁)
Angle Between Two Lines: tan(θ) = |(m₂ - m₁) / (1 + m₁ m₂)|
Parallel Condition: m₁ = m₂
Perpendicular Condition: m₁ · m₂ = -1

4. CIRCLE EQUATIONS:
Standard Form: (x - h)² + (y - k)² = r² (Center (h, k), Radius r)
General Form: x² + y² + 2gx + 2fy + c = 0
Center = (-g, -f), Radius = √(g² + f² - c)`,
    ],
  },
  {
    id: 'note-5',
    title: 'Sindh Board 10-Year Past Paper Solved MCQs',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    subject: 'Physics',
    chapterNumber: 99,
    chapterTitle: 'Past Papers Revision',
    resourceType: 'Past Papers',
    uploadedAt: '2026-10-25',
    fileSize: '6.4 MB',
    pageCount: 1,
    contentPages: [
      `PRACTICAL CENTRE COMPILATION
SINDH BOARD 10-YEAR FREQUENTLY TESTED MCQS (PHYSICS XII)

1. The unit of electric flux in SI system is:
   (a) N/C   (b) N·m²/C   (c) C/m²   (d) V/m
   Answer: (b) N·m²/C

2. When a dielectric is introduced between the plates of a charged isolated capacitor, its capacitance:
   (a) Decreases   (b) Remains same   (c) Increases   (d) Becomes zero
   Answer: (c) Increases by factor εᵣ

3. Kirchhoff's First Rule (Junction Rule) is a manifestation of conservation of:
   (a) Energy   (b) Momentum   (c) Charge   (d) Mass
   Answer: (c) Charge

4. The sensitivity of a moving coil galvanometer can be increased by:
   (a) Decreasing magnetic field   (b) Increasing area of coil
   (c) Increasing restoring couple (d) Decreasing number of turns
   Answer: (b) Increasing area of coil (S = NAB / C)`,
    ],
  },
];

export const INITIAL_PARENT_MESSAGES: ParentMessage[] = [
  {
    id: 'pm-1',
    studentId: 'PC-2026-A1-042',
    studentName: 'Muhammad Sohaib Hafeez',
    guardianName: 'Hafeez-ur-Rehman',
    phone: '0300-8291456',
    channel: 'SMS',
    messageText: "Respected Parent, your child Muhammad Sohaib Hafeez (Roll # 042) was marked ABSENT for today's session (2026-10-27, Morning Shift) at Practical Centre Gulshan-e-Iqbal Block 1. Please contact administration for queries.",
    timestamp: '2026-10-27 16:05:00',
    status: 'Delivered',
    date: '2026-10-27',
    shift: 'Morning',
  },
  {
    id: 'pm-2',
    studentId: 'PC-2026-A1-011',
    studentName: 'Hamza Tariq',
    guardianName: 'Tariq Mehmood',
    phone: '0333-2198745',
    channel: 'WhatsApp',
    messageText: "Respected Parent, your child Hamza Tariq (Roll # 011) was marked ABSENT for today's session (2026-11-04, Morning Shift) at Practical Centre Gulshan-e-Iqbal Block 1. Please contact administration for queries.",
    timestamp: '2026-11-04 16:02:11',
    status: 'Delivered',
    date: '2026-11-04',
    shift: 'Morning',
  },
];

export const INITIAL_ADMISSIONS: AdmissionFormSubmission[] = [
  {
    id: 'adm-101',
    referenceNumber: 'PC-ADM-2026-8941',
    submittedAt: '2026-11-08 14:22',
    status: 'Approved',
    studentName: 'Usman Ghani',
    fatherName: 'Ghani-ur-Rahman',
    gender: 'Male',
    dob: '2008-04-15',
    guardianPhone: '0313-9871234',
    guardianEmail: 'ghani.family@gmail.com',
    previousSchool: 'St. Paul’s English High School, Karachi',
    sscMarks: '942 / 1100 (85.6%)',
    sscBoard: 'BIEK Karachi',
    preferredClass: 'Class XI',
    preferredStream: 'Pre-Engineering',
    preferredShift: 'Morning',
    preferredCampus: 'Gulshan-e-Iqbal Block 1',
    remarks: 'Approved for Section A2. Merit interview cleared.',
  },
  {
    id: 'adm-102',
    referenceNumber: 'PC-ADM-2026-9023',
    submittedAt: '2026-11-09 18:40',
    status: 'Pending',
    studentName: 'Sara Qureshi',
    fatherName: 'Irfan Qureshi',
    gender: 'Female',
    dob: '2008-08-20',
    guardianPhone: '0323-5566778',
    guardianEmail: 'irfan.qureshi@yahoo.com',
    previousSchool: 'Mama Parsi Girls Secondary School',
    sscMarks: '990 / 1100 (90.0%)',
    sscBoard: 'BIEK Karachi',
    preferredClass: 'Class XI',
    preferredStream: 'Computer Science',
    preferredShift: 'Evening',
    preferredCampus: 'Gulshan-e-Iqbal Block 1',
    remarks: 'Under verification by campus director.',
  },
];

export const INITIAL_EXAM_FORMS: ExamFormSubmission[] = [
  {
    id: 'exm-201',
    referenceNumber: 'PC-EXM-2026-3401',
    submittedAt: '2026-11-07 10:15',
    status: 'Approved',
    studentId: 'PC-2026-A1-042',
    studentName: 'Muhammad Sohaib Hafeez',
    rollNumber: '042',
    classLevel: 'Class XII',
    stream: 'Pre-Engineering',
    examType: 'Monthly Comprehensive',
    selectedSubjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
    declarationAccepted: true,
    remarks: 'Exam roll slip generated for Exam Hall 1.',
  },
];

export const INITIAL_TIME_LOCK: TimeLockConfig = {
  isEnabled: false,
  target: 'Entire Student Portal',
  startTime: '2026-11-10T07:00:00',
  endTime: '2026-11-10T22:00:00',
  reopenTimeDescription: 'Tomorrow 08:00 AM (PKT)',
  isEmergencyLocked: false,
  simulatedTimeOffsetMinutes: 0,
};

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    subject: 'Physics',
    authorName: 'Muhammad Sohaib Hafeez',
    isAnonymous: false,
    authorStudentId: 'PC-2026-A1-042',
    content: 'Can someone clarify the difference between terminal voltage and electromotive force (EMF) when a battery is being recharged by an external source?',
    timestamp: '2026-11-09 19:40',
    likes: 6,
    replies: [
      {
        id: 'rep-1',
        authorName: 'Anonymous Peer',
        isAnonymous: true,
        content: 'When discharging, Vt = E - Ir. But during recharging, the current is driven into the positive terminal, so Vt = E + Ir. Hence terminal voltage exceeds EMF!',
        timestamp: '2026-11-09 20:05',
      },
    ],
  },
  {
    id: 'post-2',
    subject: 'Computer Science',
    authorName: 'Dua Sohail',
    isAnonymous: false,
    authorStudentId: 'PC-2026-C1-019',
    content: 'For the upcoming CS weekly test on Trees: will we be tested on AVL rotations or just standard BST insertion/deletion algorithms?',
    timestamp: '2026-11-08 21:10',
    likes: 9,
    replies: [
      {
        id: 'rep-2',
        authorName: 'Anonymous Peer',
        isAnonymous: true,
        content: 'Dr. Asma confirmed on Thursday that this week focuses on BST traversal and search complexity. AVL rotations will be in next month’s module!',
        timestamp: '2026-11-08 21:30',
      },
    ],
  },
];
