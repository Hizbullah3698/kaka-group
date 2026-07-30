import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/data/site";

/**
 * Fixed bottom-right WhatsApp button, present on every page. No client-side
 * state needed — CSS handles the hover transition, so this stays a Server
 * Component.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={siteConfig.whatsapp.label}
      className="fixed bottom-6 right-6 z-overlay flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold shadow-gold transition duration-220 ease-kaka hover:-translate-y-0.5 hover:text-gold-hover hover:shadow-gold-hover"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
