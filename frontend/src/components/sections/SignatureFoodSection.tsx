import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import MenuCard from '../ui/MenuCard';
import LoadingState from '../ui/LoadingState';
import EmptyState from '../ui/EmptyState';
import { useApi } from '../../hooks/useApi';
import { menuApi } from '../../services/api';

export default function SignatureFoodSection() {
  const { data: items, loading } = useApi(() => menuApi.getFeatured(), []);

  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="FROM OUR KITCHEN" heading="Our Signature Favourites" />
          <Link
            to="/menu"
            className="whitespace-nowrap border-b border-gold pb-1 text-sm font-medium tracking-wide text-charcoal hover:text-gold-dark"
          >
            View Full Menu
          </Link>
        </div>

        {loading && <LoadingState />}
        {!loading && items?.length === 0 && <EmptyState title="Menu highlights coming soon." />}

        {!loading && items && items.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {items.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
