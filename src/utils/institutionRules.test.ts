import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isCohortDayValid,
  calculateAttendanceStatus,
  generateParentNotification,
  isFeatureLocked,
  moderateCommunityText,
} from './institutionRules';
import { TimeLockConfig } from '../types';

test('isCohortDayValid correctly identifies male vs female cohort days', () => {
  // 2026-11-09 is Monday, 2026-11-10 is Tuesday, 2026-11-11 is Wednesday
  // 2026-11-12 is Thursday, 2026-11-13 is Friday, 2026-11-14 is Saturday, 2026-11-15 is Sunday

  const mondayMale = isCohortDayValid('2026-11-09', 'Male');
  assert.equal(mondayMale.valid, true);

  const mondayFemale = isCohortDayValid('2026-11-09', 'Female');
  assert.equal(mondayFemale.valid, false);

  const thursdayFemale = isCohortDayValid('2026-11-12', 'Female');
  assert.equal(thursdayFemale.valid, true);

  const thursdayMale = isCohortDayValid('2026-11-12', 'Male');
  assert.equal(thursdayMale.valid, false);

  const sunday = isCohortDayValid('2026-11-15', 'Male');
  assert.equal(sunday.valid, false);
});

test('calculateAttendanceStatus respects 20-minute cutoff for both shifts', () => {
  // Morning shift starts 15:20, cutoff 15:40
  assert.equal(calculateAttendanceStatus('15:15', 'Morning'), 'Present');
  assert.equal(calculateAttendanceStatus('15:40', 'Morning'), 'Present');
  assert.equal(calculateAttendanceStatus('15:41', 'Morning'), 'Late');
  assert.equal(calculateAttendanceStatus('16:05', 'Morning'), 'Late');

  // Evening shift starts 18:20, cutoff 18:40
  assert.equal(calculateAttendanceStatus('18:20', 'Evening'), 'Present');
  assert.equal(calculateAttendanceStatus('18:40', 'Evening'), 'Present');
  assert.equal(calculateAttendanceStatus('18:45', 'Evening'), 'Late');
});

test('generateParentNotification formats mandatory student absence message', () => {
  const msg = generateParentNotification(
    'Muhammad Sohaib Hafeez',
    'PC-2026-A1-042',
    '2026-11-10',
    'Morning',
    'Gulshan-e-Iqbal Block 1'
  );
  assert.ok(msg.includes('Muhammad Sohaib Hafeez'));
  assert.ok(msg.includes('PC-2026-A1-042'));
  assert.ok(msg.includes('ABSENT'));
  assert.ok(msg.includes('Gulshan-e-Iqbal Block 1'));
});

test('isFeatureLocked verifies emergency lock and window expiry', () => {
  const config: TimeLockConfig = {
    isEnabled: true,
    target: 'Notes only',
    startTime: '2026-11-10T08:00:00Z',
    endTime: '2026-11-10T18:00:00Z',
    reopenTimeDescription: 'Tomorrow 08:00 AM',
    isEmergencyLocked: false,
    simulatedTimeOffsetMinutes: 0,
  };

  // During window
  const duringWindow = new Date('2026-11-10T12:00:00Z');
  assert.equal(isFeatureLocked(config, duringWindow, 'notes'), false);

  // Irrelevant feature
  assert.equal(isFeatureLocked(config, new Date('2026-11-10T20:00:00Z'), 'forms'), false);

  // Outside window for target feature
  const afterWindow = new Date('2026-11-10T19:00:00Z');
  assert.equal(isFeatureLocked(config, afterWindow, 'notes'), true);

  // Emergency lock overrides
  const emergencyConfig = { ...config, isEmergencyLocked: true };
  assert.equal(isFeatureLocked(emergencyConfig, duringWindow, 'notes'), true);
});

test('moderateCommunityText detects phone numbers and links', () => {
  assert.equal(moderateCommunityText('Can someone explain question 4 on page 32?').allowed, true);
  assert.equal(moderateCommunityText('Call me on 0300-1234567 for past papers').allowed, false);
  assert.equal(moderateCommunityText('WhatsApp me at 03451234567').allowed, false);
  assert.equal(moderateCommunityText('Check this solution at https://example.com/notes').allowed, false);
});
