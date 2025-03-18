'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicTokens from '@/components/PublicTokens';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simple animation on load
    setIsLoaded(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-black">
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero section with call to action */}
        <section className="pt-28 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-30"></div>
            <div className="absolute top-40 right-1/3 w-6 h-6 rounded-full bg-primary/50 animate-float"></div>
            <div className="absolute top-60 left-1/3 w-4 h-4 rounded-full bg-primary/30 animate-float delay-300"></div>
            <div className="absolute bottom-20 right-1/4 w-5 h-5 rounded-full bg-primary/40 animate-float delay-200"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-primary">Launch your</span>{' '}
              <span className="text-white">Solana token</span>{' '}
              <span className="text-primary">in seconds</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              The easiest way to create, launch and trade memecoins on Solana with no code required
            </p>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/create" 
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-102 active:scale-98"
                >
                  <span className="relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-white transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Token
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-white transition-all duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  href="/explore" 
                  className="group inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:shadow-md"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Explore Tokens
                  </span>
                </Link>
              </div>
              <p className="text-gray-400 text-sm mt-4">No coding required • Takes less than 1 minute</p>
            </div>
          </div>
        </section>

        {/* Public tokens section */}
        <PublicTokens />

        {/* How it works section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Connect Wallet',
                  description: 'Connect your Solana wallet to get started with the token creation process.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  )
                },
                {
                  title: 'Create Token',
                  description: 'Fill in the token details including name, symbol, supply, and logo image.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: 'Launch & Trade',
                  description: 'Launch your token instantly and start trading on decentralized exchanges.',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )
                }
              ].map((step, index) => (
                <div key={index} className="bg-navy-500/30 rounded-2xl p-6 border border-navy-400/20 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="w-16 h-16 bg-navy-600/50 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/create" 
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <span className="flex items-center">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Platform stats */}
        <section className="py-16 bg-navy-500/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: '10,000+', label: 'Tokens Created' },
                { value: '$25M+', label: 'Total Value Locked' },
                { value: '50,000+', label: 'Active Users' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400 text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
