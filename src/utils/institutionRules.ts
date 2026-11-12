import { CohortType, ShiftType, TimeLockConfig, TimeLockTarget } from '../types';

/**
 * Validates whether the given date corresponds to the student's cohort schedule.
 * Male cohort: Monday (1), Tuesday (2), Wednesday (3)
 * Female cohort: Thursday (4), Friday (5), Saturday (6)
 * Sunday (0): Institute closed / holiday
 */
export function isCohortDayValid(dateInput: Date | string, cohort: CohortType): {
  valid: boolean;
  dayName: string;
  expectedDays: string;
  warning?: string;
} {
  const d = typeof dateInput === 'string' ? new Date(dateInput + 'T12:00:00') : new Date(dateInput);
  const dayIndex = d.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = dayNames[dayIndex];

  if (dayIndex === 0) {
    return {
      valid: false,
      dayName,
      expectedDays: cohort === 'Male' ? 'Monday - Wednesday' : 'Thursday - Saturday',
      warning: 'Sunday is an institute holiday. No regular classes are scheduled.',
    };
  }

  if (cohort === 'Male') {
    const isMonWed = dayIndex >= 1 && dayIndex <= 3;
    return {
      valid: isMonWed,
      dayName,
      expectedDays: 'Monday – Wednesday (Male Cohort)',
      warning: isMonWed
        ? undefined
        : `Selected date is ${dayName}. Male cohort classes are held Mon–Wed only.`,
    };
  } else {
    const isThuSat = dayIndex >= 4 && dayIndex <= 6;
    return {
      valid: isThuSat,
      dayName,
      expectedDays: 'Thursday – Saturday (Female Cohort)',
      warning: isThuSat
        ? undefined
        : `Selected date is ${dayName}. Female cohort classes are held Thu–Sat only.`,
    };
  }
}

/**
 * Calculates student arrival status based on cutoff rule:
 * Morning shift: 15:20 start. Cutoff 15:40. Arrivals after 15:40 are "Late".
 * Evening shift: 18:20 start. Cutoff 18:40. Arrivals after 18:40 are "Late".
 */
export function calculateAttendanceStatus(
  timeStringHHMM: string,
  shift: ShiftType
): 'Present' | 'Late' {
  const [hours, minutes] = timeStringHHMM.split(':').map(Number);
  const arrivalMinutes = hours * 60 + (minutes || 0);

  // Morning shift starts 15:20 (920 min). 20-min grace = 15:40 (940 min)
  // Evening shift starts 18:20 (1100 min). 20-min grace = 18:40 (1120 min)
  if (shift === 'Morning') {
    const cutoffMinutes = 15 * 60 + 40; // 15:40
    return arrivalMinutes <= cutoffMinutes ? 'Present' : 'Late';
  } else {
    const cutoffMinutes = 18 * 60 + 40; // 18:40
    return arrivalMinutes <= cutoffMinutes ? 'Present' : 'Late';
  }
}

/**
 * Generates official automated absent SMS text for parents/guardians.
 */
export function generateParentNotification(
  studentName: string,
  rollNumber: string,
  date: string,
  shift: ShiftType,
  campus: string
): string {
  return `Respected Parent, your child ${studentName} (Roll # ${rollNumber}) was marked ABSENT for today's session (${date}, ${shift} Shift) at Practical Centre ${campus}. Please contact administration for queries.`;
}

/**
 * Checks if a specific portal feature is currently locked under Portal Time Lock.
 */
export function isFeatureLocked(
  config: TimeLockConfig,
  currentSimulatedTime: Date,
  currentFeature: 'portal' | 'notes' | 'forms' | 'reports'
): boolean {
  if (!config.isEnabled) return false;
  if (config.isEmergencyLocked) return true;

  // Check if target applies to this feature
  const targetMatches =
    config.target === 'Entire Student Portal' ||
    (config.target === 'Notes only' && currentFeature === 'notes') ||
    (config.target === 'Online Forms only' && currentFeature === 'forms') ||
    (config.target === 'Weekly Reports only' && currentFeature === 'reports');

  if (!targetMatches) return false;

  // Parse start and end times (either ISO string or HH:mm)
  if (config.startTime && config.endTime) {
    const start = new Date(config.startTime);
    const end = new Date(config.endTime);

    // If valid dates: portal is unlocked ONLY within [start, end]. After end or before start it is locked.
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const nowMs = currentSimulatedTime.getTime();
      return nowMs < start.getTime() || nowMs > end.getTime();
    }
  }

  return false;
}

/**
 * Moderates community text: blocks Pakistani phone numbers (03xx...) and links/URLs.
 */
export function moderateCommunityText(text: string): {
  allowed: boolean;
  reason?: string;
} {
  // Regex for Pakistani phone numbers: 03xx-xxxxxxx, 03xxxxxxxxx, +923xxxxxxxxx, 923xxxxxxxxx
  const pakPhoneRegex = /(?:\+?92|0)?\s*3\d{2}[-\s]?\d{7}\b/;
  if (pakPhoneRegex.test(text)) {
    return {
      allowed: false,
      reason: 'Sharing personal contact or phone numbers is not permitted in peer discussions.',
    };
  }

  // Regex for URLs / links
  const urlRegex = /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|pk|edu|org|net|xyz|me)\b)/i;
  if (urlRegex.test(text)) {
    return {
      allowed: false,
      reason: 'Sharing external web links or URLs is prohibited for student safety.',
    };
  }

  if (text.trim().length < 3) {
    return {
      allowed: false,
      reason: 'Post content must be at least 3 characters.',
    };
  }

  return { allowed: true };
}
