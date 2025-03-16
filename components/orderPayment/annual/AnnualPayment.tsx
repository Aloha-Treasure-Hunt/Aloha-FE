import React from 'react';
import { ChevronLeft, Clock, ShieldCheck, CreditCard, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AnnualOrderPage() {
  return (
    <div className="bg-gradient-to-b from-teal-600 to-teal-700 min-h-screen font-sans">
      {/* Progress Bar */}
      <div className="px-4 sm:px-6 pt-6 pb-3">
        <div className="w-full bg-teal-800 rounded-full h-2">
          <div className="bg-white rounded-full h-2 w-1/2"></div>
        </div>
        <div className="flex justify-between text-white text-sm mt-2">
          <span>Details</span>
          <span>Payment</span>
        </div>
        <p className="text-white text-lg font-medium mt-4">Step 1 of 2</p>
      </div>
      
      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-orange-200 to-orange-100 text-brown-800 rounded-lg mx-4 p-4 mb-6 shadow-md">
        <div className="flex items-center">
          <div className="mr-3 bg-orange-500 p-1 rounded-full">
            <Heart size={16} className="text-white" />
          </div>
          <p className="font-semibold">Additional offers, curated just for you</p>
        </div>
      </div>
      
      {/* Package Info */}
      <div className="text-white px-4 sm:px-6 mb-6">
        <h2 className="text-xl font-bold mb-2">Forever Premium Package</h2>
        <div className="flex items-center">
          <ShieldCheck size={18} className="mr-2" />
          <p>Unlock exciting experiences and challenges</p>
        </div>
      </div>
      
      {/* Subscription Card */}
      <div className="bg-white rounded-3xl mx-4 shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-1">Subscription Details</h3>
          <p className="text-gray-600 text-sm">Choose the plan that works for you</p>
        </div>
        
        {/* Subscription Options */}
        <div className="p-5">
          <div className="bg-pink-50 rounded-xl p-4 mb-6 border-2 border-teal-600">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-gray-800 font-bold text-lg">Annual Plan</span>
                <div className="text-green-600 text-xs font-medium mt-1">Save 20%</div>
              </div>
              <div className="text-right">
                <span className="text-teal-600 font-bold text-xl">US$7/mo</span>
                <div className="text-gray-500 text-xs">incl. VAT</div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">US$6/mo</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">VAT</span>
                <span className="text-gray-800 font-medium">US$1/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Total</span>
                <span className="text-gray-800 font-medium">US$7/mo</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Free Trial Info */}
        <div className="px-5 pb-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="text-gray-800 font-bold mb-2 flex items-center">
              <Clock size={18} className="mr-2 text-blue-500" />
              Free trial terms
            </h4>
            <ul className="text-gray-700 text-sm space-y-2">
              <li className="flex items-start">
                <div className="h-5 w-1 bg-blue-400 rounded mr-2 mt-0.5"></div>
                <span>Billing automatically starts after free trial ends</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-1 bg-blue-400 rounded mr-2 mt-0.5"></div>
                <span>Cancel before Apr 08, 2026 to avoid getting billed</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-1 bg-blue-400 rounded mr-2 mt-0.5"></div>
                <span>We will remind you 5 days before trial ends</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Payment Summary with Timeline */}
        <div className="px-5 pb-5">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <div className="h-6 w-2 bg-red-500 rounded mr-2"></div>
                <CreditCard size={18} className="mr-2 text-gray-700" />
                <span className="text-gray-800 font-bold">PAY NOW</span>
              </div>
              <div className="ml-auto text-right">
                <span className="text-gray-800 font-bold">US$7/mo</span>
                <div className="text-gray-500 text-xs">incl. VAT</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-6 w-2 bg-teal-500 rounded mr-2"></div>
              <span className="text-teal-600 font-bold">FOREVER</span>
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="bg-gray-50 p-5 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold sm:w-1/3 flex items-center justify-center order-2 sm:order-1">
              <ChevronLeft size={20} className="mr-1" />
              <span>Back</span>
            </button>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold sm:w-2/3 shadow-md order-1 sm:order-2 mb-2 sm:mb-0">
            <Link href={'/payment-status'}>
              Continue
            </Link>
            </button>
          </div>
        </div>
      </div>
      
      {/* Secure Payment Note */}
      <div className="text-center text-white text-sm mt-6 px-6 pb-6 flex items-center justify-center">
        <ShieldCheck size={16} className="mr-2" />
        <span>Secure and protected payment</span>
      </div>
    </div>
  );
};