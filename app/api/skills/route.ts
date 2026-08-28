import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { User } from '@/lib/models'
import { defaultMockData } from '../seed/route'

export async function GET() {
  const { isConnected } = await connectToDatabase()

  if (isConnected) {
    try {
      const trainee = await User.findOne({ role: 'trainee' })
      if (trainee) {
        return NextResponse.json({ success: true, skills: trainee.skills })
      }
    } catch (e) {
      console.error('Error reading skills from database', e)
    }
  }

  return NextResponse.json({ success: true, skills: defaultMockData.traineeProfile.skills })
}

export async function POST(req: Request) {
  try {
    const { skillName, newLevel } = await req.json()
    const { isConnected } = await connectToDatabase()

    if (isConnected) {
      const trainee = await User.findOne({ role: 'trainee' })
      if (trainee) {
        const item = trainee.skills.find(s => s.name === skillName)
        if (item) {
          item.level = Math.min(5, Math.max(1, newLevel))
          await trainee.save()
          return NextResponse.json({ success: true, skills: trainee.skills })
        }
      }
    }

    // Fallback response for memory state
    const updatedSkills = defaultMockData.traineeProfile.skills.map(s =>
      s.name === skillName ? { ...s, level: Math.min(5, Math.max(1, newLevel)) } : s
    )
    return NextResponse.json({ success: true, skills: updatedSkills })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

