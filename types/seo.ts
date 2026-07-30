export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  /** Route path including trailing slash, e.g. "/contact/". Combined with siteConfig.url for the canonical tag. */
  canonicalPath: string;
  /** Path to the Open Graph / Twitter image, relative to the site root. */
  ogImage?: string;
}

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
}

/** The eight production routes. Used to key per-route SEO and JSON-LD data. */
export type RouteKey =
  | "home"
  | "real-estate"
  | "dry-fruits-trading"
  | "fleet-management"
  | "automotive-garage"
  | "vehicle-import-export"
  | "contact"
  | "careers";
