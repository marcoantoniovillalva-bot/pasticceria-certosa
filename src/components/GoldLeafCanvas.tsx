'use client'

import { useEffect, useRef } from 'react'

// ─── Tipi di particella — tutti elementi decorativi da pasticceria ────────────
// foglia d'oro · stella di zucchero · perla · cuoricino rosso (torte d'amore)
type PType = 'leaf' | 'star' | 'pearl' | 'heart'

interface Particle {
  x: number; y: number
  vx: number; vy: number; baseVy: number
  rotation: number; rotSpeed: number
  size: number; opacity: number
  color: string; type: PType
  pts: [number, number][]
  phase: number
}

// ─── Palette brand ────────────────────────────────────────────────────────────
const GOLDS = ['#C9982A', '#D4A830', '#DFB638', '#B88820', '#C8A42E']

// ─── Generatori di forma ──────────────────────────────────────────────────────
function leafPts(size: number): [number, number][] {
  const n = 5 + Math.floor(Math.random() * 3)
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + (Math.random() - 0.5) * 0.85
    const r = size * (0.55 + Math.random() * 0.55)
    return [Math.cos(a) * r, Math.sin(a) * r]
  })
}

function starPts(size: number): [number, number][] {
  return Array.from({ length: 8 }, (_, i) => {
    const r = i % 2 === 0 ? size : size * 0.42
    const a = (i / 8) * Math.PI * 2 - Math.PI / 4
    return [Math.cos(a) * r, Math.sin(a) * r]
  })
}

// ─── Spawn ────────────────────────────────────────────────────────────────────
function spawn(W: number, fromTop = false): Particle {
  const r = Math.random()
  const type: PType =
    r < 0.48 ? 'leaf' :
    r < 0.70 ? 'star' :
    r < 0.84 ? 'pearl' : 'heart'

  const size =
    type === 'leaf'  ? 9  + Math.random() * 13 :
    type === 'star'  ? 4  + Math.random() * 7  :
    type === 'heart' ? 5  + Math.random() * 7  :
                       2.5 + Math.random() * 3

  const baseVy = 0.22 + Math.random() * 0.48

  return {
    x: Math.random() * W,
    y: fromTop ? -(size + Math.random() * 120) : Math.random() * 2000,
    vx: (Math.random() - 0.5) * 0.38,
    vy: baseVy, baseVy,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.020,
    size,
    opacity: 0.50 + Math.random() * 0.40,
    color: type === 'heart' ? '#B20D02' : GOLDS[Math.floor(Math.random() * GOLDS.length)],
    type,
    pts: type === 'leaf' ? leafPts(size)
       : type === 'star' ? starPts(size)
       : [],
    phase: Math.random() * Math.PI * 2,
  }
}

// ─── Disegno ──────────────────────────────────────────────────────────────────
function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.globalAlpha = p.opacity

  if (p.type === 'pearl') {
    const g = ctx.createRadialGradient(-p.size * 0.3, -p.size * 0.3, 0, 0, 0, p.size)
    g.addColorStop(0, 'rgba(255,255,255,0.95)')
    g.addColorStop(0.55, 'rgba(253,254,252,0.80)')
    g.addColorStop(1, 'rgba(228,228,218,0.40)')
    ctx.beginPath()
    ctx.arc(0, 0, p.size, 0, Math.PI * 2)
    ctx.fillStyle = g
    ctx.fill()

  } else if (p.type === 'heart') {
    // cuoricino — decorazione classica sulle torte d'amore
    const s = p.size * 0.55
    ctx.beginPath()
    ctx.moveTo(0, s * 0.35)
    ctx.bezierCurveTo(-s * 0.85, -s * 0.15, -s * 1.05, s * 0.55, 0, s * 1.05)
    ctx.bezierCurveTo(s * 1.05, s * 0.55, s * 0.85, -s * 0.15, 0, s * 0.35)
    ctx.fillStyle = p.color
    ctx.fill()

  } else {
    // foglia d'oro o stella di zucchero
    ctx.beginPath()
    ctx.moveTo(p.pts[0][0], p.pts[0][1])
    for (let i = 1; i < p.pts.length; i++) ctx.lineTo(p.pts[i][0], p.pts[i][1])
    ctx.closePath()
    ctx.fillStyle = p.color
    ctx.fill()
    // riflesso dorato
    ctx.strokeStyle = 'rgba(255,225,110,0.22)'
    ctx.lineWidth = 0.6
    ctx.stroke()
  }

  ctx.restore()
}

// ─── Componente ───────────────────────────────────────────────────────────────
const COUNT = 105

export default function GoldLeafCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      // rigenerai le particelle al resize per distribuirle correttamente
      if (particles.current.length === 0) {
        particles.current = Array.from({ length: COUNT }, () =>
          spawn(canvas.width, false)
        )
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // mouse/touch
    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = {
        x: e.touches[0].clientX - r.left,
        y: e.touches[0].clientY - r.top,
      }
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })

    let raf: number

    const animate = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (const p of particles.current) {
        // repulsione mouse/tocco
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const d2 = dx * dx + dy * dy
        if (d2 < 8100 && d2 > 0) {
          const d = Math.sqrt(d2)
          const force = (90 - d) / 90 * 1.3
          p.vx += (dx / d) * force * 0.065
          p.vy += (dy / d) * force * 0.065
        }

        // ammortizzamento verso velocità base
        p.vx *= 0.97
        p.vy  = p.vy * 0.98 + p.baseVy * 0.02

        // oscillazione orizzontale per le foglie
        if (p.type === 'leaf') {
          p.phase += 0.011
          p.vx += Math.sin(p.phase) * 0.007
        }
        // scintillio stelle
        if (p.type === 'star') {
          p.phase += 0.032
          p.opacity = 0.32 + Math.abs(Math.sin(p.phase)) * 0.58
        }
        // pulsazione cuoricini
        if (p.type === 'heart') {
          p.phase += 0.018
          p.opacity = 0.38 + Math.abs(Math.sin(p.phase * 0.7)) * 0.40
        }

        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed

        // wrap orizzontale
        if (p.x < -35) p.x = W + 25
        if (p.x > W + 35) p.x = -25

        // respawn dall'alto quando esce dal basso
        if (p.y > H + 45) {
          const fresh = spawn(W, true)
          Object.assign(p, fresh)
        }

        drawParticle(ctx, p)
      }

      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
