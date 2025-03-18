'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import ProfessionalLogo from '@/components/ProfessionalLogo';
import './styles.css';

const TwitterHeaderPage: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
    
    // Set body background to dark
    document.body.style.backgroundColor = '#000000';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);
  
  return (
    <div className="relative w-full overflow-hidden">
      {/* Twitter Header Container - 1500x500 pixels */}
      <div 
        className="relative mx-auto bg-black twitter-header-container"
        style={{ 
          width: '1500px', 
          height: '500px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}
      >
        {/* Background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900"></div>
          
          {/* Red accents */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 blur-[100px] opacity-30"></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'linear-gradient(#FF0000 1px, transparent 1px), linear-gradient(to right, #FF0000 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}>
          </div>
        </div>
        
        {/* Content Container */}
        <div 
          className={`absolute inset-0 flex items-center justify-between px-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md animate-pulse-slow"></div>
              <ProfessionalLogo size={160} showText={false} />
            </div>
          </div>
          
          {/* Center - Text */}
          <div className="text-center relative">
            <h1 className="text-7xl font-bold tracking-wider">
              <span className="text-primary font-black">yums</span>
              <span className="text-white font-black">.fun</span>
            </h1>
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent my-4"></div>
            <p className="text-xl text-white mt-2 tracking-wide">
              Launch your Solana token in seconds
            </p>
          </div>
          
          {/* Right Side - Stats */}
          <div className="flex flex-col gap-5">
            <div className="text-center bg-black/60 backdrop-blur-sm px-8 py-4 rounded-xl border border-primary/30 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-mono font-bold text-primary">420+</div>
              <div className="text-sm text-white mt-1">Tokens Created</div>
            </div>
            <div className="text-center bg-black/60 backdrop-blur-sm px-8 py-4 rounded-xl border border-primary/30 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-mono font-bold text-primary">$43K</div>
              <div className="text-sm text-white mt-1">Trading Volume</div>
            </div>
          </div>
        </div>
        
        {/* Currency Symbols Floating */}
        <div className="absolute top-20 left-40 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold animate-float">$</div>
        <div className="absolute bottom-20 right-40 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold animate-float delay-300">¥</div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold animate-float delay-150">€</div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold animate-float delay-450">£</div>
        
        {/* Bottom bar with URL */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-black/80 backdrop-blur-md flex items-center justify-center border-t border-primary/20">
          <span className="text-primary font-medium mr-2">yums.fun</span>
          <span className="text-white/70 text-sm">• The easiest way to create Solana tokens</span>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-8 text-center max-w-xl mx-auto">
        <p className="text-gray-300 mb-4">
          Take a screenshot of the header above for your Twitter profile (1500x500 pixels)
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TwitterHeaderPage; 