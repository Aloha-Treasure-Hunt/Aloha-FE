export interface InstagramMediaItem {
  id: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  caption?: string
  timestamp: string
  children?: {
    data: Array<{
      id: string
      media_type: 'IMAGE' | 'VIDEO'
      media_url: string
      thumbnail_url?: string
    }>
  }
}

export interface InstagramStory {
  id: string
  media_type: 'IMAGE' | 'VIDEO'
  media_url: string
  thumbnail_url?: string
  expiry: number
  viewed?: boolean
}

export interface InstagramResponse {
  posts: InstagramMediaItem[]
  stories: InstagramStory[]
  error?: string
} 