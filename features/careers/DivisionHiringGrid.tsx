import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const DIVISIONS = [
  {
    number: "01",
    title: "Real Estate",
    description: "Leasing and sales consultants, property administrators and portfolio coordinators working across Dubai.",
  },
  {
    number: "02",
    title: "Dry Fruits Trading",
    description: "Buyers, quality controllers and wholesale account managers handling origin supply and Gulf distribution.",
  },
  {
    number: "03",
    title: "Fleet Management",
    description: "Fleet controllers, service planners and drivers supporting corporate and contracting accounts.",
  },
  {
    number: "04",
    title: "Automotive Garage",
    description: "Mechanics, electricians, body technicians and service advisors, factory training preferred.",
  },
  {
    number: "05",
    title: "Vehicle Import & Export",
    description: "Documentation officers, customs coordinators and logistics staff working through Jebel Ali and Port Rashid.",
  },
];

/**
 * "Where We Hire" — five plain, non-interactive division cards. Visually in
 * the same family as Contact's `ContactOptionTiles` (white bg, `border-ink/10`,
 * `rounded-lg`, `shadow-card`) but checked closely against it per instruction
 * and NOT a genuine structural match:
 *   - These cards are plain `<div>`s with no href — informational, not CTAs.
 *     Contact's tiles are each a single clickable `<a>`.
 *   - Padding is a uniform `40px 36px` at every breakpoint (no `data-cell`
 *     attribute in source, so no mobile override) — Contact's tiles shrink
 *     to `30px 22px` under 768px.
 *   - Hover transition is `220ms ease` uniformly across border-color/
 *     box-shadow/transform. Contact's is `300ms`, with `ease-kaka` on
 *     transform specifically.
 *   - Hover lift is `translateY(-3px)` here vs. `-2px` on Contact; hover
 *     shadow is `0 14px 34px rgba(15,23,42,.08)` here vs. `0 22px 52px
 *     rgba(11,18,32,.12)` on Contact — different values, different rgba
 *     base color even.
 *   - Content model differs: a small serif numeral ("01".."05") plus a real
 *     `<h3>`, vs. Contact's mono eyebrow *word* ("Call", "Message") plus a
 *     styled `<span>` (not a heading, since the whole card is one link).
 * Built page-specific. If a second page ever needs this exact
 * numeral-card-grid shape, that would be the point to extract a primitive —
 * not before.
 */
export function DivisionHiringGrid() {
  return (
    <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
      <SectionHeader
        eyebrow="Where We Hire"
        heading="Five divisions, five kinds of work."
        headingClassName="max-w-[26ch] text-[clamp(26px,2.5vw,35px)] leading-[1.24]"
        className="mb-14"
      />
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))" }}
      >
        {DIVISIONS.map((division, index) => (
          <RevealOnScroll
            key={division.number}
            delay={index * 70}
            className="rounded-lg border border-ink/10 bg-white p-[40px_36px] shadow-card transition-[border-color,box-shadow,transform] duration-220 ease-out hover:-translate-y-[3px] hover:border-gold/60 hover:shadow-[0_14px_34px_rgba(15,23,42,.08)]"
          >
            <div className="mb-4 font-display text-[15px] text-gold-dark">{division.number}</div>
            <h3 className="m-0 mb-3 font-display text-[22px] text-ink">{division.title}</h3>
            <p className="m-0 text-[16.5px] font-light leading-[1.78] text-graphite">{division.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
