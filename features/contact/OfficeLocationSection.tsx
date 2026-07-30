"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/data/site";
import { SectionHeader } from "@/sections/SectionHeader";

const DeiraOfficeMap = dynamic(() => import("@/components/maps/DeiraOfficeMap").then((mod) => mod.DeiraOfficeMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ink-deep">
      <span className="font-mono text-eyebrow uppercase text-gold/50">Loading map…</span>
    </div>
  ),
});

// Content pulls from `siteConfig` — the project's single source of truth
// for verified business information — rather than retyping the address,
// phone and WhatsApp link that are already correct there.
const INFO_ROWS = [
  {
    label: "Address",
    content: (
      <>
        {siteConfig.address.line1}
        <br />
        {siteConfig.address.line2}
        <br />
        {siteConfig.address.line3}
      </>
    ),
  },
  { label: "Phone", content: <a href={`tel:${siteConfig.phone.tel}`}>{siteConfig.phone.display}</a> },
  {
    label: "WhatsApp",
    content: (
      <a href={siteConfig.whatsapp.url} target="_blank" rel="noopener">
        Message the group directly
      </a>
    ),
  },
  { label: "Email", content: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> },
];

/**
 * "Visit Our Office" — a `data-biggap` two-column layout: a bordered info
 * list (address/phone/WhatsApp/email, `data-inforow`'s mobile single-column
 * collapse) with two Google Maps CTAs, beside the lazy-loaded
 * `DeiraOfficeMap` and two `data-media2` photo thumbnails (168px tall on
 * mobile per source's `[data-media2]` override, 180px from 768px up).
 */
export function OfficeLocationSection() {
  return (
    <>
      <SectionHeader
        eyebrow="Visit Our Office"
        heading="Baniyas Road, Deira, where the group started."
        headingClassName="max-w-[18ch]"
        tone="dark"
        className="mb-[72px]"
      />

      <div className="grid items-start gap-10 sm:gap-14 lg:gap-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(360px, 100%), 1fr))" }}>
        <RevealOnScroll>
          <div className="border-t border-gold/35">
            {INFO_ROWS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 items-baseline gap-3 border-b border-gold/[.18] py-[26px] sm:grid-cols-[132px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[.34em] text-gold">{row.label}</span>
                <span className="text-[17px] font-light leading-[1.75] text-cream/90 [&_a]:border-b [&_a]:border-gold/45 [&_a]:pb-[3px] [&_a]:text-cream [&_a]:transition-colors [&_a]:duration-200 [&_a]:ease-out hover:[&_a]:border-gold">
                  {row.content}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <a
              href="https://maps.google.com/?q=Rolex+Twin+Tower+Baniyas+Deira+Dubai"
              target="_blank"
              rel="noopener"
              className="w-max rounded bg-gold px-7 py-3.5 text-[15px] uppercase tracking-[.08em] text-ink shadow-gold transition duration-220 ease-kaka hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-gold-hover"
            >
              Open in Google Maps
            </a>
            <a
              href="https://maps.google.com/?daddr=Rolex+Twin+Tower+Baniyas+Deira+Dubai"
              target="_blank"
              rel="noopener"
              className="w-max rounded border border-cream/40 px-7 py-3.5 text-[15px] uppercase tracking-[.08em] text-cream transition duration-220 ease-kaka hover:-translate-y-0.5 hover:border-gold hover:bg-cream/10"
            >
              Get Directions
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={90} className="grid gap-[22px]">
          <div className="relative h-[340px] overflow-hidden rounded-lg border border-gold/35 bg-ink-deep">
            <DeiraOfficeMap />
          </div>
          <div className="grid grid-cols-2 gap-[22px]">
            <div className="relative h-[168px] overflow-hidden rounded-lg border border-gold/[.28] sm:h-[180px]">
              <Image
                src="/uploads/Corporate%20office%20entrance%20Dubai.jpg"
                alt="Glass-walled meeting room on the KAKA Group office floor"
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover"
                style={{ objectPosition: "50% 58%" }}
              />
            </div>
            <div className="relative h-[168px] overflow-hidden rounded-lg border border-gold/[.28] sm:h-[180px]">
              <Image
                src="/uploads/Luxury%20office%20reception.jpg"
                alt="Reception desk in the Rolex Twin Tower lobby"
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover"
                style={{ objectPosition: "50% 62%" }}
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </>
  );
}
