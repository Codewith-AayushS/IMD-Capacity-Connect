## User Flow and System Flow Document

# Capacity Connect

**Project:** Capacity Connect  
**SIH Problem ID:** SIH 26075  
**Version:** 1.0  
**Stage:** Hackathon MVP  

---

# 1. Purpose of This Document

This document defines how users move through Capacity Connect and how the major features connect.

It answers:

- What happens when a user enters the website?
- What does each user role see?
- What can a Trainee do?
- What can a Trainer do?
- What can an Admin do?
- How does competency gap analysis work?
- How does course recommendation work?
- How does trainer matching work?
- How does assessment connect to performance?
- Which flows are essential for the MVP?

This document should be used when deciding:

- Which pages to build.
- Which buttons are needed.
- Where users should navigate.
- What data should be connected.
- What features can be removed if time is limited.

---

# 2. Overall System Flow

The complete Capacity Connect ecosystem can be represented as:

```text
                         CAPACITY CONNECT
                                │
                                ▼
                            LOGIN
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
                 TRAINEE     TRAINER       ADMIN
                    │           │           │
                    ▼           ▼           ▼
                 Learning     Training    Management
                 Journey      Workflow     & Insights
                    │           │           │
                    └───────────┼───────────┘
                                │
                                ▼
                        SHARED DATA LAYER

        Users ─ Skills ─ Competencies ─ Courses
                 │            │             │
                 └────────────┼─────────────┘
                              │
                   Assessments / Results
                              │
                              ▼
                    Capacity Building Insights
```

All three roles interact with the same connected system.

They simply see different parts of it.

---

# 3. Entry Flow

## 3.1 Landing Page

The user enters Capacity Connect.

```text
LANDING PAGE
      │
      ├── About Capacity Connect
      ├── Key Features
      ├── Login
      └── Demo Access
```

### Primary Action

```text
User clicks "Login"
        ↓
Login Page
```

For the MVP, a simple demo login is sufficient.

---

# 4. Authentication and Role Flow

```text
LOGIN
  │
  ▼
Enter Demo Credentials
  │
  ▼
System Identifies User Role
  │
  ├───────────────┬────────────────┐
  ▼               ▼                ▼
TRAINEE        TRAINER          ADMIN
  │               │                │
  ▼               ▼                ▼
Trainee       Trainer           Admin
Dashboard     Dashboard         Dashboard
```

For the MVP, the team may use:

- Predefined demo users.
- A role selector.
- Simple local authentication.

The important part is that the demo clearly shows different role-based experiences.

---

# 5. Complete Trainee Flow

The Trainee flow is the **most important flow in the entire MVP**.

This is where Capacity Connect demonstrates its competency intelligence.

```text
LOGIN
  ↓
TRAINEE DASHBOARD
  ↓
VIEW PROFILE
  ↓
VIEW CURRENT SKILLS
  ↓
SELECT TARGET ROLE / TRAINING GOAL
  ↓
COMPETENCY GAP ANALYSIS
  ↓
VIEW MISSING SKILLS
  ↓
GET LEARNING RECOMMENDATION
  ↓
VIEW LEARNING PATH
  ↓
ENROLL / ACCESS COURSE
  ↓
LEARN THROUGH MODULES
  ↓
ATTEMPT ASSESSMENT
  ↓
VIEW RESULT
  ↓
VIEW PERFORMANCE INSIGHT
  ↓
VIEW NEXT RECOMMENDED ACTION
```

This is the primary story that should work from beginning to end.

---

# 6. Trainee Dashboard Flow

After login:

```text
TRAINEE DASHBOARD
│
├── Welcome Section
│
├── Current Courses
│
├── Learning Progress
│
├── My Competencies
│
├── Competency Gaps
│
├── Recommended Learning
│
├── Upcoming / Pending Assessment
│
└── Quick Actions
     │
     ├── View Profile
     ├── Analyze Skills
     ├── Explore Learning Path
     └── Continue Learning
```

