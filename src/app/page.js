'use client';
import { useLang } from './context/LangContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Overview from './components/Overview/Overview';
import Services from './components/Services/Services';

import Industries from './components/Industries/Industries';
import AIFeatures from './components/AIFeatures/AIFeatures';
import TechStack from './components/TechStack/TechStack';
import CaseStudies from './components/CaseStudies/CaseStudies';
import Testimonials from './components/Testimonials/Testimonials';
import Pricing from './components/Pricing/Pricing';
import Footer from './components/Footer/Footer';

export default function Home() {
  const { t } = useLang();

  return (
    <>
      <Navbar />
      <main>
        <Hero       t={t.hero}         tOverview={t.overview} />
        <Overview   t={t.overview} />
        <Services   t={t.services} />
        <Industries />
        <AIFeatures />
        <TechStack  />
        <CaseStudies  t={t.caseStudies} />
        <Testimonials t={t.testimonials} />
        <Pricing      t={t.pricing} />
      </main>
      <Footer t={t.footer} />
    </>
  );
}
