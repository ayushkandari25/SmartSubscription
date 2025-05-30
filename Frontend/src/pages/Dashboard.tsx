import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import * as subscriptionApi from '../api/subscriptions';
import { Subscription } from '../types';
import SubscriptionCard from '../components/subscription/SubscriptionCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await subscriptionApi.getSubscriptions();
      setSubscriptions(data);
      setError('');
    } catch (error) {
      setError('Failed to load subscriptions. Please try again.');
      toast.error('Could not load your subscriptions');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchSubscriptions();
  };

  const handleDelete = async (id: string) => {
    try {
      await subscriptionApi.deleteSubscription(id);
      setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
      toast.success('Subscription deleted successfully');
    } catch (error) {
      toast.error('Failed to delete subscription');
    }
  };

  // Calculate total monthly cost
  const calculateMonthlyTotal = (): number => {
    return subscriptions.reduce((total, sub) => {
      let monthlyAmount = sub.amount;
      
      switch (sub.billingCycle) {
        case 'quarterly':
          monthlyAmount = sub.amount / 3;
          break;
        case 'yearly':
          monthlyAmount = sub.amount / 12;
          break;
      }
      
      return total + (sub.isActive ? monthlyAmount : 0);
    }, 0);
  };

  // Get the most common currency
  const getMostCommonCurrency = (): string => {
    if (subscriptions.length === 0) return 'USD';
    
    const currencyCounts: Record<string, number> = {};
    subscriptions.forEach(sub => {
      currencyCounts[sub.currency] = (currencyCounts[sub.currency] || 0) + 1;
    });
    
    return Object.entries(currencyCounts).sort((a, b) => b[1] - a[1])[0][0];
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const monthlyTotal = calculateMonthlyTotal();
  const primaryCurrency = getMostCommonCurrency();

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1>My Subscriptions</h1>
        <div className="mt-4 flex space-x-2 sm:mt-0">
          <button
            onClick={handleRefresh}
            className="btn btn-outline"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <LoadingSpinner size="small\" className="mr-2" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </button>
          <Link to="/subscriptions/new" className="btn btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      {subscriptions.length > 0 && (
        <div className="card bg-blue-50 dark:bg-blue-900/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">Monthly Spending</h2>
              <p className="text-gray-600 dark:text-gray-400">Estimated total per month</p>
            </div>
            <div className="mt-4 text-3xl font-bold text-blue-600 dark:text-blue-400 md:mt-0">
              {primaryCurrency} {monthlyTotal.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {subscriptions.length === 0 ? (
        <EmptyState
          title="No subscriptions yet"
          description="Add your first subscription to start tracking your expenses."
          actionLabel="Add Subscription"
          actionHref="/subscriptions/new"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription._id}
              subscription={subscription}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;