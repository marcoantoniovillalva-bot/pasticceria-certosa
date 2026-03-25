'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/pasticceria', label: 'Pasticceria' },
  { href: '/torte-personalizzate', label: 'Torte' },
  { href: '/dolci-siciliani', label: 'Dolci Siciliani' },
  { href: '/pizza-a-domicilio', label: 'Pizza' },
  { href: '/catering-ed-eventi', label: 'Catering & Eventi' },
  { href: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'pt-3 pb-0 px-4 lg:px-6' : 'py-0'
      }`}
    >
      {/* Gold top border — solo a inizio pagina */}
      {!scrolled && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9982A] to-transparent opacity-80" />
      )}

      <nav
        className={`flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'max-w-7xl mx-auto bg-[#222C35] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl px-5 py-2.5 border border-[#C9982A]/15'
            : 'max-w-7xl mx-auto bg-gradient-to-b from-[#222C35]/85 to-transparent px-4 py-4'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/logo.png"
            alt="Delizie della Certosa"
            width={160}
            height={64}
            className="h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="nav-link font-sans font-semibold tracking-widest uppercase text-xs text-[#FDFEFC]/85 hover:text-[#C9982A] transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="https://wa.link/8kwj8i"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-5 py-2.5 text-xs font-sans font-bold tracking-widest uppercase rounded-full transition-all hover:bg-[#B20D02]/90 hover:scale-105 hover:shadow-lg hover:shadow-[#B20D02]/40"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.559 4.118 1.535 5.847L.057 23.882l6.188-1.623A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.36-.213-3.724.977.995-3.638-.235-.374A9.818 9.818 0 1112 21.818z" />
          </svg>
          Ordina su WhatsApp
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#FDFEFC] p-2 flex flex-col gap-1.5 rounded-lg"
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
        >
          <span className={`block w-6 h-0.5 bg-[#FDFEFC] transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#FDFEFC] transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#FDFEFC] transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-400 overflow-hidden ${
          scrolled ? 'mx-4 lg:mx-6' : ''
        } ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className={`bg-[#222C35] border-t border-[#C9982A]/20 ${scrolled ? 'rounded-b-2xl' : ''}`}>
          <ul className="px-5 pb-6 pt-3 flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex items-center gap-2 font-sans font-semibold tracking-widest uppercase text-sm text-[#FDFEFC]/80 hover:text-[#C9982A] transition-colors py-3 border-b border-[#FDFEFC]/8"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <a
                href="https://wa.link/8kwj8i"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-5 py-3.5 text-sm font-sans font-bold tracking-widest uppercase rounded-full"
                onClick={() => setOpen(false)}
              >
                Ordina su WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
