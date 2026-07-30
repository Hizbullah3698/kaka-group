# Claude Code import prompt — full KAKA Group website

Paste this into Claude Code with the project zip unpacked in the working directory (or the design MCP connected to this project). It scopes the work to the whole site rather than a single page.

---

I'm implementing a complete, already-designed 8-page marketing website. The design lives in this project as `.dc.html` files, plus `assets/`, `uploads/`, three standalone D3 map pages, `robots.txt`, `sitemap.xml` and `site.webmanifest`. Read `design_handoff_kaka_group/README.md` first: it has the full page inventory, shared components, design tokens, motion spec, SEO and structured data, verified business details, and accessibility baseline.

Important: the `.dc.html` files are design references, not production code. They render through a design-tool runtime (`support.js`) with inline styles and a logic class per page. Do not port that runtime and do not copy inline styles page by page. Read them as the specification.

Build this as a **Next.js App Router project with TypeScript and Tailwind CSS**, structured as follows:

1. Set up the token layer first: extend the Tailwind theme with the exact colours, the three font families via `next/font`, the type scale, radii, shadows and the standard easing from the README. No hardcoded hex values in components after this step.
2. Build the shared layout before any page: `SiteHeader` (scroll-state transparency, hover mega menu, mobile drawer), `SiteFooter`, `FloatingWhatsApp`, `SkipLink`, and a `RevealOnScroll` wrapper for the IntersectionObserver fade-and-rise. Put them in the root layout.
3. Build the shared section primitives: `PageHero` (with optional image crossfade), `SectionHeader`, `DivisionRow`, `ServiceCard`, `NumberedRow`, `StatBlock`, `CtaBand`, `EnquiryForm`.
4. Then build the eight routes: `/`, `/real-estate`, `/dry-fruits-trading`, `/fleet-management`, `/automotive-garage`, `/vehicle-import-export`, `/contact`, `/careers`. Keep every route a server component except the interactive islands (header, hero crossfade, reveal wrapper, forms). Do not implement `KAKA Group - Home v1.dc.html`.
5. Move all copy across verbatim, including punctuation. The copy is client-approved and deliberately contains no em dashes.
6. Port the metadata with the App Router `metadata` export per route (title, description, keywords, canonical, Open Graph, Twitter, theme colour, icons, manifest) and render the JSON-LD `@graph` per page as a script tag. Do not add `openingHoursSpecification`: business hours are unconfirmed.
7. Run images through `next/image` with the intended crops and focal points, hero images with `priority`, everything else lazy.
8. Keep the accessibility baseline exactly: one h1 per page, landmarks, skip link, `:focus-visible` gold outlines, labelled form controls, 44px tap targets on phones, and the `prefers-reduced-motion` behaviour described in the README.
9. Keep the responsive contract: the breakpoints listed in the README, `minmax(min(Npx,100%),1fr)` for auto-fit grids so nothing overflows, and full-bleed splits stacking below ~1000px. Verify zero horizontal overflow at 360, 390, 430, 768, 1024, 1280, 1440 and 1920.

Work in this order and check in with me after step 2 (tokens plus shared layout) and after the first division page, before you build the remaining pages, so we can agree on the component API before it gets repeated five times.

---

## If you use the design MCP instead of a zip

Point Claude Code at the whole project rather than the file that happens to be open. The import tool takes a project, so ask for every page explicitly:

> Import the KAKA Group design project and read all eight pages: Home, Real Estate, Dry Fruits Trading, Fleet Management, Automotive Garage, Vehicle Import & Export, Contact and Careers, plus `design_handoff_kaka_group/README.md`, `assets/` and `uploads/`. Skip `KAKA Group - Home v1.dc.html`. Then follow the implementation plan in `design_handoff_kaka_group/CLAUDE_CODE_PROMPT.md`.

The single-page prompt you saw earlier is just the default for whichever file is open in the editor. It is not a limit on what can be imported.
