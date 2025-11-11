import React from 'react';
import useAuthStore from '../../store/useAuthStore';

const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, className = '' }) => {
  const { isDarkMode } = useAuthStore();
  const inputClasses = isDarkMode
    ? 'bg-gray-700 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500'
    : 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full p-3 border rounded-lg shadow-sm ${inputClasses} ${className}`}
      />
    </div>
  );
};

export default FormInput;
