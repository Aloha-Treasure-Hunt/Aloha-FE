import { Header } from '@/components/Header'
import { Map } from '@/components/Map'
import { Leaderboard } from '@/components/Leaderboard'
import { InstagramFeed } from '@/components/InstagramFeed'

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />
      <main>
        <section className="py-12 bg-gradient-to-b from-amber-100 to-amber-50">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-amber-800">Discover Hidden Gems, Mom-and-Pop Shops, and More</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Map />
              </div>
              <Leaderboard />
            </div>
          </div>
        </section>
        <InstagramFeed />
      </main>
      <footer className="bg-amber-800 text-amber-100 py-4 text-center">
        <p>&copy; 2024 Da Nang Treasure Hunt. All rights reserved.</p>
      </footer>
    </div>
  )
}

