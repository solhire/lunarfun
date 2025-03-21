'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import ProfessionalLogo from '@/components/ProfessionalLogo';

const TransparentLogo: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bgColor, setBgColor] = useState('white');
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const backgroundOptions = [
    { label: 'White', value: 'white' },
    { label: 'Light', value: '#F4F4F8' },
    { label: 'Dark', value: '#10101E' },
    { label: 'Black', value: 'black' },
  ];
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative z-10">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Background Color Selector */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            {backgroundOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setBgColor(option.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  bgColor === option.value 
                    ? 'border-primary scale-110' 
                    : 'border-transparent scale-100 hover:scale-105'
                }`}
                style={{ backgroundColor: option.value }}
                title={option.label}
              />
            ))}
          </div>

          {/* Transparent Logo */}
          <div className="relative">
            <div className="transparent-bg p-8 rounded-xl">
              <ProfessionalLogo size={400} showText={false} autoAnimate={false} />
            </div>
          </div>
          
          {/* Download Links */}
          <div className="mt-8 flex justify-center gap-4">
            <a 
              href="#svg"
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm transition-colors"
              download="lunara-logo-transparent.svg"
            >
              Download SVG
            </a>
            <a 
              href="#png"
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm transition-colors"
              download="lunara-logo-transparent.png"
            >
              Download PNG
            </a>
          </div>
          
          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/secret-logo" 
              className={`transition-colors flex items-center justify-center gap-2 group ${
                bgColor === 'white' || bgColor === '#F4F4F8'
                  ? 'text-primary hover:text-primary-light'
                  : 'text-white hover:text-primary-light'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                bgColor === 'white' || bgColor === '#F4F4F8'
                  ? 'bg-primary/10 group-hover:bg-primary/20'
                  : 'bg-white/10 group-hover:bg-white/20'
              }`}>
                ←
              </span>
              <span>Back to Logo Page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparentLogo; 