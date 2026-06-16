'use server'

import { requireAuth } from '@/lib/session'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export interface Project {
  id?: string
  title: string
  slug: string
  year?: string
  location?: string
  description?: string
  category?: string
  cover_image?: string
  gallery?: string[]
  client?: string
  tags?: string[]
  display_order?: number
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function withSlugFallback(project: Project): Project {
  return {
    ...project,
    slug: project.slug?.trim() || slugify(project.title),
  }
}

export async function getProjects() {
  // Return empty array if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    return []
  }

  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data || []).map(withSlugFallback)
}

export async function getProject(slug: string) {
  // Return null if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    return null
  }

  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  if (data) return withSlugFallback(data)

  const { data: projects, error: projectsError } = await supabaseAdmin
    .from('projects')
    .select('*')

  if (projectsError) throw projectsError

  return (projects || []).map(withSlugFallback).find((project) => project.slug === slug) || null
}

export async function createProject(project: Project) {
  await requireAuth()

  project.slug = project.slug?.trim() || slugify(project.title)

  // Get max display_order
  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)

  const maxOrder = projects && projects.length > 0 ? projects[0].display_order : -1
  project.display_order = (maxOrder ?? -1) + 1

  const { data, error } = await supabaseAdmin
    .from('projects')
    .insert(project)
    .select()
    .single()

  if (error) throw error
  revalidatePath('/projects')
  revalidatePath('/')
  return data
}

export async function updateProject(id: string, project: Partial<Project>) {
  await requireAuth()

  const projectUpdate = {
    ...project,
    slug: project.slug?.trim() || (project.title ? slugify(project.title) : undefined),
    updated_at: new Date().toISOString(),
  }

  if (!projectUpdate.slug) delete projectUpdate.slug

  const { data, error } = await supabaseAdmin
    .from('projects')
    .update(projectUpdate)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  revalidatePath('/projects')
  revalidatePath(`/projects/${project.slug || data.slug}`)
  revalidatePath('/')
  return data
}

export async function deleteProject(id: string) {
  await requireAuth()

  const { error } = await supabaseAdmin
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) throw error
  revalidatePath('/projects')
  revalidatePath('/')
}

export async function reorderProjects(projectIds: string[]) {
  await requireAuth()

  const updates = projectIds.map((id, index) => ({
    id,
    display_order: index,
  }))

  for (const update of updates) {
    const { error } = await supabaseAdmin
      .from('projects')
      .update({ display_order: update.display_order })
      .eq('id', update.id)

    if (error) throw error
  }

  revalidatePath('/projects')
  revalidatePath('/')
}

