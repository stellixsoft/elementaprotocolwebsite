import React from "react";
import { cn } from "@/utils/cn";
import {
  SITE_CONTACT_EMAIL,
  gmailComposeHref,
} from "@/data/siteContact";

type Props = {
  className?: string;
  children?: React.ReactNode;
  subject?: string;
};

export function ContactEmailLink({
  className,
  children,
  subject,
}: Props) {
  return (
    <a
      href={gmailComposeHref(SITE_CONTACT_EMAIL, subject)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-[#24bace] underline underline-offset-4 transition-colors hover:text-[#1ca6b8]",
        className,
      )}
    >
      {children ?? SITE_CONTACT_EMAIL}
    </a>
  );
}
