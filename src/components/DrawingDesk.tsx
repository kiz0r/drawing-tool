import React from 'react';
import { useCanvas } from './useCanvas';

export const DrawingDesk = React.memo(() => {
  const canvas = useCanvas();

  return (
    <div className='fixed top-0 left-0 w-full h-full'>
      <canvas
        className='absolute top-0 left-0 w-full h-full'
        ref={canvas.createBackgroundCanvasRef}
      />
      <canvas
        className='absolute top-0 left-0 w-full h-full'
        ref={canvas.createDrawingCanvasRef}
        onMouseDown={canvas.startDrawing}
        onMouseMove={canvas.draw}
        onMouseUp={canvas.stopDrawing}
        onMouseLeave={canvas.stopDrawing}
      />
    </div>
  );
});
