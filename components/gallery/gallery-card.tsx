'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { GalleryImage } from '@/app/api/gallery/types'

interface GalleryCardProps {
  image: GalleryImage
  priority?: boolean
}

export function GalleryCard({ image, priority }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer"
    >
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={image.url}
          alt={image.caption || 'Gallery image'}
          width={image.width}
          height={image.height}
          className="object-cover"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {(image.caption || image.team_name || image.location) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {image.team_name && (
              <p className="text-white font-semibold">{image.team_name}</p>
            )}
            {image.caption && (
              <p className="text-white/90 text-sm">{image.caption}</p>
            )}
            {image.location && (
              <p className="text-white/80 text-xs">{image.location}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
} 