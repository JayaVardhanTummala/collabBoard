const CreateBoardModal = ({ isOpen, onClose, fetchBoards }) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const board = await apiService.createBoard(title);
            toast.success(`Board "${board.title}" created!`);
            setTitle('');
            await fetchBoards(); 
            onClose();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Board">
            <form onSubmit={handleSubmit}>
                <FormInput 
                    id="boardTitle"
                    label="Board Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Q4 Marketing Plan"
                    type="text"
                />
                <Button type="submit" disabled={loading || title.trim() === ''} className="w-full mt-4">
                    {loading ? 'Creating...' : <><Plus size={20} /> Create Board</>}
                </Button>
            </form>
        </Modal>
    );
};