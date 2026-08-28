'use client'

import { useMemo, useState, useEffect } from 'react'
import {
  Activity, ArrowLeft, ArrowRight, Award, BarChart3, BookOpen, BriefcaseBusiness,
  Check, ChevronRight, CircleHelp, ClipboardCheck, Clock3, Cloud, GraduationCap,
  LayoutDashboard, Menu, Search, ShieldCheck, Sparkles, Target, TrendingUp, Users,
  X, UserRound, UserRoundCog, Layers3, Plus, Database, Video, PlusCircle, CheckCircle2,
  FileText, HelpCircle, Eye, GraduationCap as CertIcon
} from 'lucide-react'

interface SkillItem {
  name: string
  short?: string
  level: number
  required?: number
}

interface ModuleItem {
  title: string
  type: 'lecture' | 'quiz' | 'document'
  duration?: string
  status: 'Completed' | 'In Progress' | 'Locked'
}

interface CourseItem {
  id: string
  title: string
  skill: string
  duration: string
  progress: number
  status: 'In Progress' | 'Locked' | 'Completed'
  modules: ModuleItem[]
  enrolledTrainees: { name: string; score: number; progressPercentage: number }[]
}

const defaultSkills: SkillItem[] = [
  { name: 'Radar Meteorology', short: 'Radar', level: 2, required: 4 },
  { name: 'Numerical Weather Prediction', short: 'NWP', level: 3, required: 4 },
  { name: 'Python / Data Processing', short: 'Python', level: 4, required: 4 },
  { name: 'Climate Science', short: 'Climate', level: 3, required: 4 },
  { name: 'Satellite Meteorology', short: 'Satellite', level: 3, required: 4 },
  { name: 'Synoptic Meteorology', short: 'Synoptic', level: 3, required: 4 },
]

const roles = [
  'Weather Forecaster',
  'Advanced Weather Forecaster',
  'Meteorological Data Analyst',
  'Radar / Observation Specialist'
]

const questions = [
  { q: 'Which radar product is most useful for identifying precipitation intensity?', options: ['Base velocity', 'Reflectivity', 'Spectrum width', 'VAD profile'], answer: 1 },
  { q: 'What does a high reflectivity value generally indicate?', options: ['Strong precipitation echoes', 'Low wind shear', 'Clear air', 'Stable temperature'], answer: 0 },
  { q: 'Doppler velocity primarily measures which property?', options: ['Cloud height', 'Rainfall amount', 'Motion toward or away from radar', 'Visibility'], answer: 2 },
  { q: 'A bright band on radar is typically associated with:', options: ['Dry air', 'Melting hydrometeors', 'Strong sunlight', 'Equipment noise'], answer: 1 },
  { q: 'Which action improves confidence in a radar-based warning?', options: ['Use one image only', 'Ignore surface observations', 'Cross-check multiple products', 'Lower the threshold always'], answer: 2 },
]

const initialTrainers = [
  {
    id: 'ds',
    name: 'Dr. Sharma',
    roleTitle: 'Senior Scientist · Radar Applications',
    qualification: 'Ph.D. in Atmospheric Sciences (IIT Delhi)',
    details: '12 Years Doppler Radar operational research at IMD HQ. Specialized in severe convection warning algorithms & dual-polarization radar interpretation.',
    skillMatched: 'Radar Meteorology',
    match: 94,
    years: 12,
    initials: 'DS',
    status: 'Available for Cohort'
  },
  {
    id: 'mi',
    name: 'Dr. Meera Iyer',
    roleTitle: 'Principal Meteorological Officer',
    qualification: 'Ph.D. in NWP & Data Assimilation (IISc Bangalore)',
    details: '9 Years leading ensemble prediction systems and high-resolution numerical weather models.',
    skillMatched: 'Numerical Weather Prediction',
    match: 88,
    years: 9,
    initials: 'MI',
    status: 'Available for Cohort'
  },
  {
    id: 'av',
    name: 'A. K. Verma',
    roleTitle: 'Lead Data Systems Specialist',
    qualification: 'M.Tech Computer Science & Weather Analytics (IIT Kharagpur)',
    details: '8 Years automating satellite data ingestion pipelines & Python meteorological computing.',
    skillMatched: 'Python / Data Processing',
    match: 85,
    years: 8,
    initials: 'AV',
    status: 'Assigned to 2 Cohorts'
  }
]

const initialCourses: CourseItem[] = [
  {
    id: 'c1',
    title: 'Radar Fundamentals & Interpretation',
    skill: 'Radar Meteorology',
    duration: '4 weeks',
    progress: 58,
    status: 'In Progress',
    modules: [
      { title: 'Lecture 1: Radar Electromagnetic Wave Principles', type: 'lecture', duration: '45 mins', status: 'Completed' },
      { title: 'Lecture 2: Reading Base Reflectivity Products', type: 'lecture', duration: '50 mins', status: 'Completed' },
      { title: 'Quiz 1: Reflectivity Intensity Check', type: 'quiz', duration: '15 mins', status: 'In Progress' },
      { title: 'Lecture 3: Doppler Velocity Signatures & Wind Shear', type: 'lecture', duration: '60 mins', status: 'Locked' },
      { title: 'Final Assessment: Operational Radar Case Lab', type: 'quiz', duration: '30 mins', status: 'Locked' }
    ],
    enrolledTrainees: [
      { name: 'Rahul Sharma', score: 82, progressPercentage: 58 },
      { name: 'Priya Nair', score: 74, progressPercentage: 40 },
      { name: 'Vikram Singh', score: 91, progressPercentage: 80 },
      { name: 'Ananya Das', score: 68, progressPercentage: 30 }
    ]
  },
  {
    id: 'c2',
    title: 'Doppler Radar Applications',
    skill: 'Radar Meteorology',
    duration: '3 weeks',
    progress: 0,
    status: 'Locked',
    modules: [
      { title: 'Lecture 1: Doppler Shift Physics in Weather Radars', type: 'lecture', duration: '40 mins', status: 'Locked' },
      { title: 'Lecture 2: VAD Wind Profile Interpretation', type: 'lecture', duration: '45 mins', status: 'Locked' },
      { title: 'Quiz: Severe Storm Velocity Signatures', type: 'quiz', duration: '20 mins', status: 'Locked' }
    ],
    enrolledTrainees: [
      { name: 'Rahul Sharma', score: 0, progressPercentage: 0 },
      { name: 'Priya Nair', score: 0, progressPercentage: 0 }
    ]
  },
  {
    id: 'c3',
    title: 'Applied NWP for Forecasters',
    skill: 'Numerical Weather Prediction',
    duration: '5 weeks',
    progress: 100,
    status: 'Completed',
    modules: [
      { title: 'Lecture 1: Atmospheric Model Parameterization', type: 'lecture', duration: '60 mins', status: 'Completed' },
      { title: 'Lecture 2: Ensemble Forecast Uncertainty', type: 'lecture', duration: '55 mins', status: 'Completed' }
    ],
    enrolledTrainees: [
      { name: 'Rahul Sharma', score: 100, progressPercentage: 100 },
      { name: 'Karan Mehta', score: 88, progressPercentage: 100 }
    ]
  }
]

const trainees = ['Rahul Sharma', 'Priya Nair', 'Vikram Singh', 'Ananya Das', 'Karan Mehta']

