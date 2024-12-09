import { useEffect, useRef } from 'react';

interface IModal extends ModalProps {
  children: React.ReactNode;
  modalName: string;
}

const Modal = ({ isOpen, onClose, children, modalName }: IModal) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const buttonForModal = document.querySelector(`[for-modal="${modalName}"]`);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonForModal &&
        !buttonForModal.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, modalName, isOpen]);
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div ref={modalRef} data-modal={modalName} className="widget">
      {children}
    </div>
  );
};

export default Modal;
