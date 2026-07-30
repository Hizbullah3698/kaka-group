import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { InternationalMarkets } from "@/features/dry-fruits/InternationalMarkets";
import { ProductPortfolio } from "@/features/dry-fruits/ProductPortfolio";
import { QualityAssurancePanel } from "@/features/dry-fruits/QualityAssurancePanel";
import { SupplyChainRail } from "@/features/dry-fruits/SupplyChainRail";
import { TradingExcellenceRail } from "@/features/dry-fruits/TradingExcellenceRail";
import { WholesaleServicesGrid } from "@/features/dry-fruits/WholesaleServicesGrid";
import { WhyKakaNumberedSplit } from "@/features/dry-fruits/WhyKakaNumberedSplit";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/sections/PageHero";
import { ParallaxCta } from "@/sections/ParallaxCta";
import { SectionHeader } from "@/sections/SectionHeader";

const HERO_SLIDES = [
  { src: "/uploads/dry%20fruit%20ware%20house.jpg", alt: "Warehouse racking with palletised goods" },
  { src: "/uploads/premium%20dry%20fruits%20warehouse.jpg", alt: "Mixed premium nuts and dried fruit" },
];

export const metadata: Metadata = buildPageMetadata("dry-fruits-trading");

export default function DryFruitsTradingPage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("dry-fruits-trading")} />

      <PageHero
        variant="photo"
        height="tall"
        eyebrow="KAKA Dry Fruits Trading · Deira, Dubai"
        heading={["Container volumes.", "Origin-grade quality."]}
        lead="Wholesale import, export and distribution of nuts and dried fruit. Sourced at origin, shipped by the container, supplied on contract."
        image={HERO_SLIDES}
        overlayGradients={[
          "linear-gradient(100deg, rgba(11,18,32,.96) 0%, rgba(11,18,32,.88) 34%, rgba(11,18,32,.6) 72%, rgba(11,18,32,.4) 100%)",
          "linear-gradient(180deg, rgba(11,18,32,.62) 0%, rgba(11,18,32,0) 32%, rgba(11,18,32,.88) 100%)",
        ]}
        noiseOpacity={0.42}
        ctas={[
          { label: "Request Wholesale Quote", href: "#quote" },
          {
            label: "Speak with Our Trading Team",
            href: "https://wa.me/971544144755",
            tone: "secondary",
            external: true,
          },
        ]}
      />

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <TradingExcellenceRail />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <ProductPortfolio />
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <SupplyChainRail />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink-card">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <SectionHeader
            eyebrow="Wholesale Services"
            heading="Set up as a supply programme, not a series of orders."
            headingClassName="max-w-[18ch]"
            tone="dark"
            className="mb-[68px]"
          />
          <WholesaleServicesGrid />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <QualityAssurancePanel />
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <InternationalMarkets />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <WhyKakaNumberedSplit />
        </div>
      </section>

      <ParallaxCta
        id="quote"
        eyebrow="Wholesale Enquiries"
        heading="Send us the line, the grade and the volume."
        headingClassName="max-w-[20ch]"
        lead="We will come back with pricing, packing options and the earliest shipping window, usually within one working day."
        leadClassName="max-w-[54ch]"
        image={{ src: "/uploads/premium%20dry%20fruits%20warehouse.jpg", alt: "" }}
        overlayOpacity={[0.92, 0.86, 0.95]}
        showNoise
        ctas={[
          { label: "Request a Wholesale Quote", href: "/contact/#form" },
          { label: "Discuss Long-term Supply", href: "https://wa.me/971544144755", tone: "secondary", external: true },
        ]}
      />
    </>
  );
}
