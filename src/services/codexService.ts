import axios from 'axios';

// Define token interface based on Codex.io API response
export interface CodexToken {
  id: string;
  name: string;
  symbol: string;
  logo?: string;
  marketCap?: number;
  priceChange24h?: number;
  price?: number;
  volume24h?: number;
  contractAddress: string;
  network: string;
  description?: string;
}

// You'll need to replace this with your actual Codex.io API key
const CODEX_API_KEY = process.env.NEXT_PUBLIC_CODEX_API_KEY || '';
const CODEX_API_URL = 'https://api.codex.io';

// Create axios instance with default headers
const codexApi = axios.create({
  baseURL: CODEX_API_URL,
  headers: {
    'Authorization': `Bearer ${CODEX_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Fetch trending Solana tokens from Codex.io
 * @param limit Number of tokens to fetch
 * @returns Array of token data
 */
export async function getTrendingSolanaTokens(limit: number = 10): Promise<CodexToken[]> {
  try {
    // This is a placeholder endpoint - replace with actual Codex.io endpoint
    const response = await codexApi.get('/tokens', {
      params: {
        network: 'solana',
        sort: 'volume',
        order: 'desc',
        limit
      }
    });
    
    return response.data.tokens || [];
  } catch (error) {
    console.error('Error fetching trending Solana tokens:', error);
    return getMockSolanaTokens(); // Fallback to mock data if API fails
  }
}

/**
 * Fetch new Solana tokens from Codex.io
 * @param limit Number of tokens to fetch
 * @returns Array of token data
 */
export async function getNewSolanaTokens(limit: number = 10): Promise<CodexToken[]> {
  try {
    // This is a placeholder endpoint - replace with actual Codex.io endpoint
    const response = await codexApi.get('/tokens', {
      params: {
        network: 'solana',
        sort: 'created_at',
        order: 'desc',
        limit
      }
    });
    
    return response.data.tokens || [];
  } catch (error) {
    console.error('Error fetching new Solana tokens:', error);
    return getMockSolanaTokens(); // Fallback to mock data if API fails
  }
}

/**
 * Get token details by contract address
 * @param address Token contract address
 * @returns Token details
 */
export async function getTokenDetails(address: string): Promise<CodexToken | null> {
  try {
    const response = await codexApi.get(`/tokens/${address}`);
    return response.data.token || null;
  } catch (error) {
    console.error(`Error fetching token details for ${address}:`, error);
    return null;
  }
}

/**
 * Provides mock Solana token data for development and fallback
 * @returns Array of mock token data
 */
function getMockSolanaTokens(): CodexToken[] {
  return [
    {
      id: 'sol',
      name: 'Wrapped SOL',
      symbol: 'SOL',
      logo: '/tokens/sol.png',
      marketCap: 40000000,
      priceChange24h: 2.5,
      price: 150.25,
      volume24h: 1200000,
      contractAddress: 'So11111111111111111111111111111111111111112',
      network: 'solana',
      description: 'Wrapped SOL is the native token of the Solana blockchain wrapped for DeFi applications.'
    },
    {
      id: 'bonk',
      name: 'Bonk',
      symbol: 'BONK',
      logo: '/tokens/bonk.png',
      marketCap: 1500000,
      priceChange24h: 12.8,
      price: 0.00002345,
      volume24h: 800000,
      contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
      network: 'solana',
      description: 'The first Solana dog coin for the people, by the people.'
    },
    {
      id: 'jup',
      name: 'Jupiter',
      symbol: 'JUP',
      logo: '/tokens/jup.png',
      marketCap: 2800000,
      priceChange24h: 5.3,
      price: 1.23,
      volume24h: 950000,
      contractAddress: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      network: 'solana',
      description: 'Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery.'
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      logo: '/tokens/usdc.png',
      marketCap: 28400000,
      priceChange24h: 0.1,
      price: 1.00,
      volume24h: 15000000,
      contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      network: 'solana',
      description: 'USDC is a fully collateralized US dollar stablecoin powered by Solana.'
    },
    {
      id: 'wen',
      name: 'Wen Token',
      symbol: 'WEN',
      logo: '/tokens/wen.png',
      marketCap: 950000,
      priceChange24h: 8.7,
      price: 0.0034,
      volume24h: 450000,
      contractAddress: 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk',
      network: 'solana',
      description: 'WEN is a community token for the Solana ecosystem.'
    }
  ];
} 