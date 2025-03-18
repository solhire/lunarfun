import HeroSection from '@/components/HeroSection';
import TrendingTokens from '@/components/TrendingTokens';
import Testimonials from '@/components/Testimonials';
import NewTokens from '@/components/NewTokens';
import PlatformStats from '@/components/PlatformStats';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 md:px-6 pt-16 max-w-7xl">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Platform Stats */}
        <PlatformStats />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Trending Tokens */}
        <div className="mb-16">
          <TrendingTokens />
        </div>
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* New Tokens */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6">Recently Launched</h2>
          <NewTokens />
        </div>
      </div>
    </main>
  );
}
