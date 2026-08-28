# Capacity Connect

## Requirements Document

**Project:** Capacity Connect  
**SIH Problem ID:** SIH 26075  
**Organization / Domain:** India Meteorological Department (IMD)  
**Document Status:** MVP Requirements  
**Version:** 1.0  

---

# 1. Purpose of This Document

This document defines **what Capacity Connect must solve and what the system must do**.

It is not an architecture document and does not decide exactly which technologies, frameworks, database, or backend must be used.

This document answers:

- What problem are we solving?
- What already exists?
- Where are the break points in the current journey?
- What is Capacity Connect?
- Who will use it?
- What must each user be able to do?
- How are Trainee, Trainer, and Admin connected?
- What information must the system manage?
- What are the core functional requirements?
- What is required for the MVP?
- What should not be built for the MVP?

The requirements are based on the SIH problem understanding and the IMD training research available to the team. The existing IMD ecosystem should not be represented as having no training, resources, assessments, or results. The solution opportunity is to create a more unified training and capacity-building lifecycle around these activities. 
---

# 2. Project Overview

## 2.1 Project Name

**Capacity Connect**

## 2.2 Core Idea

Capacity Connect is a centralized, role-based digital capacity-building platform designed around three primary users:

- Trainee
- Trainer
- Admin

The platform connects:

```text
People
   +
Professional Profiles
   +
Skills and Competencies
   +
Courses
   +
Learning Resources
   +
Enrollment
   +
Trainers
   +
Assessments
   +
Performance
   +
Training History
   +
Competency Information
   +
Recommendations
   +
Organizational Analytics
```

The purpose is not simply to provide another website containing courses and PDFs.

The purpose is to manage the **complete capacity-building journey**.

---

# 3. Problem Understanding

IMD already has substantial training infrastructure and training-related resources.

The existing environment includes examples of:

- Specialized training centres.
- Different training disciplines.
- Training courses.
- Lecture notes and learning resources.
- Question banks.
- Training examinations.
- Results.
- Certificates.
- Physical training.
- Online and hybrid learning approaches.

The project should therefore not claim:

> "IMD does not have training."

or:

> "IMD does not have digital learning."

The stronger understanding is:

> Training-related activities and information can exist across different parts of the training ecosystem, while Capacity Connect aims to create a connected digital lifecycle around people, learning, assessment, competency, and training decisions.

IMD's published training material demonstrates training courses, learning resources, question banks and results, while the research direction for Capacity Connect focuses on connecting these activities into a more unified trainee/trainer/admin workflow. 
---

# 4. The Break Points Capacity Connect Addresses

The solution should be understood through the important break points in the training journey.

These break points are not necessarily claims that every existing IMD process is absent. They represent the points where Capacity Connect provides a connected workflow and additional intelligence.

---

## Break Point 1: Training Information vs Individual Training Management

A training system may tell a person:

> "These courses are available."

Capacity Connect should additionally manage:

> "Which courses is this trainee enrolled in, what is their progress, what have they completed, and what should they do next?"

Required flow:

```text
Available Course
       ↓
Trainee Enrollment
       ↓
Enrollment Record
       ↓
Learning Progress
       ↓
Assessment
       ↓
Performance Record
       ↓
Training History
```

---

## Break Point 2: Learning Resources vs Structured Learning Journey

Learning resources may exist as individual:

- PDFs.
- Lecture notes.
- Presentations.
- Recorded lectures.
- Other training materials.

The problem is not solved simply by displaying a collection of files.

Capacity Connect should organize learning around:

```text
Course
   ↓
Module / Subject
   ↓
Learning Resources
   ↓
Learning Activity
   ↓
Assessment
   ↓
Progress
```

Example:

```text
Course: Radar Meteorology

Module 1
├── Learning Material
├── Notes
└── Quiz

Module 2
├── Learning Material
├── Presentation
└── Quiz

Module 3
├── Practical / Topic Resource
└── Assessment
```

The requirement is to connect learning resources to a trainee's actual learning journey rather than treating them only as a file repository.

---

## Break Point 3: Question Bank vs Interactive Assessment and Performance Insight

A collection of questions answers:

> "What questions are available?"

Capacity Connect should support a complete assessment process:

```text
Trainer
   ↓
Create Questionnaire
   ↓
Assign Subject / Course
   ↓
Set Deadline
   ↓
Trainee Attempts Assessment
   ↓
Score Generated
   ↓
Topic-wise Performance
   ↓
Competency Insight
```

Example:

