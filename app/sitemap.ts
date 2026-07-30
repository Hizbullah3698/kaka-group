import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";

// Mirrors the approved sitemap.xml exactly: the eight production routes,
// each with a trailing slash, and the same priorities that were signed off.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/real-estate/", priority: 0.9 },
  { path: "/dry-fruits-trading/", priority: 0.9 },
  { path: "/fleet-management/", priority: 0.9 },
  { path: "/automotive-garage/", priority: 0.9 },
  { path: "/vehicle-import-export/", priority: 0.9 },
  { path: "/contact/", priority: 0.8 },
  { path: "/careers/", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
