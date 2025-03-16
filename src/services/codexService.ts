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

// Get API key from environment variables
const CODEX_API_KEY = process.env.NEXT_PUBLIC_CODEX_API_KEY || '';
const CODEX_API_URL = 'https://api.codex.io';
const CODEX_GRAPH_URL = 'https://graph.codex.io/graphql';

// Check if API key is available
const isApiKeyAvailable = CODEX_API_KEY && CODEX_API_KEY !== 'your_codex_api_key_here';

// Create axios instance with default headers
const codexApi = axios.create({
  baseURL: CODEX_API_URL,
  headers: {
    'Authorization': CODEX_API_KEY,
    'Content-Type': 'application/json',
    'Origin': 'https://yums.fun'
  }
});

// Create GraphQL axios instance
const codexGraphApi = axios.create({
  baseURL: CODEX_GRAPH_URL,
  headers: {
    'Authorization': CODEX_API_KEY,
    'Content-Type': 'application/json',
    'Origin': 'https://yums.fun'
  }
});

/**
 * Fetch trending Solana tokens from Codex.io
 * @param limit Number of tokens to fetch
 * @returns Array of token data
 */
export async function getTrendingSolanaTokens(limit: number = 10): Promise<CodexToken[]> {
  // If API key is not available, return mock data
  if (!isApiKeyAvailable) {
    console.log('Codex API key not found. Using mock data for trending tokens.');
    return getMockSolanaTokens();
  }
  
  try {
    console.log('Fetching trending Solana tokens from Codex.io...');
    
    // Use GraphQL API to fetch trending Solana tokens
    const response = await codexGraphApi.post('', {
      query: `{
        filterTokens(
          input: {
            networkIds: ["1399811149"],
            limit: ${limit},
            sortBy: VOLUME_USD
          }
        ) {
          edges {
            node {
              address
              name
              symbol
              price
              marketCap
              volume24h
              priceChange24h
            }
          }
        }
      }`
    });
    
    console.log('Response status:', response.status);
    
    if (response.data.data?.filterTokens?.edges) {
      return response.data.data.filterTokens.edges.map((edge: any) => {
        const item = edge.node;
        return {
          id: item.address,
          name: item.name,
          symbol: item.symbol,
          price: item.price,
          marketCap: item.marketCap,
          priceChange24h: item.priceChange24h,
          volume24h: item.volume24h,
          contractAddress: item.address,
          network: 'solana',
          description: `${item.name} (${item.symbol}) token on Solana blockchain.`
        };
      });
    } else if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      return getMockSolanaTokens();
    }
    
    console.log('No tokens found in response, using mock data');
    return getMockSolanaTokens();
  } catch (error) {
    console.error('Error fetching trending Solana tokens:', error);
    
    // Check for specific error types
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      console.error('Status:', status);
      console.error('Error data:', JSON.stringify(errorData, null, 2));
      
      if (status === 401 || status === 403) {
        if (errorData?.errors?.[0]?.message?.includes('unauthorized origin')) {
          console.error('Unauthorized origin error. You need to register your application domain with Codex.io.');
          console.error('Please visit https://www.codex.io/ to register your domain in your API key settings.');
        } else if (errorData?.errors?.[0]?.message?.includes('API key was not found')) {
          console.error('Invalid API key. Please check your API key and make sure it is correct.');
        }
      }
    }
    
    return getMockSolanaTokens(); // Fallback to mock data if API fails
  }
}

/**
 * Fetch new Solana tokens from Codex.io
 * @param limit Number of tokens to fetch
 * @returns Array of token data
 */
