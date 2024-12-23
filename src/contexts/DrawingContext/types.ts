import type { ReactNode } from 'react';

export interface IDrawingProvider {
  children: ReactNode;
}

export type DrawingState = {
  isDrawing: boolean;
  paletteColors: string[];
  tool: Tool;
  color: string;
  lineWidth: number;
  canvasBackground: string;
};

export interface IDrawingContext {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  drawingState: DrawingState;
  clearCanvas: () => void;
  setTool: (tool: Tool) => void;
  setColor: (color: string) => void;
  setLineWidth: (lineWidth: number) => void;
  setCanvasBackground: (canvasBackground: string) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setPaletteColors: (paletteColors: string[]) => void;
}
