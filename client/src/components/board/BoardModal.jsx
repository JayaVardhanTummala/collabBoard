import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import Modal from "../ui/Modal";
import apiService from "../../utils/apiService";

export default function BoardModal({ isOpen, onClose, fetchBoards }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const board = await apiService.createBoard(title);
      toast.success(`Board "${board.title}" created!`);

      setTitle("");
      await fetchBoards();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to create board.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Board">
      <form onSubmit={handleSubmit}>
        <FormInput
          id="board-title"
          label="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Q4 Marketing Plan"
          type="text"
        />

        <Button
          type="submit"
          variant="none"
          disabled={loading || title.trim() === ""}
          className="
            w-full mt-4 flex items-center justify-center gap-2
            bg-[var(--color-primary)] text-white
            border-4 border-gray-900
            rounded-xl font-bold py-3
            shadow-[6px_6px_0px_#1e293b]
            hover:-translate-y-1 hover:shadow-[8px_8px_0px_#1e293b]
          "
        >
          {loading ? "Creating..." : (
            <>
              <Plus size={18} />
              Create Board
            </>
          )}
        </Button>
      </form>
    </Modal>
  );
}
