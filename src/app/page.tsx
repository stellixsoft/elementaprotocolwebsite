import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomePageClient } from "@/components/home/HomePageClient";
import { hero } from "@/data/homepage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Elementa Protocol by Stellix Soft. Its live product, Elementa Wallet, is a self-custodial crypto wallet for Bitcoin, Solana and EVM networks.",
};

export default function Page() {
  return (
    <>
      <HeroSection hero={hero} />
      <HomePageClient />
    </>
  );
}
