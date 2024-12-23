import { APP_ICON_SIZE } from '../../constants';
import { downloadCanvas } from '../../utils';
import Button from '../Button';
import { Download } from 'lucide-react';

const ActionsPanel = () => {
  return (
    <div className="widget absolute left-4 bottom-4 !flex-row gap-4">
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
