import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const inputClasses = `block px-4 py-2 w-full text-gray-700 bg-white border ${
    error ? 'border-red-500' : 'border-gray-300'
  } rounded-md focus:outline-none focus:ring-2 ${
    error ? 'focus:ring-red-200' : 'focus:ring-blue-200'
  } focus:border-transparent transition duration-200`;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;