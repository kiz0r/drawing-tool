import { useState, useRef, useEffect, useCallback } from 'react';
import { useDrawingContext, useZoomContext } from '../hooks';

const DrawingDesk = () => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentImageData, setCurrentImageData] = useState<ImageData | null>(
    null
  );

  const {
    tool,
    color,
    lineWidth,
    canvasBackground,
    canvasRef,
    addDrawingState,
  } = useDrawingContext();

  const { zoom } = useZoomContext();

  const resetCanvasProperties = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    // Перерисовываем фон
    const canvas = canvasRef.current;
    if (canvas) {
      ctx.fillStyle = canvasBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Устанавливаем свойства рисования
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? canvasBackground : color;
  }, [color, lineWidth, tool, canvasBackground, canvasRef]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;

    const ctx = ctxRef.current;
    const { width, height } = window.document.body.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    // После изменения размера канваса перерисовываем фон
    resetCanvasProperties();

    // Восстанавливаем текущий рисунок, если он есть
    if (currentImageData) {
      ctx.putImageData(currentImageData, 0, 0);
    }
  }, [canvasRef, resetCanvasProperties, currentImageData]);

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
  }, [canvasRef, resizeCanvas]);

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
      setCurrentImageData(currentImageData); // Сохраняем текущее состояние рисунка
      addDrawingState(currentImageData);
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