export async function getNewSolanaTokens(limit: number = 10): Promise<CodexToken[]> {
  // If API key is not available, return mock data
  if (!isApiKeyAvailable) {
    console.log('Codex API key not found. Using mock data for new tokens.');
    return getMockSolanaTokens();
  }
  
  try {
    console.log('Fetching new Solana tokens from Codex.io...');
    
    // Use GraphQL API to fetch new Solana tokens
    const response = await codexGraphApi.post('', {
      query: `{
        filterTokens(
          input: {
            networkIds: ["1399811149"],
            limit: ${limit},
            sortBy: CREATED_AT
          }
        ) {
          edges {
            node {
              address
              name
              symbol
              price
              marketCap
              volume24h
              priceChange24h
            }
          }
        }
      }`
    });
    
    console.log('Response status:', response.status);
    
    if (response.data.data?.filterTokens?.edges) {
      return response.data.data.filterTokens.edges.map((edge: any) => {
        const item = edge.node;
        return {
          id: item.address,
          name: item.name,
          symbol: item.symbol,
          price: item.price,
          marketCap: item.marketCap,
          priceChange24h: item.priceChange24h,
          volume24h: item.volume24h,
          contractAddress: item.address,
          network: 'solana',
          description: `${item.name} (${item.symbol}) token on Solana blockchain.`
        };
      });
    } else if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      return getMockSolanaTokens();
    }
    
    console.log('No tokens found in response, using mock data');
    return getMockSolanaTokens();
  } catch (error) {
    console.error('Error fetching new Solana tokens:', error);
    
    // Check for specific error types
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      console.error('Status:', status);
      console.error('Error data:', JSON.stringify(errorData, null, 2));
      
      if (status === 401 || status === 403) {
        if (errorData?.errors?.[0]?.message?.includes('unauthorized origin')) {
          console.error('Unauthorized origin error. You need to register your application domain with Codex.io.');
          console.error('Please visit https://www.codex.io/ to register your domain in your API key settings.');
        } else if (errorData?.errors?.[0]?.message?.includes('API key was not found')) {
          console.error('Invalid API key. Please check your API key and make sure it is correct.');
        }
      }
    }
    
    return getMockSolanaTokens(); // Fallback to mock data if API fails
  }
}

/**
 * Get token details by contract address
 * @param address Token contract address
 * @returns Token details
 */
export async function getTokenDetails(address: string): Promise<CodexToken | null> {
  // If API key is not available, return mock data
  if (!isApiKeyAvailable) {
    console.log(`Codex API key not found. Using mock data for token ${address}.`);
    const mockTokens = getMockSolanaTokens();
    return mockTokens.find(token => token.contractAddress === address) || null;
  }
  
  try {
    console.log(`Fetching token details for ${address} from Codex.io...`);
    
    // Use GraphQL API to fetch token details
    const response = await codexGraphApi.post('', {
      query: `{
        token(
          input: {
            address: "${address}",
            networkId: 1399811149
          }
        ) {
          address
          name
          symbol
          price
          marketCap
          volume24h
          priceChange24h
        }
      }`
    });
    
    console.log('Response status:', response.status);
    
    if (response.data.data?.token) {
      const item = response.data.data.token;
      return {
        id: item.address,
        name: item.name,
        symbol: item.symbol,
        price: item.price,
        marketCap: item.marketCap,
        priceChange24h: item.priceChange24h,
        volume24h: item.volume24h,
        contractAddress: item.address,
        network: 'solana',
        description: `${item.name} (${item.symbol}) token on Solana blockchain.`
      };
    } else if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      return null;
    }
    
    console.log('No token found in response');
    return null;
  } catch (error) {
    console.error(`Error fetching token details for ${address}:`, error);
    
    // Check for specific error types
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      console.error('Status:', status);
      console.error('Error data:', JSON.stringify(errorData, null, 2));
      
      if (status === 401 || status === 403) {
        if (errorData?.errors?.[0]?.message?.includes('unauthorized origin')) {
          console.error('Unauthorized origin error. You need to register your application domain with Codex.io.');
          console.error('Please visit https://www.codex.io/ to register your domain in your API key settings.');
        } else if (errorData?.errors?.[0]?.message?.includes('API key was not found')) {
          console.error('Invalid API key. Please check your API key and make sure it is correct.');
        }
      }
    }
    
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