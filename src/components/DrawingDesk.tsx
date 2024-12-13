import { useState, useRef, useEffect } from 'react';
import { useDrawingContext } from '../hooks';

const DrawingDesk = () => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  const {
    tool,
    color,
    lineWidth,
    canvasBackground,
    canvasRef,
    addDrawingState,
  } = useDrawingContext(); // Используем addDrawingState из контекста

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasBackground, canvasRef]);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? canvasBackground : color;
  }, [color, lineWidth, tool, canvasBackground]);

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoordinates(event);
    setStartX(x);
    setStartY(y);
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

    if (canvasRef.current) {
      const currentImageData = ctx?.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (currentImageData) {
        addDrawingState(currentImageData); // Пушим в историю
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      if (canvasRef.current) {
        const currentImageData = ctx.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        if (currentImageData) {
          addDrawingState(currentImageData); // Пушим состояние в историю при завершении рисования
        }
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full !pointer-events-auto">
      <canvas
        id="canvas"
        className="absolute left-0 bottom-0 w-full h-full"
        ref={canvasRef as React.RefObject<HTMLCanvasElement>}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default DrawingDesk;
