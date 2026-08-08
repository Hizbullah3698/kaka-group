import Link from "next/link";
import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { blurPlaceholders } from "@/lib/blurPlaceholders";
import { cn } from "@/lib/utils";

interface FeatureCategory {
  kind: "feature";
  image: { src: string; alt: string; position?: string };
  title: string;
  description: string;
}

interface CellCategory {
  kind: "cell";
  image: { src: string; alt: string; position?: string };
  number: string;
  title: string;
  description: string;
}

type Category = FeatureCategory | CellCategory;

const CATEGORIES: Category[] = [
  {
    kind: "feature",
    image: { src: "/uploads/SUV.jpg", alt: "SUVs & Crossovers", position: "50% 62%" },
    title: "SUVs & Crossovers",
    description: "The strongest demand across Georgia and Iraq, sourced in the trims and drivetrains those markets actually want.",
  },
  {
    kind: "cell",
    image: { src: "/uploads/sedans.jpg", alt: "Sedans", position: "50% 58%" },
    number: "01",
    title: "Sedans",
    description: "Volume models with parts availability and service history that travels.",
  },
  {
    kind: "cell",
    image: { src: "/uploads/luxery%20vehicles.jpg", alt: "Luxury Vehicles", position: "50% 55%" },
    number: "02",
    title: "Luxury Vehicles",
    description: "German and Japanese executive models, condition-verified before bidding.",
  },
  {
    kind: "cell",
    image: { src: "/uploads/american%20pickups.jpg", alt: "Pickups", position: "50% 55%" },
    number: "03",
    title: "Pickups",
    description: "Full-size American pickups, the backbone of regional light commercial demand.",
  },
  {
    kind: "cell",
    image: { src: "/uploads/light%20trucks.jpg", alt: "Commercial Vehicles", position: "55% 50%" },
    number: "04",
    title: "Commercial Vehicles",
    description: "Vans and light trucks for fleets, sourced to a repeatable specification.",
  },
  {
    kind: "feature",
    image: { src: "/uploads/Rows%20of%20vehicles%20at%20an%20auction%20yard..jpg", alt: "Auction Vehicles" },
    title: "Auction Vehicles",
    description: "Insurance and dealer auction stock, inspected, photographed and reported honestly, including the damage.",
  },
];

/**
 * "Vehicle Categories" — an asymmetric 6-tile grid: two full-bleed
 * "feature" tiles (SUVs & Crossovers, Auction Vehicles) spanning 2 grid
 * columns at 420px tall, bracketing four regular numbered tiles at 300px.
 * The 2-column span collapses to 1 on mobile, per source's `[data-span2]`
 * override. New shape on the site so far — no other grid mixes a spanning
 * tile with regular ones — so built page-specific rather than stretched
 * out of `CellGrid` (which has no concept of a wide tile) or
 * `StaggeredImageGrid`'s successor `OurFleetGrid` (offset via margin, not
 * column span).
 */
export function VehicleCategoryGrid() {
  return (
    <div>
      <div className="mb-[30px] flex items-center gap-[18px]">
        <span aria-hidden="true" className="block h-px w-14 bg-gold" />
        <span className="font-mono text-eyebrow uppercase text-gold">Vehicle Categories</span>
      </div>
      <div className="mb-[60px] flex flex-wrap items-end justify-between gap-7">
        <h2 className="m-0 max-w-[16ch] font-display text-h2 text-cream">
          Whatever the destination market asks for.
        </h2>
        <Link
          href="#sourcing"
          className="border-b border-gold/50 pb-1.5 text-[14px] uppercase tracking-[.14em] text-gold transition-colors duration-220 ease-kaka hover:border-gold-hover hover:text-gold-hover"
        >
          Send us your specification
        </Link>
      </div>
      <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
      {CATEGORIES.map((category) =>
        category.kind === "feature" ? (
          <RevealOnScroll key={category.title} className="col-span-1 sm:col-span-2">
            <Link
              href="#sourcing"
              className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden border border-gold/[.26] transition-colors duration-300 ease-kaka hover:border-gold/70"
            >
              <Image
                src={category.image.src}
                alt={category.image.alt}
                placeholder="blur"
                blurDataURL={blurPlaceholders[category.image.src]}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover"
                style={category.image.position ? { objectPosition: category.image.position } : undefined}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(11,18,32,.1) 30%, rgba(11,18,32,.55) 66%, rgba(11,18,32,.93) 100%)",
                }}
              />
              <span className="relative max-w-[44ch] p-[40px_34px]">
                <span className="mb-2.5 block font-display text-[29px] text-cream">{category.title}</span>
                <span className="block text-[15.5px] font-light leading-[1.75] text-cream/74">
                  {category.description}
                </span>
              </span>
            </Link>
          </RevealOnScroll>
        ) : (
          <RevealOnScroll key={category.title}>
            <Link
              href="#sourcing"
              className={cn(
                "group relative flex min-h-[300px] flex-col justify-end overflow-hidden border border-gold/[.22] bg-ink-card p-[34px_30px] transition-colors duration-300 ease-kaka hover:border-gold/60"
              )}
            >
              <Image
                src={category.image.src}
                alt={category.image.alt}
                placeholder="blur"
                blurDataURL={blurPlaceholders[category.image.src]}
                fill
                sizes="(min-width: 1200px) 24vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
                style={category.image.position ? { objectPosition: category.image.position } : undefined}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(11,18,32,.18) 24%, rgba(11,18,32,.6) 60%, rgba(11,18,32,.94) 100%)",
                }}
              />
              <span className="pointer-events-none absolute left-[30px] top-[30px] font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold/90">
                {category.number}
              </span>
              <span className="relative">
                <span className="mb-2.5 block font-display text-[24px] text-cream">{category.title}</span>
                <span className="block text-[15px] font-light leading-[1.75] text-cream/74">
                  {category.description}
                </span>
              </span>
            </Link>
          </RevealOnScroll>
        )
      )}
      </div>
    </div>
  );
}
