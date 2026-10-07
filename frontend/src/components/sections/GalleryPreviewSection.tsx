import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import GalleryGrid from '../ui/GalleryGrid';
import LoadingState from '../ui/LoadingState';
import { useApi } from '../../hooks/useApi';
import { galleryApi } from '../../services/api';

export default function GalleryPreviewSection() {
  const { data: items, loading } = useApi(() => galleryApi.getAll(), []);
  const preview = (items || []).slice(0, 6);

  return (
    <section className="bg-cream/60 py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="A GLIMPSE" heading="Moments We've Helped Create" />
          <Link
            to="/gallery"
            className="whitespace-nowrap border-b border-gold pb-1 text-sm font-medium tracking-wide text-charcoal hover:text-gold-dark"
          >
            View Full Gallery
          </Link>
        </div>

        {loading && <LoadingState />}
        {!loading && preview.length > 0 && (
          <div className="mt-12">
            <GalleryGrid items={preview} />
          </div>
        )}
      </div>
    </section>
  );
}
