'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
  type Project,
} from '@/app/actions/projects'
import { uploadImageFile } from '@/lib/image-upload'
import Image from 'next/image'

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  function openCreateDialog() {
    setEditingProject(null)
    setFormData({})
    setIsDialogOpen(true)
  }

  function openEditDialog(project: Project) {
    setEditingProject(project)
    setFormData(project)
    setIsDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingProject?.id) {
        await updateProject(editingProject.id, formData)
        toast.success('Project updated successfully')
      } else {
        await createProject(formData as Project)
        toast.success('Project created successfully')
      }
      setIsDialogOpen(false)
      loadProjects()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save project')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await deleteProject(id)
      toast.success('Project deleted successfully')
      loadProjects()
    } catch (error) {
      toast.error('Failed to delete project')
    }
  }

  async function handleImageUpload(field: 'cover_image' | 'gallery', file: File) {
    setUploading(true)
    try {
      const url = await uploadImageFile(file)
      if (field === 'cover_image') {
        setFormData({ ...formData, cover_image: url })
      } else {
        const gallery = formData.gallery || []
        setFormData({ ...formData, gallery: [...gallery, url] })
      }
      toast.success('Image uploaded successfully')
    } catch (error: any) {
      console.error('Image upload failed:', error)
      toast.error(error.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  function removeGalleryImage(index: number) {
    const gallery = formData.gallery || []
    setFormData({ ...formData, gallery: gallery.filter((_, i) => i !== index) })
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return
    const newProjects = [...projects]
    ;[newProjects[index - 1], newProjects[index]] = [newProjects[index], newProjects[index - 1]]
    setProjects(newProjects)
    await reorderProjects(newProjects.map((p) => p.id!))
    toast.success('Order updated')
  }

  async function handleMoveDown(index: number) {
    if (index === projects.length - 1) return
    const newProjects = [...projects]
    ;[newProjects[index], newProjects[index + 1]] = [newProjects[index + 1], newProjects[index]]
    setProjects(newProjects)
    await reorderProjects(newProjects.map((p) => p.id!))
    toast.success('Order updated')
  }

  if (loading) {
    return <div className="text-center py-12">Loading projects...</div>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Projects</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? 'Edit Project' : 'Create Project'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Auto-generated from title"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={formData.year || ''}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={formData.client || ''}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags?.join(', ') || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      })
                    }
                    placeholder="Residential, Modern, Sustainable"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  {formData.cover_image && (
                    <div className="relative w-full h-48 mb-2">
                      <Image
                        src={formData.cover_image}
                        alt="Cover"
                        fill
                        className="object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData({ ...formData, cover_image: undefined })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload('cover_image', file)
                    }}
                    disabled={uploading}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {formData.gallery?.map((url, index) => (
                      <div key={index} className="relative aspect-video">
                        <Image src={url} alt={`Gallery ${index + 1}`} fill className="object-cover rounded" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload('gallery', file)
                    }}
                    disabled={uploading}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {editingProject ? 'Update' : 'Create'} Project
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === projects.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.year}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No projects yet. Create your first project!</div>
        )}
      </CardContent>
    </Card>
  )
}

