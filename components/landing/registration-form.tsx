'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagramHandle: '',
    teamOption: 'join',
    teamName: '',
    donationAmount: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: crypto.randomUUID(),
        options: {
          data: {
            name: formData.name,
            instagram_handle: formData.instagramHandle,
            team_name: formData.teamOption === 'create' ? formData.teamName : null,
            donation_amount: parseFloat(formData.donationAmount),
          }
        }
      })

      if (authError) throw authError
      
      router.push('/dashboard')
    } catch (err) {
      setError('Registration failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
        <input
          type="text"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
          Instagram Handle (optional)
        </label>
        <input
          type="text"
          id="instagram"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
          value={formData.instagramHandle}
          onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="donation" className="block text-sm font-medium text-gray-700">
          Donation Amount *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="donation"
            required
            min="1"
            step="0.01"
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.donationAmount}
            onChange={(e) => setFormData({ ...formData, donationAmount: e.target.value })}
          />
        </div>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-gray-700">Team Option *</legend>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="teamOption"
              value="join"
              checked={formData.teamOption === 'join'}
              onChange={(e) => setFormData({ ...formData, teamOption: e.target.value })}
              className="form-radio text-amber-600"
            />
            <span className="ml-2">Join a Team</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="teamOption"
              value="create"
              checked={formData.teamOption === 'create'}
              onChange={(e) => setFormData({ ...formData, teamOption: e.target.value })}
              className="form-radio text-amber-600"
            />
            <span className="ml-2">Create a Team</span>
          </label>
        </div>
      </fieldset>

      {formData.teamOption === 'create' && (
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
            Team Name *
          </label>
          <input
            type="text"
            id="teamName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
            value={formData.teamName}
            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
          />
        </div>
      )}

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-600 text-white py-3 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Registering...' : 'Start the Hunt'}
      </button>
    </form>
  )
} 