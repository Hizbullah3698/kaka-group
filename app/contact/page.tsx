import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { ContactOptionTiles } from "@/features/contact/ContactOptionTiles";
import { EnquiryFormSection } from "@/features/contact/EnquiryFormSection";
import { HowWeWorkGrid } from "@/features/contact/HowWeWorkGrid";
import { OfficeLocationSection } from "@/features/contact/OfficeLocationSection";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = buildPageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("contact")} />

      <PageHero
        variant="photo"
        height="short"
        eyebrow="Contact · Deira, Dubai"
        heading="Talk to the people who handle it."
        lead="Every enquiry goes straight to the division that answers for it. No call centre in between."
        image={[{ src: "/uploads/dubai-real-estate-houses.jpg.jpg", alt: "Dubai skyline seen from Deira" }]}
        imageAnimation="kenBurns"
        showScrollCue={false}
        overlayGradients={[
          "linear-gradient(102deg, rgba(11,18,32,.96) 0%, rgba(11,18,32,.84) 32%, rgba(11,18,32,.55) 70%, rgba(11,18,32,.34) 100%)",
          "linear-gradient(180deg, rgba(11,18,32,.66) 0%, rgba(11,18,32,0) 34%, rgba(11,18,32,.82) 100%)",
        ]}
        noiseOpacity={0.42}
      />

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <ContactOptionTiles />
        </div>
      </section>

      <section id="form" className="border-b border-gold/30 bg-white">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <EnquiryFormSection />
        </div>
      </section>

      <section id="visit" className="border-b border-gold/30 bg-ink">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <OfficeLocationSection />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <HowWeWorkGrid />
        </div>
      </section>
    </>
  );
}
