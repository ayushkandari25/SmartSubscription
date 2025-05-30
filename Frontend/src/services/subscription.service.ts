import api from './api';
import { Subscription } from '../types';

// Get all subscriptions for a user
export const getUserSubscriptions = async (): Promise<Subscription[]> => {
  const response = await api.get('/subscriptions/user');
  return response.data;
};

// Get all subscriptions (admin only)
export const getAllSubscriptions = async (): Promise<Subscription[]> => {
  const response = await api.get('/subscriptions');
  return response.data;
};

// Create a new subscription
export const createSubscription = async (subscription: Omit<Subscription, 'id' | 'userId'>): Promise<Subscription> => {
  const response = await api.post('/subscriptions', subscription);
  return response.data;
};

// Update a subscription
export const updateSubscription = async (id: string, subscription: Partial<Subscription>): Promise<Subscription> => {
  const response = await api.put(`/subscriptions/${id}`, subscription);
  return response.data;
};

// Delete a subscription
export const deleteSubscription = async (id: string): Promise<void> => {
  await api.delete(`/subscriptions/${id}`);
};