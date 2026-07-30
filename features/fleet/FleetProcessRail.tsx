import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

const STEPS = [
  {
    number: "01",
    title: "Vehicle Allocation",
    description: "Units assigned by route profile, load type and shift pattern, all agreed with your operations team before deployment.",
  },
  {
    number: "02",
    title: "Driver Assignment",
    description: "Each vehicle logged against a named driver, with licence, permit and handover condition recorded.",
  },
  {
    number: "03",
    title: "Daily Operations",
    description: "Availability, fuel, Salik and incident reports reconciled daily so nothing accumulates unnoticed.",
  },
  {
    number: "04",
    title: "Maintenance",
    description: "Scheduled servicing at our own workshop and unscheduled repairs handled with a replacement vehicle in the interim.",
  },
  {
    number: "05",
    title: "Compliance",
    description: "RTA registration, insurance, third-party liability and permits kept current on every unit in the fleet.",
  },
  {
    number: "06",
    title: "Performance Monitoring",
    description: "Downtime, repair frequency and cost per vehicle reviewed with you, not filed away.",
  },
  {
    number: "07",
    title: "Business Growth",
    description: "Fleet size adjusted against your forecast so capacity arrives before demand does.",
  },
];

/**
 * "Fleet Process" — a sticky intro column (desktop/tablet only; static on
 * mobile, per source's `[data-sticky]` override) beside a 7-step rail list.
 * Each step pairs a large numeral with a thin gradient line connecting down
 * to the next one (omitted after the last step).
 *
 * Built fresh from this page's own source rather than reviving the retired
 * `sections/StickyProcessRail` — that component's citation of this exact
 * section turned out wrong on direct inspection (different grid columns,
 * different gap, and it never had the connecting rail line at all). If a
 * second page later needs this same sticky-intro-plus-rail shape, extract
 * it then, confirmed against that page's real source.
 */
export function FleetProcessRail() {
  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))] sm:gap-14 lg:gap-20">
      <div className="static sm:sticky sm:top-[120px]">
        <SectionHeader
          eyebrow="Operational Workflow"
          heading="The cycle that keeps vehicles on the road."
          headingClassName="max-w-[14ch]"
          tone="dark"
        />
        <RevealOnScroll delay={90}>
          <p className="mt-6 max-w-[40ch] text-lead text-cream/70">
            Seven stages, run continuously rather than once at onboarding.
          </p>
        </RevealOnScroll>
      </div>
      <div>
        {STEPS.map((step, index) => {
          const isLast = index === STEPS.length - 1;
          return (
            <RevealOnScroll
              key={step.number}
              delay={index * 60}
              className="grid grid-cols-[44px_1fr] gap-[18px] pb-12 last:pb-0 sm:grid-cols-[96px_1fr] sm:gap-8"
            >
              <div className="relative flex justify-end">
                <span className="font-display text-[34px] leading-none text-gold">{step.number}</span>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-8px] top-2 w-px"
                    style={{
                      left: "calc(100% + 15px)",
                      backgroundImage: "linear-gradient(180deg, rgba(201,164,92,.7), rgba(201,164,92,.15))",
                    }}
                  />
                )}
              </div>
              <div className="grid items-baseline gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
                <h3 className="m-0 font-display text-[24px] leading-[1.25] text-cream">{step.title}</h3>
                <p className="m-0 max-w-[42ch] text-body font-light text-cream/68">{step.description}</p>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </div>
  );
}
