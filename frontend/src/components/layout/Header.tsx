import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { buildWhatsAppLink } from '../../utils/whatsapp';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Menu', to: '/menu' },
  { label: 'Packages', to: '/packages' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const settings = useSiteSettings();
  const isHome = location.pathname === '/';

  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'bg-ivory/95 shadow-[0_1px_0_rgba(23,21,19,0.08)] backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between md:h-[88px]">
        <Link to="/" className="font-display text-xl tracking-wide md:text-2xl" style={{ color: solid ? '#171513' : '#F7F2E8' }}>
          {settings.businessName}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium tracking-wide transition-colors',
                  solid ? 'text-charcoal/80 hover:text-gold-dark' : 'text-ivory/90 hover:text-gold-light',
                  isActive && (solid ? 'text-gold-dark' : 'text-gold-light')
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center bg-maroon px-6 py-2.5 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-maroon-dark"
          >
            {settings.ctaLabels?.primary || 'Get a Quote'}
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <div className="flex h-4 w-6 flex-col justify-between">
            <span
              className={cn('h-[1.5px] w-full transition-transform', menuOpen && 'translate-y-[7px] rotate-45')}
              style={{ backgroundColor: solid ? '#171513' : '#F7F2E8' }}
            />
            <span
              className={cn('h-[1.5px] w-full transition-opacity', menuOpen && 'opacity-0')}
              style={{ backgroundColor: solid ? '#171513' : '#F7F2E8' }}
            />
            <span
              className={cn('h-[1.5px] w-full transition-transform', menuOpen && '-translate-y-[7px] -rotate-45')}
              style={{ backgroundColor: solid ? '#171513' : '#F7F2E8' }}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden bg-ivory lg:hidden"
          >
            <nav className="container-page flex flex-col gap-1 pb-6 pt-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'border-b border-charcoal/10 py-3.5 text-base text-charcoal/80',
                      isActive && 'text-gold-dark'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to="/get-a-quote"
                  className="bg-maroon px-6 py-3 text-center text-sm font-medium tracking-wide text-ivory"
                >
                  {settings.ctaLabels?.primary || 'Get a Quote'}
                </Link>
                {settings.whatsapp && (
                  <a
                    href={buildWhatsAppLink(settings.whatsapp, 'Hello, I would like to enquire about wedding catering.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-charcoal/20 px-6 py-3 text-center text-sm font-medium tracking-wide text-charcoal/80"
                  >
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
