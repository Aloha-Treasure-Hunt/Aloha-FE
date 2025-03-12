// app/fail/page.tsx - Failure screen
'use client'
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FailScreen() {
  return (
    <main className="flex justify-center px-4">
      <div className="w-full max-w-md">
        <div className="relative rounded-3xl overflow-hidden shadow-md bg-white">      
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="h-full w-full bg-pink-50">
              {/* Subtle pattern for fail screen */}
              <div className="grid grid-cols-4 gap-6 p-6 opacity-10">
                {Array(16).fill(null).map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-300"></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-80 pt-8 h-[630px]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-300 to-orange-500"
            >
              <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-white">
                <div className="text-4xl font-bold mb-2">FAIL</div>
                <div className="text-center text-sm px-2">
                  Your Quests Is Not Yet Complete
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Buttons */}
          <div className="relative z-10 flex justify-center space-x-4 px-6 pb-6">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-amber-200 text-amber-800 font-semibold flex-1 flex items-center justify-center shadow-sm"
            >
              <ArrowLeft size={18} className="mr-2" />
              Retry
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-red-500 text-white font-semibold flex-1 flex items-center justify-center shadow-sm"
            >
              Exit
            </motion.button>
          </div>

          {/* Lightning icon */}
          <div className="absolute bottom-4 left-4 z-20">
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
              <span role="img" aria-label="Lightning">⚡</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}