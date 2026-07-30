import { NumberedInfoRows } from "@/sections/NumberedInfoRows";
import type { ProcessStep } from "@/types/content";

const COMMITMENTS: ProcessStep[] = [
  {
    number: "01",
    title: "Honest recommendations",
    description: "If a repair can wait, we say so. If a vehicle is not worth the work, we say that too, even when it costs us the job.",
  },
  {
    number: "02",
    title: "Quality workmanship",
    description: "Work done to procedure with the right parts, then verified by someone other than the technician who performed it.",
  },
  {
    number: "03",
    title: "Clear communication",
    description: "You hear from us when we find something, when a price changes, and when the car is ready. Not only at collection.",
  },
  {
    number: "04",
    title: "Timely completion",
    description: "A realistic date quoted up front, and a call the moment a parts delay threatens it.",
  },
  {
    number: "05",
    title: "Customer satisfaction",
    description: "If something is not right after collection, bring it back. That conversation is short and it is on us.",
  },
];

/**
 * "Customer Commitment" — composes the shared `NumberedInfoRows` primitive
 * (see that file for why it's shared) with this page's own five
 * commitments.
 */
export function CustomerCommitmentRows() {
  return (
    <NumberedInfoRows
      eyebrow="Customer Commitment"
      heading="Five things you can hold us to."
      headingClassName="max-w-[17ch]"
      items={COMMITMENTS}
    />
  );
}
