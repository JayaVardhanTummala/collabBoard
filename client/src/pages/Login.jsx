const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const { isDarkMode } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.login({ email, password });
      if (response) {
        login(response, response.token);
        toast.success(`Welcome back, ${response.name}!`);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const linkClass = isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Card className="max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Sign In to CollabBoard
        </h2>
        <form onSubmit={handleSubmit}>
          <FormInput 
            id="email" 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="you@example.com"
          />
          <FormInput 
            id="password" 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="********"
          />
          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? 'Signing In...' : <><LogIn size={20} /> Sign In</>}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className={`font-medium ${linkClass}`}>
            Register here
          </button>
        </p>
      </Card>
    </div>
  );
};