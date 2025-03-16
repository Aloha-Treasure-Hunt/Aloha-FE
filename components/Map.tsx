'use client';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customIcon from '@/lib/customIcon';
import { Fragment } from 'react';

interface MapProps {
  center: [number, number];
  zoom: number;
  markers: Array<{
    position: [number, number];
    radius: number;
    color: string;
    name?: string;
    description?: string;
  }>;
  interactive?: boolean;
  height?: string;
}

// Add your Stadia API key
const STADIA_API_KEY = process.env.NEXT_PUBLIC_STADIA_API_KEY;

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
        {STADIA_API_KEY ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${STADIA_API_KEY}`}
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        )}

        {markers.map((marker, index) => (
          <Fragment key={index}>
            <Circle
              center={marker.position as LatLngTuple}
              pathOptions={{
                color: marker.color,
                fillColor: marker.color,
                fillOpacity: 0.2,
                weight: 2,
              }}
              radius={marker.radius}
            />
            {marker.name && (
              <Marker
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
            )}
          </Fragment>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
