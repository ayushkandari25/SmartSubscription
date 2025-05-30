import api from './api';
import { User } from '../types';

// Register a new user
export const register = async (name: string, email: string, password: string): Promise<void> => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

// Login a user
export const login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  const response = await api.post('/auth/login', { email, password });
  const { user, token } = response.data;
  
  // Store token and user in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  
  return { user, token };
};

// Logout a user
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};