import { APP_ICON_SIZE } from '../../constants';
import { useDrawingContext } from '../../hooks';
import { downloadCanvas } from '../../utils';
import Button from '../Button';
import { Undo, Redo, Download } from 'lucide-react';

const ActionsPanel = () => {
  const { undo, redo } = useDrawingContext();

  return (
    <div className="widget absolute left-4 bottom-4 !flex-row gap-4">
      <Button tooltip="Undo Action" onClick={undo}>
        <Undo size={APP_ICON_SIZE} />
      </Button>
      <Button tooltip="Redo Action" onClick={redo}>
        <Redo size={APP_ICON_SIZE} />
      </Button>
      <Button
        tooltip="Download Drawing"
        onClick={() => downloadCanvas('drawing.png')}
      >
        <Download size={APP_ICON_SIZE} />
      </Button>
    </div>
  );
};

export default ActionsPanel;
