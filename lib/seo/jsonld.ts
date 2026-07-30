import { siteConfig } from "@/data/site";
import { pageSeo } from "@/data/seo";
import type { JsonLdGraph, RouteKey } from "@/types/seo";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;
const LOCAL_BUSINESS_ID = `${siteConfig.url}/#localbusiness`;

/** Shared `ContactPoint`, identical on both Organization and LocalBusiness in source. */
function contactPoint() {
  return {
    "@type": "ContactPoint",
    telephone: siteConfig.phone.tel,
    email: siteConfig.email,
    contactType: "customer service",
    areaServed: siteConfig.address.country,
    availableLanguage: ["English", "Arabic", "Urdu"],
  };
}

// Matches the source JSON-LD's `streetAddress` exactly: "Rolex Twin Tower,
// Office No. 1001, Baniyas" — a specific line the schema.org node needs
// that doesn't correspond 1:1 to any single `siteConfig.address` field
// (those are shaped for the visible office-info rows, not this schema).
function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: "Rolex Twin Tower, Office No. 1001, Baniyas",
    addressLocality: siteConfig.address.locality,
    addressCountry: siteConfig.address.country,
  };
}

/** Organization node — Home page only. */
function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    logo: `${siteConfig.url}/assets/kaka-logo.jpg`,
    email: siteConfig.email,
    telephone: siteConfig.phone.tel,
    address: postalAddress(),
    contactPoint: contactPoint(),
  };
}

/** WebSite node — Home page only, published by the Organization above. */
function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${siteConfig.url}/`,
    name: siteConfig.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

/** LocalBusiness node — Contact page only. */
function localBusinessNode() {
  return {
    "@type": "LocalBusiness",
    "@id": LOCAL_BUSINESS_ID,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    image: `${siteConfig.url}/assets/kaka-logo.jpg`,
    telephone: siteConfig.phone.tel,
    email: siteConfig.email,
    address: postalAddress(),
    parentOrganization: { "@id": ORG_ID },
    contactPoint: contactPoint(),
  };
}

interface ServiceNodeInput {
  name: string;
  path: string;
  description: string;
}

/** Service node — each division page and Careers. */
function serviceNode({ name, path, description }: ServiceNodeInput) {
  return {
    "@type": "Service",
    name,
    serviceType: name,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    url: `${siteConfig.url}${path}`,
    description,
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList node — every page except Home. Always "Home" first. */
function breadcrumbNode(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * Per-route JSON-LD `@graph`, matching each `.dc.html`'s approved
 * `<script type="application/ld+json">` exactly:
 *   - Home: Organization + WebSite
 *   - Each division page + Careers: Service + BreadcrumbList
 *   - Contact: LocalBusiness (with ContactPoint) + BreadcrumbList
 * No `openingHoursSpecification` anywhere — business hours are unconfirmed
 * by the client (see `siteConfig.businessHoursConfirmed`), and the source
 * JSON-LD never included it either.
 */
export function getJsonLdGraph(routeKey: RouteKey): JsonLdGraph {
  const graph = (() => {
    switch (routeKey) {
      case "home":
        return [organizationNode(), websiteNode()];
      case "real-estate":
        return [
          serviceNode({ name: "Real Estate", path: "/real-estate/", description: pageSeo["real-estate"].description }),
          breadcrumbNode([{ name: "Real Estate", path: "/real-estate/" }]),
        ];
      case "dry-fruits-trading":
        return [
          serviceNode({
            name: "Dry Fruits Trading",
            path: "/dry-fruits-trading/",
            description: pageSeo["dry-fruits-trading"].description,
          }),
          breadcrumbNode([{ name: "Dry Fruits Trading", path: "/dry-fruits-trading/" }]),
        ];
      case "fleet-management":
        return [
          serviceNode({
            name: "Fleet Management",
            path: "/fleet-management/",
            description: pageSeo["fleet-management"].description,
          }),
          breadcrumbNode([{ name: "Fleet Management", path: "/fleet-management/" }]),
        ];
      case "automotive-garage":
        return [
          serviceNode({
            name: "Automotive Garage",
            path: "/automotive-garage/",
            description: pageSeo["automotive-garage"].description,
          }),
          breadcrumbNode([{ name: "Automotive Garage", path: "/automotive-garage/" }]),
        ];
      case "vehicle-import-export":
        return [
          serviceNode({
            name: "Vehicle Import & Export",
            path: "/vehicle-import-export/",
            description: pageSeo["vehicle-import-export"].description,
          }),
          breadcrumbNode([{ name: "Vehicle Import & Export", path: "/vehicle-import-export/" }]),
        ];
      case "contact":
        return [localBusinessNode(), breadcrumbNode([{ name: "Contact", path: "/contact/" }])];
      case "careers":
        return [
          serviceNode({ name: "Careers", path: "/careers/", description: pageSeo.careers.description }),
          breadcrumbNode([{ name: "Careers", path: "/careers/" }]),
        ];
    }
  })();

  return { "@context": "https://schema.org", "@graph": graph };
}
