import { createContext } from 'react';
import type { IDrawingContext } from './types';

const DrawingContext = createContext<IDrawingContext | undefined>(undefined);

export default DrawingContext;
