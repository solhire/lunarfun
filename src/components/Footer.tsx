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
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                Yums.fun
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              Explore the Solana ecosystem with Yums.fun. Discover trending tokens, launch your own projects, and stay updated with real-time notifications.
            </p>
            
            {/* Social Media Links */}
            <div className="mt-4 flex space-x-4">
              <a 
                href="https://twitter.com/yumsfun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://discord.gg/yumsfun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="Discord"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.28a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.28.077.077 0 0 0-.079-.036 19.467 19.467 0 0 0-4.885 1.49.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.611 19.611 0 0 0 5.919 2.98.078.078 0 0 0 .084-.028 13.9 13.9 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 12.914 12.914 0 0 1-1.84-.878.077.077 0 0 1-.008-.128 10.93 10.93 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.84 12.84 0 0 1-1.841.879.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.57 19.57 0 0 0 5.92-2.98.078.078 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/yumsfun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="Telegram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.813 8.39c-.135.607-.499.76-.995.473l-2.695-1.981-1.307 1.256c-.145.145-.264.264-.541.264l.191-2.707 4.937-4.45c.215-.191-.047-.296-.322-.105l-6.1 3.829-2.635-.824c-.571-.175-.608-.571.127-.842l10.224-3.95c.475-.165.901.097.73.647z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/yumsfun" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
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
                  className="bg-primary hover:bg-primary-light text-navy-800 font-medium rounded-lg px-3 py-2 text-sm transition-all duration-300"
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