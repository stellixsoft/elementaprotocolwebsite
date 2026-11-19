import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Stellix Soft LLC about the Elementa wallet support, partnerships and legal enquiries.",
};

export default function Page() {
  return <ContactPage />;
}
