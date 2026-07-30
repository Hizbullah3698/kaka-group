import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const STAGES = [
  { stage: "Stage 01", title: "Inspection", description: "Vehicle received, condition photographed and the reported symptoms recorded." },
  { stage: "Stage 02", title: "Diagnosis", description: "Scanned and tested until we find the actual cause, not the first plausible guess." },
  { stage: "Stage 03", title: "Approval", description: "Written estimate with parts and labour separated. No work starts without your yes." },
  { stage: "Stage 04", title: "Repair", description: "Carried out by a technician qualified on that system, with genuine or OE parts." },
  { stage: "Stage 05", title: "Quality Check", description: "A second technician verifies the work independently of whoever performed it." },
  { stage: "Stage 06", title: "Final Testing", description: "Road tested under the conditions the fault appeared in, then rescanned." },
  { stage: "Stage 07", title: "Vehicle Delivery", description: "Cleaned, handed over in person, with the old parts available if you want them." },
];

/**
 * "Our Service Process" — a horizontal row of 7 stages, each a circle
 * marker sitting on a thin gold line that runs the width of its own
 * column (omitted after the last stage), with the stage content below.
 * Adjacent columns' line segments sit flush against each other, reading as
 * one continuous horizontal timeline.
 *
 * Conceptually close to Real Estate's `BuyingJourneySteps` (both are
 * horizontal circle-marker step rows), but the actual technique differs —
 * that component draws its line as a full `border-top` under a floating
 * circle; this one draws a separate positioned line segment per column,
 * with a smaller circle, dark fill and different sizing throughout. Built
 * fresh rather than forced into a shared shape neither confirms.
 */
export function ServiceProcessSteps() {
  return (
    <div>
      <div className="mb-[72px] flex flex-wrap items-end justify-between gap-7">
        <SectionHeader
          eyebrow="Our Service Process"
          heading="You approve the work before we touch the car."
          headingClassName="max-w-[16ch]"
          tone="dark"
        />
        <RevealOnScroll delay={80}>
          <p className="max-w-[34ch] text-body-lg font-light text-cream/70">
            Seven stages, each one logged against your job card.
          </p>
        </RevealOnScroll>
      </div>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
        {STAGES.map((step, index) => {
          const isLast = index === STAGES.length - 1;
          return (
            <RevealOnScroll key={step.stage} delay={index * 50} className="relative pr-[26px] pt-[38px]">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[-6px] h-[11px] w-[11px] rounded-full border border-gold bg-ink"
              />
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-[-1px] h-px bg-gold/30"
                  style={{ left: "11px" }}
                />
              )}
              <span className="mb-3.5 block font-mono text-[9px] uppercase tracking-eyebrow-tight text-gold/90">
                {step.stage}
              </span>
              <h3 className="mb-2.5 font-display text-[21px] leading-[1.28] text-cream">{step.title}</h3>
              <p className="m-0 text-[15px] font-light leading-[1.8] text-cream/65">{step.description}</p>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
