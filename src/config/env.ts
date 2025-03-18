// Mock environment variable handler that provides default values

// Safe environment variable getter that provides defaults
export const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Environment variable ${key} not found, using default value`);
    return getMockValue(key);
  }
  return value;
};

// Provide default values for common environment variables
function getMockValue(key: string): string {
  const mockValues: Record<string, string> = {
    NEXT_PUBLIC_FIREBASE_API_KEY: 'mock-api-key',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'mock-auth-domain',
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: 'https://mock-db.firebaseio.com',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'mock-project-id',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'mock-storage-bucket',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '123456789',
    NEXT_PUBLIC_FIREBASE_APP_ID: 'mock-app-id',
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: 'mock-measurement-id',
    NEXT_PUBLIC_SOLANA_NETWORK: 'mainnet-beta',
    NEXT_PUBLIC_CODEX_API_KEY: 'mock-codex-api-key',
  };

  return mockValues[key] || 'mock-value';
}

export const config = {
  firebase: {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY'),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    databaseURL: getEnvVar('NEXT_PUBLIC_FIREBASE_DATABASE_URL'),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID'),
    measurementId: getEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
  },
  solana: {
    network: getEnvVar('NEXT_PUBLIC_SOLANA_NETWORK'),
  },
  codex: {
    apiKey: getEnvVar('NEXT_PUBLIC_CODEX_API_KEY'),
  },
  tokenDiscovery: {
    interval: parseInt(getEnvVar('NEXT_PUBLIC_TOKEN_DISCOVERY_INTERVAL')),
    maxTokensToDisplay: parseInt(getEnvVar('NEXT_PUBLIC_MAX_TOKENS_TO_DISPLAY')),
    minLiquidityUsd: parseInt(getEnvVar('NEXT_PUBLIC_MIN_LIQUIDITY_USD')),
    enableAutoRefresh: getEnvVar('NEXT_PUBLIC_ENABLE_AUTO_REFRESH') === 'true',
  },
} as const; 