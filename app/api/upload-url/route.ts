import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '@/lib/session'

const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
}

export async function POST(request: Request) {
  try {
    await requireAuth()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return NextResponse.json(
        { error: 'Missing Supabase server environment variables' },
        { status: 500 },
      )
    }

    const { name, type, folder } = await request.json()
    const contentType = type || 'image/png'

    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files can be uploaded' }, { status: 400 })
    }

    const extensionFromName = String(name || '').split('.').pop()?.toLowerCase()
    const fileExt = MIME_TO_EXTENSION[contentType] || extensionFromName || 'png'
    const safeFolder = folder || 'projects'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${safeFolder}/${fileName}`

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data, error } = await supabaseAdmin.storage
      .from('images')
      .createSignedUploadUrl(filePath)

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message || 'Could not create upload URL' },
        { status: 500 },
      )
    }

    const { data: urlData } = supabaseAdmin.storage.from('images').getPublicUrl(filePath)

    return NextResponse.json({
      path: filePath,
      token: data.token,
      publicUrl: urlData.publicUrl,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload setup failed' },
      { status: 500 },
    )
  }
}
