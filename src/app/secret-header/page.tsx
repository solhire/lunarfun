'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProfessionalLogo from '@/components/ProfessionalLogo';

export default function TwitterHeader() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-8">
      {/* Twitter Header Container - 1500x500 pixels */}
      <div className="w-[1500px] h-[500px] relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-xl">
        {/* Bright Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent-purple/20 to-accent-teal/10"></div>
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-40 animate-twinkle mix-blend-screen"></div>
        
        {/* Enhanced Gradient Orbs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-r from-primary/30 via-accent-purple/30 to-accent-teal/30 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 0.8, 1] }}
          transition={{ duration: 5, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-accent-teal/30 via-primary/30 to-accent-purple/30 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 6, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-gradient-to-r from-accent-purple/30 via-accent-teal/30 to-primary/30 rounded-full blur-3xl"
        ></motion.div>

        {/* Glowing Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              style={{ top: `${(i + 1) * 25}%` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0.3, 0.5, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * 1500,
                y: Math.random() * 500,
                scale: 0
              }}
              animate={{ 
                x: [Math.random() * 1500, Math.random() * 1500],
                y: [Math.random() * 500, Math.random() * 500],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2
              }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-primary via-accent-purple to-accent-teal rounded-full blur-sm" />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative h-full flex flex-col items-center justify-center">
          {/* Enhanced Logo and Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 relative"
          >
            {/* Logo Section */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative mb-8 group">
                <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-accent-teal/20 to-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <ProfessionalLogo size={160} showText={false} autoAnimate={true} />
                </div>
              </div>
            </div>

            {/* Title with Enhanced Gradient */}
            <h1 className="text-8xl font-bold tracking-wider relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent-teal">lunara</span>
              <span className="text-white/90">.fun</span>
              <motion.div
                className="absolute -inset-4 -z-10 bg-gradient-to-r from-primary/20 via-accent-purple/20 to-accent-teal/20 rounded-full blur-2xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </h1>
            <p className="text-2xl text-white/90 mt-6 font-light tracking-wide">Launch Your Cosmic Token Journey</p>
          </motion.div>
        </div>

        {/* Enhanced Bottom Stats Bar */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-r from-navy-900/90 via-navy-800/90 to-navy-900/90 backdrop-blur-xl border-t border-primary/20">
          <div className="h-full flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-4 px-6 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent-purple/10 to-accent-teal/10 backdrop-blur-md">
              <span className="text-primary font-medium">lunara.fun</span>
              <span className="text-accent-purple">•</span>
              <span className="text-white/90 text-sm">The Solana Token Launchpad</span>
              <span className="text-accent-teal">•</span>
              <span className="text-primary/90 text-sm">Cosmic Innovation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <Link
        href="/"
        className="fixed top-4 left-4 text-white/50 hover:text-white flex items-center space-x-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Home</span>
      </Link>
    </div>
  );
} 