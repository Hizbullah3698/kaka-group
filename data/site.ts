/**
 * Single source of truth for verified KAKA Group business information.
 * Every phone number, address and link elsewhere in the codebase should
 * import from here rather than being retyped.
 */
export const siteConfig = {
  name: "KAKA Group of Companies",
  shortName: "KAKA Group",
  url: "https://www.kakabrothersgroup.com",

  defaultTitle: "KAKA Group of Companies | Five Businesses, One Dubai Group",
  defaultDescription:
    "KAKA Group is a Dubai business group of five companies: real estate, dry fruits trading, fleet management, automotive service and vehicle import and export.",
  defaultKeywords: [
    "KAKA Group",
    "Dubai business group",
    "Deira",
    "real estate Dubai",
    "dry fruits trading",
    "fleet management",
    "automotive garage",
    "vehicle import export",
  ],
  // Falls back to the Home hero image until per-route OG images are set in Phase 8.
  defaultOgImage: "/uploads/dubai-real-estate-houses.jpg.jpg",

  email: "info@kakabrothersgroup.com",
  phone: {
    display: "+971 54 414 4755",
    tel: "+971544144755",
  },
  whatsapp: {
    url: "https://wa.me/971544144755",
    label: "Message KAKA Group on WhatsApp",
  },

  address: {
    line1: "Rolex Twin Tower, Office No. 1001",
    line2: "Baniyas, Deira",
    line3: "Dubai, United Arab Emirates",
    locality: "Deira, Dubai",
    country: "AE" as const,
  },

  social: {
    // Open item from the design handoff: these three currently point at the
    // contact page and need real profile URLs from the client before launch.
    linkedin: "/contact/",
    instagram: "/contact/",
    whatsapp: "https://wa.me/971544144755",
    // Shams Ul Haya only — shown as a fourth footer tile on the Vehicle
    // Import & Export page alone, not on any other page.
    tiktok: "https://www.tiktok.com/@shams.al.haya5?_r=1&_t=ZS-98Q0yHGBfWf",
  },

  // Business hours are deliberately unconfirmed by the client. Do not render
  // hours copy or an `openingHoursSpecification` JSON-LD field until this
  // flips to true.
  businessHoursConfirmed: false,
} as const;

export type SiteConfig = typeof siteConfig;
