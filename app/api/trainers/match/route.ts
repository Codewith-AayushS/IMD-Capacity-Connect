import { NextResponse } from 'next/server'
import { defaultMockData } from '../../seed/route'

export async function GET() {
  const trainersWithScore = defaultMockData.trainers.map(t => {
    return {
      ...t,
      matchPercentage: t.match,
      recommendationReason: t.match > 90
        ? 'Skill match 94%, extensive Doppler radar experience and active trainer availability.'
        : t.match > 80
          ? 'Strong observation systems match with recent operational deployments.'
          : 'Good supporting match for the synoptic context of this path.'
    }
  })

  return NextResponse.json({
    success: true,
    skillArea: 'Radar Meteorology',
    trainers: trainersWithScore
  })
}

