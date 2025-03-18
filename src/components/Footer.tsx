'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this to your API
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
    
    // Reset the subscribed message after 3 seconds
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };
  
  return (
    <footer className="bg-navy-800/30 border-t border-navy-700/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                Yums.fun
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              Explore the Solana ecosystem with Yums.fun. Discover trending tokens, launch your own projects, and stay updated with real-time notifications.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/explore" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Explore Tokens
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Launch Token
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <a 
                  href="https://docs.yums.fun" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Documentation
                </a>
              </li>
              <li>
                <Link href="/status" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Newsletter</h3>
            <p className="mt-4 text-sm text-gray-400">
              Stay updated with the latest token launches and platform updates.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-navy-700 border border-navy-600 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white font-medium rounded-lg px-3 py-2 text-sm transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-primary animate-pulse">
                  Thanks for subscribing!
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-navy-700/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Yums.fun. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-gray-500">
              Built with 💜 on Solana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 