import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHeader } from "@/sections/SectionHeader";

interface Reason {
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    title: "Trusted advisory",
    description: "Recommendations that survive scrutiny, including the ones that cost us a commission this quarter.",
  },
  {
    title: "Market knowledge",
    description:
      "Community-level pricing, service charges, developer track record and handover history, not headline averages.",
  },
  {
    title: "Transparent transactions",
    description: "Every fee, commission and payment stated in writing before you sign anything.",
  },
  {
    title: "Personalised service",
    description: "One named adviser from first call to handover, reachable directly rather than through a desk.",
  },
  {
    title: "Long-term relationships",
    description: "Most of our business comes from clients buying their second and third property with us.",
  },
];

/**
 * "Why KAKA Group" — dark two-column split: SectionHeader + lead + CTA on
 * the left, five stacked border-top rows (heading + description, no
 * numbering) on the right. The right column echoes WhyInvestRail's
 * "SectionHeader beside a bordered row list" skeleton from earlier on this
 * same page, but the row content differs (title+description here vs.
 * stat+title+description there) and no other page has used either shape
 * yet — noted as a pattern to watch for, not extracted, per the "confirm on
 * at least two pages" rule.
 */
export function WhyKakaSplit() {
  return (
    <div className="grid items-start gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))] sm:gap-14 lg:gap-[88px]">
      <div>
        <SectionHeader
          eyebrow="Why KAKA Group"
          heading="A brokerage that behaves like an adviser."
          tone="dark"
          headingClassName="max-w-[15ch]"
        />
        <RevealOnScroll delay={90}>
          <p className="mb-10 mt-[30px] max-w-[42ch] text-lead text-cream/72">
            KAKA Group has traded out of Deira for years across property, transport and international trade. The
            same standard applies here: we tell you when a deal is wrong for you.
          </p>
        </RevealOnScroll>
        <Button href="#consult" tone="primary">
          Speak to an adviser
        </Button>
      </div>
      <div>
        {REASONS.map((reason, index) => (
          <RevealOnScroll
            key={reason.title}
            delay={index * 60}
            className="border-t border-gold/25 py-[34px]"
          >
            <h3 className="mb-3.5 font-display text-[23px] leading-tight text-cream">{reason.title}</h3>
            <p className="m-0 max-w-[42ch] text-body font-light text-cream/70">{reason.description}</p>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
