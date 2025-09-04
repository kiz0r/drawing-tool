import { useAtomValue, useSetAtom } from 'jotai';
import { Eraser, Pencil, X } from 'lucide-react';
import React from 'react';
import { APP_ICON_SIZE } from '@/settings';
import { drawingStateAtom, updateDrawingStateAtom } from '@/store';
import { Button } from './ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/Tooltip';
import { useCanvas } from './useCanvas';

export const ToolBar = React.memo(() => {
  const drawingState = useAtomValue(drawingStateAtom);
  const updateDrawingState = useSetAtom(updateDrawingStateAtom);
  const canvas = useCanvas();

  return (
    <div className='flex items-center gap-2'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            variant='outline'
            disabled={drawingState.tool === 'pencil'}
            onClick={() => updateDrawingState({ tool: 'pencil' })}
          >
            <Pencil size={APP_ICON_SIZE} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Pencil</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size='icon'
            variant='outline'
            disabled={drawingState.tool === 'eraser'}
            onClick={() => updateDrawingState({ tool: 'eraser' })}
          >
            <Eraser size={APP_ICON_SIZE} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Eraser</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size='icon' variant='outline' onClick={() => canvas.clearCanvas()}>
            <X size={APP_ICON_SIZE} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Clear all</TooltipContent>
      </Tooltip>
    </div>
  );
});
