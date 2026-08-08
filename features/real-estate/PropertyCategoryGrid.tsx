import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { blurPlaceholders } from "@/lib/blurPlaceholders";
import { cn } from "@/lib/utils";

interface Category {
  title: string;
  description: string;
  image: { src: string; alt: string; objectPosition?: string };
}

const LARGE: Category[] = [
  {
    title: "Villas",
    description: "Family homes in Arabian Ranches, Damac Hills, Tilal Al Ghaf and the Palm.",
    image: { src: "/uploads/modern-villa.jpg.jpg", alt: "Villa exterior at golden hour" },
  },
  {
    title: "Apartments",
    description: "Downtown, Business Bay, Marina and Creek Harbour: the yield core of most portfolios.",
    image: { src: "/uploads/luxury%20residential%20development.jpg", alt: "Residential towers on Sheikh Zayed Road" },
  },
];

const REGULAR: Category[] = [
  {
    title: "Townhouses",
    description: "Entry into family communities with villa living at apartment economics.",
    image: { src: "/uploads/dubai-real-estate-houses.jpg.jpg", alt: "Townhouse community with the skyline beyond" },
  },
  {
    title: "Commercial",
    description: "Offices, retail units and warehousing for occupiers and income investors.",
    image: { src: "/uploads/luxury%20office%20building.jpg", alt: "Commercial building with retail frontage" },
  },
  {
    title: "Plots",
    description: "Freehold land for build-to-own and developer joint ventures.",
    image: {
      src: "/uploads/Dubai%20skyline%20land.jpg",
      alt: "Development land against the Dubai skyline",
      objectPosition: "50% 78%",
    },
  },
  {
    title: "Off-plan Developments",
    description: "Launch-day allocations with Emaar, Sobha, Nakheel, Danube, Binghatti and Ellington.",
    image: { src: "/uploads/modern%20construction%20site.jpg", alt: "Tower under construction in Dubai" },
  },
];

function CategoryCard({ category, tall, sizes }: { category: Category; tall: boolean; sizes: string }) {
  return (
    <RevealOnScroll>
      <Link
        href="#consult"
        className={cn(
          "group relative flex flex-col justify-end overflow-hidden rounded-lg border border-ink/10 bg-ink transition duration-300 ease-kaka hover:border-gold/60 hover:shadow-[0_26px_60px_rgba(11,18,32,.22)]",
          tall ? "h-[480px]" : "h-[280px] sm:h-[340px]"
        )}
      >
        <Image
          src={category.image.src}
          alt={category.image.alt}
          placeholder="blur"
          blurDataURL={blurPlaceholders[category.image.src]}
          fill
          sizes={sizes}
          style={category.image.objectPosition ? { objectPosition: category.image.objectPosition } : undefined}
          className="object-cover transition-transform duration-900 ease-kaka"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-deep/5 via-ink-deep/55 to-ink-deep/[.92]"
        />
        <span className="relative p-[30px_22px] sm:p-[34px_30px]">
          <span className="mb-2.5 block font-display text-[25px] text-cream">{category.title}</span>
          <span className="block max-w-[34ch] text-body font-light text-cream/72">{category.description}</span>
          <span aria-hidden="true" className="mt-5 block h-px w-12 bg-gold" />
        </span>
      </Link>
    </RevealOnScroll>
  );
}

/**
 * "Property Categories" — two size tiers of full-bleed photo cards (2 tall,
 * then 4 shorter), all linking to the consultation form. Visually related to
 * Home's SectorsGrid (full-bleed photo + gradient + overlaid text) but with a
 * fixed two-row size hierarchy rather than one large tile plus a uniform
 * row, and no shared eyebrow numbering — different enough, and SectorsGrid
 * is itself still Home-specific, that this stays its own component rather
 * than reusing or promoting either.
 */
export function PropertyCategoryGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        {LARGE.map((category) => (
          <CategoryCard key={category.title} category={category} tall sizes="(min-width: 768px) 48vw, 100vw" />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
        {REGULAR.map((category) => (
          <CategoryCard key={category.title} category={category} tall={false} sizes="(min-width: 768px) 24vw, 100vw" />
        ))}
      </div>
    </div>
  );
}
