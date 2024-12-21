'use client'

import dynamic from 'next/dynamic'

const MapComponent = dynamic(
  () => import('./MapComponent').then((mod) => mod.MapComponent),
  { 
    ssr: false,
    loading: () => <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">Loading map...</div>
  }
)

export function Map() {
  const position: [number, number] = [16.0544, 108.2022] // Da Nang, Vietnam coordinates
  const searchRadius = 2000 // 10km radius (in meters)

  return <MapComponent center={position} searchRadius={searchRadius} />
}

