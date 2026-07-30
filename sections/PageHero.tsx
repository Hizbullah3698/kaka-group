import Image from "next/image";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { noiseBackground } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import type { HeroCta, HeroSlide } from "@/types/hero";

import { HeroCrossfade } from "./HeroCrossfade";

interface PageHeroProps {
  /** "photo" (default): full-bleed dark image + overlays + mask-reveal type, per PageHero.dc.html hero sections. "plain": Careers-style — no photo, no overlay, no scroll cue. */
  variant?: "photo" | "plain";
  /** "full" = 100vh/min-780px (Home). "tall" = 100vh/min-660px (division pages). "short" = 64vh/min-520px (Contact). Ignored for "plain". */
  height?: "full" | "tall" | "short";
  eyebrow: string;
  /** The Home hero uses a wider 0.36em eyebrow tracking than the 0.34em default. */
  eyebrowTracking?: "default" | "wide";
  /** A string renders as one line. An array renders each entry as its own masked line, matching the per-line reveal in the approved design. */
  heading: string | string[];
  lead?: string;
  ctas?: HeroCta[];
  /** One slide renders a static `next/image`. More than one renders HeroCrossfade. Omit entirely for "plain". */
  image?: HeroSlide[];
  showScrollCue?: boolean;
  scrollCueHref?: string;
  /**
   * Overlay gradient layers stacked over the hero image. Defaults to Home's
   * own four-layer treatment (two linear gradients plus two radial gold/
   * vignette accents) — Home is the only page confirmed to use this
   * elaborate a stack. Real Estate, Dry Fruits Trading and Fleet Management
   * were all found (on direct inspection of their own source, not assumed
   * from Home) to use a simpler two-layer treatment instead: one angled
   * linear gradient and one vertical one, with slightly different angle and
   * opacity stops per page. Pass that page's own two gradients here rather
   * than accepting the Home-shaped default.
   */
  overlayGradients?: string[];
  /** The soft-light noise layer's opacity — 0.5 on Home, 0.42 confirmed on every division page built since. */
  noiseOpacity?: number;
  /**
   * Applies the `animate-ken-burns` pan/zoom to the single-image branch
   * only (`image.length === 1`). Confirmed once, on Contact's static hero
   * image — every crossfade hero (`image.length > 1`) renders through
   * `HeroCrossfade` instead, which owns its own slide timing and has no use
   * for this. Defaults to "none" so the six existing crossfade call sites
   * are unaffected.
   */
  imageAnimation?: "none" | "kenBurns";
  /** Escape hatch for page-specific hero extras that don't belong in a shared primitive — e.g. Home's division-indicator bar (built in features/divisions, Phase 5). Rendered inside the hero content column, after the CTAs. */
  children?: ReactNode;
  className?: string;
}

const HEIGHT_CLASSES: Record<NonNullable<PageHeroProps["height"]>, string> = {
  full: "h-auto min-h-[82svh] sm:h-screen sm:min-h-[780px] short-landscape:h-auto short-landscape:min-h-0",
  tall: "h-auto min-h-[82svh] sm:h-screen sm:min-h-[660px] short-landscape:h-auto short-landscape:min-h-0",
  short: "h-auto min-h-[82svh] sm:h-[64vh] sm:min-h-[520px] short-landscape:h-auto short-landscape:min-h-0",
};

// Home's own decorative overlay stack — exact gradient stops confirmed
// against Home's source. Kept as the default so Home's own call site (which
// predates the `overlayGradients` prop) doesn't need to change.
const HOME_OVERLAY_LAYERS = [
  "linear-gradient(102deg, rgba(11,18,32,.96) 0%, rgba(11,18,32,.86) 28%, rgba(11,18,32,.58) 62%, rgba(11,18,32,.34) 100%)",
  "linear-gradient(180deg, rgba(11,18,32,.62) 0%, rgba(11,18,32,0) 30%, rgba(11,18,32,.28) 62%, rgba(11,18,32,.88) 100%)",
  "radial-gradient(90% 70% at 78% 22%, rgba(201,164,92,.18) 0%, rgba(201,164,92,0) 58%)",
  "radial-gradient(120% 100% at 50% 50%, rgba(11,18,32,0) 42%, rgba(11,18,32,.62) 100%)",
];

