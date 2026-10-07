import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export default function MobileActionBar() {
  const settings = useSiteSettings();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-charcoal/10 bg-ivory/97 backdrop-blur-sm md:hidden">
      <a
        href={buildWhatsAppLink(settings.whatsapp, 'Hello, I would like to enquire about wedding catering.')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-r border-charcoal/10 py-3.5 text-sm font-medium text-charcoal/80"
      >
        WhatsApp
      </a>
      <Link
        to="/get-a-quote"
        className="flex items-center justify-center bg-maroon py-3.5 text-sm font-medium text-ivory"
      >
        {settings.ctaLabels?.primary || 'Get a Quote'}
      </Link>
    </div>
  );
}
