const WebSocket = require('ws');

// API key from environment
const CODEX_API_KEY = '22c98e492fc97424434dcb07700b8704ec4276c1';

// Function to test WebSocket connection
function testWebSocketConnection() {
  console.log('Testing WebSocket connection to Codex.io...');
  
  // Create WebSocket connection
  const ws = new WebSocket('wss://stream.codex.io', {
    headers: {
      'Authorization': CODEX_API_KEY,
      'Origin': 'https://yums.fun'
    }
  });
  
  // Connection opened
  ws.on('open', () => {
    console.log('WebSocket connection established!');
    
    // Subscribe to Solana token events
    const subscribeMessage = {
      type: 'subscribe',
      channel: 'token',
      params: {
        networkId: '1399811149' // Solana network ID
      }
    };
    
    ws.send(JSON.stringify(subscribeMessage));
    console.log('Subscribed to Solana token events');
    
    // Close connection after 10 seconds
    setTimeout(() => {
      console.log('Closing WebSocket connection after 10 seconds...');
      ws.close();
    }, 10000);
  });
  
  // Listen for messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('Received message:', JSON.stringify(message, null, 2));
    } catch (error) {
      console.error('Error parsing message:', error);
      console.log('Raw message:', data);
    }
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  
  // Connection closed
  ws.on('close', (code, reason) => {
    console.log(`WebSocket connection closed: ${code} - ${reason}`);
  });
}

// Run the test
testWebSocketConnection(); 