```text
Radar Meteorology Assessment

Overall Score: 72%

Radar Principles: 90%
Radar Interpretation: 80%
Doppler Radar: 55%
Applications: 60%
```

The system can then identify:

> The trainee may require additional improvement in Doppler Radar.

This is more useful than only displaying an overall score.

The source material specifically distinguishes question banks from a workflow involving questionnaires, deadlines, attempts, scores, topic-wise performance and competency information.

---

## Break Point 4: Batch Results vs Individual Learning and Competency History

A training result can answer:

> "What was the trainee's result in this course?"

Capacity Connect should build an ongoing individual record:

```text
Trainee
   ↓
Course Completed
   ↓
Assessment Result
   ↓
Performance Record
   ↓
Certificate / Completion Record
   ↓
Updated Learning History
   ↓
Current Competency Status
```

Example:

```text
Rahul Sharma

2025
Integrated Meteorological Training
Score: 78%

2026
Radar Training
Score: 62%

Current Competency:
Radar = Intermediate

Recommended Next Step:
Advanced Radar Training
```

The goal is to move from isolated training outcomes toward a connected trainee learning and competency history.

---

## Break Point 5: Training Faculty vs Active Trainer Workflow

A trainer should not only exist as a name associated with a course.

The trainer should be an active system user.

Required trainer workflow:

```text
Trainer Profile
      ↓
Expertise / Competencies
      ↓
Course Association
      ↓
Learning Material
      ↓
Questionnaire / Assessment
      ↓
Deadline
      ↓
Trainee Participation
      ↓
Trainee Performance
```

The trainer should be able to understand:

- Who is enrolled?
- Who is progressing?
- Who has completed assessments?
- How are trainees performing?
- Which topics are difficult for trainees?

This creates a connected Trainer → Course → Trainee → Assessment → Performance workflow.

---

## Break Point 6: Available Trainers vs Competency-Based Trainer Discovery

One of the most important requirements is **competency mapping**.

The system should maintain information about trainer expertise.

Example:

```text
Training Requirement:
Radar Meteorology
Required Expertise: Level 4/5
```

Trainer profiles:

```text
Trainer A
Radar Meteorology: 5/5
NWP: 4/5

Trainer B
Radar Meteorology: 4/5
Satellite Meteorology: 5/5

Trainer C
Radar Meteorology: 2/5
Python: 5/5
```

The system should identify Trainer A and Trainer B as more suitable for Radar Meteorology training.

This relationship is:

```text
Required Competency
        ↓
Suitable Trainer
```

This is not ordinary course search.

It is **competency-based trainer discovery and matching**.

---

## Break Point 7: Training Availability vs Understanding What a Trainee Actually Needs

A course catalogue answers:

> "What courses are available?"

Capacity Connect should also be able to answer:

> "What does this trainee need to learn?"

This is the beginning of the **Competency Intelligence Layer**.

The system compares:

```text
Current Competency
        VS
Required Competency
```

Example:

```text
Target Role:
Advanced Weather Forecaster

Skill                     Current      Required

Radar Meteorology           2/5          4/5
Numerical Weather Prediction 3/5          4/5
Python                      4/5          3/5
Climate Science             3/5          3/5
```

Result:

```text
Radar Meteorology
Gap = 2 Levels

Numerical Weather Prediction
Gap = 1 Level

Python
No Gap

Climate Science
No Gap
```

This allows the system to identify what development is required.

---

## Break Point 8: Skill Gap vs Actionable Learning Recommendation

Knowing that a trainee has a skill gap is not enough.

The next question is:

> What exactly should the trainee do?

Capacity Connect should connect:

```text
Trainee Skills
        +
Role Requirements
        +
Course Competency Mapping
```

to generate a learning recommendation.

Example:

```text
Current Radar Competency: Level 2
Required Radar Competency: Level 4
```

Available courses:

```text
Basic Radar Meteorology
Entry Level: 1
Target Level: 3

Advanced Radar Meteorology
Entry Level: 3
Target Level: 5
```

Recommended path:

```text
Current Level 2
       ↓
Basic Radar Meteorology
       ↓
Level 3
       ↓
Advanced Radar Meteorology
       ↓
Required Level Reached
```

The system should not randomly recommend courses.

Recommendations must be based on the relationship between:

```text
Current Level
       ↓
Missing Competency
       ↓
Required Level
       ↓
Course Entry Level
       ↓
Course Target Level
```

---

## Break Point 9: Training Completion vs Continuous Capacity Building

