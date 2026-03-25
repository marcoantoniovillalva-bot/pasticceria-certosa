'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  { src: '/images/gallery/torta-bing.webp',    alt: 'Torta personalizzata - Delizie della Certosa' },
  { src: '/images/gallery/cannoli-2.webp',      alt: 'Cannoli siciliani artigianali - Certosa di Pavia' },
  { src: '/images/pizza.webp',                  alt: 'Pizza a domicilio - Certosa di Pavia' },
  { src: '/images/gallery/auguri-amore.webp',   alt: 'Torta auguri amore - Delizie della Certosa' },
  { src: '/images/eventi-speciali.jpg',         alt: 'Cortile eventi Delizie della Certosa' },
  { src: '/images/pane.jpg',                    alt: 'Pane artigianale fresco - Certosa di Pavia' },
]

// 3 Ken Burns directions for variety
const kbClass = ['kb-1', 'kb-2', 'kb-3']

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % slides.length)
      setAnimKey(k => k + 1)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={`object-cover ${i === current ? kbClass[animKey % 3] : ''}`}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  )
}
