# Handoff: KAKA Group of Companies — full website (8 pages)

## Overview

A complete, approved marketing website for KAKA Group of Companies, a Dubai business group operating five businesses: real estate, dry fruits trading, fleet management, automotive service, and vehicle import/export (trading as Shams Ul Haya). Eight pages, one shared header and footer, one design system, production SEO and structured data, WCAG AA contrast, and a responsive layer audited from 360px to 1920px.

Target domain: **https://www.kakabrothersgroup.com**

## About the design files

The `.dc.html` files in this bundle are **design references built in HTML**. They are prototypes that show intended look, copy, and behaviour. They are not production code to lift line by line.

The job in Claude Code is to **recreate these designs in a real codebase** using whatever framework fits the project (Next.js is the natural choice here, given eight mostly static pages, shared layout, and SEO requirements). Build reusable components and a token layer rather than copying inline styles page by page.

Note on file format: these files use a small runtime (`support.js`) that renders an inline-styled template plus a logic class. That runtime is a design-tool artifact. Do not port it. Read the markup and the logic class as the specification, then implement in idiomatic framework code.

## Fidelity

**High fidelity.** Colours, type, spacing, imagery, copy, animation timings, and responsive behaviour are all final and signed off. Recreate closely. Copy is approved and should be moved across verbatim, punctuation included (the copy deliberately contains no em dashes).

## Pages

There is no standalone About page. "About the Group" is a section on Home, linked as `/#about` across the site. Careers exists and is live but is intentionally left out of the primary navigation (footer only).

| Route | Design file | H1 / hero line | Sections |
|---|---|---|---|
| `/` | `KAKA Group - Home.dc.html` | "Five Industries. One Name You Can Trust." | Hero (6-image crossfade + division indicator bar), About, Divisions intro, 5 division rows, Why choose KAKA, Sectors we work in, CTA band, Footer |
| `/real-estate` | `KAKA Group - Real Estate.dc.html` | "Property that earns its place in a portfolio." | Hero, Why invest, Property categories, Services, Featured showcase, Buying journey, Why KAKA, Consultation CTA, Footer |
| `/dry-fruits-trading` | `KAKA Group - Dry Fruits Trading.dc.html` | "Container volumes. Origin-grade quality." | Hero, Trading excellence, Product portfolio, Supply chain, Wholesale services, Quality assurance, International markets (D3 map), Why KAKA, Wholesale CTA, Footer |
| `/fleet-management` | `KAKA Group - Fleet Management.dc.html` | "Fleets that keep working." | Hero, Fleet solutions, Our fleet, Delivery platforms, Fleet process, Maintenance, Why businesses choose KAKA, Statistics, Fleet CTA, Footer |
| `/automotive-garage` | `KAKA Group - Automotive Garage.dc.html` | "Precision service. Nothing left to chance." | Hero, Services, Modern workshop, Service process, Why choose KAKA Garage, Vehicle care standards, Workshop excellence, Customer commitment, Garage CTA, Footer |
| `/vehicle-import-export` | `KAKA Group - Vehicle Import - Export.dc.html` | "From American auctions to international roads." | Hero, International trading, Vehicle categories, Export journey, Services, Why Shams Ul Haya, International markets (D3 route map), Customer confidence, Sourcing CTA, Footer |
| `/contact` | `KAKA Group - Contact.dc.html` | "Talk to the people who handle it." | Hero, Contact options, Enquiry form, Visit our office (map + 2 office photos), Trust, Footer |
| `/careers` | `KAKA Group - Careers.dc.html` | "Work Across Five Industries" | Hero, Where we hire, Current openings, Careers CTA, Footer |

Archived, **do not implement**: `KAKA Group - Home v1.dc.html` (superseded first draft, excluded from the sitemap).

## Shared components to build once

