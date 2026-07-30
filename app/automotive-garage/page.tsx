import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { CustomerCommitmentRows } from "@/features/automotive/CustomerCommitmentRows";
import { ServiceCatalogList } from "@/features/automotive/ServiceCatalogList";
import { ServiceProcessSteps } from "@/features/automotive/ServiceProcessSteps";
import { VehicleCareStandards } from "@/features/automotive/VehicleCareStandards";
import { WhyChooseGarage } from "@/features/automotive/WhyChooseGarage";
import { WorkshopExcellenceGrid } from "@/features/automotive/WorkshopExcellenceGrid";
import { WorkshopPlate } from "@/features/automotive/WorkshopPlate";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/sections/PageHero";
import { ParallaxCta } from "@/sections/ParallaxCta";
import { SectionHeader } from "@/sections/SectionHeader";

const HERO_SLIDES = [
  { src: "/uploads/Hero%20Workshop.jpg", alt: "KAKA Group service workshop with vehicles on lifts" },
  { src: "/uploads/Engine%20Repair%20-%20Mechanic%20working%20on%20an%20engine%20bay..jpg", alt: "Technician working in an engine bay" },
  { src: "/uploads/Vehicle%20Diagnostics%20-%20Technician%20using%20a%20diagnostic%20scanner..jpg", alt: "Diagnostic scan in progress" },
];

export const metadata: Metadata = buildPageMetadata("automotive-garage");

export default function AutomotiveGaragePage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("automotive-garage")} />

      <PageHero
        variant="photo"
        height="tall"
        eyebrow="KAKA Automotive Garage · Dubai"
        heading={["Precision service.", "Nothing left to chance."]}
        lead="A full service workshop for private, executive and commercial vehicles. Diagnosed properly, quoted before work begins, finished when we said it would be."
        image={HERO_SLIDES}
        overlayGradients={[
          "linear-gradient(100deg, rgba(11,18,32,.96) 0%, rgba(11,18,32,.9) 34%, rgba(11,18,32,.64) 72%, rgba(11,18,32,.44) 100%)",
          "linear-gradient(180deg, rgba(11,18,32,.66) 0%, rgba(11,18,32,0) 32%, rgba(11,18,32,.9) 100%)",
        ]}
        noiseOpacity={0.42}
        ctas={[
          { label: "Book a Service", href: "#book" },
          { label: "Request Vehicle Inspection", href: "/contact/#form", tone: "secondary" },
        ]}
      />

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <ServiceCatalogList />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <WorkshopPlate />
      </section>

      <section className="border-b border-gold/30 bg-ink-card">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <ServiceProcessSteps />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <WhyChooseGarage />
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <VehicleCareStandards />
      </section>

      <section className="border-b border-gold/30 bg-ink-deep">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <SectionHeader
            eyebrow="Workshop Excellence"
            heading="Attention to detail, photographed as it happens."
            headingClassName="max-w-[17ch]"
            tone="dark"
            className="mb-[70px]"
          />
          <WorkshopExcellenceGrid />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <CustomerCommitmentRows />
        </div>
      </section>

      <ParallaxCta
        id="book"
        eyebrow="Book a Service"
        heading="Bring it in. We will tell you what it actually needs."
        headingClassName="max-w-[20ch]"
        lead="Book a service or an inspection and you will have a written estimate before any work begins, including the option to do nothing."
        leadClassName="max-w-[52ch]"
        image={{
          src: "/uploads/Customer%20Handover%20-%20Advisor%20returning%20keys%20to%20a%20customer%20or%20discussing%20completed%20work..jpg",
          alt: "",
        }}
        imagePosition="50% 40%"
        overlayOpacity={[0.92, 0.86, 0.95]}
        showNoise
        ctas={[
          { label: "Book a Service", href: "/contact/#form" },
          { label: "Contact the Workshop", href: "tel:+971544144755", tone: "secondary" },
        ]}
      />
    </>
  );
}
