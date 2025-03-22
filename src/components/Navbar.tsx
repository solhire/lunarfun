'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletStatus from '@/components/WalletStatus';
import ClientWalletButton from '@/components/ClientWalletButton';
import ProfessionalLogo from '@/components/ProfessionalLogo';
import { motion, AnimatePresence } from 'framer-motion';

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

  const navLinks = [
    { href: '/', label: 'home', icon: '🏠' },
    { href: '/explore', label: 'explore', icon: '��' },
    { href: '/watchlist', label: 'watchlist', icon: '⭐' },
    { href: '/support', label: 'support', icon: '💫' }
  ];

  return (
    <>
      {/* Cosmic Alert Banner */}
      <div className="relative w-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30 animate-twinkle"></div>
        <div className="flex items-center justify-center px-4 py-2 relative">
          <div className="flex items-center text-sm font-medium space-x-2">
            <span className="text-primary">✧</span>
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">NOTICE:</span>
            <span className="text-white/90">Contract address will be announced first on</span>
            <a 
              href="https://x.com/lunarafun" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary-light transition-colors"
            >
              @lunarafun
            </a>
            <span className="text-primary">✧</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        ref={navbarRef}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-navy/80 backdrop-blur-xl border-b border-primary/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent-teal/20 to-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <ProfessionalLogo size={32} showText={false} autoAnimate={false} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wide">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent-teal">lunara</span>
                  <span className="text-white opacity-80">.fun</span>
                </span>
                <span className="text-xs text-white/50">cosmic innovation</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`group flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    activeLink === link.href 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-primary/5 text-white hover:text-primary'
                  }`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  <span className="text-sm">{link.icon}</span>
                  <span className="text-sm font-medium capitalize">{link.label}</span>
                  {activeLink === link.href && (
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary-light to-accent-teal rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary-light to-accent-teal rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Search, Wallet, Profile */}
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-navy-light/50 hover:bg-navy-light/70 rounded-full px-3 py-1.5 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-navy-light/90 relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-foreground-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="search" 
                className="bg-transparent border-none text-white text-sm focus:outline-none px-2 w-24 transition-all duration-300 focus:w-32 placeholder-foreground-secondary/50"
              />
              <span className="text-foreground-secondary/50 text-xs">⌘K</span>
            </div>

            {/* Wallet Status */}
            <div className="hidden md:block relative group">
              <WalletStatus />
            </div>

            {/* Connect Wallet Button */}
            <div className="hidden md:block">
              <ClientWalletButton />
            </div>

            {/* Profile Link */}
            <Link 
              href="/profile" 
              className="bg-navy-light/50 hover:bg-navy-light/70 text-white rounded-full p-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 relative group cosmic-glow"
              aria-label="Profile"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-1 focus:outline-none transition-transform duration-300 hover:scale-105 relative group cosmic-glow"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-navy-light/95 backdrop-blur-xl py-4 px-4 border-t border-primary/10 animate-slideIn">
            <nav className="flex flex-col space-y-4">
              {/* Mobile Logo */}
              <Link href="/" className="flex items-center mb-4 pb-3 border-b border-primary/10" onClick={() => setIsMenuOpen(false)}>
                <div className="mr-2">
                  <ProfessionalLogo size={20} showText={false} autoAnimate={false} />
                </div>
                <span className="text-base font-bold">
                  <span className="text-primary">lunara</span>
                  <span className="text-white">.fun</span>
                </span>
              </Link>
              
              {/* Mobile Wallet Status */}
              <div className="mb-2">
                <WalletStatus />
              </div>
              
              <Link 
                href="/" 
                className={`relative text-sm font-medium py-2 border-b border-primary/10 transition-colors ${
                  activeLink === '/' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/')}
              >
                Home
                <div className="h-0.5 w-full mt-1">
                  {activeLink === '/' && (
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded-full shadow-sm shadow-primary/50"></span>
                  )}
                </div>
              </Link>
              <Link 
                href="/explore" 
                className={`relative text-sm font-medium py-2 border-b border-primary/10 transition-colors ${
                  activeLink === '/explore' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/explore')}
              >
                Explore
                <div className="h-0.5 w-full mt-1">
                  {activeLink === '/explore' && (
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded-full shadow-sm shadow-primary/50"></span>
                  )}
                </div>
              </Link>
              <Link 
                href="/watchlist" 
                className={`relative text-sm font-medium py-2 border-b border-primary/10 transition-colors ${
                  activeLink === '/watchlist' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/watchlist')}
              >
                Watchlist
                <div className="h-0.5 w-full mt-1">
                  {activeLink === '/watchlist' && (
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded-full shadow-sm shadow-primary/50"></span>
                  )}
                </div>
              </Link>
              
              <Link 
                href="/support" 
                className={`relative text-sm font-medium py-2 border-b border-primary/10 transition-colors ${
                  activeLink === '/support' ? 'text-primary' : 'text-white hover:text-primary'
                }`}
                onClick={() => handleLinkClick('/support')}
              >
                Support
                <div className="h-0.5 w-full mt-1">
                  {activeLink === '/support' && (
                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-primary rounded-full shadow-sm shadow-primary/50"></span>
                  )}
                </div>
              </Link>
              
              <Link 
                href="/profile" 
                className={`text-sm font-medium py-2 border-t border-primary/10 transition-colors ${
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