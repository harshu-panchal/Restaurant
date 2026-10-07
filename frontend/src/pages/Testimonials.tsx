import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import TestimonialCard from '../components/ui/TestimonialCard';
import LoadingState from '../components/ui/LoadingState';
import EmptyState from '../components/ui/EmptyState';
import QuoteCtaSection from '../components/sections/QuoteCtaSection';
import { useApi } from '../hooks/useApi';
import { testimonialsApi } from '../services/api';

export default function Testimonials() {
  const { data: testimonials, loading } = useApi(() => testimonialsApi.getPublished(), []);

  return (
    <>
      <Seo
        title="Testimonials"
        description="What families we've worked with have to say about our wedding catering."
        path="/testimonials"
      />
      <PageHeader eyebrow="IN THEIR WORDS" heading="Families We've Served" image="/images/about-story.svg" />

      <section className="container-page py-16 md:py-24">
        {loading && <LoadingState />}
        {!loading && testimonials?.length === 0 && (
          <EmptyState
            title="Customer testimonial will appear here."
            description="Reviews from families we've worked with will be added here by our team."
          />
        )}

        {!loading && testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {testimonials.map((t) => (
              <div key={t._id} className="border-t border-charcoal/10 pt-8">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        )}
      </section>

      <QuoteCtaSection />
    </>
  );
}
