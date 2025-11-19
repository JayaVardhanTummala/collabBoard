import React from "react";
import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({
  isOpen,
  title = "Confirm",
  message = "Are you sure?",
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
  onClose = () => {},
  onConfirm = () => {},
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-md !text-gray-600 mb-6">{message}</p>

      <div className="flex gap-3 justify-end">
        <Button
          onClick={onClose}
          variant="secondary"
          className="px-4 py-2 text-sm"
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={() => onConfirm()}
          variant="yellow"
          className="px-4 py-2 text-sm"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
