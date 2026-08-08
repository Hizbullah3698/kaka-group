import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { blurPlaceholders } from "@/lib/blurPlaceholders";
import { cn } from "@/lib/utils";

interface OpportunityStat {
  label: string;
  value: string;
}

interface Opportunity {
  tag: string;
  title: string;
  image: { src: string; alt: string };
  stats: OpportunityStat[];
  reverse?: boolean;
}

const OPPORTUNITIES: Opportunity[] = [
  {
    tag: "Sample 01 · Business Bay",
    title: "Fitted Grade-A office floor, ready to occupy",
    image: { src: "/uploads/commercial%20office%20interior.jpg", alt: "Fitted office floor with meeting rooms" },
    stats: [
      { label: "Type", value: "Office" },
      { label: "Size", value: "3,400 sq ft" },
      { label: "Status", value: "Ready" },
      { label: "Horizon", value: "Occupier" },
    ],
  },
  {
    tag: "Sample 02 · Tilal Al Ghaf",
    title: "Five-bedroom family villa with private pool",
    image: { src: "/uploads/villa%20with%20pool-f641d86a.jpg", alt: "Villa with landscaped garden and pool" },
    stats: [
      { label: "Type", value: "Villa" },
      { label: "Size", value: "5,800 sq ft" },
      { label: "Status", value: "Ready" },
      { label: "Horizon", value: "End use" },
    ],
    reverse: true,
  },
  {
    tag: "Sample 03 · Business Bay",
    title: "Branded off-plan release, launch allocation",
    image: { src: "/uploads/luxury%20office%20reception.jpg", alt: "Branded residence lobby interior" },
    stats: [
      { label: "Type", value: "Off-plan" },
      { label: "Plan", value: "60/40" },
      { label: "Handover", value: "Q4 2028" },
      { label: "Horizon", value: "Growth" },
    ],
  },
];

/**
 * "Featured Opportunities" — three alternating image/panel articles on a
 * dark background, each panel holding a title and a 4-cell mini stat grid
 * (label above value, hairline seams) plus a text CTA. No existing primitive
 * covers this: it isn't CellGrid or StatBlock (both are page-level grids,
 * not something nested inside a card), and the image+panel article shape
 * doesn't recur elsewhere yet. Page-specific, with a local `Opportunity`
 * type rather than reusing `Stat` — these label/value pairs are a different
 * shape (short caption + short value in a nested cell, not a headline
 * number).
 */
export function OpportunityShowcase() {
  return (
    <div className="grid gap-7">
      {OPPORTUNITIES.map((opportunity, index) => (
        <RevealOnScroll key={opportunity.tag}>
          <article
            className="grid overflow-hidden rounded-lg border border-gold/28 bg-ink-card [grid-template-columns:repeat(auto-fit,minmax(min(480px,100%),1fr))]"
          >
            <div
              className={cn(
                "relative h-[280px] sm:min-h-[420px] sm:h-auto overflow-hidden",
                opportunity.reverse && "sm:order-2"
              )}
            >
              <Image
                src={opportunity.image.src}
                alt={opportunity.image.alt}
                placeholder="blur"
                blurDataURL={blurPlaceholders[opportunity.image.src]}
                fill
                sizes="(min-width: 768px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-[76px_22px] sm:p-[64px_56px]">
              <span className="mb-6 font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold">
                {opportunity.tag}
              </span>
              <h3 className="m-0 mb-[26px] max-w-[18ch] font-display text-[clamp(26px,2.4vw,34px)] leading-tight text-cream">
                {opportunity.title}
              </h3>
              <div className="mb-[34px] grid gap-px border border-gold/[.22] bg-gold/[.22] [grid-template-columns:repeat(auto-fit,minmax(min(120px,100%),1fr))]">
                {opportunity.stats.map((stat) => (
                  <div key={stat.label} className="bg-ink-card p-[20px_18px]">
                    <div className="mb-2.5 font-mono text-[9px] uppercase tracking-[.24em] text-gold/80">
                      {stat.label}
                    </div>
                    <div className="text-body font-light text-cream">{stat.value}</div>
                  </div>
                ))}
              </div>
              <Link
                href="#consult"
                className="w-max border-b border-gold/50 pb-1.5 text-small uppercase tracking-[.14em] text-gold transition-colors duration-220 ease-kaka hover:border-gold-hover hover:text-gold-hover"
              >
                Request the full brief
              </Link>
            </div>
          </article>
        </RevealOnScroll>
      ))}
    </div>
  );
}
