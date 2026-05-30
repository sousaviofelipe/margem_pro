// Landing Page pública — página inicial da plataforma Margem Pro

import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";
import Stats from "./_components/Stats";
import Segments from "./_components/Segments";
import Testimonials from "./_components/Testimonials";
import CtaSection from "./_components/CtaSection";

export default function HomePage() {
  return (
    <div className="landing">
      <Hero />
      <Stats />
      <Features />
      <Segments />
      <Testimonials />
      <CtaSection />
      <Footer />
    </div>
  );
}
