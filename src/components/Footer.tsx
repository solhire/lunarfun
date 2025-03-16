import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-800/30 border-t border-navy-700/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light">
                Yums.fun
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              Explore the Solana ecosystem with Yums.fun. Discover trending tokens, launch your own projects, and stay updated with real-time notifications.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/tokens" className="text-gray-400 hover:text-white text-sm">
                  Tokens
                </Link>
              </li>
              <li>
                <Link href="/launchpad" className="text-gray-400 hover:text-white text-sm">
                  Launchpad
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-white text-sm">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://twitter.com/yumsfun" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.gg/yumsfun" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://github.com/yumsfun" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-navy-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Yums.fun. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 