import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { phone, password, name, email } = await request.json()

    if (!phone || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        name,
        email,
      },
    })

    return NextResponse.json({ message: 'User created successfully', user: { id: user.id, phone: user.phone, name: user.name } })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
    }
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
