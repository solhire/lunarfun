'use client';

import { useState } from 'react';
import TokenCreationForm from '@/components/TokenCreationForm';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';

export default function CreatePage() {
  const { connected } = useWallet();
  
  if (!connected) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <h1 className="text-3xl font-bold text-center mb-8">Create Token</h1>
          
          <div className="bg-black/80 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-gray-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-gray-300 mb-6">
                Connect your wallet to create a new token on Solana.
              </p>
              <button className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all hover:shadow-md">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:text-primary-light transition-colors">
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-8">Create Your Token</h1>
        
        <TokenCreationForm />
      </div>
    </main>
  );
} 