'use client'

import { createClient } from '@supabase/supabase-js'
import { createSignedImageUpload } from '@/app/actions/upload'

export async function uploadImageFile(file: File, folder: string = 'projects') {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase public environment variables')
  }

  const signedUpload = await createSignedImageUpload({
    name: file.name,
    type: file.type,
    folder,
  })

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
