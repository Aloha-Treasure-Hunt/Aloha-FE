'use client'

import { Map } from './Map'

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