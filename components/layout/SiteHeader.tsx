"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FocusEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";

import { divisions } from "@/data/nav";
import { getRouteConfig } from "@/data/routes";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const megaId = useId();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const megaWrapRef = useRef<HTMLDivElement>(null);
  const closeMegaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Centralized per-route config (data/routes.ts) — whether this page has a
  // dark hero the header can float transparently over. Careers reads
  // `transparentHeader: false` from there, so it always gets the solid header.
  const canBeTransparent = getRouteConfig(pathname).transparentHeader;
  // Solidify while the mobile drawer is open too — a transparent bar above a
  // white drawer panel reads as a rendering bug, not a design choice.
  const solid = scrolled || !canBeTransparent || mobileOpen;

  const currentDivision = divisions.find((division) => division.href === pathname);
  const businessesActive = Boolean(currentDivision);

  // Scroll-state threshold, matches the approved handoff (40px).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open overlay on route change so a navigation doesn't leave the
  // mega menu or drawer stuck open on the next page.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Escape closes whichever overlay is open and returns focus to its trigger.
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
      } else if (megaOpen) {
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, mobileOpen]);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // Minimal focus trap for the mobile drawer: focus the first link on open,
  // wrap Tab/Shift+Tab at the panel's edges.
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const openMega = () => {
    if (closeMegaTimeout.current) clearTimeout(closeMegaTimeout.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    closeMegaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  };
  const onMegaWrapBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!megaWrapRef.current?.contains(event.relatedTarget as Node | null)) {
      setMegaOpen(false);
    }
  };

  // Subtitle/eyebrow accent — always gold-on-dark, gold-dark-on-light,
  // per the handoff's `subStyle`. Nav link color is handled separately
  // below: active links stay ink/cream (not gold) and get a gold
  // underline instead, matching `navLink()` in the approved source.
  const accentColor = solid ? "text-gold-dark" : "text-gold";
  const navInactive = solid ? "text-graphite" : "text-cream/82";
  const navActive = solid ? "text-ink" : "text-cream";
  const navLinkClass = (isActive: boolean) =>
    cn(
      "border-b py-[7px] text-[14.5px] tracking-[.04em] transition-[color,border-color] duration-300 ease-kaka hover:text-gold",
      isActive ? cn(navActive, "border-gold") : cn(navInactive, "border-transparent")
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-header transition-[padding] duration-300 ease-kaka",
        solid ? "p-[16px_24px]" : "p-0"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between transition-[max-width,height,background-color,border-color,box-shadow,border-radius,padding] duration-[460ms] ease-kaka",
          solid
            ? "h-[72px] max-w-[1200px] rounded-2xl border border-gold/35 bg-cream/94 px-7 shadow-[0_20px_50px_rgba(11,18,32,.18)] backdrop-blur-lg backdrop-saturate-[108%]"
            : "h-[104px] max-w-[1400px] border border-transparent bg-transparent px-10"
        )}
      >
        <Link href="/" className="flex items-center gap-3.5">
          <Image
            src="/assets/kaka-mark.png"
            alt=""
            width={1254}
            height={1254}
            priority
            className={cn(
              "w-auto mix-blend-multiply transition-[height,opacity] duration-[400ms] ease-out",
              solid ? "h-[42px] opacity-100" : "h-0 opacity-0"
            )}
          />
          <span className="flex flex-col gap-0.5">
            <span
              className={cn(
                "font-display text-lg leading-none transition-colors duration-300 ease-kaka",
                solid ? "text-ink" : "text-cream"
              )}
            >
              KAKA
            </span>
            <span
              className={cn(
                "font-mono text-[9px] uppercase tracking-eyebrow-tight transition-colors duration-300 ease-kaka",
                accentColor
              )}
            >
              Group of Companies
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-9">
          <div className="hidden items-center gap-9 md:flex">
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={navLinkClass(pathname === "/")}
            >
              Home
            </Link>
            <Link href="/#about" className={navLinkClass(false)}>
              About
            </Link>

            <div
              ref={megaWrapRef}
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
              onBlur={onMegaWrapBlur}
            >
              <Link
                href="/#divisions"
                aria-haspopup="true"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onFocus={openMega}
                className={cn("flex items-center gap-1.5", navLinkClass(businessesActive))}
              >
                Businesses
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-[9px] text-gold transition-transform duration-220 ease-kaka",
                    megaOpen && "rotate-180"
                  )}
                >
                  &#9662;
                </span>
              </Link>

              <div
                id={megaId}
                aria-label="Businesses"
                className={cn(
                  "absolute left-1/2 top-full z-overlay mt-4 w-[640px] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-lg border border-gold/35 border-t-2 border-t-gold bg-white shadow-card-raised transition duration-220 ease-kaka",
                  megaOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                )}
              >
                <div className="grid grid-cols-2">
                  {divisions.map((division, index) => {
                    const isCurrent = pathname === division.href;
                    const isLast = index === divisions.length - 1;
                    return (
                      <Link
                        key={division.slug}
                        href={division.href}
                        className={cn(
                          "p-[26px_32px] transition-[background-color,padding-left] duration-220 ease-kaka hover:bg-cream hover:pl-[38px]",
                          !isLast && "border-b border-ink/[.08]",
                          index % 2 === 0 && !isLast && "border-r border-ink/[.08]",
                          isLast && "col-span-2",
                          isCurrent && "bg-cream-alt shadow-inset-gold"
                        )}
                      >
                        <div
                          className={cn(
                            "font-display text-[19px]",
                            isCurrent ? "text-gold-dark" : "text-ink"
                          )}
                        >
                          {division.title}
                        </div>
                        <div className="mt-1.5 text-small text-graphite">
                          {division.shortDescription}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link
              href="/contact/"
              aria-current={pathname === "/contact/" ? "page" : undefined}
              className={navLinkClass(pathname === "/contact/")}
            >
              Contact
            </Link>
            <Link
              href="/contact/"
              className="rounded bg-gold px-[26px] py-[13px] text-[13px] uppercase tracking-[.14em] text-ink shadow-gold transition duration-220 ease-kaka hover:-translate-y-0.5 hover:bg-gold-hover hover:shadow-gold-hover"
            >
              Enquire
            </Link>
          </div>

          <button
            type="button"
            ref={burgerRef}
            aria-label="Menu"
            aria-controls="mobile-nav"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={cn(
              "flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden",
              solid ? "text-ink" : "text-cream"
            )}
          >
            <span
              className={cn(
                "block h-px w-6 bg-current transition-transform duration-220 ease-kaka",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-current transition-opacity duration-220 ease-kaka",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-current transition-transform duration-220 ease-kaka",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </nav>
      </div>

      {/* Full-width drawer. Not marked as a modal dialog: it has no backdrop
          and doesn't make the rest of the page inert, so `aria-modal` would
          overclaim. Keyboard usability instead comes from the focus trap,
          Escape-to-close and focus-return implemented above. */}
      <nav
        id="mobile-nav"
        ref={mobilePanelRef}
        aria-label="Mobile navigation"
        className={cn(
          "absolute inset-x-0 top-full overflow-hidden bg-white shadow-card-raised transition-[max-height] duration-300 ease-kaka md:hidden",
          mobileOpen ? "max-h-[calc(100svh-var(--header-height))]" : "max-h-0"
        )}
      >
        <div className="flex flex-col px-8 pb-8 pt-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="min-h-[43px] border-b border-ink/[.08] py-4 text-[17px] text-ink"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileOpen(false)}
            className="min-h-[43px] border-b border-ink/[.08] py-4 text-[17px] text-ink"
          >
            About
          </Link>
          <div className="pb-2 pt-5 font-mono text-[10px] uppercase tracking-eyebrow-tight text-gold-dark">
            Businesses
          </div>
          {divisions.map((division) => {
            const isCurrent = pathname === division.href;
            return (
              <Link
                key={division.slug}
                href={division.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "min-h-[43px] py-3 pl-4 text-body",
                  isCurrent ? "border-l-2 border-gold text-gold-dark" : "text-graphite"
                )}
              >
                {division.title}
              </Link>
            );
          })}
          <Link
            href="/contact/"
            onClick={() => setMobileOpen(false)}
            className="mt-5 min-h-[43px] border-t border-ink/[.08] py-4 text-[17px] text-ink"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
