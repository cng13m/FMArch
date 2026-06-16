'use server'

import { requireAuth } from '@/lib/session'
import { supabaseAdmin } from '@/lib/supabase'

const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
}

export async function uploadImage(file: File, folder: string = 'projects'): Promise<string> {
  await requireAuth()

  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files can be uploaded')
  }

  const contentType = file.type || 'image/png'
  const extensionFromName = file.name.split('.').pop()?.toLowerCase()
  const fileExt = MIME_TO_EXTENSION[contentType] || extensionFromName || 'png'
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { data, error } = await supabaseAdmin.storage
    .from('images')
    .upload(filePath, buffer, {
      contentType,
      upsert: false,
    })

  if (error) {
    throw new Error(error.message || 'Image upload failed')
  }

  const { data: urlData } = supabaseAdmin.storage.from('images').getPublicUrl(filePath)

  return urlData.publicUrl
}

export async function deleteImage(url: string) {
  await requireAuth()

  // Extract file path from URL
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split('/')
  const filePath = pathParts.slice(pathParts.indexOf('images')).join('/')

  const { error } = await supabaseAdmin.storage.from('images').remove([filePath])

  if (error) throw error
}