The dashboard should act as a summary, not a page containing every possible feature.

---

# 7. Trainee Profile Flow

```text
TRAINEE DASHBOARD
        │
        ▼
     MY PROFILE
        │
        ├── Personal / Professional Information
        │
        ├── Current Role
        │
        ├── Experience
        │
        ├── Qualifications
        │
        ├── Skills
        │
        ├── Competencies
        │
        └── Training History
```

### Important Connection

The profile is not only for display.

The skills and competencies shown here are later used by:

```text
PROFILE
   ↓
CURRENT SKILLS
   ↓
COMPETENCY GAP ANALYSIS
   ↓
RECOMMENDATIONS
```

---

# 8. Competency Gap Analysis Flow

This is one of the most important flows.

## Step 1: View Current Skills

Example:

```text
Radar Meteorology      Level 2
NWP                    Level 3
Python                 Level 4
Climate Science        Level 3
```

The Trainee clicks:

```text
Analyze My Skills
```

---

## Step 2: Select Target Role

```text
SELECT TARGET ROLE

[ Weather Forecaster ▼ ]
```

Possible demo roles:

```text
Weather Forecaster
Advanced Weather Forecaster
Meteorological Data Analyst
Radar / Observation Specialist
```

The Trainee selects one role.

---

## Step 3: System Loads Role Requirements

Example:

```text
Advanced Weather Forecaster

Radar Meteorology     Required Level 4
NWP                   Required Level 4
Python                Required Level 3
Climate Science       Required Level 3
```

---

## Step 4: System Compares Data

```text
CURRENT COMPETENCY
        VS
REQUIRED COMPETENCY
```

Example:

```text
Radar

Current: 2
Required: 4

Gap = 2
```

---

## Step 5: Display Results

```text
COMPETENCY ANALYSIS

Radar Meteorology
Current: 2
Required: 4
Gap: 2
Status: Needs Development

NWP
Current: 3
Required: 4
Gap: 1
Status: Needs Development

Python
Current: 4
Required: 3
Status: Requirement Met
```

The user sees:

```text
[ View Recommended Learning Path ]
```

---

# 9. Learning Recommendation Flow

After competency gaps are identified:

```text
COMPETENCY GAP
      │
      ▼
Identify Missing Skill
      │
      ▼
Find Courses Related To Skill
      │
      ▼
Check Current Level
      │
      ▼
Check Course Entry Level
      │
      ▼
Check Course Target Level
      │
      ▼
Generate Learning Path
```

Example:

```text
SKILL:
Radar Meteorology

Current Level:
2

Required Level:
4
```

Available courses:

```text
Basic Radar Meteorology

Entry Level: 1
Target Level: 3
```

```text
Advanced Radar Meteorology

Entry Level: 3
Target Level: 5
```

Generated path:

```text
CURRENT LEVEL 2
       │
       ▼
BASIC RADAR METEOROLOGY
       │
       ▼
LEVEL 3
       │
       ▼
ADVANCED RADAR METEOROLOGY
       │
       ▼
LEVEL 4+ ACHIEVED
```

The page should clearly explain:

> Your current competency is Level 2. Your selected target role requires Level 4. These courses are recommended to help bridge the identified gap.

---

# 10. Course Flow

After receiving a recommendation:

```text
RECOMMENDED COURSE
        │
        ▼
VIEW COURSE DETAILS
        │
        ├── Description
        ├── Skill Developed
        ├── Entry Level
        ├── Target Level
        ├── Modules
        └── Trainer
              │
              ▼
         ENROLL / ACCESS
              │
              ▼
          MY LEARNING
```

---

# 11. Learning Flow

```text
MY LEARNING
      │
      ▼
SELECT COURSE
      │
      ▼
COURSE DETAILS
      │
      ▼
MODULE LIST
      │
      ├── Module 1
      ├── Module 2
      ├── Module 3
      └── Assessment
```

Inside a module:

