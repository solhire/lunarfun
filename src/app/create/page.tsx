'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';

export default function CreatePage() {
  const router = useRouter();
  const { connected } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    supply: '',
    logo: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or token page
      router.push('/token/bwirt');
    } catch (error) {
      console.error('Error creating token:', error);
      alert('Failed to create token. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!connected) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <h1 className="text-3xl font-bold text-center mb-8">Create Token</h1>
          
          <div className="bg-navy-600 rounded-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-navy-400/30 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
              <p className="text-gray-300 mb-6">
                Connect your wallet to create a new token on Solana.
              </p>
              <button className="px-6 py-3 bg-primary text-navy-700 rounded-full font-medium hover:bg-primary-400 transition-all hover:shadow-md">
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
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Create Token</h1>
        
        <div className="bg-navy-600 rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Token Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                placeholder="e.g. My Awesome Token"
              />
            </div>
            
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-gray-300 mb-1">
                Token Symbol*
              </label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                maxLength={10}
                className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white uppercase"
                placeholder="e.g. MAT"
              />
              <p className="mt-1 text-xs text-gray-400">Maximum 10 characters</p>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                placeholder="Describe your token and its purpose"
              />
            </div>
            
            <div>
              <label htmlFor="supply" className="block text-sm font-medium text-gray-300 mb-1">
                Total Supply*
              </label>
              <input
                type="number"
                id="supply"
                name="supply"
                value={formData.supply}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                placeholder="e.g. 1000000"
              />
            </div>
            
            <div>
              <label htmlFor="logo" className="block text-sm font-medium text-gray-300 mb-1">
                Token Logo
              </label>
              <div className="flex items-center space-x-4">
                {formData.logo ? (
                  <div className="h-16 w-16 rounded-full bg-navy-400 flex items-center justify-center overflow-hidden">
                    <img 
                      src={URL.createObjectURL(formData.logo)} 
                      alt="Token logo preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-navy-400 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="logo"
                    className="inline-block px-4 py-2 bg-navy-500 text-white rounded-lg cursor-pointer hover:bg-navy-400 transition-colors"
                  >
                    Choose File
                  </label>
                  <p className="mt-1 text-xs text-gray-400">Recommended: 512x512px PNG or JPG</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-navy-500">
              <h3 className="text-lg font-medium mb-4">Advanced Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mintable"
                    className="h-4 w-4 text-primary focus:ring-primary border-navy-500 rounded bg-navy-700"
                  />
                  <label htmlFor="mintable" className="ml-2 block text-sm text-gray-300">
                    Mintable (can create more tokens later)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="burnable"
                    className="h-4 w-4 text-primary focus:ring-primary border-navy-500 rounded bg-navy-700"
                  />
                  <label htmlFor="burnable" className="ml-2 block text-sm text-gray-300">
                    Burnable (can destroy tokens)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="transferable"
                    className="h-4 w-4 text-primary focus:ring-primary border-navy-500 rounded bg-navy-700"
                    defaultChecked
                  />
                  <label htmlFor="transferable" className="ml-2 block text-sm text-gray-300">
                    Transferable (can be sent between wallets)
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-navy-700 rounded-lg font-medium hover:bg-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-navy-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Token...
                  </span>
                ) : (
                  'Create Token'
                )}
              </button>
              <p className="mt-4 text-xs text-gray-400 text-center">
                Note: Creating a token requires a small amount of SOL for transaction fees.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 