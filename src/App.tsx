import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ParticleBackground } from "@/components/ParticleBackground";

import { HomePage } from "@/pages/HomePage";
import { TryNowPage } from "@/pages/TryNowPage";
import { TryOnWebsitePage } from "@/pages/TryOnWebsitePage";
import { PlansPage } from "./pages/PlansPage";
import { ContactPage } from "@/pages/ContactPage";
import { BlogsSection } from "@/components/BlogsPage";
import { TermsAndConditionsPage } from "./pages/TermsAndConditions";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicy";
import { DmkPage } from "@/pages/DmkPage";
import SapthagiriPage from "@/pages/SapthagiriPage";
import { SecureDataPage } from "@/pages/SecureDataPage";
import EcomPage from "@/pages/EcomPage";
import AIDemoWidget from "@/components/widgets/AIDemoWidget";
import { BlogPostPage } from "@/pages/BlogPostPage";
import { IntegratePage } from "@/pages/IntegratePage";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function ScrollHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function App() {
  // Track current theme state
  const [isDark, setIsDark] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.2,
      wheelMultiplier: 0.9,
    });

    let raf: number;

    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Watch for dark class changes on <html> element
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.classList.contains("dark");
      setIsDark(nowDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Router>
      <ScrollHandler />
      {/* Background – exactly one background active at a time */}
      {isDark && <ParticleBackground />}

      {/* Main content wrapper */}
      <div className="relative min-h-screen flex flex-col text-foreground">
        <Navigation />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/try-now" element={<TryNowPage />} />
            <Route path="/try-on-website" element={<TryOnWebsitePage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsAndConditionsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/dmk" element={<DmkPage />} />
            <Route path="/sapthagiri" element={<SapthagiriPage />} />
            <Route path="/blogs" element={<BlogsSection />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            <Route path="/secure-data" element={<SecureDataPage />} />
            <Route path="/ecom" element={<EcomPage />} />
            <Route path="/integrate" element={<IntegratePage />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* ✅ ADD THIS — GLOBAL DEMO WIDGET WRAPPED IN ERROR BOUNDARY */}
      <ErrorBoundary>
        <AIDemoWidget />
      </ErrorBoundary>
    </Router>
  );
}