```text
MODULE
  │
  ├── Learning Material
  ├── PDF / Notes
  ├── Presentation
  ├── Video / Link
  │
  ▼
MARK AS COMPLETED
  │
  ▼
UPDATE PROGRESS
  │
  ▼
NEXT MODULE
```

---

# 12. Progress Flow

```text
MODULE STATUS

Not Started
      ↓
In Progress
      ↓
Completed
```

Example:

```text
Module 1    ✓ Completed
Module 2    ✓ Completed
Module 3    ● In Progress
Assessment  ○ Pending
```

Course progress can be calculated from completed modules.

For the MVP, simple progress calculation is sufficient.

---

# 13. Assessment Flow

The assessment must actually work.

```text
COURSE
  │
  ▼
ASSESSMENT AVAILABLE
  │
  ▼
START ASSESSMENT
  │
  ▼
QUESTION 1
  │
  ▼
SELECT ANSWER
  │
  ▼
NEXT QUESTION
  │
  ▼
...
  │
  ▼
SUBMIT
  │
  ▼
SYSTEM CALCULATES RESULT
```

The system should then show:

```text
RESULT
  │
  ├── Overall Score
  ├── Correct Answers
  ├── Incorrect Answers
  ├── Topic Performance
  └── Improvement Areas
```

---

# 14. Performance Insight Flow

Example assessment result:

```text
OVERALL SCORE: 72%

Radar Principles          90%
Radar Interpretation     80%
Doppler Radar            55%
Applications             60%
```

The system identifies:

```text
WEAK AREAS

Doppler Radar
Applications
```

The flow becomes:

```text
ASSESSMENT RESULT
        │
        ▼
TOPIC-WISE PERFORMANCE
        │
        ▼
IDENTIFY WEAK AREAS
        │
        ▼
RECOMMEND IMPROVEMENT
        │
        ├── Review Learning Material
        ├── Repeat Module
        └── Future Training Recommendation
```

This is important because assessment should not end at:

> Score: 72%.

The product should attempt to answer:

> What does the result mean?

---

# 15. Trainee End-to-End Demo Flow

This is the recommended exact flow for your SIH demonstration.

```text
1. Login as Trainee
          ↓
2. View Dashboard
          ↓
3. Open Profile
          ↓
4. View Current Skills
          ↓
5. Click "Analyze My Skills"
          ↓
6. Select Target Role
          ↓
7. System Shows Competency Gaps
          ↓
8. Click "View Learning Path"
          ↓
9. System Recommends Courses
          ↓
10. Open Recommended Course
          ↓
11. Access Learning Module
          ↓
12. Complete / Mark Module
          ↓
13. Attempt Assessment
          ↓
14. Submit Assessment
          ↓
15. View Performance Insight
          ↓
16. See Next Recommended Action
```

If only one complete flow is perfect in the MVP, this should be it.

---

# 16. Trainer Flow

The Trainer flow should be smaller than the Trainee flow but still meaningful.

```text
LOGIN AS TRAINER
       ↓
TRAINER DASHBOARD
       ↓
VIEW EXPERTISE
       ↓
VIEW ASSIGNED COURSES
       ↓
VIEW TRAINEES
       ↓
CREATE / MANAGE ASSESSMENT
       ↓
VIEW TRAINEE PERFORMANCE
```

---

# 17. Trainer Dashboard Flow

```text
TRAINER DASHBOARD
│
├── My Profile
│
├── My Expertise
│
├── Assigned Courses
│
├── Total Trainees
│
├── Pending Assessments
│
├── Recent Performance
│
└── Quick Actions
     │
     ├── Manage Course
     ├── Create Assessment
     └── View Trainee Performance
```

---

# 18. Trainer Expertise Flow

```text
TRAINER PROFILE
        │
        ▼
MY EXPERTISE
        │
        ├── Radar Meteorology: 5/5
        ├── NWP: 4/5
        └── Satellite Meteorology: 3/5
```

