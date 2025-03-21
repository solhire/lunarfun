'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface FooterLinks {
  [category: string]: FooterLink[];
}

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

  const footerLinks: FooterLinks = {
    Platform: [
      { href: '/explore', label: 'Explore Tokens' },
      { href: '/create', label: 'Launch Token' }
    ]
  };
  
  return (
    <footer className="relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-800/30 to-navy-900/50">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30 animate-twinkle"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Branding & Description */}
            <div className="col-span-1 md:col-span-6">
              <Link href="/" className="group inline-flex items-center space-x-3">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-purple rounded-full animate-pulse-slow"></div>
                  <div className="absolute inset-1 bg-navy-900 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">L</span>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent-purple group-hover:to-accent-teal transition-all duration-500">
                    lunara
                  </span>
                  <span className="text-white/80">.fun</span>
                </span>
              </Link>
              <p className="mt-4 text-gray-400 max-w-md leading-relaxed">
                Embark on your cosmic journey through the Solana ecosystem. Create, discover, and trade tokens in a seamless, decentralized environment.
              </p>
            </div>

            {/* Newsletter Section */}
            <div className="col-span-1 md:col-span-6">
              <h3 className="text-white font-medium mb-4">Join the Cosmic Community</h3>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent-purple rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 bg-navy-800/50 border border-primary/10 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary hover:bg-primary-light text-navy-900 font-medium rounded-r-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      Join
                    </button>
                  </div>
                </div>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-primary"
                  >
                    Welcome to the cosmic community! 🌟
                  </motion.p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-primary/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm">
                  © {currentYear} Lunara.fun
                </p>
                <span className="text-primary/30">•</span>
                <p className="text-gray-400 text-sm">
                  Built with 💜 on Solana
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <a href="https://twitter.com/lunaradotfun" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://discord.gg/lunara" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
                  <span className="sr-only">Discord</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                <a href="https://github.com/solhire/lunarfun" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 