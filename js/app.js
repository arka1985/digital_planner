/**
 * Main Application Logic
 * Integrates Views, Zero-Knowledge Storage, and Real-Time Conflict Detection.
 */

(() => {
  // Global App State
  const state = {
    currentYear: 2026,
    currentView: 'diary', // 'diary' | 'calendar' | 'agenda'
    calendarMonth: 0,     // 0 = Jan, 11 = Dec
    diaryLayout: localStorage.getItem('planner_diary_layout') || '4col', // '4col' (All 12 Months) or '2col' (Notebook)
    events: [],
    profile: {
      name: "Dr. Arkaprabha Sau",
      title: "Monthly Schedule & Duties",
      defaultYear: 2026
    },
    conflictsMap: new Map(),
    activeFilter: {
      search: '',
      category: '',
      priority: '',
      status: ''
    },
    editingEventId: null
  };

  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // The 14 Official Categories requested by Dr. Arkaprabha Sau
  const PLANNER_CATEGORIES = [
    "Academic",
    "Official commitment",
    "Research",
    "Guest Lectures",
    "Conference",
    "Seminars",
    "In Plant training programme",
    "Institutional programme",
    "Personal commitment",
    "Family commitment",
    "Friends request",
    "Workshop",
    "Non Official programmes",
    "Others"
  ];

  // Multi-Select Category State in Modal
  let currentSelectedCategories = [];

  // DOM Elements
  const el = {
    // Lock / Login Screen
    lockScreen: document.getElementById('lock-screen'),
    tabLogin: document.getElementById('tab-login'),
    tabSetup: document.getElementById('tab-setup'),
    unlockSection: document.getElementById('lock-unlock-section'),
    setupSection: document.getElementById('lock-setup-section'),
    formUnlock: document.getElementById('form-unlock'),
    unlockPassword: document.getElementById('unlock-password'),
    unlockError: document.getElementById('unlock-error'),
    formSetup: document.getElementById('form-setup'),
    setupPassword: document.getElementById('setup-password'),
    setupPasswordConfirm: document.getElementById('setup-password-confirm'),
    setupIncludeSample: document.getElementById('setup-include-sample'),
    setupError: document.getElementById('setup-error'),
    btnShowImportBackup: document.getElementById('btn-show-import-backup'),
    btnSetupImportLink: document.getElementById('btn-setup-import-link'),
    importFileInput: document.getElementById('import-file-input'),

    // App Wrapper
    appContainer: document.getElementById('app-container'),

    // App Header
    appProfileTitle: document.getElementById('app-profile-title'),
    navBtnDiary: document.getElementById('nav-btn-diary'),
    navBtnCalendar: document.getElementById('nav-btn-calendar'),
    navBtnAgenda: document.getElementById('nav-btn-agenda'),
    currentYearDisplay: document.getElementById('current-year-display'),
    btnYearPrev: document.getElementById('btn-year-prev'),
    btnYearNext: document.getElementById('btn-year-next'),
    btnConflictBadge: document.getElementById('btn-conflict-badge'),
    conflictBadgeIcon: document.getElementById('conflict-badge-icon'),
    conflictBadgeText: document.getElementById('conflict-badge-text'),
    btnAddEventTop: document.getElementById('btn-add-event-top'),
    btnOpenSettings: document.getElementById('btn-open-settings'),
    btnPrint: document.getElementById('btn-print'),
    btnLockNow: document.getElementById('btn-lock-now'),

    // Search & Filters
    filterSearchInput: document.getElementById('filter-search-input'),
    filterCategorySelect: document.getElementById('filter-category-select'),
    filterPrioritySelect: document.getElementById('filter-priority-select'),
    filterStatusSelect: document.getElementById('filter-status-select'),
    filteredCountText: document.getElementById('filtered-count-text'),
    btnToolbarAdd2027Holidays: document.getElementById('btn-toolbar-add-2027-holidays'),
    btnLayout4Col: document.getElementById('btn-layout-4col'),
    btnLayout2Col: document.getElementById('btn-layout-2col'),
    monthJumpStrip: document.getElementById('month-jump-strip'),

    // Views
    viewDiary: document.getElementById('view-diary'),
    viewCalendar: document.getElementById('view-calendar'),
    viewAgenda: document.getElementById('view-agenda'),
    calendarMonthTitle: document.getElementById('calendar-month-title'),
    calendarDaysContainer: document.getElementById('calendar-days-container'),
    calPrevMonth: document.getElementById('cal-prev-month'),
    calNextMonth: document.getElementById('cal-next-month'),
    calTodayBtn: document.getElementById('cal-today-btn'),

    // Event Modal
    modalEvent: document.getElementById('modal-event'),
    modalEventTitle: document.getElementById('modal-event-title'),
    btnCloseEventModal: document.getElementById('btn-close-event-modal'),
    formEvent: document.getElementById('form-event'),
    eventId: document.getElementById('event-id'),
    modalConflictBanner: document.getElementById('modal-conflict-banner'),
    modalConflictList: document.getElementById('modal-conflict-list'),
    eventTitle: document.getElementById('event-title'),
    eventTaskName: document.getElementById('event-task-name'),
    categoryChipsGrid: document.getElementById('category-chips-grid'),
    selectedCategoriesCount: document.getElementById('selected-categories-count'),
    eventCategory: document.getElementById('event-category'),
    eventStatus: document.getElementById('event-status'),
    eventStartDate: document.getElementById('event-start-date'),
    eventEndDate: document.getElementById('event-end-date'),
    eventStartDayName: document.getElementById('event-start-day-name'),
    eventEndDayName: document.getElementById('event-end-day-name'),
    eventAllday: document.getElementById('event-allday'),
    eventTimesRow: document.getElementById('event-times-row'),
    eventStartTime: document.getElementById('event-start-time'),
    eventEndTime: document.getElementById('event-end-time'),
    eventLocation: document.getElementById('event-location'),
    eventNotes: document.getElementById('event-notes'),
    btnDeleteEvent: document.getElementById('btn-delete-event'),
    btnCancelEvent: document.getElementById('btn-cancel-event'),

    // Conflict Modal
    modalConflicts: document.getElementById('modal-conflicts'),
    btnCloseConflictModal: document.getElementById('btn-close-conflict-modal'),
    btnDismissConflictModal: document.getElementById('btn-dismiss-conflict-modal'),
    conflictModalList: document.getElementById('conflict-modal-list'),

    // Settings Modal
    modalSettings: document.getElementById('modal-settings'),
    btnCloseSettingsModal: document.getElementById('btn-close-settings-modal'),
    btnSaveSettings: document.getElementById('btn-save-settings'),
    settingAutolock: document.getElementById('setting-autolock'),
    settingProfileName: document.getElementById('setting-profile-name'),
    changeOldPassword: document.getElementById('change-old-password'),
    changeNewPassword: document.getElementById('change-new-password'),
    changePwdStatus: document.getElementById('change-pwd-status'),
    btnSaveNewPassword: document.getElementById('btn-save-new-password'),
    btnExportBackup: document.getElementById('btn-export-backup'),
    btnExportPlain: document.getElementById('btn-export-plain'),
    btnImportBackupSettings: document.getElementById('btn-import-backup-settings'),
    btnLoadSampleDiary: document.getElementById('btn-load-sample-diary'),
    btnLoad2027Holidays: document.getElementById('btn-load-2027-holidays'),

    // Toast
    toast: document.getElementById('toast')
  };

  /**
   * Show feedback toast notification
   */
  function showToast(msg, duration = 3000) {
    el.toast.textContent = msg;
    el.toast.style.display = 'block';
    setTimeout(() => {
      el.toast.style.display = 'none';
    }, duration);
  }

  // ---------------------------------------------------------
  // INITIALIZATION & VAULT AUTH
  // ---------------------------------------------------------
  function initApp() {
    setupEventListeners();

    // Check if vault is configured
    if (PlannerStorage.isVaultConfigured()) {
      showUnlockScreen();
    } else {
      showSetupScreen();
    }

    // Auto-lock callback
    PlannerStorage.onLock(() => {
      showUnlockScreen();
      showToast('🔒 Planner automatically locked for privacy.');
    });
  }

  function showUnlockScreen() {
    el.lockScreen.style.display = 'flex';
    el.unlockSection.style.display = 'block';
    el.setupSection.style.display = 'none';

    if (el.appContainer) {
      el.appContainer.style.display = 'none';
    }

    if (el.tabLogin && el.tabSetup) {
      el.tabLogin.classList.add('active');
      el.tabSetup.classList.remove('active');
    }

    el.unlockPassword.value = '';
    el.unlockError.style.display = 'none';
    setTimeout(() => el.unlockPassword.focus(), 100);
  }

  function showSetupScreen() {
    el.lockScreen.style.display = 'flex';
    el.unlockSection.style.display = 'none';
    el.setupSection.style.display = 'block';

    if (el.appContainer) {
      el.appContainer.style.display = 'none';
    }

    if (el.tabLogin && el.tabSetup) {
      el.tabSetup.classList.add('active');
      el.tabLogin.classList.remove('active');
    }

    el.setupPassword.value = '';
    el.setupPasswordConfirm.value = '';
    el.setupError.style.display = 'none';
    setTimeout(() => el.setupPassword.focus(), 100);
  }

  function unlockSuccess(data) {
    el.lockScreen.style.display = 'none';
    if (el.appContainer) {
      el.appContainer.style.display = 'block';
    }
    state.events = data.events || [];
    state.profile = data.profile || state.profile;
    state.currentYear = state.profile.defaultYear || 2026;
    el.appProfileTitle.textContent = state.profile.name || "Doctor's Planner";
    el.currentYearDisplay.textContent = state.currentYear;

    refreshAllData();
    showToast('🔓 Vault decrypted successfully!');
  }

  // ---------------------------------------------------------
  // DATA MANAGEMENT & CONFLICTS
  // ---------------------------------------------------------
  function recalculateConflicts() {
    state.conflictsMap = ConflictDetector.findAllConflicts(state.events);

    // Update conflict badge in header
    let totalConflicts = 0;
    // Map stores conflicts for both events in pair; distinct pairs count is total entries / 2
    for (const [_, list] of state.conflictsMap.entries()) {
      totalConflicts += list.length;
    }
    const distinctPairs = Math.floor(totalConflicts / 2);

    if (distinctPairs > 0) {
      el.btnConflictBadge.className = 'conflict-badge-btn has-conflicts';
      el.conflictBadgeIcon.textContent = '⚠️';
      el.conflictBadgeText.textContent = `${distinctPairs} Conflict${distinctPairs > 1 ? 's' : ''}`;
    } else {
      el.btnConflictBadge.className = 'conflict-badge-btn no-conflicts';
      el.conflictBadgeIcon.textContent = '✓';
      el.conflictBadgeText.textContent = '0 Conflicts';
    }
  }

  async function persistChanges() {
    recalculateConflicts();
    const payload = {
      profile: state.profile,
      events: state.events
    };
    await PlannerStorage.saveVault(payload);
  }

  function refreshAllData() {
    recalculateConflicts();
    renderCurrentView();
  }

  // ---------------------------------------------------------
  // FILTERING LOGIC
  // ---------------------------------------------------------
  function getFilteredEvents() {
    const q = state.activeFilter.search.toLowerCase().trim();
    const cat = state.activeFilter.category;
    const pri = state.activeFilter.priority;
    const st = state.activeFilter.status;

    return state.events.filter(item => {
      // Search (title, taskName, location, notes, and all categories)
      if (q) {
        const catStr = Array.isArray(item.categories) ? item.categories.join(' ') : (item.category || '');
        const text = `${item.title} ${item.taskName || ''} ${item.location || ''} ${item.notes || ''} ${catStr}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // Category (supports multi-category array or legacy singular category)
      if (cat) {
        const itemCats = Array.isArray(item.categories) && item.categories.length > 0
          ? item.categories
          : (item.category ? [item.category] : []);
        if (!itemCats.includes(cat)) return false;
      }

      // Priority Filter (high, medium, low)
      if (pri) {
        const itemPri = (item.priority || 'medium').toLowerCase();
        if (itemPri !== pri.toLowerCase()) return false;
      }

      // Status
      if (st) {
        if (st === 'conflicts') {
          if (!state.conflictsMap.has(item.id)) return false;
        } else if (item.status !== st) {
          return false;
        }
      }
      return true;
    });
  }

  function updateFilteredCount(count, total) {
    if (count === total) {
      el.filteredCountText.textContent = `Showing all ${total} entries`;
    } else {
      el.filteredCountText.textContent = `Filtered ${count} of ${total} entries`;
    }
  }

  // ---------------------------------------------------------
  // RENDER VIEW 1: 12-MONTH NOTEBOOK GRID
  // (Displays all 12 months with density options & Day Names)
  // ---------------------------------------------------------
  function renderDiaryView() {
    el.viewDiary.innerHTML = '';
    const layout = state.diaryLayout || '4col';
    el.viewDiary.className = `diary-grid layout-${layout}`;

    if (el.btnLayout4Col && el.btnLayout2Col) {
      el.btnLayout4Col.className = `pill-btn ${layout === '4col' ? 'active' : ''}`;
      el.btnLayout2Col.className = `pill-btn ${layout === '2col' ? 'active' : ''}`;
    }

    const filtered = getFilteredEvents();
    updateFilteredCount(filtered.length, state.events.length);

    // Update Month Quick-Jump Strip buttons
    const jumpBtns = el.monthJumpStrip ? el.monthJumpStrip.querySelectorAll('.jump-month-btn') : [];

    for (let monthIdx = 0; monthIdx < 12; monthIdx++) {
      const monthNumberStr = String(monthIdx + 1).padStart(2, '0');
      const monthPrefix = `${state.currentYear}-${monthNumberStr}`;
      const monthName = MONTH_NAMES[monthIdx];

      // Get events falling in this month
      const monthEvents = filtered.filter(ev => {
        const s = ev.startDate;
        const e = ev.endDate || ev.startDate;
        // Event starts in this month or spans across this month
        return (s.startsWith(monthPrefix) || (s <= `${monthPrefix}-31` && e >= `${monthPrefix}-01`));
      });

      // Count conflicts in this month
      const monthConflictsCount = monthEvents.filter(ev => state.conflictsMap.has(ev.id)).length;

      // Update Jump button
      if (jumpBtns[monthIdx]) {
        const btn = jumpBtns[monthIdx];
        if (monthConflictsCount > 0) {
          btn.classList.add('has-conflicts');
          btn.innerHTML = `🚨 ${monthName.slice(0, 3)} (${monthConflictsCount})`;
          btn.title = `${monthName}: ${monthConflictsCount} active schedule conflict(s)!`;
        } else {
          btn.classList.remove('has-conflicts');
          btn.textContent = monthName.slice(0, 3);
          btn.title = `${monthName}: ${monthEvents.length} event(s)`;
        }
      }

      // Sort by startDate
      monthEvents.sort((a, b) => a.startDate.localeCompare(b.startDate));

      // Build Month Card
      const card = document.createElement('div');
      card.className = 'month-notebook-card';
      card.id = `month-card-${monthIdx}`;

      // Conflict warning badge in header if month has clashes
      const conflictHeaderPill = monthConflictsCount > 0
        ? `<span class="month-conflict-pill" title="${monthConflictsCount} conflict(s) in this month">🚨 ${monthConflictsCount} Conflict${monthConflictsCount > 1 ? 's' : ''}</span>`
        : '';

      // Header
      const header = document.createElement('div');
      header.className = 'month-card-header';
      header.innerHTML = `
        <div class="month-card-title">
          <span>${monthName}</span>
          <span class="month-card-count">${monthEvents.length}</span>
          ${conflictHeaderPill}
        </div>
        <button class="btn btn-secondary btn-quick-add" data-month="${monthIdx}" style="padding: 0.2rem 0.6rem; font-size: 0.78rem;">
          + Add
        </button>
      `;

      // Body
      const body = document.createElement('div');
      body.className = 'month-card-body';

      if (monthEvents.length === 0) {
        body.innerHTML = `<div class="empty-month-placeholder">No scheduled events for ${monthName}</div>`;
      } else {
        monthEvents.forEach(ev => {
          const itemEl = createDiaryEventElement(ev);
          body.appendChild(itemEl);
        });
      }

      card.appendChild(header);
      card.appendChild(body);
      el.viewDiary.appendChild(card);
    }
  }

  function getPriorityBadgeHtml(priority) {
    const p = (priority || 'medium').toLowerCase();
    if (p === 'high') {
      return `<span class="priority-flag-pill flag-high" title="High Priority (Red Flag)">🚩 High</span>`;
    } else if (p === 'medium') {
      return `<span class="priority-flag-pill flag-medium" title="Medium Priority (Yellow Flag)">🚩 Medium</span>`;
    } else if (p === 'low') {
      return `<span class="priority-flag-pill flag-low" title="Low Priority (Green Flag)">🚩 Low</span>`;
    }
    return '';
  }

  function createDiaryEventElement(ev) {
    const item = document.createElement('div');
    const hasConflict = state.conflictsMap.has(ev.id);
    const isCancelled = ev.status === 'cancelled';
    const isHoliday = (ev.category === 'Holiday' || (Array.isArray(ev.categories) && ev.categories.includes('Holiday')));

    item.className = `diary-event-item ${hasConflict ? 'has-conflict' : ''} ${isCancelled ? 'is-cancelled' : ''} ${isHoliday ? 'is-holiday' : ''}`;
    item.dataset.id = ev.id;

    // Format Date Range badge WITH Day of the Week! (e.g. "Tue • 26 Jan 2027" or "Mon–Wed • 09–11 Feb 2026")
    const dateBadgeText = ConflictDetector.formatDateRangeWithDays(ev.startDate, ev.endDate);

    // Format Time badge
    let timeHtml = '';
    if (!ev.isAllDay && ev.startTime) {
      const timeStr = `${ConflictDetector.formatMinutes(timeToMinutes(ev.startTime))}${ev.endTime ? ' - ' + ConflictDetector.formatMinutes(timeToMinutes(ev.endTime)) : ''}`;
      timeHtml = `<span class="event-time-badge">⏰ ${timeStr}</span>`;
    }

    // Priority Flag Pill
    const priorityHtml = getPriorityBadgeHtml(ev.priority);

    // Conflict pill
    let conflictHtml = '';
    let persistentConflictHtml = '';

    if (hasConflict) {
      const conflicts = state.conflictsMap.get(ev.id) || [];
      conflictHtml = `<span class="conflict-warning-tag" style="background-color: #fee2e2; color: #dc2626;" title="${escapeHtml(conflicts[0].message)}">🚨 CONFLICT</span>`;

      // Persistent RED warning that is ALWAYS visible right on the card after entry!
      const clashItems = conflicts.map(c => `
        <div style="margin-top: 0.2rem;">
          • <strong>Overlaps with:</strong> ${escapeHtml(c.peer.title)} (${ConflictDetector.formatDateRangeWithDays(c.peer.startDate, c.peer.endDate)})${!c.peer.isAllDay && c.peer.startTime ? ' @ ' + ConflictDetector.formatMinutes(timeToMinutes(c.peer.startTime)) : ''}
          <div style="font-size: 0.72rem; color: #b91c1c; margin-left: 0.7rem;">↳ ${escapeHtml(c.message)}</div>
        </div>
      `).join('');

      persistentConflictHtml = `
        <div class="persistent-conflict-badge">
          <span style="font-size: 1rem; line-height: 1;">🚨</span>
          <div style="flex-grow: 1;">
            <div style="color: #991b1b; font-weight: 800; font-size: 0.74rem; letter-spacing: 0.02em;">ACTIVE SCHEDULE CONFLICT:</div>
            ${clashItems}
          </div>
        </div>
      `;
    }

    // Status symbol
    let statusSymbol = '';
    if (ev.status === 'confirmed') statusSymbol = '<span style="color: var(--success); font-weight: bold;">✓</span>';
    else if (ev.status === 'tentative') statusSymbol = '<span style="color: var(--warning); font-weight: bold;">?</span>';
    else if (ev.status === 'cancelled') statusSymbol = '<span style="color: var(--danger); font-weight: bold;">✕</span>';

    const titlePrefix = isHoliday ? '🏛️ ' : '';

    // Task Name Pill
    const taskNameHtml = ev.taskName
      ? `<div class="event-task-name">📋 <span>${escapeHtml(ev.taskName)}</span></div>`
      : '';

    // Multi-Select Category Badges
    const categories = Array.isArray(ev.categories) && ev.categories.length > 0
      ? ev.categories
      : (ev.category ? [ev.category] : ['Others']);

    const catPillsHtml = categories.map(cat => `
      <span class="category-pill ${getCategoryClass(cat)}">${escapeHtml(cat)}</span>
    `).join('');

    item.innerHTML = `
      <div class="event-main-col">
        <div class="event-date-row">
          <span class="event-date-badge">${escapeHtml(dateBadgeText)}</span>
          ${timeHtml}
          ${conflictHtml}
          ${statusSymbol}
        </div>
        <div class="event-title-text">${titlePrefix}${escapeHtml(ev.title)}</div>
        ${taskNameHtml}
        ${ev.notes ? `<div class="event-notes-subtext">${escapeHtml(ev.notes)}</div>` : ''}
        ${ev.location ? `<div class="event-notes-subtext" style="color: var(--text-light);">📍 ${escapeHtml(ev.location)}</div>` : ''}
        ${persistentConflictHtml}
      </div>
      <div class="event-side-badges">
        ${priorityHtml}
        ${catPillsHtml}
      </div>
    `;

    item.addEventListener('click', () => openEditEventModal(ev.id));
    return item;
  }

  function formatDateRangeShort(sStr, eStr) {
    if (!sStr) return '';
    const sParts = sStr.split('-');
    const sDay = parseInt(sParts[2], 10);
    const sMonth = MONTH_NAMES[parseInt(sParts[1], 10) - 1].slice(0, 3);

    if (!eStr || sStr === eStr) {
      return `${sDay} ${sMonth}`;
    }

    const eParts = eStr.split('-');
    const eDay = parseInt(eParts[2], 10);
    const eMonth = MONTH_NAMES[parseInt(eParts[1], 10) - 1].slice(0, 3);

    if (sMonth === eMonth) {
      return `${sDay}–${eDay} ${sMonth}`;
    } else {
      return `${sDay} ${sMonth}–${eDay} ${eMonth}`;
    }
  }

  function getCategoryClass(cat) {
    if (!cat) return 'cat-others';
    const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `cat-${slug}`;
  }

  function timeToMinutes(tStr) {
    if (!tStr) return null;
    const [h, m] = tStr.split(':').map(Number);
    return h * 60 + (m || 0);
  }

  // ---------------------------------------------------------
  // RENDER VIEW 2: MONTHLY CALENDAR GRID
  // ---------------------------------------------------------
  function renderCalendarView() {
    el.calendarDaysContainer.innerHTML = '';
    const m = state.calendarMonth;
    const y = state.currentYear;
    el.calendarMonthTitle.textContent = `${MONTH_NAMES[m]} ${y}`;

    const firstDay = new Date(y, m, 1).getDay(); // 0 is Sun
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrevMonth = new Date(y, m, 0).getDate();

    const today = new Date();
    const isCurrentMonthYear = today.getFullYear() === y && today.getMonth() === m;
    const todayDate = today.getDate();

    // Previous month filler days
    for (let i = firstDay - 1; i >= 0; i--) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.innerHTML = `<span class="day-number">${daysInPrevMonth - i}</span>`;
      el.calendarDaysContainer.appendChild(cell);
    }

    // Days of the month
    const filtered = getFilteredEvents();

    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      const isToday = isCurrentMonthYear && d === todayDate;
      cell.className = `calendar-day-cell ${isToday ? 'is-today' : ''}`;

      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

      // Find events spanning this date
      const daysEvents = filtered.filter(ev => {
        const s = ev.startDate;
        const e = ev.endDate || ev.startDate;
        return dateStr >= s && dateStr <= e;
      });

      let chipsHtml = '';
      daysEvents.forEach(ev => {
        const hasConflict = state.conflictsMap.has(ev.id);
        const priFlag = ev.priority === 'high' ? '🚩 ' : (ev.priority === 'low' ? '🟢 ' : '');
        const tooltip = `${ev.title}${ev.taskName ? ' (' + ev.taskName + ')' : ''}`;
        chipsHtml += `
          <div class="calendar-event-chip ${hasConflict ? 'has-conflict' : ''}" data-id="${ev.id}" title="${escapeHtml(tooltip)}">
            ${hasConflict ? '⚠️ ' : priFlag}${escapeHtml(ev.title)}
          </div>
        `;
      });

      cell.innerHTML = `
        <div class="day-header-row">
          <span class="day-number">${d}</span>
          ${daysEvents.length > 0 ? `<span style="font-size: 0.65rem; color: var(--text-light);">${daysEvents.length}</span>` : ''}
        </div>
        ${chipsHtml}
      `;

      // Click cell to add event on this date
      cell.addEventListener('click', (e) => {
        const chip = e.target.closest('.calendar-event-chip');
        if (chip) {
          openEditEventModal(chip.dataset.id);
        } else {
          openNewEventModal(dateStr);
        }
      });

      el.calendarDaysContainer.appendChild(cell);
    }

    // Next month filler to round to complete weeks (multiple of 7)
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell other-month';
      cell.innerHTML = `<span class="day-number">${i}</span>`;
      el.calendarDaysContainer.appendChild(cell);
    }
  }

  // ---------------------------------------------------------
  // RENDER VIEW 3: AGENDA / TIMELINE
  // ---------------------------------------------------------
  function renderAgendaView() {
    el.viewAgenda.innerHTML = '';
    const filtered = getFilteredEvents();
    updateFilteredCount(filtered.length, state.events.length);

    if (filtered.length === 0) {
      el.viewAgenda.innerHTML = `
        <div class="agenda-month-group" style="text-align: center; color: var(--text-muted); padding: 3rem;">
          No events match the current search or filters.
        </div>
      `;
      return;
    }

    // Sort by start date
    filtered.sort((a, b) => a.startDate.localeCompare(b.startDate));

    // Group by Month
    const groups = new Map();
    filtered.forEach(ev => {
      const monthKey = ev.startDate.slice(0, 7); // YYYY-MM
      if (!groups.has(monthKey)) groups.set(monthKey, []);
      groups.get(monthKey).push(ev);
    });

    for (const [mKey, evList] of groups.entries()) {
      const [year, month] = mKey.split('-');
      const monthName = MONTH_NAMES[parseInt(month, 10) - 1];

      const groupEl = document.createElement('div');
      groupEl.className = 'agenda-month-group';

      const title = document.createElement('div');
      title.className = 'agenda-month-heading';
      title.textContent = `${monthName} ${year} (${evList.length} events)`;

      const listEl = document.createElement('div');
      listEl.className = 'agenda-list';

      evList.forEach(ev => {
        const itemEl = createDiaryEventElement(ev);
        listEl.appendChild(itemEl);
      });

      groupEl.appendChild(title);
      groupEl.appendChild(listEl);
      el.viewAgenda.appendChild(groupEl);
    }
  }

  function renderCurrentView() {
    el.viewDiary.style.display = state.currentView === 'diary' ? 'grid' : 'none';
    el.viewCalendar.style.display = state.currentView === 'calendar' ? 'block' : 'none';
    el.viewAgenda.style.display = state.currentView === 'agenda' ? 'flex' : 'none';

    el.navBtnDiary.className = `pill-btn ${state.currentView === 'diary' ? 'active' : ''}`;
    el.navBtnCalendar.className = `pill-btn ${state.currentView === 'calendar' ? 'active' : ''}`;
    el.navBtnAgenda.className = `pill-btn ${state.currentView === 'agenda' ? 'active' : ''}`;

    if (state.currentView === 'diary') renderDiaryView();
    else if (state.currentView === 'calendar') renderCalendarView();
    else if (state.currentView === 'agenda') renderAgendaView();
  }

  // ---------------------------------------------------------
  // CATEGORY & PRIORITY CONTROLS IN MODAL
  // ---------------------------------------------------------
  function renderCategoryChips(selectedList = []) {
    currentSelectedCategories = Array.isArray(selectedList) ? [...selectedList] : (selectedList ? [selectedList] : []);
    if (!el.categoryChipsGrid) return;
    el.categoryChipsGrid.innerHTML = '';

    PLANNER_CATEGORIES.forEach(cat => {
      const isSelected = currentSelectedCategories.includes(cat);
      const chip = document.createElement('div');
      chip.className = `category-chip ${isSelected ? 'selected' : ''}`;
      chip.dataset.category = cat;
      chip.innerHTML = `${isSelected ? '✓ ' : ''}${escapeHtml(cat)}`;
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCategorySelection(cat);
      });
      el.categoryChipsGrid.appendChild(chip);
    });
    updateSelectedCategoriesCount();
  }

  function toggleCategorySelection(cat) {
    const idx = currentSelectedCategories.indexOf(cat);
    if (idx >= 0) {
      currentSelectedCategories.splice(idx, 1);
    } else {
      currentSelectedCategories.push(cat);
    }
    const chips = el.categoryChipsGrid.querySelectorAll('.category-chip');
    chips.forEach(c => {
      const cCat = c.dataset.category;
      const isSel = currentSelectedCategories.includes(cCat);
      c.className = `category-chip ${isSel ? 'selected' : ''}`;
      c.innerHTML = `${isSel ? '✓ ' : ''}${escapeHtml(cCat)}`;
    });
    updateSelectedCategoriesCount();
  }

  function updateSelectedCategoriesCount() {
    if (!el.selectedCategoriesCount) return;
    const count = currentSelectedCategories.length;
    el.selectedCategoriesCount.textContent = count === 1 ? '1 selected' : `${count} selected`;
  }

  function setSelectedPriority(priority = 'medium') {
    const p = (priority || 'medium').toLowerCase();
    const radios = document.querySelectorAll('input[name="event-priority"]');
    radios.forEach(r => {
      const isMatch = r.value === p;
      r.checked = isMatch;
      const label = r.closest('.priority-choice');
      if (label) {
        if (isMatch) label.classList.add('active');
        else label.classList.remove('active');
      }
    });
  }

  function getSelectedPriority() {
    const checked = document.querySelector('input[name="event-priority"]:checked');
    return checked ? checked.value : 'medium';
  }

  // ---------------------------------------------------------
  // MODAL: ADD / EDIT SCHEDULE & LIVE CONFLICT CHECKING
  // ---------------------------------------------------------
  function openNewEventModal(defaultDate = null) {
    state.editingEventId = null;
    el.modalEventTitle.textContent = 'Add Schedule Entry';
    el.btnDeleteEvent.style.display = 'none';
    el.formEvent.reset();

    if (el.eventTaskName) el.eventTaskName.value = '';
    setSelectedPriority('medium');
    renderCategoryChips(['Academic']);

    const dateToUse = defaultDate || `${state.currentYear}-01-01`;
    el.eventStartDate.value = dateToUse;
    el.eventEndDate.value = dateToUse;
    el.eventAllday.checked = true;
    el.eventTimesRow.style.display = 'none';

    checkModalConflictsLive();
    el.modalEvent.classList.add('active');
    setTimeout(() => el.eventTitle.focus(), 100);
  }

  function openEditEventModal(id) {
    const ev = state.events.find(item => item.id === id);
    if (!ev) return;

    state.editingEventId = id;
    el.modalEventTitle.textContent = 'Edit Schedule Entry';
    el.btnDeleteEvent.style.display = 'inline-flex';

    el.eventId.value = ev.id;
    el.eventTitle.value = ev.title;
    if (el.eventTaskName) el.eventTaskName.value = ev.taskName || '';
    setSelectedPriority(ev.priority || 'medium');

    const cats = Array.isArray(ev.categories) && ev.categories.length > 0
      ? ev.categories
      : (ev.category ? [ev.category] : ['Official commitment']);
    renderCategoryChips(cats);

    el.eventStatus.value = ev.status || 'confirmed';
    el.eventStartDate.value = ev.startDate;
    el.eventEndDate.value = ev.endDate || ev.startDate;
    el.eventAllday.checked = !!ev.isAllDay;
    el.eventTimesRow.style.display = ev.isAllDay ? 'none' : 'grid';
    el.eventStartTime.value = ev.startTime || '09:00';
    el.eventEndTime.value = ev.endTime || '17:00';
    el.eventLocation.value = ev.location || '';
    el.eventNotes.value = ev.notes || '';

    checkModalConflictsLive();
    el.modalEvent.classList.add('active');
  }

  function closeEventModal() {
    el.modalEvent.classList.remove('active');
    state.editingEventId = null;
  }

  /**
   * Run real-time conflict checking while user is typing in modal
   * Updates live Day Names and displays prominent RED warning
   */
  function checkModalConflictsLive() {
    // Update live Day of Week indicator under the date fields
    if (el.eventStartDayName) {
      const sDay = ConflictDetector.getDayOfWeek(el.eventStartDate.value, false);
      el.eventStartDayName.textContent = sDay ? `🗓️ ${sDay}` : '';
    }

    if (el.eventEndDayName) {
      const eDateVal = el.eventEndDate.value || el.eventStartDate.value;
      const eDay = ConflictDetector.getDayOfWeek(eDateVal, false);
      el.eventEndDayName.textContent = eDay ? `🗓️ ${eDay}` : '';
    }

    const candidate = {
      id: state.editingEventId,
      title: el.eventTitle.value.trim() || 'This Event',
      startDate: el.eventStartDate.value,
      endDate: el.eventEndDate.value || el.eventStartDate.value,
      isAllDay: el.eventAllday.checked,
      startTime: el.eventStartTime.value,
      endTime: el.eventEndTime.value,
      status: el.eventStatus.value
    };

    if (!candidate.startDate || candidate.status === 'cancelled') {
      el.modalConflictBanner.style.display = 'none';
      return;
    }

    const conflicts = ConflictDetector.findConflictsForCandidate(candidate, state.events, state.editingEventId);

    if (conflicts.length > 0) {
      el.modalConflictList.innerHTML = conflicts.map(c => `
        <li style="margin-bottom: 0.45rem; color: #991b1b; font-size: 0.86rem; line-height: 1.4;">
          🚨 <strong>CLASH DETECTED:</strong> Overlaps with <strong>"${escapeHtml(c.peer.title)}"</strong> on ${ConflictDetector.formatDateRangeWithDays(c.peer.startDate, c.peer.endDate)}${!c.peer.isAllDay && c.peer.startTime ? ' at ' + ConflictDetector.formatMinutes(timeToMinutes(c.peer.startTime)) : ''}
          <div style="font-size: 0.76rem; color: #b91c1c; margin-left: 1.25rem;">↳ ${escapeHtml(c.message)}</div>
        </li>
      `).join('');
      el.modalConflictBanner.style.display = 'flex';
    } else {
      el.modalConflictBanner.style.display = 'none';
    }
  }

  // ---------------------------------------------------------
  // CONFLICT CENTER MODAL
  // ---------------------------------------------------------
  function openConflictCenterModal() {
    el.conflictModalList.innerHTML = '';

    if (state.conflictsMap.size === 0) {
      el.conflictModalList.innerHTML = `
        <div style="text-align: center; color: var(--success); padding: 2rem; font-weight: 600;">
          ✓ No conflicts detected in your schedule. All dates and times are clear!
        </div>
      `;
    } else {
      // Collect unique pairs
      const visitedPairs = new Set();

      for (const [evId, conflicts] of state.conflictsMap.entries()) {
        const evA = state.events.find(e => e.id === evId);
        if (!evA) continue;

        conflicts.forEach(c => {
          const evB = c.peer;
          const pairKey = [evA.id, evB.id].sort().join(':::');
          if (visitedPairs.has(pairKey)) return;
          visitedPairs.add(pairKey);

          const card = document.createElement('div');
          card.style.cssText = `
            border: 1px solid var(--border-color);
            background: var(--bg-card);
            border-left: 4px solid var(--danger);
            padding: 0.9rem;
            border-radius: var(--radius-md);
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
          `;

          card.innerHTML = `
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--danger);">
              ⚠️ ${escapeHtml(c.message)}
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: var(--bg-subtle); padding: 0.6rem; border-radius: var(--radius-sm);">
              <div>
                <div style="font-weight: 700; font-size: 0.88rem;">${escapeHtml(evA.title)}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${formatDateRangeShort(evA.startDate, evA.endDate)}</div>
                <button class="btn btn-secondary btn-edit-conflict-ev" data-id="${evA.id}" style="margin-top: 0.4rem; padding: 0.2rem 0.5rem; font-size: 0.75rem;">Edit This Duty</button>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.88rem;">${escapeHtml(evB.title)}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${formatDateRangeShort(evB.startDate, evB.endDate)}</div>
                <button class="btn btn-secondary btn-edit-conflict-ev" data-id="${evB.id}" style="margin-top: 0.4rem; padding: 0.2rem 0.5rem; font-size: 0.75rem;">Edit This Duty</button>
              </div>
            </div>
          `;

          el.conflictModalList.appendChild(card);
        });
      }

      // Attach edit handlers
      el.conflictModalList.querySelectorAll('.btn-edit-conflict-ev').forEach(btn => {
        btn.addEventListener('click', (e) => {
          el.modalConflicts.classList.remove('active');
          openEditEventModal(e.target.dataset.id);
        });
      });
    }

    el.modalConflicts.classList.add('active');
  }

  // ---------------------------------------------------------
  // EVENT LISTENERS SETUP
  // ---------------------------------------------------------
  function setupEventListeners() {
    // Mode Switcher Tabs (Log In vs Set New Password / Reset)
    if (el.tabLogin) {
      el.tabLogin.addEventListener('click', () => showUnlockScreen());
    }
    if (el.tabSetup) {
      el.tabSetup.addEventListener('click', () => showSetupScreen());
    }

    // Password Show/Hide Toggles (Eliminates typos!)
    function bindPasswordEye(btnId, inputId) {
      const btn = document.getElementById(btnId);
      const input = document.getElementById(inputId);
      if (!btn || !input) return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        btn.textContent = isPwd ? '🙈' : '👁️';
      });
    }

    bindPasswordEye('btn-toggle-unlock-pwd', 'unlock-password');
    bindPasswordEye('btn-toggle-setup-pwd', 'setup-password');
    bindPasswordEye('btn-toggle-confirm-pwd', 'setup-password-confirm');

    // Unlock Form Submit (Log In)
    el.formUnlock.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwd = el.unlockPassword.value;
      el.unlockError.style.display = 'none';

      try {
        const data = await PlannerStorage.unlockVault(pwd);
        unlockSuccess(data);
      } catch (err) {
        el.unlockError.textContent = '✕ Incorrect password. Please check for typos (click 👁️ to verify), or switch to "Set Passcode / Reset" above.';
        el.unlockError.style.display = 'block';
        el.unlockPassword.select();
      }
    });

    // Setup / Reset Form Submit
    el.formSetup.addEventListener('submit', async (e) => {
      e.preventDefault();
      const p1 = el.setupPassword.value;
      const p2 = el.setupPasswordConfirm.value;
      el.setupError.style.display = 'none';

      if (p1 !== p2) {
        el.setupError.textContent = 'Passwords do not match. Please verify both fields.';
        el.setupError.style.display = 'block';
        return;
      }
      if (p1.length < 6) {
        el.setupError.textContent = 'Password must be at least 6 characters long.';
        el.setupError.style.display = 'block';
        return;
      }

      let initialData = {
        profile: {
          name: "Dr. Arkaprabha Sau",
          title: "Monthly Schedule & Duties",
          defaultYear: 2026
        },
        events: []
      };

      if (!el.setupIncludeSample || el.setupIncludeSample.checked) {
        initialData = JSON.parse(JSON.stringify(window.SAMPLE_PLANNER_DATA));
      }

      try {
        const data = await PlannerStorage.initVault(p1, initialData);
        unlockSuccess(data);
        showToast('✓ Password configured & Planner ready!');
      } catch (err) {
        el.setupError.textContent = err.message;
        el.setupError.style.display = 'block';
      }
    });

    // Import Backups
    const triggerImport = () => el.importFileInput.click();
    el.btnShowImportBackup.addEventListener('click', triggerImport);
    el.btnSetupImportLink.addEventListener('click', triggerImport);
    el.btnImportBackupSettings.addEventListener('click', triggerImport);

    el.importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          PlannerStorage.importEncryptedBackup(event.target.result);
          showToast('Backup imported! Please enter your master password.');
          showUnlockScreen();
        } catch (err) {
          alert('Failed to import backup: ' + err.message);
        }
      };
      reader.readAsText(file);
      el.importFileInput.value = '';
    });

    // Lock Button
    el.btnLockNow.addEventListener('click', () => {
      PlannerStorage.lockVault();
      showUnlockScreen();
      showToast('🔒 Planner locked. Sensitive data cleared from memory.');
    });

    // Navigation View Switchers
    el.navBtnDiary.addEventListener('click', () => {
      state.currentView = 'diary';
      renderCurrentView();
    });
    el.navBtnCalendar.addEventListener('click', () => {
      state.currentView = 'calendar';
      renderCurrentView();
    });
    el.navBtnAgenda.addEventListener('click', () => {
      state.currentView = 'agenda';
      renderCurrentView();
    });

    // Year Navigation
    el.btnYearPrev.addEventListener('click', () => {
      state.currentYear--;
      el.currentYearDisplay.textContent = state.currentYear;
      renderCurrentView();
    });
    el.btnYearNext.addEventListener('click', () => {
      state.currentYear++;
      el.currentYearDisplay.textContent = state.currentYear;
      renderCurrentView();
    });

    // Calendar Navigation
    el.calPrevMonth.addEventListener('click', () => {
      if (state.calendarMonth === 0) {
        state.calendarMonth = 11;
        state.currentYear--;
        el.currentYearDisplay.textContent = state.currentYear;
      } else {
        state.calendarMonth--;
      }
      renderCalendarView();
    });
    el.calNextMonth.addEventListener('click', () => {
      if (state.calendarMonth === 11) {
        state.calendarMonth = 0;
        state.currentYear++;
        el.currentYearDisplay.textContent = state.currentYear;
      } else {
        state.calendarMonth++;
      }
      renderCalendarView();
    });
    el.calTodayBtn.addEventListener('click', () => {
      const now = new Date();
      state.currentYear = now.getFullYear();
      state.calendarMonth = now.getMonth();
      el.currentYearDisplay.textContent = state.currentYear;
      renderCalendarView();
    });

    // Conflict Badge Button
    el.btnConflictBadge.addEventListener('click', openConflictCenterModal);
    el.btnCloseConflictModal.addEventListener('click', () => el.modalConflicts.classList.remove('active'));
    el.btnDismissConflictModal.addEventListener('click', () => el.modalConflicts.classList.remove('active'));

    // Search & Filter Listeners
    el.filterSearchInput.addEventListener('input', (e) => {
      state.activeFilter.search = e.target.value;
      renderCurrentView();
    });
    el.filterCategorySelect.addEventListener('change', (e) => {
      state.activeFilter.category = e.target.value;
      renderCurrentView();
    });
    if (el.filterPrioritySelect) {
      el.filterPrioritySelect.addEventListener('change', (e) => {
        state.activeFilter.priority = e.target.value;
        renderCurrentView();
      });
    }
    el.filterStatusSelect.addEventListener('change', (e) => {
      state.activeFilter.status = e.target.value;
      renderCurrentView();
    });

    // Priority Segmented Control Clicks in Modal
    document.querySelectorAll('.priority-choice').forEach(choice => {
      choice.addEventListener('click', () => {
        const radio = choice.querySelector('input[type="radio"]');
        if (radio) {
          setSelectedPriority(radio.value);
        }
      });
    });

    // Print
    el.btnPrint.addEventListener('click', () => {
      window.print();
    });

    // Add Event Buttons
    el.btnAddEventTop.addEventListener('click', () => openNewEventModal());
    el.viewDiary.addEventListener('click', (e) => {
      const quickAddBtn = e.target.closest('.btn-quick-add');
      if (quickAddBtn) {
        const mIdx = parseInt(quickAddBtn.dataset.month, 10);
        const mStr = String(mIdx + 1).padStart(2, '0');
        openNewEventModal(`${state.currentYear}-${mStr}-01`);
      }
    });

    // Event Modal Controls
    el.btnCloseEventModal.addEventListener('click', closeEventModal);
    el.btnCancelEvent.addEventListener('click', closeEventModal);

    // All-day checkbox toggles time inputs
    el.eventAllday.addEventListener('change', (e) => {
      el.eventTimesRow.style.display = e.target.checked ? 'none' : 'grid';
      checkModalConflictsLive();
    });

    // Layout Switcher (See all 12 months at once vs 2-col notebook)
    if (el.btnLayout4Col) {
      el.btnLayout4Col.addEventListener('click', () => {
        state.diaryLayout = '4col';
        localStorage.setItem('planner_diary_layout', '4col');
        renderDiaryView();
      });
    }
    if (el.btnLayout2Col) {
      el.btnLayout2Col.addEventListener('click', () => {
        state.diaryLayout = '2col';
        localStorage.setItem('planner_diary_layout', '2col');
        renderDiaryView();
      });
    }

    // Month Quick-Jump Strip Click (Smooth jump to any of the 12 months)
    if (el.monthJumpStrip) {
      el.monthJumpStrip.addEventListener('click', (e) => {
        const btn = e.target.closest('.jump-month-btn');
        if (btn && btn.dataset.month !== undefined) {
          const mIdx = parseInt(btn.dataset.month, 10);
          const targetCard = document.getElementById(`month-card-${mIdx}`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.style.outline = '3px solid var(--primary)';
            setTimeout(() => { targetCard.style.outline = ''; }, 1200);
          }
        }
      });
    }

    // Live conflict listeners on inputs (both change and input for instant reactivity)
    [el.eventStartDate, el.eventEndDate, el.eventStartTime, el.eventEndTime, el.eventStatus].forEach(input => {
      ['change', 'input'].forEach(evt => {
        input.addEventListener(evt, () => {
          // Automatically set endDate to startDate if endDate < startDate
          if (input === el.eventStartDate && el.eventEndDate.value < el.eventStartDate.value) {
            el.eventEndDate.value = el.eventStartDate.value;
          }
          checkModalConflictsLive();
        });
      });
    });

    // Form Event Submit (Add / Edit)
    el.formEvent.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = el.eventTitle.value.trim();
      const taskName = el.eventTaskName ? el.eventTaskName.value.trim() : '';
      const priority = getSelectedPriority();
      const categories = currentSelectedCategories.length > 0 ? [...currentSelectedCategories] : ['Others'];
      const category = categories[0];
      const status = el.eventStatus.value;
      const startDate = el.eventStartDate.value;
      let endDate = el.eventEndDate.value || startDate;
      if (endDate < startDate) endDate = startDate;

      const isAllDay = el.eventAllday.checked;
      const startTime = isAllDay ? null : el.eventStartTime.value;
      const endTime = isAllDay ? null : el.eventEndTime.value;
      const location = el.eventLocation.value.trim();
      const notes = el.eventNotes.value.trim();

      if (state.editingEventId) {
        // Edit existing
        const index = state.events.findIndex(item => item.id === state.editingEventId);
        if (index !== -1) {
          state.events[index] = {
            ...state.events[index],
            title, taskName, priority, categories, category, status, startDate, endDate, isAllDay, startTime, endTime, location, notes,
            updatedAt: new Date().toISOString()
          };
        }
        showToast('Schedule entry updated.');
      } else {
        // Add new
        const newEvent = {
          id: 'ev-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          title, taskName, priority, categories, category, status, startDate, endDate, isAllDay, startTime, endTime, location, notes,
          createdAt: new Date().toISOString()
        };
        state.events.push(newEvent);
        showToast('New schedule entry saved.');
      }

      await persistChanges();
      closeEventModal();
      refreshAllData();
    });

    // Delete Event
    el.btnDeleteEvent.addEventListener('click', async () => {
      if (!state.editingEventId) return;
      if (confirm('Are you sure you want to delete this schedule entry?')) {
        state.events = state.events.filter(e => e.id !== state.editingEventId);
        await persistChanges();
        closeEventModal();
        refreshAllData();
        showToast('Schedule entry deleted.');
      }
    });

    // Settings Modal
    el.btnOpenSettings.addEventListener('click', () => {
      const settings = PlannerStorage.getSettings();
      el.settingAutolock.value = settings.timeoutMinutes ?? 10;
      el.settingProfileName.value = state.profile.name || "Dr. Arkaprabha Sau";
      el.changeOldPassword.value = '';
      el.changeNewPassword.value = '';
      el.changePwdStatus.textContent = '';
      el.modalSettings.classList.add('active');
    });

    el.btnCloseSettingsModal.addEventListener('click', () => el.modalSettings.classList.remove('active'));

    el.btnSaveSettings.addEventListener('click', async () => {
      const timeout = parseInt(el.settingAutolock.value, 10);
      PlannerStorage.saveSettings({ timeoutMinutes: timeout });

      state.profile.name = el.settingProfileName.value.trim() || "Dr. Arkaprabha Sau";
      el.appProfileTitle.textContent = state.profile.name;
      await persistChanges();

      el.modalSettings.classList.remove('active');
      showToast('Settings saved.');
    });

    // Change Password
    el.btnSaveNewPassword.addEventListener('click', async () => {
      const oldP = el.changeOldPassword.value;
      const newP = el.changeNewPassword.value;

      try {
        await PlannerStorage.changePassword(oldP, newP);
        el.changePwdStatus.style.color = 'var(--success)';
        el.changePwdStatus.textContent = '✓ Master password changed successfully!';
        el.changeOldPassword.value = '';
        el.changeNewPassword.value = '';
      } catch (err) {
        el.changePwdStatus.style.color = 'var(--danger)';
        el.changePwdStatus.textContent = '✕ Error: ' + err.message;
      }
    });

    // Export Buttons
    el.btnExportBackup.addEventListener('click', () => {
      PlannerStorage.exportEncryptedBackup();
      showToast('Encrypted backup downloaded.');
    });

    el.btnExportPlain.addEventListener('click', () => {
      PlannerStorage.exportPlaintextJSON();
      showToast('Plain JSON downloaded.');
    });

    // Reload Sample Diary from Notebook
    el.btnLoadSampleDiary.addEventListener('click', async () => {
      if (confirm('Load notebook sample entries? (This will merge with your current entries)')) {
        const sample = JSON.parse(JSON.stringify(window.SAMPLE_PLANNER_DATA));
        state.events = sample.events;
        await persistChanges();
        refreshAllData();
        el.modalSettings.classList.remove('active');
        showToast('Notebook diary entries loaded!');
      }
    });

    // Import 2027 Central Government Holidays
    async function import2027Holidays() {
      const holidays = window.CENTRAL_GOVT_HOLIDAYS_2027 || [];
      if (!holidays || holidays.length === 0) {
        showToast('No 2027 holidays data found.');
        return;
      }

      let addedCount = 0;
      holidays.forEach(h => {
        const exists = state.events.some(e => e.title === h.title && e.startDate === h.startDate);
        if (!exists) {
          state.events.push(JSON.parse(JSON.stringify(h)));
          addedCount++;
        }
      });

      // Jump view to 2027 to see the holidays immediately
      state.currentYear = 2027;
      el.currentYearDisplay.textContent = 2027;

      await persistChanges();
      refreshAllData();

      if (el.modalSettings.classList.contains('active')) {
        el.modalSettings.classList.remove('active');
      }

      if (addedCount > 0) {
        showToast(`🏛️ Added ${addedCount} Central Govt Holidays for 2027!`);
      } else {
        showToast('🏛️ All 17 Central Govt Holidays for 2027 are already present!');
      }
    }

    if (el.btnToolbarAdd2027Holidays) {
      el.btnToolbarAdd2027Holidays.addEventListener('click', import2027Holidays);
    }
    if (el.btnLoad2027Holidays) {
      el.btnLoad2027Holidays.addEventListener('click', import2027Holidays);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Start app when DOM is ready
  document.addEventListener('DOMContentLoaded', initApp);
})();