1. **SiteHeader** — fixed, full width, 105px tall. Transparent over dark heroes, and on scroll past ~60px it gains a cream background (`#F8F6F2`), a hairline bottom border `rgba(201,164,92,.3)`, and a subtle shadow; the logo mark and wordmark shift from cream to ink at the same moment. Desktop nav: Home, About, Businesses (hover mega panel, 2-column, 5 division cards with title + one-line description), Contact, plus a gold "Enquire" button. Below 1024px the nav collapses to a burger (`aria-label="Menu"`, `aria-controls="mobile-nav"`) opening a full-width white drawer with a "Businesses" sub-group; links are 43px tall. See the logic class in any page file for the exact scroll thresholds and state.
2. **SiteFooter** — ink `#0F172A`, gold top border, four columns (logo lockup + one-line description; Divisions; Company; Head Office with address, phone, social tiles), then a bottom bar with copyright. Social tiles are 42px squares with monospace two-letter marks: `in`, `ig`, `wa` on every page, plus a fourth `tt` **only on the Vehicle Import & Export page** linking to the official Shams Ul Haya TikTok. `in`/`ig`/`wa` currently point at the contact form and need real profile URLs from the client before launch.
3. **FloatingWhatsApp** — bottom-right circular button, `https://wa.me/971544144755`, `aria-label="Message KAKA Group on WhatsApp"`, on every page.
4. **PageHero** — full-bleed photo (or photo crossfade on Home and Import/Export), four stacked gradient overlays plus a subtle SVG noise layer, then eyebrow rule + label, serif H1 with a per-line mask-reveal, lead paragraph, and CTA pair. Height `100vh` with `min-height` (780px Home, 660px division pages, 64vh/520px on Contact); below 768px it switches to `height:auto` with `min-height:82svh`.
5. **SectionHeader** — gold rule + monospace eyebrow + serif H2, used at the top of nearly every section.
6. **RevealOnScroll** — IntersectionObserver wrapper driving the `[data-reveal]` fade-and-rise, with an optional stagger delay.
7. **NumberedRow**, **StatBlock**, **ServiceCard**, **DivisionRow**, **CtaBand**, **EnquiryForm** (Contact) with floating labels.

## Design system

### Colour

| Token | Value | Use |
|---|---|---|
| `ink` | `#0F172A` | Dark sections, footer, body text on light |
| `ink-deep` | `#0B1220` | Hero backdrop behind photos, media wells |
| `cream` | `#F8F6F2` | Page background, text on dark |
| `white` | `#FFFFFF` | Cards, form panel |
| `cream-alt` | `#FCFBF8` | Alternating cells |
| `slate` | `#4A5568` | Body copy on light |
| `gold` | `#C9A45C` | Primary accent: rules, eyebrows on dark, buttons, borders |
| `gold-hover` | `#D9B876` | Button hover |
| `gold-dark` | `#8A6A2F` | **Accent text on light backgrounds only** (eyebrows, links, step numerals). Required for AA: `#C9A45C` fails on cream. |

Common alphas: borders `rgba(201,164,92,.3)` on light and `rgba(201,164,92,.28–.45)` on dark; muted cream text `rgba(248,246,242,.68–.9)`; hairlines on light `rgba(15,23,42,.08–.16)`.

Contrast rule to preserve: gold text on cream must use `gold-dark`; `gold` is only for text on ink, and for rules, borders and fills anywhere.

### Type

- Display / headings: **Playfair Display**, weight 400 (occasionally 500).
- Body / UI: **Inter**, weights 300–600. Body copy is mostly 300.
- Eyebrows, numerals, labels: **IBM Plex Mono** 400/500, uppercase, letter-spacing `.2em–.36em`, 9–11px.
- Loaded from Google Fonts with `display=swap` and preconnect.

Scale in use: H1 `clamp(34px, 3.85–3.9vw, 63–64px)` / line-height 1.1–1.12 / letter-spacing -.02em. H2 `clamp(28px, 2.9–3.2vw, 42–45px)` / 1.18–1.26. H3 19–28px. Lead paragraph 18px / 1.85. Body 16–17px / 1.85–1.9. Small print 15px. Mobile overrides (≤767px): H1 32px, H2 26px, H3 20px; at ≤400px H1 29px, H2 24px.

### Spacing, radius, shadow

- Content max width `1400px`, side padding `40px` desktop → `22px` at ≤767px.
- Section vertical rhythm `146px` desktop → `108px` at ≤1199px → `86px` at ≤767px.
- Radius: `8px` small controls, `10px` buttons, `14px` cards and media wells.
- Shadows: cards `0 14px 38px rgba(11,18,32,.07)`, raised cards `0 26px 60px rgba(11,18,32,.16)`, gold buttons `0 10px 26px rgba(201,164,92,.3)` → `0 18px 38px rgba(201,164,92,.4)` on hover.
- Buttons: 15–17px vertical padding, 28–34px horizontal, uppercase 15–16px with `.08em` letter-spacing. On mobile they go full width.

### Motion

- Standard easing `cubic-bezier(.22,.61,.36,1)`.
- Scroll reveal: opacity 0 → 1, `translateY(18px)` → 0 over 780ms, staggered in 60–200ms steps.
- Hero: line masks 1200ms with 520/660/800ms delays; eyebrow rule grows to 64px over 1200ms; lead and CTAs rise at 1020/1200ms; scroll cue fades in at 1900ms.
- Hero crossfade (Home, Import/Export): slow ken-burns scale with opacity crossfade, and a progress bar on the division indicator buttons.
- Hover: 180–250ms colour and border transitions; cards lift `translateY(-2px)`; media images scale ~1.04 over 700ms.
- Hero parallax runs only at ≥760px viewport width, throttled through `requestAnimationFrame`.
- `prefers-reduced-motion: reduce` collapses every animation and transition to 1ms, forces reveals visible, and disables parallax and ken-burns. Keep this.

