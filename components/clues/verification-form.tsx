'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useVerification } from '@/hooks/use-verification'

export function VerificationForm() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const { verify, isVerified } = useVerification()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await verify(code)
    } catch (err) {
      setError('Invalid verification code. Please try again.')
    }
  }

  if (isVerified) {
    return null
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-amber-200">
      <h2 className="text-xl font-semibold mb-4 text-amber-800">Unlock More Clues</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Verify Code
        </Button>
      </form>
    </div>
  )
} 