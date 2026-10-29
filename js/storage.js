/**
 * Storage Manager with Client-Side Zero-Knowledge Encryption
 * Encrypts all data before writing to localStorage / IndexedDB.
 */

const PlannerStorage = (() => {
  const VAULT_KEY = 'planner_encrypted_vault_v1';
  const SETTINGS_KEY = 'planner_app_settings_v1';

  // In-memory session state (cleared upon lock/logout)
  let _activePassword = null;
  let _cachedData = null;
  let _inactivityTimer = null;
  let _onLockCallback = null;
  let _timeoutMinutes = 10;

  function isVaultConfigured() {
    return localStorage.getItem(VAULT_KEY) !== null;
  }

  function getRawVault() {
    const raw = localStorage.getItem(VAULT_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function getSettings() {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : { timeoutMinutes: 10, theme: 'light' };
    } catch (e) {
      return { timeoutMinutes: 10, theme: 'light' };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    if (settings.timeoutMinutes !== undefined) {
      _timeoutMinutes = settings.timeoutMinutes;
      resetInactivityTimer();
    }
  }

  /**
   * Initialize a new vault with master password
   */
  async function initVault(password, initialData) {
    if (!password || password.length < 4) {
      throw new Error('Master password must be at least 4 characters long.');
    }
    const envelope = await PlannerCrypto.encrypt(initialData, password);
    localStorage.setItem(VAULT_KEY, JSON.stringify(envelope));
    _activePassword = password;
    _cachedData = JSON.parse(JSON.stringify(initialData));
    startSessionWatch();
    return _cachedData;
  }

  /**
   * Unlock existing vault with password
   */
  async function unlockVault(password) {
    const envelope = getRawVault();
    if (!envelope) {
      throw new Error('No encrypted vault found. Please set up your master password first.');
    }

    const decrypted = await PlannerCrypto.decrypt(envelope, password);
    _activePassword = password;
    _cachedData = decrypted;
    startSessionWatch();
    return _cachedData;
  }

  /**
   * Save changes to vault
   */
  async function saveVault(data) {
    if (!_activePassword) {
      throw new Error('Vault is locked. Cannot save.');
    }
    const envelope = await PlannerCrypto.encrypt(data, _activePassword);
    localStorage.setItem(VAULT_KEY, JSON.stringify(envelope));
    _cachedData = JSON.parse(JSON.stringify(data));
    resetInactivityTimer();
    return true;
  }

  /**
   * Re-encrypt vault with a new master password
   */
  async function changePassword(currentPassword, newPassword) {
    if (!_cachedData || _activePassword !== currentPassword) {
      throw new Error('Current password verification failed.');
    }
    if (!newPassword || newPassword.length < 4) {
      throw new Error('New password must be at least 4 characters long.');
    }
    const envelope = await PlannerCrypto.encrypt(_cachedData, newPassword);
    localStorage.setItem(VAULT_KEY, JSON.stringify(envelope));
    _activePassword = newPassword;
    return true;
  }

  /**
   * Lock vault and clear all sensitive memory
   */
  function lockVault() {
    _activePassword = null;
    _cachedData = null;
    if (_inactivityTimer) {
      clearTimeout(_inactivityTimer);
      _inactivityTimer = null;
    }
    if (typeof _onLockCallback === 'function') {
      _onLockCallback();
    }
  }

  function isUnlocked() {
    return _activePassword !== null && _cachedData !== null;
  }

  function getCachedData() {
    return _cachedData;
  }

  /**
   * Export encrypted backup blob (safe to share/store anywhere)
   */
  function exportEncryptedBackup() {
    const raw = localStorage.getItem(VAULT_KEY);
    if (!raw) throw new Error('No vault to export.');
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `monthly-planner-backup-${dateStr}.enc.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import encrypted backup from file content
   */
  function importEncryptedBackup(jsonString) {
    const envelope = JSON.parse(jsonString);
    if (!envelope.salt || !envelope.iv || !envelope.ciphertext) {
      throw new Error('File is not a valid encrypted planner backup.');
    }
    localStorage.setItem(VAULT_KEY, JSON.stringify(envelope));
    lockVault();
    return true;
  }

  /**
   * Export plaintext JSON or print-ready format (only while unlocked)
   */
  function exportPlaintextJSON() {
    if (!_cachedData) throw new Error('Planner is locked.');
    const blob = new Blob([JSON.stringify(_cachedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `monthly-planner-unencrypted-${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Auto-lock timer on inactivity
   */
  function resetInactivityTimer() {
    if (_inactivityTimer) {
      clearTimeout(_inactivityTimer);
      _inactivityTimer = null;
    }
    if (_timeoutMinutes > 0 && _activePassword) {
      _inactivityTimer = setTimeout(() => {
        console.log('[AutoLock] Inactivity timeout reached. Locking vault.');
        lockVault();
      }, _timeoutMinutes * 60 * 1000);
    }
  }

  function startSessionWatch() {
    const settings = getSettings();
    _timeoutMinutes = settings.timeoutMinutes ?? 10;
    resetInactivityTimer();

    const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach(evt => {
      window.addEventListener(evt, () => {
        if (_activePassword) {
          resetInactivityTimer();
        }
      }, { passive: true });
    });
  }

  function onLock(cb) {
    _onLockCallback = cb;
  }

  return {
    isVaultConfigured,
    initVault,
    unlockVault,
    saveVault,
    changePassword,
    lockVault,
    isUnlocked,
    getCachedData,
    exportEncryptedBackup,
    importEncryptedBackup,
    exportPlaintextJSON,
    getSettings,
    saveSettings,
    onLock
  };
})();

window.PlannerStorage = PlannerStorage;
