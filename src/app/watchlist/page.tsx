'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenCard from '@/components/TokenCard';
import Link from 'next/link';
import { TokenInfo } from '@/services/tokenDiscovery';

// Mock watchlist data with correct TokenInfo interface
const MOCK_WATCHLIST: TokenInfo[] = [
  {
    address: '9XyPJ7WsYsQF3hGrFqgMrL9LGy7nKeDVM5L3F9WvVJjZ',
    name: 'BWIRT',
    symbol: 'BWIRT',
    decimals: 9,
    logoURI: '/tokens/bwirt.jpg',
    createdAt: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
    liquidity: 4200000,
    volume24h: 150000,
    price: 0.00002345,
    priceChange24h: 12.8,
    marketCap: 1500000,
  },
  {
    address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    name: 'Jupiter',
    symbol: 'JUP',
    decimals: 6,
    logoURI: '/tokens/jup.png',
    createdAt: Date.now() - 48 * 60 * 60 * 1000, // 48 hours ago
    liquidity: 28000000,
    volume24h: 950000,
    price: 1.23,
    priceChange24h: 5.3,
    marketCap: 2800000,
  },
];

export default function WatchlistPage() {
  const { connected } = useWallet();
  const [watchlist, setWatchlist] = useState<TokenInfo[]>([]);
  const [sortBy, setSortBy] = useState<'marketCap' | 'volume24h' | 'priceChange24h'>('marketCap');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Load watchlist data
  useEffect(() => {
    // In a real app, this would fetch from a database based on the user's wallet
    setWatchlist(MOCK_WATCHLIST);
  }, []);
  
  // Sort watchlist
  const sortedWatchlist = [...watchlist].sort((a, b) => {
    const aValue = a[sortBy] || 0;
    const bValue = b[sortBy] || 0;
    
    if (sortDirection === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
  
  // Handle sort change
  const handleSort = (criteria: typeof sortBy) => {
    if (criteria === sortBy) {
      // Toggle direction if same criteria
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New criteria, default to descending
      setSortBy(criteria);
      setSortDirection('desc');
    }
  };
  
  // Remove from watchlist
  const removeFromWatchlist = (address: string) => {
    setWatchlist(watchlist.filter(token => token.address !== address));
  };
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Your Watchlist</h1>
        
        {connected ? (
          <>
            {watchlist.length > 0 ? (
              <div className="bg-navy-600 rounded-xl p-6">
                {/* Sort Controls */}
                <div className="flex justify-end mb-4">
                  <div className="flex space-x-4 text-sm">
                    <button 
                      className={`px-3 py-1 rounded-full ${sortBy === 'marketCap' ? 'bg-primary text-navy-700' : 'bg-navy-500 text-gray-300'}`}
                      onClick={() => handleSort('marketCap')}
                    >
                      Market Cap {sortBy === 'marketCap' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full ${sortBy === 'volume24h' ? 'bg-primary text-navy-700' : 'bg-navy-500 text-gray-300'}`}
                      onClick={() => handleSort('volume24h')}
                    >
                      Volume {sortBy === 'volume24h' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                    <button 
                      className={`px-3 py-1 rounded-full ${sortBy === 'priceChange24h' ? 'bg-primary text-navy-700' : 'bg-navy-500 text-gray-300'}`}
                      onClick={() => handleSort('priceChange24h')}
                    >
                      Price Change {sortBy === 'priceChange24h' && (sortDirection === 'asc' ? '↑' : '↓')}
                    </button>
                  </div>
                </div>
                
                {/* Tokens List */}
                <div className="space-y-4">
                  {sortedWatchlist.map((token) => (
                    <div key={token.address} className="relative">
                      <button 
                        className="absolute top-4 right-4 bg-navy-500/80 hover:bg-navy-400 p-1 rounded-full transition-colors"
                        onClick={() => removeFromWatchlist(token.address)}
                        aria-label="Remove from watchlist"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <TokenCard token={token} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-navy-600 rounded-xl p-8 text-center">
                <div className="mb-6">
                  <div className="inline-block p-4 rounded-full bg-navy-400/30 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Your watchlist is empty</h2>
                  <p className="text-gray-300 mb-6">
                    Add tokens to your watchlist to track their performance and get updates.
                  </p>
                  <Link 
                    href="/explore" 
                    className="inline-block px-6 py-3 bg-primary text-navy-700 rounded-full font-medium hover:bg-primary-400 transition-all hover:shadow-md"
                  >
                    Explore Tokens
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-navy-600 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-navy-400/30 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-gray-300 mb-6">
                Connect your wallet to view and manage your watchlist.
              </p>
              <button className="px-6 py-3 bg-primary text-navy-700 rounded-full font-medium hover:bg-primary-400 transition-all hover:shadow-md">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 