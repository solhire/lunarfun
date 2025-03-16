// Test script for Codex SDK
require('dotenv').config({ path: '.env.local' });

// First, we need to install the SDK
// npm install @codex-data/sdk

// Import the SDK
const { Codex } = require('@codex-data/sdk');

// Your Codex.io API key
const CODEX_API_KEY = '22c98e492fc97424434dcb07700b8704ec4276c1';

// Initialize the Codex client
const codex = new Codex(CODEX_API_KEY, {
  origin: 'https://yums.fun'
});

console.log('Initializing Codex.io client...');

// Test getting networks
async function testGetNetworks() {
  try {
    console.log('Fetching networks...');
    const result = await codex.send(`
      query GetNetworks {
        getNetworks { 
          id 
          name 
        }
      }
    `);
    
    if (result.data && result.data.getNetworks) {
      const networks = result.data.getNetworks;
      console.log('Networks:', networks.map(n => `${n.name} (${n.id})`).join(', '));
      
      // Find Solana network
      const solanaNetwork = networks.find(n => n.name.toLowerCase() === 'solana');
      if (solanaNetwork) {
        console.log(`Found Solana network with ID: ${solanaNetwork.id}`);
      } else {
        console.log('Solana network not found');
      }
      
      return networks;
    } else {
      console.log('No networks found in response');
      return [];
    }
  } catch (error) {
    console.error('Error fetching networks:', error);
    return [];
  }
}

// Test getting latest pairs
async function testGetLatestPairs() {
  try {
    console.log('Fetching latest pairs...');
    const result = await codex.send(`
      query GetLatestPairs {
        getLatestPairs(
          input: {
            networkFilter: [1399811149],
            limit: 5
          }
        ) {
          cursor
          items {
            id
            address
            networkId
            token0 {
              address
              name
              symbol
            }
            token1 {
              address
              name
              symbol
            }
            newToken
            oldToken
            priceUsd
          }
        }
      }
    `);
    
    if (result.data && result.data.getLatestPairs && result.data.getLatestPairs.items) {
      const latestPairs = result.data.getLatestPairs.items;
      console.log(`Found ${latestPairs.length} latest pairs:`);
      
      latestPairs.forEach((pair, index) => {
        console.log(`${index + 1}. Pair: ${pair.token0.symbol}/${pair.token1.symbol}`);
        console.log(`   New Token: ${pair.newToken === 'token0' ? pair.token0.symbol : pair.token1.symbol}`);
        console.log(`   Price: $${pair.priceUsd}`);
        console.log(`   Network: ${pair.networkId}`);
        console.log('-----------------------------------');
      });
      
      return latestPairs;
    } else {
      console.log('No latest pairs found in response');
      return [];
    }
  } catch (error) {
    console.error('Error fetching latest pairs:', error);
    return [];
  }
}

// Test subscribing to latest pairs updates
async function testSubscribeToLatestPairs() {
  try {
    console.log('Subscribing to latest pairs updates...');
    
    // Subscribe to latest pairs updates for Solana
    const subscription = codex.subscribe(`
      subscription OnLatestPairsUpdated($networkFilter: [Int!]) {
        onLatestPairsUpdated(networkFilter: $networkFilter) {
          id
          address
          networkId
          token0 {
            address
            name
            symbol
          }
          token1 {
            address
            name
            symbol
          }
          newToken
          oldToken
          priceUsd
        }
      }
    `, 
    {
      networkFilter: [1399811149] // Solana network ID
    },
    (result) => {
      if (result.data && result.data.onLatestPairsUpdated) {
        const pairData = result.data.onLatestPairsUpdated;
        console.log('New pair detected:');
        console.log(`Network: ${pairData.networkId}`);
        console.log(`Pair Address: ${pairData.address}`);
        console.log(`Token0: ${pairData.token0.name} (${pairData.token0.symbol})`);
        console.log(`Token1: ${pairData.token1.name} (${pairData.token1.symbol})`);
        console.log(`New Token: ${pairData.newToken === 'token0' ? pairData.token0.symbol : pairData.token1.symbol}`);
        console.log(`Price USD: ${pairData.priceUsd}`);
        console.log('-----------------------------------');
      } else if (result.errors) {
        console.error('Subscription error:', result.errors);
      }
    });
    
    console.log('Subscription active. Waiting for updates for 30 seconds...');
    
    // Keep the subscription active for 30 seconds
    setTimeout(() => {
      console.log('Unsubscribing...');
      subscription.unsubscribe();
      console.log('Test completed');
    }, 30000);
    
    return true;
  } catch (error) {
    console.error('Error subscribing to latest pairs:', error);
    return false;
  }
}

// Run the tests
async function runTests() {
  await testGetNetworks();
  await testGetLatestPairs();
  await testSubscribeToLatestPairs();
}

runTests().catch(error => {
  console.error('Unhandled error:', error);
}); 