import { MapComponent } from '@/components/MapComponent'
import { Leaderboard } from '@/components/Leaderboard'
import { InstagramFeed } from '@/components/InstagramFeed'

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-amber-800 mb-8">
        Treasure Hunt Dashboard
      </h1>
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MapComponent />
          <Leaderboard />
        </div>
        <div className="w-full">
          <InstagramFeed />
        </div>
      </div>
    </main>
  )
} 