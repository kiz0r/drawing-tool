import { createContext } from 'react';

interface IDrawingContext {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  color: string;
  tool: Tool;
  lineWidth: number;
  canvasBackground: string;
  paletteColors: string[];
  drawingHistory: ImageData[];
  redoStack: ImageData[];
  setColor: (color: string) => void;
  setTool: (tool: Tool) => void;
  setLineWidth: (lineWidth: number) => void;
  setCanvasBackground: (canvasBackground: string) => void;
  setPaletteColors: (paletteColors: string[]) => void;
  addDrawingState: (imageData: ImageData) => void;
  undo: () => void;
  redo: () => void;
  clearCanvas: () => void;
}

const DrawingContext = createContext<IDrawingContext | undefined>(undefined);

export default DrawingContext;
