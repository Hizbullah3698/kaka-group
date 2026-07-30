import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

export interface CellGridItem {
  /** Short numeral or label, e.g. "01" — optional. */
  eyebrow?: string;
  title: string;
  description: string;
}

interface CellGridProps {
  items: CellGridItem[];
  /** Drives the auto-fit grid's minimum item width in px — 290 confirmed on Fleet Management's 6-up "Fleet Solutions" grid. */
  minItemWidth?: number;
  className?: string;
}

/**
 * The hairline-divider tile grid — cream cells on a hairline ink seam,
 * cells share a 1px seam via the gap-as-border trick, no radius, no shadow,
 * hover shifts to cream-alt. Confirmed against Fleet Management's "Fleet
 * Solutions" section (6 cells, numeral eyebrow + title + description) —
 * its second confirmed usage after Real Estate's Featured Opportunities.
 * Cell padding shrinks to `30px 22px` below 768px (source's `[data-cell]`
 * mobile override), full `44px` above it.
 *
 * This used to also offer a `tone="dark"` variant, citing Fleet
 * Management's "Delivery Platforms" section as its source. Direct
 * inspection of that section (done while previewing Fleet Management for
 * the post-Dry-Fruits-Trading cleanup pass) shows it doesn't actually
 * match: the cells sit on an `ink-card` background, not this component's
 * `ink-deep`, and one of the four cells holds only a disclaimer line with
 * no title/description pair, which this component's required `title` and
 * `description` fields can't represent. The dark variant was removed
 * rather than kept as unverified surface area — if a future page confirms
 * a real dark hairline-grid need, add it back from that page's actual
 * source, not from this section's now-corrected guess.
 */
export function CellGrid({ items, minItemWidth = 290, className }: CellGridProps) {
  return (
    <div
      className={cn("grid gap-px border border-ink/[.12] bg-ink/[.12]", className)}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minItemWidth}px, 100%), 1fr))` }}
    >
      {items.map((item, index) => (
        <RevealOnScroll
          key={item.title}
          delay={index * 70}
          className="bg-cream p-[30px_22px] transition-colors duration-300 ease-kaka hover:bg-cream-alt sm:p-11"
        >
          {item.eyebrow && (
            <span className="mb-6 block font-mono text-eyebrow uppercase text-gold-dark">{item.eyebrow}</span>
          )}
          <h3 className="mb-3.5 font-display text-[25px] leading-tight text-ink">{item.title}</h3>
          <p className="text-body text-graphite">{item.description}</p>
        </RevealOnScroll>
      ))}
    </div>
  );
}