Completing a course should not necessarily be the end of the journey.

Capacity Connect should support a continuous loop:

```text
Current Competency
       ↓
Training Need
       ↓
Recommended Learning
       ↓
Trainer
       ↓
Learning
       ↓
Assessment
       ↓
Performance
       ↓
Updated Competency
       ↓
Next Learning Need
```

This is the central capacity-building cycle.

The source material summarizes this direction as managing who needs training, what they need, who should train them, how they perform, what competencies they gain and what they should learn next.

---

# 5. Solution Definition

## 5.1 What is Capacity Connect?

Capacity Connect is a:

> **Role-based digital capacity-building and learning management platform that connects trainees, trainers, learning resources, assessments, performance, competencies and training decisions into a continuous organizational capacity-building lifecycle.**

The platform contains an LMS-style learning layer, but its larger value comes from connecting learning with competency information and organizational capacity needs.

A useful model is:

```text
ROLE-BASED PLATFORM
        │
        ├── Trainee Management
        ├── Trainer Management
        ├── Course Management
        ├── Learning Resources
        ├── Enrollment
        ├── Assessment
        ├── Performance
        ├── Training History
        ├── Feedback
        ├── Competency Mapping
        ├── Skill Gap Analysis
        ├── Training Recommendation
        ├── Trainer Matching
        └── Organizational Analytics
```

---

# 6. The Five Core Questions

The system should ultimately help answer:

## 1. WHO needs training?

Using:

- Trainee profile.
- Role.
- Qualifications.
- Experience.
- Skills.
- Competency information.
- Training history.
- Assessment performance.

---

## 2. WHAT do they need to learn?

Using:

- Required competencies.
- Current competencies.
- Competency gaps.
- Assessment weaknesses.
- Training requirements.

---

## 3. WHO should train them?

Using:

- Trainer profiles.
- Subject expertise.
- Competency levels.
- Experience.
- Related expertise.

---

## 4. HOW do we know whether learning occurred?

Using:

- Assessments.
- Scores.
- Topic-wise performance.
- Course progress.
- Training completion.

---

## 5. WHAT should happen next?

Using:

- Updated competency information.
- Assessment results.
- Remaining skill gaps.
- Recommended next courses.
- Additional training recommendations.

These five questions represent the core intelligence of Capacity Connect.

---

# 7. User Roles

The system must support three primary user roles:

```text
TRAINEE
TRAINER
ADMIN
```

Each role must have different permissions and views.

The three roles are connected through the same platform and shared data.

---

# 8. Functional Requirements

# 8.1 Authentication and Role Access

## FR-01: User Login

The system shall provide a login mechanism for users.

For the MVP, demo authentication is acceptable.

The system should identify the user's role as:

- Trainee.
- Trainer.
- Admin.

### Acceptance Criteria

- A demo user can log in.
- The system identifies the user's role.
- The user is redirected to the appropriate dashboard.
- A Trainee cannot directly access Admin functionality through normal navigation.

---

# 9. Trainee Requirements

## FR-02: Trainee Profile

The system shall provide a professional trainee profile.

The profile should support:

- Name.
- Employee ID or demo identifier.
- Designation / role.
- Department or specialization.
- Qualifications.
- Work experience.
- Interests.
- Skills.
- Competencies.
- Certificates.
- Training history.

For the MVP, realistic sample data is acceptable.

### Acceptance Criteria

- The trainee can view their profile.
- The trainee can view current skills.
- Skills display a competency level.
- The profile is connected to other trainee features.

---

## FR-03: Current Skills and Competency View

The system shall display the trainee's current skills and competency levels.

Example:

```text
Radar Meteorology: 2/5
NWP: 3/5
Python: 4/5
Climate Science: 3/5
```

The interface should make it easy to identify:

- Strong competencies.
- Developing competencies.
- Competencies requiring improvement.

---

## Competency Level Framework

The platform shall use a standardized five-level competency framework to represent the proficiency of Trainees and Trainers across defined skills and competencies.

| Numeric Level | Competency Stage |
|---|---|
| Level 1 | Foundational |
| Level 2 | Developing |
| Level 3 | Proficient |
| Level 4 | Advanced |
| Level 5 | Expert |

The numeric levels shall be used by the system for:

- Competency comparison
- Skill-gap calculation
- Target role requirement mapping
- Course entry and target level mapping
- Learning path recommendations
- Trainer expertise matching
- Organizational competency analytics

The competency stage name and numeric level shall be displayed together where appropriate to improve clarity and provide a professional, positive representation of user proficiency.

