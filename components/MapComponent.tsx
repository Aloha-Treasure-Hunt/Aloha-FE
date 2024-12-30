'use client'

import dynamic from 'next/dynamic'
import { LoadingSpinner } from './ui/loading-spinner'

// Dynamically import Map with no SSR
const Map = dynamic(() => import('./Map').then(mod => mod.Map), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-amber-50">
      <LoadingSpinner />
    </div>
  )
})

// Da Nang coordinates
const DANANG_CENTER: [number, number] = [16.0544, 108.2022]

export function MapComponent() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-amber-200">
      <Map
        center={DANANG_CENTER}
        zoom={13}
        markers={[
          {
            position: DANANG_CENTER,
            radius: 1000, // 1km radius
            color: '#f59e0b' // amber-500
          }
        ]}
      />
    </div>
  )
} 