'use client'
import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  // For demo purposes - changes the active step every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => prev === 3 ? 1 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { id: 1, name: 'Subscription', icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    )},
    { id: 2, name: 'VnPay', icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    )},
    { id: 3, name: 'Start Playing', icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    )}
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md">
      {/* Main progress bar - always horizontal */}
      <div className="flex items-center justify-between w-full max-w-4xl">
        {steps.map((step, index) => {
          const isActive = step.id <= activeStep;
          const isCompleted = step.id < activeStep;
          const isLastStep = index === steps.length - 1;
          
          return (
            <div key={step.id} className="relative flex flex-col items-center w-full">
              {/* Step Circle */}
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full
                transition-all duration-500 ease-in-out
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-500'}
                ${isCompleted ? 'ring-2 ring-green-400 ring-offset-2' : ''}
              `}>
                {isCompleted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="flex items-center justify-center">
                    {step.icon()}
                  </div>
                )}
              </div>
              
              {/* Step Name */}
              <span className={`
                mt-3 text-sm font-medium text-center transition-all duration-500 ease-in-out
                ${isActive ? 'text-blue-700' : 'text-gray-500'}
              `}>
                {step.name}
              </span>
              
              {/* Progress Line */}
              {!isLastStep && (
                <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-200">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-700 ease-in-out"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Responsive adjustment for very small screens */}
      <div className="block sm:hidden w-full mt-4">
        <div className="text-center text-sm text-blue-700 font-medium">
          Swipe to see all steps
        </div>
      </div>
      
      {/* Progress description */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md w-full max-w-3xl">
        <h3 className="text-lg font-medium text-blue-700">
          {steps.find(s => s.id === activeStep)?.name} Stage
        </h3>
        <p className="mt-2 text-gray-600">
          {activeStep === 1 && "Choose your subscription plan that fits your needs."}
          {activeStep === 2 && "Complete your payment securely through VnPay."}
          {activeStep === 3 && "You're all set! Start playing and enjoy your experience."}
        </p>
        
        {/* Progress percentage */}
        <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <div className="mt-1 text-right text-xs text-gray-500">
          {Math.round(((activeStep - 1) / (steps.length - 1)) * 100)}% completed
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
