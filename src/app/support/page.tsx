'use client';

import { useState } from 'react';

export default function SupportPage() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };
  
  const faqs = [
    {
      question: "How do I connect my wallet?",
      answer: "Click the 'Connect Wallet' button in the top right corner of the page. You'll be prompted to select your wallet provider (Phantom, Solflare, etc.) and approve the connection. Make sure you have the wallet extension installed in your browser."
    },
    {
      question: "What fees are involved in creating a token?",
      answer: "Creating a token on Solana requires a small amount of SOL to cover the network transaction fees. The exact amount varies based on network conditions, but typically ranges from 0.01 to 0.05 SOL. Our platform also charges a small service fee of 0.1 SOL per token creation."
    },
    {
      question: "How long does it take to create a token?",
      answer: "Token creation on Solana is very fast. Once you submit the creation form and confirm the transaction in your wallet, your token will be created within seconds. It will be immediately available on our platform and the Solana blockchain."
    },
    {
      question: "Can I edit my token after creation?",
      answer: "Some aspects of your token can be modified after creation if you've enabled those features during creation (such as minting additional supply). However, core properties like the token name, symbol, and decimals cannot be changed once the token is created on the blockchain."
    },
    {
      question: "How do I list my token on exchanges?",
      answer: "After creating your token, you can create liquidity pools on decentralized exchanges like Raydium or Orca. This process involves pairing your token with SOL or another established token. For centralized exchanges, you'll need to apply directly with each exchange, which typically involves a more extensive application process."
    },
    {
      question: "Is my wallet safe to use on this platform?",
      answer: "We prioritize security and never store your private keys or seed phrases. All transactions are signed directly in your wallet. However, always exercise caution online: verify website URLs, keep your seed phrase secure, and consider using a hardware wallet for additional security."
    }
  ];
  
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Support & FAQ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-navy-600 rounded-xl p-6 text-center">
            <div className="inline-block p-4 rounded-full bg-navy-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Discord Community</h2>
            <p className="text-gray-300 mb-4">
              Join our Discord server for community support, discussions, and the latest updates.
            </p>
            <a 
              href="https://discord.gg/yumsfun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-primary text-navy-700 rounded-full font-medium hover:bg-primary-400 transition-all"
            >
              Join Discord
            </a>
          </div>
          
          <div className="bg-navy-600 rounded-xl p-6 text-center">
            <div className="inline-block p-4 rounded-full bg-navy-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Email Support</h2>
            <p className="text-gray-300 mb-4">
              Need direct assistance? Our support team is ready to help with any questions.
            </p>
            <a 
              href="mailto:support@yums.fun" 
              className="inline-block px-6 py-2 bg-primary text-navy-700 rounded-full font-medium hover:bg-primary-400 transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
        
        <div className="bg-navy-600 rounded-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-navy-500 pb-4 last:border-b-0 last:pb-0">
                <button
                  className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeQuestion === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeQuestion === index && (
                  <div className="mt-2 text-gray-300 pl-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-navy-600 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          
          {submitSuccess ? (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
              <p className="text-green-400 font-medium">Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                >
                  <option value="">Select a topic</option>
                  <option value="token-creation">Token Creation</option>
                  <option value="wallet-issues">Wallet Issues</option>
                  <option value="trading-problems">Trading Problems</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="bug-report">Bug Report</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-navy-700 border border-navy-500 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-white"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-navy-700 rounded-lg font-medium hover:bg-primary-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-navy-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
} 