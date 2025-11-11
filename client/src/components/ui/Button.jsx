import React from 'react';

const Button = ({ children, onClick, variant = 'primary', disabled, className = '', type = 'button' }) => {
  const baseClasses = "px-4 py-2 font-semibold rounded-lg transition-all duration-200 shadow-md flex items-center justify-center space-x-2";
  let variantClasses = '';

  if (variant === 'primary') {
    variantClasses = 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600';
  } else if (variant === 'danger') {
    variantClasses = 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
