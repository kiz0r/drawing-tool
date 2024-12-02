import { createContext, ReactNode, useState } from 'react';
import { AVAILABLE_COLORS } from '../constants';

type Figure = 'rectangle' | 'circle' | 'line';

interface IDrawingContext {
  color: string;
  tool: Tool;
  lineWidth: number;
  canvasBackground: string;
  figure: Figure;
  paletteColors: string[];
  setColor: (color: string) => void;
  setTool: (tool: Tool) => void;
  setLineWidth: (lineWidth: number) => void;
  setCanvasBackground: (canvasBackground: string) => void;
  setFigure: (figure: Figure) => void;
  setPaletteColors: (paletteColors: string[]) => void;
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
  const [canvasBackground, setCanvasBackground] = useState<string>('#ffffff');

  const value = {
    tool,
    color,
    lineWidth,
    canvasBackground,
    figure,
    paletteColors,
    setTool,
    setColor,
    setLineWidth,
    setCanvasBackground,
    setFigure,
    setPaletteColors,
  };
  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
