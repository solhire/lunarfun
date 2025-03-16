import { TokenInfo } from '@/services/tokenDiscovery';

interface TokenStatsProps {
  token: TokenInfo;
}

export default function TokenStats({ token }: TokenStatsProps) {
  // Format currency values
  const formatCurrency = (value: number) => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  // Format time since creation
  const getTimeSinceCreation = (timestamp: number) => {
    const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Market Cap</p>
          <p className="font-medium">{formatCurrency(token.marketCap)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">24h Volume</p>
          <p className="font-medium">{formatCurrency(token.volume24h)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Liquidity</p>
          <p className="font-medium">{formatCurrency(token.liquidity)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">24h Change</p>
          <p className={`font-medium ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="pt-2 border-t border-navy-500">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Created</p>
            <p className="font-medium">{getTimeSinceCreation(token.createdAt)}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Decimals</p>
            <p className="font-medium">{token.decimals}</p>
          </div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-navy-500">
        <p className="text-gray-400 text-sm mb-1">Token Address</p>
        <div className="bg-navy-700 p-2 rounded-lg text-xs font-mono break-all">
          {token.address}
        </div>
      </div>
    </div>
  );
} 