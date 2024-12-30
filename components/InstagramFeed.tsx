'use client'

import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { InstagramStories } from './instagram/instagram-stories'
import { InstagramPost } from './instagram/instagram-post'
import type { InstagramResponse } from '@/app/api/instagram/types'

export function InstagramFeed() {
  const [data, setData] = useState<InstagramResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('/api/instagram')
        if (!response.ok) {
          throw new Error(response.status === 429 
            ? 'Rate limit exceeded. Please try again later.'
            : 'Failed to fetch Instagram content'
          )
        }
        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load Instagram feed')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto text-center">
          <LoadingSpinner />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto text-center text-red-600">
          {error}
        </div>
      </section>
    )
  }

  if (!data) return null

  return (
    <section className="py-12 bg-amber-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-800">
          Adventure Moments
        </h2>
        
        <InstagramStories stories={data.stories} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.posts.map((post) => (
            <InstagramPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

