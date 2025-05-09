'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import ProfessionalLogo from '@/components/ProfessionalLogo';
import './styles.css';

const SecretLogoPage: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy p-4 star-field">
      {/* Cosmic Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden ethereal-bg">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-accent-teal/5 blur-3xl"></div>
        <div className="absolute top-40 right-1/3 w-6 h-6 rounded-full bg-primary animate-float"></div>
        <div className="absolute top-60 left-1/3 w-4 h-4 rounded-full bg-accent-teal/50 animate-float delay-300"></div>
        <div className="absolute bottom-20 right-1/4 w-5 h-5 rounded-full bg-primary-light/50 animate-float delay-200"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Professional SVG Logo */}
          <div className="mb-8 cosmic-glow">
            <ProfessionalLogo size={350} showText={false} />
          </div>
          
          {/* Logo Text - Enhanced Styling */}
          <div className="relative mb-2">
            <h1 className="text-5xl font-bold tracking-wider gradient-text shimmer">
              <span className="font-extrabold">LUNARA</span>
              <span className="text-white opacity-80 mx-1">.</span>
              <span className="font-extrabold">FUN</span>
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
          
          <p className="text-lg text-foreground-secondary mb-8">
            Launch your Solana tokens in the cosmic realm
          </p>
          
          {/* Tagline with Highlight */}
          <div className="relative inline-block mb-10">
            <p className="text-xl font-medium text-white relative z-10">Cosmic Memecoin Launchpad</p>
            <div className="absolute -bottom-1 left-0 right-0 h-3 bg-primary/20 -skew-x-12 z-0"></div>
          </div>
          
          {/* Download Instructions */}
          <div className="mt-8 p-5 glass rounded-xl inline-block border border-primary/10 shadow-lg hover-card">
            <p className="text-white text-sm mb-2">
              Screenshot this logo for your cosmic branding needs
            </p>
            <p className="text-primary-light text-xs mb-2">
              This page is our celestial secret 🌟
            </p>
            <p className="text-white text-xs mb-3">
              <span className="text-accent-teal">Pro tip:</span> Click the logo for a cosmic effect!
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link 
                href="/secret-logo/standalone" 
                className="cosmic-button text-sm"
              >
                View Standalone Logo
              </Link>
              <Link 
                href="/secret-logo/transparent" 
                className="cosmic-button text-sm"
              >
                Transparent Version
              </Link>
              <Link 
                href="/secret-logo/clean" 
                className="cosmic-button text-sm"
              >
                Clean Version
              </Link>
              <Link 
                href="/secret-header" 
                className="cosmic-button text-sm"
              >
                Twitter Header
              </Link>
            </div>
          </div>
          
          {/* Back Link */}
          <div className="mt-8">
            <Link 
              href="/" 
              className="text-primary hover:text-primary-light transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                ←
              </span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretLogoPage; 