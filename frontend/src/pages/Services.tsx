import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';
import ImageReveal from '../components/ui/ImageReveal';
import QuoteCtaSection from '../components/sections/QuoteCtaSection';
import { useApi } from '../hooks/useApi';
import { servicesApi } from '../services/api';

export default function Services() {
  const { data: services, loading } = useApi(() => servicesApi.getAll(), []);

  return (
    <>
      <Seo
        title="Services"
        description="Catering services for weddings, engagements, Haldi and Mehndi, live counters, private celebrations and corporate events."
        path="/services"
      />
      <PageHeader eyebrow="WHAT WE OFFER" heading="Made for Every Kind of Celebration" image="/images/service-wedding-catering.svg" />

      <section className="container-page py-16 md:py-24">
        {loading && <LoadingState />}
        {!loading && services?.length === 0 && <EmptyState title="Services will be listed here soon." />}

        {!loading && services && (
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
              <article
                key={service._id}
                className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <ImageReveal src={service.image || '/images/service-wedding-catering.svg'} alt={service.title} className="h-[300px] md:h-[420px]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">0{index + 1}</p>
                  <h2 className="font-display mt-3 text-3xl text-charcoal md:text-4xl">{service.title}</h2>
                  <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-charcoal/70">{service.description}</p>
                  {service.features?.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-charcoal/70">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={`/get-a-quote?service=${service.slug}`}
                    className="mt-6 inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-medium tracking-wide text-charcoal hover:text-gold-dark"
                  >
                    Enquire About This Service
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <QuoteCtaSection />
    </>
  );
}
