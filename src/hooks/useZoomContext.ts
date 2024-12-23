import { useContext } from 'react';
import { ZoomContext } from '../contexts';

export default function useZoomContext() {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error('useZoomContext must be used within a ZoomProvider');
  }
  return context;
}
