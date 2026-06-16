'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProjectsManager from './projects-manager'
import ContentManager from './content-manager'
import ContactManager from './contact-manager'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-[0.05em] mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your portfolio content</p>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <ContentManager />
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <ContactManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

