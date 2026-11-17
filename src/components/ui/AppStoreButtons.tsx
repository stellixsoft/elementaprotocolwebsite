"use client";

import Image, { type StaticImageData } from "next/image";
import appleButton from "@/assets/apple-button.png";
import googleButton from "@/assets/google-export-button.png";
import microsoftButton from "@/assets/microsoft-store-button.svg";
import { DownloadAppButton } from "@/components/ui/DownloadAppButton";
import { availabilityCopy, storeLinks } from "@/data/storeLinks";
import { cn } from "@/utils/cn";

type StoreBadge = {
  id: "google-play" | "microsoft" | "app-store";
  label: string;
  image: StaticImageData;
  href: string | null;
};

type AppStoreButtonsProps = {
  className?: string;
  buttonClassName?: string;
  /** Show the one-line availability note under the badges. */
  showAvailabilityNote?: boolean;
};

const badges: StoreBadge[] = [
  { id: "google-play", label: "Get Elementa Wallet on Google Play", image: googleButton, href: storeLinks.googlePlay },
  { id: "microsoft", label: "Get Elementa Wallet from Microsoft Store", image: microsoftButton, href: storeLinks.microsoftStore },
  { id: "app-store", label: "Elementa Wallet for iPhone, coming soon", image: appleButton, href: storeLinks.appStore },
];

const badgeClass =
  "relative inline-flex h-12 w-[162px] items-center justify-center rounded-lg transition duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24bace]";

function BadgeImage({ image }: { image: StaticImageData }) {
  return (
    <Image
      src={image}
      alt=""
      aria-hidden="true"
      sizes="162px"
      className="h-full w-full object-contain"
    />
  );
}

export function AppStoreButtons({
  className,
  buttonClassName,
  showAvailabilityNote = true,
}: AppStoreButtonsProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-3">
        {badges.map(({ id, label, image, href }) =>
          href ? (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(badgeClass, buttonClassName)}
            >
              <BadgeImage image={image} />
            </a>
          ) : (
            <DownloadAppButton
              key={id}
              aria-label={label}
              className={cn(badgeClass, "opacity-80", buttonClassName)}
            >
              <BadgeImage image={image} />
              <span className="pointer-events-none absolute -right-2 -top-2.5 rounded-full bg-[#24bace] px-2 py-[2px] font-body text-[9px] font-bold uppercase leading-none tracking-wider text-[#0a0f1d] shadow-[0_0_0_2px_#15202F]">
                Soon
              </span>
            </DownloadAppButton>
          ),
        )}
      </div>
      {showAvailabilityNote ? (
        <p className="font-body text-sm text-Elementa-muted">{availabilityCopy.short}</p>
      ) : null}
    </div>
  );
}
