import React from "react";

// IMPORT ALL SECTIONS
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";
import NewBoardShowcaseSection from "./NewBoardShowcaseSection";


export default function LandingPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#f6f8ff] text-gray-900">

      {/* NAVIGATION BAR */}
      <NavBar />

      {/* HERO SECTION */}
      <HeroSection />

      {/* FEATURES SECTION */}
      <FeaturesSection />

      {/* BOARD SHOWCASE SECTION */}
      <NewBoardShowcaseSection />

      {/* CTA SECTION */}
      <CTASection />

      {/* FOOTER */}
      <FooterSection />

    </div>
  );
}
