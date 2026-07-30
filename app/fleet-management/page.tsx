import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { DeliveryPlatforms } from "@/features/fleet/DeliveryPlatforms";
import { FleetProcessRail } from "@/features/fleet/FleetProcessRail";
import { FleetSolutionsGrid } from "@/features/fleet/FleetSolutionsGrid";
import { FleetStatistics } from "@/features/fleet/FleetStatistics";
import { MaintenanceSchedule } from "@/features/fleet/MaintenanceSchedule";
import { OurFleetGrid } from "@/features/fleet/OurFleetGrid";
import { WhyBusinessesChoose } from "@/features/fleet/WhyBusinessesChoose";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/sections/PageHero";
import { ParallaxCta } from "@/sections/ParallaxCta";
import { SectionHeader } from "@/sections/SectionHeader";

const HERO_SLIDES = [
  { src: "/uploads/delivery%20fleet%20UAE.png", alt: "KAKA Group delivery vans lined up at the depot" },
  { src: "/uploads/delivery%20bike%20dubai.jpg", alt: "Delivery rider on a Dubai arterial road" },
  { src: "/uploads/salah-regouane-x--RpqqTbbg-unsplash.jpg", alt: "Courier cyclist crossing Downtown Dubai" },
];

export const metadata: Metadata = buildPageMetadata("fleet-management");

export default function FleetManagementPage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("fleet-management")} />

      <PageHero
        variant="photo"
        height="full"
        eyebrow="KAKA Fleet Management · United Arab Emirates"
        heading={["Your deliveries do not", "stop. Neither does the fleet."]}
        lead="Managed vehicles, driver support and maintenance for the delivery platforms and businesses that move goods across the Emirates every day."
        image={HERO_SLIDES}
        overlayGradients={[
          "linear-gradient(100deg, rgba(11,18,32,.96) 0%, rgba(11,18,32,.88) 34%, rgba(11,18,32,.6) 72%, rgba(11,18,32,.42) 100%)",
          "linear-gradient(180deg, rgba(11,18,32,.64) 0%, rgba(11,18,32,0) 32%, rgba(11,18,32,.9) 100%)",
        ]}
        noiseOpacity={0.42}
        ctas={[
          { label: "Partner With Our Fleet", href: "#partner" },
          { label: "Request Fleet Consultation", href: "/contact/#form", tone: "secondary" },
        ]}
      />

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <FleetSolutionsGrid />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <div className="mb-[70px] flex flex-wrap items-end justify-between gap-7">
            <SectionHeader
              eyebrow="Our Fleet"
              heading="Matched to the route, not the brochure."
              headingClassName="max-w-[15ch]"
              tone="dark"
            />
            <RevealOnScroll delay={80}>
              <p className="max-w-[36ch] text-body-lg font-light text-cream/70">
                Last-mile food runs, grocery batches and B2B distribution each need a different vehicle. We supply
                all of them.
              </p>
            </RevealOnScroll>
          </div>
          <OurFleetGrid />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink-card">
        <DeliveryPlatforms />
      </section>

      <section className="border-b border-gold/30 bg-ink-deep">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <FleetProcessRail />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <MaintenanceSchedule />
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <WhyBusinessesChoose />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink-deep">
        <FleetStatistics />
      </section>

      <ParallaxCta
        id="partner"
        eyebrow="Partner With Our Fleet"
        heading="Tell us how many vehicles, on which routes."
        headingClassName="max-w-[20ch]"
        lead="We will come back with a fleet plan, monthly terms and a deployment timeline, usually within one working day."
        leadClassName="max-w-[54ch]"
        image={{ src: "/uploads/delivery%20fleet%20UAE.png", alt: "" }}
        overlayOpacity={[0.9, 0.84, 0.95]}
        showNoise
        ctas={[
          { label: "Request Fleet Consultation", href: "/contact/#form" },
          { label: "Contact Operations Team", href: "tel:+971544144755", tone: "secondary" },
        ]}
      />
    </>
  );
}
