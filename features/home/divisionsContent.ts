import type { DivisionRowItem } from "@/features/divisions/DivisionRow";

export const homeDivisions: (DivisionRowItem & { id: string })[] = [
  {
    id: "real-estate",
    number: "01",
    eyebrow: "Property · Dubai",
    title: "Real Estate",
    description:
      "Sales, leasing and asset management across Dubai's residential and commercial market, from villa portfolios to whole office floors.",
    bullets: ["Residential sales and leasing", "Commercial floors and retail units", "Portfolio and tenancy management"],
    image: { src: "/uploads/modern-villa.jpg.jpg", alt: "Villa exterior" },
    href: "/real-estate/",
  },
  {
    id: "dry-fruits",
    number: "02",
    eyebrow: "Trade · Origin to Gulf",
    title: "Dry Fruits Trading",
    description:
      "Sourcing and wholesale distribution of premium nuts and dried fruit, shipped from origin markets to buyers across the Gulf.",
    bullets: ["Almonds, pistachios, walnuts, raisins", "Grading, packing and cold storage", "Wholesale and container-load supply"],
    image: { src: "/uploads/pistachios.jpg", alt: "Shelled pistachios" },
    href: "/dry-fruits-trading/",
  },
  {
    id: "fleet",
    number: "03",
    eyebrow: "Transport · Contracts",
    title: "Fleet Management",
    description:
      "Long-term vehicle supply, scheduled maintenance and driver logistics for corporate, contracting and government clients.",
    bullets: ["Vans, pickups and staff transport", "Service contracts and replacements", "Driver supply and route planning"],
    image: { src: "/uploads/commercial%20fleet%20management%20UAE.jpg", alt: "Commercial fleet at a depot" },
    href: "/fleet-management/",
  },
  {
    id: "garage",
    number: "04",
    eyebrow: "Service · Workshop",
    title: "Automotive Garage",
    description:
      "Mechanical, electrical and body work carried out by factory-trained technicians, with the diagnostic equipment to match.",
    bullets: ["Engine, gearbox and suspension work", "Diagnostics and electrical repair", "Body work, paint and detailing"],
    image: { src: "/uploads/car-standing-garage.jpg.jpg", alt: "Vehicle in a workshop bay" },
    href: "/automotive-garage/",
  },
  {
    id: "import-export",
    number: "05",
    eyebrow: "Shipping · Jebel Ali",
    title: "Vehicle Import & Export",
    description:
      "Vehicle procurement, documentation and shipping through Jebel Ali and Port Rashid to markets in Africa, Asia and the CIS.",
    bullets: ["Sourcing and pre-export inspection", "Customs paperwork and clearance", "Container and ro-ro shipping"],
    image: { src: "/uploads/vehicle%20import%20and%20export.jpg", alt: "Container and vehicle terminal" },
    href: "/vehicle-import-export/",
  },
];