**Example:**

`Developing · Level 2`

The same competency framework shall be used consistently across Trainee, Trainer, and Admin functionalities.

## FR-04: Target Role / Training Goal

The system should allow a trainee to select a target role or defined training goal where applicable.

Example:

```text
Weather Forecaster
Advanced Weather Forecaster
Meteorological Data Analyst
Radar / Observation Specialist
```

Each role must have associated competency requirements.

Example:

```text
Advanced Weather Forecaster

Radar Meteorology: Required Level 4
NWP: Required Level 4
Python: Required Level 3
Climate Science: Required Level 3
```

---

## FR-05: Competency Gap Analysis

The system shall compare:

```text
Current Trainee Competency
        VS
Required Competency
```

For each skill:

```text
Gap = Required Level - Current Level
```

If the result is greater than zero, the system identifies a competency gap.

The system should display:

- Skill name.
- Current level.
- Required level.
- Gap size.
- Status.

### Acceptance Criteria

Given:

```text
Current Radar = 2
Required Radar = 4
```

The system must show:

```text
Gap = 2
```

Given:

```text
Current Python = 4
Required Python = 3
```

The system must indicate that there is no competency gap.

---

## FR-06: Course Enrollment

The trainee shall be able to:

- View available or recommended courses.
- View course details.
- Enroll in a course.

For the MVP:

- Enrollment can be simulated.
- The system should visibly change the enrollment state.
- The enrolled course should appear in the trainee's learning area.

---

## FR-07: Learning Resources

The trainee shall be able to access learning resources connected to an enrolled course.

Resources may include:

- PDFs.
- Notes.
- Presentations.
- Recorded lectures.
- Links.
- Other learning material.

Resources should be organized by:

```text
Course
   ↓
Module / Subject
   ↓
Learning Resource
```

---

## FR-08: Learning Progress

The system shall track basic trainee progress.

Possible states:

- Not Started.
- In Progress.
- Completed.

For the MVP, progress tracking may be simulated or updated through completed modules.

Example:

```text
Module 1 — Completed
Module 2 — Completed
Module 3 — In Progress
Module 4 — Assessment Pending
```

---

## FR-09: Personalized Learning Recommendation

The system shall recommend relevant learning based on available data.

The recommendation engine should consider:

1. Current competency.
2. Required competency.
3. Identified gap.
4. Course skill mapping.
5. Course entry level.
6. Course target level.

The system should provide:

- Recommended course.
- Learning sequence.
- Explanation of why the course is recommended.

Example:

> Your current Radar competency is Level 2. Your target role requires Level 4. This learning path is recommended to help bridge the identified competency gap.

---

## FR-10: Subject-wise MCQ Assessment

The trainee shall be able to attempt assessments.

An assessment should support:

- Assessment title.
- Related course.
- Related subject/topic.
- Multiple-choice questions.
- Answer selection.
- Submission.
- Score calculation.

Optional:

- Deadline.
- Time limit.
- Attempt status.

For the MVP, a small fully functional assessment is preferred over a large non-functional question bank.

---

## FR-11: Assessment Result and Performance

After submission, the system shall display:

- Overall score.
- Correct/incorrect responses where appropriate.
- Topic-wise performance where sample data supports it.
- Areas needing improvement.

Example:

```text
Overall Score: 80%

Radar Principles: 90%
Radar Interpretation: 85%
Doppler Radar: 60%

Recommendation:
Improve Doppler Radar Interpretation.
```

---

## FR-12: Trainee Feedback

The trainee should be able to provide feedback related to:

- Course.
- Learning content.
- Trainer.
- Overall training experience.

For the MVP, this can be a simple rating and comment form.

Feedback should be visible to Admin in aggregated form.

---

## FR-13: Training and Learning History

The system shall maintain a trainee learning history.

The history should include, where available:

- Courses enrolled.
- Courses completed.
- Assessment results.
- Training dates.
- Certificates.
- Current competency information.

---

# 10. Trainer Requirements

## FR-14: Trainer Profile

The system shall provide a trainer profile.

The profile should include:

- Name.
- Professional information.
- Experience.
- Areas of expertise.
- Subject competencies.
- Competency levels.
- Courses associated with the trainer.

Example:

```text
Dr. Sharma

Experience: 12 Years

Expertise:
Radar Meteorology: 5/5
NWP: 4/5
Satellite Meteorology: 3/5
```

---

## FR-15: Trainer Expertise Management

The system should maintain a structured list of trainer competencies.

