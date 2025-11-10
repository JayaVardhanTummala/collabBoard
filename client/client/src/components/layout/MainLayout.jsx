const MainLayout = ({ children }) => {
    const { isSidebarOpen, toggleSidebar } = useLayoutStore();
    const { isDarkMode } = useAuthStore();
    const bgClass = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';

    return (
        <div className={`flex min-h-screen ${bgClass}`}>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'} w-full`}>
                {/* Header for Mobile/Toggle */}
                <header className="p-4 border-b border-gray-200 dark:border-gray-700 md:hidden flex justify-between items-center">
                    <h1 className="text-xl font-black text-indigo-600 dark:text-indigo-400">CollabBoard</h1>
                    <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Menu size={24} />
                    </button>
                </header>
                
                {children}

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleSidebar}></div>
                )}
            </main>
        </div>
    );
}