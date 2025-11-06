const BoardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentBoard, setCurrentBoard, updateTaskStatusOptimistic } = useBoardStore();
    const { user } = useAuthStore();

    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [newTaskStatus, setNewTaskStatus] = useState('To-Do');
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    
    // --- Data Fetching ---
    const fetchBoard = useCallback(async () => {
        setLoading(true);
        try {
            const data = await apiService.getBoardDetail(id);
            setCurrentBoard(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [id, setCurrentBoard]);

    useEffect(() => {
        if (id) {
            fetchBoard();
        }
    }, [id, fetchBoard]);

    // --- Socket.io Handlers ---
    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        
        newSocket.on('connect', () => {
            console.log("Socket connected, joining board room.");
            newSocket.emit('joinBoard', id);
        });
        
        // Listener for real-time task updates from other users
        newSocket.on('taskUpdated', (taskData) => {
            console.log("Real-time task update received.");
            fetchBoard(); 
        });
        
        // Listener for board structure changes (new collaborators, task deleted)
        newSocket.on('boardRefetch', () => {
            console.log("Real-time board refetch signal received.");
            fetchBoard();
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [id, fetchBoard]);

    // --- Task Manipulation ---
    const handleTaskDrop = async (taskId, newStatus) => {
        const currentTask = currentBoard.tasks.find(t => t._id === taskId);
        if (currentTask.status === newStatus) return;

        try {
            // 1. Optimistic Update (UI reacts instantly)
            updateTaskStatusOptimistic(taskId, newStatus);

            // 2. API Call to persist change
            await apiService.updateTask(taskId, { status: newStatus });
            
            // 3. Emit Socket.io event to notify others
            socket?.emit('taskUpdate', id, { taskId, newStatus });

            toast.success(`Task status moved to ${newStatus}.`);
        } catch (error) {
            toast.error(error.message);
            // 4. On failure, refetch to revert optimistic update
            fetchBoard();
        }
    };

    const handleNewTaskClick = (status) => {
        setNewTaskStatus(status);
        setTaskToEdit(null);
        setIsTaskModalOpen(true);
    }
    
    const handleTaskClick = (task) => {
        setTaskToEdit(task);
        setIsTaskModalOpen(true);
    };

    const handleTaskDelete = async (task) => {
        if (!window.confirm(`Delete task "${task.title}"?`)) return;

        try {
            await apiService.deleteTask(task._id);
            socket?.emit('boardUpdate', id, 'task deleted');
            toast.success(`Task "${task.title}" deleted.`);
            fetchBoard();
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setTaskToEdit(null);
    }

    if (loading || !currentBoard) {
        return <div className="p-10 text-center text-xl dark:text-white">Loading board details...</div>;
    }
    
    // Group tasks by status for Kanban columns
    const boardTasks = currentBoard.tasks.reduce((acc, task) => {
        acc[task.status] = acc[task.status] || [];
        acc[task.status].push(task);
        return acc;
    }, {});
    
    const isOwner = currentBoard.owner._id === user?._id;

    return (
        <div className="p-6 md:p-10 flex-grow overflow-x-auto">
            <header className="mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">{currentBoard.title}</h1>
                <p className="text-sm opacity-70 mb-4">
                    Owner: {currentBoard.owner.name} | Collaborators: {currentBoard.collaborators.map(c => c.name).join(', ') || 'None'}
                </p>
                
                <div className="flex space-x-3">
                    {isOwner && (
                        <Button onClick={() => setIsInviteModalOpen(true)} variant="secondary" className="text-sm">
                            <Users size={16} /> Invite
                        </Button>
                    )}
                    <Button onClick={() => navigate('/dashboard')} variant="secondary" className="text-sm">
                         Back to Dashboard
                    </Button>
                </div>
            </header>
            
            <div className="flex space-x-6 pb-4 min-w-full items-start">
                {TASK_STATUSES.map(status => (
                    <KanbanColumn
                        key={status}
                        status={status}
                        tasks={boardTasks[status] || []}
                        onTaskDrop={handleTaskDrop}
                        onNewTaskClick={handleNewTaskClick}
                        onTaskClick={handleTaskClick}
                        onTaskDelete={handleTaskDelete}
                    />
                ))}
            </div>

            <TaskModal 
                isOpen={isTaskModalOpen}
                onClose={closeTaskModal}
                boardId={id}
                taskToEdit={taskToEdit}
                fetchBoard={fetchBoard}
            />
            
            <InviteModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                boardId={id}
                fetchBoard={fetchBoard}
            />
        </div>
    );
};