import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertClasses = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
  };

  const iconClasses = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-amber-500',
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className={`h-5 w-5 ${iconClasses[type]}`} />;
      case 'error':
        return <AlertCircle className={`h-5 w-5 ${iconClasses[type]}`} />;
      case 'warning':
        return <AlertCircle className={`h-5 w-5 ${iconClasses[type]}`} />;
      case 'info':
      default:
        return <Info className={`h-5 w-5 ${iconClasses[type]}`} />;
    }
  };

  return (
    <div className={`flex items-center justify-between p-4 mb-4 border rounded-md ${alertClasses[type]}`}>
      <div className="flex items-center">
        {getIcon()}
        <span className="ml-3">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="inline-flex text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;