'use client';
import { useEffect } from 'react';

export default function PaymentSuccess() {
  useEffect(() => {
    const container = document.getElementById('success-container');
    if (container) {
      container.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

  return (
    <div className='flex flex-col bg-gradient-to-b'>
      <main className='flex-grow flex flex-col items-center justify-center px-4 py-8'>
        <div
          id='success-container'
          className='w-full max-w-md flex flex-col items-center justify-center space-y-8 transition-all duration-700 opacity-0 translate-y-4'
        >
          {/* Success icon with checkmark */}
          <div className='relative'>
            {/* Animated pulse ring */}
            <div className='absolute inset-0 rounded-full bg-teal-500 opacity-20 animate-ping'></div>

            {/* Main circle with checkmark */}
            <div className='relative w-28 h-28 rounded-full border-4 border-teal-500 flex items-center justify-center bg-white shadow-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-14 w-14 text-teal-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={3}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            </div>

            {/* Decorative sparkles around the circle - enhanced with animations */}
            <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 animate-pulse'>
              <svg
                className='h-7 w-7 text-green-400 filter drop-shadow-md'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M12,2L15,9L22,9L16,14L18,21L12,17L6,21L8,14L2,9L9,9L12,2Z'
                />
              </svg>
            </div>
            <div
              className='absolute top-3 -right-5 animate-pulse'
              style={{ animationDelay: '0.3s' }}
            >
              <svg
                className='h-6 w-6 text-red-400 filter drop-shadow-md'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M12,2L15,9L22,9L16,14L18,21L12,17L6,21L8,14L2,9L9,9L12,2Z'
                />
              </svg>
            </div>
            <div
              className='absolute -bottom-3 -right-7 animate-pulse'
              style={{ animationDelay: '0.7s' }}
            >
              <svg
                className='h-6 w-6 text-blue-400 filter drop-shadow-md'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M12,2L15,9L22,9L16,14L18,21L12,17L6,21L8,14L2,9L9,9L12,2Z'
                />
              </svg>
            </div>
            <div
              className='absolute -left-6 -top-2 animate-pulse'
              style={{ animationDelay: '0.5s' }}
            >
              <svg
                className='h-6 w-6 text-purple-400 filter drop-shadow-md'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M12,2L15,9L22,9L16,14L18,21L12,17L6,21L8,14L2,9L9,9L12,2Z'
                />
              </svg>
            </div>
            <div
              className='absolute -bottom-5 -left-5 animate-pulse'
              style={{ animationDelay: '0.9s' }}
            >
              <svg
                className='h-5 w-5 text-purple-300 filter drop-shadow-md'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M12,2L15,9L22,9L16,14L18,21L12,17L6,21L8,14L2,9L9,9L12,2Z'
                />
              </svg>
            </div>
          </div>

          {/* Payment completed text */}
          <h1 className='text-2xl font-medium text-amber-500 mt-4 tracking-wide filter drop-shadow-sm'>
            Payment Completed
          </h1>

          {/* Navigation buttons */}
          <div className='w-full flex justify-between space-x-6 mt-10'>
            <button
              className='px-6 py-3 bg-amber-100 text-amber-800 rounded-lg w-1/2 font-medium shadow-md hover:bg-amber-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300'
              //   onClick={() => router.back()}
            >
              Back
            </button>
            <button
              className='px-6 py-3 bg-teal-600 text-white rounded-lg w-1/2 font-medium shadow-md hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500'
              //   onClick={() => router.push('/')}
            >
              Exit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
