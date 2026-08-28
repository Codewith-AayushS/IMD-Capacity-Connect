# Change Log - Capacity Connect Web Application

This document lists all technologies used, files created/modified, backend API endpoints, database schemas, and UI components built for the **Capacity Connect** platform (SIH 26075 / India Meteorological Department).

---

## 1. Technologies Used

*   **Next.js (App Router, React 19, TypeScript):** Full-stack web framework providing client & server rendering, dynamic routing, and API route handlers.
*   **Lucide React:** Iconography library for modern UI controls.
*   **Tailwind CSS v4 & 21st.dev UI Design:** Component styling system tailored to the IMD Capability Hub design language.
*   **MongoDB & Mongoose:** Document database and ORM for persisting user profiles, competency matrices, role requirements, courses, assessments, and trainer matching.
*   **Node.js (v24.20.0) & NPM (11.19.0):** Execution environment and package manager.

---

## 2. Backend Architecture & Files Created

### 1. `lib/db.ts`
*   **Purpose:** Establishes a cached MongoDB connection using Mongoose (`connectToDatabase`).
*   **Resilience:** Includes an automatic fallback handler. If local MongoDB server is not running, the application gracefully operates in-memory so the site remains 100% interactive without crashing.

### 2. `lib/models.ts`
*   **`User` Schema:** Stores trainee, trainer, and admin accounts, centers, target roles, experience, and array of competency skill levels.
*   **`RoleRequirement` Schema:** Stores target role titles (e.g. *Advanced Weather Forecaster*) and required skill level thresholds.
*   **`Course` Schema:** Stores courses, skill associations, duration, and module completion statuses.
*   **`Assessment` Schema:** Stores question banks, correct answer indices, quiz attempts, and average scores.

### 3. `app/api/seed/route.ts`
*   **Endpoint:** `GET /api/seed`
*   **Purpose:** Automatically populates initial data for trainees, role requirements, learning courses, applied quizzes, and trainer match profiles.

### 4. `app/api/skills/route.ts`
*   **Endpoints:** `GET /api/skills`, `POST /api/skills`
*   **Purpose:** Fetches current user competency profiles and accepts skill level promotion updates.

### 5. `app/api/gap-analysis/route.ts`
*   **Endpoint:** `POST /api/gap-analysis`
*   **Purpose:** Computes gap metrics (`gap = requiredLevel - currentLevel`) for any selected target role.

### 6. `app/api/assessments/route.ts`
*   **Endpoints:** `GET /api/assessments`, `POST /api/assessments`
*   **Purpose:** Validates quiz answers, computes percentage score, updates attempt history, and automatically promotes trainee competency level when score >= 70%.

### 7. `app/api/trainers/match/route.ts`
*   **Endpoint:** `GET /api/trainers/match`
*   **Purpose:** Calculates match percentages and recommendation rationale for trainers based on trainee skill gaps.

### 8. `app/api/analytics/route.ts`
*   **Endpoint:** `GET /api/analytics`
*   **Purpose:** Delivers organization-wide stats, skill demand signals, and learning status distributions for the Admin Dashboard.

### 9. `README.md`
*   **Purpose:** Comprehensive step-by-step setup guide covering Node.js & NPM installation, VS Code PATH troubleshooting, MongoDB configuration, production build instructions, and feature guide.

### 10. `.gitignore`
*   **Purpose:** Standardized git ignore rules ignoring `node_modules/`, `.next/`, build outputs, `.env` secret variables, debug logs, and OS system files.

---

## 3. Frontend & UI Enhancements (`app/page.tsx`)

*   **Role Switcher:** Dynamic landing page allowing seamless exploration of **Trainee**, **Trainer**, and **Admin** roles.
*   **Database Live Indicator:** Header badge displaying `MongoDB Live` or `Memory API` mode.
*   **Trainer Content Management (Single Top-Right Entry & Dual-Option Modal)**:
    *   Replaced duplicate inline buttons with a single top-right header button: `[+ Add Course / Content]`.
    *   Clicking opens a dual-choice selector:
        1. *Add New Course* (Title, Skill, Duration).
        2. *Add Lecture / Quiz / Assessment to Existing Course* (Select target course, content type, title, and duration).
*   **Trainer Course Inspector & Trainee Performance**:
    *   Clicking any course card (*Radar Fundamentals*, etc.) opens a full Course Detail modal.
    *   Shows attached demo lectures & quizzes (e.g. *Lecture 1: Radar Waves*, *Quiz 1: Reflectivity Check*).
    *   Displays an **Enrolled Trainees Performance Table** showing individual trainee test scores (e.g., *Rahul Sharma: 82%*, *Priya Nair: 74%*, *Vikram Singh: 91%*).
*   **Trainee Dashboard — Matched Expert Trainer Card**:
    *   Positioned a **Perfect Matched Trainer Card** directly beside the Priority Skill Gap card.
    *   Shows Dr. Sharma (94% match) and a **`[View Qualifications & Credentials]`** button that opens a detailed modal with academic degrees (Ph.D. IIT Delhi), operational history, and credentials.
*   **Trainee Feature — Target Role Display**:
    *   Added a dedicated **Selected Target Role Banner** on the Trainee Dashboard showing active career direction (*Advanced Weather Forecaster*, etc.), core proficiency targets, and quick-change controls.
*   **Admin Feature — Most Needed Skills & Matched Trainer Qualifications**:
    *   Enhanced the Admin Dashboard so every "Most Needed Skill" displays the top matched expert trainer with **Qualifications**, **Experience**, **Match Score**, and **Cohort Allocation** controls.

---

## 4. Verification

*   **Build Verification:** Successfully compiled Next.js TypeScript application with zero build errors (`npm run build`).
*   **API Verification:** Verified `/api/seed`, `/api/skills`, `/api/gap-analysis`, `/api/assessments`, and `/api/trainers/match` route responses.
