"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Challenge, TreasureHuntItem } from "@/types/challenges.types";
import { jwtDecode } from "jwt-decode";
import { submitQuestsApi } from "../api/questsApi";

interface BingoCardProps {
  challenges: TreasureHuntItem[];
  bonusChallenge?: Challenge;
}

export function BingoCard({ challenges, bonusChallenge }: BingoCardProps) {
  const [selectedChallenge, setSelectedChallenge] =
    useState<TreasureHuntItem | null>(null);
  const [media, setMedia] = useState<{ [key: string]: File | null }>({});
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const decode = jwtDecode(token);
        setUserId(decode?.sub ?? ""); // Use optional chaining and nullish coalescing
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUserId("");
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Danh sách định dạng hợp lệ (bao gồm ảnh và video)
    const validFormats = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
    if (!validFormats.includes(file.type)) {
      setError("Only accept MP4 videos or JPEG/PNG images.");
      return;
    }

    // Kiểm tra dung lượng file (giới hạn 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      setError("File is too large, please choose a file under 50MB.");
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Hiển thị preview
    const fileURL = URL.createObjectURL(file);
    setPreviewUrl(fileURL);
  };

  const handleFileSubmit = async (selectedQuestId: number) => {
    if (!selectedFile) {
      alert("Please choose your file!");
      return;
    }

    try {
      const response = await submitQuestsApi(
        userId,
        selectedQuestId,
        selectedFile
      );
      console.log("Submit successfully:", response);
    } catch (error) {
      console.error("Error when submit side quest:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Bonus Challenge */}
      {bonusChallenge && (
        <div className="max-w-3xl mx-auto mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-1"
          >
            <Card className="p-6 bg-white/95 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-amber-800">
                  Side Quest of the Day
                </h3>
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {bonusChallenge.points} pts
                </span>
              </div>
              <p className="text-gray-700">{bonusChallenge.text}</p>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Regular Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedChallenge(challenge)}
          >
            <Card className="p-4 min-h-[160px] flex flex-col justify-between cursor-pointer bg-white hover:bg-gray-50">
              <p className="font-medium">{challenge.title}</p>
              <p className="text-sm italic">{challenge.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">Click for details</span>
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">
                  {challenge.points} pts
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-amber-800">
                {selectedChallenge.title}
              </h3>
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedChallenge.points} pts
              </span>
            </div>
            <ul className="space-y-1 text-xs md:text-sm text-gray-800">
              {selectedChallenge.requirement
                ?.slice(0, windowWidth < 768 ? 2 : 3)
                .map((outcome, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 text-green-600">✔</span> {outcome}
                  </li>
                ))}
              {selectedChallenge.requirement?.length >
                (windowWidth < 768 ? 2 : 3) && (
                <li className="text-purple-600 text-xs md:text-sm">
                  +{" "}
                  {selectedChallenge.requirement.length -
                    (windowWidth < 768 ? 2 : 3)}{" "}
                  more
                </li>
              )}
            </ul>

            {/* Image/Video Upload */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">
                Upload Image/Video:
              </h4>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
              />
              {media[selectedChallenge.id] && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected: {media[selectedChallenge.id]?.name}
                </p>
              )}
              {previewUrl && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600">Preview:</p>
                  {selectedFile?.type.startsWith("image/") ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-h-60 rounded-lg shadow"
                    />
                  ) : (
                    <video
                      src={previewUrl}
                      controls
                      className="w-full max-h-60 rounded-lg shadow"
                    />
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => handleFileSubmit(selectedChallenge.id)}
              className="w-full bg-amber-400 hover:bg-amber-500 text-amber-800 py-2 rounded-lg mt-4"
            >
              Submit
            </button>
            <button
              onClick={() => setSelectedChallenge(null)}
              className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 rounded-lg mt-4"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Upload Success Notification */}
      {showUploadSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="bg-gradient-to-b from-white to-amber-50 rounded-xl max-w-md w-full p-6 shadow-xl border border-amber-200"
          >
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 w-20 h-20 flex items-center justify-center shadow-lg shadow-green-200"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-gray-800">
                  Upload Successful!
                </h3>
                <p className="text-gray-600 text-lg">
                  Your submission has been received.
                </p>
                <div className="flex items-center justify-center space-x-2 text-amber-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="font-medium">
                    Results will be available within 3 hours
                  </p>
                </div>
              </motion.div>

              <motion.button
                onClick={() => setShowUploadSuccess(false)}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-900 py-3 rounded-lg mt-4 font-medium text-lg shadow-md hover:shadow-lg transform transition duration-200 hover:-translate-y-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Continue to other quests
              </motion.button>

              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-300 rounded-full opacity-20 z-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
              <motion.div
                className="absolute -top-2 -left-2 w-16 h-16 bg-green-300 rounded-full opacity-20 z-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
