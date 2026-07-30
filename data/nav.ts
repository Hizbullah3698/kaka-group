import type { Division } from "@/types/division";
import type { NavLink } from "@/types/nav";

/**
 * The five divisions, in the exact order used by the header mega menu, the
 * Home page division rows and the footer. Reordering this array reorders all
 * three.
 */
export const divisions: Division[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    shortDescription: "Sales, leasing and asset management",
    href: "/real-estate/",
    eyebrow: "Property · Dubai",
  },
  {
    slug: "dry-fruits-trading",
    title: "Dry Fruits Trading",
    shortDescription: "Origin sourcing and Gulf-wide wholesale",
    href: "/dry-fruits-trading/",
    eyebrow: "Trade · Origin to Gulf",
  },
  {
    slug: "fleet-management",
    title: "Fleet Management",
    shortDescription: "Corporate vehicle supply and upkeep",
    href: "/fleet-management/",
    eyebrow: "Transport · Contracts",
  },
  {
    slug: "automotive-garage",
    title: "Automotive Garage",
    shortDescription: "Mechanical, electrical and body work",
    href: "/automotive-garage/",
    eyebrow: "Service · Workshop",
  },
  {
    slug: "vehicle-import-export",
    title: "Vehicle Import & Export",
    shortDescription: "Procurement, documentation and shipping via Jebel Ali",
    href: "/vehicle-import-export/",
    eyebrow: "Trading · Shams Ul Haya",
  },
];

/**
 * Top-level primary nav. "Businesses" carries the division list as children
 * and drives the mega menu (desktop) and the grouped sub-list (mobile drawer).
 *
 * Approved active-state behaviour (confirmed, implement in Phase 3):
 *  - On standard pages, the matching top-level item (Home / About / Contact)
 *    is highlighted.
 *  - On any division page, "Businesses" itself stays highlighted in the
 *    primary nav, and the current division is highlighted only inside the
 *    open mega menu / mobile sub-list — the other top-level items are not
 *    treated as active.
 * This file only holds the data; the pathname-matching logic that applies it
 * belongs to SiteHeader in Phase 3.
 */
export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Businesses", href: "/#divisions", children: divisions },
  { label: "Contact", href: "/contact/" },
];

/**
 * Footer column data. Careers is deliberately absent from `primaryNav`
 * (footer-only, per the approved handoff) but present here.
 */
export const footerNav = {
  divisions,
  company: [
    { label: "About the Group", href: "/#about" },
    { label: "Businesses", href: "/#divisions" },
    { label: "Contact", href: "/contact/" },
    { label: "Careers", href: "/careers/" },
  ] as NavLink[],
};
