import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface OptionTile {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

const OPTIONS: OptionTile[] = [
  {
    eyebrow: "Call",
    title: "Call the office",
    description: "Straight through to the office line, no switchboard.",
    href: "tel:+971544144755",
  },
  {
    eyebrow: "Message",
    title: "WhatsApp",
    description: "Stock, shipping dates and workshop bookings.",
    href: "https://wa.me/971544144755",
    external: true,
  },
  {
    eyebrow: "Email",
    title: "Email us",
    description: "Documents, specifications and formal quotations.",
    href: "mailto:info@kakabrothersgroup.com",
  },
  {
    eyebrow: "Book",
    title: "Schedule a meeting",
    description: "Sit down with the division lead at our Deira office.",
    href: "/contact/#form",
  },
  {
    eyebrow: "Directions",
    title: "Visit the office",
    description: "Rolex Twin Tower, Baniyas, two minutes from the Creek.",
    href: "/contact/#visit",
  },
];

/**
 * "Contact Options" — a 5-tile auto-fit grid of rounded, shadowed white
 * cards. Visually close to the retired `RaisedCardGrid`'s original citation
 * (this section was one of its two speculative sources, alongside Careers'
 * hiring cards), but per the "never promote from a single confirmed usage"
 * rule this is built page-specific now. If Careers' hiring cards turn out
 * to share this exact rounded-card shape when that page is built, this is
 * the confirmed second usage that would justify extracting a shared
 * primitive at that point — not before.
 *
 * Tile eyebrows render at 10px (not the usual 11px `text-eyebrow` token) —
 * source declares `font-size:11px` then immediately overrides it to `10px`
 * within the same inline style, and the later declaration wins. This
 * smaller nested-eyebrow size recurs on several other Contact elements
 * (the office info-row labels, the form's "Division" label) but not on any
 * top-level `SectionHeader`-style eyebrow, which stays 11px throughout.
 *
 * The hover shadow (`0 22px 52px rgba(11,18,32,.12)`) doesn't match any
 * existing `boxShadow` token (`shadow-card-raised` is `0 26px 60px
 * rgba(11,18,32,.16)`, a different value), so it stays an arbitrary value
 * rather than being forced onto a non-matching token. The rest-state shadow
 * is an exact match for the existing `shadow-card` token, used as-is.
 */
export function ContactOptionTiles() {
  return (
    <div className="grid gap-[22px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))" }}>
      {OPTIONS.map((option, index) => (
        <RevealOnScroll key={option.eyebrow} delay={index * 60}>
          <a
            href={option.href}
            {...(option.external ? { target: "_blank", rel: "noopener" } : undefined)}
            className="flex flex-col rounded-lg border border-ink/10 bg-white p-[30px_22px] shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-kaka hover:-translate-y-0.5 hover:border-gold/55 hover:shadow-[0_22px_52px_rgba(11,18,32,.12)] sm:p-[34px_30px_30px]"
          >
            <span className="mb-[22px] font-mono text-[10px] uppercase tracking-[.34em] text-gold-dark">
              {option.eyebrow}
            </span>
            <span className="mb-3 font-display text-[22px] text-ink">{option.title}</span>
            <span className="text-[15px] font-light leading-[1.7] text-graphite">{option.description}</span>
          </a>
        </RevealOnScroll>
      ))}
    </div>
  );
}
