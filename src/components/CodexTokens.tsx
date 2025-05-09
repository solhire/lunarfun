'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CodexToken, getTrendingSolanaTokens, getNewSolanaTokens } from '@/services/codexService';

// Format market cap to readable format
const formatMarketCap = (value?: number) => {
  if (!value) return 'N/A';
  
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

// Format price with appropriate decimal places
const formatPrice = (price?: number) => {
  if (!price) return 'N/A';
  
  if (price < 0.00001) {
    return `$${price.toFixed(8)}`;
  } else if (price < 0.001) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 10000) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${Math.round(price).toLocaleString()}`;
  }
};

// Token card component
const TokenCard = ({ token, index }: { token: CodexToken; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-navy-600/50 backdrop-blur-sm rounded-xl p-6 border border-navy-400/20 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden bg-navy-400/30">
          {token.logo ? (
            <Image 
              src={token.logo} 
              alt={token.name} 
              fill 
              className="object-cover"
              onError={(e) => {
                // Fallback for broken images
                (e.target as HTMLImageElement).src = '/tokens/default.png';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-lg font-bold text-primary">
              {token.symbol.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-lg">{token.name}</h3>
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-2">{token.symbol}</span>
            {token.priceChange24h !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded ${token.priceChange24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">Price</div>
          <div className="font-medium">{formatPrice(token.price)}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Market Cap</div>
          <div className="font-medium">{formatMarketCap(token.marketCap)}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Link 
          href={`/token/${token.contractAddress}`}
          className="text-primary text-sm hover:underline"
        >
          View Details
        </Link>
        <div className="text-xs text-gray-500 truncate max-w-[120px]" title={token.contractAddress}>
          {token.contractAddress.slice(0, 4)}...{token.contractAddress.slice(-4)}
        </div>
      </div>
    </motion.div>
  );
};

// Tab options
type TabType = 'trending' | 'new';

export default function CodexTokens() {
  const [tokens, setTokens] = useState<CodexToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('trending');
  const [usingMockData, setUsingMockData] = useState(false);
  const [errorType, setErrorType] = useState<'api_key' | 'origin' | 'other' | null>(null);

  useEffect(() => {
    async function fetchTokens() {
      setLoading(true);
      setErrorType(null);
      
      try {
        let fetchedTokens: CodexToken[];
        
        // Check if we're using the API key or mock data
        const apiKey = process.env.NEXT_PUBLIC_CODEX_API_KEY;
        const isUsingMockData = !apiKey || apiKey === 'your_codex_api_key_here';
        
        if (isUsingMockData) {
          setUsingMockData(true);
          setErrorType('api_key');
        }
        
        if (activeTab === 'trending') {
          fetchedTokens = await getTrendingSolanaTokens(6);
        } else {
          fetchedTokens = await getNewSolanaTokens(6);
        }
        
        setTokens(fetchedTokens);
        
        // If we got tokens but we're still using mock data, it means the API call failed
        if (fetchedTokens.length > 0 && fetchedTokens[0].id === 'sol') {
          setUsingMockData(true);
        }
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setUsingMockData(true);
        
        // Check for specific error messages
        if (error instanceof Error) {
          const errorMessage = error.message.toLowerCase();
          if (errorMessage.includes('api key was not found')) {
            setErrorType('api_key');
          } else if (errorMessage.includes('unauthorized origin')) {
            setErrorType('origin');
          } else {
            setErrorType('other');
          }
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchTokens();
  }, [activeTab]);

  // Get the appropriate error message based on the error type
  const getErrorMessage = () => {
    switch (errorType) {
      case 'api_key':
        return (
          <>
            <strong>Note:</strong> Using mock data. To display real-time Solana tokens, add your Codex.io API key to the <code>.env.local</code> file.
          </>
        );
      case 'origin':
        return (
          <>
            <strong>Note:</strong> Using mock data. Your API key is valid, but your domain is not authorized. Please register your domain in your Codex.io API key settings.
          </>
        );
      default:
        return (
          <>
            <strong>Note:</strong> Using mock data. There was an error connecting to the Codex.io API.
          </>
        );
    }
  };

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-blue-400">
          Solana Tokens
        </h2>
        
        <div className="flex bg-navy-600/50 rounded-full p-1">
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'trending' 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'new' 
                ? 'bg-primary text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            New
          </button>
        </div>
      </div>
      
      {usingMockData && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300"
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>
              {getErrorMessage()}
            </span>
          </div>
        </motion.div>
      )}
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="bg-navy-600/30 rounded-xl p-6 h-48 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token, index) => (
            <TokenCard key={token.id} token={token} index={index} />
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link 
          href="/tokens"
          className="inline-flex items-center px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary hover:bg-primary/20 transition-colors"
        >
          View All Tokens
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 