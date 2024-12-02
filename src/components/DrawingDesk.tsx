import { useState, useRef, useEffect } from 'react';
import useDrawingContext from '../hooks/useDrawingContext';

const DrawingDesk = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [drawingData, setDrawingData] = useState<ImageData | null>(null);

  const { tool, color, lineWidth, canvasBackground } = useDrawingContext();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;

    // Устанавливаем цвет фона
    ctx.fillStyle = canvasBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Восстанавливаем данные рисования
    if (drawingData) {
      ctx.putImageData(drawingData, 0, 0);
    }
  }, [color, lineWidth, canvasBackground, drawingData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log('ctx.fillStyle :>> ', ctx.fillStyle);
  }, [canvasBackground]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;

  //   const ctx = canvas.getContext('2d');
  //   ctxRef.current = ctx;

  //   if (!ctx) return;

  //   ctx.lineCap = 'round';
  //   ctx.lineJoin = 'round';
  //   ctx.lineWidth = lineWidth;
  //   ctx.strokeStyle = color;

  //   if (drawingData) {
  //     ctx.putImageData(drawingData, 0, 0);
  //   }
  // }, [color, lineWidth, drawingData]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = ctxRef.current;
  //   if (!canvas || !ctx) return;

  //   // Задаем фон
  //   ctx.fillStyle = canvasBackground; // Цвет фона (например, белый)
  //   ctx.fillRect(0, 0, canvas.width, canvas.height); // Заполняем весь канвас цветом

  //   if (drawingData) {
  //     ctx.putImageData(drawingData, 0, 0);
  //   }
  // }, [canvasBackground, drawingData]);

  // useEffect(() => {
  //   const ctx = ctxRef.current;

  //   if (ctx && drawingData) {
  //     ctx.putImageData(drawingData, 0, 0);
  //   }
  // }, [drawingData]);

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent) => {
    const { x, y } = getCanvasCoordinates(e);
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const { x, y } = getCanvasCoordinates(e);
    const ctx = ctxRef.current;

    if (ctx) {
      if (tool === 'eraser') {
        ctx.strokeStyle = canvasBackground; // Ластик рисует белым цветом
        ctx.lineWidth = lineWidth; // Толщина линии по умолчанию
      } else {
        ctx.strokeStyle = color; // Цвет, выбранный в контексте
        ctx.lineWidth = lineWidth; // Толщина линии по умолчанию
      }
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.closePath();
    }
    setIsDrawing(false);

    const canvas = canvasRef.current;
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingData(imageData); // Сохраняем картинку
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-1000">
      <canvas
        ref={canvasRef}
        className="cursor-auto w-full h-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default DrawingDesk;
