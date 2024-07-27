"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

interface DeleteModalProps {
  isOpen: boolean; // Prop to control modal visibility
  onClose: () => void; // Prop for closing the modal
  onSubmit: () => void; // Prop for handling the delete action
}

export function DeleteModal({ isOpen, onClose, onSubmit }: DeleteModalProps) {
  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          {/* Optional icon for visual indication */}
          {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => { onSubmit(); onClose(); }}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
