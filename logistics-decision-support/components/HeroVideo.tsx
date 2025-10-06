"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"

type Props = {
  onExplore?: () => void
  videoSrc?: string
  poster?: string
}

export default function HeroVideo({ onExplore, videoSrc, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [canPlay, setCanPlay] = useState<boolean>(Boolean(videoSrc))

  useEffect(() => {
    if (!videoSrc) {
      setCanPlay(false)
      return
    }
    const v = videoRef.current
    if (!v) return
    const play = async () => {
      try {
        await v.play()
        setCanPlay(true)
      } catch {
        setCanPlay(false)
      }
    }
    play()
  }, [videoSrc])

  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-none">
      {/* Background video (placeholder source can be replaced with live stream) */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        poster={poster || "/steel-bokaro-logistics-plant-yard.jpg"}
        {...(videoSrc ? { src: videoSrc } : {})}
      />
      {!canPlay && (
        <Image
          src={poster || "/steel-bokaro-logistics-plant-yard.jpg"}
          alt="Steel plant logistics operations"
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="relative z-10 flex h-full w-full items-center justify-center bg-black/30">
        <div className="mx-auto max-w-3xl px-4 text-center text-white">
          <h1 className="text-pretty text-3xl font-semibold md:text-5xl">
            Optimizing Rake Formation with AI & Transparency
          </h1>
          <p className="mt-4 text-balance text-sm md:text-base opacity-90">
            AI-assisted planning to minimize logistics cost, improve utilization, and reduce delays.
          </p>
          <div className="mt-6">
            <Button onClick={onExplore} className="bg-primary text-primary-foreground">
              Explore
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
    </section>
  )
}
