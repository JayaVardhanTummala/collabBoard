const TaskCard = ({ task, onUpdate, onDelete }) => {
    const { isDarkMode } = useAuthStore();
    const color = TASK_COLORS[task.color] || { hex: '#FFFFFF', bg: 'bg-white', dot: 'bg-gray-400' };

    const taskBg = isDarkMode ? `bg-gray-700 hover:shadow-indigo-500/30` : `bg-white hover:shadow-indigo-200`;
    const assignedUser = task.assignedTo?.name ? `Assigned: ${task.assignedTo.name}` : 'Unassigned';

    return (
        <div 
            className={`p-3 rounded-xl shadow-md border-t-4 transition-shadow duration-200 cursor-grab ${taskBg}`} 
            style={{ borderTopColor: color.hex }}
        >
            <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-base truncate">{task.title}</h4>
                <div className="flex space-x-1">
                    <button onClick={() => onUpdate(task)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(task)} className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800">
                        <Trash2 size={16} className="text-red-500" />
                    </button>
                </div>
            </div>
            <p className="text-xs opacity-80 mb-2">{task.description?.substring(0, 50)}...</p>
            <div className="text-xs opacity-60 flex justify-between items-center">
                <span>{assignedUser}</span>
                <div className="flex items-center">
                    <span className={`w-2 h-2 rounded-full ${color.dot} mr-1`}></span>
                    <span className="capitalize">{task.color}</span>
                </div>
            </div>
        </div>
    );
};