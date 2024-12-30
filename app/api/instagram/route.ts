import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import type { InstagramMediaItem, InstagramStory } from './types'

// ============= SIMPLE IN-MEMORY RATE LIMITING =============
type RateLimitWindow = {
  timestamp: number
  count: number
}

const ipRequests = new Map<string, RateLimitWindow>()

class RateLimiter {
  private windowMs: number
  private maxRequests: number

  constructor(windowMs = 3600000, maxRequests = 200) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  async limit(ip: string): Promise<boolean> {
    const now = Date.now()
    const windowStart = now - this.windowMs

    // Clean old entries
    for (const [key, window] of ipRequests.entries()) {
      if (window.timestamp < windowStart) {
        ipRequests.delete(key)
      }
    }

    const currentWindow = ipRequests.get(ip) || {
      timestamp: now,
      count: 0
    }

    if (currentWindow.timestamp < windowStart) {
      currentWindow.timestamp = now
      currentWindow.count = 0
    }

    currentWindow.count++
    ipRequests.set(ip, currentWindow)

    return currentWindow.count <= this.maxRequests
  }
}

// Initialize simple rate limiter
const rateLimiter = new RateLimiter()

// ============= UPSTASH CONFIGURATION (COMMENTED) =============
/*
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Upstash rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(200, '1 h'),
})
*/

// ============= SHARED CONFIGURATION =============
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const INSTAGRAM_BUSINESS_ID = process.env.INSTAGRAM_BUSINESS_ID
const CACHE_TAG = 'instagram-feed'
const CACHE_REVALIDATE_TIME = 3600 // 1 hour

async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
    }
  }
}

const fetchInstagramContent = unstable_cache(
  async () => {
    try {
      const [storiesResponse, hashtagResponse, profileResponse] = await Promise.all([
        fetchWithRetry(
          `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/stories?fields=media_type,media_url,thumbnail_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`
        ),
        fetchWithRetry(
          `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/tags?fields=media{id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,children{media_type,media_url,thumbnail_url}}&access_token=${INSTAGRAM_ACCESS_TOKEN}`
        ),
        fetchWithRetry(
          `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,children{media_type,media_url,thumbnail_url}&access_token=${INSTAGRAM_ACCESS_TOKEN}`
        )
      ])

      const stories: InstagramStory[] = storiesResponse.data.map((story: any) => ({
        ...story,
        expiry: Date.now() + 24 * 60 * 60 * 1000,
        viewed: false,
      }))

      const posts: InstagramMediaItem[] = [...hashtagResponse.data.media, ...profileResponse.data]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 12)

      return { posts, stories }
    } catch (error) {
      console.error('Instagram API Error:', error)
      throw error
    }
  },
  [CACHE_TAG],
  {
    revalidate: CACHE_REVALIDATE_TIME,
    tags: [CACHE_TAG],
  }
)

export async function GET() {
  try {
    const headersList = headers()
    const ip = (await headersList).get('x-forwarded-for') || 'unknown'

    // ============= CURRENT IMPLEMENTATION: SIMPLE RATE LIMITING =============
    const allowed = await rateLimiter.limit(ip)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    /* ============= UPSTASH IMPLEMENTATION (COMMENTED) =============
    const { success } = await ratelimit.limit('instagram_api')
    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }
    */

    const data = await fetchInstagramContent()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch Instagram content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram content' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    await unstable_cache(async () => true, [CACHE_TAG])()
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating cache' },
      { status: 500 }
    )
  }
} 