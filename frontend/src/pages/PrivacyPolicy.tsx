import Seo from '../components/ui/Seo';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function PrivacyPolicy() {
  const settings = useSiteSettings();

  return (
    <>
      <Seo title="Privacy Policy" description="How we handle the information you share with us." path="/privacy-policy" />
      <section className="container-page max-w-2xl py-24">
        <h1 className="font-display text-3xl text-charcoal md:text-4xl">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-charcoal/70">
          <p>
            This page outlines how {settings.businessName} collects and uses the information you
            share with us through our website, primarily when you submit a catering enquiry.
          </p>
          <p>
            Information you provide — such as your name, phone number, email address and event
            details — is used only to respond to your enquiry and plan your catering, and is not
            sold or shared with third parties for marketing purposes.
          </p>
          <p>
            If you have questions about your data, please contact us using the details on our
            Contact page.
          </p>
        </div>
      </section>
    </>
  );
}
