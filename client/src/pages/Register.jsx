import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FormInput from '../components/ui/FormInput';
import apiService from '../utils/apiService';
import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, isDarkMode } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiService.register({ name, email, password });
      if (response) {
        login(response, response.token);
        toast.success(`Account created! Welcome, ${response.name}.`);
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const linkClass = isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Card className="max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <FormInput id="name" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
          <FormInput id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          <FormInput id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? 'Registering...' : (<><UserPlus size={20} /> Register</>)}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className={`font-medium ${linkClass}`}>
            Sign in here
          </button>
        </p>
      </Card>
    </div>
  );
};

export default Register;
