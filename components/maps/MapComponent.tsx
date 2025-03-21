'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '../ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MapPin, Search } from 'lucide-react';
import { LOCATIONS } from '@/lib/mockData';

// Dynamically import Map with no SSR
const Map = dynamic(() => import('./Map').then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className='w-full h-[400px] sm:h-[450px] md:h-[500px] flex items-center justify-center bg-amber-50/50'>
      <div className='flex flex-col items-center'>
        <LoadingSpinner size='large' />
        <p className='mt-4 text-amber-800 animate-pulse'>
          Loading treasure map...
        </p>
      </div>
    </div>
  ),
});

export function MapComponent() {
  const [selectedLocation, setSelectedLocation] = useState('HCMC');
  const [isExpanded, setIsExpanded] = useState(true);
  const [mapHeight, setMapHeight] = useState('h-[400px]');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMapHeight('h-[350px]');
      } else if (window.innerWidth < 1024) {
        setMapHeight('h-[450px]');
      } else {
        setMapHeight('h-[500px]');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const currentLocation = LOCATIONS[selectedLocation as keyof typeof LOCATIONS];

  return (
    <div className='w-full bg-amber-50/30 rounded-xl p-4 shadow-md border border-amber-100'>
      <div className='flex flex-col mb-4'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg sm:text-xl font-semibold text-teal-800 flex items-center'>
            <MapPin className='mr-2 text-amber-500' />
            Treasure Hunting Areas
          </h2>
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleExpanded}
            className='text-white'
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>
        </div>

        {isExpanded && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {Object.entries(LOCATIONS).map(([key, location]) => (
              <Button
                key={key}
                variant={selectedLocation === key ? 'default' : 'outline'}
                size='sm'
                onClick={() => setSelectedLocation(key)}
                className={
                  selectedLocation === key
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'border-amber-300 text-amber-800 hover:bg-amber-100'
                }
              >
                {location.name}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div
        className={`w-full ${mapHeight} rounded-lg overflow-hidden transition-all duration-300`}
      >
        <Map
          center={currentLocation.center}
          zoom={12}
          markers={currentLocation.markers}
          height={mapHeight}
        />
      </div>

      <div className='mt-3 text-sm text-gray-600 flex items-center justify-center'>
        <Search size={14} className='mr-1' />
        <span>Click markers for location details. Scroll to zoom in/out.</span>
      </div>
    </div>
  );
}
