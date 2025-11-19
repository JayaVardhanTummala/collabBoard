import React from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import useInviteStore from "../../store/useInviteStore";
import apiService from "../../utils/apiService";
import { toast } from "react-hot-toast";
import useBoardStore from "../../store/useBoardStore";

export default function InviteModal({ isOpen, onClose }) {
  const { invites, removeInvite, fetchInvites } = useInviteStore();
  const { setBoards } = useBoardStore();

  const handleAccept = async (id) => {
    try {
      await apiService.acceptInvite(id);
      toast.success("Invite accepted!");

      removeInvite(id);
      fetchInvites();

      // refresh boards
      const updatedBoards = await apiService.getBoards();
      setBoards(updatedBoards);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await apiService.rejectInvite(id);
      toast.success("Invite rejected.");
      removeInvite(id);
      fetchInvites();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pending Invitations">
      <div className="space-y-4">
        {invites.length === 0 ? (
          <p className="text-gray-600">No pending invites.</p>
        ) : (
          invites.map((inv) => (
            <div
              key={inv._id}
              className="p-4 border rounded-xl bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{inv.boardId.title}</p>
                <p className="text-sm text-gray-600">
                  Invited by: {inv.ownerId.name}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  className="!px-4 !py-2"
                  onClick={() => handleAccept(inv._id)}
                >
                  Accept
                </Button>
                <Button
                  variant="yellow"
                  className="!px-4 !py-2"
                  onClick={() => handleReject(inv._id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
}
