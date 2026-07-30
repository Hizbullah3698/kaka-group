export interface HeroSlide {
  src: string;
  alt: string;
}

export interface HeroCta {
  label: string;
  href: string;
  tone?: "primary" | "secondary";
  /** Opens in a new tab — for hero CTAs that link straight out to WhatsApp (Dry Fruits Trading's hero). */
  external?: boolean;
}
