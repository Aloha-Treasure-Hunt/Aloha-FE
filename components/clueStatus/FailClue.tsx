"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ModernErrorUI = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered animation entrance
    setIsVisible(true);

    // Add particles on load
    const canvas = document.getElementById(
      "particle-canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      initParticles(canvas);
    }
  }, []);

  interface Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    speedX: number;
    speedY: number;
  }

  const initParticles = (canvas: HTMLCanvasElement): void => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(255, ${
          Math.floor(Math.random() * 100) + 100
        }, ${Math.floor(Math.random() * 50)}, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }

    function animate(): void {
      requestAnimationFrame(animate);
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (ctx) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
    }

    animate();

    // Handle resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-8 overflow-hidden relative">
      {/* Particle background */}
      <canvas id="particle-canvas" className="absolute inset-0" />

      {/* Glowing accent */}
      <div className="absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-red-500 opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      {/* Error card */}
      <div
        className={`relative z-10 bg-black bg-opacity-40 backdrop-blur-xl rounded-2xl overflow-hidden w-full max-w-md border border-gray-700 shadow-2xl transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Top red indicator bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-400 via-red-500 to-red-400 animate-pulse" />

        {/* Icon and error header */}
        <div className="pt-8 pb-4 px-6">
          <div
            className={`w-20 h-20 mx-auto mb-6 rounded-full bg-red-500 bg-opacity-10 flex items-center justify-center transform transition-all duration-1000 delay-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h2
            className={`text-center text-2xl font-bold text-white mb-2 transform transition-all duration-700 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Authentication Failed
          </h2>

          <div className="w-12 h-1 bg-red-500 mx-auto rounded-full opacity-70" />
        </div>

        {/* Error message */}
        <div
          className={`bg-gray-800 bg-opacity-50 px-6 py-6 transform transition-all duration-700 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-center text-gray-300">
            The password you entered does not match our records. Please
            double-check and try again.
          </p>
        </div>

        {/* Action buttons */}
        <div className="p-6 space-y-3">
          <Link href={"/challenges"}>
            <button
              className={`w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg flex items-center justify-center transform transition-all duration-500 hover:scale-102 active:scale-98 delay-900 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Explore Side Quest
            </button>
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-500">or</span>
            </div>
          </div>

          <Link href={"/success-clue"}>
            <button
              className={`mt-2 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg flex items-center justify-center transform transition-all duration-500 hover:text-white border border-gray-700 delay-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
            {/* Bottom sparkle effect */}
            <div className="absolute bottom-0 left-0 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="w-full"
              >
                <path
                  fill="rgba(239, 68, 68, 0.1)"
                  fillOpacity="1"
                  d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,144C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer text */}
      <div
        className={`absolute bottom-4 text-gray-500 text-xs transition-all duration-1000 delay-1200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Need help? Contact support@example.com
      </div>
    </div>
  );
};

export default ModernErrorUI;
