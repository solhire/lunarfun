const WebSocket = require('ws');

// API key from environment
const CODEX_API_KEY = '22c98e492fc97424434dcb07700b8704ec4276c1';
const CODEX_WS_URL = 'wss://graph.codex.io/graphql';

console.log('Connecting to Codex.io GraphQL websocket...');

// Create WebSocket connection with the graphql-transport-ws subprotocol
const ws = new WebSocket(CODEX_WS_URL, 'graphql-transport-ws');

// Connection opened
ws.on('open', function() {
  console.log('Connected to Codex.io websocket');
  
  // Subscribe to latest pairs (new tokens)
  const subscriptionId = 'latest_pairs_subscription';
  
  // Send connection initialization message
  ws.send(JSON.stringify({
    type: 'connection_init',
    payload: {
      headers: {
        Authorization: CODEX_API_KEY,
        Origin: 'https://yums.fun'
      }
    }
  }));
  
  // Wait for connection acknowledgment before subscribing
  setTimeout(() => {
    console.log('Subscribing to latest pairs...');
    
    ws.send(JSON.stringify({
      id: subscriptionId,
      type: 'subscribe',
      payload: {
        query: `subscription OnLatestPairsUpdated($networkFilter: [Int!]) {
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
            liquidityToken
            nonLiquidityToken
          }
        }`,
        variables: {
          networkFilter: [1399811149] // Solana network ID
        },
        operationName: 'OnLatestPairsUpdated'
      }
    }));
  }, 1000);
  
  // Set a timeout to close the connection after 30 seconds
  setTimeout(() => {
    console.log('Unsubscribing...');
    ws.send(JSON.stringify({
      type: 'complete',
      id: subscriptionId
    }));
    
    setTimeout(() => {
      console.log('Closing connection...');
      ws.close();
    }, 1000);
  }, 30000);
});

// Listen for messages
ws.on('message', function(data) {
  try {
    const message = JSON.parse(data);
    console.log('Received message type:', message.type);
    
    if (message.type === 'connection_ack') {
      console.log('Connection acknowledged');
    } else if (message.type === 'next' && message.payload) {
      console.log('Received data:', JSON.stringify(message.payload, null, 2));
      
      // Process the new token data
      if (message.payload.data && message.payload.data.onLatestPairsUpdated) {
        const pairData = message.payload.data.onLatestPairsUpdated;
        console.log('New pair detected:');
        console.log(`Network: ${pairData.networkId}`);
        console.log(`Pair Address: ${pairData.address}`);
        console.log(`Token0: ${pairData.token0.name} (${pairData.token0.symbol})`);
        console.log(`Token1: ${pairData.token1.name} (${pairData.token1.symbol})`);
        console.log(`New Token: ${pairData.newToken}`);
        console.log(`Price USD: ${pairData.priceUsd}`);
        console.log('-----------------------------------');
      }
    } else if (message.type === 'error') {
      console.error('Subscription error:', message.payload);
    } else if (message.type === 'complete') {
      console.log('Subscription completed');
    }
  } catch (error) {
    console.error('Error parsing message:', error);
    console.log('Raw message:', data.toString());
  }
});

// Handle errors
ws.on('error', function(error) {
  console.error('WebSocket error:', error);
});

// Connection closed
ws.on('close', function(code, reason) {
  console.log(`Connection closed: ${code} - ${reason}`);
}); 