type Tool = 'pencil' | 'eraser' | 'color' | 'canvas-background';

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
