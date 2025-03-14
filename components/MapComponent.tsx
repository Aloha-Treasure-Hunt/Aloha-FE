'use client';

import dynamic from 'next/dynamic';
import { LoadingSpinner } from './ui/loading-spinner';

// Dynamically import Map with no SSR
const Map = dynamic(() => import('./Map').then((mod) => mod.Map), {
  ssr: false,
  loading: () => (
    <div className='w-full h-[400px] flex items-center justify-center bg-amber-50'>
      <LoadingSpinner />
    </div>
  ),
});

// const DANANG_CENTER: [number, number] = [16.0712, 108.2336];
const HCMC_CENTER: [number, number] = [10.7769, 106.7009];

export function MapComponent() {
  return (
    <div className='w-full h-[400px] rounded-lg overflow-hidden border border-amber-200'>
      <Map
        center={HCMC_CENTER}
        zoom={12}
        markers={[
          {
            position: HCMC_CENTER,
            radius: 6000,
            color: '#008080',
          },
        ]}
      />
    </div>
  );
}
