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

// Adjusted Da Nang center coordinates to better cover river and beach
const DANANG_CENTER: [number, number] = [16.0712, 108.2336]
const HUNT_AREA_RADIUS = 6000 // 6km radius

export function LandingMapComponent() {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-amber-200">
      <Map
        center={DANANG_CENTER}
        zoom={12}
        markers={[
          {
            position: DANANG_CENTER,
            radius: HUNT_AREA_RADIUS,
            color: '#f59e0b'
          }
        ]}
      />
    </div>
  )
} 