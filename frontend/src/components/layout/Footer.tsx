import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../hooks/useSiteSettings';

const EXPLORE_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Menu', to: '/menu' },
  { label: 'Packages', to: '/packages' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Testimonials', to: '/testimonials' },
];

const SERVICE_LINKS = [
  'Wedding Catering',
  'Engagements',
  'Haldi & Mehndi',
  'Live Counters',
  'Private Celebrations',
  'Corporate Events',
];

export default function Footer() {
  const settings = useSiteSettings();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-4 md:gap-8 md:py-20">
        <div className="md:col-span-1">
          <p className="font-display text-2xl text-ivory">{settings.businessName}</p>
          <p className="mt-4 text-sm leading-relaxed text-ivory/60">
            Thoughtfully prepared menus and attentive service for weddings and celebrations that deserve
            something extraordinary.
          </p>
          <div className="mt-6 flex gap-4">
            {settings.social?.instagram && (
              <a href={settings.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ivory/60 hover:text-gold-light">
                Instagram
              </a>
            )}
            {settings.social?.facebook && (
              <a href={settings.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ivory/60 hover:text-gold-light">
                Facebook
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-ivory/65 hover:text-ivory">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Services</p>
          <ul className="space-y-2.5 text-sm text-ivory/65">
            {SERVICE_LINKS.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Contact</p>
          <ul className="space-y-2.5 text-sm text-ivory/65">
            {settings.phone && <li>{settings.phone}</li>}
            {settings.email && <li>{settings.email}</li>}
            {settings.address && <li className="leading-relaxed">{settings.address}</li>}
            {settings.businessHours && <li>{settings.businessHours}</li>}
          </ul>
          <Link
            to="/get-a-quote"
            className="mt-6 inline-flex border border-ivory/25 px-5 py-2.5 text-sm text-ivory/85 hover:border-gold-light hover:text-gold-light"
          >
            {settings.ctaLabels?.primary || 'Get a Quote'}
          </Link>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {settings.businessName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-ivory/70">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-ivory/70">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
