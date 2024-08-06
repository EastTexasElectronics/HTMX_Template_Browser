import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import JoinCommunitySection from '@/components/JoinCommunitySection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto py-8 px-4">
        <HeroSection />
        <FeaturesSection />
        <JoinCommunitySection />
      </main>
    </div>
  );
}
