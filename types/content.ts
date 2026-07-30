/**
 * Numbered step/row data shape (number, title, description). Used by
 * `features/real-estate/BuyingJourneySteps.tsx` (horizontal circle-marker
 * grid) and `features/fleet/WhyBusinessesChoose.tsx` (small-numeral
 * vertical list) with their own one-off renderings, and by
 * `sections/NumberedInfoRows.tsx` (large-numeral bordered list, confirmed
 * identical on Automotive Garage's Customer Commitment and Vehicle Import &
 * Export's Customer Confidence — this one rendering *is* shared, unlike the
 * other two).
 */
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}