Each expertise record should contain:

```text
Skill / Subject
Competency Level
Optional Experience / Related Information
```

This information must be usable by the trainer matching functionality.

---

## FR-16: Course and Learning Material Management

The trainer should be able to manage or contribute to courses.

For the MVP, this may include:

- Viewing assigned courses.
- Adding a module.
- Adding a resource.
- Simulating upload or attaching a resource link.

A complete enterprise content management system is not required.

---

## FR-17: Assessment Creation

The trainer shall be able to create a basic questionnaire or assessment.

The MVP assessment creation should support:

- Assessment title.
- Related course or subject.
- MCQ questions.
- Answer options.
- Correct answer.
- Optional deadline.

The system does not need a large advanced question-bank system for the MVP.

---

## FR-18: Trainee Monitoring

The trainer shall be able to view trainees associated with their course.

The trainer should see basic information such as:

- Trainee name.
- Enrollment status.
- Progress.
- Assessment status.
- Score.

---

## FR-19: Trainee Performance Monitoring

The trainer shall be able to view trainee performance.

Where supported, this should include:

- Overall assessment score.
- Topic-wise performance.
- Weak areas.

This allows the trainer to understand:

> Which trainees may require additional support and which topics are causing difficulty.

---

# 11. Competency Mapping Requirements

## FR-20: Competency Repository

The system shall maintain a list of competencies or skills.

Example:

```text
Radar Meteorology
Numerical Weather Prediction
Satellite Meteorology
Synoptic Meteorology
Climate Science
Python / Data Processing
```

Each competency should have a unique identifier in the system's data structure.

---

## FR-21: Competency Level

The MVP should support a simple competency scale.

Recommended:

```text
Level 1 — Beginner
Level 2 — Basic
Level 3 — Intermediate
Level 4 — Advanced
Level 5 — Expert
```

The exact names can be changed later, but the same scale must be used consistently for:

- Trainees.
- Trainers.
- Role requirements.
- Course requirements.

---

## FR-22: Trainer Matching

The system shall identify suitable trainers for a competency requirement.

The system should compare:

```text
Required Skill
Required Competency Level
```

against:

```text
Trainer Expertise
Trainer Competency Level
Experience
```

Example output:

```text
#1 Dr. Sharma
Match Score: 95%
Radar Expertise: 5/5
Experience: 12 Years

#2 Dr. Kumar
Match Score: 88%
Radar Expertise: 4/5
Experience: 8 Years
```

For the MVP, a deterministic rule-based ranking is sufficient.

---




# 12. Course Competency Mapping Requirements

## FR-23: Course-to-Skill Mapping

Each course used by the recommendation engine must define:

- Course ID.
- Course name.
- Developed skill.
- Entry competency level.
- Target competency level.
- Description.
- Modules.

Example:

```text
Course:
Basic Radar Meteorology

Skill:
Radar Meteorology

Entry Level:
1

Target Level:
3
```

Another example:

```text
Course:
Advanced Radar Meteorology

Skill:
Radar Meteorology

Entry Level:
3

Target Level:
5
```

This data is required to create meaningful learning recommendations.

---

# 13. Recommendation Engine Requirements

## FR-24: Skill Gap Identification

The recommendation system shall first identify skills where:

```text
Current Level < Required Level
```

Only these skills should normally be considered development priorities.

---

## FR-25: Course Recommendation

The system shall recommend courses that:

1. Develop the missing skill.
2. Are appropriate for the trainee's current competency.
3. Move the trainee toward the required competency.

The system should avoid recommending a course where the trainee does not meet the basic entry level, unless the learning path explicitly includes a prerequisite course.

---

## FR-26: Learning Path Generation

Where a single course is insufficient to close a gap, the system should generate a sequence.

Example:

```text
Current Level: 2
Required Level: 4

Step 1:
Basic Radar Meteorology
Target: Level 3

Step 2:
Advanced Radar Meteorology
Target: Level 5

Result:
Required Level 4 can be reached
```

---

## FR-27: Recommendation Explanation

Every major recommendation should explain why it was generated.

Example:

> Recommended because your current competency is Level 2, while the selected role requires Level 4 in Radar Meteorology.

This is important because users should understand the recommendation instead of seeing an unexplained list of courses.

---

# 14. Assessment-to-Competency Requirements

## FR-28: Performance Insight

Assessment performance should be connected to the trainee's competency information where practical.

Example:

