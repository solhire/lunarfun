'use client';

import { FC, useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  increment: number;
}

const PlatformStats: FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Tokens Created', value: 0, suffix: '+', increment: 1235 },
    { label: 'Total Volume', value: 0, prefix: '$', suffix: 'M+', increment: 42.5 },
    { label: 'Users', value: 0, suffix: 'K+', increment: 18.7 },
    { label: 'Transactions', value: 0, suffix: 'K+', increment: 155 }
  ]);
  
  useEffect(() => {
    // Animate the numbers counting up
    const interval = setInterval(() => {
      let allComplete = true;
      
      setStats(prevStats => 
        prevStats.map(stat => {
          // If we've reached the target value, don't increment further
          if (stat.value >= stat.increment) {
            return stat;
          }
          
          allComplete = false;
          const step = Math.max(1, Math.floor(stat.increment / 100));
          return {
            ...stat,
            value: Math.min(stat.value + step, stat.increment)
          };
        })
      );
      
      if (allComplete) {
        clearInterval(interval);
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-accent-purple/5 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Platform Stats</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join the fastest growing token launchpad on Solana
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="glass border border-primary/10 rounded-xl px-6 py-8 text-center transform transition-all duration-300 hover:scale-105 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex justify-center items-baseline mb-2">
                {stat.prefix && <span className="text-primary text-lg mr-1">{stat.prefix}</span>}
                <span className="text-4xl font-bold text-white">{stat.value.toLocaleString()}</span>
                {stat.suffix && <span className="text-primary text-lg ml-1">{stat.suffix}</span>}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats; 