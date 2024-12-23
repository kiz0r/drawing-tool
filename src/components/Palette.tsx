import { useRef, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { useDrawingContext } from '../hooks';
import { toast } from 'react-toastify';
import Button from './Button';
import clsx from 'clsx';

interface IPalette {
  onColorChange: (color: string) => void;
}

const Palette = ({ onColorChange }: IPalette) => {
  const { drawingState, setPaletteColors } = useDrawingContext();
  const [isPickerShown, setIsPickerShown] = useState<boolean>(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const { paletteColors } = drawingState;

  const addCustomColor = (color: string) => {
    if (paletteColors.includes(color)) {
      toast.warn('Color is already in palette');
      return;
    }

    toast.success('Color added to palette');
    return setPaletteColors([...paletteColors, color]);
  };

  const handlePaletteChange = () => {
    if (!isPickerShown) {
      setIsPickerShown(true);
      return;
    }

    addCustomColor(colorInputRef.current?.value || '');
    setIsPickerShown(false);
  };

  const paletteColorBtnCn = clsx(
    'w-6 h-6 hover:scale-125 transition-transform duration-200',
    {
      'pointer-events-none grayscale': isPickerShown,
    }
  );

  return (
    <>
      <div className="inner-widget !grid grid-cols-7 !gap-0.5">
        {paletteColors.map((color, idx) => (
          <button
            key={idx}
            className={paletteColorBtnCn}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          ></button>
        ))}
        <Button
          tooltip="Pick a color"
          className="!p-0 hover:scale-125 rounded-none bg-transparent"
          onClick={handlePaletteChange}
          icon={isPickerShown ? <Check /> : <Plus />}
        />
        {isPickerShown && (
          <div className="w-6 h-6">
            <input
              ref={colorInputRef}
              type="color"
              defaultValue={paletteColors[0]}
              className="w-full p-0 border-none cursor-pointer"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Palette;
