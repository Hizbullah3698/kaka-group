import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

/**
 * "Current Openings" — a two-column layout with no `data-biggap` in source
 * (the 60px gap is fixed at every breakpoint, unlike most two-column
 * sections on the site), pairing a plain text block with a dark CV
 * submission panel. The panel uses `rounded-sm` (8px, `radius.sm`) rather
 * than the `rounded-lg` (14px) every card/tile elsewhere uses — a
 * genuinely smaller radius, not an oversight — and carries `data-cell`, so
 * its padding drops to 30px/22px under 768px the same way Contact's tiles
 * do.
 *
 * "Apply via the Form" reuses the shared `Button` primitive directly (an
 * exact match: gold-filled primary, no arrow). The WhatsApp button needs a
 * leading icon `Button` has no slot for — hand-styled here to match
 * `Button`'s secondary/`onDark` tokens instead of adding icon-slot surface
 * area to the shared component for this one usage.
 */
export function CurrentOpeningsPanel() {
  return (
    <div className="wrap py-section-sm sm:py-section-md lg:py-section-lg">
      <div
        className="grid items-start gap-[60px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))" }}
      >
        <div>
          <div className="mb-7 font-mono text-eyebrow uppercase text-gold-dark">Current Openings</div>
          <h2 className="m-0 mb-[22px] max-w-[24ch] font-display text-[clamp(26px,2.5vw,35px)] leading-[1.24] text-ink">
            No advertised roles at the moment.
          </h2>
          <p className="m-0 mb-[18px] text-lead text-graphite">
            We hire when the work calls for it rather than on a schedule, and most people join through a CV we
            already had on file. If your experience fits one of the five divisions, send it to us and we will keep
            it on hand.
          </p>
          <p className="m-0 font-mono text-[10px] uppercase tracking-[.2em] text-gold-dark">
            This list will be updated as roles open
          </p>
        </div>

        <RevealOnScroll className="rounded-sm border border-gold/40 bg-ink p-[30px_22px] sm:p-[44px_40px]">
          <div className="mb-5 font-mono text-eyebrow uppercase text-gold">Send Your CV</div>
          <p className="m-0 mb-[30px] text-[17px] font-light leading-[1.75] text-cream/80">
            Attach your CV, tell us which division interests you and what you have handled before. Applications are
            read by the division head, not a queue.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button href="/contact/#form" tone="primary">
              Apply via the Form
            </Button>
            <a
              href="https://wa.me/971544144755"
              target="_blank"
              rel="noopener"
              className="flex w-max items-center gap-2.5 rounded border border-cream/40 px-[30px] py-[15px] text-body uppercase tracking-[.08em] text-cream transition duration-220 ease-kaka hover:-translate-y-0.5 hover:border-gold hover:bg-cream/10"
            >
              <WhatsAppIcon size={20} className="text-gold" />
              WhatsApp
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
