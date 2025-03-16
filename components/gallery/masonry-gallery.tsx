'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryCard } from './gallery-card';
import { LoadingSpinner } from '../ui/loading-spinner';
import { GalleryImage } from '@/types/gallery.types';

export function MasonryGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setImages(data.images);
      } catch (err) {
        setError('Failed to load gallery');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-600 min-h-[300px] flex items-center justify-center'>
        {error}
      </div>
    );
  }

  return (
    <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className='break-inside-avoid'
        >
          <GalleryCard image={image} priority={index < 6} />
        </motion.div>
      ))}
    </div>
  );
}
