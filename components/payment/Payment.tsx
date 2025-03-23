'use client';
import {
  Check,
  CloudSun,
  CreditCard,
  MapPinHouse,
  MapPlus,
  Home,
  FileText,
  Map,
  ArrowLeftCircle,
  Info,
  X,
} from 'lucide-react';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentResult() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState('success');

  const handleChangeStatus = () => {
    setPaymentStatus((prev) => (prev === 'success' ? 'failed' : 'success'));
  };

  useEffect(() => {
    const container = document.getElementById('payment-container');
    if (container) {
      container.classList.add('opacity-100', 'translate-y-0');
    }
  }, []);

  return (
    <div
      className={`flex flex-col h-auto min-h-screen `}
    >
      <main className='flex-grow flex flex-col items-center justify-center px-4 py-12'>
        <div
          id='payment-container'
          className='w-full max-w-md flex flex-col items-center justify-center space-y-8 transition-all duration-700 opacity-0 translate-y-4 bg-white bg-opacity-90 rounded-2xl p-8'
        >
          {/* Status Icon */}
          <div className='relative'>
            {/* Animated pulse ring */}
            <div
              className={`absolute inset-0 rounded-full ${
                paymentStatus === 'success' ? 'bg-[#1f6feb]' : 'bg-red-500'
              } opacity-20 animate-ping`}
            ></div>

            {/* Main circle with icon */}
            <div
              className={`relative w-28 h-28 rounded-full border-4 ${
                paymentStatus === 'success'
                  ? 'border-[#1f6feb] text-[#1f6feb]'
                  : 'border-red-500 text-red-500'
              } flex items-center justify-center bg-white shadow-lg`}
            >
              {paymentStatus === 'success' ? (
                <Check size={60} />
              ) : (
                <X size={60} />
              )}
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

          {/* Payment status text */}
          <div className='text-center'>
            <h1
              className={`text-3xl font-bold ${
                paymentStatus === 'success' ? 'text-[#1f6feb]' : 'text-red-600'
              } mt-4 tracking-wide filter drop-shadow-sm`}
            >
              {paymentStatus === 'success'
                ? 'Payment Success!'
                : 'Payment Failed!'}
            </h1>
            <p
              className={`${
                paymentStatus === 'success' ? 'text-[#1651a9]' : 'text-red-800'
              } mt-2`}
            >
              {paymentStatus === 'success'
                ? 'Your adventure awaits!'
                : "We couldn't process your payment"}
            </p>
          </div>

          {/* Booking/Error information */}
          {paymentStatus === 'success' ? (
            <div className='w-full bg-blue-50 rounded-lg p-4 border border-[#b6d3ff]'>
              <div className='text-sm text-[#1f6feb] flex justify-between items-center'>
                <span>Booking Reference:</span>
                <span className='font-bold'>XYZ12345</span>
              </div>
              <div className='text-sm text-[#1f6feb] flex justify-between items-center mt-2'>
                <span>Confirmation Email:</span>
                <span className='font-bold'>Sent ✓</span>
              </div>
            </div>
          ) : (
            <div className='w-full bg-red-50 rounded-lg p-3 border border-red-100'>
              <div className='text-sm text-red-700 flex items-start'>
                <Info size={16} className='mr-2 flex-shrink-0' />
                <span>
                  Your payment could not be processed. Please check your payment
                  details and try again.
                </span>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className='w-full flex justify-between space-x-6 mt-6'>
            <button
              className={`btn-light-teal btn-style ${
                paymentStatus === 'success' ? 'btn-light-teal' : 'btn-light-red'
              }`}
              onClick={() => router.push('/homepage')}
            >
              <Home size={18} className='mr-2' /> Home
            </button>
            {paymentStatus === 'success' ? (
              <button
                className='btn-style btn-for-app'
                onClick={() => router.push('/clues')}
              >
                <Map size={18} className='mr-2' /> My Clues
              </button>
            ) : (
              <button
                className='btn-style btn-red'
                onClick={() => router.back()}
              >
                <ArrowLeftCircle size={18} className='mr-2' /> Try Again
              </button>
            )}
          </div>

          {/* Additional options */}
          <div className='w-full flex justify-center mt-2'>
            {paymentStatus === 'success' ? (
              <button className='text-blue-600 text-sm underline hover:text-blue-800 flex items-center'>
                <FileText size={14} className='mr-1' /> Download Receipt
              </button>
            ) : (
              <button className='text-red-600 text-sm underline hover:text-red-800 flex items-center'>
                <Info size={14} className='mr-1' /> Contact Support
              </button>
            )}
          </div>

          {/* Toggle button for demo purposes - remove in production */}
          <button
            onClick={handleChangeStatus}
            className='mt-8 text-xs text-gray-400 hover:text-gray-600 px-3 py-1 border border-gray-200 rounded-full'
          >
            Change Toggle Status
          </button>
        </div>
      </main>
    </div>
  );
}
