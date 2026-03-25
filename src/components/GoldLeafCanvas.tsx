'use client'

import { useEffect, useRef } from 'react'

// ─── Tipi — strumenti da pasticceria disegnati a mano sul canvas ──────────────
type PType = 'hat' | 'rollingpin' | 'pipingbag' | 'star' | 'spoon' | 'cupcake'

interface Particle {
  x: number; y: number
  vx: number; vy: number; baseVy: number
  rotation: number; rotSpeed: number
  size: number; opacity: number
  color: string; type: PType
  phase: number; flip: number
}

// ─── Palette brand ────────────────────────────────────────────────────────────
const GOLDS = ['#C9982A', '#D4A830', '#DFB638', '#B88820', '#C8A42E']

// ─── Helper: rounded rect senza roundRect (compatibilità browser) ─────────────
function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ─── Disegno cappello da chef ─────────────────────────────────────────────────
function drawHat(ctx: CanvasRenderingContext2D, s: number, c: string) {
  // fascia bassa
  rrect(ctx, -s * 0.72, s * 0.22, s * 1.44, s * 0.28, s * 0.06)
  ctx.fillStyle = c + '55'
  ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1.2; ctx.stroke()

  // cupola gonfia
  ctx.beginPath()
  ctx.moveTo(-s * 0.52, s * 0.24)
  ctx.bezierCurveTo(-s * 0.72, -s * 0.30, -s * 0.60, -s * 0.95, 0, -s * 0.98)
  ctx.bezierCurveTo(s * 0.60, -s * 0.95, s * 0.72, -s * 0.30, s * 0.52, s * 0.24)
  ctx.closePath()
  ctx.fillStyle = c + '30'
  ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1.3; ctx.stroke()

  // righine decorative sulla cupola
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath()
    ctx.moveTo(i * s * 0.25, s * 0.20)
    ctx.bezierCurveTo(i * s * 0.28, -s * 0.25, i * s * 0.20, -s * 0.65, i * s * 0.10, -s * 0.90)
    ctx.strokeStyle = c + '40'; ctx.lineWidth = 0.7; ctx.stroke()
  }
}

// ─── Disegno mattarello ───────────────────────────────────────────────────────
function drawRollingPin(ctx: CanvasRenderingContext2D, s: number, c: string) {
  // manico sinistro
  rrect(ctx, -s * 1.38, -s * 0.20, s * 0.32, s * 0.40, s * 0.08)
  ctx.fillStyle = c + '50'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1; ctx.stroke()

  // manico destro
  rrect(ctx, s * 1.06, -s * 0.20, s * 0.32, s * 0.40, s * 0.08)
  ctx.fillStyle = c + '50'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1; ctx.stroke()

  // cilindro centrale
  rrect(ctx, -s * 1.06, -s * 0.26, s * 2.12, s * 0.52, s * 0.26)
  ctx.fillStyle = c + '35'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1.5; ctx.stroke()

  // linee texture sul cilindro
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath()
    ctx.moveTo(i * s * 0.28, -s * 0.26)
    ctx.lineTo(i * s * 0.28, s * 0.26)
    ctx.strokeStyle = c + '35'; ctx.lineWidth = 0.6; ctx.stroke()
  }
}

