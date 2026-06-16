import { getIronSession } from 'iron-session'
import { NextRequest } from 'next/server'

export interface SessionData {
  isAuthenticated: boolean
  email?: string
}

const sessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7,
  },
}

// Pass the request object to getIronSession
export async function getSession(req: NextRequest) {
  return getIronSession<SessionData>(req, sessionOptions)
}

export async function requireAuth(req: NextRequest) {
  const session = await getSession(req)
  if (!session.isAuthenticated) {
    throw new Error('Unauthorized')
  }
  return session
}
