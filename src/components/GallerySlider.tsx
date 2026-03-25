'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

export interface GalleryImage {
  src: string
  alt: string
}

interface GallerySliderProps {
  images: GalleryImage[]
  darkBg?: boolean
}

export default function GallerySlider({ images, darkBg = false }: GallerySliderProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const cardWidth = el.querySelector('[data-card]')
      ? (el.querySelector('[data-card]') as HTMLElement).offsetWidth + 12
      : 320
    el.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
  }

  const closeLightbox = useCallback(() => setLightboxIdx(null), [])
  const prevImage = useCallback(() =>
    setLightboxIdx(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length])
  const nextImage = useCallback(() =>
    setLightboxIdx(i => i !== null ? (i + 1) % images.length : null), [images.length])

  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxIdx, closeLightbox, prevImage, nextImage])

  const arrowBg = darkBg
    ? 'bg-[#FDFEFC]/10 hover:bg-[#C9982A] text-[#FDFEFC]'
    : 'bg-[#222C35] hover:bg-[#C9982A] text-[#FDFEFC]'

  return (
    <div className="relative group/slider">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="-mx-4 md:mx-0 overflow-hidden"
      >
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 px-4 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              data-card
              onClick={() => setLightboxIdx(i)}
              className="relative shrink-0 w-[82vw] md:w-[calc(33.333%-8px)] h-64 md:h-72 snap-start overflow-hidden rounded-2xl group cursor-zoom-in"
              aria-label={`Apri immagine: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 82vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#222C35]/0 group-hover:bg-[#222C35]/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 bg-[#FDFEFC]/90 backdrop-blur-sm rounded-full p-3 shadow-xl">
                  <svg className="w-6 h-6 text-[#222C35]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              {/* Gold bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9982A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation arrows – desktop */}
      <button
        onClick={() => scroll('left')}
        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover/slider:opacity-100 ${arrowBg}`}
        aria-label="Scorri a sinistra"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => scroll('right')}
        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full items-center justify-center shadow-lg transition-all duration-200 opacity-0 group-hover/slider:opacity-100 ${arrowBg}`}
        aria-label="Scorri a destra"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll hint – mobile */}
      <p className="md:hidden text-center text-xs mt-2 opacity-40 tracking-widest uppercase font-sans">
        ← scorri →
      </p>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-[fadeIn_0.2s_ease-out]"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/60 hover:text-white w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
            aria-label="Chiudi"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9982A] text-white transition-all"
            aria-label="Immagine precedente"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative mx-16 md:mx-24 max-w-4xl w-full max-h-[85vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIdx].src}
              alt={images[lightboxIdx].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              priority
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9982A] text-white transition-all"
            aria-label="Immagine successiva"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter + dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === lightboxIdx ? 'bg-[#C9982A] w-4' : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <span className="text-white/40 text-xs font-sans tracking-widest">
              {lightboxIdx + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
