import React from 'react';
import Navigation from './layout/Navigation.jsx';
import HeroSection from './sections/HeroSection.jsx';
import StatsSection from './sections/StatsSection.jsx';
import FeaturesSection from './sections/FeaturesSection.jsx';
import TestimonialsSection from './sections/TestimonialsSection.jsx';
import CTASection from './sections/CTASection.jsx';
import Footer from './layout/Footer.jsx';
import PricingSection from './sections/PricingSection.jsx';


const MainPage = () => {
  return (
    <div className="font-inter bg-black text-white antialiased">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default MainPage;