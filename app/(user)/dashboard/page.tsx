import Leaderboard from '@/components/leaderboard/Leaderboard';
import { MapComponent } from '@/components/maps/MapComponent';

export default function Dashboard() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center text-amber-800 mb-8'>
        Treasure Hunt Dashboard
      </h1>

      <div className='space-y-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 '>
          <MapComponent />
          <Leaderboard />
        </div>

        {/* <section className='bg-amber-50 rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-amber-800 mb-6 text-center'>
            Adventure Gallery
          </h2>
          <MasonryGallery />
        </section> */}
      </div>
    </main>
  );
}
