// Test script for codexService
require('dotenv').config({ path: '.env.local' });

const axios = require('axios');

// Log the API key (first few characters only for security)
const apiKey = process.env.NEXT_PUBLIC_CODEX_API_KEY || '';
console.log(`API Key (first 5 chars): ${apiKey.substring(0, 5)}...`);

// Create axios instance with default headers
const codexApi = axios.create({
  baseURL: 'https://api.codex.io',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
});

// Test GraphQL endpoint
async function testGraphQL() {
  try {
    const response = await axios.post('https://graph.codex.io/graphql', 
      { query: '{ getNetworks { name, id } }' },
      { 
        headers: { 
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        } 
      }
    );
    
    console.log('GraphQL Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('GraphQL Error:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Test REST API endpoint
async function testRestAPI() {
  try {
    // Try a simple endpoint - this is a placeholder, replace with actual endpoint
    const response = await codexApi.get('/tokens', {
      params: {
        network: 'solana',
        limit: 5
      }
    });
    
    console.log('REST API Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('REST API Error:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Run tests
async function runTests() {
  console.log('Testing Codex.io API...');
  
  console.log('\n1. Testing GraphQL API:');
  await testGraphQL();
  
  console.log('\n2. Testing REST API:');
  await testRestAPI();
  
  console.log('\nTests completed.');
}

runTests(); 