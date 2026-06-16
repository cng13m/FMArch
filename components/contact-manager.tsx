'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save } from 'lucide-react'
import { toast } from 'sonner'
import { getContactInfo, updateContactInfo } from '@/app/actions/content'

export default function ContactManager() {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    location: '',
    social_links: {} as Record<string, string>,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadContactInfo()
  }, [])

  async function loadContactInfo() {
    try {
      const data = await getContactInfo()
      setContactInfo({
        name: data.name || '',
        email: data.email || '',
        location: data.location || '',
        social_links: data.social_links || {},
      })
    } catch (error) {
      toast.error('Failed to load contact info')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      await updateContactInfo(contactInfo)
      toast.success('Contact info updated successfully')
    } catch (error) {
      toast.error('Failed to update contact info')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading contact info...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={contactInfo.name}
            onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={contactInfo.location}
            onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
          />
        </div>

        <div className="space-y-4 pt-4 border-t">
          <Label>Social Media Links</Label>
          {['LinkedIn', 'Instagram', 'Twitter', 'Facebook'].map((platform) => (
            <div key={platform} className="space-y-2">
              <Label htmlFor={platform.toLowerCase()}>{platform}</Label>
              <Input
                id={platform.toLowerCase()}
                type="url"
                value={contactInfo.social_links[platform.toLowerCase()] || ''}
                onChange={(e) =>
                  setContactInfo({
                    ...contactInfo,
                    social_links: {
                      ...contactInfo.social_links,
                      [platform.toLowerCase()]: e.target.value,
                    },
                  })
                }
                placeholder={`https://${platform.toLowerCase()}.com/yourprofile`}
              />
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving} className="mt-4">
          <Save className="h-4 w-4 mr-2" />
          Save Contact Info
        </Button>
      </CardContent>
    </Card>
  )
}

