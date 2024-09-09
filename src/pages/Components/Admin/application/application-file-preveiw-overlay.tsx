import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog";


const FilePreviewOverlay = ({ file, isOpen, onClose }) => {
  const renderPreview = () => {
    if (!file) return null;

    const fileType = file.type.split('/')[0];

    switch (fileType) {
      case 'image':
        return <img src={URL.createObjectURL(file)} alt="Preview" className="max-w-full max-h-[80vh] object-contain" />;
      case 'application':
        if (file.type === 'application/pdf') {
          return <iframe src={URL.createObjectURL(file)} className="w-full h-[80vh]" />;
        }
        // Fall through for other application types
      default:
        return <p className="text-center">Preview not available for this file type.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[80vw] sm:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{file?.name}</span>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
              <X className="h-6 w-6" />
            </button>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex justify-center">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreviewOverlay;