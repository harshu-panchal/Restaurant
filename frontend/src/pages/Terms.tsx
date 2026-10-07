import Seo from '../components/ui/Seo';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Terms() {
  const settings = useSiteSettings();

  return (
    <>
      <Seo title="Terms & Conditions" description="Terms governing enquiries and bookings made with us." path="/terms" />
      <section className="container-page max-w-2xl py-24">
        <h1 className="font-display text-3xl text-charcoal md:text-4xl">Terms &amp; Conditions</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-charcoal/70">
          <p>
            Submitting an enquiry through this website does not confirm a booking with{' '}
            {settings.businessName}. Bookings are confirmed only after a direct conversation with
            our team and mutual agreement on menu, pricing and event details.
          </p>
          <p>
            Pricing shared verbally or in writing is specific to the event details discussed and
            may change if guest count, menu or service requirements change.
          </p>
          <p>For any questions regarding these terms, please reach out via our Contact page.</p>
        </div>
      </section>
    </>
  );
}
