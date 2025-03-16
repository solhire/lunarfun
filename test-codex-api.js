const axios = require('axios');

// Your Codex.io API key
const CODEX_API_KEY = '22c98e492fc97424434dcb07700b8704ec4276c1';
const CODEX_GRAPH_URL = 'https://graph.codex.io/graphql';

// Create GraphQL axios instance
const codexGraphApi = axios.create({
  baseURL: CODEX_GRAPH_URL,
  headers: {
    'Authorization': CODEX_API_KEY,
    'Content-Type': 'application/json',
    'Origin': 'https://yums.fun'
  }
});

// Function to fetch trending Solana tokens
async function getTrendingSolanaTokens(limit = 10) {
  try {
    console.log('Fetching trending Solana tokens...');
    
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
          items {
            address
            name
            symbol
            price
            marketCap
            volume24h
            priceChange24h
          }
        }
      }`
    });
    
    console.log('Response status:', response.status);
    
    if (response.data.data?.filterTokens?.items) {
      const tokens = response.data.data.filterTokens.items;
      console.log(`Found ${tokens.length} trending Solana tokens:`);
      
      tokens.forEach((token, index) => {
        console.log(`${index + 1}. ${token.name} (${token.symbol}) - $${token.price}`);
      });
      
      return tokens;
    } else if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      return [];
    }
    
    console.log('No tokens found in response');
    return [];
  } catch (error) {
    console.error('Error fetching trending Solana tokens:');
    
    if (axios.isAxiosError(error) && error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error);
    }
    
    return [];
  }
}

// Execute the function
getTrendingSolanaTokens()
  .then(() => console.log('Test completed'))
  .catch(err => console.error('Unhandled error:', err)); 