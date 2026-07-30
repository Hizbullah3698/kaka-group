import { divisions } from "@/data/nav";
import type { Division } from "@/types/division";

export type HeroVariant = "crossfade" | "static" | "none";

export interface RouteConfig {
  path: string;
  /** Header can render transparent at the top of this route (it has a full-bleed dark hero to sit over). */
  transparentHeader: boolean;
  heroVariant: HeroVariant;
  /** The division this route belongs to, if any. Lets components key off one flag instead of string-matching paths. */
  division?: Division;
}

/**
 * Centralized per-route configuration — the single place page-level layout
 * behavior lives, so components (SiteHeader, SiteFooter, and anything else
 * that needs to branch on "which page is this") read from here instead of
 * hardcoding their own route lists. Add new flags here as they come up
 * (e.g. a future `showBreadcrumbs` or `footerVariant`) rather than growing
 * a new one-off constant inside whichever component needs it first.
 *
 * heroVariant confirmed by direct inspection of the `.dc.html` source:
 *   - "crossfade": Home (6 slides), Real Estate (3 slides — Dubai skyline /
 *     villa with pool / Dubai Marina apartment), Dry Fruits Trading (2
 *     slides — warehouse racking / mixed premium nuts), Fleet Management (3
 *     slides — note this is NOT explicitly named in the README's Motion
 *     section, which only calls out Home and Import/Export, but the actual
 *     Fleet markup has three `slide0/slide1/slide2` layers, so it's
 *     included here), Automotive Garage (3 slides — workshop floor / engine
 *     bay / diagnostic scan, same pattern confirmed directly in its own
 *     markup rather than assumed from PAGE_IMAGE_MAP), and Vehicle Import &
 *     Export.
 *   - "static": Contact — confirmed directly against its own source (single
 *     `<img>`, not a `slide0/slide1/...` stack). Distinct from the other six
 *     routes in three more ways beyond slide count: `height="short"` (64vh /
 *     min-520px, vs. "tall"/"full" everywhere else), no hero CTAs at all
 *     (`ctas` omitted), and the image itself carries a Ken Burns pan/zoom
 *     (`animation:kbHero 26s ease-out both`) that the other static-image
 *     path never needed — see `PageHero`'s `imageAnimation="kenBurns"` prop,
 *     added for this page. Also has no scroll-cue element in source
 *     (`showScrollCue={false}`), unlike every crossfade hero above.
 *   - "none": Careers has no hero photo at all (confirmed in
 *     PAGE_IMAGE_MAP.md: "No photography (type-led page)").
 */
export const routeConfigs: RouteConfig[] = [
  { path: "/", transparentHeader: true, heroVariant: "crossfade" },
  {
    path: "/real-estate/",
    transparentHeader: true,
    heroVariant: "crossfade",
    division: divisions[0],
  },
  {
    path: "/dry-fruits-trading/",
    transparentHeader: true,
    heroVariant: "crossfade",
    division: divisions[1],
  },
  {
    path: "/fleet-management/",
    transparentHeader: true,
    heroVariant: "crossfade",
    division: divisions[2],
  },
  {
    path: "/automotive-garage/",
    transparentHeader: true,
    heroVariant: "crossfade",
    division: divisions[3],
  },
  {
    path: "/vehicle-import-export/",
    transparentHeader: true,
    heroVariant: "crossfade",
    division: divisions[4],
  },
  { path: "/contact/", transparentHeader: true, heroVariant: "static" },
  { path: "/careers/", transparentHeader: false, heroVariant: "none" },
];

const routeConfigMap = new Map(routeConfigs.map((config) => [config.path, config]));

const fallbackRouteConfig: Omit<RouteConfig, "path"> = {
  transparentHeader: false,
  heroVariant: "none",
};

export function getRouteConfig(pathname: string): RouteConfig {
  return routeConfigMap.get(pathname) ?? { path: pathname, ...fallbackRouteConfig };
}
