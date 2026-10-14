import React from 'react';
import Navbar from './components/Navbar';
import HeroIntro from './components/HeroIntro';
import TrackSection from './components/TrackSection';
import TelemetrySpecs from './components/TelemetrySpecs';
import Footer from './components/Footer';

export default function App() {
  const repoUrl = "https://github.com/amankr-55/scroll-hero-animation";

  const handleScrollToTrack = () => {
    const el = document.getElementById('track-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#090a0f] text-gray-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Fixed Header */}
      <Navbar repoUrl={repoUrl} />

      {/* Hero Section Above The Fold (Layout & Initial Load Animation) */}
      <HeroIntro onScrollDown={handleScrollToTrack} />

      {/* The Core Scroll-Driven Car & Highway Track Section */}
      <TrackSection />

      {/* Engineering Specs & Performance Documentation */}
      <TelemetrySpecs repoUrl={repoUrl} />

      {/* Footer */}
      <Footer repoUrl={repoUrl} />
    </div>
  );
}
