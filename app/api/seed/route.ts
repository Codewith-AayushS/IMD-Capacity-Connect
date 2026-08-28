import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User, RoleRequirement, Course, Assessment } from '@/lib/models'

export const defaultMockData = {
  traineeProfile: {
    name: 'Rahul Sharma',
    employeeId: 'IMD-2048',
    role: 'trainee',
    center: 'New Delhi',
    experienceYears: 5,
    qualification: 'M.Sc. Meteorology',
    targetRole: 'Advanced Weather Forecaster',
    skills: [
      { name: 'Radar Meteorology', short: 'Radar', level: 2 },
      { name: 'Numerical Weather Prediction', short: 'NWP', level: 3 },
      { name: 'Python / Data Processing', short: 'Python', level: 4 },
      { name: 'Climate Science', short: 'Climate', level: 3 },
      { name: 'Satellite Meteorology', short: 'Satellite', level: 3 },
      { name: 'Synoptic Meteorology', short: 'Synoptic', level: 3 },
    ]
  },
  roles: [
    {
      title: 'Weather Forecaster',
      description: 'Build reliable day-to-day forecast operations.',
      requiredSkills: [
        { name: 'Radar Meteorology', requiredLevel: 3 },
        { name: 'Numerical Weather Prediction', requiredLevel: 3 },
        { name: 'Synoptic Meteorology', requiredLevel: 4 },
      ]
    },
    {
      title: 'Advanced Weather Forecaster',
      description: 'Lead complex forecasting and warning decisions.',
      requiredSkills: [
        { name: 'Radar Meteorology', requiredLevel: 4 },
        { name: 'Numerical Weather Prediction', requiredLevel: 4 },
        { name: 'Python / Data Processing', requiredLevel: 4 },
        { name: 'Climate Science', requiredLevel: 4 },
        { name: 'Satellite Meteorology', requiredLevel: 4 },
      ]
    },
    {
      title: 'Meteorological Data Analyst',
      description: 'Turn climate and observation data into insight.',
      requiredSkills: [
        { name: 'Python / Data Processing', requiredLevel: 5 },
        { name: 'Climate Science', requiredLevel: 4 },
        { name: 'Satellite Meteorology', requiredLevel: 4 },
      ]
    },
    {
      title: 'Radar / Observation Specialist',
      description: 'Specialize in radar systems and observation quality.',
      requiredSkills: [
        { name: 'Radar Meteorology', requiredLevel: 5 },
        { name: 'Satellite Meteorology', requiredLevel: 4 },
      ]
    }
  ],
  courses: [
    {
      title: 'Radar Fundamentals & Interpretation',
      skill: 'Radar Meteorology',
      duration: '4 weeks',
      progress: 58,
      status: 'In Progress',
      modules: [
        { title: 'Radar Fundamentals', status: 'Completed' },
        { title: 'Reading Reflectivity Products', status: 'Completed' },
        { title: 'Velocity & Motion', status: 'In Progress' },
        { title: 'Precipitation Estimation', status: 'Locked' },
        { title: 'Operational Case Studies', status: 'Locked' },
        { title: 'Final Assessment', status: 'Locked' }
      ]
    },
    {
      title: 'Doppler Radar Applications',
      skill: 'Radar Meteorology',
      duration: '3 weeks',
      progress: 0,
      status: 'Locked',
      modules: [
        { title: 'Doppler Shift Principles', status: 'Locked' },
        { title: 'VAD Wind Profiling', status: 'Locked' },
        { title: 'Severe Storm Signatures', status: 'Locked' }
      ]
    },
    {
      title: 'Applied NWP for Forecasters',
      skill: 'Numerical Weather Prediction',
      duration: '5 weeks',
      progress: 100,
      status: 'Completed',
      modules: [
        { title: 'Model Parameterizations', status: 'Completed' },
        { title: 'Ensemble Forecasting', status: 'Completed' }
      ]
    }
  ],
  assessments: [
    {
      title: 'Radar Fundamentals & Interpretation Assessment',
      courseTitle: 'Radar Fundamentals & Interpretation',
      status: 'Published',
      attempts: 42,
      averageScore: 78,
      questions: [
        { q: 'Which radar product is most useful for identifying precipitation intensity?', options: ['Base velocity', 'Reflectivity', 'Spectrum width', 'VAD profile'], answer: 1 },
        { q: 'What does a high reflectivity value generally indicate?', options: ['Strong precipitation echoes', 'Low wind shear', 'Clear air', 'Stable temperature'], answer: 0 },
        { q: 'Doppler velocity primarily measures which property?', options: ['Cloud height', 'Rainfall amount', 'Motion toward or away from radar', 'Visibility'], answer: 2 },
        { q: 'A bright band on radar is typically associated with:', options: ['Dry air', 'Melting hydrometeors', 'Strong sunlight', 'Equipment noise'], answer: 1 },
        { q: 'Which action improves confidence in a radar-based warning?', options: ['Use one image only', 'Ignore surface observations', 'Cross-check multiple products', 'Lower the threshold always'], answer: 2 }
      ]
    }
  ],
  trainers: [
    { name: 'Dr. Sharma', expertise: 'Radar Meteorology, NWP', match: 94, years: 12, initials: 'DS' },
    { name: 'Dr. Meera Iyer', expertise: 'Radar & Observation Systems', match: 88, years: 9, initials: 'MI' },
    { name: 'A. K. Verma', expertise: 'Synoptic Meteorology', match: 76, years: 8, initials: 'AV' }
  ]
}

export async function GET() {
  const { isConnected } = await connectToDatabase()

  if (isConnected) {
    try {
      const userCount = await User.countDocuments()
      if (userCount === 0) {
        await User.create({
          name: defaultMockData.traineeProfile.name,
          email: 'rahul.sharma@imd.gov.in',
          role: 'trainee',
          employeeId: defaultMockData.traineeProfile.employeeId,
          center: defaultMockData.traineeProfile.center,
          targetRole: defaultMockData.traineeProfile.targetRole,
          skills: defaultMockData.traineeProfile.skills
        })

        for (const roleReq of defaultMockData.roles) {
          await RoleRequirement.create(roleReq)
        }

        for (const course of defaultMockData.courses) {
          await Course.create(course)
        }

        for (const asm of defaultMockData.assessments) {
          await Assessment.create(asm)
        }
      }
    } catch (err) {
      console.error('Seed DB Error:', err)
    }
  }

  return NextResponse.json({
    status: 'ok',
    dbConnected: isConnected,
    data: defaultMockData
  })
}

