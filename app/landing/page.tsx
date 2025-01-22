import { FC } from 'react'
import { FAQ } from '@/components/landing/faq'
import { LandingMapComponent } from '@/components/LandingMapComponent'

export const metadata = {
  title: 'City Treasure Hunt - Join the Adventure',
  description: 'Explore the city, solve clues, complete challenges, and win prizes in this exciting five-day treasure hunt adventure!',
}

const Page: FC = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="heading-large">
            The Hunt is On!
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Complete Side Quests & Win Prizes in this free Treasure Hunt!
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="card p-8">
            <h2 className="heading-medium mb-6">
              How to Play
            </h2>
            <div className="prose">
              <ol className="list-decimal list-inside space-y-4">
                <li>Join the <a href="https://chat.whatsapp.com/Gzff8wsNHlqERDmtD8Bck4" className="text-amber-700 hover:underline">WhatsApp Group</a> to join the hunt!</li>
                <li>Check the <a href="/clues" className="text-amber-700 hover:underline">Clues</a> page to see the first clue</li>
                <li>Visit the <a href="/dashboard" className="text-amber-700 hover:underline">Dashboard</a> to see the map and Teams Leaderboard</li>
                <li>Solve clues to find cool hidden-gem businesses in the city. Each business has a verification code that you can enter to unlock the next clue</li>
                <li>Share your adventure on Instagram with #AVNTreasureHunt</li>
                <li>Complete <a href="/challenges" className="text-amber-700 hover:underline">Side Quests</a> and post them for additional points</li>
                <li>The top teams will win small prizes such as vouchers for surf lessons, yoga classes, and more</li>
              </ol>
            </div>
          </section>

          <section className="card p-8">
            <h2 className="heading-medium mb-6">
              Hunt Area
            </h2>
            <LandingMapComponent />
          </section>
        </div>

        <FAQ />
      </div>
    </main>
  )
}

export default Page 