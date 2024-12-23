import { useState, useEffect, useCallback } from 'react';
import { useDrawingContext, useZoomContext } from '../hooks';

const DrawingDesk = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const { ctxRef, canvasRef, drawingState, setIsDrawing } = useDrawingContext();

  const { tool, lineWidth, canvasBackground, color, isDrawing } = drawingState;

  const { zoom } = useZoomContext();

  const resetCanvasProperties = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const canvas = canvasRef.current;
    if (canvas) {
      ctx.fillStyle = canvasBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? canvasBackground : color;
  }, [ctxRef, canvasRef, lineWidth, tool, canvasBackground, color]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;

    const ctx = ctxRef.current;
    const { width, height } = window.document.body.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    resetCanvasProperties();

    if (imageData) {
      ctx.putImageData(imageData, 0, 0);
    }
  }, [canvasRef, ctxRef, resetCanvasProperties, imageData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef, ctxRef, resizeCanvas]);

  useEffect(() => {
    resetCanvasProperties();
  }, [resetCanvasProperties]);

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    return { x, y };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoordinates(event);
    setIsDrawing(true);

    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const ctx = ctxRef.current;
    const { x, y } = getCanvasCoordinates(event);

    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = ctxRef.current;
    if (ctx && canvasRef.current) {
      ctx.beginPath();
      const currentImageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setImageData(currentImageData);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <canvas
        id="canvas"
        className="absolute z-[9990] w-full h-full origin-center border-solid border-2 border-black"
        ref={canvasRef as React.RefObject<HTMLCanvasElement>}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          transform: `scale(${zoom})`,
        }}
      />
    </div>
  );
};

export default DrawingDesk;
