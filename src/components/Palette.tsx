import { useRef, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import useDrawingContext from '../hooks/useDrawingContext';
import { toast } from 'react-toastify';
import Button from './Button';

interface IPalette {
  onColorChange: (color: string) => void;
}

const Palette = ({ onColorChange }: IPalette) => {
  const { paletteColors, setPaletteColors } = useDrawingContext();
  const [isPickerShown, setIsPickerShown] = useState<boolean>(false);
  const colorInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <div className="inner-widget !grid grid-cols-7 !gap-0.5">
        {paletteColors.map((color, idx) => (
          <button
            key={idx}
            className={`w-6 h-6 hover:scale-125 transition-transform duration-200`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          ></button>
        ))}
        <Button
          className="!p-0 hover:scale-125 rounded-none bg-transparent"
          onClick={handlePaletteChange}
          icon={isPickerShown ? <Check /> : <Plus />}
        />
      </div>
      {isPickerShown && (
        <input
          type="color"
          ref={colorInputRef}
          className="absolute w-20 right-0 bottom-0"
        />
      )}
    </>
  );
};

export default Palette;
