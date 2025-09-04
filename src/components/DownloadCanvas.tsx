import { Download } from 'lucide-react';
import React from 'react';
import { APP_ICON_SIZE } from '@/settings';
import { Button } from './ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/Tooltip';
import { useCanvas } from './useCanvas';

export const DownloadCanvas = React.memo(() => {
  const canvas = useCanvas();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size='icon' variant='outline' onClick={() => canvas.download('drawing.png')}>
          <Download size={APP_ICON_SIZE} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Download</TooltipContent>
    </Tooltip>
  );
});
