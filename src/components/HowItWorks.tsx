'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Connect Your Wallet',
    description: 'Start by connecting your Solana wallet. We support Phantom, Solflare and more.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Configure Your Token',
    description: 'Customize your token by setting the name, symbol, supply and other parameters.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Deploy Your Token',
    description: 'With one click, deploy your token to the Solana blockchain. No coding required.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Manage & Grow',
    description: 'Track your token performance, build liquidity, and grow your community using our tools.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  }
];

const HowItWorks: FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-accent-teal/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create and launch your Solana token in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Steps List */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div 
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`cursor-pointer p-6 rounded-xl transition-all duration-500 transform ${
                  activeStep === step.id
                    ? 'bg-gradient-to-r from-navy-700/70 to-navy-800/70 border border-primary/20 shadow-lg shadow-primary/10 scale-105'
                    : 'bg-navy-800/30 border border-navy-700/30 hover:bg-navy-700/30'
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${activeStep === step.id ? 'bg-primary/10' : 'bg-navy-700'}`}>
                    {step.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white mb-1 flex items-center">
                      <span className={`mr-2 text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center ${
                        activeStep === step.id ? 'bg-primary text-navy-800' : 'bg-navy-600 text-gray-300'
                      }`}>
                        {step.id}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-8">
              <Link 
                href="/create"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-light text-navy-800 font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                Create Your Token
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Visual Representation */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent-teal/5 rounded-2xl blur-xl"></div>
            <div className="relative glass border border-primary/10 rounded-2xl p-6 h-[400px] overflow-hidden">
              <div className="relative h-full w-full">
                {activeStep === 1 && (
                  <div className="animate-fade-in flex flex-col items-center justify-center h-full">
                    <div className="w-72 h-72 relative">
                      <Image
                        src="/how-it-works/connect-wallet.png"
                        alt="Connect your wallet"
                        fill
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/how-it-works/step-placeholder.png';
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4">
                      Choose from popular Solana wallets to get started
                    </p>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="animate-fade-in flex flex-col items-center justify-center h-full">
                    <div className="w-72 h-72 relative">
                      <Image
                        src="/how-it-works/configure-token.png"
                        alt="Configure your token"
                        fill
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/how-it-works/step-placeholder.png';
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4">
                      Customize all aspects of your token in our intuitive interface
                    </p>
                  </div>
                )}
                
                {activeStep === 3 && (
                  <div className="animate-fade-in flex flex-col items-center justify-center h-full">
                    <div className="w-72 h-72 relative">
                      <Image
                        src="/how-it-works/deploy-token.png"
                        alt="Deploy your token"
                        fill
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/how-it-works/step-placeholder.png';
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4">
                      One-click deployment to the Solana blockchain
                    </p>
                  </div>
                )}
                
                {activeStep === 4 && (
                  <div className="animate-fade-in flex flex-col items-center justify-center h-full">
                    <div className="w-72 h-72 relative">
                      <Image
                        src="/how-it-works/manage-grow.png"
                        alt="Manage and grow"
                        fill
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/how-it-works/step-placeholder.png';
                        }}
                      />
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4">
                      Track performance and grow your community with our suite of tools
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 