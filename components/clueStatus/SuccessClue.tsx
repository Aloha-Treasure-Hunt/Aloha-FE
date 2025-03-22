'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const SuccessCelebration = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered animation entrance
    setIsVisible(true);

    // Initialize particles
    const canvas = document.getElementById(
      'success-particle-canvas'
    ) as HTMLCanvasElement;
    if (canvas) {
      initParticles(canvas);
    }

    // Initialize confetti
    const confettiCanvas = document.getElementById(
      'confetti-canvas'
    ) as HTMLCanvasElement;
    if (confettiCanvas) {
      initConfetti(confettiCanvas);
    }

    // Start celebrating
    setTimeout(() => {
      const successCard = document.getElementById('success-card');
      if (successCard) {
        successCard.classList.add('animate-success-pulse');
      }
    }, 500);
  }, []);

  interface Particle {
    x: number;
    y: number;
    radius: number;
    color: string;
    speedX: number;
    speedY: number;
  }

  const initParticles = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
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
        color: `rgba(${Math.floor(Math.random() * 50) + 100}, 255, ${
          Math.floor(Math.random() * 100) + 150
        }, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

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
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  interface ConfettiPiece {
    x: number;
    y: number;
    size: number;
    color: string;
    rotation: number;
    speedY: number;
    speedX: number;
    speedRotation: number;
  }

  const initConfetti = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const confetti: ConfettiPiece[] = [];
    const colors = [
      '#00E676',
      '#2979FF',
      '#FFEB3B',
      '#FF4081',
      '#9C27B0',
      '#FF9800',
    ];

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create confetti
    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 100,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        speedY: Math.random() * 2 + 1,
        speedX: Math.random() * 2 - 1,
        speedRotation: Math.random() * 2 - 1,
      });
    }

    function animateConfetti() {
      requestAnimationFrame(animateConfetti);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < confetti.length; i++) {
        const c = confetti[i];

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);

        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);

        ctx.restore();

        // Move confetti
        c.y += c.speedY;
        c.x += c.speedX;
        c.rotation += c.speedRotation;

        // Reset confetti when it goes off screen
        if (c.y > canvas.height) {
          c.y = -20;
          c.x = Math.random() * canvas.width;
        }
      }
    }

    animateConfetti();

    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-8 overflow-hidden relative'>
      {/* Particle background */}
      <canvas id='success-particle-canvas' className='absolute inset-0' />

      {/* Confetti overlay */}
      <canvas id='confetti-canvas' className='absolute inset-0 z-10' />

      {/* Glowing accent */}
      <div className='absolute top-1/4 left-1/2 w-64 h-64 rounded-full bg-green-500 opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2' />

      {/* Success card */}
      <div
        id='success-card'
        className={`relative z-20 bg-black bg-opacity-40 backdrop-blur-xl rounded-2xl overflow-hidden w-full max-w-md border border-gray-700 shadow-2xl transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        {/* Top green indicator bar */}
        <div className='h-1.5 w-full bg-gradient-to-r from-green-400 via-green-500 to-green-400 animate-pulse' />

        {/* Icon and success header */}
        <div className='pt-8 pb-4 px-6'>
          <div
            className={`w-20 h-20 mx-auto mb-6 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center transform transition-all duration-1000 delay-300 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-10 w-10 text-green-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          <h2
            className={`text-center text-2xl font-bold text-white mb-2 transform transition-all duration-700 delay-500 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            Congratulations!
          </h2>

          <div className='w-12 h-1 bg-green-500 mx-auto rounded-full opacity-70' />
        </div>

        {/* Success message */}
        <div
          className={`bg-gray-800 bg-opacity-50 px-6 py-6 transform transition-all duration-700 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <p className='text-center text-gray-300'>
            You have successfully solved the clue! Well done on your incredible
            detective skills. Ready for the next challenge?
          </p>
        </div>

        {/* Action buttons */}
        <div className='p-6 space-y-3'>
          <Link href={'/clues'}>
            <button
              className={`w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg flex items-center justify-center transform transition-all duration-500 hover:scale-102 active:scale-98 delay-900 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
              Continue to Next Clue
            </button>
          </Link>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-700'></div>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-gray-800 px-2 text-gray-500'>or</span>
            </div>
          </div>

          <Link href={'dashboard'}>
            <div>
              <button
                className={`mt-2 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg flex items-center justify-center transform transition-all duration-500 hover:text-white border border-gray-700 delay-1000 
                ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
                View Leaderboard
              </button>
              {/* Bottom sparkle effect */}
              <div className='absolute bottom-0 left-0 w-full'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 1440 320'
                  className='w-full'
                >
                  <path
                    fill='rgba(16, 185, 129, 0.1)'
                    fillOpacity='1'
                    d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,144C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                  ></path>
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Achievement badge */}
      <div
        className={`absolute top-6 right-6 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-3 border border-gray-700 transform transition-all duration-700 delay-1200 flex items-center ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-yellow-400 mr-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <span className='text-white text-sm'>Puzzle Master</span>
      </div>

      {/* Stats */}
      {/* <div
        className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-300 text-xs transition-all duration-1000 delay-1200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } flex space-x-4`}
      >
        <span>
          Solved: <span className="text-green-400">1/5</span>
        </span>
        <span>
          Time: <span className="text-green-400">03:45</span>
        </span>
        <span>
          Score: <span className="text-green-400">250</span>
        </span>
      </div> */}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes success-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 0 15px rgba(16, 185, 129, 0);
          }
        }

        .animate-success-pulse {
          animation: success-pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessCelebration;
