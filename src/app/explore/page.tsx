'use client';

import { useState, useEffect } from 'react';
import TokenCard from '@/components/TokenCard';
import Link from 'next/link';
import { getTokensFirestore } from '@/firebase/tokenService';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Token } from '@/firebase/types';
import { TokenInfo } from '@/services/tokenDiscovery';
import { Timestamp } from 'firebase/firestore';

// Categories for filtering
const CATEGORIES = [
  'All',
  'Popular',
  'Trending',
  'New',
];

// Sort options
const SORT_OPTIONS = [
  { value: 'marketCap', label: 'Market Cap' },
  { value: 'priceChange24h', label: 'Price Change' },
  { value: 'createdAt', label: 'Newest' },
];

// Convert Firebase token to TokenInfo format
const convertToTokenInfo = (token: Token): TokenInfo => {
  return {
    address: token.id || token.contractAddress || '',
    symbol: token.symbol,
    name: token.name,
    decimals: 9, // Default for Solana tokens
    logoURI: token.logo,
    createdAt: getTimestampMillis(token.createdAt),
    liquidity: token.marketCap || 0,
    volume24h: (token.marketCap || 0) * 0.1, // Estimating volume as 10% of market cap
    price: token.priceChange24h || 0,
    priceChange24h: token.priceChange24h || 0,
    marketCap: token.marketCap || 0,
    source: 'raydium' // Using 'raydium' as the source since it's one of the allowed values
  };
};

// Helper to get milliseconds from a Firestore timestamp or Date
const getTimestampMillis = (timestamp: number | Date | Timestamp): number => {
  if (typeof timestamp === 'object' && timestamp !== null) {
    if ('toMillis' in timestamp && typeof timestamp.toMillis === 'function') {
      return timestamp.toMillis();
    } else if (timestamp instanceof Date) {
      return timestamp.getTime();
    }
  }
  return Number(timestamp);
};

export default function ExplorePage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Fetch tokens on component mount
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const fetchedTokens = await getTokensFirestore();
        if (fetchedTokens.length > 0) {
          setTokens(fetchedTokens);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setIsLoading(false);
      }
    };
    
    fetchTokens();
  }, []);
  
  // Filter and sort tokens
  const filteredTokens = tokens.filter(token => {
    // Filter by search term
    const matchesSearch = 
      token.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const tokenCreationTime = getTimestampMillis(token.createdAt);
    const isNewToken = (Date.now() - tokenCreationTime) < 7 * 24 * 60 * 60 * 1000; // Less than 7 days old
    
    const matchesCategory = selectedCategory === 'All' || (
      selectedCategory === 'Popular' && (token.marketCap || 0) > 500000 ||
      selectedCategory === 'Trending' && (token.priceChange24h || 0) > 5 ||
      selectedCategory === 'New' && isNewToken
    );
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'marketCap') {
      return sortOrder === 'desc' ? (b.marketCap || 0) - (a.marketCap || 0) : (a.marketCap || 0) - (b.marketCap || 0);
    } else if (sortBy === 'priceChange24h') {
      return sortOrder === 'desc' ? (b.priceChange24h || 0) - (a.priceChange24h || 0) : (a.priceChange24h || 0) - (b.priceChange24h || 0);
    } else if (sortBy === 'createdAt') {
      const dateA = getTimestampMillis(a.createdAt);
      const dateB = getTimestampMillis(b.createdAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    }
    return 0;
  });
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Explore Tokens</h1>
        
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or symbol..."
                  className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="relative min-w-48">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full px-4 py-3 bg-black/40 border border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white appearance-none"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={toggleSortOrder}
                className="px-4 py-3 bg-black/40 border border-gray-800 rounded-lg text-white hover:bg-gray-800 transition-colors"
                aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-black/40 text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingIndicator message="Loading tokens..." />
          </div>
        ) : filteredTokens.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTokens.map(token => (
              <TokenCard key={token.id} token={convertToTokenInfo(token)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-black/20 rounded-xl border border-gray-800">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">No tokens found</h2>
            <p className="text-gray-400 mb-6">
              {searchTerm ? `No results for "${searchTerm}"` : 'Try adjusting your filters or create a new token'}
            </p>
            <Link href="/create" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
              Create Token
            </Link>
          </div>
        )}
      </div>
    </main>
  );
} 