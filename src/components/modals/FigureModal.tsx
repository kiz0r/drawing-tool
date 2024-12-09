import { Circle, RectangleHorizontal, Slash } from 'lucide-react';
import useDrawingContext from '../../hooks/useDrawingContext';
import Modal from '../Modal';
import Button from '../Button';
import { APP_ICON_SIZE } from '../../constants';

const FigureModal = ({ isOpen, onClose }: ModalProps) => {
  const { setFigure, setTool, figure } = useDrawingContext();

  const handleFigure = (figure: Figure) => {
    setFigure(figure);
    setTool('figure');
  };

  const figures = [
    {
      tooltip: 'Rectangle',
      forTool: 'rectangle',
      element: <RectangleHorizontal size={APP_ICON_SIZE} />,
      action: () => handleFigure('rectangle'),
    },
    {
      tooltip: 'Circle',
      forTool: 'circle',
      element: <Circle size={APP_ICON_SIZE} />,
      action: () => handleFigure('circle'),
    },
    {
      tooltip: 'Line',
      forTool: 'line',
      element: <Slash size={APP_ICON_SIZE} />,
      action: () => handleFigure('line'),
    },
  ];

  return (
    <Modal modalName="figures-modal" onClose={onClose} isOpen={isOpen}>
      <h2 className="font-medium text-[16px]">Figure</h2>
      <div className="inner-widget">
        {figures.map(({ element, tooltip, action, forTool }, idx: number) => (
          <Button
            key={`${tooltip}-${idx}`}
            tooltip={tooltip}
            icon={element}
            onClick={action}
            isActive={forTool === figure}
          />
        ))}
      </div>
    </Modal>
  );
};

export default FigureModal;
