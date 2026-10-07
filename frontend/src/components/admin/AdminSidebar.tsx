import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const LINKS = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Menu', to: '/admin/menu' },
  { label: 'Services', to: '/admin/services' },
  { label: 'Packages', to: '/admin/packages' },
  { label: 'Gallery', to: '/admin/gallery' },
  { label: 'Testimonials', to: '/admin/testimonials' },
  { label: 'Enquiries', to: '/admin/enquiries' },
  { label: 'Settings', to: '/admin/settings' },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="px-6 py-6">
        <p className="font-display text-lg text-slate-800">Admin Panel</p>
      </div>
      <nav className="px-3">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) =>
              cn(
                'mb-1 block rounded px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50',
                isActive && 'bg-slate-100 text-slate-900'
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
