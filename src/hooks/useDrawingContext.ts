import { useContext } from 'react';
import { DrawingContext } from '../contexts';

export default function useDrawingContext() {
  const context = useContext(DrawingContext);
  if (!context) {
    throw new Error('useDrawingContext must be used within a DrawingProvider');
  }
  return context;
}
