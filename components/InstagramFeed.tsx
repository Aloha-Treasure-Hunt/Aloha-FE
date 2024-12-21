'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
}

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/instagram')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data.posts)
      } catch (err) {
        setError('Failed to load Instagram feed')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
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

  return (
    <section className="py-12 bg-amber-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-800">Adventure Moments</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square group overflow-hidden rounded-lg"
            >
              <Image
                src={post.media_url}
                alt={post.caption || 'Instagram post'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

