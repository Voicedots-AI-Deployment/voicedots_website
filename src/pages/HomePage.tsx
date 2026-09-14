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
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="glass-card border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <span className="bg-primary/10 text-primary p-3 rounded-xl"><GraduationCap size={28} /></span>
          <div className="flex-1"><h2 className="text-xl font-medium">Your next interview. A more confident you.</h2><p className="text-sm text-muted-foreground mt-2">Personalized AI interview practice, campus placements, and feedback in your student dashboard.</p></div>
          <Link to="/interviews" className="inline-flex items-center gap-2 text-primary text-sm font-medium whitespace-nowrap">Explore AI interviews <ArrowRight size={17} /></Link>
        </div>
      </section>
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
