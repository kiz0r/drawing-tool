import { Minus, Plus, RotateCcw } from 'lucide-react';
import Button from '../Button';
import { useZoomContext } from '../../hooks';
import { APP_ICON_SIZE, MAX_ZOOM, MIN_ZOOM } from '../../constants';

const ZoomPanel = () => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoomContext();

  const zoomInPercent = (zoom * 100).toFixed(0);

  return (
    <div className="widget absolute right-4 bottom-4 min-w-[225px]">
      <div className="inner-widget flex-col gap-2">
        <h2 className="font-medium text-[18px]">Zoom</h2>
        <div className="w-full flex justify-between items-center">
          <Button
            tooltip="Zoom Out"
            onClick={zoomOut}
            disabled={zoom === MIN_ZOOM}
          >
            <Minus size={APP_ICON_SIZE} />
          </Button>
          <span>{zoomInPercent}%</span>

          <Button
            tooltip="Zoom In"
            onClick={zoomIn}
            disabled={zoom === MAX_ZOOM}
          >
            <Plus size={APP_ICON_SIZE} />
          </Button>

          <Button tooltip="Reset Zoom" onClick={resetZoom}>
            <RotateCcw size={APP_ICON_SIZE} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ZoomPanel;
