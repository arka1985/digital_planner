/**
 * Conflict Detection Engine
 * Accurately detects overlaps across date ranges, full days, and time intervals.
 */

const ConflictDetector = (() => {

  /**
   * Parse YYYY-MM-DD to Date object at midnight local time
   */
  function parseDate(str) {
    if (!str) return null;
    const parts = str.split('-');
    if (parts.length !== 3) return new Date(str);
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  /**
   * Convert time string 'HH:mm' to minutes from midnight
   */
  function timeToMinutes(tStr) {
    if (!tStr) return null;
    const [h, m] = tStr.split(':').map(Number);
    return h * 60 + (m || 0);
  }

  /**
   * Format minutes to 12-hour AM/PM string
   */
  function formatMinutes(min) {
    if (min === null || min === undefined) return '';
    const h24 = Math.floor(min / 60);
    const m = min % 60;
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
  }

  /**
   * Format Date to readable string (e.g. "14 Aug 2026")
   */
  function formatDateReadable(dStr) {
    if (!dStr) return '';
    const d = parseDate(dStr);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /**
   * Check if two date ranges [s1, e1] and [s2, e2] overlap
   */
  function datesOverlap(s1, e1, s2, e2) {
    // Both inclusive
    return s1 <= e2 && s2 <= e1;
  }

  /**
   * Check conflict between two specific events A and B
   * Returns null if no conflict, or an object describing the conflict.
   */
  function checkPairConflict(eventA, eventB) {
    // Ignore cancelled events
    if (eventA.status === 'cancelled' || eventB.status === 'cancelled') {
      return null;
    }

    // Two holidays co-existing on the same day (e.g. Independence Day & Milad-un-Nabi on Aug 15) do NOT conflict with each other!
    if (eventA.category === 'Holiday' && eventB.category === 'Holiday') {
      return null;
    }

    const startA = eventA.startDate;
    const endA = eventA.endDate || eventA.startDate;
    const startB = eventB.startDate;
    const endB = eventB.endDate || eventB.startDate;

    if (!datesOverlap(startA, endA, startB, endB)) {
      return null;
    }

    // Determine overlapping date range
    const overlapStart = startA > startB ? startA : startB;
    const overlapEnd = endA < endB ? endA : endB;

    // Check if one of them is a Holiday and the other is a scheduled duty/travel
    const isHolidayInvolved = eventA.category === 'Holiday' || eventB.category === 'Holiday';
    const holidayItem = eventA.category === 'Holiday' ? eventA : (eventB.category === 'Holiday' ? eventB : null);

    if (isHolidayInvolved && holidayItem) {
      return {
        type: 'holiday_overlap',
        severity: 'medium',
        overlapStart,
        overlapEnd,
        message: `Notice: Scheduled on Central Govt Holiday (${holidayItem.title}) on ${formatDateReadable(overlapStart)}`,
        peer: eventB
      };
    }

    // Both are all-day events
    if (eventA.isAllDay && eventB.isAllDay) {
      const isSingleDay = overlapStart === overlapEnd;
      return {
        type: 'date_overlap',
        severity: 'high',
        overlapStart,
        overlapEnd,
        message: isSingleDay
          ? `Full-day clash on ${formatDateReadable(overlapStart)}`
          : `Date range clash from ${formatDateReadable(overlapStart)} to ${formatDateReadable(overlapEnd)}`,
        peer: eventB
      };
    }

    // Both have specific times and overlap spans across single day or same dates
    if (!eventA.isAllDay && !eventB.isAllDay) {
      // If single overlapping day
      if (overlapStart === overlapEnd) {
        const aStartMin = timeToMinutes(eventA.startTime) ?? 0;
        const aEndMin = timeToMinutes(eventA.endTime) ?? 1439;
        const bStartMin = timeToMinutes(eventB.startTime) ?? 0;
        const bEndMin = timeToMinutes(eventB.endTime) ?? 1439;

        // Check if time intervals overlap
        if (aStartMin < bEndMin && bStartMin < aEndMin) {
          const conflictStart = Math.max(aStartMin, bStartMin);
          const conflictEnd = Math.min(aEndMin, bEndMin);
          return {
            type: 'time_overlap',
            severity: 'high',
            overlapStart,
            overlapEnd,
            message: `Time overlap on ${formatDateReadable(overlapStart)} (${formatMinutes(conflictStart)} - ${formatMinutes(conflictEnd)})`,
            peer: eventB
          };
        }
        // Different times on same day: no conflict!
        return null;
      } else {
        // Multi-day timed events overlapping
        return {
          type: 'multi_day_time_overlap',
          severity: 'medium',
          overlapStart,
          overlapEnd,
          message: `Multi-day schedule overlap between ${formatDateReadable(overlapStart)} and ${formatDateReadable(overlapEnd)}`,
          peer: eventB
        };
      }
    }

    // One is all-day, the other has specific time
    return {
      type: 'all_day_mixed_overlap',
      severity: 'medium',
      overlapStart,
      overlapEnd,
      message: overlapStart === overlapEnd
        ? `Overlaps with all-day schedule on ${formatDateReadable(overlapStart)}`
        : `Overlaps during date range ${formatDateReadable(overlapStart)} to ${formatDateReadable(overlapEnd)}`,
      peer: eventB
    };
  }

  /**
   * Find all conflicts for a candidate event against an array of existing events
   */
  function findConflictsForCandidate(candidate, events, excludeId = null) {
    if (!candidate || !candidate.startDate) return [];
    if (candidate.status === 'cancelled') return [];

    const conflicts = [];
    for (const ev of events) {
      if (excludeId && ev.id === excludeId) continue;
      if (candidate.id && ev.id === candidate.id) continue;

      const conflict = checkPairConflict(candidate, ev);
      if (conflict) {
        conflicts.push(conflict);
      }
    }
    return conflicts;
  }

  /**
   * Scan entire database and map out all active conflicts
   * Returns a Map where key is eventId, value is array of conflicts for that event
   */
  function findAllConflicts(events) {
    const conflictMap = new Map();
    const activeEvents = events.filter(e => e.status !== 'cancelled');

    for (let i = 0; i < activeEvents.length; i++) {
      for (let j = i + 1; j < activeEvents.length; j++) {
        const evA = activeEvents[i];
        const evB = activeEvents[j];
        const conflictA = checkPairConflict(evA, evB);
        if (conflictA) {
          if (!conflictMap.has(evA.id)) conflictMap.set(evA.id, []);
          conflictMap.get(evA.id).push(conflictA);

          // Reverse conflict for B
          const conflictB = checkPairConflict(evB, evA);
          if (!conflictMap.has(evB.id)) conflictMap.set(evB.id, []);
          conflictMap.get(evB.id).push(conflictB);
        }
      }
    }

    return conflictMap;
  }

  return {
    checkPairConflict,
    findConflictsForCandidate,
    findAllConflicts,
    formatDateReadable,
    formatMinutes
  };
})();

// Export globally
window.ConflictDetector = ConflictDetector;
