import type { Config } from "tailwindcss";

import { colors as tokenColors, easing, radius } from "./lib/tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    // Breakpoints from the approved design handoff. Names follow Tailwind's
    // usual small-to-large order, but the pixel values are the handoff's own
    // thresholds, not Tailwind's defaults:
    //   xs   400px  small-phone type overrides
    //   sm   768px  end of the mobile layer   (handoff's "max-width: 767px")
    //   md  1024px  nav collapses to burger below this (handoff's 1023px)
    //   lg  1200px  tablet section-rhythm below this   (handoff's 1199px)
    //   xl  1440px  / 2xl 1920px audited large-screen widths
    //
    // Section vertical rhythm reads off these same three tiers:
    //   py-section-sm   (base, <768px)
    //   sm:py-section-md (>=768px)
    //   lg:py-section-lg (>=1200px)
    // — or use the `.section-y` utility in globals.css, which applies this
    // exact pattern in one class.
    screens: {
      xs: "400px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1440px",
      "2xl": "1920px",
      // Unpins the hero from 100vh on short landscape viewports.
      "short-landscape": {
        raw: "(max-height: 540px) and (orientation: landscape)",
      },
    },
    extend: {
      colors: {
        ink: tokenColors.ink,
        "ink-deep": tokenColors.inkDeep,
        "ink-card": tokenColors.inkCard,
        cream: tokenColors.cream,
        "cream-alt": tokenColors.creamAlt,
        gold: tokenColors.gold,
        "gold-hover": tokenColors.goldHover,
        // Text-on-cream only. `gold` fails AA on cream; `gold-dark` is the
        // required substitute for eyebrows, links and step numerals on light
        // backgrounds. `gold` stays reserved for text-on-ink, rules, borders
        // and fills anywhere.
        "gold-dark": tokenColors.goldDark,
        // Body copy color on light backgrounds. Named "graphite" rather than
        // "slate" so it doesn't collide with (and silently replace) Tailwind's
        // own default slate-50..950 scale.
        graphite: tokenColors.graphite,
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      fontSize: {
        h1: ["clamp(34px, 3.9vw, 64px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(28px, 3.2vw, 45px)", { lineHeight: "1.22" }],
        h3: ["clamp(19px, 2.2vw, 28px)", { lineHeight: "1.24" }],
        lead: ["18px", { lineHeight: "1.85", fontWeight: "300" }],
        body: ["16px", { lineHeight: "1.875" }],
        "body-lg": ["17px", { lineHeight: "1.9" }],
        small: ["15px", { lineHeight: "1.6" }],
        // 11px / .34em tracking — the default eyebrow style. Two more
        // tracking widths recur across the handoff (a wider .36em on the
        // Home hero, a tighter .24em on numeral/tag labels) — those live
        // below in `letterSpacing` rather than as separate fontSize entries,
        // since .34em is already covered here and duplicating it would be a
        // duplicate token.
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.34em" }],
      },
      letterSpacing: {
        "eyebrow-wide": "0.36em", // Home hero's "Established in Deira, Dubai"
        "eyebrow-tight": "0.24em", // numeral/tag-style eyebrow variants
      },
      spacing: {
        "section-lg": "146px",
        "section-md": "108px",
        "section-sm": "86px",
        gutter: "40px",
        "gutter-sm": "22px",
        // Fixed header height. Added in Phase 3 — used by SiteHeader itself
        // and by anything that needs to clear or size against it (the mobile
        // drawer's max-height, future sticky-rail offsets in Phase 6).
        header: "105px",
      },
      maxWidth: {
        content: "1400px",
      },
      // Bare-number opacity modifiers (`text-cream/72`) resolve against this
      // scale, not against arbitrary values — Tailwind's default only defines
      // multiples of 5. The handoff's confirmed alpha values for muted text,
      // overlays and borders land on other steps (.14–.94), so without these
      // entries those exact-value classes silently produce no rule at all
      // and the element falls back to its inherited color.
      opacity: {
        0: "0",
        5: "0.05",
        10: "0.1",
        14: "0.14",
        15: "0.15",
        20: "0.2",
        22: "0.22",
        25: "0.25",
        28: "0.28",
        30: "0.3",
        35: "0.35",
        40: "0.4",
        42: "0.42",
        45: "0.45",
        50: "0.5",
        55: "0.55",
        60: "0.6",
        62: "0.62",
        65: "0.65",
        66: "0.66",
        68: "0.68",
        70: "0.7",
        72: "0.72",
        74: "0.74",
        75: "0.75",
        76: "0.76",
        78: "0.78",
        80: "0.8",
        82: "0.82",
        85: "0.85",
        90: "0.9",
        94: "0.94",
        95: "0.95",
        100: "1",
      },
      borderRadius: {
        sm: radius.sm, // small controls
        DEFAULT: radius.DEFAULT, // buttons
        lg: radius.lg, // cards, media wells
      },
      boxShadow: {
        card: "0 14px 38px rgba(11,18,32,.07)",
        "card-raised": "0 26px 60px rgba(11,18,32,.16)",
        gold: "0 10px 26px rgba(201,164,92,.3)",
        "gold-hover": "0 18px 38px rgba(201,164,92,.4)",
        // The current-division highlight in the header mega menu (left
        // accent bar). Added in Phase 3, sourced from lib/tokens.ts rather
        // than a raw hex so it can't drift from the `gold` color token.
        "inset-gold": `inset 3px 0 0 ${tokenColors.gold}`,
      },
      transitionTimingFunction: {
        kaka: easing.kaka,
      },
      // Tailwind's default scale already covers 75/100/150/200/300/500/700/1000ms,
      // which handles every generic hover transition in the handoff (180–250ms
      // rounds to duration-200; the 700ms media-image hover scale is already a
      // default). These are the additional exact figures the handoff specifies
      // for named motion (reveals, hero sequencing, the two infinite hero loops)
      // that aren't already in Tailwind's default scale.
      transitionDuration: {
        "220": "220ms", // mega menu / card hover transitions
        "420": "420ms", // card-level hover lift/shift — confirmed on Home's SectorsGrid and Real Estate's ServiceList
        "620": "620ms", // Contact's shorter reveal variant
        "780": "780ms", // standard scroll-reveal fade + rise
        "900": "900ms", // reveal-line rule growth
        "1020": "1020ms", // hero lead paragraph rise
        "1100": "1100ms", // hero rise (lead / CTA group)
        "1200": "1200ms", // hero line-mask reveal, hero rule grow
        "1900": "1900ms", // hero scroll-cue fade-in delay reference
        "2600": "2600ms", // arrow nudge / scroll trace loops
      },
      keyframes: {
        heroFade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        heroRise: {
          from: { opacity: "0", transform: "translateY(26px)" },
          to: { opacity: "1", transform: "none" },
        },
        heroLine: {
          from: { transform: "translateY(112%)" },
          to: { transform: "translateY(0)" },
        },
        heroRule: {
          from: { width: "0" },
          to: { width: "64px" },
        },
        arrowNudge: {
          "0%, 72%, 100%": { transform: "translateX(0)" },
          "84%": { transform: "translateX(6px)" },
        },
        scrollTrace: {
          "0%": { transform: "translateY(-100%)" },
          "55%, 100%": { transform: "translateY(210%)" },
        },
        // Arc stroke draw-in for the D3 hub-arc maps (trade-map.html,
        // export-routes.html) — fixed 1900ms duration confirmed in both
        // source files, so unlike heroProg/kbHero/pinPulse (globals.css) this
        // one has everything a Tailwind `animation` utility needs. The one
        // per-instance value, `--len` (each arc's own path length), is set
        // via inline style alongside `animationDelay`, the same way
        // `animate-hero-line`'s per-line delay already works below.
        drawArc: {
          from: { strokeDashoffset: "var(--len)" },
          to: { strokeDashoffset: "0" },
        },
        // Contact hero's single-image pan/zoom — confirmed
        // `animation:kbHero 26s ease-out both` directly on the `<img>` in
        // source (the only page whose hero applies this; every other page's
        // hero is a HeroCrossfade instead, which has its own crossfade
        // timing and doesn't need this).
        kenBurns: {
          from: { transform: "scale(1.02)" },
          to: { transform: "scale(1.13) translate3d(-1%, 0.8%, 0)" },
        },
        // Deira office map's single-pin pulse ring — confirmed against
        // deira-map.html's own `kakaPulse` keyframe.
        pinPulse: {
          "0%": { transform: "scale(.7)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      // Fully confirmed, fixed-duration motion only — these generate
      // `animate-*` utilities. heroProg (division-indicator progress fill)
      // is the one remaining keyframe with a confirmed shape but dynamic,
      // per-instance duration, so it stays a raw `@keyframes` in
      // globals.css instead, applied via inline style once the owning
      // component knows its own timing — see the comment there.
      animation: {
        "hero-fade": "heroFade 1000ms ease both",
        "hero-rise": `heroRise 1100ms ${easing.kaka} both`,
        "hero-line": `heroLine 1200ms ${easing.kaka} both`,
        "hero-rule": `heroRule 1200ms ${easing.kaka} both`,
        "arrow-nudge": "arrowNudge 2600ms ease-in-out infinite",
        "scroll-trace": "scrollTrace 2600ms cubic-bezier(.5,0,.3,1) infinite",
        "draw-arc": "drawArc 1900ms cubic-bezier(.4,0,.2,1) both",
        "ken-burns": "kenBurns 26s ease-out both",
        "pin-pulse": "pinPulse 3200ms ease-out infinite",
      },
      zIndex: {
        base: "0",
        sticky: "40",
        header: "50",
        overlay: "60",
        drawer: "70",
        skip: "200",
      },
    },
  },
  plugins: [],
};

export default config;
