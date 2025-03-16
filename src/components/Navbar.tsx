'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import HowItWorksModal from '@/components/HowItWorksModal';
import WalletStatus from '@/components/WalletStatus';
import ClientWalletButton from '@/components/ClientWalletButton';

export default function Navbar() {
  const { publicKey } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const navbarRef = useRef<HTMLElement>(null);
  
  // Format wallet address for display
  const formatWalletAddress = (address: string | null | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Set active link based on current path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveLink(window.location.pathname);
    }
  }, []);
  
  // Handle link click
  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Warning Banner */}
      <div className="w-full bg-yellow-400 text-black overflow-x-auto whitespace-nowrap scrollbar-hide shadow-md">
        <div className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold">NOTICE:</span> <span className="ml-1">Token creation is temporarily limited to ensure payment system stability. Contract Address (CA) will be posted exclusively on our X (Twitter) account. Thank you for your patience.</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        ref={navbarRef}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-navy-500/95 backdrop-blur-md shadow-lg' 
            : 'bg-navy-500'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-8 group" onClick={() => handleLinkClick('/')}>
              <div className="relative w-8 h-8 mr-2 transform transition-transform group-hover:scale-110">
                <div className="absolute inset-0 bg-primary rounded-full group-hover:animate-pulse"></div>
                <div className="absolute inset-1 bg-navy-500 rounded-full flex items-center justify-center text-primary font-bold">Y</div>
              </div>
              <div className="flex items-baseline">
                <span className="text-primary text-xl font-bold tracking-tight group-hover:text-primary-light transition-colors">yums</span>
                <span className="text-white text-xl font-bold tracking-tight group-hover:text-gray-200 transition-colors">.fun</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
                  activeLink === '/' 
                    ? 'text-primary' 
                    : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/')}
              >
                home
                {activeLink === '/' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <Link 
                href="/explore" 
                className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
                  activeLink === '/explore' 
                    ? 'text-primary' 
                    : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/explore')}
              >
                explore
                {activeLink === '/explore' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <Link 
                href="/roadmap" 
                className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
                  activeLink === '/roadmap' 
                    ? 'text-primary' 
                    : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/roadmap')}
              >
                roadmap
                {activeLink === '/roadmap' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <Link 
                href="/watchlist" 
                className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
                  activeLink === '/watchlist' 
                    ? 'text-primary' 
                    : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/watchlist')}
              >
                watchlist
                {activeLink === '/watchlist' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <div className="relative group">
                <HowItWorksModal 
                  buttonClassName={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                    activeLink === '/how-it-works' 
                      ? 'text-primary' 
                      : 'text-white hover:text-primary'
                  }`} 
                />
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>
              <Link 
                href="/support" 
                className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
                  activeLink === '/support' 
                    ? 'text-primary' 
                    : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/support')}
              >
                support
                {activeLink === '/support' && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                )}
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
            </div>
          </div>

          {/* Right: Search, Wallet, Profile */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-navy-400/70 hover:bg-navy-400/90 rounded-full px-3 py-1.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-navy-400 relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="search" 
                className="bg-transparent border-none text-white text-sm focus:outline-none px-2 w-24 transition-all duration-300 focus:w-32"
              />
              <span className="text-gray-500 text-xs">⌘K</span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </div>

            {/* Wallet Status */}
            <div className="hidden md:block relative group">
              <WalletStatus />
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </div>

            {/* Social Links */}
            <a 
              href="https://twitter.com/yumsdotfun" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden md:block bg-navy-400/70 hover:bg-navy-400/90 text-white rounded-full p-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative group"
              aria-label="Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>

            {/* Connect Wallet Button */}
            <div className="hidden md:block">
              <ClientWalletButton />
            </div>

            {/* Profile Link */}
            <Link 
              href="/profile" 
              className="bg-navy-400/70 hover:bg-navy-400/90 text-white rounded-full p-2 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 relative group"
              aria-label="Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-1 focus:outline-none transition-transform duration-300 hover:scale-105 relative group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy-400/95 backdrop-blur-md py-4 px-4 border-t border-navy-300/20 animate-slideIn">
            <nav className="flex flex-col space-y-4">
              {/* Mobile Wallet Status */}
              <div className="mb-2">
                <WalletStatus />
              </div>
              
              <Link 
                href="/" 
                className={`text-sm font-medium py-2 border-b border-navy-300/20 transition-colors ${
                  activeLink === '/' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/')}
              >
                Home
              </Link>
              <Link 
                href="/explore" 
                className={`text-sm font-medium py-2 border-b border-navy-300/20 transition-colors ${
                  activeLink === '/explore' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/explore')}
              >
                Explore
              </Link>
              <Link 
                href="/roadmap" 
                className={`text-sm font-medium py-2 border-b border-navy-300/20 transition-colors ${
                  activeLink === '/roadmap' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/roadmap')}
              >
                Roadmap
              </Link>
              <Link 
                href="/watchlist" 
                className={`text-sm font-medium py-2 border-b border-navy-300/20 transition-colors ${
                  activeLink === '/watchlist' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/watchlist')}
              >
                Watchlist
              </Link>
              <div 
                onClick={() => setIsMenuOpen(false)} 
                className={`py-2 border-b border-navy-300/20 transition-colors ${
                  activeLink === '/how-it-works' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
              >
                <HowItWorksModal buttonClassName="text-inherit bg-transparent w-full text-left" />
              </div>
              
              <Link 
                href="/support" 
                className={`text-sm font-medium py-2 transition-colors ${
                  activeLink === '/support' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/support')}
              >
                Support
              </Link>
              
              <Link 
                href="/profile" 
                className={`text-sm font-medium py-2 border-t border-navy-300/20 transition-colors ${
                  activeLink === '/profile' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/profile')}
              >
                Profile
              </Link>
              
              {/* Mobile Connect Wallet Button */}
              <div className="mt-2">
                <ClientWalletButton />
              </div>
            </nav>
          </div>
        )}
      </nav>
    </>
  );
} 