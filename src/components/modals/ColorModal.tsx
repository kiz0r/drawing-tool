import { Minus, Plus } from 'lucide-react';
import { APP_ICON_SIZE, LINE_WIDTH_PROPERTIES } from '../../constants';
import useDrawingContext from '../../hooks/useDrawingContext';
import Button from '../Button';
import Modal from '../Modal';
import Palette from '../Palette';

const ColorModal = (props: ModalProps) => {
  const { setColor, setLineWidth, lineWidth } = useDrawingContext();

  const increaseLineWidth = () => setLineWidth(lineWidth + 1);
  const decreaseLineWidth = () => setLineWidth(lineWidth - 1);

  return (
    <Modal modalName="color-modal" {...props}>
      <div className="flex flex-col gap-2">
        <h2 className="font-medium text-[16px]">Line width</h2>
        <div className="inner-widget">
          <Button
            disabled={lineWidth <= LINE_WIDTH_PROPERTIES.MIN}
            onClick={decreaseLineWidth}
            tooltip="Decrease"
            icon={<Minus width={APP_ICON_SIZE} />}
          ></Button>
          <span className="font-semibold text-[20px]">{lineWidth}</span>
          <Button
            disabled={lineWidth >= LINE_WIDTH_PROPERTIES.MAX}
            onClick={increaseLineWidth}
            tooltip="Increase"
            icon={<Plus width={APP_ICON_SIZE} />}
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
