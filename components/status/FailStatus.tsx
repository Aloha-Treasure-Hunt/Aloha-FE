'use client'
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function FailScreen() {
  const [showHints, setShowHints] = useState(false);
  
  return (
    <div className="w-full max-w-md mx-auto">
        {/* Failure Badge */}
        <div className="relative z-10 -mt-16 flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              type: 'spring',
              damping: 12
            }}
            className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg border-4 border-white"
          >
            <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-amber-500 to-orange-600">
              <motion.div 
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-extrabold"
              >
                FAIL
              </motion.div>
              <div className="text-center text-xs font-medium px-1 mt-1">
                Your Quest Is Not Yet Complete
              </div>
            </div>
          </motion.div>
          
          {/* Card Content */}
          <div className="w-full mt-6 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">Challenge Failed</h2>
              <p className="text-gray-600 text-sm">Do not worry! You can try again and complete your quest.</p>
            </motion.div>
            
            {/* Missing Requirements */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <AlertTriangle size={18} className="text-amber-500 mr-2" />
                  <span className="font-semibold text-gray-800">Missing Requirements</span>
                </div>
                <button 
                  onClick={() => setShowHints(!showHints)}
                  className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full"
                >
                  {showHints ? "Hide Hints" : "Show Hints"}
                </button>
              </div>
              
              {showHints && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-lg p-3 mb-3 border border-amber-100 text-left text-sm text-gray-700">
                    <div className="flex items-start mb-1">
                      <div className="min-w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs mr-2">1</div>
                      <div>You need to find the hidden key in the marketplace</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-amber-100 text-left text-sm text-gray-700">
                    <div className="flex items-start">
                      <div className="min-w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs mr-2">2</div>
                      <div>You must solve the riddle from the local guide</div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {!showHints && (
                <div className="text-center py-1 text-sm text-gray-500">
                  Click Show Hints for details on what you are missing
                </div>
              )}
            </motion.div>
            
            {/* Progress Status */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-6 px-1"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-700">Your Quest Progress</div>
                <div className="text-xs font-medium text-amber-600">1/3 completed</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '33%' }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="bg-gradient-to-r from-amber-400 to-orange-400 h-2.5 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Buttons */}
        <div className="relative z-10 flex justify-center space-x-4 px-6 pb-6">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-amber-900 font-semibold flex-1 flex items-center justify-center shadow-md"
          >
            <RefreshCw size={18} className="mr-2" />
            <span>Retry Quest</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold flex-1 flex items-center justify-center shadow-md"
          >
            <span>Exit Quest</span>
          </motion.button>
        </div>
      </div>
  );
}