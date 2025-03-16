'use client';

import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface WalletStatusProps {
  className?: string;
}

const WalletStatus: FC<WalletStatusProps> = ({ className = '' }) => {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      setIsLoading(true);
      try {
        const connection = new Connection(
          'https://api.mainnet-beta.solana.com',
          'confirmed'
        );
        
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
    const intervalId = setInterval(fetchBalance, 15000); // Refresh every 15 seconds
    
    return () => clearInterval(intervalId);
  }, [publicKey]);

  if (!connected) {
    return (
      <div className={`rounded-full bg-navy-400/50 px-3 py-1.5 text-xs text-gray-400 flex items-center ${className}`}>
        <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
        Not connected
      </div>
    );
  }

  return (
    <div className={`rounded-full bg-navy-400/50 px-3 py-1.5 text-xs flex items-center ${className}`}>
      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
      <span className="text-white mr-2 font-medium">
        {isLoading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          balance !== null ? `${balance.toFixed(2)} SOL` : '-- SOL'
        )}
      </span>
      <span className="text-gray-400 text-xs">
        {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
      </span>
    </div>
  );
};

export default WalletStatus; 