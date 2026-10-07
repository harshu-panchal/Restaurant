import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SiteSettingsProvider } from './hooks/useSiteSettings';
import { ToastProvider } from './hooks/useToast';
import { AuthProvider } from './hooks/useAuth';
import LoadingState from './components/ui/LoadingState';

import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import WeddingCatering from './pages/WeddingCatering';
import Menu from './pages/Menu';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import GetQuote from './pages/GetQuote';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Admin is a separate bundle — a public visitor never pays for this code.
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminMenu = lazy(() => import('./pages/admin/AdminMenu'));
const AdminServices = lazy(() => import('./pages/admin/AdminServices'));
const AdminPackages = lazy(() => import('./pages/admin/AdminPackages'));
const AdminGallery = lazy(() => import('./pages/admin/AdminGallery'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <LoadingState label="Loading admin panel…" />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SiteSettingsProvider>
          <ToastProvider>
            <AuthProvider>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/wedding-catering" element={<WeddingCatering />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/get-a-quote" element={<GetQuote />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route
                  path="/admin/login"
                  element={
                    <Suspense fallback={<AdminFallback />}>
                      <AdminLogin />
                    </Suspense>
                  }
                />
                <Route element={<ProtectedRoute />}>
                  <Route
                    element={
                      <Suspense fallback={<AdminFallback />}>
                        <AdminLayout />
                      </Suspense>
                    }
                  >
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/menu" element={<AdminMenu />} />
                    <Route path="/admin/services" element={<AdminServices />} />
                    <Route path="/admin/packages" element={<AdminPackages />} />
                    <Route path="/admin/gallery" element={<AdminGallery />} />
                    <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                    <Route path="/admin/enquiries" element={<AdminEnquiries />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                  </Route>
                </Route>
              </Routes>
            </AuthProvider>
          </ToastProvider>
        </SiteSettingsProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
