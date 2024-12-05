import { createContext, ReactNode, useState } from 'react';
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM } from '../constants';

interface IZoomContext {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

interface IZoomProvider {
  children: ReactNode;
}

export const ZoomContext = createContext<IZoomContext | undefined>(undefined);

export const ZoomProvider = ({ children }: IZoomProvider) => {
  const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);

  const zoomIn = () => {
    setZoom((prevZoom) => {
      const newZoom = prevZoom < MAX_ZOOM ? prevZoom + 0.1 : prevZoom;
      return parseFloat(newZoom.toFixed(1));
    });
  };

  const zoomOut = () => {
    setZoom((prevZoom) => {
      const newZoom = prevZoom > MIN_ZOOM ? prevZoom - 0.1 : prevZoom;
      return parseFloat(newZoom.toFixed(1));
    });
  };

  const resetZoom = () => setZoom(DEFAULT_ZOOM);

  const value = {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
  };
  return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>;
};
