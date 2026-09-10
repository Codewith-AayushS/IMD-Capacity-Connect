# Capacity Connect - IMD Capability Intelligence Platform

**Project:** Capacity Connect  
**SIH Problem ID:** SIH 26075  
**Organization:** India Meteorological Department (IMD)  
**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Lucide React, Tailwind CSS v4, MongoDB & Mongoose  

---

## 📌 Project Overview

Capacity Connect is a centralized, role-based capacity-building platform designed for the India Meteorological Department. It connects employees (trainees), expert trainers, competency gaps, learning courses, applied assessments, and organizational analytics into a continuous training lifecycle.

The platform supports 3 primary interactive user roles:
1. **Trainee:** Skill gap analysis, target role selection, personalized learning pathways, applied quiz assessments with automatic competency promotion, and matched expert trainer credential viewing.
2. **Trainer:** Single top-right content creator for new courses & lectures, interactive course inspector with demo lectures and trainee test performance tables, and cohort monitoring.
3. **Admin:** Organization-wide capability metrics, demand heatmaps, and capability gap intelligence pairing most needed skills with top-matched expert trainers and academic qualifications.

---

## 🚀 Setup & Installation Guide From Scratch

Follow these step-by-step instructions to set up and run the project from scratch on Windows, macOS, or Linux.

### Step 1: Install Node.js and NPM

1. Download the latest **Node.js LTS (v24 or v20+)** installer from [https://nodejs.org/](https://nodejs.org/).
2. Run the installer and ensure **"Add to PATH"** is checked during setup.
3. Complete the installation wizard.

---

### Step 2: Fix Node/NPM Recognition in VS Code (Windows PowerShell)

If you installed Node.js while VS Code was open, PowerShell inside VS Code might show:
`'node' is not recognized as an internal or external command`

**Fix in VS Code Terminal:**
Open your VS Code PowerShell terminal and run:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```
Verify installation:
```powershell
node -v
npm -v
```

---

### Step 3: Open Project & Install Dependencies

1. Open the project folder in VS Code:
   ```bash
   cd c:\Users\Admin\Desktop\website
   ```
2. Install all project dependencies (Next.js, React 19, Lucide React, Mongoose, Tailwind CSS):
   ```bash
   npm install
   ```

---

### Step 4: Configure Database (MongoDB)

1. Create a `.env` file in the root project directory (if not already created):
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/capacity_connect
   ```
2. **Note on Automatic Fallback:** If local MongoDB is not running on your machine, the backend API automatically operates in a resilient **In-Memory Fallback Mode**, ensuring the website runs 100% interactively without requiring any complex database setup!

---

### Step 5: Start Development Server

Run the development server:
```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Build for Production

To create an optimized production build:
```bash
npm run build
npm start
```

---

## 📁 Project Folder Structure

```text
website/
├── app/
│   ├── api/
│   │   ├── analytics/        # Admin capability demand metrics API
│   │   ├── assessments/      # Applied quiz evaluation & auto level promotion API
│   │   ├── gap-analysis/     # Competency differential calculator API
│   │   ├── seed/             # Automatic database data seeder
│   │   ├── skills/           # Trainee skill levels API
│   │   └── trainers/match/   # Trainer matching algorithm API
│   ├── globals.css           # Tailwind CSS styles
│   ├── layout.tsx            # Root layout wrapper
│   └── page.tsx              # Full interactive app UI (Trainee, Trainer, Admin)
├── lib/
│   ├── db.ts                 # Mongoose cached connection with fallback
│   ├── models.ts             # Schemas for User, RoleRequirement, Course, Assessment
│   └── utils.ts              # Classname utilities
├── website_doc/              # Original SIH requirement specifications & PRD
│   ├── PRD.md
│   ├── REQUIREMENTS.md
│   ├── FLOW.md
│   └── arctitecture.md
├── change.md                 # Detailed changelog of all components and features built
├── README.md                 # Setup & installation guide
├── package.json              # Project dependencies & npm scripts
└── tsconfig.json             # TypeScript configuration
```

---

## 💡 Key Features & Workflow Guide

### 1. Trainee Experience
* **Target Role Selection:** Choose from *Weather Forecaster*, *Advanced Weather Forecaster*, *Meteorological Data Analyst*, or *Radar Specialist*.
* **Competency Gap Analysis:** View proficiency levels (1 to 5) compared against role thresholds.
* **Matched Expert Trainer Card:** Positioned next to Priority Skill Gap. Click **`[View Qualifications & Credentials]`** to inspect Dr. Sharma's credentials (Ph.D. IIT Delhi, 12 Yrs experience).
* **Applied Quiz Runner:** Take course assessments. Scoring $\ge 70\%$ automatically promotes your skill level.

### 2. Trainer Experience
* **Single Top-Right Content Button:** `[+ Add Course / Content]` button in top navigation bar opens dual options:
  1. *Add New Course* (Title, Skill, Duration).
  2. *Add Lecture / Quiz to Existing Course* (Select target course, content type, title, and duration).
* **Course Inspector & Trainee Performance:** Click any published course card to view demo lectures, attached quizzes, and individual trainee test scores.

### 3. Admin Experience
* **Capability Gap Intelligence:** Pair organizational skill demands (Radar, NWP, Python, Satellite) with top matched trainers, displaying academic qualifications and cohort assignment controls.

team member and their roles:
Aayush singh and vaibhav working on technical parts of problem Solution(websites)
disha and ansh working on ppt
tanish and tejas working on content/research