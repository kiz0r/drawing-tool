import { Minus, Plus } from 'lucide-react';
import { MAX_LINE_WIDTH, MIN_LINE_WIDTH } from '../../constants';
import useDrawingContext from '../../hooks/useDrawingContext';
import Button from '../Button';
import Modal from '../Modal';
import Palette from '../Palette';

const ColorModal = (props: ModalProps) => {
  const { setColor, setLineWidth, lineWidth } = useDrawingContext();

  const increaseLineWidth = () => setLineWidth(lineWidth + 1);
  const decreaseLineWidth = () => setLineWidth(lineWidth - 1);

  return (
    <Modal {...props}>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-[16px]">Line width</h2>
        <div className="inner-widget">
          <Button
            disabled={lineWidth <= MIN_LINE_WIDTH}
            onClick={decreaseLineWidth}
            tooltip="Decrease"
            icon={<Minus width={28} />}
          ></Button>
          <span className="font-semibold text-[20px]">{lineWidth}</span>
          <Button
            disabled={lineWidth >= MAX_LINE_WIDTH}
            onClick={increaseLineWidth}
            tooltip="Increase"
            icon={<Plus width={28} />}
          ></Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-[16px]">Color</h2>
        <Palette onColorChange={setColor} />
      </div>
    </Modal>
  );
};

export default ColorModal;
