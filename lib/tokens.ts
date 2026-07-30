/**
 * Raw design-token primitives.
 *
 * This is the single source of truth for values that need to exist outside
 * Tailwind utility classes too — most importantly the D3/SVG map components
 * (Phase 6/7), which manipulate colors and easing as plain JS/attribute
 * values and can't reach for a `className`. `tailwind.config.ts` imports
 * from this file rather than the other way around, so a color or easing
 * curve is only ever typed literally in one place in the whole project.
 *
 * Component code should almost never import this directly — reach for the
 * Tailwind utility (`bg-ink`, `ease-kaka`, `rounded-lg`) first. Import this
 * only where Tailwind classes can't apply (D3, canvas, inline SVG built at
 * runtime).
 */

export const colors = {
  ink: "#0F172A",
  inkDeep: "#0B1220",
  // A third, slightly lighter-than-ink navy used specifically for card
  // surfaces laid on top of an `ink` section background (Real Estate's
  // "Featured Opportunities" article cards and their nested stat cells) —
  // confirmed in that page's source, distinct from both `ink` and
  // `ink-deep`, not a guess or a substitute for either.
  inkCard: "#111C31",
  cream: "#F8F6F2",
  creamAlt: "#FCFBF8",
  gold: "#C9A45C",
  goldHover: "#D9B876",
  goldDark: "#8A6A2F",
  graphite: "#4A5568",
  // Land-silhouette fill on the D3 hub-arc maps (TradeMap, ExportRoutesMap)
  // — one shade lighter than `inkDeep` so the landmass reads against the
  // map's ink background. Confirmed identical in both map components (a
  // real second usage), so it's a token rather than a repeated raw hex.
  mapLand: "#16233B",
} as const;

export const easing = {
  /** The one documented "standard easing" used for reveals, hero motion and hover lifts. */
  kaka: "cubic-bezier(.22,.61,.36,1)",
} as const;

export const radius = {
  sm: "8px",
  DEFAULT: "10px",
  lg: "14px",
} as const;

/**
 * The soft-light SVG noise texture layered over hero/CTA background photos.
 * Was duplicated byte-for-byte in `PageHero.tsx` and `ParallaxCta.tsx` — a
 * confirmed second usage, extracted here per the same "no Tailwind class
 * can express this" rule as the rest of this file, rather than left as two
 * copies that could silently drift apart.
 */
export const noiseBackground =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export type ColorToken = keyof typeof colors;
