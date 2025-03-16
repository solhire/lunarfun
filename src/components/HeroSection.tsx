'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTokenStats } from '@/hooks/useTokenStats';
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenInfo } from '@/services/tokenDiscovery';

const HeroSection: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [sortOption, setSortOption] = useState<'yums.fun tokens' | 'yums.fun' | 'pump.fun'>('yums.fun tokens');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const { topToken, loading } = useTokenStats();
  const { connected } = useWallet();
  
  useEffect(() => {
    // Trigger animations after component mounts with a slight delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Set up pulsing animation with interval
    const pulseInterval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2000);
    
    // Close sort options when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sort-container')) {
        setShowSortOptions(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      clearInterval(pulseInterval);
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Format market cap to readable format
  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };
  
  // Handle sort option change
  const handleSortChange = (option: 'yums.fun tokens' | 'yums.fun' | 'pump.fun') => {
    setSortOption(option);
    setShowSortOptions(false);
  };
  
  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      {/* Background elements with improved transitions */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl transition-all duration-1000 ease-in-out"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-accent-purple/5 blur-3xl transition-all duration-1000 ease-in-out"></div>
        <div className="absolute top-40 right-1/3 w-6 h-6 rounded-full bg-primary animate-float transition-all duration-700"></div>
        <div className="absolute top-60 left-1/3 w-4 h-4 rounded-full bg-accent-teal/50 animate-float delay-300 transition-all duration-700"></div>
        <div className="absolute bottom-20 right-1/4 w-5 h-5 rounded-full bg-accent-red/50 animate-float delay-200 transition-all duration-700"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Token Card */}
        <div className={`mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {topToken && !loading && (
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-purple/20 blur-2xl"></div>
              <div className="relative glass rounded-xl p-6 border border-primary/10 hover:border-primary/20 transition-all duration-500">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-3">
                      <Image
                        src={topToken.logoURI || '/placeholder.png'}
                        alt={topToken.name}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{topToken.name}</h3>
                      <p className="text-sm text-gray-400">${topToken.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Market Cap</p>
                    <p className="font-bold text-white">{formatMarketCap(topToken.marketCap)}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Price: ${topToken.price.toFixed(4)}</span>
                  <span className={`font-medium ${topToken.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {topToken.priceChange24h >= 0 ? '+' : ''}{topToken.priceChange24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Main Heading with staggered animation */}
        <h1 
          className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Launch your Solana token in seconds
        </h1>
        
        {/* Subheading with staggered animation */}
        <p 
          className={`text-lg text-foreground-secondary mb-10 max-w-2xl mx-auto transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          The easiest way to create, launch and trade memecoins on Solana with no code required
        </p>
        
        {/* Main CTA with enhanced transitions */}
        <div 
          className={`mb-6 transition-all duration-1000 ease-out delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/create" 
              className="group relative inline-flex items-center px-8 py-4 text-lg font-bold text-navy-800 bg-primary hover:bg-primary-light rounded-xl transition-all duration-500 ease-out shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-xl animate-pulse opacity-70 transition-opacity duration-700"></div>
              <span className="relative flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-navy-800 transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Create Token
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-navy-800 transition-all duration-500 ease-out group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 