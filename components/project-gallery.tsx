"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectGalleryProps {
  images: string[]
  title: string
}

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const portalRef = useRef<HTMLElement | null>(null)

  // Create a portal root attached to document.body to avoid nesting issues that break fixed positioning
  useEffect(() => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    portalRef.current = el
    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current)
        portalRef.current = null
      }
    }
  }, [])

  // Lock body scroll while lightbox is open and restore on close/unmount
  useEffect(() => {
    if (selectedImage !== null) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
    return
  }, [selectedImage])

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)

  const nextImage = () => {
    if (selectedImage !== null) setSelectedImage((selectedImage + 1) % images.length)
  }

  const prevImage = () => {
    if (selectedImage !== null) setSelectedImage((selectedImage - 1 + images.length) % images.length)
  }

  // Add keyboard navigation (Esc, Left, Right) and ensure events are registered only when open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (selectedImage === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedImage])

  const lightbox = (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={closeLightbox}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={closeLightbox}
        className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors z-[10001]"
        aria-label="Close lightbox"
      >
        <X className="h-8 w-8" />
      </button>

      <div className="relative w-full max-w-5xl flex items-center justify-center min-h-[120px]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white bg-black/30 rounded-full transition-colors z-[10001]"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <img
          src={images[selectedImage!] || "/placeholder.svg"}
          alt={`${title} - Image ${selectedImage! + 1}`}
          className="block mx-auto max-w-full max-h-[calc(100vh-120px)] object-contain object-center"
        />

        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white bg-black/30 rounded-full transition-colors z-[10001]"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <span className="text-white/60 text-sm tracking-wider">
          {selectedImage! + 1} / {images.length}
        </span>
      </div>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 place-items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer group max-w-[900px] w-full"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </div>
        ))}
      </div>

      {selectedImage !== null && portalRef.current && createPortal(lightbox, portalRef.current)}
    </>
  )
}
