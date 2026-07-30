import { cn } from "@/lib/utils";
import type { Stat } from "@/types/content";

interface AboutStatBlockProps {
  stats: Stat[];
  className?: string;
}

/**
 * Small numeral-plus-label tile row on a shared gold hairline seam — the
 * "05 Divisions / 01 Group standard / GCC & beyond" pattern from Home's
 * About section.
 *
 * Moved here from `sections/StatBlock.tsx` during the post-Dry-Fruits-
 * Trading cleanup pass: it had exactly one real usage (this one) after
 * three pages, and Fleet Management's closest-looking section
 * ("Statistics") turned out not to match it either — that section uses
 * individually bordered, gapped cells on a translucent background, not
 * this component's shared-seam grid. Per the project's rule ("components
 * are promoted only after multiple confirmed implementations, never by
 * prediction"), single-use infrastructure belongs with the page that uses
 * it until a second confirmed match shows up. Also dropped the unused
 * `tone="dark"` variant and the `minItemWidth` prop — Home never exercised
 * either, so they were unconfirmed surface area, not real flexibility.
 */
export function AboutStatBlock({ stats, className }: AboutStatBlockProps) {
  return (
    <div
      className={cn("grid gap-px border border-gold/30 bg-gold/30", className)}
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))" }}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-cream p-6">
          <div className="font-display text-[34px] leading-none text-ink">{stat.value}</div>
          <div className="mt-2.5 font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold-dark">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
