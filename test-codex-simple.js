const axios = require('axios');

// Your Codex.io API key
const CODEX_API_KEY = '22c98e492fc97424434dcb07700b8704ec4276c1';

// Simple test to get networks
async function testGetNetworks() {
  try {
    console.log('Testing Codex.io API with simple networks query...');
    
    const response = await axios.post(
      'https://graph.codex.io/graphql',
      {
        query: `{
          getNetworks {
            name
            id
          }
        }`
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': CODEX_API_KEY,
          'Origin': 'https://yums.fun'
        }
      }
    );
    
    console.log('Response status:', response.status);
    
    if (response.data.data?.getNetworks) {
      const networks = response.data.data.getNetworks;
      console.log(`Found ${networks.length} networks:`);
      networks.forEach(network => {
        console.log(`- ${network.name} (ID: ${network.id})`);
      });
    } else if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
    }
  } catch (error) {
    console.error('Error testing Codex.io API:');
    
    if (axios.isAxiosError(error) && error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error);
    }
  }
}

// Run the test
testGetNetworks(); 