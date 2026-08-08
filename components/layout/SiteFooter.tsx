"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { footerNav } from "@/data/nav";
import { getRouteConfig } from "@/data/routes";
import { siteConfig } from "@/data/site";
import { blurPlaceholders } from "@/lib/blurPlaceholders";

const socialTiles = [
  { label: "in", href: siteConfig.social.linkedin, name: "LinkedIn" },
  { label: "ig", href: siteConfig.social.instagram, name: "Instagram" },
  { label: "wa", href: siteConfig.social.whatsapp, name: "WhatsApp" },
] as const;

const linkClasses =
  "block text-body text-cream/75 transition-colors duration-220 ease-kaka hover:text-cream max-sm:py-[7px]";

/**
 * Shared footer. Only genuinely dynamic per route: the fourth "tt" social
 * tile, shown only on Vehicle Import & Export (its TikTok is a real,
 * division-specific account, not the group's). That single check is the
 * only reason this is a Client Component rather than a Server Component —
 * everything else here is static.
 */
export function SiteFooter() {
  const pathname = usePathname() ?? "/";
  // Reads the route's division out of the centralized config (data/routes.ts)
  // rather than string-matching the path directly.
  const isImportExport = getRouteConfig(pathname).division?.slug === "vehicle-import-export";

  return (
    <footer className="border-t border-gold/40 bg-ink">
      <div className="wrap pt-28">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 pb-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[60px]">
          <div>
            <div className="mb-6 inline-flex rounded-sm border border-gold/45 bg-cream p-3.5">
              <Image
                src="/assets/kaka-logo.jpg"
                alt="KAKA Group of Companies"
                placeholder="blur"
                blurDataURL={blurPlaceholders["/assets/kaka-logo.jpg"]}
                width={752}
                height={621}
                className="h-[92px] w-auto mix-blend-multiply"
              />
            </div>
            <p className="max-w-[34ch] text-body font-light text-cream/72">
              A Dubai-based group working across property, trade, transport and automotive
              services.
            </p>
          </div>

          <div>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold">
              Divisions
            </div>
            <div className="flex flex-col gap-3.5">
              {footerNav.divisions.map((division) => (
                <a key={division.slug} href={division.href} className={linkClasses}>
                  {division.title}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold">
              Company
            </div>
            <div className="flex flex-col gap-3.5">
              {footerNav.company.map((link) => (
                <a key={link.href + link.label} href={link.href} className={linkClasses}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold">
              Head Office
            </div>
            <p className="mb-[18px] text-body font-light text-cream/75">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.line3}
            </p>
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="border-b border-gold/50 pb-1 text-body text-cream transition-colors duration-220 ease-kaka hover:border-gold max-sm:inline-block max-sm:py-[7px]"
            >
              {siteConfig.phone.display}
            </a>
            <div className="mt-8 flex gap-2.5">
              {socialTiles.map((tile) => {
                const external = tile.href.startsWith("http");
                return (
                  <a
                    key={tile.label}
                    href={tile.href}
                    aria-label={tile.name}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/24 font-mono text-[11px] text-cream/80 transition-colors duration-220 ease-kaka hover:border-gold hover:text-gold"
                  >
                    {tile.label}
                  </a>
                );
              })}
              {isImportExport && (
                <a
                  href={siteConfig.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Shams Ul Haya on TikTok"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-cream/24 font-mono text-[11px] text-cream/80 transition-colors duration-220 ease-kaka hover:border-gold hover:text-gold"
                >
                  tt
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-gold/30 pb-10 pt-8 text-small text-cream/60">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <div className="flex gap-7">
            <a
              href="/contact/"
              className="inline-block transition-colors duration-220 ease-kaka hover:text-gold max-sm:py-[10px]"
            >
              Privacy
            </a>
            <a
              href="/contact/"
              className="inline-block transition-colors duration-220 ease-kaka hover:text-gold max-sm:py-[10px]"
            >
              Terms
            </a>
            <a
              href="/contact/"
              className="inline-block transition-colors duration-220 ease-kaka hover:text-gold max-sm:py-[10px]"
            >
              Trade Licences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
