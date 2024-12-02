import useDrawingContext from '../../hooks/useDrawingContext';
import { Modal, Palette } from '../index';

const CanvasBgModal = ({ isOpen, onClose }: ModalProps) => {
  const { setCanvasBackground } = useDrawingContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-[16px]">Canvas Background</h2>
        <Palette onColorChange={setCanvasBackground} />
      </div>
    </Modal>
  );
};

export default CanvasBgModal;
