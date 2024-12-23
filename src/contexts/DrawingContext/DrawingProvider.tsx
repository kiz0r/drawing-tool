import { useRef, useState } from 'react';
import {
  AVAILABLE_COLORS,
  DEFAULT_CANVAS_BACKGROUND_COLOR,
  LINE_WIDTH_PROPERTIES,
} from '../../constants';
import DrawingContext from './DrawingContext';
import type { DrawingState, IDrawingProvider } from './types';

const INITAIAL_DRAWING_STATE: DrawingState = {
  isDrawing: false,
  paletteColors: AVAILABLE_COLORS,
  tool: 'pencil',
  color: AVAILABLE_COLORS[0],
  lineWidth: LINE_WIDTH_PROPERTIES.DEFAULT,
  canvasBackground: DEFAULT_CANVAS_BACKGROUND_COLOR,
};

export const DrawingProvider = ({ children }: IDrawingProvider) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>(
    INITAIAL_DRAWING_STATE
  );

  const setTool = (tool: Tool) => {
    setDrawingState((prev) => ({ ...prev, tool }));
  };
  const setColor = (color: string) =>
    setDrawingState((prev) => ({ ...prev, color }));

  const setLineWidth = (lineWidth: number) =>
    setDrawingState((prev) => ({ ...prev, lineWidth }));

  const setCanvasBackground = (canvasBackground: string) =>
    setDrawingState((prev) => ({ ...prev, canvasBackground }));

  const setIsDrawing = (isDrawing: boolean) => {
    setDrawingState((prev) => ({ ...prev, isDrawing }));
  };

  const setPaletteColors = (paletteColors: string[]) => {
    setDrawingState((prev) => ({ ...prev, paletteColors }));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = drawingState.canvasBackground;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const value = {
    canvasRef,
    ctxRef,
    drawingState,
    clearCanvas,
    setTool,
    setColor,
    setLineWidth,
    setCanvasBackground,
    setIsDrawing,
    setPaletteColors,
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};

export default DrawingProvider;
