'use client';

import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: Array<{
    position: [number, number];
    radius: number;
    color: string;
  }>;
}

// Add your Stadia API key
const STADIA_API_KEY = process.env.NEXT_PUBLIC_STADIA_API_KEY;

export function Map({ center, zoom, markers }: MapProps) {
  return (
    <MapContainer
      center={center as LatLngTuple}
      zoom={zoom}
      scrollWheelZoom={false}
      className='w-full h-full'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${STADIA_API_KEY}`}
      />
      {markers.map((marker, index) => (
        <Circle
          key={index}
          center={marker.position as LatLngTuple}
          pathOptions={{
            color: marker.color,
            fillColor: marker.color,
            fillOpacity: 0.2,
          }}
          radius={marker.radius}
        />
      ))}
    </MapContainer>
  );
}

export default Map;
