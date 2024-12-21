import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN
const INSTAGRAM_BUSINESS_ID = process.env.INSTAGRAM_BUSINESS_ID
const CACHE_TAG = 'instagram-posts'
const CACHE_REVALIDATE_TIME = 3600 // Cache for 1 hour

interface InstagramPost {
  id: string
  media_type: string
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
}

// Create a cached fetch function
const fetchInstagramPosts = unstable_cache(
  async () => {
    try {
      // Fetch from specific hashtag
      const hashtagResponse = await fetch(
        `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/tags?fields=media{id,media_type,media_url,permalink,caption,timestamp}&access_token=${INSTAGRAM_ACCESS_TOKEN}`
      )

      // Fetch from specific handle
      const handleResponse = await fetch(
        `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ID}/media?fields=id,media_type,media_url,permalink,caption,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`
      )

      const [hashtagData, handleData] = await Promise.all([
        hashtagResponse.json(),
        handleResponse.json(),
      ])

      // Combine and sort posts by timestamp
      const posts: InstagramPost[] = [...hashtagData.data, ...handleData.data]
        .filter(post => post.media_type === 'IMAGE')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 8) // Limit to 8 most recent posts

      return posts
    } catch (error) {
      console.error('Instagram API Error:', error)
      throw error
    }
  },
  ['instagram-posts'], // Cache key
  {
    revalidate: CACHE_REVALIDATE_TIME, // Revalidate every hour
    tags: [CACHE_TAG], // Tag for manual revalidation
  }
)

export async function GET() {
  try {
    const posts = await fetchInstagramPosts()
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Instagram posts' },
      { status: 500 }
    )
  }
}

// Optional: Add a revalidation endpoint
export async function POST() {
  try {
    // Revalidate the cache
    await unstable_cache(() => null, ['instagram-posts'])()
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error revalidating cache' },
      { status: 500 }
    )
  }
} 