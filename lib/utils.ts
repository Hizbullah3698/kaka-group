import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge's default font-size group only recognizes Tailwind's own
// scale (text-sm, text-lg, ...). It doesn't know about this project's custom
// fontSize tokens (tailwind.config.ts), so without this it silently treats
// `text-h2` as an unrecognized/color-like class that conflicts with whatever
// text-color class sits next to it in the same cn() call — e.g.
// `cn("text-h2", "text-cream")` was dropping `text-h2` entirely, collapsing
// the heading to the browser's default 16px. Registering these tokens in the
// same group as Tailwind's built-in sizes fixes the conflict resolution
// without changing how genuine size-vs-size conflicts are merged.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["h1", "h2", "h3", "lead", "body", "body-lg", "small", "eyebrow"].map(
        (size) => `text-${size}`
      ),
    },
  },
});

/**
 * Merge conditional class names and resolve conflicting Tailwind utilities
 * (e.g. `cn("p-4", condition && "p-6")` keeps only `p-6`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
