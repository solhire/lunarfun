'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import PriceChart from '@/components/PriceChart';
import TokenStats from '@/components/TokenStats';
import TokenActions from '@/components/TokenActions';
import TokenDescription from '@/components/TokenDescription';
import TokenSocials from '@/components/TokenSocials';
import TokenTrades from '@/components/TokenTrades';
import { TokenInfo } from '@/services/tokenDiscovery';

// Fallback token data
const FALLBACK_TOKEN: TokenInfo = {
  address: 'bwirtFYBZLvJGj2QNTJbR7XVjnxqJwzuoJMS7Jtxx3i',
  name: 'BWIRT',
  symbol: 'BWIRT',
  decimals: 9,
  logoURI: '/tokens/bwirt.jpg',
  createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
  liquidity: 4200000,
  volume24h: 150000,
  price: 0.00002345,
  priceChange24h: 12.8,
  marketCap: 1500000,
};

export default function TokenDetailPage() {
  const params = useParams();
  const { connected } = useWallet();
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch token data from an API
    const fetchToken = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setToken(FALLBACK_TOKEN);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching token:', error);
        setLoading(false);
      }
    };
    
    fetchToken();
    
    // Check if token is in watchlist
    // This would normally check against user's saved watchlist
    setIsInWatchlist(Math.random() > 0.5);
  }, [params.id]);
  
  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    // In a real app, this would update the user's watchlist in a database
  };
  
  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </main>
    );
  }
  
  if (!token) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-10">
          <div className="bg-navy-600 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Token Not Found</h2>
            <p className="text-gray-300 mb-6">
              The token you are looking for could not be found.
            </p>
            <Link href="/explore" className="btn btn-primary">
              Explore Tokens
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Token Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative h-12 w-12 mr-4">
              <Image 
                src={token.logoURI} 
                alt={token.name} 
                fill
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{token.name}</h1>
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">{token.symbol}</span>
                <span className="text-xs bg-navy-600 px-2 py-1 rounded-full">{token.address.slice(0, 4)}...{token.address.slice(-4)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold">${token.price.toFixed(token.price < 0.01 ? 8 : 4)}</div>
            <div className={`flex items-center ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              <span>{token.priceChange24h >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(token.priceChange24h).toFixed(2)}% (24h)</span>
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
              <PriceChart tokenSymbol={token.symbol} />
            </div>
            
            {/* Token Trades */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Trades</h2>
              <TokenTrades tokenAddress={token.address} />
            </div>
            
            {/* Token Description */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">About {token.name}</h2>
              <TokenDescription tokenSymbol={token.symbol} />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Token Actions */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Trade {token.symbol}</h2>
              <TokenActions 
                token={token} 
                isInWatchlist={isInWatchlist}
                onToggleWatchlist={toggleWatchlist}
                connected={connected}
              />
            </div>
            
            {/* Token Stats */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Token Stats</h2>
              <TokenStats token={token} />
            </div>
            
            {/* Token Socials */}
            <div className="bg-navy-600 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Links & Social</h2>
              <TokenSocials tokenSymbol={token.symbol} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 