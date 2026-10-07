import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { settingsApi } from '../services/api';
import type { SiteSettings } from '../types';

const defaultSettings: SiteSettings = {
  businessName: 'Zaffran & Co.',
  phone: '',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  email: '',
  address: '',
  businessHours: '',
  social: {},
  hero: {
    eyebrow: 'WEDDING CATERING',
    heading: 'Where Every Celebration Finds Its Flavour',
    description:
      'Thoughtfully crafted menus and seamless catering for weddings, receptions and celebrations worth remembering.',
  },
  ctaLabels: { primary: 'Get a Quote', secondary: 'Explore Menu' },
};

const SiteSettingsContext = createContext<SiteSettings>(defaultSettings);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    settingsApi
      .get()
      .then((data) => setSettings({ ...defaultSettings, ...data }))
      .catch(() => {
        // Fall back to defaults silently — the site should never block
        // rendering because settings couldn't be fetched.
      });
  }, []);

  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
