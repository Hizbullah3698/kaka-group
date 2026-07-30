import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

interface PhotoLine {
  name: string;
  origin: string;
  image: { src: string; alt: string };
}

interface TextLine {
  name: string;
  origin: string;
}

const PHOTO_LINES: PhotoLine[] = [
  { name: "Almonds", origin: "California · Spain", image: { src: "/uploads/premium%20almonds.jpg", alt: "Almonds" } },
  { name: "Cashews", origin: "Vietnam · India · West Africa", image: { src: "/uploads/cashews.jpg.jpg", alt: "Cashews" } },
  {
    name: "Walnuts",
    origin: "Chile · California · Kashmir",
    image: { src: "/uploads/Walnut.jpg-270dd042.jpg", alt: "Walnuts" },
  },
  {
    name: "Pistachios",
    origin: "Iran · Türkiye · California",
    image: { src: "/uploads/general-trading-pistachios.jpg.jpg", alt: "Pistachios" },
  },
];

const TEXT_LINES: TextLine[] = [
  { name: "Raisins", origin: "Iran · Türkiye · India" },
  { name: "Dates", origin: "UAE · Saudi Arabia · Tunisia" },
  { name: "Figs", origin: "Türkiye" },
  { name: "Hazelnuts", origin: "Türkiye · Georgia" },
  { name: "Pecans", origin: "United States · South Africa" },
  { name: "Pine Nuts", origin: "Pakistan · Afghanistan · China" },
];

/**
 * "Product Portfolio" — a header (SectionHeader + "request the grade sheet"
 * link), then four full-bleed photo tiles that break out of the content
 * width entirely (no `.wrap` around them, matching source's flush layout),
 * then six plain text rows back inside the normal content width. Manages
 * its own internal wrapping rather than being wrapped in one `.wrap` by the
 * page, since the middle piece genuinely isn't width-constrained in source.
 */
export function ProductPortfolio() {
  return (
    <div>
      <div className="wrap pt-section-sm sm:pt-section-md lg:pt-section-lg">
        <div className="mb-[60px] flex flex-wrap items-end justify-between gap-7">
          <SectionHeader eyebrow="Portfolio" heading="Ten lines, graded and sized to your specification." headingClassName="max-w-[16ch]" tone="dark" />
          <Link
            href="#quote"
            className="w-max border-b border-gold/50 pb-1.5 text-small uppercase tracking-[.14em] text-gold transition-colors duration-220 ease-kaka hover:border-gold-hover"
          >
            Request the grade sheet
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-gold/[.18] sm:grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        {PHOTO_LINES.map((line) => (
          <RevealOnScroll key={line.name} className="relative h-[280px] overflow-hidden border border-gold/28 sm:h-[340px]">
            <Image src={line.image.src} alt={line.image.alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-deep/0 to-ink-deep/[.86]"
              style={{ backgroundImage: "linear-gradient(180deg, rgba(11,18,32,0) 40%, rgba(11,18,32,.86) 100%)" }}
            />
            <span className="pointer-events-none absolute bottom-6 left-[26px]">
              <span className="block font-display text-[26px] text-cream">{line.name}</span>
              <span className="mt-2.5 block font-mono text-[9px] uppercase tracking-[.24em] text-gold/90">
                {line.origin}
              </span>
            </span>
          </RevealOnScroll>
        ))}
      </div>

      <div className="wrap pb-section-sm pt-24 sm:pb-section-md lg:pb-section-lg">
        <div className="grid gap-0 sm:grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] sm:gap-x-[72px]">
          {TEXT_LINES.map((line, index) => (
            <RevealOnScroll
              key={line.name}
              delay={index * 50}
              className="flex items-baseline justify-between gap-6 border-b border-gold/20 py-[22px]"
            >
              <span className="font-display text-[22px] text-cream">{line.name}</span>
              <span className="text-right font-mono text-[9px] uppercase tracking-[.24em] text-cream/55">
                {line.origin}
              </span>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
