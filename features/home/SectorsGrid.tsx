import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

interface Sector {
  eyebrow: string;
  title: string;
  description?: string;
  image: { src: string; alt: string };
  large?: boolean;
}

const SECTORS: Sector[] = [
  {
    eyebrow: "Public & Private Property",
    title: "Government, developers and property owners",
    description:
      "Leasing mandates, tenancy management and portfolio work for public bodies, developers and family estates.",
    image: {
      src: "/uploads/dubai-real-estate-houses.jpg.jpg",
      alt: "Dubai skyline beyond a residential district",
    },
    large: true,
  },
  {
    eyebrow: "02",
    title: "Food Distribution & Retail",
    image: { src: "/uploads/dry%20fruits.jpg", alt: "Wholesale dried fruit and nuts" },
  },
  {
    eyebrow: "03",
    title: "Shipping & Freight",
    image: { src: "/uploads/vehicle%20import%20and%20export.jpg", alt: "Container terminal" },
  },
  {
    eyebrow: "04",
    title: "Construction & Contracting",
    image: { src: "/uploads/hero-section-image-vehicle.jpg", alt: "Commercial delivery truck" },
  },
  {
    eyebrow: "05",
    title: "Automotive Trade",
    image: { src: "/uploads/car-standing-garage.jpg.jpg", alt: "Workshop bay" },
  },
  {
    eyebrow: "06",
    title: "Hospitality & Private Clients",
    image: { src: "/uploads/modern-villa.jpg.jpg", alt: "Private villa" },
  },
];

/**
 * Home's "Sectors We Work In" — one large full-width tile followed by five
 * uniform tiles, each a full-bleed photo with text overlaid directly on the
 * image. No equivalent named section anywhere else in the page inventory, so
 * this stays Home-specific rather than becoming a shared primitive.
 */
export function SectorsGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))]">
      {SECTORS.map((sector, index) => (
        <RevealOnScroll key={sector.title} delay={index * 70} className={sector.large ? "sm:col-span-full" : undefined}>
          <Link
            href="/contact/"
            className={cn(
              "group relative flex items-end overflow-hidden rounded-lg border border-gold/35 bg-ink shadow-card-raised transition duration-420 ease-kaka hover:-translate-y-1.5 hover:border-gold/75 hover:shadow-[0_38px_80px_rgba(11,18,32,.28)]",
              sector.large ? "min-h-[430px]" : "min-h-[340px]"
            )}
          >
            <Image
              src={sector.image.src}
              alt={sector.image.alt}
              fill
              sizes={sector.large ? "100vw" : "(min-width: 768px) 32vw, 100vw"}
              className="object-cover transition-transform duration-[800ms] ease-kaka group-hover:scale-105"
            />
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-b to-ink-deep/[.92]",
                sector.large ? "from-ink-deep/15 via-ink-deep/55" : "from-ink-deep/10 via-ink-deep/60"
              )}
            />
            <span className={cn("relative", sector.large ? "p-11" : "p-8")}>
              <span className="mb-3.5 block font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold">
                {sector.eyebrow}
              </span>
              <span
                className={cn(
                  "block font-display leading-tight text-cream",
                  sector.large ? "max-w-[24ch] text-[clamp(24px,2.3vw,33px)]" : "text-[26px]"
                )}
              >
                {sector.title}
              </span>
              {sector.description && (
                <span className="mt-4 block max-w-[52ch] text-body font-light text-cream/72">
                  {sector.description}
                </span>
              )}
            </span>
          </Link>
        </RevealOnScroll>
      ))}
    </div>
  );
}
