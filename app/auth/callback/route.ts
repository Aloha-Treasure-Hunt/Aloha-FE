import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'
  const origin = requestUrl.origin

  if (code) {
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
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              console.error('Error setting cookie:', error)
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.delete({ name, ...options })
            } catch (error) {
              console.error('Error removing cookie:', error)
            }
          },
        },
      }
    )

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        // Get the session to confirm authentication worked
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          // Successfully authenticated, redirect to dashboard
          return NextResponse.redirect(`${origin}/dashboard`, {
            status: 302,
          })
        }
      } else {
        console.error('Auth error:', error)
      }
    } catch (error) {
      console.error('Callback error:', error)
    }
  }

  // Return to landing page if anything fails
  return NextResponse.redirect(`${origin}/landing`, {
    status: 302,
  })
}