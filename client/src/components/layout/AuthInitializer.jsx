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
                console.error("Auth check failed:", error);
                logout(); 
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