```text
Radar Assessment Score: 72%

Topic Results:

Radar Principles: 90%
Radar Interpretation: 80%
Doppler Radar: 55%
Applications: 60%
```

The system should be able to identify:

```text
Weak Area:
Doppler Radar
```

The result may be used to suggest:

- Additional learning resources.
- A related module.
- A future training recommendation.

---

## FR-29: Competency Progression

The MVP may demonstrate competency progression.

Example:

```text
Before Training:
Radar = Level 2

After Training and Assessment:
Radar = Level 3
```

The exact real-world competency calculation model does not need to be scientifically finalized for the MVP.

For the prototype, the logic must simply be:

- Consistent.
- Explainable.
- Clearly identified as prototype/demo logic where applicable.

---

# 15. Admin Requirements

## FR-30: Admin Dashboard

The Admin shall have a centralized dashboard.

The dashboard should provide high-level visibility into:

- Number of trainees.
- Number of trainers.
- Active courses.
- Enrollments.
- Assessments.
- Training progress.
- Performance.
- Competency gaps.

Example:

```text
Total Trainees: 128
Total Trainers: 24
Active Courses: 12
Active Assessments: 18
```

---

## FR-31: User Management

The Admin should be able to view and manage:

- Trainees.
- Trainers.
- User roles.

For the MVP, this can include:

- View users.
- View profile information.
- Simulated approval or status management.

A complex production identity-management system is not required.

---

## FR-32: Course Monitoring

The Admin should be able to view:

- Available courses.
- Enrollments.
- Course completion/progress.
- Associated trainers.
- Assessment activity.

---

## FR-33: Assessment Monitoring

The Admin should be able to view:

- Number of assessments.
- Completion status.
- Average performance.
- Courses or subjects with weak performance.

---

## FR-34: Competency Gap Analytics

The system should aggregate competency gaps across trainees.

Example:

```text
Most Common Competency Gaps

1. Radar Meteorology
2. Numerical Weather Prediction
3. Satellite Meteorology
```

This provides organizational insight.

The Admin should be able to answer:

> Where does the organization currently require the greatest capacity development?

---

## FR-35: Participation and Progress Analytics

The Admin dashboard should provide basic statistics such as:

```text
Completed: 65%
In Progress: 25%
Not Started: 10%
```

The exact visual representation may use:

- Cards.
- Charts.
- Tables.
- Progress indicators.

---

## FR-36: Feedback Analytics

The Admin should be able to view aggregated trainee feedback.

Example:

```text
Course A
Average Rating: 4.7

Course B
Average Rating: 2.9
```

This should help identify potential areas for:

- Course improvement.
- Content improvement.
- Training quality improvement.

---

# 16. Core System Data Requirements

The MVP should maintain structured data for the following entities.

---

## DR-01: Skills

```text
Skill
├── ID
└── Name
```

---

## DR-02: Roles

```text
Role
├── ID
├── Name
└── Required Competencies
       ├── Skill ID
       └── Required Level
```

---

## DR-03: Trainees

```text
Trainee
├── ID
├── Name
├── Designation
├── Qualifications
├── Experience
├── Interests
├── Skills
│      ├── Skill ID
│      └── Current Level
├── Enrolled Courses
├── Assessment Results
├── Training History
└── Certificates
```

---

## DR-04: Trainers

```text
Trainer
├── ID
├── Name
├── Experience
├── Expertise
│      ├── Skill ID
│      └── Competency Level
└── Associated Courses
```

---

## DR-05: Courses

```text
Course
├── ID
├── Name
├── Description
├── Developed Skills
├── Entry Level
├── Target Level
├── Modules
├── Learning Resources
└── Associated Trainer(s)
```

---

## DR-06: Assessments

```text
Assessment
├── ID
├── Title
├── Course
├── Subject / Topic
├── Questions
├── Deadline
└── Associated Trainer
```

---

## DR-07: Assessment Results

```text
Result
├── Trainee ID
├── Assessment ID
├── Score
├── Topic-wise Performance
└── Attempt Status
```

---

# 17. Business Rules

## BR-01: Role-Based Access

A user should only access features relevant to their role.

---

## BR-02: Competency Consistency

The same competency naming and level system must be used across:

- Trainees.
- Trainers.
- Roles.
- Courses.
- Recommendations.

For example:

Do not use:

```text
"Radar"
```

in one part of the application and:

```text
"Radar Meteorology"
```

in another unless the system explicitly maps them together.

---

## BR-03: Gap Calculation

The competency gap is:

```text
Required Level - Current Level
```

If:

```text
Gap <= 0
```

