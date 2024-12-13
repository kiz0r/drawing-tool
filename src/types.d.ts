type Tool = 'pencil' | 'eraser' | 'color' | 'figure' | 'canvas-background';

type DrawingTool = {
  tooltip: string;
  forTool?: Tool;
  element: React.ReactNode;
  action: () => void;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CanvasOffset = {
  x: number;
  y: number;
};

type Figure = 'rectangle' | 'circle' | 'line';
