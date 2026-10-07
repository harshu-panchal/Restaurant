import { apiClient } from './client';
import type {
  AdminUser,
  Enquiry,
  EnquiryStatus,
  GalleryItem,
  MenuCategory,
  MenuGroup,
  MenuItem,
  Package,
  Service,
  SiteSettings,
  Testimonial,
} from '../types';

const unwrap = <T,>(promise: Promise<{ data: { data: T } }>) => promise.then((res) => res.data.data);

export const menuApi = {
  getPublicMenu: () => unwrap<MenuGroup[]>(apiClient.get('/menu')),
  getFeatured: () => unwrap<MenuItem[]>(apiClient.get('/menu/featured')),
  getCategories: () => unwrap<MenuCategory[]>(apiClient.get('/menu/categories')),
  getItems: () => unwrap<MenuItem[]>(apiClient.get('/menu/items')),
  createCategory: (payload: Partial<MenuCategory>) => unwrap<MenuCategory>(apiClient.post('/menu/categories', payload)),
  updateCategory: (id: string, payload: Partial<MenuCategory>) => unwrap<MenuCategory>(apiClient.put(`/menu/categories/${id}`, payload)),
  deleteCategory: (id: string) => unwrap<{ id: string }>(apiClient.delete(`/menu/categories/${id}`)),
  createItem: (payload: Partial<MenuItem>) => unwrap<MenuItem>(apiClient.post('/menu/items', payload)),
  updateItem: (id: string, payload: Partial<MenuItem>) => unwrap<MenuItem>(apiClient.put(`/menu/items/${id}`, payload)),
  deleteItem: (id: string) => unwrap<{ id: string }>(apiClient.delete(`/menu/items/${id}`)),
};

export const servicesApi = {
  getAll: () => unwrap<Service[]>(apiClient.get('/services')),
  getOne: (id: string) => unwrap<Service>(apiClient.get(`/services/${id}`)),
  create: (payload: Partial<Service>) => unwrap<Service>(apiClient.post('/services', payload)),
  update: (id: string, payload: Partial<Service>) => unwrap<Service>(apiClient.put(`/services/${id}`, payload)),
  remove: (id: string) => unwrap<{ id: string }>(apiClient.delete(`/services/${id}`)),
};

export const packagesApi = {
  getAll: () => unwrap<Package[]>(apiClient.get('/packages')),
  getOne: (id: string) => unwrap<Package>(apiClient.get(`/packages/${id}`)),
  create: (payload: Partial<Package>) => unwrap<Package>(apiClient.post('/packages', payload)),
  update: (id: string, payload: Partial<Package>) => unwrap<Package>(apiClient.put(`/packages/${id}`, payload)),
  remove: (id: string) => unwrap<{ id: string }>(apiClient.delete(`/packages/${id}`)),
};

export const galleryApi = {
  getAll: () => unwrap<GalleryItem[]>(apiClient.get('/gallery', { params: { active: 'true' } })),
  getAllAdmin: () => unwrap<GalleryItem[]>(apiClient.get('/gallery')),
  create: (payload: Partial<GalleryItem>) => unwrap<GalleryItem>(apiClient.post('/gallery', payload)),
  update: (id: string, payload: Partial<GalleryItem>) => unwrap<GalleryItem>(apiClient.put(`/gallery/${id}`, payload)),
  remove: (id: string) => unwrap<{ id: string }>(apiClient.delete(`/gallery/${id}`)),
};

export const testimonialsApi = {
  getPublished: () => unwrap<Testimonial[]>(apiClient.get('/testimonials')),
  getAll: () => unwrap<Testimonial[]>(apiClient.get('/testimonials/all')),
  create: (payload: Partial<Testimonial>) => unwrap<Testimonial>(apiClient.post('/testimonials', payload)),
  update: (id: string, payload: Partial<Testimonial>) => unwrap<Testimonial>(apiClient.put(`/testimonials/${id}`, payload)),
  remove: (id: string) => unwrap<{ id: string }>(apiClient.delete(`/testimonials/${id}`)),
};

export const enquiryApi = {
  create: (payload: Partial<Enquiry>) => unwrap<{ id: string }>(apiClient.post('/enquiries', payload)),
  getAll: (params?: { status?: string; eventType?: string }) => unwrap<Enquiry[]>(apiClient.get('/enquiries', { params })),
  getOne: (id: string) => unwrap<Enquiry>(apiClient.get(`/enquiries/${id}`)),
  updateStatus: (id: string, status: EnquiryStatus) => unwrap<Enquiry>(apiClient.patch(`/enquiries/${id}/status`, { status })),
  remove: (id: string) => unwrap<{ id: string }>(apiClient.delete(`/enquiries/${id}`)),
};

export const settingsApi = {
  get: () => unwrap<SiteSettings>(apiClient.get('/settings')),
  update: (payload: Partial<SiteSettings>) => unwrap<SiteSettings>(apiClient.patch('/settings', payload)),
};

export const authApi = {
  login: (email: string, password: string) => unwrap<AdminUser>(apiClient.post('/auth/login', { email, password })),
  logout: () => unwrap<null>(apiClient.post('/auth/logout')),
  me: () => unwrap<AdminUser>(apiClient.get('/auth/me')),
};

export const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return unwrap<{ url: string }>(
      apiClient.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    );
  },
};

export const dashboardApi = {
  getStats: () =>
    unwrap<{
      totalEnquiries: number;
      newEnquiries: number;
      menuItems: number;
      galleryItems: number;
      packages: number;
      services: number;
      recentEnquiries: Enquiry[];
    }>(apiClient.get('/dashboard')),
};
