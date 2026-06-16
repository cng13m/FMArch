'use server'

import { requireAuth } from '@/lib/session'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function getContent() {
  // Return empty object if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    return {}
  }

  const { data, error } = await supabaseAdmin
    .from('content')
    .select('*')

  if (error) throw error

  const contentMap: Record<string, string> = {}
  data?.forEach((item) => {
    contentMap[item.key] = item.value
  })

  return contentMap
}

export async function updateContent(key: string, value: string) {
  await requireAuth()

  const { error } = await supabaseAdmin
    .from('content')
    .upsert(
      {
        key,
        value,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'key',
      }
    )

  if (error) throw error
  revalidatePath('/')
  revalidatePath('/about')
}

export async function getContactInfo() {
  // Return default values if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    return {
      name: 'Fjolle Murtezi',
      email: 'fjollemurtezi123@gmail.com',
      location: 'Prishtina, Kosovo',
      social_links: {}
    }
  }

  const { data, error } = await supabaseAdmin
    .from('contact_info')
    .select('*')
    .limit(1)
    .single()

  if (error) throw error
  return data
}

export async function updateContactInfo(info: {
  name?: string
  email?: string
  location?: string
  social_links?: Record<string, string>
}) {
  await requireAuth()

  const { data, error } = await supabaseAdmin
    .from('contact_info')
    .update({ ...info, updated_at: new Date().toISOString() })
    .select()
    .single()

  if (error) {
    // If no record exists, create one
    const { data: newData, error: insertError } = await supabaseAdmin
      .from('contact_info')
      .insert(info)
      .select()
      .single()

    if (insertError) throw insertError
    revalidatePath('/contact')
    return newData
  }

  revalidatePath('/contact')
  return data
}