### Responsive

Breakpoints: `1199px` (tablet rhythm), `1023px` (nav collapse), `767px` (mobile layer), `400px` (small phone type), plus a short-landscape rule (`max-height:540px and orientation:landscape`) that unpins the hero from `100vh`.

Rules worth carrying over: every `auto-fit` grid uses `minmax(min(Npx,100%),1fr)` so columns never force overflow; full-bleed image-plus-panel splits stack below ~1000px; footer nav links and standalone underlined links get 42–44px tap targets on phones. Audited clean (zero horizontal overflow) at 360, 390, 430, 768, 1024, 1280, 1440, 1920.

## SEO and structured data

Per page: unique `<title>` and meta description, keywords, canonical on the production domain, `robots` with `max-image-preview:large`, full Open Graph (type, site_name, title, description, url, image, locale `en_AE`), Twitter `summary_large_image`, `theme-color #0F172A`, favicon, apple-touch-icon, `site.webmanifest`, and a `<link rel="preload" as="image" fetchpriority="high">` for the hero.

JSON-LD `@graph`: Organization + WebSite on Home; LocalBusiness with ContactPoint on Contact; Service + BreadcrumbList on each division page and Careers. Copy these across as-is and keep them server-rendered.

**Business hours are deliberately absent** from copy and from the LocalBusiness schema. The client has not confirmed them. Do not add `openingHoursSpecification` until they do.

`robots.txt` and `sitemap.xml` are in the bundle; the sitemap lists the eight production routes only.

## Verified business information

Use exactly this, everywhere:

- Website `https://www.kakabrothersgroup.com`
- Email `info@kakabrothersgroup.com` (`mailto:info@kakabrothersgroup.com`)
- Phone `+971 54 414 4755` (`tel:+971544144755`), WhatsApp `https://wa.me/971544144755`
- Head office: Rolex Twin Tower, Office No. 1001, Baniyas, Deira, Dubai, United Arab Emirates
- Shams Ul Haya TikTok: `https://www.tiktok.com/@shams.al.haya5?_r=1&_t=ZS-98Q0yHGBfWf`

## Accessibility baseline to preserve

One `<h1>` per page, `header` / `main#main` / `footer` landmarks, a skip-to-content link that appears on focus, `aria-label="Primary"` on the nav, a labelled burger tied to the drawer by `aria-controls`, gold `:focus-visible` outlines (2px, 3px offset) on every interactive element, form inputs wrapped in `<label>` with `autocomplete` on name/email/phone, alt text on every content image and `alt=""` on the decorative logo mark, 44px minimum tap targets on phones, and full reduced-motion support.

## Performance notes

Hero image preloaded and eager with `fetchpriority="high"`; secondary hero slides eager but `fetchpriority="low"`; every other image `loading="lazy" decoding="async"`. Both D3 maps and the Contact map load in lazy iframes. Images carry intrinsic `width`/`height` where they are not container-cropped. When you rebuild, put the raw JPEGs through a proper image pipeline (`next/image` or equivalent): several source files are 2400px or larger and should be served as responsive AVIF/WebP.

## Assets

- `assets/kaka-mark.png` — logo mark, 1254×1254, used in the header and as favicon/apple-touch-icon.
- `assets/kaka-logo.jpg` — full logo lockup, 752×621, used in the footer with `mix-blend-mode: multiply` on the cream chip.
- `uploads/` — 59 photographs. Per-page image lists are in `PAGE_IMAGE_MAP.md`. All are referenced by URL-encoded filename; renaming them to kebab-case during the port is recommended, and there are a few near-duplicates (`villa with pool.jpg` / `villa with pool-f641d86a.jpg`, `luxury office reception.jpg` / `Luxury office reception.jpg`) worth consolidating.
- `deira-map.html`, `trade-map.html`, `export-routes.html` — self-contained D3 + TopoJSON maps embedded as iframes. The Deira map pins 25.2670, 55.3090 labelled "Rolex Twin Tower · Office No. 1001". Either port these to a React map component or keep them as static embeds.

## Known open items before launch

1. LinkedIn, Instagram and WhatsApp footer tiles need real profile URLs (currently they point at the contact form).
2. The enquiry form and the careers CV form are front-end only. They need a real endpoint, spam protection, and a server-side thank-you state.
3. Business hours pending client confirmation.
4. `KAKA Group - Home v1.dc.html` should not be ported.

## Files in this bundle

Eight `.dc.html` page designs plus the archived `Home v1`, `support.js` (design-tool runtime, do not port), the three map pages, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `assets/`, `uploads/`, and this handoff folder (`README.md`, `PAGE_IMAGE_MAP.md`, `CLAUDE_CODE_PROMPT.md`).
