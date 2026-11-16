"use client";

import dynamic from "next/dynamic";
import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { LazyOnView } from "@/components/LazyOnView";
import {
  blockchainCards,
  seoSection,
  helpSection,
  faq,
  community,
  ecosystem,
} from "@/data/homepage";

const BlockchainSection = dynamic(
  () =>
    import("@/components/sections/BlockchainSection").then((m) => ({
      default: m.BlockchainSection,
    })),
  { loading: () => null, ssr: false },
);

const EcosystemSection = dynamic(
  () =>
    import("@/components/sections/EcosystemSection").then((m) => ({
      default: m.EcosystemSection,
    })),
  { loading: () => null, ssr: false },
);

const HelpFaqSection = dynamic(
  () =>
    import("@/components/sections/HelpFaqSection").then((m) => ({
      default: m.HelpFaqSection,
    })),
  { loading: () => null, ssr: false },
);

const SeoContentSection = dynamic(
  () =>
    import("@/components/sections/SeoContentSection").then((m) => ({
      default: m.SeoContentSection,
    })),
  { loading: () => null, ssr: false },
);

const CommunitySection = dynamic(
  () =>
    import("@/components/sections/CommunitySection").then((m) => ({
      default: m.CommunitySection,
    })),
  { loading: () => null, ssr: false },
);

/**
 * Below-fold homepage sections — chunks load on approach, not at hydration.
 * Stats, bento metrics, featured guide and social proof were removed: they showed
 * figures, backers and testimonials that could not be verified.
 */
export function HomePageSections() {
  return (
    <>

      <LazyOnView>
        <ScrollRevealSection>
          <BlockchainSection cards={blockchainCards} />
        </ScrollRevealSection>
      </LazyOnView>



      <LazyOnView>
        <ScrollRevealSection>
          <EcosystemSection ecosystem={ecosystem} />
        </ScrollRevealSection>
      </LazyOnView>


      <LazyOnView>
        <ScrollRevealSection>
          <SeoContentSection seoSection={seoSection} />
        </ScrollRevealSection>
      </LazyOnView>

      <LazyOnView>
        <ScrollRevealSection>
          <HelpFaqSection help={helpSection} faq={faq} />
        </ScrollRevealSection>
      </LazyOnView>

      <LazyOnView>
        <CommunitySection community={community} />
      </LazyOnView>
    </>
  );
}
