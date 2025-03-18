import { Connection, PublicKey } from '@solana/web3.js';
import { ref, set, get } from 'firebase/database';
import { db } from '@/firebase/config';
import { config } from '@/config/env';
import { testFirebaseConnection } from '@/firebase/config';
import axios from 'axios';

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  createdAt: number;
  liquidity: number;
  volume24h: number;
  price: number;
  priceChange24h: number;
  marketCap: number;
  source?: 'raydium' | 'pump';
}

export class TokenDiscoveryService {
  private connection: Connection;
  private lastCheckTimestamp: number;

  constructor(rpcUrl: string) {
    this.connection = new Connection(rpcUrl);
    // Set initial timestamp to 1 hour ago to catch recent tokens on startup
    this.lastCheckTimestamp = Date.now() - 60 * 60 * 1000;
  }

  public async initialize() {
    console.log('TokenDiscoveryService: Testing Firebase connection...');
    const isConnected = await testFirebaseConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to Firebase');
    }
    console.log('TokenDiscoveryService: Firebase connection successful');
  }

  private async getLastSavedTokenTimestamp(): Promise<number> {
    try {
      const tokensRef = ref(db, 'tokens');
      const snapshot = await get(tokensRef);
      if (!snapshot.exists()) return this.lastCheckTimestamp;

      const tokens = Object.values(snapshot.val()) as TokenInfo[];
      const latestToken = tokens.reduce((latest, token) => 
        token.createdAt > latest.createdAt ? token : latest
      );

      // Return the latest token's timestamp or fallback to constructor timestamp
      return latestToken ? latestToken.createdAt : this.lastCheckTimestamp;
    } catch (error) {
      console.error('Error getting last saved token timestamp:', error);
      return this.lastCheckTimestamp;
    }
  }

  private async fetchRaydiumNewTokens(): Promise<TokenInfo[]> {
    try {
      const response = await fetch('https://api.raydium.io/v2/main/pairs');
      const data = await response.json();
      
      return data.data
        .filter((pair: any) => {
          const createdAt = new Date(pair.addedTime).getTime();
          return createdAt > this.lastCheckTimestamp;
        })
        .map((pair: any) => ({
          address: pair.tokenB.mint,
          symbol: pair.tokenB.symbol,
          name: pair.tokenB.name,
          decimals: pair.tokenB.decimals,
          createdAt: new Date(pair.addedTime).getTime(),
          liquidity: pair.liquidity,
          volume24h: pair.volume24h,
          price: pair.price,
          priceChange24h: 0,
          marketCap: 0,
          logoURI: '',
          source: 'raydium' as const
        }));
    } catch (error) {
      console.error('Error fetching from Raydium:', error);
      return [];
    }
  }

  private async fetchPumpNewTokens(): Promise<TokenInfo[]> {
    try {
      const response = await fetch('https://api.pump.fun/tokens/latest');
      const data = await response.json();
      
      return data
        .filter((token: any) => {
          const createdAt = new Date(token.createdAt).getTime();
          return createdAt > this.lastCheckTimestamp;
        })
        .map((token: any) => ({
          address: token.address,
          symbol: token.symbol,
          name: token.name,
          decimals: token.decimals,
          logoURI: token.logoURI,
          createdAt: new Date(token.createdAt).getTime(),
          liquidity: token.liquidity,
          volume24h: 0,
          price: token.price,
          priceChange24h: 0,
          marketCap: 0,
          source: 'pump' as const
        }));
    } catch (error) {
      console.error('Error fetching from Pump:', error);
      return [];
    }
  }

  private async saveTokenToDatabase(token: TokenInfo) {
    try {
      const tokenRef = ref(db, `tokens/${token.address}`);
      const existingToken = await get(tokenRef);
      
      if (!existingToken.exists()) {
        await set(tokenRef, {
          ...token,
          discoveredAt: Date.now()
        });
        console.log(`New token saved: ${token.symbol}`);
      }
    } catch (error) {
      console.error('Error saving token to database:', error);
    }
  }

  public async monitorNewTokens() {
    try {
      // Get the latest token timestamp from the database
      this.lastCheckTimestamp = await this.getLastSavedTokenTimestamp();
      console.log('TokenDiscoveryService: Checking for tokens since', new Date(this.lastCheckTimestamp).toISOString());

      // Fetch new tokens from both sources
      const [raydiumTokens, pumpTokens] = await Promise.all([
        this.fetchRaydiumNewTokens(),
        this.fetchPumpNewTokens()
      ]);

      // Combine and sort by creation time
      const allNewTokens = [...raydiumTokens, ...pumpTokens]
        .sort((a, b) => b.createdAt - a.createdAt)
        .filter(token => 
          token.liquidity && 
          token.liquidity >= config.tokenDiscovery.minLiquidityUsd
        );

      // Save new tokens to database
      for (const token of allNewTokens) {
        await this.saveTokenToDatabase(token);
      }

      // Update last check timestamp
      this.lastCheckTimestamp = Date.now();

      return allNewTokens;
    } catch (error) {
      console.error('Error monitoring new tokens:', error);
      return [];
    }
  }

  async fetchNewTokens(): Promise<TokenInfo[]> {
    console.log('TokenDiscoveryService: Fetching new tokens...');
    try {
      const newTokens = await this.monitorNewTokens();
      console.log('TokenDiscoveryService: Found tokens:', {
        count: newTokens.length,
        tokens: newTokens.map(t => ({
          symbol: t.symbol,
          source: t.source,
          liquidity: t.liquidity
        }))
      });
      return newTokens;
    } catch (error) {
      console.error('TokenDiscoveryService: Error fetching tokens:', error);
      throw error;
    }
  }
}

