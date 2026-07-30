import type { PageSeoConfig, RouteKey } from "@/types/seo";

/**
 * Per-route SEO metadata — title, description, keywords, canonical path and
 * OG/Twitter image. Copied verbatim from each `.dc.html` design file's
 * approved `<head>` block (Phase 8). Keys match the eight production routes
 * exactly; `canonicalPath` always includes the trailing slash, matching
 * `data/routes.ts` and the approved `sitemap.xml`.
 */
export const pageSeo: Record<RouteKey, PageSeoConfig> = {
  home: {
    title: "KAKA Group of Companies | Five Businesses, One Dubai Group",
    description:
      "KAKA Group is a Dubai business group of five companies: real estate, dry fruits trading, fleet management, automotive service and vehicle import and export.",
    keywords: [
      "KAKA Group",
      "Dubai business group",
      "Deira",
      "real estate Dubai",
      "dry fruits trading",
      "fleet management",
      "automotive garage",
      "vehicle import export",
    ],
    canonicalPath: "/",
    ogImage: "/uploads/dubai-real-estate-houses.jpg.jpg",
  },
  "real-estate": {
    title: "Dubai Property Sales, Leasing & Management | KAKA Real Estate",
    description:
      "KAKA Real Estate handles sales, leasing and asset management across Dubai residential, commercial and off-plan property, with one point of contact throughout.",
    keywords: [
      "Dubai real estate",
      "property leasing Dubai",
      "off-plan investment",
      "apartment sales Dubai",
      "property management Deira",
    ],
    canonicalPath: "/real-estate/",
    ogImage: "/uploads/Dubai%20skyline%20land.jpg",
  },
  "dry-fruits-trading": {
    title: "Dry Fruits Import & Wholesale Supply in Dubai | KAKA Trading",
    description:
      "KAKA Dry Fruits Trading buys almonds, cashews, pistachios, raisins and dates at origin and supplies wholesale customers across the Gulf by the container.",
    keywords: [
      "dry fruits Dubai",
      "nuts wholesale UAE",
      "almond importer Dubai",
      "cashew supplier",
      "dates wholesale",
      "Jebel Ali import",
    ],
    canonicalPath: "/dry-fruits-trading/",
    ogImage: "/uploads/dry%20fruit%20ware%20house.jpg",
  },
  "fleet-management": {
    title: "Corporate Fleet Management & Vehicle Leasing Dubai | KAKA Fleet",
    description:
      "KAKA Fleet Management supplies, maintains and manages corporate vehicle fleets in Dubai, from procurement and registration to servicing and replacement.",
    keywords: ["fleet management Dubai", "corporate vehicle leasing UAE", "fleet maintenance", "company car supply Dubai"],
    canonicalPath: "/fleet-management/",
    ogImage: "/uploads/delivery%20fleet%20UAE.png",
  },
  "automotive-garage": {
    title: "Car Service, Repair & Diagnostics in Dubai | KAKA Automotive",
    description:
      "KAKA Automotive Garage carries out mechanical, electrical and diagnostic work in Dubai with our own technicians, photographed job cards and no subcontracting.",
    keywords: [
      "car repair Dubai",
      "car service garage Deira",
      "engine diagnostics Dubai",
      "brake repair",
      "AC regas",
      "oil change Dubai",
    ],
    canonicalPath: "/automotive-garage/",
    ogImage: "/uploads/Hero%20Workshop.jpg",
  },
  "vehicle-import-export": {
    title: "Vehicle Import & Export to Dubai | Shams Ul Haya, KAKA Group",
    description:
      "Shams Ul Haya sources vehicles from American auctions and dealers, inspects, ships and clears them through Dubai, then delivers to buyers across the region.",
    keywords: [
      "vehicle import Dubai",
      "car export UAE",
      "US auction cars",
      "RoRo shipping Jebel Ali",
      "export documentation",
      "Sharjah vehicle yard",
    ],
    canonicalPath: "/vehicle-import-export/",
    ogImage: "/uploads/Hero%20-%20Vehicle%20loading%20at%20a%20port%20or%20premium%20export%20scene..jpg",
  },
  contact: {
    title: "Contact KAKA Group | Head Office in Deira, Dubai",
    description:
      "Call, WhatsApp or email KAKA Group, or visit the head office at Rolex Twin Tower, Baniyas, Deira. Enquiries answered the same or next working day.",
    keywords: ["contact KAKA Group", "Deira office Dubai", "Baniyas Road", "KAKA Group phone", "enquiry Dubai"],
    canonicalPath: "/contact/",
    ogImage: "/uploads/dubai-real-estate-houses.jpg.jpg",
  },
  careers: {
    title: "Careers at KAKA Group | Jobs in Dubai",
    description:
      "Open roles and speculative applications across KAKA Group in Dubai: real estate, trading, fleet, workshop and vehicle export teams.",
    keywords: ["careers Dubai", "jobs KAKA Group", "Dubai vacancies", "work in Deira"],
    canonicalPath: "/careers/",
    ogImage: "/uploads/dubai-real-estate-houses.jpg.jpg",
  },
};
