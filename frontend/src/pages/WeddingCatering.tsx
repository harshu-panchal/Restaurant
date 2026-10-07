import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import ImageReveal from '../components/ui/ImageReveal';
import ExperienceSection from '../components/sections/ExperienceSection';
import PackagesPreviewSection from '../components/sections/PackagesPreviewSection';
import QuoteCtaSection from '../components/sections/QuoteCtaSection';
import { LinkButton } from '../components/ui/Button';

export default function WeddingCatering() {
  return (
    <>
      <Seo
        title="Wedding Catering"
        description="Complete wedding catering — menu planning, live counters, buffet styling and on-site service for weddings and receptions."
        path="/wedding-catering"
      />
      <PageHeader
        eyebrow="OUR FLAGSHIP SERVICE"
        heading="Wedding Catering, Planned Around Your Day"
        description="From the baraat to the last course served, we manage the food so you can focus on the celebration."
        image="/images/service-wedding-catering.svg"
      />

      <section className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-24">
        <ImageReveal src="/images/service-wedding-catering.svg" alt="Wedding buffet setup" className="h-[320px] md:h-[460px]" />
        <div>
          <SectionHeading eyebrow="WHAT'S INCLUDED" heading="Complete, End-to-End Catering" />
          <ul className="mt-6 space-y-3">
            {[
              'Menu planning across starters, mains, breads, rice and desserts',
              'Buffet or plated service, styled to match your venue',
              'Live counters for chaat, grills or regional specialities',
              'Trained service staff present through the event',
              'Coordination with your venue and event planner',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-charcoal/75">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <LinkButton to="/get-a-quote?service=wedding-catering">Plan Your Wedding</LinkButton>
          </div>
        </div>
      </section>

      <ExperienceSection />
      <PackagesPreviewSection />
      <QuoteCtaSection />
    </>
  );
}
