'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function registerUser(formData: {
  name: string
  email: string
  instagramHandle: string
  teamOption: 'join' | 'create'
  teamName: string
  teamId?: string
  donationAmount: string
}) {
  try {
    const cookieStore = cookies()
    
    // Create admin client for registration
    const adminClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
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

    // Create auth user with magic link settings
    const { data: { user }, error: authError } = await adminClient.auth.admin.createUser({
      email: formData.email,
      email_confirm: true,
      user_metadata: {
        name: formData.name,
        instagram_handle: formData.instagramHandle,
        team_option: formData.teamOption,
        team_name: formData.teamName,
        donation_amount: parseFloat(formData.donationAmount),
      }
    })

    if (authError) throw authError
    if (!user) throw new Error('No user data returned')

    // Send magic link email with redirect
    const { error: signInError } = await adminClient.auth.signInWithOtp({
      email: formData.email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (signInError) throw signInError

    // Wait a moment for the trigger to complete
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update the profile with additional information instead of creating it
    const { error: profileError } = await adminClient
      .from('profiles')
      .update({
        instagram_handle: formData.instagramHandle || null,
        donation_amount: parseFloat(formData.donationAmount),
      })
      .eq('id', user.id)

    if (profileError) {
      console.error('Profile update error:', profileError)
      throw new Error('Failed to update profile')
    }

    // Handle team assignment
    if (formData.teamOption === 'join' && formData.teamId) {
      // Update profile with selected team_id
      const { error: updateError } = await adminClient
        .from('profiles')
        .update({ team_id: formData.teamId })
        .eq('id', user.id)

      if (updateError) {
        console.error('Profile update error:', updateError)
        throw new Error('Failed to join team')
      }
    } else if (formData.teamOption === 'create' && formData.teamName) {
      // Handle team creation if needed
      const { data: teamData, error: teamError } = await adminClient
        .from('teams')
        .insert([{ 
          name: formData.teamName,
          created_by: user.id
        }])
        .select('id')
        .single()

      if (teamError) {
        console.error('Team creation error:', teamError)
        throw new Error('Failed to create team')
      }

      if (!teamData) throw new Error('No team data returned')

      // Update profile with team_id
      const { error: updateError } = await adminClient
        .from('profiles')
        .update({ team_id: teamData.id })
        .eq('id', user.id)

      if (updateError) {
        console.error('Profile update error:', updateError)
        throw new Error('Failed to update profile with team')
      }
    }

    return { 
      success: true, 
      message: 'Registration successful! Check your email for a login link.' 
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Registration failed'
    }
  }
}