'use client'
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessScreen() {
  return (
    <main className="flex justify-center px-4">
      <div className="w-full max-w-md mt-6">
        <div className="relative rounded-3xl overflow-hidden shadow-md bg-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="h-full w-full bg-pink-50">
              {/* Confetti and gems */}
              <div className="relative h-full w-full overflow-hidden">
                {Array(15).fill(null).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ 
                      x: Math.random() * 300 - 150, 
                      y: Math.random() * 300, 
                      opacity: 0 
                    }}
                    animate={{ 
                      y: [null, Math.random() * -300],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <div 
                      className="w-6 h-6" 
                      style={{
                        background: `${['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#FF9A8B'][Math.floor(Math.random() * 5)]}`,
                        clipPath: `${['circle(50%)', 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'][Math.floor(Math.random() * 3)]}`
                      }}
                    />
                  </motion.div>
                ))}

                {/* Gems at the top */}
                <div className="absolute top-20 right-8 z-10">
                  <div className="w-6 h-6 bg-teal-300 rounded-full mb-2"></div>
                  <div className="w-10 h-10 bg-teal-400 rotate-45 transform origin-center"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center pt-8 h-[630px]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-br from-rose-300 to-red-500"
            >
              <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-white">
                <div className="text-xl font-bold mb-1">YOU WON</div>
                <div className="text-center text-sm px-4">
                  You Will Receive a Gift
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom Buttons */}
          <div className="relative z-10 flex justify-center space-x-4 px-6 pb-6">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-white border border-red-200 text-red-500 font-semibold flex-1 flex items-center justify-center shadow-sm"
            >
              Check my rankings
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold flex-1 flex items-center justify-center shadow-sm"
            >
              <span>Next Quests</span>
              <ChevronRight size={18} className="ml-2" />
            </motion.button>
          </div>

          {/* AI assistant button */}
          <div className="absolute bottom-4 right-4 z-20">
            <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
              <span role="img" aria-label="AI assistant">🧠</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}