const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { boards, currentBoard } = useBoardStore();
    const { user, logout, isDarkMode } = useAuthStore();
    const navigate = useNavigate();

    const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const textColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
    const activeClass = isDarkMode ? 'bg-indigo-900/50 text-white shadow-inner' : 'bg-indigo-100 text-indigo-700 shadow-inner';
    const baseItemClass = `flex items-center p-3 rounded-lg transition-colors duration-150 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${textColor}`;

    const handleNavigation = (path) => {
        navigate(path);
        if (window.innerWidth < 768) { 
            toggleSidebar();
        }
    }

    return (
        <div className={`fixed inset-y-0 left-0 z-40 w-64 ${bgColor} border-r border-gray-200 dark:border-gray-700 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
            {/* Logo/Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-black text-indigo-600 dark:text-indigo-400">CollabBoard</h1>
                <button onClick={toggleSidebar} className="p-1 md:hidden">
                    <X size={24} />
                </button>
            </div>
            
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {/* Main Navigation */}
                <nav className="space-y-1">
                    <div onClick={() => handleNavigation('/dashboard')} 
                         className={baseItemClass + (window.location.pathname === '/dashboard' ? activeClass : '')}>
                        <HomeIcon size={20} className="mr-3" />
                        Dashboard
                    </div>
                    <div onClick={() => handleNavigation('/settings')} 
                         className={baseItemClass + (window.location.pathname === '/settings' ? activeClass : '')}>
                        <Settings size={20} className="mr-3" />
                        Settings
                    </div>
                </nav>
                
                {/* Boards Section (Accordion-like structure) */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h2 className="text-xs font-semibold uppercase tracking-wider mb-2">My Boards</h2>
                    <nav className="space-y-1">
                        {boards.length > 0 ? boards.map((board) => (
                            <div 
                                key={board._id} 
                                onClick={() => handleNavigation(`/board/${board._id}`)} 
                                className={baseItemClass + (currentBoard && currentBoard._id === board._id ? activeClass : '')}
                            >
                                <span className="w-2 h-2 mr-3 rounded-full bg-indigo-500"></span>
                                <span className="truncate">{board.title}</span>
                            </div>
                        )) : (
                            <p className="text-xs italic p-3">No boards yet.</p>
                        )}
                    </nav>
                </div>
            </div>
            
            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="font-semibold truncate">{user?.name}</p>
                <p className="text-sm opacity-70 truncate mb-2">{user?.email}</p>
                <Button onClick={logout} variant="danger" className="w-full text-sm">
                    <LogIn size={16} className="rotate-180" />
                    Logout
                </Button>
            </div>
        </div>
    );
};
