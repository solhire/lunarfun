'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PriceChart from '@/components/PriceChart';
import TokenStats from '@/components/TokenStats';
import TokenActions from '@/components/TokenActions';
import TokenDescription from '@/components/TokenDescription';
import TokenSocials from '@/components/TokenSocials';
import TokenTrades from '@/components/TokenTrades';
import { TokenInfo } from '@/services/tokenDiscovery';

// SOL token data
const SOL_TOKEN: TokenInfo = {
  address: 'So11111111111111111111111111111111111111112',
  name: 'Wrapped SOL',
  symbol: 'SOL',
  decimals: 9,
  logoURI: '/tokens/sol.png',
  createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000, // 1 year ago
  liquidity: 450000000,
  volume24h: 220,
  price: 150.25,
  priceChange24h: 3.2,
  marketCap: 9500,
};

export default function SolTokenPage() {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  
  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Token Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative h-12 w-12 mr-4">
              <Image 
                src={SOL_TOKEN.logoURI} 
                alt={SOL_TOKEN.name} 
                fill
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{SOL_TOKEN.name}</h1>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">{SOL_TOKEN.symbol}</span>
                <span className="text-xs bg-navy-600 px-2 py-1 rounded-full">{SOL_TOKEN.address.slice(0, 4)}...{SOL_TOKEN.address.slice(-4)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">${SOL_TOKEN.price.toFixed(2)}</div>
            <div className={`flex items-center ${SOL_TOKEN.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              <span>{SOL_TOKEN.priceChange24h >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(SOL_TOKEN.priceChange24h).toFixed(2)}% (24h)</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Chart */}
            <div className="bg-navy-600 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Price Chart</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-navy-500 rounded-full hover:bg-navy-400">1D</button>
                  <button className="px-3 py-1 text-sm bg-primary text-navy-700 rounded-full">1W</button>
                  <button className="px-3 py-1 text-sm bg-navy-500 rounded-full hover:bg-navy-400">1M</button>
                  <button className="px-3 py-1 text-sm bg-navy-500 rounded-full hover:bg-navy-400">ALL</button>
                </div>
              </div>
              <PriceChart tokenSymbol={SOL_TOKEN.symbol} />
            </div>
            
            {/* Token Trades */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
              <TokenTrades tokenAddress={SOL_TOKEN.address} />
            </div>
            
            {/* Token Description */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About {SOL_TOKEN.name}</h2>
              <TokenDescription tokenSymbol={SOL_TOKEN.symbol} />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Token Actions */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Trade {SOL_TOKEN.symbol}</h2>
              <TokenActions 
                token={SOL_TOKEN} 
                isInWatchlist={isInWatchlist}
                onToggleWatchlist={toggleWatchlist}
                connected={true}
              />
            </div>
            
            {/* Token Stats */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Token Stats</h2>
              <TokenStats token={SOL_TOKEN} />
            </div>
            
            {/* Token Socials */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Links & Social</h2>
              <TokenSocials tokenSymbol={SOL_TOKEN.symbol} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 