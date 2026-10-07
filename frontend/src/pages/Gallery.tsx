import { useMemo, useState } from 'react';
import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import GalleryGrid from '../components/ui/GalleryGrid';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';
import { useApi } from '../hooks/useApi';
import { galleryApi } from '../services/api';
import { cn } from '../utils/cn';
import type { GalleryCategory } from '../types';

const FILTERS: { label: string; value: GalleryCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Weddings', value: 'wedding' },
  { label: 'Food', value: 'food' },
  { label: 'Buffet Setup', value: 'buffet' },
  { label: 'Live Counters', value: 'live-counter' },
  { label: 'Decor', value: 'decor' },
  { label: 'Events', value: 'other' },
];

export default function Gallery() {
  const { data: items, loading } = useApi(() => galleryApi.getAll(), []);
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all');

  const visible = useMemo(
    () => (filter === 'all' ? items || [] : (items || []).filter((item) => item.category === filter)),
    [items, filter]
  );

  return (
    <>
      <Seo
        title="Gallery"
        description="A look at our wedding catering work — food, buffet setups, live counters and event decor."
        path="/gallery"
      />
      <PageHeader eyebrow="OUR WORK" heading="Moments We've Helped Create" image="/images/gallery-wedding-2.svg" />

      <section className="container-page py-16 md:py-20">
        <div className="flex flex-wrap gap-2 border-b border-charcoal/10 pb-6">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium tracking-wide transition-colors',
                filter === f.value ? 'bg-charcoal text-ivory' : 'text-charcoal/60 hover:text-charcoal'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && <LoadingState />}
        {!loading && visible.length === 0 && <EmptyState title="No photos in this category yet." />}

        {!loading && visible.length > 0 && (
          <div className="mt-10">
            <GalleryGrid items={visible} />
          </div>
        )}
      </section>
    </>
  );
}
