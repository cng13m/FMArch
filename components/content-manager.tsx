'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save } from 'lucide-react'
import { toast } from 'sonner'
import { getContent, updateContent } from '@/app/actions/content'
import { uploadImage } from '@/app/actions/upload'

export default function ContentManager() {
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    try {
      const data = await getContent()
      setContent(data)
    } catch (error) {
      toast.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(key: string, value: string) {
    setSaving(true)
    try {
      await updateContent(key, value)
      toast.success('Content updated successfully')
    } catch (error) {
      toast.error('Failed to update content')
    } finally {
      setSaving(false)
    }
  }

  function showUploadError(error: unknown) {
    console.error('Image upload failed:', error)
    toast.error(error instanceof Error ? error.message : 'Failed to upload image')
  }

  if (loading) {
    return <div className="text-center py-12">Loading content...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Home Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="homeHeroText">Hero Text</Label>
            <Input
              id="homeHeroText"
              value={content.homeHeroText || ''}
              onChange={(e) => setContent({ ...content, homeHeroText: e.target.value })}
            />
            <Button
              size="sm"
              onClick={() => handleSave('homeHeroText', content.homeHeroText || '')}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="homeSubText">Subtitle Text</Label>
            <Input
              id="homeSubText"
              value={content.homeSubText || ''}
              onChange={(e) => setContent({ ...content, homeSubText: e.target.value })}
            />
            <Button
              size="sm"
              onClick={() => handleSave('homeSubText', content.homeSubText || '')}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Hero Background Image</Label>
            {content.homeHeroImage && (
              <div className="mb-2 text-center">
                <img src={content.homeHeroImage} alt="Hero background" className="mx-auto rounded max-w-xs" />
                <div className="flex justify-center mt-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await handleSave('homeHeroImage', '')
                    }}
                    disabled={saving || uploadingImage}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setUploadingImage(true)
                try {
                  const url = await uploadImage(file, 'content')
                  await handleSave('homeHeroImage', url)
                  toast.success('Image uploaded successfully')
                } catch (err) {
                  showUploadError(err)
                } finally {
                  setUploadingImage(false)
                }
              }}
              disabled={uploadingImage}
            />
          </div>

          <div className="space-y-2">
            <Label>Home "Creating Spaces" Image</Label>
            {content.homeAboutImage && (
              <div className="mb-2 text-center">
                <img src={content.homeAboutImage} alt="Home about" className="mx-auto rounded max-w-xs" />
                <div className="flex justify-center mt-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await handleSave('homeAboutImage', '')
                    }}
                    disabled={saving || uploadingImage}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setUploadingImage(true)
                try {
                  const url = await uploadImage(file, 'content')
                  await handleSave('homeAboutImage', url)
                  toast.success('Image uploaded successfully')
                } catch (err) {
                  showUploadError(err)
                } finally {
                  setUploadingImage(false)
                }
              }}
              disabled={uploadingImage}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">Services (JSON)</Label>
            <Textarea
              id="services"
              value={content.services || ''}
              onChange={(e) => setContent({ ...content, services: e.target.value })}
              rows={8}
              placeholder='[ { "number": "01", "title": "Architectural Design", "description": "..." }, ... ]'
            />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={async () => {
                  try {
                    // Try to parse JSON to validate
                    if (content.services && content.services.trim() !== '') JSON.parse(content.services)
                    await handleSave('services', content.services || '')
                    toast.success('Services updated')
                  } catch (err) {
                    toast.error('Invalid JSON for services')
                  }
                }}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Services
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  // Reset to default services example
                  const example = [
                    { number: '01', title: 'Architectural Design', description: 'Complete architectural solutions from concept to construction, with a focus on sustainable and innovative design.' },
                    { number: '02', title: 'Interior Design', description: 'Creating harmonious interior spaces that reflect your personality while maximizing functionality and comfort.' },
                    { number: '03', title: '3D Visualization', description: 'Photorealistic renderings and animations that bring your project to life before construction begins.' },
                  ]
                  setContent({ ...content, services: JSON.stringify(example, null, 2) })
                }}
              >
                Load Example
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>About Image</Label>
            {content.aboutImage && (
              <div className="mb-2 text-center">
                <img src={content.aboutImage} alt="About" className="mx-auto rounded max-w-xs" />
                <div className="flex justify-center mt-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await handleSave('aboutImage', '')
                    }}
                    disabled={saving || uploadingImage}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setUploadingImage(true)
                try {
                  const url = await uploadImage(file, 'content')
                  await handleSave('aboutImage', url)
                  toast.success('Image uploaded successfully')
                } catch (err) {
                  showUploadError(err)
                } finally {
                  setUploadingImage(false)
                }
              }}
              disabled={uploadingImage}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aboutText">About Text</Label>
            <Textarea
              id="aboutText"
              value={content.aboutText || ''}
              onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
              rows={6}
            />
            <Button
              size="sm"
              onClick={() => handleSave('aboutText', content.aboutText || '')}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvLink">CV PDF Link</Label>
            <Input
              id="cvLink"
              value={content.cvLink || ''}
              onChange={(e) => setContent({ ...content, cvLink: e.target.value })}
              placeholder="/files/fjolle-cv.pdf or https://..."
            />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => handleSave('cvLink', content.cvLink || '')}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Link
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (content.cvLink) window.open(content.cvLink, '_blank')
                }}
              >
                Preview
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

