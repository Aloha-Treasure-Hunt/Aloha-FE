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
            City Treasure Hunt
          </h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Explore the city, solve clues, complete challenges and win prizes in this exciting five-day adventure!
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="card p-8">
            <h2 className="heading-medium mb-6">
              How to Play
            </h2>
            <div className="prose">
              <ol className="list-decimal list-inside space-y-4">
                <li>Message us on <a href="https://wa.me/message/OSXOZZSAAUXCP1" className="text-amber-700 hover:underline">WhatsApp</a> or <a href="https://www.instagram.com/alohavietnamretreat/profilecard/?igsh=M2hwaWFoODF2ZnM0" className="text-amber-700 hover:underline">Instagram</a> to join the hunt as an individual or team</li>
                <li>Join the <a href="https://discord.gg/9eEdbrgb" className="text-amber-700 hover:underline">Discord Server</a> to find a team, get updates, share hints (or not lol) and more</li>
                <li>Once we receive your message, we will send you the first clue or you can check the <a href="/clues" className="text-amber-700 hover:underline">Clues</a> page</li>
                <li>Visit the <a href="/dashboard" className="text-amber-700 hover:underline">Dashboard</a> to see the map and Teams Leaderboard</li>
                <li>Solve clues to unlock new locations</li>
                <li>Visit locations to find verification codes</li>
                <li>Enter codes to unlock more clues</li>
                <li>Share your adventure on Instagram with #AVNTreasureHunt</li>
                <li>Complete <a href="/challenges" className="text-amber-700 hover:underline">Challenges</a> and post them to your story and tag us for additional points</li>
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