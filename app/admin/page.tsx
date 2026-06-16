import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/session'
import AdminDashboard from '@/components/admin-dashboard'

export default async function AdminPage() {
  try {
    await requireAuth()
  } catch {
    redirect('/login')
  }

  return <AdminDashboard />
}

