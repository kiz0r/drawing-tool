import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { ZOOM_PROPERTIES } from '../../constants';
import ZoomContext from './ZoomContext';

interface IZoomProvider {
  children: ReactNode;
}

const ZoomProvider = ({ children }: IZoomProvider) => {
  const [zoom, setZoom] = useState<number>(ZOOM_PROPERTIES.DEFAULT);

  const zoomIn = () => {
    setZoom((prevZoom) => {
      const newZoom =
        prevZoom < ZOOM_PROPERTIES.MAX ? prevZoom + 0.1 : prevZoom;
      return parseFloat(newZoom.toFixed(1));
    });
  };

  const zoomOut = () => {
    setZoom((prevZoom) => {
      const newZoom =
        prevZoom > ZOOM_PROPERTIES.MIN ? prevZoom - 0.1 : prevZoom;
      return parseFloat(newZoom.toFixed(1));
    });
  };

  const resetZoom = () => setZoom(ZOOM_PROPERTIES.DEFAULT);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();

      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  }, []);

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === '+' || e.key === '=') {
      if (e.ctrlKey || e.metaKey) {
        zoomIn();
      }
    }
    if (e.key === '-') {
      if (e.ctrlKey || e.metaKey) {
        zoomOut();
      }
    }
    if (e.key === '0') {
      if (e.ctrlKey || e.metaKey) {
        resetZoom();
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown, handleWheel]);

  const value = {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
  };
  return <ZoomContext.Provider value={value}>{children}</ZoomContext.Provider>;
};

export default ZoomProvider;
