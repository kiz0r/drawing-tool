import { ReactNode, useRef, useState } from 'react';
import {
  AVAILABLE_COLORS,
  DEFAULT_CANVAS_BACKGROUND_COLOR,
  LINE_WIDTH_PROPERTIES,
  MAX_HISTORY_LENGTH,
} from '../../constants';
import DrawingContext from './DrawingContext';

interface IDrawingProvider {
  children: ReactNode;
}
export const DrawingProvider = ({ children }: IDrawingProvider) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState(AVAILABLE_COLORS[0]);
  const [paletteColors, setPaletteColors] =
    useState<string[]>(AVAILABLE_COLORS);
  const [lineWidth, setLineWidth] = useState<number>(
    LINE_WIDTH_PROPERTIES.DEFAULT
  );
  const [canvasBackground, setCanvasBackground] = useState<string>(
    DEFAULT_CANVAS_BACKGROUND_COLOR
  );
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const addDrawingState = (imageData: ImageData) => {
    const newHistory = [...drawingHistory, imageData];
    if (newHistory.length > MAX_HISTORY_LENGTH) newHistory.shift();
    setDrawingHistory(newHistory);
    setRedoStack([]);
  };

  const undo = () => {
    if (drawingHistory.length > 0) {
      const newHistory = [...drawingHistory];
      const lastState = newHistory.pop();
      if (lastState) {
        setRedoStack([lastState, ...redoStack]);
      }
      setDrawingHistory(newHistory);

      if (canvasRef.current && lastState) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx)
          ctx.putImageData(newHistory[newHistory.length - 1] || null, 0, 0);
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setDrawingHistory([...drawingHistory, nextState]);

      if (canvasRef.current && nextState) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.putImageData(nextState, 0, 0);
      }
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = canvasBackground;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const value = {
    canvasRef,
    tool,
    color,
    lineWidth,
    canvasBackground,
    paletteColors,
    drawingHistory,
    redoStack,
    setTool,
    setColor,
    setLineWidth,
    setCanvasBackground,
    setPaletteColors,
    addDrawingState,
    undo,
    redo,
    clearCanvas,
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};

export default DrawingProvider;
