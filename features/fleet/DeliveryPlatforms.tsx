import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const IMAGES = [
  { src: "/uploads/noon%20bike%20image.jpg", alt: "Riders working a delivery platform shift" },
  { src: "/uploads/talabat.jpg", alt: "Delivery rider at a Dubai intersection" },
];

const PLATFORMS = [
  { name: "Talabat", description: "Food delivery fleets running peak-hour density across Dubai and the Northern Emirates." },
  { name: "Noon", description: "Grocery and e-commerce batches requiring cars and vans alongside two-wheelers." },
  { name: "Careem", description: "Mobility and courier services where vehicle availability decides driver earnings." },
];

/**
 * "Delivery Platforms" — two flush full-bleed images, then a `.wrap`
 * panel (intro beside a 4-cell hairline grid) sitting on the same
 * `ink-card` background as the section itself. The 4th cell is a
 * disclaimer line with no title/description pair, which is why this isn't
 * built on `CellGrid` (its `CellGridItem` requires both fields) — this was
 * the exact irregularity that ruled out reviving `CellGrid`'s old "dark"
 * variant during the cleanup pass; see that component's doc comment.
 */
export function DeliveryPlatforms() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
        {IMAGES.map((image) => (
          <div key={image.src} className="relative h-[280px] overflow-hidden sm:h-auto sm:min-h-[420px]">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: "linear-gradient(180deg, rgba(11,18,32,.42), rgba(11,18,32,.68))" }}
            />
          </div>
        ))}
      </div>

      <div className="wrap pb-0 pt-[86px] sm:pb-section-lg sm:pt-[120px]">
        <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))] sm:gap-14 lg:gap-[76px]">
          <div>
            <SectionHeader
              eyebrow="Delivery Ecosystems"
              heading="Behind the platforms people order from."
              headingClassName="max-w-[16ch]"
              tone="dark"
            />
            <RevealOnScroll delay={90}>
              <p className="mt-6 max-w-[44ch] text-lead text-cream/72">
                KAKA Group supplies and manages vehicles used on the UAE&rsquo;s major delivery networks. We are the
                fleet layer. The platform handles the orders; we make sure a working vehicle is under every rider.
              </p>
            </RevealOnScroll>
          </div>
          <div className="grid gap-px border border-gold/[.24] bg-gold/[.24]">
            {PLATFORMS.map((platform, index) => (
              <RevealOnScroll key={platform.name} delay={index * 60} className="bg-ink-card p-[30px_22px] sm:p-[30px_32px]">
                <div className="mb-2.5 font-display text-[21px] text-cream">{platform.name}</div>
                <div className="text-[15.5px] font-light leading-[1.8] text-cream/66">{platform.description}</div>
              </RevealOnScroll>
            ))}
            <RevealOnScroll delay={PLATFORMS.length * 60} className="bg-ink-card p-[30px_22px] sm:p-[30px_32px]">
              <p className="m-0 font-mono text-[9px] uppercase leading-[2] tracking-eyebrow-tight text-gold/75">
                Platform names indicate the delivery networks our fleets operate on, not an endorsement or exclusive
                arrangement
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </>
  );
}
