import { cn } from '@/lib/utils';
import { HexColor } from '@/shared/types/HexColor';
import { drawingStateAtom } from '@/store';
import { useAtomValue } from 'jotai';
import React from 'react';

type Props = {
  readonly onColorChange: (color: HexColor) => void;
};

export const Palette = React.memo((props: Props) => {
  const drawingState = useAtomValue(drawingStateAtom);

  const paletteColorBtnCn = React.useMemo(
    () => cn('w-6 h-6 hover:scale-125 transition-transform duration-200'),
    []
  );

  return (
    <div className='grid grid-cols-8 gap-1'>
      {drawingState.paletteColors.map((color, index) => (
        <button
          key={index}
          type='button'
          className={paletteColorBtnCn}
          style={{ backgroundColor: color }}
          onClick={() => props.onColorChange(color)}
        />
      ))}
    </div>
  );
});
