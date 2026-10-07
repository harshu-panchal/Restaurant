import { useMemo, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useSearchParams } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHeader from '../components/sections/PageHeader';
import Button, { AnchorButton } from '../components/ui/Button';
import { enquiryApi } from '../services/api';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { buildWhatsAppLink } from '../utils/whatsapp';

const EVENT_TYPES = ['Wedding', 'Reception', 'Engagement', 'Mehndi', 'Haldi', 'Birthday', 'Anniversary', 'Corporate', 'Other'];
const CUISINES = ['North Indian', 'South Indian', 'Mughlai', 'Chinese', 'Continental', 'Street Food / Chaat'];
const SERVICE_OPTIONS = [
  'Wedding Catering',
  'Engagement',
  'Haldi & Mehndi',
  'Live Counters',
  'Private Celebration',
  'Corporate Event',
];
const BUDGET_RANGES = ['Not sure yet', 'Under ₹800 / guest', '₹800 – ₹1,500 / guest', '₹1,500 – ₹2,500 / guest', 'Above ₹2,500 / guest'];

interface FormValues {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  guestCount: string;
  foodPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Mixed';
  cuisinePreferences: string[];
  services: string[];
  budget: string;
  message: string;
}

export default function GetQuote() {
  const settings = useSiteSettings();
  const location = useLocation() as { state?: { message?: string } };
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastName, setLastName] = useState('');

  const prefillService = searchParams.get('service');
  const prefillPackage = searchParams.get('package');

  const defaultMessage = useMemo(() => {
    if (location.state?.message) return location.state.message;
    if (prefillPackage) return `I'm interested in the "${prefillPackage}" package.`;
    return '';
  }, [location.state, prefillPackage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      foodPreference: 'Mixed',
      cuisinePreferences: [],
      services: prefillService ? [prefillService] : [],
      message: defaultMessage,
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await enquiryApi.create({
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        eventType: values.eventType as FormValues['eventType'],
        eventDate: values.eventDate || undefined,
        eventLocation: values.eventLocation || undefined,
        guestCount: values.guestCount ? Number(values.guestCount) : undefined,
        foodPreference: values.foodPreference,
        cuisinePreferences: values.cuisinePreferences,
        services: values.services,
        budget: values.budget || undefined,
        message: values.message || undefined,
      });
      setLastName(values.name.split(' ')[0]);
      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("We couldn't submit your enquiry right now. Please try again, or reach us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Get a Quote"
        description="Request a tailored catering quote for your wedding, engagement or celebration."
        path="/get-a-quote"
      />
      <PageHeader
        eyebrow="REQUEST A QUOTE"
        heading="Tell Us About Your Celebration"
        description="Share a few details and our team will get back to you with a tailored catering plan."
      />

      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          {submitted ? (
            <div className="border border-gold/40 bg-cream/50 p-10 text-center">
              <p className="font-display text-2xl text-charcoal">Thank you{lastName ? `, ${lastName}` : ''}.</p>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-charcoal/70">
                Your enquiry has been received. Our team will get in touch shortly.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Submit Another Enquiry
                </Button>
                {settings.whatsapp && (
                  <AnchorButton
                    href={buildWhatsAppLink(settings.whatsapp, 'Hello, I just submitted a catering enquiry and wanted to follow up here as well.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Also Message Us on WhatsApp
                  </AnchorButton>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-charcoal">Personal Information</legend>
                <Field label="Full Name" error={errors.name?.message}>
                  <input className="input" {...register('name', { required: 'Please enter your name' })} />
                </Field>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Phone Number" error={errors.phone?.message}>
                    <input type="tel" className="input" {...register('phone', { required: 'Please enter your phone number' })} />
                  </Field>
                  <Field label="Email (optional)" error={errors.email?.message}>
                    <input
                      type="email"
                      className="input"
                      {...register('email', {
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                      })}
                    />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-charcoal">Event Information</legend>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Event Type" error={errors.eventType?.message}>
                    <select className="input" defaultValue="" {...register('eventType', { required: 'Please select an event type' })}>
                      <option value="" disabled>
                        Select event type
                      </option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Event Date">
                    <input type="date" className="input" {...register('eventDate')} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Event Location">
                    <input className="input" placeholder="City / venue" {...register('eventLocation')} />
                  </Field>
                  <Field label="Approximate Guest Count">
                    <input type="number" min={1} className="input" {...register('guestCount')} />
                  </Field>
                </div>
              </fieldset>

              <fieldset className="space-y-5">
                <legend className="font-display text-xl text-charcoal">Catering Preferences</legend>

                <Field label="Food Preference">
                  <div className="flex flex-wrap gap-5">
                    {(['Vegetarian', 'Non-Vegetarian', 'Mixed'] as const).map((option) => (
                      <label key={option} className="flex items-center gap-2 text-sm text-charcoal/75">
                        <input type="radio" value={option} className="accent-maroon" {...register('foodPreference')} />
                        {option}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="Cuisine Preferences">
                  <div className="flex flex-wrap gap-4">
                    {CUISINES.map((cuisine) => (
                      <label key={cuisine} className="flex items-center gap-2 text-sm text-charcoal/75">
                        <input type="checkbox" value={cuisine} className="accent-maroon" {...register('cuisinePreferences')} />
                        {cuisine}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="Required Services">
                  <div className="flex flex-wrap gap-4">
                    {SERVICE_OPTIONS.map((service) => (
                      <label key={service} className="flex items-center gap-2 text-sm text-charcoal/75">
                        <input type="checkbox" value={service} className="accent-maroon" {...register('services')} />
                        {service}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field label="Budget Range (optional)">
                  <select className="input" defaultValue="" {...register('budget')}>
                    <option value="">Prefer not to say</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Additional Requirements / Message">
                  <textarea rows={4} className="input" {...register('message')} />
                </Field>
              </fieldset>

              {submitError && <p className="text-sm text-maroon">{submitError}</p>}

              <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? 'Submitting…' : 'Request Catering Quote'}
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-charcoal/80">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-maroon">{error}</span>}
    </label>
  );
}
