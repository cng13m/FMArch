'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogIn, LayoutDashboard, LogOut } from 'lucide-react'
import { logout } from '@/app/actions/auth'

export default function AuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogout() {
    await logout()
  }

  // Always show login button, don't wait for loading
  if (isAuthenticated) {
    return (
      <>
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="text-sm tracking-[0.15em] uppercase">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        <form action={handleLogout}>
          <Button variant="ghost" size="sm" type="submit" className="text-sm tracking-[0.15em] uppercase">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </form>
      </>
    )
  }

  return (
    <Link href="/login" className="inline-flex">
      <Button variant="outline" size="sm" className="text-sm tracking-[0.15em] uppercase">
        <LogIn className="h-4 w-4 mr-2" />
        Login
      </Button>
    </Link>
  )
}

