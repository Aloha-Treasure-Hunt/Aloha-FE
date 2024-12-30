'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { InstagramMediaItem } from '@/app/api/instagram/types'

interface Props {
  post: InstagramMediaItem
}

export function InstagramPost({ post }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const renderMedia = (item: InstagramMediaItem) => {
    switch (item.media_type) {
      case 'VIDEO':
        return (
          <div className="relative aspect-square">
            <Image
              src={item.thumbnail_url || item.media_url}
              alt={post.caption || ''}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )
      
      case 'CAROUSEL_ALBUM':
        return post.children?.data.map((child, index) => (
          <div
            key={child.id}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {renderMedia({ ...child, permalink: post.permalink })}
          </div>
        ))
      
      default:
        return (
          <Image
            src={item.media_url}
            alt={post.caption || ''}
            fill
            className="object-cover"
          />
        )
    }
  }

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square group overflow-hidden rounded-lg"
    >
      {renderMedia(post)}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </a>
  )
} 