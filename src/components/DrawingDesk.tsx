import { useState, useRef, useEffect } from 'react';
import { useDrawingContext, useZoomContext } from '../hooks';
import { INITIAL_CANVAS_OFFSET } from '../constants';

const DrawingDesk = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [offset, setOffset] = useState<CanvasOffset>(INITIAL_CANVAS_OFFSET);

  const { zoom, zoomIn, zoomOut, resetZoom } = useZoomContext();
  const { tool, color, lineWidth, canvasBackground, addDrawingState } =
    useDrawingContext();

  // Настройка канваса
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Устанавливаем начальный фон
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [canvasBackground]);

  // Обновление инструментов (цвет, толщина линии, инструмент)
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? canvasBackground : color;
  }, [color, lineWidth, tool, canvasBackground]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Обновляем фон
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.putImageData(currentImage, 0, 0);
  }, [canvasBackground]);

  // Масштабирование с клавиатуры
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === '=') {
        event.preventDefault();
        zoomIn();
      } else if (event.metaKey && event.key === '-') {
        event.preventDefault();
        zoomOut();
      } else if (event.metaKey && event.key === '0') {
        event.preventDefault();
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomIn, zoomOut, resetZoom]);

  // Получение координат мыши с учетом масштаба
  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    return { x, y };
  };

  // Начало рисования
  const startDrawing = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoordinates(e);
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  // Рисование
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const { x, y } = getCanvasCoordinates(e);
    const ctx = ctxRef.current;

    if (ctx) {
      if (tool === 'eraser') {
        ctx.strokeStyle = canvasBackground;
      } else {
        ctx.strokeStyle = color;
      }
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  // Завершение рисования
  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (isDrawing && canvas && ctx) {
      ctx.closePath();
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      addDrawingState(imageData); // Сохраняем текущее состояние
      setIsDrawing(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full !pointer-events-auto">
      <canvas
        id="canvas"
        className="absolute left-0 bottom-0 w-full h-full"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default DrawingDesk;
