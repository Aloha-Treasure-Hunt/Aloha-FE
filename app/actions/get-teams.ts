'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export type Team = {
  id: string
  name: string
}

export async function getTeams(): Promise<Team[]> {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value ?? ''
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

    const { data, error } = await supabase
      .from('teams')
      .select('id, name')
      .order('name')

    if (error) {
      console.error('Error fetching teams:', error)
      throw error
    }

    console.log('Teams fetched:', data) // Debug log
    return data || []
  } catch (error) {
    console.error('Error in getTeams:', error)
    return []
  }
} 