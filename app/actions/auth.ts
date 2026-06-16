'use server'

import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function login(formData: FormData) {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('Missing admin credentials')
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const session = await getSession()
    session.isAuthenticated = true
    session.email = email
    await session.save()
    redirect('/admin')
  } else {
    throw new Error('Invalid credentials')
  }
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect('/login')
}

export async function checkAuth() {
  const session = await getSession()
  return session.isAuthenticated === true
}

