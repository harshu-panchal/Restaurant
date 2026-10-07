export interface MenuCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
}

export interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  category: MenuCategory | string;
  description?: string;
  image?: string;
  dietaryType: 'veg' | 'non-veg' | 'egg';
  isFeatured: boolean;
  isActive: boolean;
  order: number;
}

export interface MenuGroup {
  category: MenuCategory;
  items: MenuItem[];
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  features: string[];
  isActive: boolean;
  order: number;
}

export interface Package {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  features: string[];
  suitableFor?: string;
  price?: number;
  isPriceVisible: boolean;
  isActive: boolean;
  order: number;
}

export type GalleryCategory = 'wedding' | 'food' | 'buffet' | 'live-counter' | 'decor' | 'other';

export interface GalleryItem {
  _id: string;
  title?: string;
  image: string;
  category: GalleryCategory;
  description?: string;
  orientation: 'portrait' | 'landscape' | 'square';
  order: number;
  isActive: boolean;
}

export interface Testimonial {
  _id: string;
  name: string;
  eventType?: string;
  testimonial: string;
  image?: string;
  isPublished: boolean;
  order: number;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'In Discussion' | 'Quoted' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate?: string;
  eventLocation?: string;
  guestCount?: number;
  foodPreference?: 'Vegetarian' | 'Non-Vegetarian' | 'Mixed';
  cuisinePreferences?: string[];
  services?: string[];
  budget?: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface SiteSettings {
  _id?: string;
  businessName: string;
  logo?: string;
  favicon?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapEmbedUrl?: string;
  businessHours?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
    image?: string;
  };
  ctaLabels: {
    primary: string;
    secondary: string;
  };
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin';
}
