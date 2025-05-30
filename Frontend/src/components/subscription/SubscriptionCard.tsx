import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Calendar, CreditCard, Edit, Trash } from 'lucide-react';
import { Subscription } from '../../types';
import ConfirmDialog from '../ui/ConfirmDialog';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD', // Default to USD
});

interface SubscriptionCardProps {
  subscription: Subscription;
  onDelete: (id: string) => Promise<void>;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onDelete }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Format the amount with the subscription's currency
  const formattedAmount = currencyFormatter.format(subscription.amount).replace('$', `${subscription.currency} `);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(subscription._id);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const getBillingCycleText = (cycle: string) => {
    switch (cycle) {
      case 'monthly':
        return 'Monthly';
      case 'quarterly':
        return 'Quarterly';
      case 'yearly':
        return 'Yearly';
      default:
        return cycle;
    }
  };

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      'entertainment': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'streaming': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'software': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'utilities': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'health': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'other': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };

    return categories[category.toLowerCase()] || categories.other;
  };

  return (
    <div className="card animate-fade-in transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col h-full">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{subscription.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(subscription.category)}`}>
            {subscription.category}
          </span>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-grow">
          {subscription.description}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <CreditCard className="mr-2 h-4 w-4 text-gray-500" />
            <span className="font-medium">{formattedAmount}</span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              ({getBillingCycleText(subscription.billingCycle)})
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span>Next billing: {format(new Date(subscription.nextBillingDate), 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <Link
            to={`/subscriptions/${subscription._id}`}
            className="btn btn-outline !p-2"
            aria-label={`Edit ${subscription.name}`}
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="btn btn-outline !p-2 text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20"
            aria-label={`Delete ${subscription.name}`}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Subscription"
        message={`Are you sure you want to delete "${subscription.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmButtonClassName="btn-danger"
      />
    </div>
  );
};

export default SubscriptionCard;