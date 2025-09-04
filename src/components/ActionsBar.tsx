import React from 'react';
import { CanvasBackgroundPopover } from './CanvasBackgroundPopover';
import { ColorPopover } from './ColorPopover';
import { DownloadCanvas } from './DownloadCanvas';
import { LineWidthPopover } from './LineWidthPopover';
import { ToolBar } from './ToolBar';
import { Separator } from './ui/Separator';

export const ActionsBar = React.memo(() => {
  return (
    <div className='absolute top-4 left-1/2 -translate-x-1/2 z-[9999]'>
      <nav className='flex items-center gap-2 bg-background h-12 px-2 border rounded-md'>
        <ToolBar />

        <Separator orientation='vertical' />

        <LineWidthPopover />
        <ColorPopover />
        <CanvasBackgroundPopover />

        <Separator orientation='vertical' />

        <DownloadCanvas />
      </nav>
    </div>
  );
});