This data connects to:

```text
TRAINING REQUIREMENT
        │
        ▼
REQUIRED SKILL
        │
        ▼
SEARCH TRAINER EXPERTISE
        │
        ▼
RANK SUITABLE TRAINERS
```

---

# 19. Trainer Matching Flow

This flow may be initiated by:

- Admin.
- Training requirement page.
- Course assignment page.

The logic:

```text
TRAINING REQUIREMENT
        │
        ▼
SELECT REQUIRED SKILL
        │
        ▼
SELECT REQUIRED LEVEL
        │
        ▼
COMPARE TRAINER COMPETENCIES
        │
        ▼
FILTER RELEVANT TRAINERS
        │
        ▼
RANK MATCHES
```

Example:

```text
Requirement:

Radar Meteorology
Level 4
```

Result:

```text
#1 Dr. Sharma

Radar: Level 5
Experience: 12 Years
Match: 95%
```

```text
#2 Dr. Kumar

Radar: Level 4
Experience: 8 Years
Match: 88%
```

For the MVP, the match percentage can be generated using transparent rule-based logic.

---

# 20. Trainer Assessment Creation Flow

```text
TRAINER DASHBOARD
        │
        ▼
CREATE ASSESSMENT
        │
        ▼
ENTER TITLE
        │
        ▼
SELECT COURSE / SUBJECT
        │
        ▼
ADD QUESTION
        │
        ├── Question Text
        ├── Option A
        ├── Option B
        ├── Option C
        ├── Option D
        └── Correct Answer
        │
        ▼
ADD MORE QUESTIONS
        │
        ▼
SET DEADLINE (Optional MVP)
        │
        ▼
PUBLISH
        │
        ▼
AVAILABLE TO TRAINEES
```

---

# 21. Trainer Performance Flow

```text
TRAINER DASHBOARD
        │
        ▼
VIEW COURSE
        │
        ▼
VIEW TRAINEES
        │
        ▼
SELECT TRAINEE
        │
        ▼
VIEW PERFORMANCE
```

Example:

```text
Rahul Sharma

Course Progress: 75%
Assessment Score: 72%

Topic Performance:

Radar Principles: 90%
Doppler Radar: 55%
Applications: 60%
```

The Trainer can understand:

```text
STRONG AREA
     ↓
Radar Principles

NEEDS IMPROVEMENT
     ↓
Doppler Radar
```

---

# 22. Admin Flow

The Admin flow provides the organizational perspective.

```text
LOGIN AS ADMIN
       ↓
ADMIN DASHBOARD
       ↓
SELECT MANAGEMENT AREA
       │
       ├── Users
       ├── Courses
       ├── Assessments
       ├── Trainers
       ├── Competencies
       └── Analytics
```

---

# 23. Admin Dashboard Flow

```text
ADMIN DASHBOARD

┌───────────────────────────────┐
│ Total Trainees                │
│ 128                           │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Total Trainers                │
│ 24                            │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Active Courses                │
│ 12                            │
└───────────────────────────────┘

┌───────────────────────────────┐
│ Active Assessments            │
│ 18                            │
└───────────────────────────────┘
```

Below this:

```text
Participation
      ↓
Course Progress
      ↓
Assessment Performance
      ↓
Common Competency Gaps
```

---

# 24. Admin User Management Flow

```text
ADMIN
  │
  ▼
USERS
  │
  ├── Trainees
  └── Trainers
        │
        ▼
SELECT USER
        │
        ▼
VIEW PROFILE
        │
        ├── Skills
        ├── Competencies
        ├── Courses
        └── Performance
```

For the MVP, Admin does not need a complex user creation workflow.

Viewing and managing demo data is enough.

---

# 25. Admin Course Management Flow

```text
ADMIN
  │
  ▼
COURSES
  │
  ├── View Courses
  ├── View Enrollments
  ├── View Trainer
  ├── View Progress
  └── View Assessment Performance
```

