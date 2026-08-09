"use client";

import { useState, useTransition } from "react";
import type { FormEvent } from "react";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { submitEnquiry } from "@/features/contact/actions";
import { DIVISIONS } from "@/features/contact/divisions";
import { cn } from "@/lib/utils";

const STEPS = [
  { number: "01", text: "Your enquiry is routed to the division you selected, not a shared inbox." },
  { number: "02", text: "The person who runs that business replies with prices, timelines or a question." },
  { number: "03", text: "If it needs a conversation, we meet at our Deira office or come to yours." },
];

const FIELD_CLASS =
  "w-full resize-y border-0 border-b border-ink/[.16] bg-transparent px-0.5 pb-3.5 pt-[30px] font-sans text-body text-ink outline-none transition-[border-color,box-shadow] duration-[320ms] ease-out focus:border-b-gold focus:shadow-[0_1px_0_0_theme(colors.gold)]";

interface FloatingFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

/**
 * Recreates the source's floating-label field: a bottom-border-only input
 * whose overlaid `<span>` label was originally positioned by a removed
 * template-engine's `onFocus`/`onBlur`/`onChange` state bindings
 * (`fName.label`, etc. in the `.dc.html`'s script block). Reimplemented
 * here as real `useState`-driven focus/filled tracking — the label sits at
 * 16px/top:30px at rest and animates to a 10px uppercase gold-dark eyebrow
 * at top:6px the moment the field is focused or has a value, matching the
 * source's exact `top 280ms cubic-bezier(.22,.61,.36,1)` timing. Local to
 * this one form (used 4 times within it) rather than promoted to
 * `sections/` — nothing else on the site needs a floating-label field yet.
 */
function FloatingField({ name, label, type = "text", autoComplete, required, multiline, rows }: FloatingFieldProps) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const active = focused || filled;

  return (
    <label className="relative block">
      {multiline ? (
        <textarea
          name={name}
          rows={rows}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => setFilled(event.target.value.length > 0)}
          className={FIELD_CLASS}
        />
      ) : (
        <input
          type={type}
          name={name}
          autoComplete={autoComplete}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => setFilled(event.target.value.length > 0)}
          className={FIELD_CLASS}
        />
      )}
      {/* This is the field's only visible label text — the native <label>
          wrapper already associates it with the input/textarea for
          accessible-name purposes, so it must stay in the a11y tree
          (unlike the decorative dropdown caret below, which is
          aria-hidden). */}
      <span
        className={cn(
          "pointer-events-none absolute left-0.5 text-body text-graphite transition-[top,font-size,color,letter-spacing] duration-[280ms] ease-kaka",
          active ? "top-[6px] font-mono text-[10px] uppercase tracking-[.28em] text-gold-dark" : "top-[30px] font-sans"
        )}
      >
        {label}
      </span>
    </label>
  );
}

/**
 * The "Division" select uses a different, non-floating treatment in
 * source: a static 10px eyebrow label always pinned above the field
 * (rather than animating in), plus a custom dropdown caret since
 * `appearance:none` strips the native one.
 */
function DivisionField() {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-0.5 top-[6px] font-mono text-[10px] uppercase tracking-[.34em] text-gold-dark">
        Division
      </span>
      <select name="division" className={cn(FIELD_CLASS, "cursor-pointer appearance-none")}>
        {DIVISIONS.map((division) => (
          <option key={division}>{division}</option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-[18px] right-1 text-[10px] text-gold-dark">
        &#9662;
      </span>
    </label>
  );
}

/**
 * "Enquiry Form" — a `data-biggap` two-column layout: the floating-label
 * form on the left (bordered white panel, `data-panel`'s 76px/22px mobile
 * padding), and the "What happens next" three-step panel on the right. The
 * two are built together in one component (rather than split further)
 * because they share this one section's grid and neither reappears
 * elsewhere.
 *
 * Submits via the `submitEnquiry` Server Action (features/contact/actions.ts)
 * rather than a native form POST, so the existing `sent` confirmation state
 * and floating-label UX stay client-side and there's no full navigation.
 * `company_website` and `form_rendered_at` below are anti-spam fields read
 * by that action — see its doc comment for how they're used.
 */
export function EnquiryFormSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [renderedAt] = useState(() => Date.now());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setError(null);

    startTransition(async () => {
      const result = await submitEnquiry(formData);
      if (result.ok) {
        setSent(true);
        form.reset();
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div
      className="grid items-start gap-10 sm:gap-14 lg:gap-[76px]"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(480px, 100%), 1fr))" }}
    >
      <RevealOnScroll className="rounded-lg border border-ink/10 bg-white p-[76px_22px] shadow-[0_18px_48px_rgba(11,18,32,.08)] sm:p-[56px_52px_52px]">
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[.34em] text-gold-dark">Enquiry</div>
        <h2 className="m-0 mb-11 font-display text-[31px] leading-[1.25] text-ink">Tell us what you need.</h2>
        <form onSubmit={handleSubmit} className="grid gap-[30px]">
          {/* Honeypot: hidden from sighted and screen-reader users alike, so
              only a bot filling every field it finds will populate this. */}
          <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label>
              Leave this field blank
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <input type="hidden" name="form_rendered_at" value={renderedAt} />

          <div className="grid gap-[30px] [grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr))]">
            <FloatingField name="name" label="Full name" autoComplete="name" required />
            <FloatingField name="email" label="Email address" type="email" autoComplete="email" required />
          </div>
          <div className="grid gap-[30px] [grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr))]">
            <FloatingField name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
            <DivisionField />
          </div>
          <FloatingField name="message" label="What do you need, and by when?" multiline rows={5} />
          <div className="mt-2.5 flex flex-wrap items-center gap-[18px]">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-max items-center gap-3.5 rounded bg-gold px-8 py-4 text-body uppercase tracking-[.08em] text-ink shadow-gold transition duration-220 ease-kaka hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-gold-hover disabled:pointer-events-none disabled:opacity-60"
            >
              {isPending ? "Sending…" : "Send Enquiry"}
              <span aria-hidden="true" className="text-[15px]">
                &#8594;
              </span>
            </button>
            <span className="text-[14px] text-graphite" role="status">
              {error ? <span className="text-red-600">{error}</span> : sent ? "Thanks — we'll reply within one working day." : ""}
            </span>
          </div>
        </form>
      </RevealOnScroll>

      <RevealOnScroll delay={90} className="pt-3">
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[.34em] text-gold-dark">What happens next</div>
        <h2 className="m-0 mb-11 max-w-[16ch] font-display text-[31px] leading-[1.25] text-ink">
          Three steps, one working day.
        </h2>
        <div className="grid max-w-[46ch] gap-[34px]">
          {STEPS.map((step) => (
            <div key={step.number} className="grid grid-cols-[44px_1fr] gap-5">
              <span className="font-display text-[26px] leading-none text-gold-dark">{step.number}</span>
              <p className="m-0 text-body font-light leading-[1.85] text-graphite">{step.text}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  );
}
