'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-navy flex items-center justify-center">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-700 opacity-50"
        style={{
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />

      {/* Glowing orbs */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full bg-primary/20 blur-[100px]"
        style={{
          left: `calc(50% - 150px + ${(mousePosition.x - window.innerWidth / 2) * 0.05}px)`,
          top: `calc(50% - 150px + ${(mousePosition.y - window.innerHeight / 2) * 0.05}px)`,
          transition: 'all 0.3s ease-out'
        }}
      />
      <div 
        className="absolute w-[200px] h-[200px] rounded-full bg-teal/20 blur-[80px]"
        style={{
          right: `calc(30% - 100px - ${(mousePosition.x - window.innerWidth / 2) * 0.03}px)`,
          bottom: `calc(30% - 100px - ${(mousePosition.y - window.innerHeight / 2) * 0.03}px)`,
          transition: 'all 0.3s ease-out'
        }}
      />

      {/* Content container */}
      <div className="relative z-10 text-center px-4">
        {/* Glitch effect 404 */}
        <h1 className="text-[150px] font-bold leading-none mb-8 animate-fadeIn relative select-none
          before:content-['404'] before:absolute before:left-0 before:top-0 
          before:w-full before:h-full before:animate-glitch-1
          after:content-['404'] after:absolute after:left-0 after:top-0 
          after:w-full after:h-full after:animate-glitch-2"
          style={{
            color: 'var(--primary)',
            textShadow: '0 0 20px rgba(255, 209, 0, 0.5)'
          }}
        >
          404
        </h1>

        {/* Animated text */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slideUp opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 animate-slideUp opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] max-w-md mx-auto">
          Oops! Looks like you've ventured into uncharted territory.
        </p>

        {/* Animated button */}
        <Link 
          href="/"
          className="inline-block btn-modern-primary hover:scale-105 transition-all duration-300
            animate-slideUp opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]
            relative overflow-hidden group"
        >
          <span className="relative z-10">Return Home</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-light via-primary to-primary-light
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            [background-size:200%_100%] animate-shimmer"/>
        </Link>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
} 