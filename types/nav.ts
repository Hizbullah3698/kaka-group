import type { Division } from "@/types/division";

export interface NavLink {
  label: string;
  href: string;
  /** Present only on the "Businesses" link, which opens the mega menu. */
  children?: Division[];
}
