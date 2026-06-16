'use client'

import React from 'react'
import { Download } from 'lucide-react'
import { redirectToPdf } from '@/lib/download'

export default function DownloadCvButton({
  url,
  filename,
  newTab = true,
}: {
  url: string
  filename?: string
  newTab?: boolean
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // If user wants an immediate 'download' for same-origin files, create an anchor with download attribute.
    if (!newTab && url.startsWith('/') && filename) {
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      a.remove()
      return
    }

    redirectToPdf(url, newTab)
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-opacity group"
    >
      <Download className="h-4 w-4" />
      Download CV
    </button>
  )
}
