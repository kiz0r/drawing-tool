type Tool =
  | 'pencil'
  | 'eraser'
  | 'clear-all'
  | 'hand'
  | 'color'
  | 'figure'
  | 'canvas-background';

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
