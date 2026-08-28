import mongoose, { Schema, Document, Model } from 'mongoose'

// --- 1. USER SCHEMA ---
export interface IUserSkill {
  name: string
  short: string
  level: number
}

export interface IUser extends Document {
  name: string
  email: string
  role: 'trainee' | 'trainer' | 'admin'
  employeeId?: string
  center?: string
  targetRole?: string
  experienceYears?: number
  qualification?: string
  skills: IUserSkill[]
  expertise?: string[]
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['trainee', 'trainer', 'admin'], required: true },
  employeeId: { type: String },
  center: { type: String, default: 'New Delhi' },
  targetRole: { type: String, default: 'Advanced Weather Forecaster' },
  experienceYears: { type: Number, default: 5 },
  qualification: { type: String, default: 'M.Sc. Meteorology' },
  skills: [
    {
      name: { type: String, required: true },
      short: { type: String },
      level: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
  expertise: [{ type: String }],
}, { timestamps: true })

// --- 2. ROLE REQUIREMENT SCHEMA ---
export interface IRoleSkillReq {
  name: string
  requiredLevel: number
}

export interface IRoleRequirement extends Document {
  title: string
  description: string
  requiredSkills: IRoleSkillReq[]
}

const RoleRequirementSchema = new Schema<IRoleRequirement>({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  requiredSkills: [
    {
      name: { type: String, required: true },
      requiredLevel: { type: Number, required: true },
    },
  ],
})

// --- 3. COURSE SCHEMA ---
export interface ICourseModule {
  title: string
  status: 'Completed' | 'In Progress' | 'Locked'
}

export interface ICourse extends Document {
  title: string
  skill: string
  duration: string
  progress: number
  status: 'In Progress' | 'Locked' | 'Completed'
  modules: ICourseModule[]
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  skill: { type: String, required: true },
  duration: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, enum: ['In Progress', 'Locked', 'Completed'], default: 'In Progress' },
  modules: [
    {
      title: { type: String, required: true },
      status: { type: String, enum: ['Completed', 'In Progress', 'Locked'], default: 'Locked' },
    },
  ],
})

// --- 4. ASSESSMENT SCHEMA ---
export interface IQuestion {
  q: string
  options: string[]
  answer: number
}

export interface IAssessment extends Document {
  title: string
  courseTitle: string
  questions: IQuestion[]
  status: 'Published' | 'Draft'
  attempts: number
  averageScore: number
}

const AssessmentSchema = new Schema<IAssessment>({
  title: { type: String, required: true },
  courseTitle: { type: String, required: true },
  questions: [
    {
      q: { type: String, required: true },
      options: [{ type: String }],
      answer: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
  attempts: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
})

// --- MODEL EXPORTS WITH CACHING ---
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const RoleRequirement: Model<IRoleRequirement> = mongoose.models.RoleRequirement || mongoose.model<IRoleRequirement>('RoleRequirement', RoleRequirementSchema)
export const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema)
export const Assessment: Model<IAssessment> = mongoose.models.Assessment || mongoose.model<IAssessment>('Assessment', AssessmentSchema)

