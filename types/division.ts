export interface Division {
  /** URL slug, matches the route segment, e.g. "real-estate". */
  slug: string;
  /** Full division name as shown in headings and nav, e.g. "Real Estate". */
  title: string;
  /** One-line description used in the header mega menu and footer. */
  shortDescription: string;
  /** Route to the division page, trailing slash included. */
  href: string;
  /** Monospace eyebrow label used on the division's own hero, e.g. "Property · Dubai". */
  eyebrow: string;
}
