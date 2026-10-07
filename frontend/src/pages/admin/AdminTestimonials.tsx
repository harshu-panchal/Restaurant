import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import { testimonialsApi } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import AdminTable from '../../components/admin/AdminTable';
import AdminField from '../../components/admin/AdminField';
import ImageUploadField from '../../components/admin/ImageUploadField';
import Modal from '../../components/ui/Modal';
import LoadingState from '../../components/ui/LoadingState';
import type { Testimonial } from '../../types';

interface FormValues {
  name: string;
  eventType: string;
  testimonial: string;
  image: string;
  isPublished: boolean;
  order: number;
}

const emptyValues: FormValues = { name: '', eventType: '', testimonial: '', image: '', isPublished: false, order: 0 };

export default function AdminTestimonials() {
  const { data, loading } = useApi(() => testimonialsApi.getAll(), []);
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { show } = useToast();

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm<FormValues>({ defaultValues: emptyValues });

  function openCreate() {
    setEditing(null);
    reset(emptyValues);
    setModalOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    reset({
      name: t.name,
      eventType: t.eventType || '',
      testimonial: t.testimonial,
      image: t.image || '',
      isPublished: t.isPublished,
      order: t.order,
    });
    setModalOpen(true);
  }

  async function onSubmit(values: FormValues) {
    if (editing) {
      const updated = await testimonialsApi.update(editing._id, values);
      setRows((prev) => prev.map((r) => (r._id === editing._id ? updated : r)));
      show('Testimonial updated.');
    } else {
      const created = await testimonialsApi.create(values);
      setRows((prev) => [...prev, created]);
      show('Testimonial created.');
    }
    setModalOpen(false);
  }

  async function remove(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    await testimonialsApi.remove(id);
    setRows((prev) => prev.filter((r) => r._id !== id));
    show('Testimonial deleted.');
  }

  if (loading) return <LoadingState />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-slate-800">Testimonials</h1>
        <button onClick={openCreate} className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Add Testimonial
        </button>
      </div>
      <p className="mt-2 max-w-xl text-sm text-slate-500">
        Only testimonials you mark as Published will appear on the public site. Never publish a
        quote you haven't actually received from a customer.
      </p>

      <div className="mt-6">
        <AdminTable
          rows={rows}
          rowKey={(r) => r._id}
          emptyLabel="No testimonials yet."
          columns={[
            { header: 'Name', render: (r) => r.name },
            { header: 'Event', render: (r) => r.eventType || '—' },
            { header: 'Testimonial', render: (r) => <span className="line-clamp-1 max-w-xs">{r.testimonial}</span> },
            { header: 'Published', render: (r) => (r.isPublished ? 'Yes' : 'No') },
            {
              header: '',
              render: (r) => (
                <div className="flex gap-3 text-xs">
                  <button onClick={() => openEdit(r)} className="text-slate-500 hover:text-slate-800">
                    Edit
                  </button>
                  <button onClick={() => remove(r._id)} className="text-red-400 hover:text-red-600">
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[85vh] w-[90vw] max-w-lg space-y-4 overflow-y-auto rounded bg-white p-6">
          <p className="font-display text-xl text-slate-800">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</p>

          <AdminField label="Customer Name">
            <input className="admin-input" {...register('name', { required: true })} />
          </AdminField>
          <AdminField label="Event Type">
            <input className="admin-input" placeholder="e.g. Wedding" {...register('eventType')} />
          </AdminField>
          <AdminField label="Testimonial Text" hint="Paste the customer's actual words.">
            <textarea rows={4} className="admin-input" {...register('testimonial', { required: true })} />
          </AdminField>
          <AdminField label="Photo (optional)">
            <Controller name="image" control={control} render={({ field }) => <ImageUploadField value={field.value} onChange={field.onChange} />} />
          </AdminField>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Order">
              <input type="number" className="admin-input" {...register('order', { valueAsNumber: true })} />
            </AdminField>
            <label className="mt-7 flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4" {...register('isPublished')} /> Published
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isSubmitting} className="flex-1 rounded bg-slate-800 py-2.5 text-sm font-medium text-white hover:bg-slate-700">
              {isSubmitting ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="rounded border border-slate-300 px-4 text-sm text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
