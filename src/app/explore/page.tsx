'use client';

import { useState, useEffect } from 'react';
import TokenCard from '@/components/TokenCard';
import Link from 'next/link';
import { getTokensFirestore } from '@/firebase/tokenService';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Token } from '@/firebase/types';
import { TokenInfo } from '@/services/tokenDiscovery';
import { Timestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

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
    <main className="min-h-screen bg-navy relative overflow-hidden pt-24 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent-teal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore the Cosmos
          </motion.h1>
          <motion.p
            className="text-lg text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover new tokens and track their journey through the stars
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-4 items-center bg-navy-light/30 backdrop-blur-xl rounded-full p-2">
            <div className="flex-1 flex items-center px-4">
              <span className="text-white/50 mr-3">🔍</span>
              <input
                type="text"
                placeholder="Search tokens..."
                className="w-full bg-transparent border-none text-white placeholder-white/50 focus:outline-none"
              />
            </div>
            <button className="px-6 py-2 rounded-full bg-primary/20 hover:bg-primary/30 text-primary-light transition-all duration-300">
              Search
            </button>
          </div>
        </motion.div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-navy-light/30 backdrop-blur-xl rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  animate={{
                    y: ['0%', '100%'],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'linear'
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-7xl opacity-75"
              >
                🌠
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">The Cosmos Awaits</h3>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                No tokens have been launched into orbit yet. Be the first to create a token and start your cosmic journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/create" 
                  className="inline-flex items-center px-6 py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary-light transition-all duration-300 group"
                >
                  <span>Launch First Token</span>
                  <motion.span 
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="inline-flex items-center px-6 py-3 rounded-full bg-navy-light/50 hover:bg-navy-light/70 text-white/80 hover:text-white transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-accent-teal/20 to-transparent rounded-full blur-2xl"></div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Listed Tokens', value: '0' },
              { label: 'Total Holders', value: '0' },
              { label: 'Trading Volume', value: '$0' },
              { label: 'Market Cap', value: '$0' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                className="bg-navy-light/20 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="text-sm text-white/60 mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-primary">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 