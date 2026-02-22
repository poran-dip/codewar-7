// app/api/ps/route.ts
import { ProblemStatement } from '@/lib/types'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface PSResponse {
  released: boolean
  releaseAt?: string
  problemStatements?: ProblemStatement[]
}

const PS_RELEASE = new Date('2026-02-25T09:50:00+05:30')

const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: 'ps-health-01',
    theme: 'Healthcare',
    title: 'Smart Appointment Triage System',
    description:
      'Design a system that collects patient symptoms digitally and prioritizes appointments using intelligent rules or learning-based approaches to reduce overload on healthcare professionals.',
  },
  {
    id: 'ps-edu-01',
    theme: 'EdTech',
    title: 'Adaptive Learning Path Generator',
    description:
      'Build a platform that adapts learning material based on student performance and learning behavior, recommending content dynamically and tracking long-term progress.',
  },
  {
    id: 'ps-fin-01',
    theme: 'FinTech',
    title: 'Expense Insight & Budget Coach',
    description:
      'Create a tool that analyzes user expenses and presents smart budgeting insights, alerts, and summaries to help users make better financial decisions.',
  },
  {
    id: 'ps-sus-01',
    theme: 'Sustainability',
    title: 'Community Waste Reporting Platform',
    description:
      'Develop a platform where citizens can report waste-related issues, track resolution status, and help municipalities improve sustainability efforts.',
  },
]

export async function GET(): Promise<NextResponse<PSResponse>> {
  const now = new Date()

  if (now < PS_RELEASE) {
    return NextResponse.json({ released: false, releaseAt: PS_RELEASE.toISOString() })
  }

  return NextResponse.json({
    released: true,
    problemStatements: PROBLEM_STATEMENTS,
  })
}
