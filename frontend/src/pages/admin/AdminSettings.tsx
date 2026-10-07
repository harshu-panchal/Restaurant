import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import { settingsApi } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import AdminField from '../../components/admin/AdminField';
import LoadingState from '../../components/ui/LoadingState';
import type { SiteSettings } from '../../types';

export default function AdminSettings() {
  const { data, loading } = useApi(() => settingsApi.get(), []);
  const { show } = useToast();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<SiteSettings>();

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  async function onSubmit(values: SiteSettings) {
    await settingsApi.update(values);
    show('Settings saved.');
  }

  if (loading) return <LoadingState />;

  return (
    <div>
      <h1 className="font-display text-2xl text-slate-800">Settings</h1>
      <p className="mt-2 max-w-xl text-sm text-slate-500">
        These values power the business details shown across the public site — contact info,
        hero text and call-to-action labels.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-2xl space-y-8">
        <section className="space-y-4 rounded border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-700">Business Identity</p>
          <AdminField label="Business Name">
            <input className="admin-input" {...register('businessName', { required: true })} />
          </AdminField>
        </section>

        <section className="space-y-4 rounded border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-700">Contact Information</p>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Phone">
              <input className="admin-input" {...register('phone')} />
            </AdminField>
            <AdminField label="WhatsApp Number" hint="Include country code, digits only e.g. 911234567890">
              <input className="admin-input" {...register('whatsapp')} />
            </AdminField>
          </div>
          <AdminField label="Email">
            <input className="admin-input" {...register('email')} />
          </AdminField>
          <AdminField label="Address">
            <textarea rows={2} className="admin-input" {...register('address')} />
          </AdminField>
          <AdminField label="Business Hours">
            <input className="admin-input" {...register('businessHours')} />
          </AdminField>
          <AdminField label="Google Maps Embed URL (optional)">
            <input className="admin-input" {...register('mapEmbedUrl')} />
          </AdminField>
        </section>

        <section className="space-y-4 rounded border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-700">Social Links</p>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Instagram URL">
              <input className="admin-input" {...register('social.instagram')} />
            </AdminField>
            <AdminField label="Facebook URL">
              <input className="admin-input" {...register('social.facebook')} />
            </AdminField>
          </div>
        </section>

        <section className="space-y-4 rounded border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-700">Homepage Hero</p>
          <AdminField label="Eyebrow">
            <input className="admin-input" {...register('hero.eyebrow')} />
          </AdminField>
          <AdminField label="Heading">
            <input className="admin-input" {...register('hero.heading')} />
          </AdminField>
          <AdminField label="Description">
            <textarea rows={3} className="admin-input" {...register('hero.description')} />
          </AdminField>
        </section>

        <section className="space-y-4 rounded border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-700">Call-to-Action Labels</p>
          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Primary Button">
              <input className="admin-input" {...register('ctaLabels.primary')} />
            </AdminField>
            <AdminField label="Secondary Button">
              <input className="admin-input" {...register('ctaLabels.secondary')} />
            </AdminField>
          </div>
        </section>

        <button type="submit" disabled={isSubmitting} className="rounded bg-slate-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-700">
          {isSubmitting ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
