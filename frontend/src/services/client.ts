import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  details?: string[];
}
