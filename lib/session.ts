import { getIronSession, type SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  isAuthenticated: boolean
  email?: string
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  },
}

export function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session.isAuthenticated) {
    throw new Error('Unauthorized')
  }
  return session
}
