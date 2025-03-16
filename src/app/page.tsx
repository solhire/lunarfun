import HeroSection from '@/components/HeroSection';
import TrendingTokens from '@/components/TrendingTokens';

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 md:px-6 pt-16 max-w-7xl">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Trending Tokens */}
        <div className="mb-20">
          <TrendingTokens />
        </div>
      </div>
    </main>
  );
}
