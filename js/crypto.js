/**
 * Secure Crypto Module (Zero-Knowledge Client-Side Encryption)
 * Uses Web Crypto API: PBKDF2 (SHA-256, 100,000 iterations) + AES-256-GCM.
 * Your data is NEVER stored in plaintext. Without your master password,
 * nobody (not even GitHub hosting it) can read your planner data.
 */

const PlannerCrypto = (() => {
  const PBKDF2_ITERATIONS = 120000;
  const SALT_LENGTH = 16;
  const IV_LENGTH = 12; // Standard for AES-GCM
  const CANARY_PHRASE = 'PLANNER_VAULT_DECRYPT_OK_V1';

  // Base64 Helpers
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  function base64ToArrayBuffer(base64) {
    const binary = window.atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Derive AES-256-GCM CryptoKey from password and salt
   */
  async function deriveKey(password, saltUint8) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltUint8,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt a JavaScript object / string
   * Returns: { salt, iv, ciphertext, canary, version: 1, timestamp }
   */
  async function encrypt(dataObj, password) {
    const salt = window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const key = await deriveKey(password, salt);

    const enc = new TextEncoder();
    const plaintext = typeof dataObj === 'string' ? dataObj : JSON.stringify(dataObj);

    // Encrypt the main payload
    const cipherBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      enc.encode(plaintext)
    );

    // Encrypt a lightweight canary token to fast-check password validity
    const canaryIv = window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const canaryBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: canaryIv },
      key,
      enc.encode(CANARY_PHRASE)
    );

    return {
      version: 1,
      salt: arrayBufferToBase64(salt),
      iv: arrayBufferToBase64(iv),
      ciphertext: arrayBufferToBase64(cipherBuffer),
      canaryIv: arrayBufferToBase64(canaryIv),
      canary: arrayBufferToBase64(canaryBuffer),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Verify password quickly using the canary token without decrypting the full database
   */
  async function verifyPassword(envelope, password) {
    if (!envelope || !envelope.salt || !envelope.canary || !envelope.canaryIv) {
      return false;
    }
    try {
      const salt = new Uint8Array(base64ToArrayBuffer(envelope.salt));
      const canaryIv = new Uint8Array(base64ToArrayBuffer(envelope.canaryIv));
      const canaryData = base64ToArrayBuffer(envelope.canary);
      const key = await deriveKey(password, salt);

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: canaryIv },
        key,
        canaryData
      );

      const dec = new TextDecoder();
      return dec.decode(decrypted) === CANARY_PHRASE;
    } catch (e) {
      return false;
    }
  }

  /**
   * Decrypt the full payload
   */
  async function decrypt(envelope, password) {
    if (!envelope || !envelope.salt || !envelope.iv || !envelope.ciphertext) {
      throw new Error('Invalid encrypted envelope structure.');
    }

    const salt = new Uint8Array(base64ToArrayBuffer(envelope.salt));
    const iv = new Uint8Array(base64ToArrayBuffer(envelope.iv));
    const ciphertext = base64ToArrayBuffer(envelope.ciphertext);
    const key = await deriveKey(password, salt);

    try {
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        ciphertext
      );
      const dec = new TextDecoder();
      const jsonStr = dec.decode(decryptedBuffer);
      return JSON.parse(jsonStr);
    } catch (err) {
      throw new Error('Decryption failed: Incorrect password or corrupted data.');
    }
  }

  return {
    encrypt,
    decrypt,
    verifyPassword
  };
})();

// Export globally for browser
window.PlannerCrypto = PlannerCrypto;
