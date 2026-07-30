import type { ReactNode } from "react";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  heading: ReactNode;
  /** Overrides the heading's own max-width, independent of the description's — several sections cap these to different ch values (e.g. a 15ch heading beside a 44ch description). */
  headingClassName?: string;
  description?: ReactNode;
  /** Overrides the description paragraph's max-width — see `headingClassName`. Confirmed needed once the heading and description diverge in width (Real Estate's Why Invest, Dry Fruits' Trading Excellence). */
  descriptionClassName?: string;
  /** "dark" for sections on an ink background; "light" (default) for cream/white. */
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3";
  id?: string;
  className?: string;
}

/**
 * Gold rule + monospace eyebrow + serif heading, with an optional lead
 * paragraph underneath. Used at the top of nearly every section. Kept
 * single-purpose: page-level layouts that put a description *beside* the
 * heading instead of below it (e.g. Fleet's "Fleet Solutions" intro) compose
 * that themselves around this component rather than this component growing
 * a layout-variant prop for it.
 */
export function SectionHeader({
  eyebrow,
  heading,
  headingClassName,
  description,
  descriptionClassName,
  tone = "light",
  headingLevel = "h2",
  id,
  className,
}: SectionHeaderProps) {
  const Heading = headingLevel;
  const eyebrowColor = tone === "dark" ? "text-gold" : "text-gold-dark";
  const headingColor = tone === "dark" ? "text-cream" : "text-ink";
  const descColor = tone === "dark" ? "text-cream/72" : "text-graphite";

  return (
    <div className={className}>
      <div className="mb-7 flex items-center gap-[18px]">
        <RevealOnScroll variant="line" className="block h-px w-14 bg-gold" />
        <span className={cn("font-mono text-eyebrow uppercase", eyebrowColor)}>{eyebrow}</span>
      </div>
      <RevealOnScroll>
        <Heading id={id} className={cn("m-0 font-display text-h2", headingColor, headingClassName)}>
          {heading}
        </Heading>
      </RevealOnScroll>
      {description && (
        <RevealOnScroll delay={90}>
          <p className={cn("mt-6 text-lead", descColor, descriptionClassName)}>{description}</p>
        </RevealOnScroll>
      )}
    </div>
  );
}
