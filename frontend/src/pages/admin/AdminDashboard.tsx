import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { dashboardApi } from '../../services/api';
import LoadingState from '../../components/ui/LoadingState';

const STAT_LABELS: Record<string, string> = {
  totalEnquiries: 'Total Enquiries',
  newEnquiries: 'New Enquiries',
  menuItems: 'Active Menu Items',
  galleryItems: 'Active Gallery Items',
  packages: 'Active Packages',
  services: 'Active Services',
};

export default function AdminDashboard() {
  const { data, loading } = useApi(() => dashboardApi.getStats(), []);

  if (loading || !data) return <LoadingState />;

  return (
    <div>
      <h1 className="font-display text-2xl text-slate-800">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(STAT_LABELS).map(([key, label]) => (
          <div key={key} className="rounded border border-slate-200 bg-white p-5">
            <p className="text-2xl font-semibold text-slate-800">{data[key as keyof typeof data] as number}</p>
            <p className="mt-1 text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg text-slate-800">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm text-slate-500 hover:text-slate-700">
            View All &rarr;
          </Link>
        </div>

        {data.recentEnquiries.length === 0 ? (
          <p className="rounded border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">No enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto rounded border border-slate-200 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {data.recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 text-slate-700">{enquiry.name}</td>
                    <td className="px-4 py-3 text-slate-700">{enquiry.eventType}</td>
                    <td className="px-4 py-3 text-slate-700">{enquiry.status}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
