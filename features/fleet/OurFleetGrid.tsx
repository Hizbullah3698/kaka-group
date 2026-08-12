import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { blurPlaceholders } from "@/lib/blurPlaceholders";

interface FleetTile {
  image: { src: string; alt: string };
  title: string;
  tag: string;
  /** Every second tile drops down on desktop — matches source's `data-offset` (`margin-top:56px`). */
  offset?: boolean;
  /** Poster-style images that must stay fully visible rather than crop-filled like the fleet photos. */
  contain?: boolean;
}

const TILES: FleetTile[] = [
  {
    image: { src: "/uploads/swiftmaxdelivery.jpg", alt: "Delivery Motorcycles" },
    title: "Delivery Motorcycles",
    tag: "Last-mile · food platforms",
    contain: true,
  },
  {
    image: { src: "/uploads/swiftmaxrider.jpg", alt: "Electric Bikes" },
    title: "Electric Bikes",
    tag: "Zoned urban delivery",
    offset: true,
    contain: true,
  },
  {
    image: { src: "/uploads/noon%20bike%20image.jpg", alt: "Delivery Cars" },
    title: "Delivery Cars",
    tag: "Grocery · multi-drop batches",
  },
  {
    image: { src: "/uploads/white%20delivery%20van.jpg", alt: "Commercial Vans" },
    title: "Commercial Vans",
    tag: "Distribution · bulk loads",
    offset: true,
  },
];

/**
 * "Our Fleet" — the 4-tile offset image grid, plus the full-width feature
 * banner underneath (business fleet vehicles, text panel over a
 * left-to-right gradient).
 *
 * The tile grid was originally written as a shared `sections/StaggeredImageGrid`
 * before Fleet Management's actual source had been read, citing this exact
 * section as "confirmed" — that was a prediction, not a confirmation (this
 * page hadn't been built yet), and it was the component's only usage
 * anywhere in the project. Per the project's rule (shared components need
 * two confirmed usages, and are never kept on a predicted match), it's
 * relocated here as page-specific. Move it back to `sections/` if a second
 * page genuinely turns out to need the same offset-tile-grid shape.
 */
export function OurFleetGrid() {
  return (
    <>
      <div className="grid gap-7" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))" }}>
        {TILES.map((tile) => (
          <RevealOnScroll key={tile.title} className={tile.offset ? "sm:mt-14" : undefined}>
            <div className="relative h-[400px] overflow-hidden border border-gold/30 bg-ink-deep">
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                placeholder="blur"
                blurDataURL={blurPlaceholders[tile.image.src]}
                fill
                sizes="(min-width: 1200px) 24vw, (min-width: 768px) 45vw, 100vw"
                className={
                  tile.contain
                    ? "object-contain transition-transform duration-1200 ease-kaka hover:scale-105"
                    : "object-cover transition-transform duration-1200 ease-kaka hover:scale-105"
                }
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-deep/0 from-45% to-ink-deep/80"
              />
            </div>
            <div className="-mt-px flex items-baseline justify-between gap-5 border-t border-gold/[.28] pt-5">
              <span className="font-display text-[23px] text-cream">{tile.title}</span>
              <span className="text-right font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold/85">
                {tile.tag}
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll className="relative mt-20 overflow-hidden border border-gold/30">
        <Image
          src="/uploads/delivery%20fleet%20UAE.png"
          alt="Business fleet vehicles in KAKA Group livery"
          placeholder="blur"
          blurDataURL={blurPlaceholders["/uploads/delivery%20fleet%20UAE.png"]}
          width={1400}
          height={420}
          sizes="100vw"
          className="h-[420px] w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(11,18,32,.9) 0%, rgba(11,18,32,.6) 44%, rgba(11,18,32,.12) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex max-w-[520px] flex-col justify-center px-8 sm:px-[clamp(32px,5vw,64px)]">
          <span className="mb-5 font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold/90">
            Business Fleet Vehicles
          </span>
          <h3 className="mb-[18px] font-display text-[clamp(24px,2.4vw,34px)] leading-[1.22] text-cream">
            Liveried, registered and ready before your first shift.
          </h3>
          <p className="m-0 text-body text-cream/75">
            Corporate fleets prepared to your specification: branding, telematics, insurance and handover
            documentation completed as one package.
          </p>
        </div>
      </RevealOnScroll>
    </>
  );
}
