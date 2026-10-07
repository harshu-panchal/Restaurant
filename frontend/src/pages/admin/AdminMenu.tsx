import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import { menuApi } from '../../services/api';
import { useToast } from '../../hooks/useToast';
import AdminTable from '../../components/admin/AdminTable';
import AdminField from '../../components/admin/AdminField';
import StatusBadge from '../../components/admin/StatusBadge';
import ImageUploadField from '../../components/admin/ImageUploadField';
import Modal from '../../components/ui/Modal';
import LoadingState from '../../components/ui/LoadingState';
import { cn } from '../../utils/cn';
import type { MenuCategory, MenuItem } from '../../types';

interface CategoryFormValues {
  name: string;
  description: string;
  order: number;
  isActive: boolean;
}

interface ItemFormValues {
  name: string;
  category: string;
  description: string;
  image: string;
  dietaryType: 'veg' | 'non-veg' | 'egg';
  isFeatured: boolean;
  isActive: boolean;
  order: number;
}

const emptyCategory: CategoryFormValues = { name: '', description: '', order: 0, isActive: true };
const emptyItem: ItemFormValues = {
  name: '',
  category: '',
  description: '',
  image: '',
  dietaryType: 'veg',
  isFeatured: false,
  isActive: true,
  order: 0,
};

export default function AdminMenu() {
  const [tab, setTab] = useState<'categories' | 'items'>('categories');

  return (
    <div>
      <h1 className="font-display text-2xl text-slate-800">Menu</h1>

      <div className="mt-5 flex gap-2 border-b border-slate-200">
        {(['categories', 'items'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium capitalize',
              tab === t ? 'border-b-2 border-slate-800 text-slate-800' : 'text-slate-400 hover:text-slate-600'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">{tab === 'categories' ? <CategoriesPanel /> : <ItemsPanel />}</div>
    </div>
  );
}

function CategoriesPanel() {
  const { data, loading } = useApi(() => menuApi.getCategories(), []);
  const [rows, setRows] = useState<MenuCategory[]>([]);
  const [editing, setEditing] = useState<MenuCategory | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { show } = useToast();

  useEffect(() => {
    if (data) setRows(data);
  }, [data]);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CategoryFormValues>({ defaultValues: emptyCategory });

  function openCreate() {
    setEditing(null);
    reset(emptyCategory);
    setModalOpen(true);
  }

  function openEdit(cat: MenuCategory) {
    setEditing(cat);
    reset({ name: cat.name, description: cat.description || '', order: cat.order, isActive: cat.isActive });
    setModalOpen(true);
  }

  async function onSubmit(values: CategoryFormValues) {
    if (editing) {
      const updated = await menuApi.updateCategory(editing._id, values);
      setRows((prev) => prev.map((r) => (r._id === editing._id ? updated : r)));
      show('Category updated.');
    } else {
      const created = await menuApi.createCategory(values);
      setRows((prev) => [...prev, created]);
      show('Category created.');
    }
    setModalOpen(false);
  }

  async function remove(id: string) {
    if (!confirm('Delete this category? Items inside it will remain but lose their category.')) return;
    await menuApi.deleteCategory(id);
    setRows((prev) => prev.filter((r) => r._id !== id));
    show('Category deleted.');
  }

  if (loading) return <LoadingState />;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={openCreate} className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Add Category
        </button>
      </div>

      <AdminTable
        rows={rows}
        rowKey={(r) => r._id}
        emptyLabel="No categories yet."
        columns={[
          { header: 'Name', render: (r) => r.name },
          { header: 'Order', render: (r) => r.order },
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[90vw] max-w-md space-y-4 rounded bg-white p-6">
          <p className="font-display text-xl text-slate-800">{editing ? 'Edit Category' : 'Add Category'}</p>
          <AdminField label="Name">
            <input className="admin-input" {...register('name', { required: true })} />
          </AdminField>
          <AdminField label="Description (optional)">
            <textarea rows={2} className="admin-input" {...register('description')} />
          </AdminField>
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

function ItemsPanel() {
  const { data: items, loading: itemsLoading } = useApi(() => menuApi.getItems(), []);
  const { data: categories, loading: categoriesLoading } = useApi(() => menuApi.getCategories(), []);
  const [rows, setRows] = useState<MenuItem[]>([]);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { show } = useToast();

  useEffect(() => {
    if (items) setRows(items);
  }, [items]);

  const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm<ItemFormValues>({ defaultValues: emptyItem });

  function openCreate() {
    setEditing(null);
    reset({ ...emptyItem, category: categories?.[0]?._id || '' });
    setModalOpen(true);
  }

  function openEdit(item: MenuItem) {
    setEditing(item);
    const categoryId = typeof item.category === 'string' ? item.category : item.category._id;
    reset({
      name: item.name,
      category: categoryId,
      description: item.description || '',
      image: item.image || '',
      dietaryType: item.dietaryType,
      isFeatured: item.isFeatured,
      isActive: item.isActive,
      order: item.order,
    });
    setModalOpen(true);
  }

  async function onSubmit(values: ItemFormValues) {
    if (editing) {
      const updated = await menuApi.updateItem(editing._id, values);
      setRows((prev) => prev.map((r) => (r._id === editing._id ? updated : r)));
      show('Menu item updated.');
    } else {
      const created = await menuApi.createItem(values);
      setRows((prev) => [...prev, created]);
      show('Menu item created.');
    }
    setModalOpen(false);
  }

  async function remove(id: string) {
    if (!confirm('Delete this menu item?')) return;
    await menuApi.deleteItem(id);
    setRows((prev) => prev.filter((r) => r._id !== id));
    show('Menu item deleted.');
  }

  if (itemsLoading || categoriesLoading) return <LoadingState />;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={openCreate} className="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Add Item
        </button>
      </div>

      <AdminTable
        rows={rows}
        rowKey={(r) => r._id}
        emptyLabel="No menu items yet."
        columns={[
          { header: 'Name', render: (r) => r.name },
          {
            header: 'Category',
            render: (r) => (typeof r.category === 'string' ? r.category : r.category.name),
          },
          { header: 'Diet', render: (r) => r.dietaryType },
          { header: 'Featured', render: (r) => (r.isFeatured ? 'Yes' : 'No') },
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-h-[85vh] w-[90vw] max-w-lg space-y-4 overflow-y-auto rounded bg-white p-6">
          <p className="font-display text-xl text-slate-800">{editing ? 'Edit Item' : 'Add Item'}</p>

          <AdminField label="Name">
            <input className="admin-input" {...register('name', { required: true })} />
          </AdminField>
          <AdminField label="Category">
            <select className="admin-input" {...register('category', { required: true })}>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Description (optional)">
            <textarea rows={2} className="admin-input" {...register('description')} />
          </AdminField>
          <AdminField label="Image">
            <Controller name="image" control={control} render={({ field }) => <ImageUploadField value={field.value} onChange={field.onChange} />} />
          </AdminField>

          <div className="grid grid-cols-2 gap-4">
            <AdminField label="Dietary Type">
              <select className="admin-input" {...register('dietaryType')}>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="egg">Contains Egg</option>
              </select>
            </AdminField>
            <AdminField label="Order">
              <input type="number" className="admin-input" {...register('order', { valueAsNumber: true })} />
            </AdminField>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4" {...register('isFeatured')} /> Featured on homepage
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700">
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
