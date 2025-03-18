'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
  const [isConnected, setIsConnected] = useState(false);
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        
        {isConnected ? (
          <div className="bg-navy-600 rounded-xl p-8">
            {/* Connected Profile Content */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-32 h-32 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-1 bg-navy-700 rounded-full overflow-hidden">
                  <Image
                    src="/pfp.jpg"
                    alt="Profile picture"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/pfp.jpg';
                    }}
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Yums Trader</h2>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <span className="font-mono">0x1a2b...3c4d</span>
                      <button className="ml-2 text-primary hover:text-primary-light">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Verified</span>
                      <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">Creator</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button className="bg-navy-500 hover:bg-navy-400 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-navy-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-gray-400">Tokens Created</div>
                  </div>
                  <div className="bg-navy-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-gray-400">Tokens Owned</div>
                  </div>
                  <div className="bg-navy-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">$1.2K</div>
                    <div className="text-sm text-gray-400">Portfolio Value</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="border-b border-navy-500 mb-6">
                <div className="flex space-x-6">
                  <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium">
                    My Tokens
                  </button>
                  <button className="px-4 py-2 text-gray-400 hover:text-white">
                    Watchlist
                  </button>
                  <button className="px-4 py-2 text-gray-400 hover:text-white">
                    Activity
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Empty state */}
                <div className="col-span-full text-center py-12">
                  <div className="inline-block p-4 rounded-full bg-navy-500/50 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">No tokens yet</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    You haven't created or acquired any tokens yet. Get started by creating your first token or exploring the marketplace.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/create" 
                      className="px-6 py-2 bg-primary text-navy-700 rounded-full font-medium hover:bg-primary-light transition-colors"
                    >
                      Create Token
                    </Link>
                    <Link 
                      href="/explore" 
                      className="px-6 py-2 bg-navy-500 text-white rounded-full font-medium hover:bg-navy-400 transition-colors"
                    >
                      Explore Marketplace
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-navy-600 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-navy-400/30 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-gray-300 mb-6">
                Connect your wallet to view your profile, tokens, and trading history.
              </p>
              <button 
                onClick={() => setIsConnected(true)}
                className="px-6 py-3 bg-primary text-navy-700 rounded-full font-medium hover:bg-primary-400 transition-all hover:shadow-md"
              >
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 