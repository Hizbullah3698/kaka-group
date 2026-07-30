interface WhatsAppIconProps {
  size?: number;
  className?: string;
}

/**
 * The WhatsApp glyph used on `FloatingWhatsApp` (the global button) and
 * Careers' CV-panel WhatsApp CTA — identical path data in both places,
 * confirmed as a genuine second usage rather than promoted speculatively.
 * Renders with `stroke="currentColor"`, so callers control color the
 * normal Tailwind way (`text-gold`, etc.) instead of a hardcoded hex.
 */
export function WhatsAppIcon({ size = 24, className }: WhatsAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3.6 20.4l1.5-4.6A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M9.3 9c-.3.7-.2 1.6.4 2.5.8 1.2 1.9 2.1 3.3 2.6.8.3 1.5.2 2-.3l.5-.6-2-1.2-.7.6c-.6-.3-1.4-1.1-1.8-1.8l.6-.7-1.1-1.8-.7.1Z" />
    </svg>
  );
}