// ─── Disegno sac-à-poche ──────────────────────────────────────────────────────
function drawPipingBag(ctx: CanvasRenderingContext2D, s: number, c: string) {
  // corpo a cono
  ctx.beginPath()
  ctx.moveTo(0, s * 0.85)
  ctx.bezierCurveTo(-s * 0.15, s * 0.50, -s * 0.62, -s * 0.20, -s * 0.58, -s * 0.72)
  ctx.bezierCurveTo(-s * 0.20, -s * 0.92, s * 0.20, -s * 0.92, s * 0.58, -s * 0.72)
  ctx.bezierCurveTo(s * 0.62, -s * 0.20, s * 0.15, s * 0.50, 0, s * 0.85)
  ctx.closePath()
  ctx.fillStyle = c + '35'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1.2; ctx.stroke()

  // legatura in alto
  ctx.beginPath()
  ctx.moveTo(-s * 0.58, -s * 0.72)
  ctx.bezierCurveTo(-s * 0.30, -s * 1.00, s * 0.30, -s * 1.00, s * 0.58, -s * 0.72)
  ctx.strokeStyle = c; ctx.lineWidth = 2.0; ctx.lineCap = 'round'; ctx.stroke()

  // bocchetta a stella (6 punte)
  ctx.beginPath()
  const n = 6
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? s * 0.14 : s * 0.07
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2
    const px = Math.cos(a) * r, py = s * 0.85 + Math.sin(a) * r
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fillStyle = c; ctx.fill()
}

// ─── Disegno stella decorativa ────────────────────────────────────────────────
function drawStar(ctx: CanvasRenderingContext2D, s: number, c: string) {
  ctx.beginPath()
  const pts = 8
  for (let i = 0; i < pts * 2; i++) {
    const r = i % 2 === 0 ? s : s * 0.42
    const a = (i / (pts * 2)) * Math.PI * 2 - Math.PI / 8
    i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
            : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  ctx.closePath()
  ctx.fillStyle = c + '50'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1; ctx.stroke()

  // cerchio centrale
  ctx.beginPath()
  ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2)
  ctx.fillStyle = c; ctx.fill()
}

// ─── Disegno cucchiaio ────────────────────────────────────────────────────────
function drawSpoon(ctx: CanvasRenderingContext2D, s: number, c: string) {
  // testa ovale
  ctx.beginPath()
  ctx.ellipse(0, -s * 0.55, s * 0.30, s * 0.42, 0, 0, Math.PI * 2)
  ctx.fillStyle = c + '45'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1.2; ctx.stroke()

  // manico curvo
  ctx.beginPath()
  ctx.moveTo(s * 0.06, -s * 0.14)
  ctx.bezierCurveTo(s * 0.16, s * 0.20, s * 0.10, s * 0.60, s * 0.02, s * 0.95)
  ctx.strokeStyle = c; ctx.lineWidth = s * 0.13; ctx.lineCap = 'round'; ctx.stroke()

  // riflesso nel cucchiaio
  ctx.beginPath()
  ctx.ellipse(-s * 0.08, -s * 0.62, s * 0.08, s * 0.14, -0.3, 0, Math.PI * 2)
  ctx.fillStyle = c + '60'; ctx.fill()
}

