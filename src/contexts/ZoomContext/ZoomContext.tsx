import { createContext } from 'react';

interface IZoomContext {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const ZoomContext = createContext<IZoomContext | undefined>(undefined);

export default ZoomContext;