the trainee does not currently require training for that competency according to the selected requirement.

---

## BR-04: Course Recommendation

A course recommendation must be connected to a skill or competency gap.

A course should not be recommended randomly.

---

## BR-05: Trainer Recommendation

A trainer recommendation must be based primarily on relevant expertise.

Experience and related skills may be used as secondary ranking factors.

---

## BR-06: Assessment Result

An assessment result must be generated after submission.

For MCQs:

```text
Score =
Correct Answers / Total Questions
```

Topic-wise performance may be calculated when questions are associated with topics.

---

# 18. Non-Functional Requirements

## NFR-01: Usability

The system must be understandable for users with different levels of technical expertise.

The interface should:

- Use clear navigation.
- Clearly separate user roles.
- Explain recommendations.
- Avoid unnecessary complexity.

---

## NFR-02: Responsive Design

The MVP should work reasonably on:

- Desktop.
- Laptop.
- Tablet.

Mobile optimization is desirable but should not block MVP completion.

---

## NFR-03: Performance

The MVP should:

- Load quickly with sample data.
- Provide immediate competency analysis.
- Provide immediate recommendation results.

Complex background processing is not required.

---

## NFR-04: Security

For the MVP:

- Basic role separation is required.
- Demo authentication is acceptable.

Production-grade requirements such as:

- Enterprise authentication.
- OTP.
- Email verification.
- Complex authorization infrastructure.

are outside the immediate MVP unless time permits.

---

## NFR-05: Explainability

The system must explain important recommendations.

A user should understand:

- Why a skill gap exists.
- Why a course was recommended.
- Why a trainer was matched.
- Why additional training is suggested.

---

## NFR-06: Maintainability

The application should use structured and consistent data.

Skill names, course mappings, role requirements, and user data should not be duplicated unnecessarily across unrelated parts of the application.

---

# 19. MVP Requirements

Because this is a hackathon prototype with limited development time, the MVP must prioritize a complete connected demonstration.

## Priority 1: Must Demonstrate

### Entry

- Demo login.
- Role selection.

### Trainee

- Trainee profile.
- Current skills.
- Competency levels.
- Target role selection.
- Competency gap analysis.
- Personalized learning recommendation.
- Course enrollment/demo enrollment.
- Course/module page.
- Learning resources.
- Working MCQ assessment.
- Result/performance view.

### Trainer

- Trainer profile.
- Expertise display.
- Course view.
- Basic assessment creation or management.
- Trainee performance view.
- Trainer matching.

### Admin

- Dashboard.
- User overview.
- Course overview.
- Assessment statistics.
- Competency gap analytics.
- Basic participation/progress analytics.

---

# 20. MVP Priority Order

If development time becomes extremely limited, protect these capabilities first:

```text
1. Good and clear user interface

2. Trainee profile and current skills

3. Competency mapping data

4. Target role / competency requirement selection

5. Skill gap analysis

6. Course-to-skill mapping

7. Personalized learning path

8. Trainer matching

9. Working MCQ assessment

10. Performance insight

11. Admin competency analytics
```

These features best demonstrate the unique value of Capacity Connect.

---

# 21. Features Not Required for the MVP

The following should not consume major development time:

- Real email verification.
- OTP authentication.
- Forgot-password workflow.
- Complex user security.
- Multiple admin hierarchies.
- Payment systems.
- Live chat.
- Real-time messaging.
- Video conferencing.
- GPS or location tracking.
- Complex attendance systems.
- Full document verification.
- Advanced certificate verification.
- QR certificate verification.
- Hundreds of courses.
- Large question banks.
- Real-time IMD system integration.
- Complex AI/ML models.
- Native mobile applications.
- Full enterprise database infrastructure.

These may be future enhancements but are not required to prove the core solution.

---

# 22. Sample Data Requirements

The MVP should use a small, realistic, internally consistent demo dataset.

Recommended:

```text
5–10 Sample Trainees
5 Sample Trainers
5–8 Skills
3–5 Roles
5–8 Courses
5–10 MCQs for major assessments
```

Possible skills:

```text
Radar Meteorology
Numerical Weather Prediction
Satellite Meteorology
Synoptic Meteorology
Climate Science
Python / Data Processing
```

Possible roles:

```text
Weather Forecaster
Advanced Weather Forecaster
Meteorological Data Analyst
Radar / Observation Specialist
```

All demo data must use the same skill names and competency scale.

---

# 23. End-to-End MVP Flow

The MVP must be capable of demonstrating the following connected story.

