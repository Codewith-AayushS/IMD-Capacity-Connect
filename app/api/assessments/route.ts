import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { Assessment, User } from '@/lib/models'
import { defaultMockData } from '../seed/route'

export async function GET() {
  const { isConnected } = await connectToDatabase()

  if (isConnected) {
    try {
      const list = await Assessment.find()
      if (list.length > 0) {
        return NextResponse.json({ success: true, assessments: list })
      }
    } catch (e) {
      console.error('Error loading assessments from DB', e)
    }
  }

  return NextResponse.json({ success: true, assessments: defaultMockData.assessments })
}

export async function POST(req: Request) {
  try {
    const { userAnswers } = await req.json() // Array of selected option indices
    const questions = defaultMockData.assessments[0].questions

    let correctCount = 0
    questions.forEach((q, idx) => {
      if (userAnswers && userAnswers[idx] === q.answer) {
        correctCount++
      }
    })

    const scorePercentage = Math.round((correctCount / questions.length) * 100)
    const passed = scorePercentage >= 70

    const { isConnected } = await connectToDatabase()

    if (passed) {
      if (isConnected) {
        const trainee = await User.findOne({ role: 'trainee' })
        if (trainee) {
          const radarSkill = trainee.skills.find(s => s.name === 'Radar Meteorology')
          if (radarSkill && radarSkill.level < 5) {
            radarSkill.level += 1
            await trainee.save()
          }
        }
      } else {
        // Memory fallback update
        const radarSkill = defaultMockData.traineeProfile.skills.find(s => s.name === 'Radar Meteorology')
        if (radarSkill && radarSkill.level < 5) {
          radarSkill.level += 1
        }
      }
    }

    return NextResponse.json({
      success: true,
      score: scorePercentage,
      passed: passed,
      correctCount: correctCount,
      totalQuestions: questions.length,
      competencyIncreased: passed,
      updatedSkill: 'Radar Meteorology'
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

