# 📅 Monthly Planner & Duty Schedule (Zero-Knowledge AES-256 Encrypted)

> **Designed for Dr. Arkaprabha Sau**  
> A private, zero-knowledge encrypted web application for monthly scheduling, hospital duties, academic lectures, and travel. Includes **real-time date/time conflict detection** and is optimized for free hosting on **GitHub Pages**.

---

## 🔒 Ironclad Security: "Only I Can See It" Guarantee

You requested: *"There will be such security that other than me no one can see that, and hosted through GitHub."*

### How This Security Works:
GitHub Pages serves files publicly, which normally means anyone with your web link can see the code. **However, this app uses Client-Side Zero-Knowledge Cryptography (AES-256-GCM + PBKDF2 with 120,000 iterations):**

1. **Zero Plaintext Storage**: Your dates, times, duties, and personal notes are **never** stored in plain text.
2. **Encrypted on Your Device**: Before any data is saved to your browser storage or exported, it is encrypted locally using the **Web Crypto API** with **AES-256-GCM** using your master password.
3. **No Central Server or Database**: There is no remote database to breach. Even if someone visits your GitHub Pages URL or inspects the repository code, they will only see a locked screen asking for the master password. Without your password, modern supercomputers cannot decrypt your schedule.
4. **Auto-Lock on Inactivity**: Automatically wipes sensitive decrypted data from browser memory after 10 minutes of inactivity (configurable in Settings).

---

## ⚡ Core Features

- **📖 12-Month Notebook Grid View**: Directly modeled after your physical handwritten diary ("*Important Dates*"), displaying all 12 months side-by-side with date spans, times, locations, and status.
- **⚠️ Real-Time Conflict Detection Engine**:
  - Automatically flags overlapping dates or conflicting hours (e.g. morning duty vs afternoon clinic, multi-day hospital duties, travel clashes).
  - Shows an immediate warning banner right while you type dates in the event modal.
  - Features a **Conflict Center** in the header displaying the exact clash details with 1-click edit buttons.
- **🗓️ Interactive Monthly Calendar & Agenda Views**: Switch between Notebook Diary view, Month Calendar grid, and Chronological Agenda Timeline.
- **🏷️ Preloaded with Your 2026 Diary**: Transcribed directly from your notebook (DVC Paramedical, Power Grid visits, WBIPHACON, Jayashree Textiles, Jim Corbett travel clash with AIIPH, etc.).
- **📥 Encrypted Portable Backups**: Export an encrypted `.enc.json` backup to store on Google Drive, USB, or transfer to another phone/computer.
- **🖨️ Print & PDF Ready**: Formatted 2-column print layout matching your diary page.
- **📱 100% Offline Progressive Web App (PWA)**: Works offline without internet, installable directly to your phone home screen or PC desktop.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

Follow these simple steps to publish your planner online:

### Step 1: Create a GitHub Repository
1. Log in to your [GitHub](https://github.com) account.
2. Click the **+** (plus icon) in the top right corner and select **New repository**.
3. Name your repository (e.g., `monthly-planner` or `planner`).
4. You can choose **Public** (or **Private** if you have GitHub Pro). *Even if the repo is Public, your schedule data is 100% safe because all data is encrypted client-side with AES-256!*
5. Leave "Add a README file" unchecked (we already made one for you).
6. Click **Create repository**.

### Step 2: Push This Code to Your GitHub Repository
Open PowerShell or Terminal in this folder (`c:\Users\arkad\OneDrive\Documents\PLANNER`) and run:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all planner files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Secure Monthly Planner"

# 4. Set branch to main
git branch -M main

# 5. Connect to your new GitHub repository (replace USERNAME and REPO with yours):
git remote add origin https://github.com/USERNAME/monthly-planner.git

# 6. Push your files to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on **Settings** (top navigation tab).
2. On the left sidebar under *Code and automation*, click **Pages**.
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, GitHub will display your live URL:
   `https://<your-username>.github.io/monthly-planner/`

---

## 🛠️ Technology Stack
- **Pure Native Web APIs**: HTML5, CSS3 Variables, ES6+ JavaScript.
- **Cryptography**: Native Web Crypto API (`window.crypto.subtle`) - AES-256-GCM, PBKDF2 (SHA-256, 120,000 rounds). Zero external insecure dependencies.
- **Offline / PWA**: Native Service Worker (`sw.js`) and Web App Manifest (`manifest.json`).
