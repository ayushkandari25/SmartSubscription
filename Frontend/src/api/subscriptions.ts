import client from './client';
import { Subscription, SubscriptionFormData } from '../types';

export const getSubscriptions = async (): Promise<Subscription[]> => {
  const response = await client.get('/subscriptions');
  return response.data;
};

export const getSubscription = async (id: string): Promise<Subscription> => {
  const response = await client.get(`/subscriptions/${id}`);
  return response.data;
};

export const createSubscription = async (data: SubscriptionFormData): Promise<Subscription> => {
  const response = await client.post('/subscriptions', data);
  return response.data;
};

export const updateSubscription = async (id: string, data: SubscriptionFormData): Promise<Subscription> => {
  const response = await client.put(`/subscriptions/${id}`, data);
  return response.data;
};

export const deleteSubscription = async (id: string): Promise<void> => {
  await client.delete(`/subscriptions/${id}`);
};