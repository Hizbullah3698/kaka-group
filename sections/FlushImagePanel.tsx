import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/sections/SectionHeader";

interface FlushImagePanelProps {
  image: { src: string; alt: string };
  /** Desktop/tablet floor height in px — 560 on Dry Fruits' Quality Assurance, 620 on Fleet's Maintenance, 620 on Automotive's Vehicle Care Standards. Mobile is fixed at 260px per the source's `[data-tall]` override, same on all three. */
  imageMinHeight?: number;
  /** Full CSS `background-image` gradient value. Differs per instance because it has to blend into whatever background color the panel side sits on, and which direction the panel sits in. */
  imageGradient: string;
  /** Which side the image renders on. "left" (default — Quality Assurance, Maintenance) or "right" (Automotive's Vehicle Care Standards, confirmed as a genuine mirrored instance, not a guess). */
  imageSide?: "left" | "right";
  /** "dark" for an ink-background panel (Fleet's Maintenance, Automotive's Vehicle Care Standards); "light" (default) for cream (Dry Fruits' Quality Assurance). */
  tone?: "light" | "dark";
  eyebrow: string;
  heading: string;
  /** Overrides the heading's max-width — 17ch on Quality Assurance and Maintenance, 18ch on Vehicle Care Standards. Confirmed to differ per instance rather than assumed shared. */
  headingClassName?: string;
  lead: string;
  /** Overrides the lead paragraph's max-width and the gap below it — 46ch/mb-10 on Quality Assurance, 44ch/mb-5 on Maintenance and Vehicle Care Standards. */
  leadClassName?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Flush 2-column image | panel shell — no `.wrap` around the pair, image on
 * an auto-fit `minmax(min(480px,100%),1fr)` column that stacks under the
 * panel on mobile. Confirmed on 3 pages: Dry Fruits Trading's "Quality
 * Assurance" (light tone, image left), Fleet Management's "Maintenance"
 * (dark tone, image left) and Automotive Garage's "Vehicle Care Standards"
 * (dark tone, image right — mirrored, hence `imageSide`). All three share
 * the exact panel padding (`120px clamp(40px,6vw,88px)`, `76px 22px` on
 * mobile) and the same non-standard heading size (`clamp(28px,2.8vw,42px)`,
 * smaller than the `text-h2` token), which is why this is its own primitive
 * rather than `SectionHeader` plus a hand-rolled grid on each page. The
 * heading/lead max-widths do genuinely vary per page, so — same as
 * `ParallaxCta` — those are exposed as className overrides rather than
 * smoothed into one fixed value.
 *
 * The body content below the lead paragraph (Quality Assurance's hairline
 * checklist grid, Maintenance's and Vehicle Care Standards' bordered
 * title/description rows) differs page to page, so it stays page-specific
 * and is passed in as `children`.
 */
export function FlushImagePanel({
  image,
  imageMinHeight = 560,
  imageGradient,
  imageSide = "left",
  tone = "light",
  eyebrow,
  heading,
  headingClassName,
  lead,
  leadClassName,
  children,
  className,
}: FlushImagePanelProps) {
  const imageBlock = (
    <div
      className="relative h-[260px] overflow-hidden sm:h-auto sm:min-h-[var(--flush-image-min-h)]"
      style={{ ["--flush-image-min-h" as string]: `${imageMinHeight}px` }}
    >
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: imageGradient }}
      />
    </div>
  );

  const panelBlock = (
    <div className="flex flex-col justify-center p-[76px_22px] sm:p-[120px_clamp(40px,6vw,88px)]">
      <SectionHeader
        eyebrow={eyebrow}
        heading={heading}
        headingClassName={cn("max-w-[17ch] text-[clamp(28px,2.8vw,42px)] leading-[1.2]", headingClassName)}
        description={lead}
        descriptionClassName={cn("mb-10 max-w-[46ch]", leadClassName)}
        tone={tone}
      />
      {children}
    </div>
  );

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-stretch sm:grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))]",
        className,
      )}
    >
      {imageSide === "left" ? (
        <>
          {imageBlock}
          {panelBlock}
        </>
      ) : (
        <>
          {panelBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}
