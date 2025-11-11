import React from 'react';
import useAuthStore from '../../store/useAuthStore';

const Card = ({ children, className = '' }) => {
  const { isDarkMode } = useAuthStore();
  const modeClasses = isDarkMode
    ? 'bg-gray-800 text-white border border-gray-700'
    : 'bg-white text-gray-900 border border-gray-200';

  return (
    <div className={`p-6 rounded-xl shadow-lg ${modeClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
