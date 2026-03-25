'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ardesia border-t border-cream/10 px-3 py-3 md:px-4 md:py-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
        <p className="text-xs md:text-sm text-cream/80 leading-relaxed max-w-2xl">
          Utilizziamo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso,
          utilizziamo anche cookie analitici (Google Analytics) per migliorare la tua esperienza.
          Consulta la nostra{' '}
          <Link href="/cookie-policy" className="text-rosso hover:underline">
            Cookie Policy
          </Link>{' '}
          e la{' '}
          <Link href="/privacy-policy" className="text-rosso hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-sans font-600 tracking-wider uppercase border border-cream/30 text-cream/60 hover:text-cream hover:border-cream/60 transition-colors"
          >
            Rifiuta
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-1.5 text-xs font-sans font-600 tracking-wider uppercase bg-rosso text-cream hover:bg-rosso/90 transition-colors"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  )
}
