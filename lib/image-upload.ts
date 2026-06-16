'use client'

import { createClient } from '@supabase/supabase-js'

export async function uploadImageFile(file: File, folder: string = 'projects') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase public environment variables')
  }

  const signedUploadResponse = await fetch('/api/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: file.name,
      type: file.type,
      folder,
    }),
  })

  const signedUpload = await signedUploadResponse.json()

  if (!signedUploadResponse.ok) {
    throw new Error(signedUpload.error || 'Could not create upload URL')
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { error } = await supabase.storage
    .from('images')
    .uploadToSignedUrl(signedUpload.path, signedUpload.token, file, {
      contentType: file.type || 'image/png',
    })

  if (error) {
    throw new Error(error.message || 'Image upload failed')
  }

  return signedUpload.publicUrl
}
