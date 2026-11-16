import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomePageClient } from "@/components/home/HomePageClient";
import { hero } from "@/data/homepage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Elementa is a self-custodial crypto wallet for Bitcoin, Solana and EVM networks, built by Stellix Soft LLC.",
};

export default function Page() {
  return (
    <>
      <HeroSection hero={hero} />
      <HomePageClient />
    </>
  );
}
