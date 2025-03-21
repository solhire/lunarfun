'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import ProfessionalLogo from '@/components/ProfessionalLogo';

const StandaloneLogo: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy p-4 star-field">
      {/* Cosmic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden ethereal-bg">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl cosmic-portal"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-teal/5 blur-3xl nebula"></div>
      </div>
      
      <div className="relative z-10">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Logo with cosmic effects */}
          <div className="relative cosmic-glow animate-cosmic-float">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-teal/20 to-primary-light/20 rounded-full blur-2xl"></div>
            <ProfessionalLogo size={500} showText={false} />
          </div>
          
          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/secret-logo" 
              className="text-primary hover:text-primary-light transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                ←
              </span>
              <span>Back to Logo Page</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Constellation Background */}
      <div className="fixed inset-0 pointer-events-none constellation"></div>
      
      {/* Cosmic Rays */}
      <div className="fixed inset-0 pointer-events-none cosmic-rays"></div>
      
      {/* Stardust */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="stardust"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default StandaloneLogo; 