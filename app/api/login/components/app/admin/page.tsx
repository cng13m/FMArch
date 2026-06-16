import { requireAuth } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  try {
    await requireAuth()
  } catch {
    redirect('/login')
  }

  return <div>Admin dashboard</div>
}
