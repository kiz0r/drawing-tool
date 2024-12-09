import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import {
  AVAILABLE_COLORS,
  DEFAULT_CANVAS_BACKGROUND_COLOR,
} from '../constants';

interface IDrawingContext {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  color: string;
  tool: Tool;
  lineWidth: number;
  canvasBackground: string;
  figure: Figure;
  paletteColors: string[];
  drawingHistory: ImageData[];
  redoStack: ImageData[];
  setColor: (color: string) => void;
  setTool: (tool: Tool) => void;
  setLineWidth: (lineWidth: number) => void;
  setCanvasBackground: (canvasBackground: string) => void;
  setFigure: (figure: Figure) => void;
  setPaletteColors: (paletteColors: string[]) => void;
  addDrawingState: (imageData: ImageData) => void;
  undo: () => void;
  redo: () => void;
  drawFigure: (
    figure: Figure,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => void;
}

interface IDrawingProvider {
  children: ReactNode;
}

export const DrawingContext = createContext<IDrawingContext | undefined>(
  undefined
);

export const DrawingProvider = ({ children }: IDrawingProvider) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<Tool>('pencil');
  const [figure, setFigure] = useState<Figure | null>(null);
  const [color, setColor] = useState(AVAILABLE_COLORS[0]);
  const [paletteColors, setPaletteColors] =
    useState<string[]>(AVAILABLE_COLORS);
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [canvasBackground, setCanvasBackground] = useState<string>(
    DEFAULT_CANVAS_BACKGROUND_COLOR
  );
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const addDrawingState = (imageData: ImageData) => {
    setDrawingHistory([...drawingHistory, imageData]);
    setRedoStack([]);
  };

  const drawFigure = (
    figure: Figure,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) return;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);

    switch (figure) {
      case 'rectangle':
        ctx.strokeRect(startX, startY, endX - startX, endY - startY);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'line':
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        break;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    addDrawingState(imageData);
  };

  const undo = () => {
    if (drawingHistory.length <= 0) return;

    const newHistory = [...drawingHistory];
    const lastState = newHistory.pop();

    if (lastState) {
      setRedoStack([lastState, ...redoStack]);
      setDrawingHistory(newHistory);
    }
  };

  const redo = () => {
    if (redoStack.length <= 0) return;

    const newRedoStack = [...redoStack];
    const nextState = newRedoStack.shift();

    if (nextState) {
      setDrawingHistory([...drawingHistory, nextState]);
      setRedoStack(newRedoStack);
    }
  };

  // TODO: Delete testing useEffects
  useEffect(() => {
    console.log('tool :>> ', tool);
    console.log('figure :>> ', figure);
  }, [tool, figure]);

  const value = {
    canvasRef,
    tool,
    color,
    lineWidth,
    canvasBackground,
    figure,
    paletteColors,
    drawingHistory,
    redoStack,
    setTool,
    setColor,
    setLineWidth,
    setCanvasBackground,
    setFigure,
    setPaletteColors,
    addDrawingState,
    drawFigure,
    undo,
    redo,
  };
  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
