import type { Metadata } from "next";

import { pageSeo } from "@/data/seo";
import { siteConfig } from "@/data/site";
import type { RouteKey } from "@/types/seo";

/**
 * Builds a route's `Metadata` export from `pageSeo`. Title is set via
 * `{ absolute: ... }` rather than a plain string — every page's approved
 * `<title>` already ends in its own suffix copied verbatim from source
 * ("| KAKA Real Estate", "| KAKA Trading", "| Shams Ul Haya, KAKA Group",
 * etc.), not the generic "| KAKA Group of Companies" the root layout's
 * `title.template` would otherwise append. `absolute` bypasses that
 * template so the rendered `<title>` matches source exactly instead of
 * doubling up the suffix.
 *
 * `robots` is deliberately omitted here — every page in source uses the
 * identical `index, follow, max-image-preview:large, max-snippet:-1`,
 * which the root layout already sets as the default every route inherits.
 */
export function buildPageMetadata(routeKey: RouteKey): Metadata {
  const config = pageSeo[routeKey];
  const canonicalUrl = `${siteConfig.url}${config.canonicalPath}`;
  const ogImage = config.ogImage ?? siteConfig.defaultOgImage;

  return {
    title: { absolute: config.title },
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: config.canonicalPath,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      locale: "en_AE",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
  };
}