// ─── Disegno cupcake ──────────────────────────────────────────────────────────
function drawCupcake(ctx: CanvasRenderingContext2D, s: number, c: string) {
  // pirottino (trapezio con righine)
  ctx.beginPath()
  ctx.moveTo(-s * 0.55, s * 0.08)
  ctx.lineTo(-s * 0.42, s * 0.95)
  ctx.lineTo(s * 0.42, s * 0.95)
  ctx.lineTo(s * 0.55, s * 0.08)
  ctx.closePath()
  ctx.fillStyle = c + '40'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1; ctx.stroke()

  // righine verticali pirottino
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath()
    ctx.moveTo(i * s * 0.20 + (i * s * 0.03), s * 0.10)
    ctx.lineTo(i * s * 0.18 + (i * s * 0.03), s * 0.93)
    ctx.strokeStyle = c + '50'; ctx.lineWidth = 0.6; ctx.stroke()
  }

  // glassa a swirl
  ctx.beginPath()
  ctx.moveTo(-s * 0.58, s * 0.10)
  ctx.bezierCurveTo(-s * 0.80, -s * 0.35, -s * 0.50, -s * 0.88, 0, -s * 0.82)
  ctx.bezierCurveTo(s * 0.50, -s * 0.88, s * 0.80, -s * 0.35, s * 0.58, s * 0.10)
  ctx.closePath()
  ctx.fillStyle = c + '40'; ctx.fill()
  ctx.strokeStyle = c; ctx.lineWidth = 1.2; ctx.stroke()

  // swirl line decorativa
  ctx.beginPath()
  ctx.moveTo(-s * 0.30, -s * 0.10)
  ctx.bezierCurveTo(-s * 0.10, -s * 0.60, s * 0.20, -s * 0.72, s * 0.10, -s * 0.30)
  ctx.strokeStyle = c + '55'; ctx.lineWidth = 0.8; ctx.stroke()

  // ciliegina rossa
  ctx.beginPath()
  ctx.arc(0, -s * 0.88, s * 0.11, 0, Math.PI * 2)
  ctx.fillStyle = '#B20D02'; ctx.fill()
  ctx.strokeStyle = '#900A01'; ctx.lineWidth = 0.6; ctx.stroke()
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────
function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.globalAlpha = p.opacity
  ctx.scale(p.flip, 1)

  switch (p.type) {
    case 'hat':       drawHat(ctx, p.size, p.color);       break
    case 'rollingpin':drawRollingPin(ctx, p.size, p.color); break
    case 'pipingbag': drawPipingBag(ctx, p.size, p.color); break
    case 'star':      drawStar(ctx, p.size, p.color);      break
    case 'spoon':     drawSpoon(ctx, p.size, p.color);     break
    case 'cupcake':   drawCupcake(ctx, p.size, p.color);   break
  }

  ctx.restore()
}

// ─── Spawn ────────────────────────────────────────────────────────────────────
const TYPES: PType[] = ['hat', 'rollingpin', 'pipingbag', 'spoon', 'cupcake']

function spawn(W: number, fromTop = false): Particle {
  // distribuzione bilanciata senza stelle
  const weights = [0.22, 0.16, 0.22, 0.20, 0.20]
  let r = Math.random(), cum = 0, idx = 0
  for (let i = 0; i < weights.length; i++) {
    cum += weights[i]
    if (r < cum) { idx = i; break }
  }
  const type = TYPES[idx]

  const size =
    type === 'rollingpin' ? 8  + Math.random() * 10 :
    type === 'hat'        ? 12 + Math.random() * 12 :
    type === 'cupcake'    ? 10 + Math.random() * 12 :
    type === 'pipingbag'  ? 10 + Math.random() * 10 :
    type === 'spoon'      ? 10 + Math.random() * 10 :
                            7  + Math.random() * 9

  const baseVy = 0.18 + Math.random() * 0.32

  return {
    x: Math.random() * W,
    y: fromTop ? -(size * 2.5 + Math.random() * 120) : Math.random() * 2000,
    vx: (Math.random() - 0.5) * 0.28,
    vy: baseVy, baseVy,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.014,
    size,
    opacity: 0.40 + Math.random() * 0.45,
    color: GOLDS[Math.floor(Math.random() * GOLDS.length)],
    type,
    phase: Math.random() * Math.PI * 2,
    flip: Math.random() > 0.5 ? 1 : -1,
  }
}

// ─── Componente ───────────────────────────────────────────────────────────────
const COUNT = 75

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
      if (particles.current.length === 0) {
        particles.current = Array.from({ length: COUNT }, () => spawn(canvas.width, false))
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top }
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

        p.vx *= 0.97
        p.vy  = p.vy * 0.98 + p.baseVy * 0.02

        // oscillazione orizzontale dolce
        p.phase += 0.011
        p.vx += Math.sin(p.phase) * 0.006

        // stelle scintillano
        if (p.type === 'star') {
          p.opacity = 0.30 + Math.abs(Math.sin(p.phase * 2.8)) * 0.55
        }

        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed

        // wrap orizzontale
        if (p.x < -50) p.x = W + 40
        if (p.x > W + 50) p.x = -40

        // respawn dall'alto
        if (p.y > H + 55) {
          Object.assign(p, spawn(W, true))
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
