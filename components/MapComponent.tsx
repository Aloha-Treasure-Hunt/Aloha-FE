'use client'

import { MapContainer, TileLayer, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  center: [number, number]
  searchRadius: number
}

export function MapComponent({ center, searchRadius }: MapComponentProps) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      {/*<TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>'
      />*/}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {/*<TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />*/}
      <Circle center={center} radius={searchRadius} />
    </MapContainer>
  )
} 