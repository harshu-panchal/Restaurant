import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import { galleryApi } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import AdminTable from '../../components/admin/AdminTable';
import AdminField from '../../components/admin/AdminField';
import StatusBadge from '../../components/admin/StatusBadge';
import ImageUploadField from '../../components/admin/ImageUploadField';
import Modal from '../../components/ui/Modal';
import LoadingState from '../../components/ui/LoadingState';
import type { GalleryCategory, GalleryItem } from '../../types';

const CATEGORIES: GalleryCategory[] = ['wedding', 'food', 'buffet', 'live-counter', 'decor', 'other'];

interface FormValues {
  title: string;
  image: string;
  category: GalleryCategory;
  description: string;
  orientation: 'portrait' | 'landscape' | 'square';
  order: number;
  isActive: boolean;
}

const emptyValues: FormValues = {
  title: '',
  image: '',
  category: 'wedding',
  description: '',
  orientation: 'landscape',
  order: 0,
  isActive: true,
};

export default function AdminGallery() {
  const { data, loading } = useApi(() => galleryApi.getAllAdmin(), []);
  const [rows, setRows] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
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

  function openEdit(item: GalleryItem) {
    setEditing(item);
    reset({
      title: item.title || '',
      image: item.image,
      category: item.category,
      description: item.description || '',
      orientation: item.orientation,
      order: item.order,
      isActive: item.isActive,
    });
    setModalOpen(true);
  }

  async function onSubmit(values: FormValues) {
    if (!values.image) {
      show('Please upload an image first.', 'error');
      return;
    }
    if (editing) {
      const updated = await galleryApi.update(editing._id, values);
      setRows((prev) => prev.map((r) => (r._id === editing._id ? updated : r)));
      show('Gallery item updated.');
    } else {
      const created = await galleryApi.create(values);
      setRows((prev) => [...prev, created]);
      show('Gallery item added.');
    }
    setModalOpen(false);
  }

  async function remove(id: string) {
    if (!confirm('Delete this gallery item?')) return;
    await galleryApi.remove(id);
    setRows((prev) => prev.filter((r) => r._id !== id));
    show('Gallery item deleted.');
  }

  if (loading) return <LoadingState />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-slate-800">Gallery</h1>
        <button onClick={openCreate} className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Add Image
        </button>
      </div>

      <div className="mt-6">
        <AdminTable
          rows={rows}
          rowKey={(r) => r._id}
          emptyLabel="No images yet."
          columns={[
            {
              header: 'Image',
              render: (r) => <img src={r.image} alt={r.title || ''} className="h-12 w-16 rounded object-cover" />,
            },
            { header: 'Title', render: (r) => r.title || '—' },
            { header: 'Category', render: (r) => r.category },
            { header: 'Status', render: (r) => <StatusBadge active={r.isActive} /> },
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
          <p className="font-display text-xl text-slate-800">{editing ? 'Edit Image' : 'Add Image'}</p>

          <AdminField label="Image">
            <Controller name="image" control={control} render={({ field }) => <ImageUploadField value={field.value} onChange={field.onChange} />} />
          </AdminField>
          <AdminField label="Title (optional)">
            <input className="admin-input" {...register('title')} />
          </AdminField>
          <AdminField label="Description (optional)">
            <textarea rows={2} className="admin-input" {...register('description')} />
          </AdminField>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Category">
              <select className="admin-input" {...register('category')}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Orientation">
              <select className="admin-input" {...register('orientation')}>
                <option value="landscape">Landscape</option>
                <option value="portrait">Portrait</option>
                <option value="square">Square</option>
              </select>
            </AdminField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Order">
              <input type="number" className="admin-input" {...register('order', { valueAsNumber: true })} />
            </AdminField>
            <label className="mt-7 flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4" {...register('isActive')} /> Active
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
