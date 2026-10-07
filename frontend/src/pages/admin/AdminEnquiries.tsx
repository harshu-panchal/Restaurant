import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { enquiryApi } from '../../services/api';
import AdminTable from '../../components/admin/AdminTable';
import Modal from '../../components/ui/Modal';
import LoadingState from '../../components/ui/LoadingState';
import { useToast } from '../../hooks/useToast';
import type { Enquiry, EnquiryStatus } from '../../types';

const STATUSES: EnquiryStatus[] = ['New', 'Contacted', 'In Discussion', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'];

export default function AdminEnquiries() {
  const { data: enquiries, loading } = useApi(() => enquiryApi.getAll(), []);
  const [active, setActive] = useState<Enquiry | null>(null);
  const [rows, setRows] = useState<Enquiry[]>([]);
  const { show } = useToast();

  useEffect(() => {
    if (enquiries) setRows(enquiries);
  }, [enquiries]);

  async function updateStatus(id: string, status: EnquiryStatus) {
    const updated = await enquiryApi.updateStatus(id, status);
    setRows((prev) => prev.map((e) => (e._id === id ? updated : e)));
    setActive((prev) => (prev && prev._id === id ? updated : prev));
    show('Enquiry status updated.');
  }

  async function remove(id: string) {
    if (!confirm('Delete this enquiry permanently?')) return;
    await enquiryApi.remove(id);
    setRows((prev) => prev.filter((e) => e._id !== id));
    setActive(null);
    show('Enquiry deleted.');
  }

  if (loading) return <LoadingState />;

  return (
    <div>
      <h1 className="font-display text-2xl text-slate-800">Enquiries</h1>

      <div className="mt-6">
        <AdminTable
          rows={rows}
          rowKey={(row) => row._id}
          emptyLabel="No enquiries yet."
          columns={[
            { header: 'Name', render: (row) => row.name },
            { header: 'Phone', render: (row) => row.phone },
            { header: 'Event', render: (row) => row.eventType },
            { header: 'Guests', render: (row) => row.guestCount ?? '—' },
            {
              header: 'Status',
              render: (row) => (
                <select
                  value={row.status}
                  onChange={(e) => updateStatus(row._id, e.target.value as EnquiryStatus)}
                  className="rounded border border-slate-300 bg-white px-2 py-1 text-xs"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ),
            },
            { header: 'Received', render: (row) => new Date(row.createdAt).toLocaleDateString() },
            {
              header: '',
              render: (row) => (
                <div className="flex gap-3 text-xs">
                  <button onClick={() => setActive(row)} className="text-slate-500 hover:text-slate-800">
                    View
                  </button>
                  <button onClick={() => remove(row._id)} className="text-red-400 hover:text-red-600">
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>

      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div className="max-h-[80vh] w-[90vw] max-w-lg overflow-y-auto rounded bg-white p-6">
            <p className="font-display text-xl text-slate-800">{active.name}</p>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="Phone" value={active.phone} />
              <Row label="Email" value={active.email || '—'} />
              <Row label="Event Type" value={active.eventType} />
              <Row label="Event Date" value={active.eventDate ? new Date(active.eventDate).toLocaleDateString() : '—'} />
              <Row label="Location" value={active.eventLocation || '—'} />
              <Row label="Guest Count" value={active.guestCount?.toString() || '—'} />
              <Row label="Food Preference" value={active.foodPreference || '—'} />
              <Row label="Cuisines" value={active.cuisinePreferences?.join(', ') || '—'} />
              <Row label="Services" value={active.services?.join(', ') || '—'} />
              <Row label="Budget" value={active.budget || '—'} />
              <Row label="Message" value={active.message || '—'} multiline />
            </dl>
            <button
              onClick={() => setActive(null)}
              className="mt-6 w-full rounded border border-slate-300 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <dt className="text-slate-400">{label}</dt>
      <dd className={`col-span-2 text-slate-700 ${multiline ? 'whitespace-pre-line' : ''}`}>{value}</dd>
    </div>
  );
}
