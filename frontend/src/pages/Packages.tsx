import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import PackageCard from '../components/ui/PackageCard';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';
import QuoteCtaSection from '../components/sections/QuoteCtaSection';
import { useApi } from '../hooks/useApi';
import { packagesApi } from '../services/api';

export default function Packages() {
  const { data: packages, loading } = useApi(() => packagesApi.getAll(), []);

  return (
    <>
      <Seo
        title="Wedding Packages"
        description="Classic, Signature and Royal wedding catering packages — fully customizable to your celebration."
        path="/packages"
      />
      <PageHeader
        eyebrow="WEDDING PACKAGES"
        heading="Packages Designed Around Your Celebration"
        description="Every package is a starting point — menus, counters and service can all be customized."
        image="/images/package-signature.svg"
      />

      <section className="container-page py-16 md:py-24">
        {loading && <LoadingState />}
        {!loading && packages?.length === 0 && <EmptyState title="Packages will be published here soon." />}

        {!loading && packages && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg._id} pkg={pkg} featured={i === 1} />
            ))}
          </div>
        )}

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-charcoal/50">
          All packages are fully customizable. Pricing depends on guest count, menu selection and
          service requirements — request pricing for a quote tailored to your event.
        </p>
      </section>

      <QuoteCtaSection />
    </>
  );
}
