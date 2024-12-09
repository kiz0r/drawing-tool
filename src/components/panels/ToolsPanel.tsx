import {
  Circle,
  Eraser,
  PaintBucket,
  Pencil,
  RectangleHorizontal,
  Slash,
  X,
} from 'lucide-react';
import Button from '../Button';
import { useDrawingContext } from '../../hooks';
import { APP_ICON_SIZE, MAX_LINE_WIDTH, MIN_LINE_WIDTH } from '../../constants';
import { useState } from 'react';
import { ColorModal, CanvasBgModal, FigureModal } from '../modals';

type ToolsPanelModals = 'color' | 'figure' | 'canvas-background';

const getFigureIcon = (figure: Figure) => {
  switch (figure) {
    case 'rectangle':
      return <RectangleHorizontal size={APP_ICON_SIZE} />;
    case 'circle':
      return <Circle size={APP_ICON_SIZE} />;
    case 'line':
      return <Slash size={APP_ICON_SIZE} />;
    default:
      return <RectangleHorizontal size={APP_ICON_SIZE} />;
  }
};

const ToolsPanel = () => {
  const { setTool, color, tool, lineWidth, canvasBackground, figure } =
    useDrawingContext();

  const [currentModal, setCurrentModal] = useState<ToolsPanelModals | null>(
    null
  );

  const borderWidth =
    lineWidth > MIN_LINE_WIDTH && lineWidth < MAX_LINE_WIDTH / 2
      ? lineWidth / 2
      : lineWidth / 4;

  const handleModal = (modal: ToolsPanelModals) => {
    if (currentModal === modal) {
      setCurrentModal(null);
    } else {
      setCurrentModal(modal);
    }
  };

  const tools: DrawingTool[] = [
    {
      forTool: 'pencil',
      tooltip: 'Pencil',
      element: <Pencil size={APP_ICON_SIZE} />,
      action: () => setTool('pencil'),
    },
    {
      forTool: 'eraser',
      tooltip: 'Eraser',
      element: <Eraser size={APP_ICON_SIZE} />,
      action: () => setTool('eraser'),
    },
    {
      forTool: 'color',
      tooltip: 'Color',
      element: (
        <span
          className="rounded-full w-5 h-5 border-activeComponent"
          style={{ backgroundColor: color, borderWidth }}
        ></span>
      ),
      action: () => handleModal('color'),
    },
    {
      forTool: 'canvas-background',
      tooltip: 'Canvas Background',
      element: (
        <PaintBucket fill={`${canvasBackground}75`} size={APP_ICON_SIZE} />
      ),
      action: () => handleModal('canvas-background'),
    },
    {
      forTool: 'figure',
      tooltip: 'Figure',
      element: getFigureIcon(figure),
      action: () => handleModal('figure'),
    },

    {
      tooltip: 'Clear all',
      element: <X size={APP_ICON_SIZE} />,
      action: () => setTool('clear-all'),
    },
  ];

  const closeModal = () => setCurrentModal(null);

  return (
    <div className="absolute left-4 -translate-y-1/2 top-1/2 z-[1001]">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col gap-2 w-fit p-1.5 items-stretch rounded-md bg-secondaryComponent">
          {tools.map(
            (
              { tooltip, element, action, forTool }: DrawingTool,
              idx: number
            ) => {
              console.log('forTool :>> ', forTool);
              console.log('tool :>> ', tool);

              return (
                <Button
                  key={`${tooltip}-${idx}`}
                  onClick={action}
                  tooltip={tooltip}
                  type="button"
                  isActive={forTool === tool}
                >
                  {element}
                </Button>
              );
            }
          )}
        </div>

        <CanvasBgModal
          onClose={closeModal}
          isOpen={currentModal === 'canvas-background'}
        />
        <ColorModal isOpen={currentModal === 'color'} onClose={closeModal} />
        <FigureModal isOpen={currentModal === 'figure'} onClose={closeModal} />
      </div>
    </div>
  );
};
export default ToolsPanel;