export function PageHero({
  variant = "photo",
  height = "tall",
  eyebrow,
  eyebrowTracking = "default",
  heading,
  lead,
  ctas = [],
  image = [],
  showScrollCue = variant === "photo",
  scrollCueHref = "#main",
  overlayGradients = HOME_OVERLAY_LAYERS,
  noiseOpacity = 0.5,
  imageAnimation = "none",
  children,
  className,
}: PageHeroProps) {
  const lines = Array.isArray(heading) ? heading : [heading];

  if (variant === "plain") {
    return (
      <section className={cn("border-b border-gold/30 bg-cream", className)}>
        {/* Padding and heading size were both speculative here (seeded
            before Careers existed) and are corrected against Careers' real
            source — this is still this variant's only usage, so the fix is
            contained to this branch. Padding matches the same
            flat-mobile/clamp-desktop pattern the "photo" branch already
            uses below (mobile forced to a fixed 148px/96px, exactly like
            the source's own `[data-hero-content] > div` mobile override).
            The heading is its own size — not `text-h1` — since Careers'
            clamp/line-height/letter-spacing all differ from that token
            (56px ceiling vs. 64px, 1.12 vs. 1.1 line-height, -.015em vs.
            -.02em tracking), with its own 32px/1.16/-.01em mobile step
            matching the source's global `h1` mobile override. */}
        <div className="wrap pb-[96px] pt-[148px] sm:pb-[clamp(96px,13vh,150px)] sm:pt-[clamp(148px,17vh,200px)]">
          <p className="mb-7 font-mono text-eyebrow uppercase text-gold-dark">{eyebrow}</p>
          <h1 className="m-0 max-w-[20ch] font-display text-[32px] leading-[1.16] tracking-[-.01em] text-ink sm:text-[clamp(34px,3.8vw,56px)] sm:leading-[1.12] sm:tracking-[-.015em]">
            {lines.join(" ")}
          </h1>
          {lead && <p className="mt-[26px] max-w-[62ch] text-lead text-graphite">{lead}</p>}
          {ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3.5">
              {ctas.map((cta) => (
                <Button key={cta.href + cta.label} href={cta.href} tone={cta.tone}>
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("relative overflow-hidden bg-ink-deep", HEIGHT_CLASSES[height], className)}>
      <div className="absolute inset-0">
        {image.length > 1 ? (
          <HeroCrossfade slides={image} />
        ) : image[0] ? (
          <Image
            src={image[0].src}
            alt={image[0].alt}
            fill
            priority
            sizes="100vw"
            className={cn("object-cover", imageAnimation === "kenBurns" && "animate-ken-burns")}
          />
        ) : null}
      </div>

      {overlayGradients.map((background) => (
        <div
          key={background}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background }}
        />
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ backgroundImage: noiseBackground, backgroundSize: "180px 180px", opacity: noiseOpacity }}
      />

      <div className="pointer-events-none relative flex h-full flex-col justify-end">
        <div className="wrap w-full pb-[96px] pt-[148px] sm:pb-[clamp(150px,20vh,214px)] sm:pt-[clamp(148px,17vh,200px)]">
          <div className="mb-9 flex items-center gap-[18px]">
            <span className="block h-px animate-hero-rule bg-gold [animation-delay:240ms]" />
            <span
              className={cn(
                "animate-hero-fade font-mono text-eyebrow uppercase text-gold [animation-delay:420ms]",
                eyebrowTracking === "wide" && "tracking-eyebrow-wide"
              )}
            >
              {eyebrow}
            </span>
          </div>

          <h1 className="m-0 font-display text-h1 text-cream">
            {lines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[.16em]">
                <span
                  className="block animate-hero-line"
                  style={{ animationDelay: `${520 + index * 140}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {lead && (
            <p
              className="mt-[46px] max-w-[44ch] animate-hero-rise text-lead text-cream/78"
              style={{ animationDelay: "1020ms" }}
            >
              {lead}
            </p>
          )}

          {ctas.length > 0 && (
            <div
              className="pointer-events-auto mt-12 flex animate-hero-rise flex-wrap gap-3.5"
              style={{ animationDelay: "1200ms" }}
            >
              {ctas.map((cta) => (
                <Button
                  key={cta.href + cta.label}
                  href={cta.href}
                  tone={cta.tone}
                  onDark
                  showArrow={cta.tone !== "secondary"}
                  external={cta.external}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}

          {children}
        </div>
      </div>

      {showScrollCue && (
        <a
          href={scrollCueHref}
          className="pointer-events-auto absolute bottom-[116px] left-1/2 hidden -translate-x-1/2 animate-hero-fade flex-col items-center gap-3 text-cream hover:opacity-100 sm:flex short-landscape:!hidden"
          style={{ animationDelay: "1900ms" }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[.34em] text-cream/60">Scroll</span>
          <span className="relative block h-[46px] w-px overflow-hidden bg-cream/20">
            <span className="absolute left-0 top-0 h-5 w-px animate-scroll-trace bg-gold" />
          </span>
        </a>
      )}
    </section>
  );
}
