import { Eraser, PaintBucket, Pencil, X } from 'lucide-react';
import Button from '../Button';
import { useDrawingContext } from '../../hooks';
import { APP_ICON_SIZE } from '../../constants';
import { useState } from 'react';
import { ColorModal, CanvasBgModal } from '../modals';
import { getBorderWidth } from '../../utils';

type ToolsPanelModals = 'color' | 'figure' | 'canvas-background';

const ToolsPanel = () => {
  const { setTool, color, tool, lineWidth, canvasBackground, clearCanvas } =
    useDrawingContext();

  const [currentModal, setCurrentModal] = useState<ToolsPanelModals | null>(
    null
  );

  const borderWidth = getBorderWidth(lineWidth);

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
          className="w-5 h-5 rounded-full border-activeComponent"
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
    // {
    //   forTool: 'figure',
    //   tooltip: 'Figure',
    //   element: getFigureIcon(figure),
    //   action: () => handleModal('figure'),
    // },

    {
      tooltip: 'Clear all',
      element: <X size={APP_ICON_SIZE} />,
      action: () => clearCanvas(),
    },
  ];

  const closeModal = () => setCurrentModal(null);

  return (
    <div className="absolute left-4 -translate-y-1/2 top-1/2 z-[1001]">
      <div className="flex items-center gap-3">
        <div className="widget">
          {tools.map(
            (
              { tooltip, element, action, forTool }: DrawingTool,
              idx: number
            ) => (
              <Button
                key={`${tooltip}-${idx}`}
                onClick={action}
                tooltip={tooltip}
                type="button"
                isActive={forTool === tool}
              >
                {element}
              </Button>
            )
          )}
        </div>

        <CanvasBgModal
          onClose={closeModal}
          isOpen={currentModal === 'canvas-background'}
        />
        <ColorModal isOpen={currentModal === 'color'} onClose={closeModal} />
      </div>
    </div>
  );
};
export default ToolsPanel;
