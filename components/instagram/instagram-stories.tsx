'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import type { InstagramStory } from '@/app/api/instagram/types'

interface Props {
  stories: InstagramStory[]
}

export function InstagramStories({ stories }: Props) {
  const [activeStory, setActiveStory] = useState<number>(0)
  const storyContainerRef = useRef<HTMLDivElement>(null)

  if (!stories.length) return null

  return (
    <div className="relative w-full overflow-hidden mb-8">
      <div
        ref={storyContainerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
      >
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="flex-none w-20 h-20 relative rounded-full overflow-hidden cursor-pointer"
            onClick={() => setActiveStory(index)}
          >
            <div className={`absolute inset-0 rounded-full border-2 ${
              story.viewed ? 'border-gray-300' : 'border-amber-500'
            }`} />
            <Image
              src={story.thumbnail_url || story.media_url}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 