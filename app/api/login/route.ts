import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }

  const session = await getSession()
  session.isAuthenticated = true
  session.email = email
  await session.save()

  return NextResponse.json({ success: true })
}
