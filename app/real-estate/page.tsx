import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { BuyingJourneySteps } from "@/features/real-estate/BuyingJourneySteps";
import { OpportunityShowcase } from "@/features/real-estate/OpportunityShowcase";
import { PropertyCategoryGrid } from "@/features/real-estate/PropertyCategoryGrid";
import { ServiceList } from "@/features/real-estate/ServiceList";
import { WhyInvestRail } from "@/features/real-estate/WhyInvestRail";
import { WhyKakaSplit } from "@/features/real-estate/WhyKakaSplit";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/sections/PageHero";
import { ParallaxCta } from "@/sections/ParallaxCta";
import { SectionHeader } from "@/sections/SectionHeader";

const HERO_SLIDES = [
  { src: "/uploads/Dubai%20skyline%20land.jpg", alt: "Downtown Dubai skyline" },
  { src: "/uploads/villa%20with%20pool.jpg", alt: "Contemporary villa with private pool" },
  { src: "/uploads/Dubai%20Marina%20apartment.jpg", alt: "Dubai Marina waterfront towers" },
];

export const metadata: Metadata = buildPageMetadata("real-estate");

export default function RealEstatePage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("real-estate")} />

      <PageHero
        variant="photo"
        height="tall"
        eyebrow="KAKA Real Estate · Dubai"
        heading={["Own the right address", "in the right market."]}
        lead="Advisory, brokerage and portfolio management across Dubai’s freehold communities, from ready villas to off-plan releases."
        image={HERO_SLIDES}
        overlayGradients={[
          "linear-gradient(102deg, rgba(11,18,32,.95) 0%, rgba(11,18,32,.82) 32%, rgba(11,18,32,.5) 70%, rgba(11,18,32,.3) 100%)",
          "linear-gradient(180deg, rgba(11,18,32,.6) 0%, rgba(11,18,32,0) 32%, rgba(11,18,32,.86) 100%)",
        ]}
        noiseOpacity={0.42}
        ctas={[
          { label: "Explore Properties", href: "#categories" },
          { label: "Schedule Consultation", href: "#consult", tone: "secondary" },
        ]}
      />

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <WhyInvestRail />
        </div>
      </section>

      <section id="categories" className="border-b border-gold/30 bg-white">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <div className="mb-[30px] flex items-center gap-[18px]">
            <RevealOnScroll variant="line" className="block h-px w-14 bg-gold" />
            <span className="font-mono text-eyebrow uppercase text-gold-dark">Property Categories</span>
          </div>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-7">
            <RevealOnScroll>
              <h2 className="m-0 max-w-[16ch] font-display text-h2 text-ink">Six ways into the Dubai market.</h2>
            </RevealOnScroll>
            <Link
              href="#consult"
              className="w-max border-b border-gold/50 pb-1.5 text-small uppercase tracking-[.14em] text-gold-dark transition-colors duration-220 ease-kaka hover:border-gold"
            >
              Ask for current availability
            </Link>
          </div>
          <PropertyCategoryGrid />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <ServiceList />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-7">
            <SectionHeader
              eyebrow="Featured Opportunities"
              heading="How we present an opportunity."
              tone="dark"
              headingClassName="max-w-[17ch]"
            />
            <p className="m-0 max-w-[30ch] font-mono text-[9px] uppercase leading-[2] tracking-[.2em] text-gold/75">
              Sample presentation format. Live inventory shared on request
            </p>
          </div>
          <OpportunityShowcase />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <SectionHeader
            eyebrow="The Buying Journey"
            heading="Six steps, and you know where you stand at each one."
            headingClassName="mb-[76px] max-w-[16ch]"
          />
          <BuyingJourneySteps />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <WhyKakaSplit />
        </div>
      </section>

      <ParallaxCta
        id="consult"
        eyebrow="Schedule a Consultation"
        heading="Bring us the brief. We will bring the market."
        headingClassName="max-w-[19ch]"
        lead="Thirty minutes at our Deira office or on a call: budget, target return and community shortlist, with no obligation to transact."
        leadClassName="max-w-[52ch]"
        image={{ src: "/uploads/luxury%20residential%20development.jpg", alt: "" }}
        overlayOpacity={[0.9, 0.82, 0.94]}
        ctas={[
          { label: "Book a Consultation", href: "/contact/#form" },
          { label: "WhatsApp the Team", href: "https://wa.me/971544144755", tone: "secondary", external: true },
        ]}
      />
    </>
  );
}
