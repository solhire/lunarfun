'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProfessionalLogo from '@/components/ProfessionalLogo';
import ClientWalletButton from '@/components/ClientWalletButton';

export default function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: '🚀',
      title: 'Launch Tokens',
      description: 'Create and launch your cosmic tokens with advanced customization options'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Experience instant transactions with minimal gas fees'
    },
    {
      icon: '🛡️',
      title: 'Maximum Security',
      description: 'Advanced security measures to protect your cosmic assets'
    }
  ];

  const stats = [
    { value: '150K+', label: 'Active Users' },
    { value: '$2.5M+', label: 'Total Volume' },
    { value: '45K+', label: 'Tokens Created' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <main className="min-h-screen bg-navy relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            animate={{
              y: ['0vh', '100vh'],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <ProfessionalLogo size={120} showText={false} />
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent-teal"
              {...fadeIn}
            >
              Explore the Cosmic Realm of Memecoins
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Launch your memecoin into the stratosphere with our advanced token creation platform.
              Join the cosmic revolution today!
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ClientWalletButton />
              <Link 
                href="/explore" 
                className="px-8 py-3 rounded-full bg-navy-light/50 text-white hover:bg-navy-light/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
              >
                Explore Cosmos
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-teal/20 to-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative bg-navy-light/30 backdrop-blur-xl rounded-xl p-6 hover:bg-navy-light/50 transition-all duration-300">
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-accent-teal"
            {...fadeIn}
          >
            Trending in the Cosmos
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Empty State */}
            <div className="bg-navy-light/30 backdrop-blur-xl rounded-xl p-12 text-center relative overflow-hidden group">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-[url('/stars.png')] opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
              
              {/* Floating Elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    animate={{
                      y: ['0%', '100%'],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: 'linear'
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-${Math.random() * 20}%`
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 text-6xl opacity-75"
                >
                  🌌
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">No Tokens Found</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  The cosmic void awaits its first tokens. Be the pioneer and launch your token into the stars.
                </p>
                <Link 
                  href="/create" 
                  className="inline-flex items-center px-6 py-3 rounded-full bg-primary/20 hover:bg-primary/30 text-primary-light transition-all duration-300 group"
                >
                  <span>Create First Token</span>
                  <motion.span 
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-accent-teal/20 to-transparent rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Empty State */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '0', label: 'Active Users' },
              { value: '$0', label: 'Total Volume' },
              { value: '0', label: 'Tokens Created' },
              { value: '100%', label: 'Uptime' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
