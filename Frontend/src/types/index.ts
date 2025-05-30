export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Subscription {
  _id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  nextBillingDate: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionFormData = Omit<Subscription, '_id' | 'createdAt' | 'updatedAt'>;

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}