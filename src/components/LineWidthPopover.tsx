import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { LINE_WIDTH_PROPERTIES } from '@/settings';
import { drawingStateAtom, updateDrawingStateAtom } from '@/store';
import { Button } from './ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';

const lineWidthOptions = Object.entries(LINE_WIDTH_PROPERTIES).map(
  ([name, value]) =>
    ({
      displayName: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      value,
    }) as const
);

export const LineWidthPopover = React.memo(() => {
  const drawingState = useAtomValue(drawingStateAtom);
  const updateDrawingState = useSetAtom(updateDrawingStateAtom);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='icon'>
          <span
            className='w-5 rounded-sm bg-black'
            style={{
              height: `${drawingState.lineWidth * 0.5}px`,
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-3'>
        <div>
          <p className='text-sm font-medium'>Line Width</p>
          <div className='flex flex-col gap-2'>
            {lineWidthOptions.map((option) => (
              <Button
                key={`${option.displayName}-${option.value}`}
                variant='ghost'
                className='inline-flex items-center justify-start gap-2'
                disabled={drawingState.lineWidth === option.value}
                onClick={() => updateDrawingState({ lineWidth: option.value })}
              >
                <span
                  className='w-5 rounded-sm bg-black'
                  style={{
                    height: `${option.value * 0.5}px`,
                  }}
                />
                <span className='text-sm'>{option.displayName}</span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});
