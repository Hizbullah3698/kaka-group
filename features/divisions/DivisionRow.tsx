import Image from "next/image";
import Link from "next/link";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { blurPlaceholders } from "@/lib/blurPlaceholders";
import { cn } from "@/lib/utils";

export interface DivisionRowItem {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: { src: string; alt: string };
  href: string;
  /** Two-digit display numeral, e.g. "01". */
  number: string;
}

interface DivisionRowProps {
  item: DivisionRowItem;
  /** Flips the image/copy sides for the zigzag layout — alternate this per row. */
  reverse?: boolean;
  id?: string;
  tone?: "cream" | "white";
}

/**
 * One division's summary row on Home's "Our Divisions" section — numbered
 * image, eyebrow/title/description, a bullet list and a "Learn More" link
 * through to that division's own page. Lives in features/divisions rather
 * than sections/ because the item shape (eyebrow + bullets + numeral) is
 * specific to how divisions are presented, not a general-purpose primitive.
 */
export function DivisionRow({ item, reverse = false, id, tone = "white" }: DivisionRowProps) {
  return (
    <article id={id} className={cn("border-t border-gold/30", tone === "cream" && "bg-cream")}>
      <div className="wrap">
        <div className="grid items-center gap-[70px] py-[110px] [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]">
          <RevealOnScroll
            className={cn(
              "relative h-[470px] overflow-hidden rounded-lg border border-gold/35 bg-ink shadow-card-raised",
              reverse && "sm:order-2"
            )}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              placeholder="blur"
              blurDataURL={blurPlaceholders[item.image.src]}
              fill
              sizes="(min-width: 1200px) 46vw, 100vw"
              className="object-cover transition-transform duration-700 ease-kaka hover:scale-[1.06]"
            />
            <span className="absolute left-6 top-6 font-display text-[56px] leading-none text-cream/90 [text-shadow:0_6px_24px_rgba(11,18,32,.6)]">
              {item.number}
            </span>
          </RevealOnScroll>

          <RevealOnScroll delay={120} className={reverse ? "sm:order-1" : undefined}>
            <p className="mb-5 font-mono text-eyebrow uppercase text-gold-dark">{item.eyebrow}</p>
            <h3 className="mb-[22px] font-display text-h3 text-ink">{item.title}</h3>
            <p className="mb-8 max-w-[46ch] text-lead text-graphite">{item.description}</p>
            <ul className="mb-9 grid max-w-[46ch] gap-3.5">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-baseline gap-3.5 border-b border-ink/10 pb-3 last:border-b-0 last:pb-0"
                >
                  <span aria-hidden="true" className="h-[5px] w-[5px] shrink-0 rotate-45 bg-gold" />
                  <span className="text-body text-ink">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href={item.href}
              className="inline-flex items-center gap-3 text-small uppercase tracking-[.14em] text-gold-dark transition-colors duration-220 ease-kaka hover:text-gold"
            >
              Learn More <span aria-hidden="true">&#8594;</span>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </article>
  );
}