```text
1. Trainee logs in
        ↓
2. Trainee profile is displayed
        ↓
3. Current skills and competency levels are visible
        ↓
4. Trainee selects a target role / competency requirement
        ↓
5. System analyzes competency gaps
        ↓
6. System identifies missing skills
        ↓
7. System recommends a learning path
        ↓
8. System identifies suitable trainer(s)
        ↓
9. Trainee accesses/enrolls in a course
        ↓
10. Trainee accesses learning resources
        ↓
11. Trainee attempts MCQ assessment
        ↓
12. System generates score and topic-wise performance
        ↓
13. System identifies weak areas
        ↓
14. System demonstrates competency progression or next learning need
        ↓
15. Admin views organizational competency gaps and training analytics
```

This is the core demonstration of Capacity Connect.

---

# 24. Core Capacity Connect Model

The entire solution can be represented as:

```text
                     CAPACITY CONNECT
                            │
                            ▼
                     TRAINEE PROFILE
                            │
                            ▼
                   CURRENT COMPETENCIES
                            │
                            ▼
                 REQUIRED COMPETENCIES
                            │
                            ▼
                     SKILL GAP ANALYSIS
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
       LEARNING PATH                TRAINER MATCHING
              │                           │
              └─────────────┬─────────────┘
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
                   UPDATED CAPACITY DATA
                            │
                            ▼
                    NEXT LEARNING NEED
```

Supporting this central flow are:

```text
Professional Profiles
Course Enrollment
Learning Resources
Trainer Workflow
Feedback
Training History
Certificates
Admin Analytics
```

---

# 25. What Makes Capacity Connect Different

Capacity Connect should not be presented as:

> "We made a website where trainees can watch videos and take MCQs."

The stronger solution is:

```text
Existing Training Activities

Courses
+
Learning Resources
+
Question Banks / Assessments
+
Results
+
Training Centres
+
Online / Physical Learning

                ↓

         CAPACITY CONNECT

                ↓

Unified Trainee Profiles
+
Trainer Profiles
+
Enrollment
+
Structured Learning
+
Interactive Assessments
+
Performance Tracking
+
Feedback
+
Training History
+
Competency Mapping
+
Trainer Matching
+
Skill Gap Analysis
+
Personalized Learning Recommendations
+
Organizational Capacity Analytics
```

The strongest project identity is therefore:

> **Capacity Connect is a competency-driven organizational capacity-building platform with learning management capabilities.**

The research material explicitly frames the opportunity as integration and intelligence rather than simply digitizing training content, and identifies competency mapping, trainer discovery, skill-gap analysis, recommendations, and dashboards as important parts of the proposed solution direction. 
---

# 26. Final Success Criteria

The project is successful if the MVP can convincingly demonstrate that Capacity Connect can answer:

### Who is the trainee?

Through a connected professional and learning profile.

### What training are they taking?

Through enrollment and course information.

### What are they learning?

Through structured modules and resources.

### How are they performing?

Through assessments and performance tracking.

### Where are they weak?

Through topic-wise performance and competency insight.

### What competencies do they currently have?

Through structured competency information.

### What competencies do they need?

Through role or training requirements.

### What is the gap?

Through competency-gap analysis.

### What should they learn next?

Through competency-based course recommendations.

### Who can train them?

Through competency mapping and trainer matching.

### What does the organization need to improve?

Through Admin-level competency and training analytics.

---

# 27. Final Requirement Statement

Capacity Connect must function as a connected capacity-building ecosystem rather than a collection of unrelated pages.

The system should connect:

```text
TRAINEE
   ↓
PROFILE
   ↓
SKILLS + COMPETENCIES
   ↓
COURSES + ENROLLMENT
   ↓
LEARNING RESOURCES
   ↓
ASSESSMENT
   ↓
PERFORMANCE
   ↓
TRAINING HISTORY
   ↓
COMPETENCY INSIGHT
   ↓
SKILL GAP
   ↓
LEARNING RECOMMENDATION
   +
TRAINER MATCHING
   ↓
NEXT CAPACITY-BUILDING ACTION
```

The Admin should be able to view this ecosystem at an organizational level.

The Trainer should actively contribute to and monitor the learning process.

The Trainee should receive a connected journey instead of simply seeing a disconnected list of courses and resources.

The final goal is:

> **To connect people, competencies, trainers, learning resources, assessments, performance, and training decisions into a continuous capacity-building lifecycle for IMD.**

---

**End of REQUIREMENTS.md**