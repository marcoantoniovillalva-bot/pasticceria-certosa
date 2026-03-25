import type { Metadata } from 'next'
import { Great_Vibes, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CookieBanner from '@/components/CookieBanner'
import SchemaMarkup from '@/components/SchemaMarkup'

const script = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

const sans = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Delizie della Certosa — Pasticceria, Pizzeria e Panificio a Certosa di Pavia',
  description: 'Pasticceria artigianale, pizzeria con consegna a domicilio e panificio a Certosa di Pavia. Cannoli siciliani, torte personalizzate e cortile da 600m² per eventi. Chiamaci o ordina su WhatsApp.',
  keywords: [
    'pasticceria Certosa di Pavia',
    'pizzeria Certosa di Pavia',
    'panificio Certosa di Pavia',
    'torte personalizzate Pavia',
    'cannoli siciliani Pavia',
    'pizza a domicilio Certosa di Pavia',
    'catering eventi Pavia',
    'dolci siciliani Pavia',
    'Delizie della Certosa',
  ],
  authors: [{ name: 'Delizie della Certosa' }],
  creator: 'Delizie della Certosa',
  metadataBase: new URL('https://www.deliziedellacertosa.it'),
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.deliziedellacertosa.it',
    siteName: 'Delizie della Certosa',
    title: 'Delizie della Certosa — Pasticceria, Pizzeria e Panificio a Certosa di Pavia',
    description: 'Pasticceria artigianale, pizzeria con consegna a domicilio e panificio a Certosa di Pavia. Cannoli siciliani, torte personalizzate e cortile da 600m² per eventi.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Delizie della Certosa — Pasticceria, Pizzeria e Panificio a Certosa di Pavia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delizie della Certosa — Pasticceria, Pizzeria e Panificio a Certosa di Pavia',
    description: 'Pasticceria artigianale, pizzeria con consegna a domicilio e panificio a Certosa di Pavia. Cannoli siciliani, torte personalizzate e cortile da 600m² per eventi.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: '',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${script.variable} ${sans.variable}`}>
      <body>
        <SchemaMarkup />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  )
}