The purpose is to demonstrate connected data.

---

# 26. Admin Competency Analytics Flow

This is one of the strongest Admin features.

```text
ALL TRAINEE COMPETENCIES
            │
            ▼
COMPARE WITH REQUIREMENTS
            │
            ▼
COLLECT IDENTIFIED GAPS
            │
            ▼
COUNT COMMON GAPS
            │
            ▼
DISPLAY ORGANIZATIONAL PRIORITIES
```

Example:

```text
MOST COMMON SKILL GAPS

1. Radar Meteorology
   48 Trainees

2. Numerical Weather Prediction
   36 Trainees

3. Satellite Meteorology
   22 Trainees
```

This allows Admin to identify:

> Which areas require the greatest capacity-building attention?

---

# 27. Admin Trainer Matching Flow

Admin identifies a training requirement:

```text
NEW TRAINING REQUIREMENT
        │
        ▼
SELECT SKILL
        │
        ▼
SELECT REQUIRED COMPETENCY LEVEL
        │
        ▼
SYSTEM FINDS MATCHING TRAINERS
        │
        ▼
RANKED TRAINER LIST
        │
        ▼
SELECT SUITABLE TRAINER
```

Example:

```text
Requirement:
Advanced Radar Training

Required Skill:
Radar Meteorology

Required Level:
4+
```

System:

```text
Recommended Trainers

1. Dr. Sharma
   Level 5

2. Dr. Kumar
   Level 4
```

---

# 28. Shared Data Flow

The most important technical concept is that pages should share data.

For example:

```text
TRAINEE PROFILE
       │
       ▼
CURRENT SKILLS
       │
       ├───────────────┐
       ▼               ▼
SKILL GAP          ANALYTICS
       │               │
       ▼               │
RECOMMENDATION          │
       │               │
       ▼               │
COURSE                  │
       │               │
       ▼               │
ASSESSMENT              │
       │               │
       ▼               │
RESULT ─────────────────┘
       │
       ▼
UPDATED INSIGHT
```

This is what makes Capacity Connect feel like one product instead of many separate screens.

---

# 29. Recommended Website Navigation

For the MVP, do not create too many navigation items.

## Trainee Navigation

```text
Dashboard
My Profile
My Learning
Skill Analysis
Recommendations
Assessments
History
```

## Trainer Navigation

```text
Dashboard
My Profile
My Courses
Trainees
Assessments
Performance
```

## Admin Navigation

```text
Dashboard
Users
Courses
Trainers
Assessments
Competency Analytics
```

If time becomes limited, some of these can be combined.

---

# 30. Simplified MVP Navigation

If the team cannot build many pages, use this reduced structure.

## Trainee

```text
Dashboard
   ├── Profile
   ├── Skill Analysis
   ├── Learning Path
   ├── Course
   └── Assessment Result
```

## Trainer

```text
Dashboard
   ├── Expertise
   ├── My Course
   └── Trainee Performance
```

## Admin

```text
Dashboard
   ├── Users
   ├── Trainer Matching
   └── Analytics
```

This is enough to demonstrate the core concept.

---

# 31. Page Priority

## Priority 1 — Must Build

```text
Landing / Login

Trainee Dashboard
Trainee Profile
Skill Gap Analysis
Learning Recommendation
Course / Learning Page
Working Assessment
Assessment Result

Trainer Dashboard
Trainer Expertise
Trainee Performance

Admin Dashboard
Competency Analytics
Trainer Matching
```

---

## Priority 2 — Build If Time Allows

```text
Detailed Training History
Feedback Form
Course Management
Assessment Creation
User Management
Certificate View
Detailed Course Catalog
```

---

## Priority 3 — Do Not Build Now

```text
Real OTP
Email Verification
Live Chat
Video Calling
Complex Notifications
Advanced Attendance
Large Question Banks
Real AI Model
Payment System
Native Mobile App
Complex Enterprise Integrations
```

---

# 32. Recommended Demo Flow

