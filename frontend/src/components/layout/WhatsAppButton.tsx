import { useSiteSettings } from '../../hooks/useSiteSettings';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export default function WhatsAppButton() {
  const settings = useSiteSettings();
  if (!settings.whatsapp) return null;

  const link = buildWhatsAppLink(settings.whatsapp, 'Hello, I would like to enquire about wedding catering.');

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-105 md:bottom-7 md:right-7"
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.43 1.27 4.88L2 22l5.3-1.39A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.2c-1.55 0-3-.42-4.24-1.15l-.3-.18-3.15.82.84-3.07-.2-.32A8.17 8.17 0 0 1 3.84 12c0-4.53 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.67 8.2-8.2 8.2Zm4.48-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.17.25-.63.8-.78.96-.14.17-.29.18-.53.06-1.45-.72-2.4-1.29-3.36-2.92-.25-.44.25-.41.72-1.36.08-.17.04-.3-.03-.42-.08-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.3-.01-.47-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.6.13.17 1.77 2.7 4.29 3.68 2.08.81 2.5.65 2.95.6.45-.04 1.46-.6 1.66-1.18.2-.57.2-1.07.14-1.18-.06-.1-.23-.16-.47-.28Z" />
      </svg>
    </a>
  );
}
