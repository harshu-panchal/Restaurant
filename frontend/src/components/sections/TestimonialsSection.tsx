import { useState } from 'react';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from '../ui/TestimonialCard';
import LoadingState from '../ui/LoadingState';
import EmptyState from '../ui/EmptyState';
import OrnamentDivider from '../ui/OrnamentDivider';
import { useApi } from '../../hooks/useApi';
import { testimonialsApi } from '../../services/api';

export default function TestimonialsSection() {
  const { data: testimonials, loading } = useApi(() => testimonialsApi.getPublished(), []);
  const [index, setIndex] = useState(0);
  const list = testimonials || [];
  const active = list[index];

  return (
    <section className="py-20 md:py-28">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow="IN THEIR WORDS" heading="Families We've Served" align="center" className="mx-auto" />
        <div className="my-8">
          <OrnamentDivider />
        </div>

        {loading && <LoadingState />}
        {!loading && list.length === 0 && (
          <EmptyState title="Customer testimonial will appear here." description="Reviews are added by the Zaffran & Co. team." />
        )}

        {!loading && active && (
          <div className="text-center">
            <TestimonialCard testimonial={active} centered />
            {list.length > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {list.map((t, i) => (
                  <button
                    key={t._id}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 w-6 transition-colors ${i === index ? 'bg-gold' : 'bg-charcoal/15'}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
