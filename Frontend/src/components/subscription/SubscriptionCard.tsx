import React from 'react';
import { CalendarDays, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Subscription } from '../../types';
import Card from '../ui/Card';

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const { name, description, price, billingCycle, startDate, endDate, status } = subscription;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-amber-100 text-amber-800',
  };
  
  const statusIcons = {
    active: <CheckCircle className="h-4 w-4 text-green-600 mr-1" />,
    inactive: <XCircle className="h-4 w-4 text-red-600 mr-1" />,
    pending: <AlertCircle className="h-4 w-4 text-amber-600 mr-1" />,
  };
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {statusIcons[status]}
          <span className="capitalize">{status}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      <div className="mb-4">
        <div className="flex items-center text-xl font-bold text-gray-900">
          ${price.toFixed(2)}
          <span className="text-sm font-normal text-gray-500 ml-1">
            /{billingCycle}
          </span>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-600">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span>Start: {formatDate(startDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>End: {formatDate(endDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <CreditCard className="h-4 w-4 mr-2" />
          <span className="capitalize">{billingCycle} billing</span>
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard;