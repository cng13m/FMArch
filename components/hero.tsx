"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  fullHeight?: boolean
  overlay?: boolean
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = "/minimalist-modern-building.png",
  fullHeight = true,
  overlay = true,
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        fullHeight ? "min-h-screen" : "min-h-[60vh]",
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {overlay && <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />}
      </div>

      <div
        className={cn(
          "relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.1em] leading-tight text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-white/80 font-light tracking-[0.15em] uppercase">{subtitle}</p>
        )}
      </div>

      <div
        className={cn(
          "absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/60 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
