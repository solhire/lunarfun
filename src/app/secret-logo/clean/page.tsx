'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import ProfessionalLogo from '@/components/ProfessionalLogo';

const CleanLogo: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative z-10">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Clean Logo */}
          <div className="relative mb-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Dark Version */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <ProfessionalLogo size={200} showText={false} autoAnimate={false} />
                </div>
                <p className="mt-4 text-sm text-gray-600">Dark Version</p>
              </div>
              
              {/* Light Version */}
              <div className="flex flex-col items-center">
                <div className="bg-navy p-8 rounded-xl shadow-sm border border-navy-light">
                  <ProfessionalLogo size={200} showText={false} autoAnimate={false} />
                </div>
                <p className="mt-4 text-sm text-gray-600">Light Version</p>
              </div>
            </div>
            
            {/* Logo Specifications */}
            <div className="mt-12 text-left max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Logo Specifications</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Primary Color</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 rounded bg-primary mr-2"></div>
                    <code className="text-sm text-gray-600">#B19CD9</code>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Secondary Colors</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded bg-primary-light mr-2"></div>
                      <code className="text-sm text-gray-600">Light</code>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded bg-accent-teal mr-2"></div>
                      <code className="text-sm text-gray-600">Accent</code>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Minimum Size</h3>
                  <p className="text-sm text-gray-600 mt-1">24px × 24px</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Clear Space</h3>
                  <p className="text-sm text-gray-600 mt-1">Maintain padding equal to 25% of logo width</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Download Links */}
          <div className="mt-8 flex justify-center gap-4">
            <a 
              href="#svg"
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm transition-colors"
              download="lunara-logo.svg"
            >
              Download SVG
            </a>
            <a 
              href="#png"
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm transition-colors"
              download="lunara-logo.png"
            >
              Download PNG
            </a>
          </div>
          
          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              href="/secret-logo" 
              className="text-primary hover:text-primary-light transition-colors flex items-center justify-center gap-2 group"
            >
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
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

export default CleanLogo; 