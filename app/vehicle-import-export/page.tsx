import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { ExportJourneySteps } from "@/features/vehicle-import-export/ExportJourneySteps";
import { HeroCtaRow } from "@/features/vehicle-import-export/HeroCtaRow";
import { ImportExportServices } from "@/features/vehicle-import-export/ImportExportServices";
import { InternationalMarketsMap } from "@/features/vehicle-import-export/InternationalMarketsMap";
import { TradingOverview } from "@/features/vehicle-import-export/TradingOverview";
import { VehicleCategoryGrid } from "@/features/vehicle-import-export/VehicleCategoryGrid";
import { WatchVideosCta } from "@/features/vehicle-import-export/WatchVideosCta";
import { WhyShamsUlHaya } from "@/features/vehicle-import-export/WhyShamsUlHaya";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { NumberedInfoRows } from "@/sections/NumberedInfoRows";
import { PageHero } from "@/sections/PageHero";
import { ParallaxCta } from "@/sections/ParallaxCta";
import type { ProcessStep } from "@/types/content";

const HERO_SLIDES = [
  { src: "/uploads/Hero%20-%20Vehicle%20loading%20at%20a%20port%20or%20premium%20export%20scene..jpg", alt: "Container quay with vehicles alongside" },
  { src: "/uploads/Container%20terminal%20with%20vehicle%20logistics..jpg", alt: "Container being lifted at a terminal" },
  { src: "/uploads/Rows%20of%20vehicles%20at%20an%20auction%20yard..jpg", alt: "Rows of vehicles awaiting allocation" },
];

const CONFIDENCE_POINTS: ProcessStep[] = [
  {
    number: "01",
    title: "Honest communication",
    description: "You hear the condition as it is, the delay as soon as we know, and the cost before it is incurred. Nothing is discovered on arrival.",
  },
  {
    number: "02",
    title: "Careful inspection",
    description: "Photographed and reported at origin before loading, so what leaves the yard is what you agreed to buy.",
  },
  {
    number: "03",
    title: "Secure logistics",
    description: "Insured shipments with established lines, and a vessel reference you can track yourself.",
  },
  {
    number: "04",
    title: "Reliable timelines",
    description: "Realistic dates from purchase to delivery, and a call the moment a vessel or clearance threatens one.",
  },
  {
    number: "05",
    title: "Long-term business relationships",
    description: "Most of our volume is repeat dealer business, and that only happens by being straight the first time.",
  },
];

export const metadata: Metadata = buildPageMetadata("vehicle-import-export");

export default function VehicleImportExportPage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("vehicle-import-export")} />

      <PageHero
        variant="photo"
        height="tall"
        eyebrow="Shams Ul Haya · Sharjah, UAE"
        heading={["From American auctions", "to international roads."]}
        lead="Shams Ul Haya sources vehicles across the United States, consolidates them through the UAE, and delivers to buyers in Georgia, Iraq and the wider region."
        image={HERO_SLIDES}
        overlayGradients={[
          "linear-gradient(100deg, rgba(11,18,32,.96) 0%, rgba(11,18,32,.9) 34%, rgba(11,18,32,.66) 72%, rgba(11,18,32,.46) 100%)",
          "linear-gradient(180deg, rgba(11,18,32,.66) 0%, rgba(11,18,32,0) 32%, rgba(11,18,32,.9) 100%)",
        ]}
        noiseOpacity={0.42}
        ctas={[]}
      >
        <HeroCtaRow
          ctas={[
            { label: "Request Vehicle Sourcing", href: "#sourcing" },
            { label: "Speak with Our Export Team", href: "https://wa.me/971544144755", tone: "secondary", external: true },
          ]}
        />
      </PageHero>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <TradingOverview />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <VehicleCategoryGrid />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-ink-deep">
        <ExportJourneySteps />
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <ImportExportServices />
      </section>

      <section className="border-b border-gold/30 bg-ink">
        <WhyShamsUlHaya />
      </section>

      <section className="border-b border-gold/30 bg-ink-deep">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <InternationalMarketsMap />
        </div>
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <NumberedInfoRows
            eyebrow="Customer Confidence"
            heading="Buying a vehicle you cannot stand next to takes trust."
            headingClassName="max-w-[19ch]"
            items={CONFIDENCE_POINTS}
          />
        </div>
      </section>

      <WatchVideosCta />

      <ParallaxCta
        id="sourcing"
        eyebrow="Request Vehicle Sourcing"
        heading="Tell us the vehicle and the destination."
        headingClassName="max-w-[20ch]"
        lead="Send the make, model, year, budget and port. We will come back with what is available and the full landed cost, itemised."
        leadClassName="max-w-[54ch]"
        image={{ src: "/uploads/amina-atar-4mEyvORkbN0-unsplash.jpg", alt: "" }}
        overlayOpacity={[0.93, 0.87, 0.96]}
        showNoise
        ctas={[
          { label: "Request Vehicle Sourcing", href: "/contact/#form" },
          { label: "Discuss Export Requirements", href: "https://wa.me/971544144755", tone: "secondary", external: true },
        ]}
      />
    </>
  );
}
