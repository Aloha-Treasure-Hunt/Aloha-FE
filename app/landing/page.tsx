import { FC } from 'react'
import { FAQ } from '@/components/landing/faq'
import { InstagramFeed } from '@/components/InstagramFeed'

export const metadata = {
  title: 'City Treasure Hunt - Join the Adventure',
  description: 'Explore the city, solve clues, and win prizes in this exciting two-day treasure hunt adventure!',
}

const Page: FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800">
            City Treasure Hunt
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Explore the city, solve clues, and win prizes in this exciting two-day adventure!
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">
              How to Play
            </h2>
            <div className="prose">
              <ol className="list-decimal list-inside space-y-4">
                <li>Visit the Dashboard to see the map and available clues</li>
                <li>Solve clues to unlock new locations</li>
                <li>Visit locations to find verification codes</li>
                <li>Enter codes to unlock more clues</li>
                <li>Share your adventure on Instagram with #CityTreasureHunt</li>
              </ol>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">
              Latest Updates
            </h2>
            <InstagramFeed />
          </section>
        </div>

        <FAQ />
      </div>
    </main>
  )
}

export default Page 