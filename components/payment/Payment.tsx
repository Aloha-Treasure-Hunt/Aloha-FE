'use client';
import {
  Check,
  CloudSun,
  CreditCard,
  MapPinHouse,
  MapPlus,
} from 'lucide-react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
  const router = useRouter();
  useEffect(() => {
    const container = document.getElementById('success-container');
    if (container) {
      container.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

  return (
    <div className='flex flex-col h-full bg-gradient-to-b'>
      <main className='flex-grow flex flex-col items-center justify-center px-4 py-12'>
        <div
          id='success-container'
          className='w-full max-w-md flex flex-col items-center justify-center space-y-8 transition-all duration-700 opacity-0 translate-y-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-xl'
        >
          {/* Success icon with plane/travel theme */}
          <div className='relative'>
            {/* Animated pulse ring */}
            <div className='absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping'></div>

            {/* Main circle with travel icon */}
            <div className='relative w-28 h-28 rounded-full border-4 border-blue-500 text-blue-500 flex items-center justify-center bg-white shadow-lg'>
              <Check size={60} />
            </div>

            {/* Decorative travel-themed elements around the circle */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 animate-pulse text-yellow-500'>
              <CloudSun />
            </div>
            <div
              className='absolute top-3 -right-5 animate-pulse text-red-600'
              style={{ animationDelay: '0.3s' }}
            >
              <AirplanemodeActiveIcon />
            </div>
            <div
              className='absolute -bottom-3 -right-7 animate-pulse text-blue-500'
              style={{ animationDelay: '0.7s' }}
            >
              <CreditCard />
            </div>
            <div
              className='absolute -left-6 -top-2 animate-pulse text-green-500'
              style={{ animationDelay: '0.5s' }}
            >
              <MapPlus />
            </div>
            <div
              className='absolute -bottom-5 -left-5 animate-pulse  text-purple-500'
              style={{ animationDelay: '0.9s' }}
            >
              <MapPinHouse />
            </div>
          </div>

          {/* Payment completed text - travel themed */}
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-blue-600 mt-4 tracking-wide filter drop-shadow-sm'>
              Payment Success!
            </h1>
            <p className='text-blue-800 mt-2'>Your adventure awaits!</p>
          </div>

          {/* Booking information */}
          <div className='w-full bg-blue-50 rounded-lg p-4 border border-blue-100'>
            <div className='text-sm text-blue-700 flex justify-between items-center'>
              <span>Booking Reference:</span>
              <span className='font-bold'>XYZ12345</span>
            </div>
            <div className='text-sm text-blue-700 flex justify-between items-center mt-2'>
              <span>Confirmation Email:</span>
              <span className='font-bold'>Sent ✓</span>
            </div>
          </div>

          {/* Navigation buttons - more travel-themed */}
          <div className='w-full flex justify-between space-x-6 mt-6'>
            <button
              className='px-6 py-3 bg-blue-100 text-blue-800 rounded-lg w-1/2 font-medium shadow-md hover:bg-blue-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300'
              onClick={() => router.push('/homepage')}
            >
              Home
            </button>
            <button
              className='px-6 py-3 bg-blue-600 text-white rounded-lg w-1/2 font-medium shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onClick={() => router.push('/clues')}
            >
              My Clues
            </button>
          </div>

          {/* Additional options */}
          <div className='w-full flex justify-center mt-2'>
            <button className='text-blue-600 text-sm underline hover:text-blue-800'>
              Download Receipt
            </button>
          </div>
        </div>
      </main>

      {/* Footer with travel-themed messaging */}
      <footer className='bg-white bg-opacity-20 backdrop-blur-sm py-3 text-center text-white'>
        <p className='text-sm'>Thank you for choosing with us. Safe travels!</p>
      </footer>
    </div>
  );
}
