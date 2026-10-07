import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import PackageCard from '../ui/PackageCard';
import LoadingState from '../ui/LoadingState';
import { useApi } from '../../hooks/useApi';
import { packagesApi } from '../../services/api';

export default function PackagesPreviewSection() {
  const { data: packages, loading } = useApi(() => packagesApi.getAll(), []);

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="WEDDING PACKAGES"
          heading="A Package for Every Celebration"
          align="center"
          className="mx-auto"
        />

        {loading && <LoadingState />}

        {!loading && packages && (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg._id} pkg={pkg} featured={i === 1} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 border-b border-gold pb-1 text-sm font-medium tracking-wide text-charcoal hover:text-gold-dark"
          >
            Compare All Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
