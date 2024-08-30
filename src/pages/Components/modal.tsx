import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
}

interface ModalSubComponentProps {
    children?: ReactNode;
    className?: string;
}


function Modal({ isOpen, onClose, children, className }: ModalProps,) {
  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", className)}>
      <div className="bg-white p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
}

Modal.Header = function ModalHeader({ children, className }: ModalSubComponentProps) {
    if (!children) return null;
    return <div className={cn("px-6 py-4 border-b", className)}>{children}</div>;
};
  
Modal.Body = function ModalBody({ children, className }: ModalSubComponentProps) {
  if (!children) return null;
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
};
  
Modal.Footer = function ModalFooter({ children, className }: ModalSubComponentProps) {
  if (!children) return null;
  return <div className={cn("px-6 py-4 border-t", className)}>{children}</div>;
};

export default Modal;