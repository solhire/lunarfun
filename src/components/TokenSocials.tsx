interface TokenSocialsProps {
  tokenSymbol: string;
}

export default function TokenSocials({ tokenSymbol }: TokenSocialsProps) {
  // Mock social links for different tokens
  const socialLinks: Record<string, {
    website?: string;
    twitter?: string;
    telegram?: string;
    github?: string;
  }> = {
    'BWIRT': {
      website: 'https://bwirt.io',
      twitter: 'https://twitter.com/lunaradotfun',
      telegram: 'https://t.me/bwirt_community',
    },
    'JUP': {
      website: 'https://jup.ag',
      twitter: 'https://twitter.com/lunaradotfun',
      github: 'https://github.com/jup-ag',
    },
    'FANCE': {
      website: 'https://fatvance.io',
      twitter: 'https://twitter.com/lunaradotfun',
      telegram: 'https://t.me/fatvance_community',
    },
    'DEFAULT': {
      twitter: 'https://twitter.com/lunaradotfun',
      website: 'https://solana.com',
    }
  };
  
  // Get links or use default
  const links = socialLinks[tokenSymbol] || socialLinks['DEFAULT'];
  
  return (
    <div className="space-y-3">
      {links.website && (
        <a 
          href={links.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-2 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span>Website</span>
        </a>
      )}
      
      {links.twitter && (
        <a 
          href={links.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-2 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
          <span>Twitter</span>
        </a>
      )}
      
      {links.telegram && (
        <a 
          href={links.telegram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-2 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          <span>Telegram</span>
        </a>
      )}
      
      {links.github && (
        <a 
          href={links.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-2 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span>GitHub</span>
        </a>
      )}
      
      {/* Explorer Link */}
      <a 
        href={`https://solscan.io/token/${tokenSymbol === 'SOL' ? 'So11111111111111111111111111111111111111112' : '9XyPJ7WsYsQF3hGrFqgMrL9LGy7nKeDVM5L3F9WvVJjZ'}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center p-2 bg-navy-700 rounded-lg hover:bg-navy-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        <span>View on Explorer</span>
      </a>
    </div>
  );
} 