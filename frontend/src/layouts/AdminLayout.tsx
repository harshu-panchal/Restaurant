import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { useAuth } from '../hooks/useAuth';

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50 font-body text-slate-800">
      <AdminSidebar />
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <Link to="/" className="text-sm text-slate-400 hover:text-slate-600">
            &larr; View Public Site
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">{admin?.name}</span>
            <button onClick={() => logout()} className="text-sm font-medium text-slate-500 hover:text-red-500">
              Log Out
            </button>
          </div>
        </header>
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