function Level({ value, required, compact = false }: { value: number; required?: number; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`} aria-label={`Level ${value} of 5`}>
      <div className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`h-2 w-2 rounded-full ${i <= value ? 'bg-teal-600' : 'bg-slate-200'}`} />
        ))}
      </div>
      <span className="font-semibold text-slate-700">{value}/5</span>
      {required ? <span className="text-slate-400">of {required}</span> : null}
    </div>
  )
}

function Progress({ value, color = 'bg-teal-600' }: { value: number; color?: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  )
}

function Badge({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'green' | 'amber' | 'slate' }) {
  const styles = {
    blue: 'bg-sky-50 text-sky-700',
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    slate: 'bg-slate-100 text-slate-600'
  }
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}>{children}</span>
}

function Stat({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</span>
        <Icon className="h-4 w-4 text-teal-600" />
      </div>
      <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  )
}

export default function Page() {
  const [role, setRole] = useState<'none' | 'trainee' | 'trainer' | 'admin'>('none')
  const [screen, setScreen] = useState('dashboard')
  const [targetRole, setTargetRole] = useState(roles[1])
  const [userSkills, setUserSkills] = useState<SkillItem[]>(defaultSkills)
  const [courseList, setCourseList] = useState<CourseItem[]>(initialCourses)
  const [courseProgress, setCourseProgress] = useState(58)
  const [question, setQuestion] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [score, setScore] = useState<number | null>(null)
  const [mobileNav, setMobileNav] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; loaded: boolean }>({ connected: false, loaded: false })
  const [notification, setNotification] = useState<string | null>(null)

  // Trainer Modal State: Single entry point for adding content
  const [showAddContentModal, setShowAddContentModal] = useState(false)
  const [addMode, setAddMode] = useState<'select' | 'new_course' | 'add_lecture'>('select')

  // Trainer View Course Detail Modal
  const [viewCourseDetail, setViewCourseDetail] = useState<CourseItem | null>(null)

  // Trainee View Trainer Qualification Modal
  const [viewTrainerProfile, setViewTrainerProfile] = useState<typeof initialTrainers[0] | null>(null)

  // Form inputs for Trainer Add
  const [newCourseTitle, setNewCourseTitle] = useState('')
  const [newCourseSkill, setNewCourseSkill] = useState('Radar Meteorology')
  const [newCourseDuration, setNewCourseDuration] = useState('4 weeks')

  const [selectedCourseForModule, setSelectedCourseForModule] = useState(initialCourses[0].id)
  const [newModuleTitle, setNewModuleTitle] = useState('')
  const [newModuleType, setNewModuleType] = useState<'lecture' | 'quiz' | 'document'>('lecture')
  const [newModuleDuration, setNewModuleDuration] = useState('30 mins')

  useEffect(() => {
    fetch('/api/seed')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'ok') {
          setDbStatus({ connected: res.dbConnected, loaded: true })
          if (res.data?.traineeProfile?.skills) {
            setUserSkills(res.data.traineeProfile.skills.map((s: any) => ({
              ...s,
              required: s.name === 'Radar Meteorology' ? 4 : 4
            })))
          }
        }
      })
      .catch(err => console.error('Seed API fetch error:', err))
  }, [])

  const title = useMemo(() => ({
    dashboard: role === 'trainee' ? 'Trainee Dashboard' : role === 'trainer' ? 'Trainer Command Center' : 'Organization Overview',
    profile: 'My Profile',
    roles: 'Select Target Role',
    gap: 'Skill Gap Analysis',
    path: 'Recommended Learning Path',
    course: 'Course Workspace',
    assessment: 'Assessment',
    results: 'Assessment Results',
    expertise: 'Expertise Profile',
    assessments: 'Assessment Management',
    performance: 'Trainee Performance',
    matching: 'Trainer Matching',
    overview: 'Entity Overview'
  } as Record<string, string>)[screen] || 'Dashboard', [screen, role])

  const nav = role === 'trainee'
    ? [['dashboard', 'Dashboard', LayoutDashboard], ['profile', 'My Profile', UserRound], ['roles', 'Target Role', Target], ['gap', 'Skill Gap Analysis', BarChart3], ['path', 'Learning Path', TrendingUp], ['course', 'My Course', BookOpen]]
    : role === 'trainer'
    ? [['dashboard', 'Overview', LayoutDashboard], ['expertise', 'Expertise Profile', Award], ['assessments', 'Assessments', ClipboardCheck], ['performance', 'Trainee Performance', Users], ['matching', 'Trainer Matching', Sparkles]]
    : [['dashboard', 'Admin Dashboard', LayoutDashboard], ['overview', 'Entity Overview', Layers3]]

  function go(next: string) {
    setScreen(next)
    setMobileNav(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function enter(next: 'trainee' | 'trainer' | 'admin') {
    setRole(next)
    setScreen('dashboard')
  }

  function triggerNotification(msg: string) {
    setNotification(msg)
    setTimeout(() => setNotification(null), 4000)
  }

  function handleCreateNewCourse(e: React.FormEvent) {
    e.preventDefault()
    if (!newCourseTitle.trim()) return

    const newCourse: CourseItem = {
      id: 'c_' + Date.now(),
      title: newCourseTitle,
      skill: newCourseSkill,
      duration: newCourseDuration,
      progress: 0,
      status: 'In Progress',
      modules: [
        { title: 'Lecture 1: Introduction & Fundamentals', type: 'lecture', duration: '40 mins', status: 'In Progress' }
      ],
      enrolledTrainees: [
        { name: 'Rahul Sharma', score: 0, progressPercentage: 0 }
      ]
    }

    setCourseList(prev => [newCourse, ...prev])
    setShowAddContentModal(false)
    setAddMode('select')
    setNewCourseTitle('')
    triggerNotification(`New Course "${newCourse.title}" published successfully!`)
  }

  function handleAddModuleToCourse(e: React.FormEvent) {
    e.preventDefault()
    if (!newModuleTitle.trim()) return

    const newMod: ModuleItem = {
      title: newModuleTitle,
      type: newModuleType,
      duration: newModuleDuration,
      status: 'In Progress'
    }

    setCourseList(prev => prev.map(c => {
      if (c.id === selectedCourseForModule) {
        const updatedMods = [...c.modules, newMod]
        if (viewCourseDetail && viewCourseDetail.id === c.id) {
          setViewCourseDetail({ ...c, modules: updatedMods })
        }
        return { ...c, modules: updatedMods }
      }
      return c
    }))

    setShowAddContentModal(false)
    setAddMode('select')
    setNewModuleTitle('')
    triggerNotification(`Added ${newModuleType} "${newMod.title}" to course!`)
  }

  async function handleAssessmentSubmit(answers: number[]) {
    try {
      const res = await fetch('/api/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswers: answers })
      })
      const data = await res.json()
      if (data.success) {
        setScore(data.score)
        if (data.competencyIncreased) {
          setUserSkills(prev => prev.map(s => s.name === 'Radar Meteorology' ? { ...s, level: Math.min(5, s.level + 1) } : s))
        }
      } else {
        const fallScore = Math.round((answers.filter((a, i) => a === questions[i].answer).length / questions.length) * 100)
        setScore(fallScore)
      }
    } catch {
      const fallScore = Math.round((answers.filter((a, i) => a === questions[i].answer).length / questions.length) * 100)
      setScore(fallScore)
    }
  }

  if (role === 'none') {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#063b5c] text-white">
                <Cloud className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight">Capacity Connect</div>
                <div className="text-xs text-slate-500">India Meteorological Department</div>
              </div>
            </div>
            {dbStatus.loaded && (
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                <Database className={`h-3.5 w-3.5 ${dbStatus.connected ? 'text-emerald-600' : 'text-amber-500'}`} />
                {dbStatus.connected ? 'MongoDB Connected' : 'In-Memory State Active'}
              </div>
            )}
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge tone="blue">SMART INDIA HACKATHON 2025</Badge>
              <h1 className="mt-5 max-w-xl text-5xl font-bold leading-tight tracking-tight text-[#063b5c]">
                Build capability.<br /><span className="text-teal-600">Forecast with confidence.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
                A competency intelligence platform that connects skill gaps to personalized learning, expert trainers, and measurable outcomes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-600" />Skill intelligence</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-600" />Personalized pathways</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-teal-600" />Outcome tracking</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Enter the demo</h2>
                <p className="mt-1 text-sm text-slate-500">Choose a role to explore the platform.</p>
              </div>
              <div className="space-y-3">
                {([
                  ['trainee', 'Rahul Sharma', 'Trainee', 'Your personalized learning journey & matched trainer profile', GraduationCap],
                  ['trainer', 'Dr. Sharma', 'Trainer', 'Manage courses, add lectures/quizzes & track trainee performance', UserRoundCog],
                  ['admin', 'IMD Administrator', 'Admin', 'Organization-wide capability & trainer matching', ShieldCheck]
                ] as const).map(([id, name, label, desc, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => enter(id)}
                    className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal-500 hover:bg-teal-50/50 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#063b5c] group-hover:bg-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{name} <span className="ml-1 text-xs font-medium text-teal-700">· {label}</span></div>
                      <div className="mt-0.5 text-xs text-slate-500">{desc}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400">
                <CircleHelp className="h-3.5 w-3.5" /> Demo mode · Next.js 16 + React 19 + MongoDB backend
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-xl animate-bounce">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          {notification}
        </div>
      )}

      {/* Mobile header */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <button onClick={() => setMobileNav(!mobileNav)} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Toggle navigation">
          {mobileNav ? <X /> : <Menu />}
        </button>
        <div className="flex items-center gap-2 font-bold text-[#063b5c]">
          <Cloud className="h-5 w-5 text-teal-600" />Capacity Connect
        </div>
        <button className="rounded-full bg-teal-50 p-2 text-teal-700">
          <UserRound className="h-4 w-4" />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-[#063b5c] text-white transition-transform lg:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500">
            <Cloud className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold">Capacity Connect</div>
            <div className="text-[10px] uppercase tracking-widest text-sky-200">IMD Capability Hub</div>
          </div>
        </div>

        <div className="border-b border-white/10 px-5 py-4">
          <div className="text-[10px] uppercase tracking-widest text-sky-200">Signed in as</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-semibold">
              {role === 'trainee' ? 'Rahul Sharma' : role === 'trainer' ? 'Dr. Sharma' : 'IMD Administrator'}
            </span>
            <Badge tone="blue">{role}</Badge>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {nav.map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id as string)}
              aria-current={screen === id ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${screen === id ? 'bg-white/15 font-semibold text-white' : 'text-sky-100 hover:bg-white/10'}`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              {screen === id && <ChevronRight className="ml-auto h-4 w-4" />}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button onClick={() => setRole('none')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sky-100 hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />Exit demo
          </button>
        </div>
      </aside>

      {mobileNav && <button className="fixed inset-0 z-20 bg-slate-950/30 lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation" />}

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Navigation Header */}
        <header className="hidden h-20 items-center justify-between border-b border-slate-200 bg-white px-8 lg:flex">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-slate-400">IMD / Capacity Intelligence</div>
            <h1 className="mt-1 text-xl font-bold text-[#063b5c]">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* TRAINER FEATURE: Single unified 'Add Course / Content' top-right button */}
            {role === 'trainer' && (
              <button
                type="button"
                onClick={() => {
                  setShowAddContentModal(true)
                  setAddMode('select')
                }}
                className="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <PlusCircle className="h-4 w-4" /> Add Course / Content
              </button>
            )}

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg">
              <Database className={`h-3.5 w-3.5 ${dbStatus.connected ? 'text-emerald-600' : 'text-amber-500'}`} />
              {dbStatus.connected ? 'MongoDB Live' : 'Memory API'}
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                {role === 'admin' ? 'IA' : role === 'trainer' ? 'DS' : 'RS'}
              </div>
              <div className="text-sm">
                <div className="font-semibold">
                  {role === 'trainee' ? 'Rahul Sharma' : role === 'trainer' ? 'Dr. Sharma' : 'IMD Admin'}
                </div>
                <div className="text-xs text-slate-500 capitalize">{role} account</div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {screen === 'dashboard' && role === 'trainee' && (
            <TraineeDashboard
              skills={userSkills}
              targetRole={targetRole}
              onViewTrainerProfile={t => setViewTrainerProfile(t)}
              go={go}
            />
          )}
          {screen === 'profile' && <Profile skills={userSkills} />}
          {screen === 'roles' && <RoleSelect target={targetRole} setTarget={setTargetRole} go={go} />}
          {screen === 'gap' && <Gap skills={userSkills} targetRole={targetRole} go={go} />}
          {screen === 'path' && <LearningPath go={go} />}
          {screen === 'course' && <Course progress={courseProgress} setProgress={setCourseProgress} courseList={courseList} go={go} />}
          {screen === 'assessment' && (
            <Assessment
              question={question}
              setQuestion={setQuestion}
              selected={selected}
              setSelected={setSelected}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              score={score}
              onSubmit={handleAssessmentSubmit}
              go={go}
            />
          )}
          {screen === 'results' && <Results score={score} go={go} />}
          {screen === 'dashboard' && role === 'trainer' && (
            <TrainerDashboard
              skills={userSkills}
              courseList={courseList}
              onSelectCourse={c => setViewCourseDetail(c)}
              onOpenAddContent={() => {
                setShowAddContentModal(true)
                setAddMode('select')
              }}
              go={go}
            />
          )}
          {screen === 'expertise' && <Expertise skills={userSkills} />}
          {screen === 'assessments' && <AssessmentManagement showCreate={showCreate} setShowCreate={setShowCreate} />}
          {screen === 'performance' && <Performance />}
          {screen === 'matching' && <Matching />}
          {screen === 'dashboard' && role === 'admin' && <AdminDashboard go={go} />}
          {screen === 'overview' && <Overview courseList={courseList} />}
        </main>
      </div>

      {/* SINGLE UNIFIED TRAINER CONTENT CREATION MODAL */}
      {showAddContentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-teal-600" />
                <h3 className="text-lg font-bold text-[#063b5c]">
                  {addMode === 'select' ? 'Choose Content Creation Type' : addMode === 'new_course' ? 'Create New Training Course' : 'Add Lecture / Quiz to Existing Course'}
                </h3>
              </div>
              <button type="button" onClick={() => setShowAddContentModal(false)}>
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            {/* STEP 1: SELECT OPTION */}
            {addMode === 'select' && (
              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={() => setAddMode('new_course')}
                  className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-5 text-left transition hover:border-teal-500 hover:bg-teal-50/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-bold group-hover:bg-teal-600 group-hover:text-white transition">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-teal-800">1. Add New Course</h4>
                    <p className="mt-0.5 text-xs text-slate-500">Create a new course catalog entry with title, skill area & duration.</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600" />
                </button>

                <button
                  type="button"
                  onClick={() => setAddMode('add_lecture')}
                  className="group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-5 text-left transition hover:border-teal-500 hover:bg-teal-50/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-800 font-bold group-hover:bg-sky-600 group-hover:text-white transition">
                    <Video className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 group-hover:text-sky-800">2. Add Lecture, Quiz or Assessment</h4>
                    <p className="mt-0.5 text-xs text-slate-500">Attach a video lecture, quiz check, or assessment module to an existing course.</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-sky-600" />
                </button>
              </div>
            )}

            {/* STEP 2A: ADD NEW COURSE FORM */}
            {addMode === 'new_course' && (
              <form onSubmit={handleCreateNewCourse} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Course Title</label>
                  <input
                    type="text"
                    required
                    value={newCourseTitle}
                    onChange={e => setNewCourseTitle(e.target.value)}
                    placeholder="e.g. Advanced Doppler Radar Velocity Analysis"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Competency Skill</label>
                    <select
                      value={newCourseSkill}
                      onChange={e => setNewCourseSkill(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                    >
                      {defaultSkills.map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Duration</label>
                    <input
                      type="text"
                      value={newCourseDuration}
                      onChange={e => setNewCourseDuration(e.target.value)}
                      placeholder="e.g. 4 weeks"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAddMode('select')}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                  >
                    <Plus className="h-4 w-4" /> Publish Course
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2B: ADD LECTURE / QUIZ TO EXISTING COURSE */}
            {addMode === 'add_lecture' && (
              <form onSubmit={handleAddModuleToCourse} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Select Target Existing Course</label>
                  <select
                    value={selectedCourseForModule}
                    onChange={e => setSelectedCourseForModule(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                  >
                    {courseList.map(c => (
                      <option key={c.id} value={c.id}>{c.title} ({c.skill})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Content Type</label>
                  <select
                    value={newModuleType}
                    onChange={e => setNewModuleType(e.target.value as any)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none"
                  >
                    <option value="lecture">Video Lecture / Presentation</option>
                    <option value="quiz">Interactive Assessment / Quiz</option>
                    <option value="document">Reading Document / Lab Note</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Content / Lecture Title</label>
                  <input
                    type="text"
                    required
                    value={newModuleTitle}
                    onChange={e => setNewModuleTitle(e.target.value)}
                    placeholder="e.g. Lecture 4: Microburst & Gust Front Detection"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Estimated Duration</label>
                  <input
                    type="text"
                    value={newModuleDuration}
                    onChange={e => setNewModuleDuration(e.target.value)}
                    placeholder="e.g. 35 mins"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none"
                  />
                </div>

                <div className="mt-6 flex justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAddMode('select')}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                  >
                    <Plus className="h-4 w-4" /> Add Content to Course
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* TRAINER VIEW COURSE DETAIL & TRAINEE PERFORMANCE MODAL */}
      {viewCourseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <Badge tone="blue">{viewCourseDetail.skill}</Badge>
                <h3 className="mt-1 text-2xl font-bold text-[#063b5c]">{viewCourseDetail.title}</h3>
                <p className="mt-1 text-xs text-slate-500">Duration: {viewCourseDetail.duration} · Status: {viewCourseDetail.status}</p>
              </div>
              <button type="button" onClick={() => setViewCourseDetail(null)}>
                <X className="h-6 w-6 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            {/* Course Modules / Demo Lectures & Quizzes */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-[#063b5c] flex items-center gap-2">
                  <Video className="h-4 w-4 text-teal-600" /> Demo Lectures & Quizzes in Course
                </h4>
                <button
                  onClick={() => {
                    setSelectedCourseForModule(viewCourseDetail.id)
                    setAddMode('add_lecture')
                    setShowAddContentModal(true)
                  }}
                  className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Lecture/Quiz
                </button>
              </div>

              <div className="space-y-2">
                {viewCourseDetail.modules.map((m, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm">
                    <div className="flex items-center gap-3">
                      {m.type === 'lecture' ? (
                        <Video className="h-4 w-4 text-sky-600" />
                      ) : (
                        <HelpCircle className="h-4 w-4 text-emerald-600" />
                      )}
                      <div>
                        <div className="font-semibold text-slate-800">{m.title}</div>
                        <div className="text-xs text-slate-500">{m.type.toUpperCase()} {m.duration ? `· ${m.duration}` : ''}</div>
                      </div>
                    </div>
                    <Badge tone={m.status === 'Completed' ? 'green' : m.status === 'In Progress' ? 'amber' : 'slate'}>
                      {m.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Trainees Performance Table */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h4 className="font-bold text-[#063b5c] mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-teal-600" /> Trainee Performance in This Course
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Trainee Name</th>
                      <th className="px-4 py-3">Assessment Score</th>
                      <th className="px-4 py-3">Module Progress</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {viewCourseDetail.enrolledTrainees.map(t => (
                      <tr key={t.name}>
                        <td className="px-4 py-3 font-semibold text-slate-900">{t.name}</td>
                        <td className="px-4 py-3 font-bold text-teal-700">{t.score > 0 ? `${t.score}%` : 'Not Taken'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Progress value={t.progressPercentage} />
                            <span className="text-xs font-semibold text-slate-600">{t.progressPercentage}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge tone={t.score >= 75 ? 'green' : t.score > 0 ? 'amber' : 'slate'}>
                            {t.score >= 75 ? 'Top Performer' : t.score > 0 ? 'Needs Practice' : 'Enrolled'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRAINEE VIEW TRAINER QUALIFICATION MODAL */}
      {viewTrainerProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800 text-lg">
                  {viewTrainerProfile.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#063b5c]">{viewTrainerProfile.name}</h3>
                  <p className="text-xs text-slate-500">{viewTrainerProfile.roleTitle}</p>
                </div>
              </div>
              <button type="button" onClick={() => setViewTrainerProfile(null)}>
                <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-600">Expertise Match</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">{viewTrainerProfile.skillMatched}</span>
                  <Badge tone="green">{viewTrainerProfile.match}% Competency Match</Badge>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  <CertIcon className="h-4 w-4 text-teal-600" /> Academic & Research Qualifications
                </div>
                <div className="text-sm font-bold text-slate-900">{viewTrainerProfile.qualification}</div>
                <p className="mt-2 text-xs leading-5 text-slate-600">{viewTrainerProfile.details}</p>
              </div>

              <div className="flex justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>Experience: <b>{viewTrainerProfile.years} Years</b></span>
                <span>Status: <b className="text-emerald-700">{viewTrainerProfile.status}</b></span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewTrainerProfile(null)}
                className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PageIntro({ eyebrow, title, desc, children }: { eyebrow: string; title: string; desc: string; children?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-teal-600">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#063b5c]">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{desc}</p>
      </div>
      {children}
    </div>
  )
}

function TraineeDashboard({
  skills,
  targetRole,
  onViewTrainerProfile,
  go
}: {
  skills: SkillItem[]
  targetRole: string
  onViewTrainerProfile: (t: typeof initialTrainers[0]) => void
  go: (x: string) => void
}) {
  const radarSkill = skills.find(s => s.name === 'Radar Meteorology') || { level: 2 }
  const topMatchedTrainer = initialTrainers[0] // Dr. Sharma

  return (
    <>
      <PageIntro eyebrow="Good morning, Rahul" title="Your capability journey" desc={`Close the gap between your current skills and your target role (${targetRole}).`}>
        <button onClick={() => go('gap')} className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700">
          Analyze My Skill Gap <ArrowRight className="h-4 w-4" />
        </button>
      </PageIntro>

      {/* Target Role Card */}
      <div className="mb-6 rounded-2xl border border-teal-200 bg-gradient-to-r from-teal-900 to-[#063b5c] p-6 text-white shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 ring-1 ring-teal-400/30">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-teal-300">Your Selected Target Role</div>
              <h3 className="mt-1 text-2xl font-bold text-white">{targetRole}</h3>
              <p className="mt-1 text-xs text-sky-100">
                {targetRole === 'Advanced Weather Forecaster'
                  ? 'Requires Level 4 proficiency in Radar Meteorology & NWP modeling.'
                  : targetRole === 'Weather Forecaster'
                  ? 'Focuses on operational forecasting and daily synoptic analysis.'
                  : targetRole === 'Meteorological Data Analyst'
                  ? 'Focuses on Python processing, satellite imagery, and climate analytics.'
                  : 'Specializes in radar calibration and observation sensor networks.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => go('roles')}
              className="flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-teal-400 transition"
            >
              Change Target Role <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1.8fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#063b5c]">Your Competency Overview</h3>
              <p className="mt-1 text-xs text-slate-500">Current proficiency across core IMD capabilities</p>
            </div>
            <Badge tone="green">Profile updated</Badge>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {skills.slice(0, 4).map(s => (
              <div key={s.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{s.name}</span>
                  <Level value={s.level} compact />
                </div>
                <Progress value={s.level * 20} />
              </div>
            ))}
          </div>
          <button onClick={() => go('profile')} className="mt-6 text-sm font-semibold text-teal-700 hover:text-teal-800">
            View full profile <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </button>
        </section>

        {/* Priority Skill Gap AND Matched Trainer Card side-by-side */}
        <div className="grid gap-5 sm:grid-cols-2">
          <section className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-800">
                <Activity className="h-5 w-5" />
                <h3 className="font-bold">Priority skill gap</h3>
              </div>
              <h4 className="mt-4 text-lg font-bold text-slate-900">Radar Meteorology</h4>
              <div className="mt-2">
                <Level value={radarSkill.level} required={4} />
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-600">
                {radarSkill.level >= 4 ? 'You have met the required target!' : 'Target role requires Level 4 radar interpretation.'}
              </p>
            </div>
            <button onClick={() => go('gap')} className="mt-4 flex items-center gap-2 text-xs font-bold text-amber-800">
              Review gap <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </section>

          {/* FEATURE 3: Matched Expert Trainer Card beside Priority Skill Gap */}
          <section className="rounded-xl border border-teal-200 bg-teal-50/70 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal-800">
                  <Sparkles className="h-5 w-5 text-teal-600" />
                  <h3 className="font-bold text-sm">Perfect Matched Trainer</h3>
                </div>
                <Badge tone="green">{topMatchedTrainer.match}% Match</Badge>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-600 font-bold text-white text-sm shadow">
                  {topMatchedTrainer.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{topMatchedTrainer.name}</h4>
                  <p className="text-xs text-slate-500">{topMatchedTrainer.roleTitle}</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-600 line-clamp-2">
                {topMatchedTrainer.qualification}
              </p>
            </div>

            <button
              onClick={() => onViewTrainerProfile(topMatchedTrainer)}
              className="mt-4 flex items-center gap-1.5 rounded-lg border border-teal-600 bg-white px-3 py-2 text-xs font-bold text-teal-700 shadow-sm hover:bg-teal-100 transition"
            >
              <Eye className="h-3.5 w-3.5" /> View Qualifications & Credentials
            </button>
          </section>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <Badge tone="blue">Recommended next step</Badge>
              <h3 className="mt-2 font-bold text-[#063b5c]">Advance toward {targetRole}</h3>
              <p className="mt-1 text-sm text-slate-500">3 skills to strengthen · 2 courses · 7 weeks estimated</p>
            </div>
          </div>
          <button onClick={() => go('path')} className="flex items-center justify-center gap-2 rounded-lg border border-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50">
            View learning path <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  )
}

function Profile({ skills }: { skills: SkillItem[] }) {
  return (
    <>
      <PageIntro eyebrow="Trainee profile" title="Rahul Sharma" desc="Meteorological Officer · Regional Meteorological Centre, New Delhi" />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-800">RS</div>
            <div>
              <h3 className="text-lg font-bold">Rahul Sharma</h3>
              <p className="text-sm text-slate-500">Employee ID: IMD-2048</p>
            </div>
          </div>
          <dl className="mt-7 space-y-4 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <dt className="text-slate-500">Experience</dt>
              <dd className="font-semibold">5 years</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <dt className="text-slate-500">Qualification</dt>
              <dd className="font-semibold">M.Sc. Meteorology</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Location</dt>
              <dd className="font-semibold">New Delhi</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-[#063b5c]">Current competency profile</h3>
          <div className="mt-6 space-y-5">
            {skills.map(s => (
              <div key={s.name}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm font-medium">{s.name}</span>
                  <Level value={s.level} />
                </div>
                <Progress value={s.level * 20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function RoleSelect({ target, setTarget, go }: { target: string; setTarget: (x: string) => void; go: (x: string) => void }) {
  return (
    <>
      <PageIntro eyebrow="Career direction" title="Choose your target role" desc="Your competency gap and learning path will be calculated against this role." />
      <div className="grid gap-4 md:grid-cols-2">
        {roles.map((r, i) => (
          <button
            key={r}
            onClick={() => setTarget(r)}
            aria-pressed={target === r}
            className={`rounded-xl border p-5 text-left transition ${target === r ? 'border-teal-600 bg-teal-50 ring-1 ring-teal-600' : 'border-slate-200 bg-white hover:border-teal-300'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              {target === r && <Check className="h-5 w-5 text-teal-600" />}
            </div>
            <h3 className="mt-5 font-bold">{r}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {i === 0 ? 'Build reliable day-to-day forecast operations.' : i === 1 ? 'Lead complex forecasting and warning decisions.' : i === 2 ? 'Turn climate and observation data into insight.' : 'Specialize in radar systems and observation quality.'}
            </p>
            <div className="mt-4 text-xs font-semibold text-slate-500">{i + 3} core competencies</div>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={() => go('gap')} className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
          Analyze against this role <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}

function Gap({ skills, targetRole, go }: { skills: SkillItem[]; targetRole: string; go: (x: string) => void }) {
  return (
    <>
      <PageIntro eyebrow="Step 1 · Understand" title="Your skill gap" desc={`Comparing your current competency profile with the requirements for ${targetRole}.`}>
        <Badge tone="blue">Target role · {targetRole}</Badge>
      </PageIntro>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="font-bold text-[#063b5c]">Competency comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Skill</th>
                <th className="px-5 py-3 font-semibold">Current level</th>
                <th className="px-5 py-3 font-semibold">Required level</th>
                <th className="px-5 py-3 font-semibold">Gap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {skills.map(s => {
                const req = s.required || 4
                const gapVal = Math.max(0, req - s.level)
                return (
                  <tr key={s.name}>
                    <td className="px-5 py-4 font-medium">{s.name}</td>
                    <td className="px-5 py-4"><Level value={s.level} /></td>
                    <td className="px-5 py-4"><Level value={req} /></td>
                    <td className="px-5 py-4">
                      {gapVal > 0 ? (
                        <Badge tone="amber">{gapVal} level{gapVal > 1 ? 's' : ''}</Badge>
                      ) : (
                        <Badge tone="green">On target</Badge>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <Target className="h-5 w-5" />Competency gaps detected
        </div>
        <p className="mt-2 text-sm text-slate-600">Your personalized path prioritizes the skills with the highest distance from the target role.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {skills.filter(s => (s.required || 4) > s.level).map(s => (
            <div key={s.name} className="rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm">
              <span className="font-semibold">{s.name}</span>
              <span className="ml-2 text-amber-700">Gap: {(s.required || 4) - s.level} level{((s.required || 4) - s.level) > 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
        <button onClick={() => go('path')} className="mt-5 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
          View my learning path <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}

function LearningPath({ go }: { go: (x: string) => void }) {
  return (
    <>
      <PageIntro eyebrow="Step 2 · Build" title="Your recommended path" desc="A focused sequence designed to move you from your current competency to the target role." />
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-0">
            {[
              ['1', 'Radar Fundamentals & Interpretation', 'Radar Meteorology', 'Move from Level 2 to Level 3', 'Build the core concepts needed to read radar products with confidence.'],
              ['2', 'Doppler Radar Applications', 'Radar Meteorology', 'Move from Level 3 to Level 4', 'Apply velocity and reflectivity products to real forecasting decisions.'],
              ['3', 'Advanced Warning Decision Lab', 'Synoptic Meteorology', 'Move from Level 3 to Level 4', 'Connect radar signals with synoptic context for sharper warnings.']
            ].map(([n, title, skill, level, why], i) => (
              <div key={n} className="relative flex gap-4 pb-8 last:pb-0">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">{n}</div>
                {i < 2 && <div className="absolute left-4 top-8 h-full w-px bg-teal-200" />}
                <div className="flex-1 rounded-lg border border-slate-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Badge tone="blue">{skill}</Badge>
                      <h3 className="mt-2 font-bold">{title}</h3>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{level}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    <span className="font-semibold text-slate-700">Why this course?</span> {why}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => go('course')} className="mt-8 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
            Start learning path <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800">DS</div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-600">Step 3 · Connect</div>
              <h3 className="mt-1 font-bold">Recommended trainer</h3>
            </div>
          </div>
          <h4 className="mt-6 text-lg font-bold">Dr. Sharma</h4>
          <p className="mt-1 text-sm text-slate-500">Senior Scientist · Radar Applications</p>
          <div className="mt-5">
            <Level value={5} />
            <p className="mt-2 text-sm leading-6 text-slate-600">94% match for your radar learning path. 12 years of experience with Doppler systems.</p>
          </div>
          <button onClick={() => go('matching')} className="mt-5 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            View trainer match detail
          </button>
        </div>
      </div>
    </>
  )
}

function Course({ progress, setProgress, courseList, go }: { progress: number; setProgress: (n: number) => void; courseList: CourseItem[]; go: (x: string) => void }) {
  return (
    <>
      <PageIntro eyebrow="Step 4 · Learn" title={courseList[0]?.title || 'Radar Fundamentals & Interpretation'} desc="Build the core concepts needed to interpret radar products for operational forecasting.">
        <Badge tone="blue">In progress</Badge>
      </PageIntro>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock3 className="h-4 w-4" />{courseList[0]?.duration || '4 weeks'} <span>·</span>
              <BookOpen className="h-4 w-4" />6 modules
            </div>
            <h3 className="mt-2 text-xl font-bold text-[#063b5c]">Course progress</h3>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-teal-700">{progress}%</div>
            <div className="text-xs text-slate-500">completed</div>
          </div>
        </div>
        <Progress value={progress} />
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h3 className="font-bold text-[#063b5c]">Course modules</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {['Radar Fundamentals', 'Reading Reflectivity Products', 'Velocity & Motion', 'Precipitation Estimation', 'Operational Case Studies', 'Final Assessment'].map((m, i) => (
            <div key={m} className="flex items-center gap-4 px-5 py-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${i < 2 ? 'bg-emerald-100 text-emerald-700' : i === 2 ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-400'}`}>
                {i < 2 ? <Check className="h-4 w-4" /> : i === 2 ? <BookOpen className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{m}</div>
                <div className="mt-1 text-xs text-slate-500">{i < 2 ? 'Completed' : i === 2 ? 'In progress' : 'Locked'}</div>
              </div>
              {i === 2 && (
                <button onClick={() => setProgress(Math.min(100, progress + 14))} className="rounded-lg border border-teal-600 px-3 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-50">
                  Continue
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button onClick={() => go('assessment')} className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
          Take assessment <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </>
  )
}

function Assessment({
  question,
  setQuestion,
  selected,
  setSelected,
  userAnswers,
  setUserAnswers,
  score,
  onSubmit,
  go
}: {
  question: number
  setQuestion: (n: number) => void
  selected: number | null
  setSelected: (n: number | null) => void
  userAnswers: (number | null)[]
  setUserAnswers: React.Dispatch<React.SetStateAction<(number | null)[]>>
  score: number | null
  onSubmit: (answers: number[]) => void
  go: (x: string) => void
}) {
  const item = questions[question]

  if (score !== null) return <Results score={score} go={go} />

  const handleNext = () => {
    if (selected === null) return
    const newAnswers = [...userAnswers]
    newAnswers[question] = selected

    if (question === questions.length - 1) {
      setUserAnswers(newAnswers)
      onSubmit(newAnswers as number[])
      go('results')
    } else {
      setUserAnswers(newAnswers)
      setQuestion(question + 1)
      setSelected(null)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageIntro eyebrow="Step 5 · Validate" title="Radar competency assessment" desc="Check your understanding through five applied questions.">
        <span className="text-sm font-semibold text-slate-500">Question {question + 1} of {questions.length}</span>
      </PageIntro>

      <div className="mb-6 flex gap-1">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= question ? 'bg-teal-600' : 'bg-slate-200'}`} />
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-xs font-bold uppercase tracking-widest text-teal-600">Question {question + 1}</div>
        <h3 className="mt-4 text-xl font-bold leading-8 text-[#063b5c]">{item.q}</h3>

        <div className="mt-7 space-y-3">
          {item.options.map((o, i) => (
            <button
              key={o}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition ${selected === i ? 'border-teal-600 bg-teal-50 text-teal-900' : 'border-slate-200 hover:border-teal-300'}`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${selected === i ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 text-slate-500'}`}>
                {String.fromCharCode(65 + i)}
              </span>
              {o}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {question === questions.length - 1 ? 'Submit assessment' : 'Next question'} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Results({ score, go }: { score: number | null; go: (x: string) => void }) {
  const displayScore = score !== null ? score : 80
  return (
    <>
      <PageIntro eyebrow="Step 6 · Grow" title="Your assessment results" desc="Your result updates the competency loop and promotes your skill level.">
        <Badge tone="green">Assessment complete</Badge>
      </PageIntro>

      <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-8 border-teal-100 bg-teal-50 text-3xl font-bold text-teal-700">
            {displayScore}%
          </div>
          <h3 className="mt-5 text-lg font-bold">{displayScore >= 70 ? 'Strong progress' : 'Review recommended'}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {displayScore >= 70 ? 'Competency target unlocked! Skill level promoted.' : 'Try revisiting Doppler Radar Application module.'}
          </p>
          <div className="mt-6 rounded-lg bg-slate-50 p-3 text-left text-sm">
            <span className="text-slate-500">Radar Meteorology Level Update</span>
            <div className="mt-2 flex items-center justify-between">
              <Level value={2} />
              <ArrowRight className="h-4 w-4 text-slate-400" />
              <Level value={3} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-[#063b5c]">Topic performance</h3>
          <div className="mt-6 space-y-5">
            {[
              ['Radar Principles', 90],
              ['Doppler Radar', 70],
              ['Operational Application', 80]
            ].map(([name, value]) => (
              <div key={name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{name}</span>
                  <span className="font-bold">{value}%</span>
                </div>
                <Progress value={value as number} color={value === 60 ? 'bg-amber-500' : 'bg-teal-600'} />
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 font-semibold text-amber-900">
              <Sparkles className="h-4 w-4" />Next recommendation
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Revisit Doppler Radar Applications to strengthen your velocity analysis before moving to advanced warning decision labs.
            </p>
          </div>

          <button onClick={() => go('dashboard')} className="mt-6 flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
            Return to dashboard <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  )
}

function TrainerDashboard({
  skills,
  courseList,
  onSelectCourse,
  onOpenAddContent,
  go
}: {
  skills: SkillItem[]
  courseList: CourseItem[]
  onSelectCourse: (c: CourseItem) => void
  onOpenAddContent: () => void
  go: (x: string) => void
}) {
  return (
    <>
      <PageIntro eyebrow="Good morning, Dr. Sharma" title="Trainer command center" desc="Support your trainees with expertise, assessments, lectures, and targeted interventions." />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Users} label="Supervised trainees" value="24" sub="+3 this month" />
        <Stat icon={ClipboardCheck} label="Active assessments" value="8" sub="2 need review" />
        <Stat icon={Award} label="Average outcome" value="82%" sub="Across your cohorts" />
      </div>

      {/* Trainer Published Courses & Lectures List - Interactive Cards */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-[#063b5c]">Published Lectures & Courses</h3>
            <p className="mt-0.5 text-xs text-slate-500">Click any course to inspect demo lectures, quizzes, and trainee performance</p>
          </div>
          <button onClick={onOpenAddContent} className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800">
            <Plus className="h-3.5 w-3.5" /> Add Content / Course
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {courseList.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectCourse(c)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-teal-500 hover:bg-teal-50/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <Badge tone={c.status === 'Completed' ? 'green' : 'blue'}>{c.skill}</Badge>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold group-hover:text-teal-600">Inspect Course →</span>
              </div>
              <h4 className="mt-3 text-base font-bold text-slate-900 group-hover:text-teal-900">{c.title}</h4>
              <p className="mt-1 text-xs text-slate-500">{c.modules.length} Modules / Lectures Attached</p>
              
              <div className="mt-4 border-t border-slate-200/60 pt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Duration: {c.duration}</span>
                <span className="font-semibold text-teal-700">{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-[#063b5c]">Trainee progress</h3>
          <div className="mt-5 space-y-4">
            {trainees.slice(0, 4).map((n, i) => (
              <div key={n} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-[#063b5c]">
                  {n.split(' ').map(x => x[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{n}</span>
                    <span className="text-slate-500">{[78, 64, 91, 46][i]}%</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={[78, 64, 91, 46][i]} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => go('performance')} className="mt-6 text-sm font-semibold text-teal-700">
            View all performance <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-[#063b5c]">Your expertise</h3>
          <div className="mt-5 space-y-4">
            {skills.slice(0, 4).map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="text-sm">{s.name}</span>
                <Level value={[5, 4, 3, 4][i]} compact />
              </div>
            ))}
          </div>
          <button onClick={() => go('expertise')} className="mt-6 text-sm font-semibold text-teal-700">
            Manage expertise <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </>
  )
}

function Expertise({ skills }: { skills: SkillItem[] }) {
  return (
    <>
      <PageIntro eyebrow="Trainer profile" title="Expertise profile" desc="Keep your demonstrated competency and experience visible for intelligent trainer matching." />
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-800">DS</div>
          <div>
            <h3 className="text-lg font-bold">Dr. Sharma</h3>
            <p className="text-sm text-slate-500">Senior Scientist · 12 years experience</p>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {skills.slice(0, 5).map((s, i) => (
            <div key={s.name} className="rounded-lg border border-slate-100 p-4">
              <div className="flex justify-between">
                <span className="font-medium">{s.name}</span>
                <Level value={[5, 4, 3, 4, 4][i]} />
              </div>
              <p className="mt-2 text-xs text-slate-500">{[12, 10, 7, 8, 6][i]} years applied experience</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function AssessmentManagement({ showCreate, setShowCreate }: { showCreate: boolean; setShowCreate: (x: boolean) => void }) {
  return (
    <>
      <PageIntro eyebrow="Trainer tools" title="Assessment management" desc="Create and monitor checks that connect learning activity to competency outcomes.">
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" />Create assessment
        </button>
      </PageIntro>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Assessment</th>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Attempts</th>
              <th className="px-5 py-3">Average</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              ['Radar Fundamentals Check', 'Radar Fundamentals', 42, '78%', 'Published'],
              ['Doppler Applications Quiz', 'Doppler Radar', 18, '71%', 'Published'],
              ['Warning Decision Lab', 'Operational Cases', 0, '—', 'Draft']
            ].map(r => (
              <tr key={r[0]}>
                <td className="px-5 py-4 font-semibold">{r[0]}</td>
                <td className="px-5 py-4 text-slate-500">{r[1]}</td>
                <td className="px-5 py-4">{r[2]}</td>
                <td className="px-5 py-4">{r[3]}</td>
                <td className="px-5 py-4"><Badge tone={r[4] === 'Published' ? 'green' : 'slate'}>{r[4]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">Create assessment</h3>
              <button onClick={() => setShowCreate(false)}><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <div className="mt-5 space-y-4">
              <label className="block text-sm font-medium">
                Assessment title
                <input className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-teal-600" placeholder="e.g. Radar Principles Check" />
              </label>
              <label className="block text-sm font-medium">
                Course
                <select className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5">
                  <option>Radar Fundamentals & Interpretation</option>
                  <option>Doppler Radar Applications</option>
                </select>
              </label>
              <label className="block text-sm font-medium">
                First question
                <textarea className="mt-2 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:border-teal-600" placeholder="Write an applied question..." />
              </label>
            </div>
            <button onClick={() => setShowCreate(false)} className="mt-6 w-full rounded-lg bg-teal-600 py-2.5 text-sm font-semibold text-white">
              Save draft
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function Performance() {
  return (
    <>
      <PageIntro eyebrow="Trainer tools" title="Trainee performance" desc="Track assessment outcomes and competency movement across your supervised cohort." />
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Trainee</th>
              <th className="px-5 py-3">Target role</th>
              <th className="px-5 py-3">Latest assessment</th>
              <th className="px-5 py-3">Competency movement</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trainees.map((n, i) => (
              <tr key={n}>
                <td className="px-5 py-4 font-semibold">{n}</td>
                <td className="px-5 py-4 text-slate-500">{i % 2 ? 'Weather Forecaster' : 'Advanced Weather Forecaster'}</td>
                <td className="px-5 py-4 font-semibold">{[82, 74, 91, 68, 79][i]}%</td>
                <td className="px-5 py-4"><Level value={Math.min(5, 2 + i % 3)} /></td>
                <td className="px-5 py-4"><Badge tone={i === 3 ? 'amber' : 'green'}>{i === 3 ? 'Needs attention' : 'On track'}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Matching() {
  return (
    <>
      <PageIntro eyebrow="Intelligent matching" title="Find the right trainer" desc="Ranked recommendations for the Radar Meteorology competency gap." />
      <div className="space-y-4">
        {initialTrainers.map((t, i) => (
          <div key={t.name} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800">{t.initials}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold">{t.name}</h3>
                {i === 0 && <Badge tone="green">Best match</Badge>}
              </div>
              <p className="mt-1 text-sm font-medium text-slate-700">{t.qualification}</p>
              <p className="mt-1 text-xs text-slate-500">Expertise: {t.skillMatched} · {t.roleTitle}</p>
              <p className="mt-2 text-xs text-teal-800 font-semibold">{t.status}</p>
            </div>
            <div className="sm:w-32">
              <div className="text-right text-2xl font-bold text-teal-700">{t.match}%</div>
              <Progress value={t.match} />
            </div>
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">View profile</button>
          </div>
        ))}
      </div>
    </>
  )
}

function AdminDashboard({ go }: { go: (x: string) => void }) {
  return (
    <>
      <PageIntro eyebrow="Organization intelligence" title="Capability at a glance" desc="A live view of the skills, learning activity, and perfect trainer matches shaping IMD's workforce." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Users} label="Total trainees" value="248" sub="+18 this quarter" />
        <Stat icon={UserRoundCog} label="Total trainers" value="36" sub="Across 8 centers" />
        <Stat icon={BookOpen} label="Active courses" value="12" sub="4 newly launched" />
        <Stat icon={ClipboardCheck} label="Active assessments" value="29" sub="78% completion rate" />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Capability Gap Intelligence
            </div>
            <h3 className="mt-1 text-xl font-bold text-[#063b5c]">Most Needed Skills & Matched Expert Trainers</h3>
            <p className="mt-0.5 text-xs text-slate-500">Live IMD organizational skill demands paired with top-ranked trainers</p>
          </div>
          <Badge tone="amber">4 Critical Gaps Active</Badge>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {initialTrainers.map((t, idx) => (
            <div key={t.name} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-teal-400 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">0{idx + 1} Needed Skill</span>
                  <h4 className="mt-0.5 text-lg font-bold text-[#063b5c]">{t.skillMatched}</h4>
                </div>
                <Badge tone={idx === 0 || idx === 1 ? 'amber' : 'blue'}>
                  {idx === 0 ? '78% Gap Demand' : idx === 1 ? '64% Gap Demand' : idx === 2 ? '51% Gap Demand' : '42% Gap Demand'}
                </Badge>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800 text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-900">{t.name}</h5>
                        <Badge tone="green">Perfect Match</Badge>
                      </div>
                      <p className="text-xs text-slate-500">{t.roleTitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-teal-700">{t.match}%</div>
                    <div className="text-[10px] text-slate-400">Match score</div>
                  </div>
                </div>

                <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-600 space-y-1">
                  <div><span className="font-semibold text-slate-700">Qualifications:</span> {t.qualification}</div>
                  <div><span className="font-semibold text-slate-700">Status:</span> <span className="text-emerald-700 font-medium">{t.status}</span></div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => go('matching')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Allocate to Cohort <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold text-[#063b5c]">Organization Skill Demand Summary</h3>
              <p className="mt-1 text-xs text-slate-500">Workforce percentage requiring capability upgrade</p>
            </div>
            <TrendingUp className="h-5 w-5 text-teal-600" />
          </div>
          <div className="mt-5 space-y-4">
            {[
              ['Radar Meteorology', 78],
              ['Numerical Weather Prediction (NWP)', 64],
              ['Python / Data Processing', 51],
              ['Satellite Meteorology', 42]
            ].map(([name, value], i) => (
              <div key={name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span><span className="mr-3 font-bold text-slate-400">0{i + 1}</span>{name}</span>
                  <span className="font-bold text-slate-600">{value}%</span>
                </div>
                <Progress value={value as number} color={i === 0 ? 'bg-amber-500' : 'bg-teal-600'} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-[#063b5c]">Training status</h3>
          <p className="mt-1 text-xs text-slate-500">Across all active learning paths</p>
          <div className="mt-6 flex items-center gap-6">
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#0d9488 0 42%, #38bdf8 42% 77%, #e2e8f0 77% 100%)' }}>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-xl font-bold text-[#063b5c]">248</div>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-teal-600" />Completed <b className="ml-2">42%</b></div>
              <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-sky-400" />In progress <b className="ml-2">35%</b></div>
              <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-slate-200" />Not started <b className="ml-2">23%</b></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Overview({ courseList }: { courseList: CourseItem[] }) {
  const [tab, setTab] = useState('Trainees')
  return (
    <>
      <PageIntro eyebrow="Organization data" title="Entity overview" desc="Browse the people, experts, and learning assets powering Capacity Connect." />
      <div className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1 sm:w-fit">
        {['Trainees', 'Trainers', 'Courses'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === t ? 'bg-white text-[#063b5c] shadow-sm' : 'text-slate-500'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              {tab === 'Trainees' ? (
                <>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Center</th>
                  <th className="px-5 py-3">Target role</th>
                  <th className="px-5 py-3">Path progress</th>
                </>
              ) : tab === 'Trainers' ? (
                <>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Expertise</th>
                  <th className="px-5 py-3">Experience / Qualification</th>
                  <th className="px-5 py-3">Status</th>
                </>
              ) : (
                <>
                  <th className="px-5 py-3">Course</th>
                  <th className="px-5 py-3">Skill area</th>
                  <th className="px-5 py-3">Duration</th>
                  <th className="px-5 py-3">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tab === 'Trainees'
              ? trainees.map((x, i) => (
                  <tr key={x}>
                    <td className="px-5 py-4 font-semibold">{x}</td>
                    <td className="px-5 py-4 text-slate-500">{['New Delhi', 'Pune', 'Chennai', 'Guwahati', 'Mumbai'][i]}</td>
                    <td className="px-5 py-4 text-slate-700">{i % 2 === 0 ? 'Advanced Weather Forecaster' : 'Weather Forecaster'}</td>
                    <td className="px-5 py-4"><Progress value={[58, 76, 91, 35, 68][i]} /></td>
                  </tr>
                ))
              : tab === 'Trainers'
              ? initialTrainers.map(t => (
                  <tr key={t.name}>
                    <td className="px-5 py-4 font-semibold">{t.name}</td>
                    <td className="px-5 py-4 text-slate-500">{t.skillMatched}</td>
                    <td className="px-5 py-4 text-xs text-slate-600">{t.qualification}</td>
                    <td className="px-5 py-4"><Badge tone="green">{t.status}</Badge></td>
                  </tr>
                ))
              : courseList.map(c => (
                  <tr key={c.id}>
                    <td className="px-5 py-4 font-semibold">{c.title}</td>
                    <td className="px-5 py-4 text-slate-500">{c.skill}</td>
                    <td className="px-5 py-4 text-slate-700">{c.duration}</td>
                    <td className="px-5 py-4"><Badge tone={c.status === 'Completed' ? 'green' : 'blue'}>{c.status}</Badge></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
