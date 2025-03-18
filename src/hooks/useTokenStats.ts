'use client';

import { useState, useEffect } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { TokenListProvider, TokenInfo as SplTokenInfo } from '@solana/spl-token-registry';
import { TokenInfo } from '@/services/tokenDiscovery';

// Featured tokens with stable data
export const FEATURED_TOKENS: TokenInfo[] = [
  {
    address: '9XyPJ7WsYsQF3hGrFqgMrL9LGy7nKeDVM5L3F9WvVJjZ',
    name: 'BWIRT',
    symbol: 'BWIRT',
    decimals: 9,
    logoURI: '/tokens/bwirt.jpg',
    createdAt: Date.now(),
    liquidity: 4200000,
    volume24h: 150000,
    price: 0.00002345,
    priceChange24h: 8.3,
    marketCap: 4200
  },
  {
    address: '7nZbHGwzFJ9Dz8uBeRLnmJeBrUVMS8C8YoycjgE3XJ11',
    name: 'FAT VANCE',
    symbol: 'FANCE',
    decimals: 9,
    logoURI: '/tokens/fv.jpg',
    createdAt: Date.now(),
    liquidity: 3700000,
    volume24h: 120000,
    price: 0.037,
    priceChange24h: 15.8,
    marketCap: 3700
  }
];

export function useTokenStats() {
  const [topToken, setTopToken] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setTopToken(FEATURED_TOKENS[0]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { topToken, loading };
} 