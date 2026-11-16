import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { HomePageClient } from "@/components/home/HomePageClient";
import { hero } from "@/data/homepage";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Elementa Wallet by Elementa Protocol: self-custody for Bitcoin, Solana and EVM networks with Transfer Protection built in. Freeze sending with a lock, set a daily limit and send only to addresses you trust.",
};

export default function Page() {
  return (
    <>
      <HeroSection hero={hero} />
      <HomePageClient />
    </>
  );
}
