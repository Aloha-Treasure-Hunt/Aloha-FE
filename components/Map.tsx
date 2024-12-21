'use client'

import { MapContainer, TileLayer, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  center: [number, number]
  zoom: number
  markers: Array<{
    position: [number, number]
    radius: number
    color: string
  }>
}

export function Map({ center, zoom, markers }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {markers.map((marker, index) => (
        <Circle
          key={index}
          center={marker.position}
          radius={marker.radius}
          pathOptions={{ 
            color: marker.color,
            fillColor: marker.color,
            fillOpacity: 0.2
          }}
        />
      ))}
    </MapContainer>
  )
}

