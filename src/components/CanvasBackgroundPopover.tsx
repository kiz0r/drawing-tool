import { useAtomValue, useSetAtom } from 'jotai';
import { PaintBucket } from 'lucide-react';
import React from 'react';
import { APP_ICON_SIZE } from '@/settings';
import { drawingStateAtom, updateDrawingStateAtom } from '@/store';
import { Palette } from './Palette';
import { Button } from './ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';

export const CanvasBackgroundPopover = React.memo(() => {
  const drawingState = useAtomValue(drawingStateAtom);
  const updateDrawingState = useSetAtom(updateDrawingStateAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <PaintBucket fill={drawingState.canvasBackground} size={APP_ICON_SIZE} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-1'>
        <p className='text-sm font-medium'>Canvas Background</p>
        <Palette
          onColorChange={(nextColor) => updateDrawingState({ canvasBackground: nextColor })}
        />
      </PopoverContent>
    </Popover>
  );
});
