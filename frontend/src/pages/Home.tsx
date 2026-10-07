import Seo from '../components/ui/Seo';
import { useSiteSettings } from '../hooks/useSiteSettings';
import Hero from '../components/sections/Hero';
import IntroSection from '../components/sections/IntroSection';
import SignatureFoodSection from '../components/sections/SignatureFoodSection';
import ServicesSection from '../components/sections/ServicesSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import PackagesPreviewSection from '../components/sections/PackagesPreviewSection';
import GalleryPreviewSection from '../components/sections/GalleryPreviewSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import QuoteCtaSection from '../components/sections/QuoteCtaSection';

export default function Home() {
  const settings = useSiteSettings();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: settings.businessName,
    ...(settings.address ? { address: settings.address } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    servesCuisine: 'Indian',
    priceRange: '$$',
  };

  return (
    <>
      <Seo
        title="Premium Indian Wedding Catering"
        description="Thoughtfully crafted menus and seamless catering for weddings, receptions and celebrations worth remembering."
        path="/"
        structuredData={structuredData}
      />
      <Hero />
      <IntroSection />
      <SignatureFoodSection />
      <ServicesSection />
      <ExperienceSection />
      <PackagesPreviewSection />
      <GalleryPreviewSection />
      <TestimonialsSection />
      <QuoteCtaSection />
    </>
  );
}
