'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createTokenFirestore } from '@/firebase/tokenService';
import { motion } from 'framer-motion';

// Define token image metadata
const TOKEN_IMAGES = [
  { 
    name: 'PWENGU', 
    symbol: 'PWENGU',
    imgPath: '/tokens/PWENGU.png',
    description: 'PWENGU token for the Solana ecosystem'
  },
  { 
    name: 'Gojo Saturudogoo', 
    symbol: 'GOJO',
    imgPath: '/tokens/GojoSaturudogoo.jpg',
    description: 'The most powerful sorcerer token in the Solana ecosystem'
  },
  { 
    name: 'Irish JD Vance', 
    symbol: 'IRISH',
    imgPath: '/tokens/IRISH JD VANCE.jpg',
    description: 'The Irish edition of the JD Vance token'
  },
  { 
    name: 'Mr. Nobody', 
    symbol: 'NOBODY',
    imgPath: '/tokens/mr.nobody.jpg',
    description: 'A mysterious token for those who prefer to remain anonymous'
  },
  { 
    name: 'USD Coin', 
    symbol: 'USDC',
    imgPath: '/tokens/usdc.png',
    description: 'A stable digital dollar on the Solana blockchain'
  },
  { 
    name: 'Solana', 
    symbol: 'SOL',
    imgPath: '/tokens/sol.png',
    description: 'The native token of the Solana blockchain'
  },
  {
    name: 'Fat Vance',
    symbol: 'FANCE',
    imgPath: '/tokens/fv.jpg',
    description: 'The Fat Vance meme token on Solana'
  },
  {
    name: 'Bonk',
    symbol: 'BONK',
    imgPath: '/tokens/bonk.png',
    description: 'The first Solana dog coin for the people, by the people'
  },
  {
    name: 'BWIRT',
    symbol: 'BWIRT',
    imgPath: '/tokens/bwirt.jpg',
    description: 'The BWIRT token for the Solana community'
  }
];

const PublicTokens = () => {
  const [loadedTokens, setLoadedTokens] = useState<{id: string, path: string, name: string, symbol: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Initialize tokens in Firebase if they don't exist
  useEffect(() => {
    const initializeTokens = async () => {
      if (isInitialized) return;
      
      setIsLoading(true);
      
      const initializedTokens = [];
      
      for (const token of TOKEN_IMAGES) {
        try {
          // Create a unique token ID based on the symbol
          const tokenId = `${token.symbol.toLowerCase()}-demo`;
          
          // Create token data
          const tokenData = {
            id: tokenId,
            name: token.name,
            symbol: token.symbol,
            description: token.description,
            logo: token.imgPath,
            initialSupply: 1000000,
            taxFee: 0,
            creatorAddress: 'demo-address',
            marketCap: Math.floor(Math.random() * 6000) + 4000, // Random market cap between 4,000 and 10,000
            priceChange24h: Math.floor(Math.random() * 20) - 10, // Random price change
            createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random creation date in last 30 days
            replies: Math.floor(Math.random() * 100),
            isFreeToken: false
          };
          
          // Save token to Firebase
          await createTokenFirestore(tokenData);
          
          initializedTokens.push({
            id: tokenId,
            path: token.imgPath,
            name: token.name,
            symbol: token.symbol
          });
        } catch (error) {
          console.error(`Error initializing token ${token.name}:`, error);
        }
      }
      
      setLoadedTokens(initializedTokens);
      setIsLoading(false);
      setIsInitialized(true);
    };
    
    initializeTokens();
  }, [isInitialized]);

  // Scroll handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 320; // Width of card + some margin
    const newScrollLeft = direction === 'left' 
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;
      
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-400">Loading tokens...</p>
      </div>
    );
  }
  
  return (
    <section className="py-16 bg-gradient-to-b from-black to-navy-700/30 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-primary/5 blur-3xl opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Tokens</h2>
            <p className="text-gray-400 mt-2">Discover our trending token collection</p>
          </div>
          <Link 
            href="/explore" 
            className="text-primary hover:text-primary-light transition-colors font-medium flex items-center"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="relative">
          {/* Scroll buttons */}
          <button 
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 p-3 rounded-full border border-gray-700 hover:border-primary transition-colors shadow-lg -ml-4 group opacity-70 hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:text-primary transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 p-3 rounded-full border border-gray-700 hover:border-primary transition-colors shadow-lg -mr-4 group opacity-70 hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:text-primary transition-colors" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Scrolling container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar py-6 px-1 scroll-smooth"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {TOKEN_IMAGES.map((token, index) => (
              <Link 
                href={`/token/${token.symbol.toLowerCase()}-demo`} 
                key={index}
                className="flex-shrink-0 w-64 mr-4 last:mr-0 relative group"
                onMouseEnter={() => setHoveredToken(token.symbol)}
                onMouseLeave={() => setHoveredToken(null)}
              >
                <motion.div 
                  className="bg-gradient-to-br from-black/80 to-navy-700/80 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 p-5 h-full overflow-hidden"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 10px 25px -5px rgba(255, 209, 0, 0.15), 0 8px 10px -6px rgba(255, 209, 0, 0.10)' 
                  }}
                  style={{
                    transform: hoveredToken === token.symbol ? 'translateY(-5px)' : 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                >
                  <div className="w-16 h-16 rounded-full mb-4 overflow-hidden relative shadow-md">
                    <Image
                      src={token.imgPath}
                      alt={token.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="64px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/tokens/default.png";
                      }}
                    />
                  </div>
                  
                  <h3 className="font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors">{token.name}</h3>
                  <p className="text-primary font-medium">${token.symbol}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-400">Market Cap</div>
                    <div className="font-mono text-sm text-white">${(Math.random() * 1000000 + 10000).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-gray-400">24h Change</div>
                    <div className={`font-mono text-sm ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                      {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 15 + 0.1).toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      View Details →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add custom styles to hide scrollbar but maintain functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PublicTokens; 