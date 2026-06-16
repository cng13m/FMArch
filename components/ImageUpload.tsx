'use client'

import { useState } from 'react'

export default function ImageUpload({ onUploadSuccess }: { onUploadSuccess?: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const stripMetadataAndUpload = async (originalFile: File) => {
    setLoading(true)

    // Create clean blob by drawing on canvas (strips metadata)
    const img = new Image()
    img.src = URL.createObjectURL(originalFile)

    await new Promise((resolve) => { img.onload = resolve })

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.drawImage(img, 0, 0)

    const cleanBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), originalFile.type || 'image/png', 0.95)  // 95% quality
    })

    const cleanFile = new File([cleanBlob], originalFile.name, { type: originalFile.type })

    // Now upload the clean file
    const formData = new FormData()
    formData.append('file', cleanFile)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      setLoading(false)
      if (data.url) {
        setUrl(data.url)
        onUploadSuccess?.(data.url)
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (err: any) {
      setLoading(false)
      alert(err.message || 'Upload error')
    }
  }

  return (
    <div className="my-12 text-center">
      <h2 className="text-2xl mb-4">Upload an Image</h2>
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
      />
      <button
        className="ml-2 px-4 py-2 bg-foreground text-background rounded disabled:opacity-50"
        onClick={() => file && stripMetadataAndUpload(file)}
        disabled={!file || loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {url && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={url} alt="Uploaded" className="mx-auto mt-2 max-w-xs" />
        </div>
      )}
    </div>
  )
}