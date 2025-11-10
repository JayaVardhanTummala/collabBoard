const Modal = ({ isOpen, onClose, title, children }) => {
    const { isDarkMode } = useAuthStore();
    if (!isOpen) return null;

    const modalBg = isDarkMode ? 'bg-gray-900/70' : 'bg-black/50';
    const contentBg = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${modalBg} transition-opacity duration-300`} onClick={onClose}>
            <div 
                className={`max-w-md w-full p-6 rounded-xl shadow-2xl transform transition-all duration-300 scale-100 ${contentBg}`} 
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-600">
                        <X size={20} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

