'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTokenStats, TokenData } from '@/hooks/useTokenStats';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

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
      {/* Wallet Button */}
      <div className="absolute top-4 right-4 z-50">
        <WalletMultiButton className="!bg-navy-700 !rounded-xl !py-2 !font-medium !transition-all !duration-300 hover:!bg-navy-600 active:!scale-95" />
      </div>

      {/* Background elements with improved transitions */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl transition-all duration-1000 ease-in-out"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-accent-purple/5 blur-3xl transition-all duration-1000 ease-in-out"></div>
        <div className="absolute top-40 right-1/3 w-6 h-6 rounded-full bg-primary animate-float transition-all duration-700"></div>
        <div className="absolute top-60 left-1/3 w-4 h-4 rounded-full bg-accent-teal/50 animate-float delay-300 transition-all duration-700"></div>
        <div className="absolute bottom-20 right-1/4 w-5 h-5 rounded-full bg-accent-red/50 animate-float delay-200 transition-all duration-700"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Top of the Food Chain Section with enhanced transitions */}
        <div 
          className={`mb-12 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {loading ? (
            <div className="relative h-32 rounded-2xl bg-navy-400/50 animate-pulse transition-all duration-500"></div>
          ) : topToken && (
            <div className="relative">
              <div className={`absolute inset-0 rounded-2xl bg-primary/20 blur-xl ${isPulsing ? 'scale-105' : 'scale-100'} transition-all duration-1500 ease-in-out`}></div>
              <div className="glass border border-primary/30 rounded-2xl p-4 relative overflow-hidden transition-all duration-500 hover:border-primary/50">
                <div className="absolute -inset-1 bg-primary/10 animate-pulse opacity-50 blur-xl rounded-full transition-opacity duration-700"></div>
                
                <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2 flex items-center justify-center transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Top of the Food Chain
                </div>
                
                <Link 
                  href={`/token/${topToken.id}`}
                  className="flex items-center justify-center group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full bg-primary blur-md ${isPulsing ? 'scale-110 opacity-70' : 'scale-100 opacity-50'} transition-all duration-1500 ease-in-out`}></div>
                    <div className="relative h-16 w-16 rounded-full overflow-hidden bg-navy-400 border-2 border-primary shadow-lg group-hover:scale-105 transition-all duration-500 ease-out">
                      <Image
                        src={topToken.logo}
                        alt={`${topToken.name} logo`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = '/tokens/default-token.jpg';
                        }}
                      />
                      <div className="absolute -top-1 -right-1">
                        <div className="relative h-6 w-6 transition-transform duration-500 group-hover:rotate-12">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFD100" className="w-6 h-6">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 text-left">
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-500">{topToken.name}</h3>
                      <span className="ml-2 text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300">${topToken.symbol}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-medium text-primary transition-colors duration-300">Market Cap:</span>
                      <span className="ml-2 text-sm font-bold text-white transition-colors duration-300 group-hover:text-gray-200">{formatMarketCap(topToken.marketCap)}</span>
                    </div>
                    <div className="mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-teal/10 text-teal inline-block transition-all duration-300 group-hover:bg-teal/20">
                      {topToken.priceChange24h > 0 ? '+' : ''}{topToken.priceChange24h.toFixed(1)}%
                    </div>
                  </div>
                </Link>
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
            
            <div className="relative sort-container">
              <div className="flex items-center">
                <Link 
                  href={`/explore?source=${sortOption}`}
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-white border-2 border-white/20 hover:border-white/40 rounded-l-xl transition-all duration-500 ease-out hover:bg-white/5 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Explore Tokens
                </Link>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSortOptions(!showSortOptions);
                  }}
                  className="inline-flex items-center justify-center px-3 py-3 text-base font-medium text-white border-2 border-l-0 border-white/20 hover:border-white/40 rounded-r-xl transition-all duration-500 ease-out hover:bg-white/5 active:scale-95"
                >
                  <div className="flex items-center">
                    <span className="hidden sm:inline-block text-xs mr-1 text-primary">{sortOption}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${showSortOptions ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* Sort options dropdown */}
              {showSortOptions && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-navy-700 border border-white/10 overflow-hidden z-20 transition-all duration-300 ease-out origin-top-right scale-100">
                  <div className="py-1">
                    <button
                      onClick={() => handleSortChange('yums.fun tokens')}
                      className={`flex items-center w-full px-4 py-2 text-sm ${sortOption === 'yums.fun tokens' ? 'text-primary bg-white/5' : 'text-white hover:bg-white/5'} transition-colors duration-200`}
                    >
                      <span className="mr-2">{sortOption === 'yums.fun tokens' && '✓'}</span>
                      yums.fun tokens
                    </button>
                    <button
                      onClick={() => handleSortChange('yums.fun')}
                      className={`flex items-center w-full px-4 py-2 text-sm ${sortOption === 'yums.fun' ? 'text-primary bg-white/5' : 'text-white hover:bg-white/5'} transition-colors duration-200`}
                    >
                      <span className="mr-2">{sortOption === 'yums.fun' && '✓'}</span>
                      yums.fun
                    </button>
                    <button
                      onClick={() => handleSortChange('pump.fun')}
                      className={`flex items-center w-full px-4 py-2 text-sm ${sortOption === 'pump.fun' ? 'text-primary bg-white/5' : 'text-white hover:bg-white/5'} transition-colors duration-200`}
                    >
                      <span className="mr-2">{sortOption === 'pump.fun' && '✓'}</span>
                      pump.fun
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mt-3 transition-opacity duration-700 opacity-80 hover:opacity-100">No coding required • Takes less than 1 minute</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 