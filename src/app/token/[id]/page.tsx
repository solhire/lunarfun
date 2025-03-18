'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getTokenByIdFirestore } from '@/firebase/tokenService';
import LoadingIndicator from '@/components/LoadingIndicator';
import { Token } from '@/firebase/types';
import { Timestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function TokenPage() {
  const params = useParams();
  const router = useRouter();
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tokenId = params?.id as string;

  useEffect(() => {
    async function loadToken() {
      if (!tokenId) {
        setError('Invalid token ID');
        setLoading(false);
        return;
      }
      
      try {
        const fetchedToken = await getTokenByIdFirestore(tokenId);
        if (fetchedToken) {
          setToken(fetchedToken);
        } else {
          setError('Token not found');
        }
      } catch (err) {
        console.error('Error loading token:', err);
        setError('Failed to load token data');
      } finally {
        setLoading(false);
      }
    }

    loadToken();
  }, [tokenId]);

  const getFormattedDate = (timestamp: number | Date | Timestamp) => {
    if (typeof timestamp === 'object' && timestamp !== null) {
      if ('toMillis' in timestamp && typeof timestamp.toMillis === 'function') {
        return formatDistanceToNow(timestamp.toMillis(), { addSuffix: true });
      } else if (timestamp instanceof Date) {
        return formatDistanceToNow(timestamp, { addSuffix: true });
      }
    }
    return formatDistanceToNow(Number(timestamp), { addSuffix: true });
  };

  const formatMarketCap = (marketCap?: number) => {
    if (!marketCap) return 'N/A';
    if (marketCap >= 1000000000) return `$${(marketCap / 1000000000).toFixed(2)}B`;
    if (marketCap >= 1000000) return `$${(marketCap / 1000000).toFixed(2)}M`;
    if (marketCap >= 1000) return `$${(marketCap / 1000).toFixed(2)}K`;
    return `$${marketCap.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <LoadingIndicator message="Loading token information..." />
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
        <div className="text-center max-w-lg">
          <div className="mb-6 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Token Not Found</h1>
          <p className="text-gray-400 mb-6">
            {error || "We couldn't find the token you're looking for. It may have been removed or the ID is incorrect."}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => router.back()} 
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Go Back
            </button>
            <Link 
              href="/explore" 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Explore Tokens
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Token Overview */}
          <div className="md:col-span-2">
            <div className="bg-black/30 rounded-xl border border-gray-800 p-6 mb-8">
              <div className="flex items-center mb-6">
                {token.logo ? (
                  <div className="mr-4 relative">
                    <Image
                      src={token.logo}
                      alt={token.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/placeholder-token.svg`;
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold mr-4">
                    {token.symbol[0]}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{token.name}</h1>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-400">{token.symbol}</span>
                    <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
                      Created {getFormattedDate(token.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Market Cap</div>
                  <div className="text-xl font-medium">{formatMarketCap(token.marketCap)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Price Change (24h)</div>
                  <div className={`text-xl font-medium ${token.priceChange24h > 0 ? 'text-green-500' : token.priceChange24h < 0 ? 'text-red-500' : ''}`}>
                    {token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Initial Supply</div>
                  <div className="text-xl font-medium">{token.initialSupply?.toLocaleString() || 'N/A'}</div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-300">
                  {token.description || 'No description provided for this token.'}
                </p>
              </div>

              {token.contractAddress && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Contract Address</h2>
                  <div className="bg-black/40 p-3 rounded-lg font-mono text-sm break-all">
                    {token.contractAddress}
                  </div>
                </div>
              )}
            </div>

            {/* Token Actions */}
            <div className="bg-black/30 rounded-xl border border-gray-800 p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Token Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="#" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-center">
                  Buy Token
                </Link>
                <Link href="#" className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center">
                  View Chart
                </Link>
              </div>
            </div>
          </div>

          {/* Token Details & Creator Info */}
          <div>
            <div className="bg-black/30 rounded-xl border border-gray-800 p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Token Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Token Symbol</span>
                  <span className="font-medium">{token.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created At</span>
                  <span className="font-medium">{getFormattedDate(token.createdAt)}</span>
                </div>
                {token.taxFee !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax Fee</span>
                    <span className="font-medium">{token.taxFee}%</span>
                  </div>
                )}
                {token.replies !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Community Activity</span>
                    <span className="font-medium">{token.replies} replies</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black/30 rounded-xl border border-gray-800 p-6">
              <h2 className="text-lg font-semibold mb-4">Creator Info</h2>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm mr-3">
                  {token.creatorAddress && token.creatorAddress.substring(0, 2)}
                </div>
                <div>
                  <div className="font-medium">Creator</div>
                  <div className="text-sm text-gray-400 break-all">{token.creatorAddress}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 