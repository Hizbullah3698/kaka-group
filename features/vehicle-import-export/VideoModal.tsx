"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import type { ShowcaseVideo } from "./videos";

interface VideoModalProps {
  videos: ShowcaseVideo[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

/**
 * Shared lightbox for both the hero's floating play button and the lower
 * "Watch videos here" band — plays through a youtube-nocookie embed instead
 * of linking out, since the source videos live on a personal channel with no
 * KAKA Group / Shams Ul Haya branding.
 */
export function VideoModal({ videos, activeIndex, onSelect, onClose }: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const active = videos[activeIndex];
  if (!active) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={active.title}
      className="fixed inset-0 z-drawer flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div className="w-full max-w-[880px]" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2.5">
            {videos.map((video, index) => (
              <button
                key={video.youtubeId}
                type="button"
                onClick={() => onSelect(index)}
                className={cn(
                  "rounded border px-4 py-2.5 text-[12.5px] uppercase tracking-[.08em] transition duration-220 ease-kaka",
                  index === activeIndex
                    ? "border-gold bg-gold text-ink"
                    : "border-cream/30 text-cream hover:border-gold hover:text-gold"
                )}
              >
                {video.title}
              </button>
            ))}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition duration-220 ease-kaka hover:border-gold hover:text-gold"
          >
            &#10005;
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded bg-black shadow-card-raised">
          <iframe
            key={active.youtubeId}
            src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={active.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
