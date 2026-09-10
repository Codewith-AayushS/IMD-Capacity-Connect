import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/app/lib/db'
import { RoleRequirement, User } from '@/app/lib/models'
import { defaultMockData } from '../seed/route'

export async function POST(req: Request) {
  try {
    const { targetRole } = await req.json() || {}
    const selectedRole = targetRole || defaultMockData.traineeProfile.targetRole

    const { isConnected } = await connectToDatabase()

    let userSkills = defaultMockData.traineeProfile.skills
    let roleDef = defaultMockData.roles.find(r => r.title === selectedRole)

    if (isConnected) {
      const dbUser = await User.findOne({ role: 'trainee' })
      if (dbUser) userSkills = dbUser.skills

      const dbRole = await RoleRequirement.findOne({ title: selectedRole })
      if (dbRole) {
        roleDef = {
          title: dbRole.title,
          description: dbRole.description,
          requiredSkills: dbRole.requiredSkills.map(s => ({ name: s.name, requiredLevel: s.requiredLevel }))
        }
      }
    }

    if (!roleDef) {
      return NextResponse.json({ success: false, error: 'Target role not found' }, { status: 404 })
    }

    const gapDetails = userSkills.map(skill => {
      const reqItem = roleDef?.requiredSkills.find(r => r.name === skill.name)
      const requiredLevel = reqItem ? reqItem.requiredLevel : 4
      const gap = Math.max(0, requiredLevel - skill.level)

      return {
        name: skill.name,
        short: skill.short,
        currentLevel: skill.level,
        requiredLevel: requiredLevel,
        gap: gap,
        isOnTarget: gap === 0
      }
    })

    const totalGaps = gapDetails.filter(g => g.gap > 0).length

    return NextResponse.json({
      success: true,
      targetRole: selectedRole,
      description: roleDef.description,
      gapsDetected: totalGaps,
      gapDetails: gapDetails
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

