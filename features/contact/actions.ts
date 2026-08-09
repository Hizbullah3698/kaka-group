"use server";

import { DIVISIONS } from "@/features/contact/divisions";
import { sql } from "@/lib/db";
import { sendEnquiryNotification } from "@/lib/email";

const MIN_FILL_TIME_MS = 2000;

export interface EnquiryResult {
  ok: boolean;
  error?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * `company_website` is a honeypot: hidden from real visitors via CSS, so
 * only a bot that blindly fills every field finds it. `form_rendered_at` is
 * a client-set timestamp; anything submitted within MIN_FILL_TIME_MS of the
 * form appearing is almost certainly scripted, not a person reading the
 * fields. Both cases return `ok: true` so the bot gets no signal that it was
 * caught — the submission is just quietly dropped instead of saved/emailed.
 */
export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  if (String(formData.get("company_website") ?? "").trim().length > 0) {
    return { ok: true };
  }

  const renderedAt = Number(formData.get("form_rendered_at"));
  if (!renderedAt || Date.now() - renderedAt < MIN_FILL_TIME_MS) {
    return { ok: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const division = String(formData.get("division") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid name and email address." };
  }
  if (!DIVISIONS.includes(division as (typeof DIVISIONS)[number])) {
    return { ok: false, error: "Please choose a division." };
  }

  await sql`
    insert into enquiries (name, email, phone, division, message)
    values (${name}, ${email}, ${phone || null}, ${division}, ${message || null})
  `;

  await sendEnquiryNotification({ name, email, phone, division, message });

  return { ok: true };
}
