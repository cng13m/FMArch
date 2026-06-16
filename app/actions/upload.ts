import { requireAuth } from '@/lib/session'
import { supabaseAdmin } from '@/lib/supabase'

export async function deleteImage(url: string) {
  await requireAuth()

  // Extract file path from URL
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split('/')
  const filePath = pathParts.slice(pathParts.indexOf('images')).join('/')

  const { error } = await supabaseAdmin.storage.from('images').remove([filePath])

  if (error) throw error
}

