import type { Metadata } from "next";
import { WalletHeroSection } from "@/components/sections/WalletHeroSection";
import { WalletPageClient } from "@/components/home/WalletPageClient";
import { walletHero } from "@/data/walletPage";

export const metadata: Metadata = {
  title: "Elementa Wallet",
  description:
    "Elementa Wallet self-custody for Bitcoin, Solana and EVM networks with Transfer Protection. Freeze sending with a time lock, set a daily limit and use a whitelist.",
  openGraph: {
    title: "Elementa Wallet",
    description: "Self-custody with transfer protection built in.",
  },
};

export default function Page() {
  return (
    <>
      <WalletHeroSection hero={walletHero} />
      <WalletPageClient />
    </>
  );
}
