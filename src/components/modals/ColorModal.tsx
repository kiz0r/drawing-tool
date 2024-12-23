import { Minus, Plus } from 'lucide-react';
import { APP_ICON_SIZE, LINE_WIDTH_PROPERTIES } from '../../constants';
import useDrawingContext from '../../hooks/useDrawingContext';
import Button from '../Button';
import Modal from '../Modal';
import Palette from '../Palette';
import { useState } from 'react';

const ColorModal = (props: ModalProps) => {
  const { setColor, setLineWidth, lineWidth } = useDrawingContext();
  const [inputValue, setInputValue] = useState<string>(lineWidth.toString());

  const increaseLineWidth = () => {
    const newValue = Math.min(lineWidth + 1, LINE_WIDTH_PROPERTIES.MAX);
    setLineWidth(newValue);
    setInputValue(newValue.toString());
  };

  const decreaseLineWidth = () => {
    const newValue = Math.max(lineWidth - 1, LINE_WIDTH_PROPERTIES.MIN);
    setLineWidth(newValue);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const parsedValue = parseInt(value, 10);
    if (
      !isNaN(parsedValue) &&
      parsedValue >= LINE_WIDTH_PROPERTIES.MIN &&
      parsedValue <= LINE_WIDTH_PROPERTIES.MAX
    ) {
      setLineWidth(parsedValue);
    }
  };

  const handleInputBlur = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (
      isNaN(parsedValue) ||
      parsedValue < LINE_WIDTH_PROPERTIES.MIN ||
      parsedValue > LINE_WIDTH_PROPERTIES.MAX
    ) {
      // Reset to current `lineWidth` if invalid value is entered
      setInputValue(lineWidth.toString());
    }
  };
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
          <input
            type="number"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent w-16 text-center font-semibold text-[20px]"
            onChange={handleInputChange}
            onBlur={handleInputBlur} // Проверка на допустимое значение при потере фокуса
            value={inputValue}
            min={LINE_WIDTH_PROPERTIES.MIN}
            max={LINE_WIDTH_PROPERTIES.MAX}
          />
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
