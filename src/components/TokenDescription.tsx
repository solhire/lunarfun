interface TokenDescriptionProps {
  tokenSymbol: string;
}

export default function TokenDescription({ tokenSymbol }: TokenDescriptionProps) {
  // Mock descriptions for different tokens
  const descriptions: Record<string, string> = {
    'BWIRT': 'BWIRT is a community-driven meme token on the Solana blockchain. It aims to create a vibrant ecosystem with strong community governance and innovative DeFi features. The token has gained popularity for its unique branding and active community engagement.',
    'JUP': 'Jupiter is the key liquidity aggregator for Solana, providing the best swap routes across all Solana exchanges. The JUP token is used for governance, fee sharing, and staking within the Jupiter ecosystem.',
    'FANCE': 'FAT VANCE is a meme token inspired by internet culture and crypto humor. It has quickly gained a following for its creative marketing and community-focused approach.',
    'USDC': 'USD Coin (USDC) is a fully-collateralized US dollar stablecoin. USDC is issued by regulated financial institutions and backed by fully reserved assets.',
    'SOL': 'SOL is the native token of the Solana blockchain, used for paying transaction fees and staking. Solana is known for its high throughput and low transaction costs.',
    'DEFAULT': 'This token is part of the Solana ecosystem. Limited information is available at this time.'
  };
  
  // Get description or use default
  const description = descriptions[tokenSymbol] || descriptions['DEFAULT'];
  
  return (
    <div className="space-y-4">
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
      
      {/* Key Features */}
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">Key Features</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Built on the Solana blockchain for fast and low-cost transactions</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Community-driven development and governance</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary mr-2">•</span>
            <span>Active trading on multiple decentralized exchanges</span>
          </li>
          {tokenSymbol === 'BWIRT' && (
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Unique tokenomics with deflationary mechanisms</span>
            </li>
          )}
          {tokenSymbol === 'JUP' && (
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Governance rights over the Jupiter protocol</span>
            </li>
          )}
        </ul>
      </div>
      
      {/* Disclaimer */}
      <div className="pt-4 text-xs text-gray-400 border-t border-navy-500">
        <p className="italic">
          Disclaimer: This information is provided for educational purposes only and should not be considered financial advice. 
          Always do your own research before investing in any cryptocurrency.
        </p>
      </div>
    </div>
  );
} 