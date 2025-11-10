const SettingsPage = () => {
    const { isDarkMode, toggleDarkMode, user, logout } = useAuthStore();

    return (
        <div className="p-6 md:p-10 flex-grow">
            <h2 className="text-3xl font-bold mb-8 border-b pb-4">Settings</h2>
            
            <Card className="max-w-xl">
                <h3 className="text-xl font-semibold mb-4">Account</h3>
                <div className="space-y-3 mb-6">
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                </div>

                <h3 className="text-xl font-semibold mb-4">Appearance</h3>
                <div className="flex justify-between items-center p-3 rounded-lg border dark:border-gray-600 mb-6">
                    <span>Dark Mode</span>
                    <label className="switch relative inline-block w-12 h-6">
                        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} className="opacity-0 w-0 h-0" />
                        {/* Custom visual switch */}
                        <div className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-400'}`}>
                            <span 
                                className={`absolute left-[2px] bottom-[2px] h-5 w-5 bg-white rounded-full transition-transform duration-300 ${isDarkMode ? 'transform translate-x-6' : 'transform translate-x-0'}`}
                            ></span>
                        </div>
                    </label>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Danger Zone</h3>
                <Button onClick={logout} variant="danger">
                    <LogIn size={16} className="rotate-180" /> Logout Now
                </Button>
            </Card>
        </div>
    );
};