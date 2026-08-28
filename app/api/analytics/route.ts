import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    metrics: {
      totalTrainees: 248,
      totalTrainers: 36,
      activeCourses: 12,
      activeAssessments: 29,
      completionRate: 78
    },
    topSkillDemands: [
      { name: 'Radar Meteorology', demandPercentage: 78, level: 'High' },
      { name: 'Numerical Weather Prediction (NWP)', demandPercentage: 64, level: 'High' },
      { name: 'Python / Data Processing', demandPercentage: 51, level: 'Medium' },
      { name: 'Satellite Meteorology', demandPercentage: 42, level: 'Medium' }
    ],
    trainingStatusBreakdown: {
      completed: 42,
      inProgress: 35,
      notStarted: 23
    }
  })
}

