import { useEffect, useRef } from 'react';

interface IModal extends ModalProps {
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IModal) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

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
    <div ref={modalRef} className="widget">
      {children}
    </div>
  );
};

export default Modal;
