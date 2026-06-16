"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  id?: string
  title: string
  slug?: string
  year: string
  location: string
  coverImage?: string
  cover_image?: string
  category?: string
  index?: number
}

export default function ProjectCard({
  id,
  title,
  slug,
  year,
  location,
  coverImage,
  cover_image,
  category,
  index = 0,
}: ProjectCardProps) {
  const imageSrc = coverImage || cover_image || "/placeholder.svg"
  const projectIdentifier =
    id ||
    slug?.trim() ||
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "group transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/projects/${projectIdentifier}`}>
        <div
          className="relative aspect-[4/3] overflow-hidden bg-muted"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={cn("object-cover object-center transition-transform duration-700", isHovered ? "scale-105" : "scale-100")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className={cn("absolute inset-0 bg-black/0 transition-colors duration-500", isHovered && "bg-black/20")}
          />
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{year}</span>
            {category && (
              <>
                <span className="text-muted-foreground">·</span>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{category}</span>
              </>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-light tracking-wide group-hover:opacity-70 transition-opacity">
            {title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        </div>
      </Link>
    </div>
  )
}
