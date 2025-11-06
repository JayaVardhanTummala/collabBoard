const Home = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useAuthStore();
    const bgClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
    
    return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${bgClass} transition-colors p-6`}>
            <HomeIcon size={64} className="text-indigo-600 dark:text-indigo-400 mb-4" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-4">
                CollabBoard
            </h1>
            <p className="text-xl text-center mb-8 max-w-lg opacity-80">
                Real-time collaborative task & note management board built for teams.
            </p>
            <div className="flex space-x-4">
                <Button onClick={() => navigate('/login')} variant="primary" className="text-lg">
                    <LogIn size={20} /> Get Started
                </Button>
                <Button onClick={() => navigate('/register')} variant="secondary" className="text-lg">
                    <UserPlus size={20} /> Register
                </Button>
            </div>
            <footer className="mt-16 text-sm opacity-50">
                A Full-Stack MVP using React, Tailwind, Zustand, and Node/Mongo.
            </footer>
        </div>
    );
};