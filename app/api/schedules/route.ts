import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { userId, date, description } = await request.json()

    if (!session.user || (session.user as any).id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const schedule = await prisma.schedule.create({
      data: {
        userId,
        date: new Date(date),
        description,
      },
    })

    return NextResponse.json(schedule)
  } catch (error) {
    console.error('Error creating schedule:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const schedules = await prisma.schedule.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { date: 'asc' },
    })

    return NextResponse.json(schedules)
  } catch (error) {
    console.error('Error fetching schedules:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}