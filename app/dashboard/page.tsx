import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { MapComponent } from '@/components/MapComponent'
import { Leaderboard } from '@/components/Leaderboard'
import { InstagramFeed } from '@/components/InstagramFeed'

export default async function Dashboard() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/landing')
  }

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