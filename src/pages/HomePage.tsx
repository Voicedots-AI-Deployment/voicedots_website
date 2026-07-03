import { HeroSection } from '../components/HeroSection';
import { ProblemSolutionSection } from '../components/ProblemSolutionSection';
import { BusinessImpactSection } from '../components/BusinessImpactSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
// import { DashboardPreviewSection } from '../components/DashboardPreviewSection';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { WhyVoiceDotsSection } from '../components/WhyVoiceDotsSection';
import { WhoCanUseSection } from '../components/WhoCanUseSection';
import { PerformanceMetricsSection } from '../components/PerformanceMetricsSection';
import { AboutSection } from '../components/AboutSection';
import { FuturisticVoiceDotsSection } from '../components/FuturisticVoiceDotsSection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProblemSolutionSection />
      <BusinessImpactSection />
      <HowItWorksSection />
      {/* <DashboardPreviewSection /> */}
      <CapabilitiesSection />
      <WhyVoiceDotsSection />
      <WhoCanUseSection />
      <PerformanceMetricsSection />
      <AboutSection />
      <FuturisticVoiceDotsSection />
    </main>
  );
}
