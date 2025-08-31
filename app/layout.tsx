import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Providers from './providers'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'SportChain – Change the future of sports',
    template: '%s | SportChain',
  },
  description:
    'Tokenize and democratize sports facility ownership. Invest in real-world sports infrastructure and earn passive income through blockchain technology.',
  generator: 'SportChain',
  keywords: [
    'SportChain',
    'sports investment',
    'tokenized assets',
    'blockchain',
    'sports infrastructure',
    'passive income',
    'real estate',
    'crypto',
    'web3',
    'facility ownership',
  ],
  openGraph: {
    title: 'SportChain – change the future of sports in Latin America',
    description:
      'Tokenize and democratize sports facility ownership. Invest in real-world sports infrastructure and earn passive income through blockchain technology.',
    url: 'https://sportchain.app',
    siteName: 'SportChain',
    images: [
      {
        url: '/sportchain_og.png',
        width: 1200,
        height: 630,
        alt: 'SportChain – Invest in Sports Infrastructure',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportChain – Invest in Sports Infrastructure',
    description:
      'Tokenize and democratize sports facility ownership. Invest in real-world sports infrastructure and earn passive income through blockchain technology.',
    images: ['/sportchain_og.png'],
    creator: '@sportchain_app',
  },
  metadataBase: new URL('https://sportchain.app'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1cf62e' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Providers>
          <NavBar />
          {children}
          <Analytics />
        </Providers>
        <Footer />
      </body>
      
    </html>
  )
}
