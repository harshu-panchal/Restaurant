import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import { packagesApi } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import AdminTable from '../../components/admin/AdminTable';
import AdminField from '../../components/admin/AdminField';
import StatusBadge from '../../components/admin/StatusBadge';
import FeaturesListInput from '../../components/admin/FeaturesListInput';
import ImageUploadField from '../../components/admin/ImageUploadField';
import Modal from '../../components/ui/Modal';
import LoadingState from '../../components/ui/LoadingState';
import type { Package } from '../../types';

interface FormValues {
  title: string;
  description: string;
  image: string;
  features: string[];
  suitableFor: string;
  price?: number;
  isPriceVisible: boolean;
  order: number;
  isActive: boolean;
}

const emptyValues: FormValues = {
  title: '',
  description: '',
  image: '',
  features: [],
  suitableFor: '',
  isPriceVisible: false,
  order: 0,
  isActive: true,
};

export default function AdminPackages() {
  const { data, loading } = useApi(() => packagesApi.getAll(), []);
  const [rows, setRows] = useState<Package[]>([]);
  const [editing, setEditing] = useState<Package | null>(null);
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

  function openEdit(pkg: Package) {
    setEditing(pkg);
    reset({
      title: pkg.title,
      description: pkg.description || '',
      image: pkg.image || '',
      features: pkg.features,
      suitableFor: pkg.suitableFor || '',
      price: pkg.price,
      isPriceVisible: pkg.isPriceVisible,
      order: pkg.order,
      isActive: pkg.isActive,
    });
    setModalOpen(true);
  }

  async function onSubmit(values: FormValues) {
    if (editing) {
      const updated = await packagesApi.update(editing._id, values);
      setRows((prev) => prev.map((r) => (r._id === editing._id ? updated : r)));
      show('Package updated.');
    } else {
      const created = await packagesApi.create(values);
      setRows((prev) => [...prev, created]);
      show('Package created.');
    }
    setModalOpen(false);
  }

  async function remove(id: string) {
    if (!confirm('Delete this package?')) return;
    await packagesApi.remove(id);
    setRows((prev) => prev.filter((r) => r._id !== id));
    show('Package deleted.');
  }

  if (loading) return <LoadingState />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-slate-800">Packages</h1>
        <button onClick={openCreate} className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Add Package
        </button>
      </div>

      <div className="mt-6">
        <AdminTable
          rows={rows}
          rowKey={(r) => r._id}
          emptyLabel="No packages yet."
          columns={[
            { header: 'Title', render: (r) => r.title },
            { header: 'Suitable For', render: (r) => r.suitableFor || '—' },
            { header: 'Price Visible', render: (r) => (r.isPriceVisible ? 'Yes' : 'No') },
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
          <p className="font-display text-xl text-slate-800">{editing ? 'Edit Package' : 'Add Package'}</p>

          <AdminField label="Title">
            <input className="admin-input" {...register('title', { required: true })} />
          </AdminField>
          <AdminField label="Description">
            <textarea rows={3} className="admin-input" {...register('description')} />
          </AdminField>
          <AdminField label="Suitable For">
            <input className="admin-input" placeholder="e.g. Larger wedding celebrations" {...register('suitableFor')} />
          </AdminField>
          <AdminField label="Image">
            <Controller name="image" control={control} render={({ field }) => <ImageUploadField value={field.value} onChange={field.onChange} />} />
          </AdminField>
          <AdminField label="Features">
            <Controller name="features" control={control} render={({ field }) => <FeaturesListInput value={field.value} onChange={field.onChange} />} />
          </AdminField>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Price (optional)">
              <input type="number" className="admin-input" {...register('price', { valueAsNumber: true })} />
            </AdminField>
            <label className="mt-7 flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4" {...register('isPriceVisible')} /> Show price publicly
            </label>
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
