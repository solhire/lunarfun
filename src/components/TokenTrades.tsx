import { useState, useEffect } from 'react';

interface Trade {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  value: number;
  timestamp: number;
  wallet: string;
}

interface TokenTradesProps {
  tokenAddress: string;
}

export default function TokenTrades({ tokenAddress }: TokenTradesProps) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch trade data from an API
    const fetchTrades = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock trades
        const mockTrades: Trade[] = Array.from({ length: 10 }, (_, i) => {
          const type = Math.random() > 0.5 ? 'buy' : 'sell';
          const price = 0.00002345 + (Math.random() * 0.00000200 - 0.00000100);
          const amount = Math.floor(Math.random() * 10000000) + 100000;
          
          return {
            id: `trade-${i}`,
            type,
            amount,
            price,
            value: price * amount,
            timestamp: Date.now() - (i * 60000) - Math.floor(Math.random() * 300000),
            wallet: `${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 8)}`
          };
        });
        
        setTrades(mockTrades);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trades:', error);
        setLoading(false);
      }
    };
    
    fetchTrades();
  }, [tokenAddress]);
  
  // Format time since trade
  const getTimeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m ago`;
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)}h ago`;
    } else {
      return `${Math.floor(seconds / 86400)}d ago`;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (trades.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No recent trades found for this token.
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 text-sm">
            <th className="pb-2">Type</th>
            <th className="pb-2">Price</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Value</th>
            <th className="pb-2">Wallet</th>
            <th className="pb-2 text-right">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-500">
          {trades.map((trade) => (
            <tr key={trade.id} className="text-sm">
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  trade.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {trade.type === 'buy' ? 'Buy' : 'Sell'}
                </span>
              </td>
              <td className="py-3">${trade.price.toFixed(8)}</td>
              <td className="py-3">{trade.amount.toLocaleString()}</td>
              <td className="py-3">${trade.value.toFixed(2)}</td>
              <td className="py-3">
                <a 
                  href={`https://solscan.io/account/${trade.wallet}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {trade.wallet}
                </a>
              </td>
              <td className="py-3 text-right text-gray-400">{getTimeSince(trade.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 