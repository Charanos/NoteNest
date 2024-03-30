"use client";

import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const onChange = (open: boolean) => {
    if (!open) {
      // reset the form

      uploadModal.onClose();
    }
  };

  return (
    <Modal
      onChange={onChange}
      title="add a song"
      isOpen={uploadModal.isOpen}
      description="upload a mp3 file"
    >
      Form
    </Modal>
  );
};

export default UploadModal;
