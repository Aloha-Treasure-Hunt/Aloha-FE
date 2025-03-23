"use client";
import { motion } from "framer-motion";
import { ChevronRight, Award, Gift, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SuccessScreen() {
  const searchParams = useSearchParams();
  const points = searchParams.get("points") || 0;
  const progress = searchParams.get("progress") || "Not Available";

  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    const targetPoints = parseInt(points.toString(), 10);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setRewardPoints((prev) => {
          if (prev >= targetPoints) {
            clearInterval(interval);
            return targetPoints;
          }
          return prev + 25;
        });
      }, 50);
    }, 800);

    return () => clearTimeout(timer);
  }, [points]);

  return (
    <div className="w-full max-w-md mx-auto mt-52">
      {/* Achievement Badge */}
      <div className="relative z-10 -mt-16 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-red-500 shadow-lg border-4 border-white"
        >
          <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-rose-500 to-red-600">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center items-center text-xl font-extrabold mb-0.5"
            >
              WON
            </motion.div>
            <div className="text-center text-xs font-medium px-1">
              You Will Receive a Gift
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
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Quest Completed!
            </h2>
            <p className="text-gray-600 text-sm">
              You have successfully completed the treasure hunt challenge
            </p>
          </motion.div>

          {/* Rewards Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <Gift size={18} className="text-purple-500 mr-2" />
                <span className="font-semibold text-gray-800">
                  Your Rewards
                </span>
              </div>
              <div className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                Premium
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex-1 border-r border-gray-200 pr-3">
                <div className="text-xs text-gray-500 mb-1">Points Earned</div>
                <div className="font-bold text-indigo-600">
                  {rewardPoints} pts
                </div>
              </div>

              <div className="flex-1 border-r border-gray-200 px-3">
                <div className="text-xs text-gray-500 mb-1">Badge</div>
                <div className="font-bold text-indigo-600">Explorer</div>
              </div>

              <div className="flex-1 pl-3">
                <div className="text-xs text-gray-500 mb-1">Rank</div>
                <div className="flex items-center justify-center">
                  <Star size={14} fill="gold" stroke="none" className="mr-1" />
                  <span className="font-bold text-indigo-600">Gold</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievement Progress */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-6 px-1"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-700">
                Your Quest Progress
              </div>
              <div className="text-xs font-medium text-teal-600">
              {progress} completed
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2.5 rounded-full"
              ></motion.div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <div>Beginner</div>
              <div>Master</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="relative z-10 flex justify-center space-x-4 px-6 pb-6">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-3 rounded-full bg-white border border-indigo-200 text-indigo-600 font-semibold flex-1 flex items-center justify-center shadow-sm"
        >
          <Award size={18} className="mr-2" />
          <span>Check Rankings</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold flex-1 flex items-center justify-center shadow-md"
        >
          <Link href={"/challenges"}>
            <span>Next Quests</span>
          </Link>
          <ChevronRight size={18} className="ml-1" />
        </motion.button>
      </div>

      {/* AI assistant button */}
      <motion.div
        className="absolute bottom-4 right-4 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      ></motion.div>
    </div>
  );
}
