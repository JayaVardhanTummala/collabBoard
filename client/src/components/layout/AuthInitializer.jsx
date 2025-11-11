import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { toast } from 'react-hot-toast';
import apiService from '../../utils/apiService';

const AuthInitializer = ({ children }) => {
  const { token, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const user = await apiService.getMe();
          setUser(user);
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
          toast.error('Session expired. Please login again.');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token, setUser, logout]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
        Loading App...
      </div>
    );
  }

  return children;
};

export default AuthInitializer;
