import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { DivisionRow } from "@/features/divisions/DivisionRow";
import { AboutParallaxImages } from "@/features/home/AboutParallaxImages";
import { AboutStatBlock } from "@/features/home/AboutStatBlock";
import { homeDivisions } from "@/features/home/divisionsContent";
import { HeroDivisionBar } from "@/features/home/HeroDivisionBar";
import { HomeCtaBand } from "@/features/home/HomeCtaBand";
import { SectorsGrid } from "@/features/home/SectorsGrid";
import { WhyChooseGrid } from "@/features/home/WhyChooseGrid";
import { getJsonLdGraph } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/sections/PageHero";
import { SectionHeader } from "@/sections/SectionHeader";

export const metadata: Metadata = buildPageMetadata("home");

const HERO_SLIDES = [
  { src: "/uploads/dubai-real-estate-houses.jpg.jpg", alt: "Dubai development with the city skyline beyond" },
  { src: "/uploads/modern-villa.jpg.jpg", alt: "Luxury villa development at golden hour" },
  { src: "/uploads/dry%20fruits.jpg", alt: "Dried fruit and nuts prepared for export" },
  { src: "/uploads/commercial%20fleet%20management%20UAE.jpg", alt: "Commercial fleet lined up at a depot" },
  { src: "/uploads/car-standing-garage.jpg.jpg", alt: "Vehicle in a workshop bay" },
  { src: "/uploads/vehicle%20import%20and%20export.jpg", alt: "Container and vehicle terminal" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd graph={getJsonLdGraph("home")} />

      <PageHero
        variant="photo"
        height="full"
        eyebrow="Established in Deira, Dubai"
        eyebrowTracking="wide"
        heading={["Five Industries.", "One Name You", "Can Trust."]}
        lead="A Dubai business group of five companies: property, trading, fleet, automotive and vehicle export."
        image={HERO_SLIDES}
        ctas={[
          { label: "Explore Our Businesses", href: "#divisions" },
          { label: "Contact Us", href: "/contact/", tone: "secondary" },
        ]}
      >
        <HeroDivisionBar />
      </PageHero>

      <section
        id="about"
        className="relative bg-[radial-gradient(rgba(15,23,42,.05)_1px,transparent_1px)] [background-size:26px_26px]"
      >
        <div className="wrap grid items-center gap-[90px] py-section-sm [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))] sm:py-section-md lg:py-section-lg">
          <AboutParallaxImages />
          <div>
            <SectionHeader
              eyebrow="About the Group"
              heading="Built on trade, kept on our word."
              headingClassName="max-w-[20ch] text-[clamp(29px,3vw,43px)]/[1.2]"
            />
            <RevealOnScroll delay={90}>
              <p className="mt-6 text-lead text-graphite">
                KAKA Group grew out of the trading houses of Deira, where an agreement was worth exactly as much as
                the person who made it. That is still how we work. Five companies under one name, each run by
                people who know their market and answer for their results.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={150}>
              <p className="mb-10 mt-[22px] text-lead text-graphite">
                From property in Dubai to vehicles moving through Jebel Ali and containers of dried fruit crossing
                the Gulf, our clients deal with one group and one standard of service.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={220} className="mb-10">
              <AboutStatBlock
                stats={[
                  { value: "05", label: "Divisions" },
                  { value: "01", label: "Group standard" },
                  { value: "GCC", label: "& beyond" },
                ]}
              />
            </RevealOnScroll>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-3 text-body text-gold-dark transition-colors duration-220 ease-kaka hover:text-gold"
            >
              Speak with the group <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="h-px bg-gradient-to-r from-gold/0 via-gold/55 to-gold/0" />
      </section>

      <section id="divisions" className="bg-white">
        <div className="wrap flex flex-wrap items-end justify-between gap-9 pb-11 pt-section-sm sm:pt-section-md lg:pt-section-lg">
          <SectionHeader
            eyebrow="Our Divisions"
            heading="Five businesses, each with its own specialists."
            headingClassName="max-w-[22ch] text-[clamp(29px,3vw,43px)]/[1.2]"
          />
          <RevealOnScroll delay={90}>
            <p className="max-w-[36ch] text-body-lg text-graphite">
              Every division holds its own licences, staff and client relationships, and all of them work to the
              same terms of business.
            </p>
          </RevealOnScroll>
        </div>

        {homeDivisions.map((division, index) => (
          <DivisionRow
            key={division.href}
            item={division}
            id={division.id}
            reverse={index % 2 === 1}
            tone={index % 2 === 1 ? "cream" : "white"}
          />
        ))}
      </section>

      <section className="relative overflow-hidden bg-ink [background-image:linear-gradient(rgba(201,164,92,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(201,164,92,.05)_1px,transparent_1px)] [background-size:96px_96px]">
        <div className="wrap relative py-section-sm sm:py-section-md lg:py-section-lg">
          <SectionHeader
            eyebrow="Why Choose KAKA"
            heading="What clients come back for."
            tone="dark"
            headingClassName="mb-[70px] max-w-[24ch] text-[clamp(29px,3vw,43px)]/[1.2]"
          />
          <WhyChooseGrid />
        </div>
      </section>

      <section className="bg-cream">
        <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
          <div className="mb-[60px] flex flex-wrap items-end justify-between gap-9">
            <SectionHeader
              eyebrow="Industries We Serve"
              heading="Sectors we work in every week."
              headingClassName="max-w-[22ch] text-[clamp(29px,3vw,43px)]/[1.2]"
            />
            <RevealOnScroll delay={80}>
              <p className="max-w-[34ch] text-body-lg text-graphite">
                Government fleets, contractors, hotels, food wholesalers, shippers and private families, often in
                the same week.
              </p>
            </RevealOnScroll>
          </div>
          <SectorsGrid />
        </div>
      </section>

      <HomeCtaBand />
    </>
  );
}
