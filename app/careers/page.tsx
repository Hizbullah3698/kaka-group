import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { CareersCtaBand } from "@/features/careers/CareersCtaBand";
import { CurrentOpeningsPanel } from "@/features/careers/CurrentOpeningsPanel";
import { DivisionHiringGrid } from "@/features/careers/DivisionHiringGrid";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/sections/PageHero";

export const metadata: Metadata = buildPageMetadata("careers");

export default function CareersPage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("careers")} />

      <PageHero
        variant="plain"
        eyebrow="Careers"
        heading="Work Across Five Industries"
        lead="Our teams are small and the work is real: a broker closing a lease, a trader tracking a container out of Kandahar, a technician signing off a gearbox. People here are trusted with their own accounts early and judged on how they handle them."
      />

      <section className="border-b border-gold/30 bg-white">
        <DivisionHiringGrid />
      </section>

      <section className="border-b border-gold/30 bg-cream">
        <CurrentOpeningsPanel />
      </section>

      <CareersCtaBand />
    </>
  );
}
