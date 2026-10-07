import { useParams, Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';
import ImageReveal from '../components/ui/ImageReveal';
import QuoteCtaSection from '../components/sections/QuoteCtaSection';
import { useApi } from '../hooks/useApi';
import { servicesApi } from '../services/api';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data: services, loading } = useApi(() => servicesApi.getAll(), []);
  const service = services?.find((s) => s.slug === slug);

  if (loading) return <LoadingState />;
  if (!service) {
    return (
      <div className="container-page py-32">
        <EmptyState title="This service could not be found." description="It may have been renamed or removed." />
        <div className="mt-6 text-center">
          <Link to="/services" className="text-sm font-medium text-gold-dark underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Seo title={service.title} description={service.description || ''} path={`/services/${service.slug}`} />

      <section className="relative flex min-h-[46vh] items-center overflow-hidden bg-charcoal pt-24">
        <img src={service.image || '/images/service-wedding-catering.svg'} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/20" />
        <div className="container-page relative z-10 py-10">
          <Link to="/services" className="text-xs uppercase tracking-[0.2em] text-gold-light hover:text-gold">
            &larr; All Services
          </Link>
          <h1 className="font-display mt-4 max-w-2xl text-balance text-4xl leading-tight text-ivory md:text-5xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="container-page grid grid-cols-1 gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-24">
        <div>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-charcoal/70">{service.description}</p>
          {service.features?.length > 0 && (
            <ul className="mt-8 space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 border-b border-charcoal/10 pb-3 text-sm text-charcoal/75">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
          <Link
            to={`/get-a-quote?service=${service.slug}`}
            className="mt-8 inline-flex items-center justify-center bg-maroon px-8 py-3.5 text-sm font-medium tracking-wide text-ivory hover:bg-maroon-dark"
          >
            Enquire About This Service
          </Link>
        </div>
        <ImageReveal src={service.image || '/images/service-wedding-catering.svg'} alt={service.title} className="h-[320px] md:h-full" />
      </section>

      <QuoteCtaSection />
    </>
  );
}
