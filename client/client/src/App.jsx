const App = () => {
    const { isDarkMode } = useAuthStore();
    
    // Global dark mode class setter
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <AuthInitializer>
            <Router>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'); body { font-family: 'Inter', sans-serif; }`}</style>
                <Toaster position="top-center" />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Dashboard />
                            </MainLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/board/:id" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <BoardDetail />
                            </MainLayout>
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <MainLayout>
                                <SettingsPage />
                            </MainLayout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthInitializer>
    );
}

export default App;