// Mock data for trending tokens
export const getMockTrendingTokens = (): TokenInfo[] => {
  return [
    {
      address: '9XyPJ7WsYsQF3hGrFqgMrL9LGy7nKeDVM5L3F9WvVJjZ',
      name: 'BWIRT',
      symbol: 'BWIRT',
      decimals: 9,
      logoURI: '/tokens/bwirt.jpg',
      createdAt: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
      liquidity: 4200000,
      volume24h: 150,
      price: 0.00002345,
      priceChange24h: 12.8,
      marketCap: 4200,
    },
    {
      address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      name: 'Jupiter',
      symbol: 'JUP',
      decimals: 6,
      logoURI: '/tokens/jup.png',
      createdAt: Date.now() - 48 * 60 * 60 * 1000, // 48 hours ago
      liquidity: 28000000,
      volume24h: 950,
      price: 1.23,
      priceChange24h: 5.3,
      marketCap: 9850,
    },
    {
      address: '7nZbHGwzFJ9Dz8uBeRLnmJeBrUVMS8C8YoycjgE3XJ11',
      name: 'FAT VANCE',
      symbol: 'FANCE',
      decimals: 9,
      logoURI: '/tokens/fv.jpg',
      createdAt: Date.now() - 72 * 60 * 60 * 1000, // 72 hours ago
      liquidity: 3700000,
      volume24h: 120,
      price: 0.037,
      priceChange24h: -2.5,
      marketCap: 3700,
    },
    {
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      logoURI: '/tokens/usdc.png',
      createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000, // 1 year ago
      liquidity: 500000000,
      volume24h: 250,
      price: 1.0,
      priceChange24h: 0.01,
      marketCap: 8750,
    },
    {
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
    }
  ];
};

// Mock data for Solana tokens from Codex
export const getMockSolanaTokens = () => {
  return {
    data: {
      tokens: [
        {
          address: '9XyPJ7WsYsQF3hGrFqgMrL9LGy7nKeDVM5L3F9WvVJjZ',
          name: 'BWIRT',
          symbol: 'BWIRT',
          decimals: 9,
          logoURI: '/tokens/bwirt.jpg',
          createdAt: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
          liquidity: 4200000,
          volume24h: 150,
          price: 0.00002345,
          priceChange24h: 12.8,
          marketCap: 4200,
        },
        {
          address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
          name: 'Jupiter',
          symbol: 'JUP',
          decimals: 6,
          logoURI: '/tokens/jup.png',
          createdAt: Date.now() - 48 * 60 * 60 * 1000, // 48 hours ago
          liquidity: 28000000,
          volume24h: 950,
          price: 1.23,
          priceChange24h: 5.3,
          marketCap: 9850,
        },
        {
          address: '7nZbHGwzFJ9Dz8uBeRLnmJeBrUVMS8C8YoycjgE3XJ11',
          name: 'FAT VANCE',
          symbol: 'FANCE',
          decimals: 9,
          logoURI: '/tokens/fv.jpg',
          createdAt: Date.now() - 72 * 60 * 60 * 1000, // 72 hours ago
          liquidity: 3700000,
          volume24h: 120,
          price: 0.037,
          priceChange24h: -2.5,
          marketCap: 3700,
        }
      ]
    }
  };
};

// Function to fetch Solana tokens from Codex API
export const getSolanaTokens = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_CODEX_API_KEY;
    
    if (!apiKey) {
      console.error('API key was not found');
      return getMockSolanaTokens();
    }
    
    const response = await axios.post(
      'https://api.codex.so/graphql',
      {
        query: `
          query GetSolanaTokens {
            tokens(
              filter: { 
                networkIds: [1399811149]
                limit: 10
                sortBy: VOLUME_DESC
              }
            ) {
              address
              name
              symbol
              decimals
              logoURI
              volume24h
              liquidity
              price
              priceChange24h
              marketCap
            }
          }
        `
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching Solana tokens:', error);
    return getMockSolanaTokens();
  }
}; 