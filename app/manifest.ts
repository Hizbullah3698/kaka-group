import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { colors } from "@/lib/tokens";

// Mirrors the approved site.webmanifest exactly. `description` is the
// manifest's own literal text from that file — subtly different wording
// from `siteConfig.defaultDescription` (which is written for the meta
// description tag, a different purpose) — so it's kept as its own string
// here rather than reusing that constant. `lang`/`dir` were missing from
// this file previously; added to match source exactly.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description:
      "Dubai business group: real estate, dry fruits trading, fleet management, automotive service and vehicle import and export.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: colors.cream,
    theme_color: colors.ink,
    lang: "en",
    dir: "ltr",
    icons: [
      {
        src: "/assets/kaka-mark.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/kaka-mark.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
