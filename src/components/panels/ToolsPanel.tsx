import { Eraser, PaintBucket, Pencil, X } from 'lucide-react';
import Button from '../Button';
import useDrawingContext from '../../hooks/useDrawingContext';
import { MAX_LINE_WIDTH, MIN_LINE_WIDTH } from '../../constants';
import { useEffect, useState } from 'react';
import { ColorModal, CanvasBgModal } from '../modals';

type ToolsPanelModals = 'color' | 'figure' | 'canvas-background';

const ToolsPanel = () => {
  const { setTool, color, tool, lineWidth, canvasBackground } =
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
      element: <Pencil size={28} />,
      action: () => setTool('pencil'),
    },
    {
      forTool: 'eraser',
      tooltip: 'Eraser',
      element: <Eraser size={28} />,
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
      element: <PaintBucket fill={`${canvasBackground}75`} size={28} />,
      action: () => handleModal('canvas-background'),
    },

    {
      tooltip: 'Clear all',
      element: <X size={36} />,
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
            ) => (
              <Button
                onClick={action}
                key={`${tooltip}-${idx}`}
                icon={element}
                tooltip={tooltip}
                type="button"
                isActive={forTool === tool}
              />
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
