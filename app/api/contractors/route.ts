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
    const { name, contact, email, phone, address, notes } = await request.json()

    const contractor = await prisma.contractor.create({
      data: {
        name,
        contact,
        email,
        phone,
        address,
        notes,
      },
    })

    return NextResponse.json(contractor)
  } catch (error) {
    console.error('Error creating contractor:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const contractors = await prisma.contractor.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(contractors)
  } catch (error) {
    console.error('Error fetching contractors:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}