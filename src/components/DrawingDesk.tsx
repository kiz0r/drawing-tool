import { useState, useRef, useEffect } from 'react';
import { useDrawingContext, useZoomContext } from '../hooks';

function getCursor(tool: Tool) {
  switch (tool) {
    case 'pencil':
      break;
    case 'eraser':
      return 'cro';

    default:
      return 'default';
  }
}

const DrawingDesk = () => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  const { zoom, zoomIn, zoomOut, resetZoom } = useZoomContext();
  const {
    figure,
    tool,
    color,
    lineWidth,
    canvasBackground,
    addDrawingState,
    canvasRef,
    drawFigure,
  } = useDrawingContext();

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
  }, [canvasBackground, canvasRef]);

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
  }, [canvasBackground, canvasRef]);

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
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if (ctx) {
      const { offsetX, offsetY } = event.nativeEvent;
      setStartX(offsetX / zoom);
      setStartY(offsetY / zoom);
      ctx.beginPath();
      ctx.moveTo(offsetX / zoom, offsetY / zoom);
      setIsDrawing(true);
    }
  };
  // Рисование
  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if (isDrawing && ctx && tool !== 'figure') {
      ctx.lineTo(
        event.nativeEvent.offsetX / zoom,
        event.nativeEvent.offsetY / zoom
      );
      ctx.stroke();
    }
  };

  // Завершение рисования
  const stopDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.closePath();
    }
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (canvas && ctx) {
      const { offsetX, offsetY } = event.nativeEvent;
      if (tool === 'pencil') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        addDrawingState(imageData);
      } else if (tool === 'figure') {
        drawFigure(figure, startX, startY, offsetX / zoom, offsetY / zoom);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full !pointer-events-auto">
      <canvas
        style={{ cursor: getCursor(tool) }}
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
