import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';
import * as subscriptionApi from '../api/subscriptions';
import { SubscriptionFormData } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const categories = [
  'Entertainment',
  'Streaming',
  'Software',
  'Utilities',
  'Health',
  'Other',
];

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'INR', 'Other'];

const billingCycles = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

const SubscriptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscriptionFormData>({
    defaultValues: {
      name: '',
      description: '',
      amount: 0,
      currency: 'USD',
      billingCycle: 'monthly',
      nextBillingDate: new Date().toISOString().split('T')[0],
      category: 'Other',
      isActive: true,
    },
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      fetchSubscriptionDetails();
    }
  }, [id]);

  const fetchSubscriptionDetails = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const subscription = await subscriptionApi.getSubscription(id);
      
      // Format the date to YYYY-MM-DD for the input field
      const formattedDate = new Date(subscription.nextBillingDate)
        .toISOString()
        .split('T')[0];

      reset({
        ...subscription,
        nextBillingDate: formattedDate,
      });
    } catch (error) {
      toast.error('Failed to load subscription details');
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: SubscriptionFormData) => {
    setIsSaving(true);
    try {
      if (isEditMode && id) {
        await subscriptionApi.updateSubscription(id, data);
        toast.success('Subscription updated successfully');
      } else {
        await subscriptionApi.createSubscription(data);
        toast.success('Subscription created successfully');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        isEditMode
          ? 'Failed to update subscription'
          : 'Failed to create subscription'
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in mx-auto max-w-2xl">
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1>{isEditMode ? 'Edit Subscription' : 'Add Subscription'}</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="label">
              Subscription Name
            </label>
            <input
              id="name"
              className={`input ${errors.name ? 'input-error' : ''}`}
              {...register('name', { required: 'Name is required' })}
              placeholder="e.g., Netflix, Spotify, etc."
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              className={`input ${errors.description ? 'input-error' : ''}`}
              rows={3}
              {...register('description')}
              placeholder="Optional description of this subscription"
            ></textarea>
            {errors.description && (
              <p className="error-message">{errors.description.message}</p>
            )}
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="amount" className="label">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                className={`input ${errors.amount ? 'input-error' : ''}`}
                {...register('amount', {
                  required: 'Amount is required',
                  valueAsNumber: true,
                  min: {
                    value: 0.01,
                    message: 'Amount must be greater than 0',
                  },
                })}
              />
              {errors.amount && (
                <p className="error-message">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="currency" className="label">
                Currency
              </label>
              <select
                id="currency"
                className={`input ${errors.currency ? 'input-error' : ''}`}
                {...register('currency', { required: 'Currency is required' })}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              {errors.currency && (
                <p className="error-message">{errors.currency.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="billingCycle" className="label">
                Billing Cycle
              </label>
              <select
                id="billingCycle"
                className={`input ${errors.billingCycle ? 'input-error' : ''}`}
                {...register('billingCycle', {
                  required: 'Billing cycle is required',
                })}
              >
                {billingCycles.map((cycle) => (
                  <option key={cycle.value} value={cycle.value}>
                    {cycle.label}
                  </option>
                ))}
              </select>
              {errors.billingCycle && (
                <p className="error-message">{errors.billingCycle.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nextBillingDate" className="label">
                Next Billing Date
              </label>
              <input
                id="nextBillingDate"
                type="date"
                className={`input ${
                  errors.nextBillingDate ? 'input-error' : ''
                }`}
                {...register('nextBillingDate', {
                  required: 'Next billing date is required',
                })}
              />
              {errors.nextBillingDate && (
                <p className="error-message">
                  {errors.nextBillingDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="label">
              Category
            </label>
            <select
              id="category"
              className={`input ${errors.category ? 'input-error' : ''}`}
              {...register('category', { required: 'Category is required' })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="error-message">{errors.category.message}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="isActive"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                {...register('isActive')}
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
              >
                Active subscription
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center">
                  <LoadingSpinner size="small\" className="mr-2" />
                  <span>{isEditMode ? 'Updating...' : 'Creating...'}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  <span>{isEditMode ? 'Update' : 'Create'}</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;