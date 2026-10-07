import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import { AnchorButton, LinkButton } from '../components/ui/Button';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function Contact() {
  const settings = useSiteSettings();

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with our team by phone, WhatsApp or email, or visit us to discuss your celebration."
        path="/contact"
      />
      <PageHeader eyebrow="GET IN TOUCH" heading="We'd Love to Hear About Your Celebration" image="/images/contact-map.svg" />

      <section className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-2 md:gap-20 md:py-24">
        <div>
          <h2 className="font-display text-2xl text-charcoal">Reach Us Directly</h2>
          <div className="mt-8 space-y-7">
            {settings.phone && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">Phone</p>
                <a href={`tel:${settings.phone}`} className="mt-1 block text-lg text-charcoal hover:text-maroon">
                  {settings.phone}
                </a>
              </div>
            )}
            {settings.whatsapp && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">WhatsApp</p>
                <a
                  href={buildWhatsAppLink(settings.whatsapp, 'Hello, I would like to enquire about wedding catering.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-lg text-charcoal hover:text-maroon"
                >
                  Message us on WhatsApp
                </a>
              </div>
            )}
            {settings.email && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">Email</p>
                <a href={`mailto:${settings.email}`} className="mt-1 block text-lg text-charcoal hover:text-maroon">
                  {settings.email}
                </a>
              </div>
            )}
            {settings.address && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">Address</p>
                <p className="mt-1 max-w-sm text-base leading-relaxed text-charcoal/75">{settings.address}</p>
              </div>
            )}
            {settings.businessHours && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">Business Hours</p>
                <p className="mt-1 text-base text-charcoal/75">{settings.businessHours}</p>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton to="/get-a-quote">Request a Quote</LinkButton>
            {settings.whatsapp && (
              <AnchorButton
                href={buildWhatsAppLink(settings.whatsapp, 'Hello, I would like to enquire about wedding catering.')}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                Chat on WhatsApp
              </AnchorButton>
            )}
          </div>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden bg-cream">
          {settings.mapEmbedUrl ? (
            <iframe
              src={settings.mapEmbedUrl}
              title="Our location"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <img src="/images/contact-map.svg" alt="Map placeholder" className="h-full w-full object-cover" />
          )}
        </div>
      </section>
    </>
  );
}
