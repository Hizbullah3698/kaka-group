import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: ReactNode;
  tone?: "primary" | "secondary";
  /** Secondary buttons render differently over a dark background vs. a light one. Ignored for primary (the gold fill works on both). */
  onDark?: boolean;
  showArrow?: boolean;
  /**
   * Opens in a new tab with `rel="noopener noreferrer"` — for the WhatsApp
   * CTA that recurs across pages (Real Estate's Consultation CTA, Dry
   * Fruits' hero and Wholesale CTA). Confirmed needed in two separate
   * places before adding this, rather than reaching for it on the first.
   */
  external?: boolean;
  className?: string;
}

/**
 * The one button/link style used everywhere: gold-filled primary CTA, and an
 * outlined secondary. Shared across PageHero's CTA pair, ParallaxCta and
 * every other CTA on the site so they can't drift out of sync with each
 * other.
 */
export function Button({
  href,
  children,
  tone = "primary",
  onDark = false,
  showArrow = false,
  external = false,
  className,
}: ButtonProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : undefined;

  if (tone === "primary") {
    return (
      <Link
        href={href}
        {...externalProps}
        className={cn(
          // `text-body`'s bundled 1.875 line-height is sized for flowing
          // paragraph copy — on a single-line button label it padded the box
          // out well past source's own height (~51px confirmed in
          // KAKA Group - Home.dc.html vs. ~64px here). `leading-none` keeps
          // text-body's correct 16px size while dropping the paragraph
          // line-height; source also carries no explicit font-weight
          // (regular, not medium), so this drops `font-medium` to match.
          "flex w-max items-center gap-3.5 rounded bg-gold px-8 py-4 text-body leading-none uppercase tracking-[.08em] text-ink shadow-gold transition duration-220 ease-kaka hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-gold-hover sm:w-max",
          "max-sm:w-full max-sm:justify-center",
          className
        )}
      >
        {children}
        {showArrow && <span aria-hidden="true">&#8594;</span>}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      {...externalProps}
      className={cn(
        "w-max rounded border px-8 py-4 text-center text-body leading-none uppercase tracking-[.08em] transition duration-220 ease-kaka hover:-translate-y-0.5",
        "max-sm:w-full",
        onDark
          ? "border-cream/40 text-cream hover:border-gold hover:bg-cream/10"
          : "border-ink/20 text-ink hover:border-gold hover:bg-ink/5",
        className
      )}
    >
      {children}
    </Link>
  );
}
