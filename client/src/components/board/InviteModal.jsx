const InviteModal = ({ isOpen, onClose, boardId, fetchBoard }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const updatedBoard = await apiService.inviteCollaborator(boardId, email);
            toast.success(`User invited!`);
            // Note: The board detail refetch will show the new collaborator's name
            setEmail('');
            await fetchBoard(); 
            onClose();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Invite Collaborator">
            <form onSubmit={handleSubmit}>
                <FormInput 
                    id="inviteEmail"
                    label="User Email to Invite"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="teammate@example.com"
                    type="email"
                />
                <Button type="submit" disabled={loading || email.trim() === ''} className="w-full mt-4">
                    {loading ? 'Sending...' : <><Send size={20} /> Send Invite</>}
                </Button>
            </form>
        </Modal>
    );
};