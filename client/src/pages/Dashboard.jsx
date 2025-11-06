const Dashboard = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { boards, setBoards } = useBoardStore();
    const { isDarkMode } = useAuthStore();
    const navigate = useNavigate();

    const fetchBoards = async () => {
        setLoading(true);
        try {
            const data = await apiService.getBoards();
            setBoards(data || []);
        } catch (error) {
            toast.error(error.message || 'Failed to fetch boards.');
            setBoards([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleDelete = async (boardId, boardTitle) => {
        // IMPORTANT: Use custom modal later, but keeping window.confirm for now as per instructions
        if (!window.confirm(`Are you sure you want to delete the board "${boardTitle}"? This cannot be undone.`)) return;

        try {
            await apiService.deleteBoard(boardId);
            toast.success(`Board "${boardTitle}" deleted.`);
            await fetchBoards();
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    const cardBg = isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200';

    return (
        <div className="p-6 md:p-10 flex-grow">
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            
            <div className="flex justify-between items-center mb-6">
                <p className="text-lg opacity-80">{boards.length} Boards</p>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus size={20} /> New Board
                </Button>
            </div>

            {loading ? (
                <div className="text-center p-10 opacity-70">Loading boards...</div>
            ) : boards.length === 0 ? (
                <div className="text-center p-10 rounded-xl border-2 border-dashed border-gray-400 dark:border-gray-600 opacity-80">
                    <p className="mb-4">You don't have any boards yet.</p>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        Create Your First Board
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {boards.map((board) => (
                        <Card key={board._id} className={`p-5 cursor-pointer transition-colors ${cardBg}`}>
                            <div onClick={() => navigate(`/board/${board._id}`)}>
                                <h3 className="text-xl font-bold truncate mb-2 text-indigo-500">{board.title}</h3>
                                {/* Assuming owner is always available for brevity */}
                                <p className="text-sm opacity-70 mb-4">Owner: {board.owner?.name || 'Unknown'}</p>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                                <Button 
                                    onClick={(e) => { e.stopPropagation(); handleDelete(board._id, board.title); }} 
                                    variant="danger" 
                                    className="p-2 h-auto w-auto"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <CreateBoardModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                fetchBoards={fetchBoards}
            />
        </div>
    );
};