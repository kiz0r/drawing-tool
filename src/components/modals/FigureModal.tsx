import { Circle, RectangleHorizontal, Slash } from 'lucide-react';
import useDrawingContext from '../../hooks/useDrawingContext';
import Modal from '../Modal';
import Button from '../Button';

const FigureModal = () => {
  const { setFigure } = useDrawingContext();

  const figures = [
    {
      tooltip: 'Rectangle',
      forTool: 'rectangle',
      element: <RectangleHorizontal size={28} />,
      action: () => setFigure('rectangle'),
    },
    {
      tooltip: 'Circle',
      forTool: 'rectangle',
      element: <Circle size={28} />,
      action: () => setFigure('circle'),
    },
    {
      tooltip: 'Line',
      forTool: 'line',
      element: <Slash size={28} />,
      action: () => setFigure('line'),
    },
  ];

  return (
    <Modal>
      <h2 className="font-medium text-[16px]">Figure</h2>
      <div className="inner-widget">
        {figures.map(({ element, tooltip }, idx: number) => (
          <Button key={`${tooltip}-${idx}`} tooltip="" icon={element} />
        ))}
      </div>
    </Modal>
  );
};

export default FigureModal;
