import { useState } from 'react';
import { TokenInfo } from '@/services/tokenDiscovery';

interface TokenActionsProps {
  token: TokenInfo;
  isInWatchlist: boolean;
  onToggleWatchlist: () => void;
  connected: boolean;
}

export default function TokenActions({ token, isInWatchlist, onToggleWatchlist, connected }: TokenActionsProps) {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  
  // Calculate token amount based on SOL input
  const calculateTokenAmount = (solAmount: string) => {
    const sol = parseFloat(solAmount) || 0;
    // Mock price calculation (1 SOL = X tokens)
    const tokenPerSol = 1 / token.price;
    return (sol * tokenPerSol).toFixed(token.price < 0.001 ? 6 : 2);
  };
  
  // Calculate SOL amount based on token input
  const calculateSolAmount = (tokenAmount: string) => {
    const amount = parseFloat(tokenAmount) || 0;
    // Mock price calculation (X tokens = 1 SOL)
    return (amount * token.price).toFixed(4);
  };
  
  const handleBuyAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyAmount(e.target.value);
  };
  
  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellAmount(e.target.value);
  };
  
  if (!connected) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-300 mb-4">Connect your wallet to trade {token.symbol}</p>
        <button className="w-full px-4 py-3 bg-primary text-navy-700 rounded-lg font-medium hover:bg-primary-400 transition-all">
          Connect Wallet
        </button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-navy-500 mb-4">
        <button
          className={`flex-1 px-4 py-2 text-center font-medium text-sm transition-colors ${
            activeTab === 'buy'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button
          className={`flex-1 px-4 py-2 text-center font-medium text-sm transition-colors ${
            activeTab === 'sell'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </button>
      </div>
      
      {/* Buy Form */}
      {activeTab === 'buy' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="buyAmount" className="block text-sm font-medium text-gray-300 mb-1">
              Amount (SOL)
            </label>
            <input
              type="number"
              id="buyAmount"
              value={buyAmount}
              onChange={handleBuyAmountChange}
              className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
              placeholder="0.0"
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">You will receive:</span>
            <span className="font-medium">{calculateTokenAmount(buyAmount)} {token.symbol}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price Impact:</span>
            <span className="text-green-500">~0.05%</span>
          </div>
          
          <button
            className="w-full px-4 py-3 bg-primary text-navy-700 rounded-lg font-medium hover:bg-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!buyAmount || parseFloat(buyAmount) <= 0}
          >
            Buy {token.symbol}
          </button>
        </div>
      )}
      
      {/* Sell Form */}
      {activeTab === 'sell' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="sellAmount" className="block text-sm font-medium text-gray-300 mb-1">
              Amount ({token.symbol})
            </label>
            <input
              type="number"
              id="sellAmount"
              value={sellAmount}
              onChange={handleSellAmountChange}
              className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
              placeholder="0.0"
              min="0"
              step="1"
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">You will receive:</span>
            <span className="font-medium">{calculateSolAmount(sellAmount)} SOL</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price Impact:</span>
            <span className="text-green-500">~0.05%</span>
          </div>
          
          <button
            className="w-full px-4 py-3 bg-primary text-navy-700 rounded-lg font-medium hover:bg-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!sellAmount || parseFloat(sellAmount) <= 0}
          >
            Sell {token.symbol}
          </button>
        </div>
      )}
      
      {/* Additional Actions */}
      <div className="mt-6 pt-4 border-t border-navy-500 grid grid-cols-2 gap-3">
        <button
          onClick={onToggleWatchlist}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            isInWatchlist
              ? 'bg-navy-500 text-primary border border-primary'
              : 'bg-navy-700 text-gray-300 border border-navy-500 hover:border-gray-400'
          }`}
        >
          {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </button>
        
        <button className="px-4 py-2 bg-navy-700 text-gray-300 rounded-lg font-medium text-sm border border-navy-500 hover:border-gray-400 transition-colors">
          Share
        </button>
      </div>
    </div>
  );
} 