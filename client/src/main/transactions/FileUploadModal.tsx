"use client";

import { Button, FileInput, Label, Modal } from "flowbite-react";
import { useState } from "react";
import axios from "axios";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData:any) => void;
}

export function FileUploadModal({
  isOpen,
  onClose,
  onSubmit,
}: FileUploadModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFiles[0]); // Only uploading the first file

      onSubmit(formData); // Call the provided onSubmit handler
      onClose(); // Close the modal
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div>
          <Label htmlFor="multiple-file-upload" value="Upload CSV or Excel files" />
        </div>
        <FileInput id="multiple-file-upload" multiple={false} onChange={handleFileChange} />
        <div className="w-full">
          <Button onClick={handleSubmit}>Save Transaction</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