For the final SIH presentation, demonstrate the product in this order:

## Part 1: The Problem

Explain:

> Capacity building involves people, trainers, courses, assessments, performance and competencies. The challenge is connecting these elements into a continuous development journey.

---

## Part 2: Trainee Journey

Show:

```text
Profile
↓
Current Skills
↓
Target Role
↓
Competency Gap
↓
Recommended Learning Path
↓
Course
↓
Assessment
↓
Performance Insight
```

This should be the main demonstration.

---

## Part 3: Trainer Journey

Show:

```text
Trainer Expertise
↓
Assigned Course
↓
Assessment
↓
Trainee Performance
```

Then demonstrate:

```text
Training Requirement
↓
Trainer Matching
```

---

## Part 4: Admin Journey

Show:

```text
Organization Overview
↓
Participation
↓
Performance
↓
Common Competency Gaps
↓
Capacity-Building Priorities
```

---

# 33. MVP Minimum Complete Flow

If there is very little time left, the absolute minimum should still demonstrate:

```text
TRAINEE PROFILE
       ↓
CURRENT SKILLS
       ↓
TARGET ROLE
       ↓
SKILL GAP
       ↓
RECOMMENDED COURSE
       ↓
LEARNING MODULE
       ↓
MCQ ASSESSMENT
       ↓
RESULT
```

Then add:

```text
TRAINER EXPERTISE
       ↓
TRAINER MATCHING
```

And finally:

```text
ADMIN DASHBOARD
       ↓
COMMON COMPETENCY GAPS
```

Even this reduced version demonstrates the unique core idea.

---

# 34. Final Flow Principle

Every major feature should connect to another feature.

Avoid this:

```text
Profile Page

Course Page

Assessment Page

Analytics Page
```

where every page is isolated.

Instead, build:

```text
PROFILE
   ↓
SKILLS
   ↓
COMPETENCY GAP
   ↓
RECOMMENDATION
   ↓
COURSE
   ↓
LEARNING
   ↓
ASSESSMENT
   ↓
PERFORMANCE
   ↓
UPDATED INSIGHT
```

At the same time:

```text
TRAINING REQUIREMENT
       ↓
REQUIRED COMPETENCY
       ↓
TRAINER EXPERTISE
       ↓
TRAINER MATCH
```

And organizationally:

```text
ALL TRAINEE DATA
       ↓
SKILL GAP DATA
       ↓
AGGREGATION
       ↓
ORGANIZATIONAL INSIGHT
       ↓
CAPACITY-BUILDING PRIORITY
```

---

# 35. Final System Flow

The complete Capacity Connect MVP should demonstrate:

```text
                         CAPACITY CONNECT
                                │
                                ▼
                              LOGIN
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
           TRAINEE           TRAINER             ADMIN
              │                 │                 │
              ▼                 ▼                 ▼
           PROFILE           EXPERTISE        ORGANIZATION
              │                 │                 │
              ▼                 │                 ▼
        CURRENT SKILLS          │            ANALYTICS
              │                 │                 │
              ▼                 │                 │
        COMPETENCY GAP          │                 │
              │                 │                 │
        ┌─────┴──────┐          │                 │
        ▼            ▼          │                 │
   LEARNING PATH   TRAINER MATCHING ◄──────────────┘
        │
        ▼
      COURSE
        │
        ▼
     LEARNING
        │
        ▼
    ASSESSMENT
        │
        ▼
   PERFORMANCE
        │
        ▼
 COMPETENCY INSIGHT
        │
        ▼
   NEXT BEST ACTION
```

---

# 36. Final Flow Summary

The website should tell one connected story:

> **We first understand the person and their current competencies. We identify what they need for a role or training objective. We find the gap, recommend relevant learning, connect suitable trainer expertise, allow the trainee to learn and be assessed, analyze the result, and use that information to guide the next capacity-building action.**

This is the central flow of Capacity Connect.

---

**End of FLOW.md**