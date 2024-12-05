import { createContext, ReactNode, useState } from 'react';
import {
  AVAILABLE_COLORS,
  DEFAULT_CANVAS_BACKGROUND_COLOR,
} from '../constants';

type Figure = 'rectangle' | 'circle' | 'line';

interface IDrawingContext {
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
}

interface IDrawingProvider {
  children: ReactNode;
}

export const DrawingContext = createContext<IDrawingContext | undefined>(
  undefined
);

export const DrawingProvider = ({ children }: IDrawingProvider) => {
  const [tool, setTool] = useState<Tool>('pencil');
  const [figure, setFigure] = useState<Figure>('rectangle');
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

  const value = {
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
    undo,
    redo,
  };
  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
