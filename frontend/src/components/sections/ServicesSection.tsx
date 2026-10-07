import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import ImageReveal from '../ui/ImageReveal';
import { useApi } from '../../hooks/useApi';
import { servicesApi } from '../../services/api';
import LoadingState from '../ui/LoadingState';

export default function ServicesSection() {
  const { data: services, loading } = useApi(() => servicesApi.getAll(), []);
  const list = (services || []).slice(0, 5);
  const [feature, ...rest] = list;

  return (
    <section className="bg-cream/60 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="WHAT WE OFFER"
          heading="Made for Every Kind of Celebration"
          align="center"
          className="mx-auto"
        />

        {loading && <LoadingState />}

        {!loading && feature && (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-6">
            <Link
              to={`/services/${feature.slug}`}
              className="group relative col-span-1 overflow-hidden md:col-span-2 md:row-span-2"
            >
              <ImageReveal src={feature.image || '/images/service-wedding-catering.svg'} alt={feature.title} className="h-[320px] md:h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
              <div className="absolute bottom-0 p-7">
                <p className="font-display text-2xl text-ivory">{feature.title}</p>
                <p className="mt-2 max-w-xs text-sm text-ivory/75">{feature.description}</p>
              </div>
            </Link>

            <div className="col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-3">
              {rest.map((service) => (
                <Link
                  key={service._id}
                  to={`/services/${service.slug}`}
                  className="group border border-charcoal/10 bg-ivory p-6 transition-colors hover:border-gold"
                >
                  <p className="font-display text-xl text-charcoal">{service.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{service.description}</p>
                  <span className="mt-4 inline-block text-xs font-medium uppercase tracking-wide text-gold-dark">
                    Learn more
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-medium tracking-wide text-charcoal hover:text-gold-dark"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
