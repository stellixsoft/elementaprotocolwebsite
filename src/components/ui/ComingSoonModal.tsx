"use client";

import { X } from "lucide-react";
import { availabilityCopy, storeLinks } from "@/data/storeLinks";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export function ComingSoonModal({
  open,
  onClose,
  title = availabilityCopy.iphoneDialogTitle,
  message = availabilityCopy.iphoneDialogMessage,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 coming-soon-modal-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-md coming-soon-backdrop-enter"
        aria-label="Close dialog"
      />
      <div className="relative w-full max-w-md rounded-[20px] border border-white/10 bg-[#0a0f1d]/95 p-8 text-center shadow-[0_40px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:p-10 coming-soon-panel-enter">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-white/60 transition-colors hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#24bace]">
          Elementa Wallet
        </p>
        <h3
          id="coming-soon-title"
          className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl"
        >
          {title}
        </h3>
        <p className="mt-4 font-body text-sm leading-relaxed text-white/75 sm:text-base">
          {message}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href={storeLinks.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary block w-full py-3 text-center text-sm font-bold"
          >
            Google Play
          </a>
          <a
            href={storeLinks.microsoftStore}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary block w-full py-3 text-center text-sm font-bold"
          >
            Microsoft Store
          </a>
        </div>
        <a
          href="/#community-section"
          onClick={(e) => {
            // Stay on the current page when it has the sign-up section; otherwise go to the home page one.
            const section = document.getElementById("community-section");
            if (section) {
              e.preventDefault();
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            onClose();
          }}
          className="btn-primary mt-3 block w-full py-3.5 text-sm font-bold uppercase tracking-widest"
        >
          Notify me when it's on iPhone
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 font-body text-sm text-white/60 transition-colors hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
