import { Button } from "@/components/ui/Button";

/**
 * Careers' closing CTA — a flat `bg-ink` band with a heading and a single
 * `Button`, no image and no bordered inner panel. Checked against
 * `HomeCtaBand` (parallax photo, gradient overlay, bordered panel, two
 * CTAs) and it isn't a match at all — this is a much simpler flex row.
 * Source has no `data-reveal` on this section either, unlike almost every
 * other section on the site, so it renders statically rather than
 * scroll-revealing.
 */
export function CareersCtaBand() {
  return (
    <section className="bg-ink">
      <div className="wrap flex flex-wrap items-center justify-between gap-10 py-section-sm sm:py-section-md lg:py-section-lg">
        <h2 className="m-0 max-w-[24ch] font-display text-[clamp(25px,2.6vw,36px)] leading-[1.2] text-cream">
          Know the trade? We would rather hear from you early.
        </h2>
        <Button href="/contact/#form" tone="primary">
          Contact the Group
        </Button>
      </div>
    </section>
  );
}
