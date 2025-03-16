'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-navy-800/50 backdrop-blur-md border-b border-navy-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                Yums.fun
              </span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/tokens" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Tokens
              </Link>
              <Link href="/launchpad" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Launchpad
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Connect Wallet
            </button>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/tokens" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Tokens
            </Link>
            <Link href="/launchpad" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Launchpad
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-navy-700">
            <div className="px-2">
              <button className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 