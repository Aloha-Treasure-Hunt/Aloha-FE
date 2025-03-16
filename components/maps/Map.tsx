'use client';

import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customIcon from '@/lib/customIcon';
import { MapProps } from '@/types/map.types';
import MapUpdater from '@/components/maps/MapUpdater';
import { STADIA_API_KEY } from '@/lib/config';

export function Map({
  center,
  zoom,
  markers,
  interactive = true,
  height = 'h-full',
}: MapProps) {
  return (
    <div
      className={`w-full ${height} rounded-lg overflow-hidden border-2 border-amber-200 shadow-md`}
    >
      <MapContainer
        center={center as LatLngTuple}
        zoom={zoom}
        scrollWheelZoom={interactive}
        className='w-full h-full'
        doubleClickZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        zoomControl={interactive}
      >
        <MapUpdater center={center as LatLngTuple} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            STADIA_API_KEY
              ? `https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${STADIA_API_KEY}`
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />

        {markers.map((marker, index) => (
          <Circle
            key={index}
            center={marker.position as LatLngTuple}
            pathOptions={{
              color: marker.color,
              fillColor: marker.color,
              fillOpacity: 0.2,
              weight: 2,
            }}
            radius={marker.radius}
          />
        ))}

        {markers.map((marker, index) =>
          marker.name ? (
            <Marker
              key={index}
              position={marker.position as LatLngTuple}
              icon={customIcon}
            >
              <Popup className='custom-popup'>
                <div className='p-1'>
                  <h3 className='font-bold text-teal-800'>{marker.name}</h3>
                  {marker.description && (
                    <p className='text-sm mt-1'>{marker.description}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
