import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { HexColor } from '@/shared/types/HexColor';
import { drawingStateAtom, updateDrawingStateAtom } from '@/store';
import { Palette } from './Palette';
import { Button } from './ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';

export const ColorPopover = React.memo(() => {
  const drawingState = useAtomValue(drawingStateAtom);
  const updateDrawingState = useSetAtom(updateDrawingStateAtom);

  const handleColorChange = React.useCallback(
    (nextColor: HexColor) => {
      updateDrawingState({
        color: nextColor,
      });
    },
    [updateDrawingState]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <span
            className='w-5 h-5 rounded-full border-active-component'
            style={{
              backgroundColor: drawingState.color,
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-3'>
        <p className='text-sm font-medium'>Color</p>
        <Palette onColorChange={handleColorChange} />
      </PopoverContent>
    </Popover>
  );
});
