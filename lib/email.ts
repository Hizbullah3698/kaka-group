import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface EnquiryDetails {
  name: string;
  email: string;
  phone: string;
  division: string;
  message: string;
}

/**
 * Best-effort notification: the enquiry is already saved in the database by
 * the time this runs, so a Resend/env misconfiguration here should never
 * fail the submission — it just means the owner has to check the table
 * instead of their inbox until it's fixed.
 */
export async function sendEnquiryNotification(details: EnquiryDetails) {
  const notifyEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!resend || !notifyEmail) {
    console.warn(
      "Skipping enquiry email: RESEND_API_KEY and/or CONTACT_NOTIFICATION_EMAIL is not set."
    );
    return;
  }

  try {
    await resend.emails.send({
      // Resend's shared sandbox sender — works with no domain setup. Swap
      // for a verified-domain address (e.g. no-reply@kakagroup.com) once
      // one is set up in the Resend dashboard.
      from: "KAKA Group Website <onboarding@resend.dev>",
      to: notifyEmail,
      replyTo: details.email,
      subject: `New enquiry — ${details.division}`,
      text: [
        `Name: ${details.name}`,
        `Email: ${details.email}`,
        `Phone: ${details.phone || "—"}`,
        `Division: ${details.division}`,
        "",
        details.message || "(no message)",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Failed to send enquiry notification email:", error);
  }
}
