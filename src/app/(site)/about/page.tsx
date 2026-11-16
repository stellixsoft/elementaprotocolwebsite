import React from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutNextGen from "@/components/about/AboutNextGen";
import AboutWhatDrivesUs from "@/components/about/AboutWhatDrivesUs";
import AboutVisionMission from "@/components/about/AboutVisionMission";
import AboutMoreThanWallet from "@/components/about/AboutMoreThanWallet";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { community } from "@/data/homepage";

export const metadata = {
  title: "About Elementa Protocol | Stellix Soft",
  description: "Elementa Protocol is a Stellix Soft LLC project: Elementa Wallet (live), Elementa Blockchain (in development) and Elementa DEX (coming soon).",
};

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutNextGen />
      <AboutWhatDrivesUs />
      <AboutVisionMission />
      <AboutMoreThanWallet />
      <CommunitySection community={community} />
    </div>
  );
};

export default AboutPage;
