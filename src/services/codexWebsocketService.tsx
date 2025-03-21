'use client';

import { useEffect, useState } from 'react';
import { CodexToken } from './codexService';

// WebSocket connection status
export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

// New token event handler type
export type NewTokenEventHandler = (token: CodexToken) => void;

// Websocket connection options
interface WebSocketOptions {
  onNewToken?: NewTokenEventHandler;
  onStatusChange?: (status: WebSocketStatus) => void;
}

/**
 * Hook to connect to Codex.io websocket for real-time token updates
 * @param options WebSocket connection options
 * @returns Current connection status and connection control functions
 */
export function useCodexWebsocket(options?: WebSocketOptions) {
  const [status, setStatus] = useState<WebSocketStatus>('disconnected');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  
  // Update status and notify callback if provided
  const updateStatus = (newStatus: WebSocketStatus) => {
    setStatus(newStatus);
    options?.onStatusChange?.(newStatus);
  };
  
  // Connect to the websocket
  const connect = () => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    if (socket) {
      // Already connected or connecting
      return;
    }
    
    try {
      updateStatus('connecting');
      
      // Get API key from environment variables
      const CODEX_API_KEY = process.env.NEXT_PUBLIC_CODEX_API_KEY || '';
      
      // Check if API key is available
      if (!CODEX_API_KEY || CODEX_API_KEY === 'your_codex_api_key_here') {
        console.error('Codex API key not found. Websocket connection aborted.');
        updateStatus('error');
        return;
      }
      
      // Create WebSocket connection
      const ws = new WebSocket('wss://graph.codex.io/graphql', 'graphql-transport-ws');
      setSocket(ws);
      
      // Connection opened
      ws.onopen = () => {
        console.log('Connected to Codex.io websocket');
        
        // Send connection initialization message
        ws.send(JSON.stringify({
          type: 'connection_init',
          payload: {
            headers: {
              Authorization: CODEX_API_KEY,
              Origin: 'https://lunara.fun'
            }
          }
        }));
        
        // Wait for connection acknowledgment before subscribing
        setTimeout(() => {
          // Subscribe to latest pairs for Solana
          const subscriptionId = 'latest_solana_pairs';
          
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
                }
              }`,
              variables: {
                networkFilter: [1399811149] // Solana network ID
              },
              operationName: 'OnLatestPairsUpdated'
            }
          }));
          
          updateStatus('connected');
        }, 1000);
      };
      
      // Listen for messages
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          if (message.type === 'next' && message.payload?.data?.onLatestPairsUpdated) {
            const pairData = message.payload.data.onLatestPairsUpdated;
            const newTokenKey = pairData.newToken; // 'token0' or 'token1'
            const newTokenData = pairData[newTokenKey];
            
            if (newTokenData) {
              // Create a CodexToken object from the new token data
              const token: CodexToken = {
                id: newTokenData.address,
                name: newTokenData.name,
                symbol: newTokenData.symbol,
                price: parseFloat(pairData.priceUsd),
                contractAddress: newTokenData.address,
                network: 'solana',
                description: `${newTokenData.name} (${newTokenData.symbol}) token on Solana blockchain.`
              };
              
              // Notify the callback if provided
              options?.onNewToken?.(token);
            }
          } else if (message.type === 'error') {
            console.error('Subscription error:', message.payload);
            updateStatus('error');
          }
        } catch (error) {
          console.error('Error parsing websocket message:', error);
        }
      };
      
      // Handle errors
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        updateStatus('error');
      };
      
      // Connection closed
      ws.onclose = () => {
        console.log('Disconnected from Codex.io websocket');
        setSocket(null);
        updateStatus('disconnected');
      };
    } catch (error) {
      console.error('Error connecting to Codex.io websocket:', error);
      updateStatus('error');
    }
  };
  
  // Disconnect from the websocket
  const disconnect = () => {
    if (socket) {
      socket.close();
      setSocket(null);
      updateStatus('disconnected');
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);
  
  return {
    status,
    connect,
    disconnect,
    isConnected: status === 'connected'
  };
}

/**
 * Component to display real-time new token notifications
 */
export function NewTokenNotifications() {
  const [newTokens, setNewTokens] = useState<CodexToken[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<WebSocketStatus>('disconnected');
  
  const { status, connect, disconnect } = useCodexWebsocket({
    onNewToken: (token) => {
      // Add the new token to the list
      setNewTokens((prev) => [token, ...prev].slice(0, 5)); // Keep only the 5 most recent
      
      // Show notification
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    },
    onStatusChange: setConnectionStatus
  });
  
  // Connect to websocket on component mount
  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      connect();
    }
    
    // Disconnect on unmount
    return () => {
      disconnect();
    };
  }, []);
  
  if (newTokens.length === 0) {
    return null;
  }
  
  return (
    <div className={`fixed bottom-4 right-4 transition-all duration-300 ${showNotification ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="bg-navy-600/90 backdrop-blur-sm rounded-xl p-4 border border-primary/30 shadow-lg max-w-sm">
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          <h3 className="font-bold text-primary">New Token Detected</h3>
        </div>
        
        <div className="text-sm">
          <p className="mb-1">{newTokens[0].name} ({newTokens[0].symbol})</p>
          <p className="text-xs text-gray-400">Price: ${newTokens[0].price?.toFixed(6) || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default NewTokenNotifications; 