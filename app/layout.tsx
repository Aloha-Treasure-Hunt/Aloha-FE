import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Danang Treasure Hunt',
  description: 'Explore Danang through an exciting treasure hunt adventure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

