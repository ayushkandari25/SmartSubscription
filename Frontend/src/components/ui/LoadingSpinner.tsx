import React from 'react';

type SpinnerSize = 'small' | 'medium' | 'large';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeClasses = {
  small: 'h-4 w-4',
  medium: 'h-8 w-8',
  large: 'h-12 w-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  className = '',
}) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-b-2 border-t-2 border-blue-500`}></div>
    </div>
  );
};

export default LoadingSpinner;