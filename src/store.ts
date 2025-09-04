import { atom, createStore } from 'jotai';
import { DEFAULT_CANVAS_BACKGROUND_COLOR, LINE_WIDTH_PROPERTIES, PALETTE_COLORS } from './settings';
import type { DrawingState } from './shared/types/DrawingState';

/**
 * Store for `Jotai` state management.
 */
export const store = createStore();

export const drawingStateAtom = atom<DrawingState>({
  isDrawing: false,
  paletteColors: PALETTE_COLORS,
  tool: 'pencil',
  color: '#000000',
  lineWidth: LINE_WIDTH_PROPERTIES.SMALL,
  canvasBackground: DEFAULT_CANVAS_BACKGROUND_COLOR,
});

/**
 * Utility atom for updating the drawing state.
 *
 * @example
 * ```ts
 * const MyComponent = React.memo(() => {
 *  const updateDrawingState = useSetAtom(updateDrawingStateAtom);
 *
 *  updateDrawingState({
 *    tool: Tool.Eraser,
 *    color: '#FFFFFF',
 *  });
 *
 *  return <div>My Component</div>;
 * });
 * ```
 */
export const updateDrawingStateAtom = atom(null, (get, set, nextState: Partial<DrawingState>) => {
  const prevState = get(drawingStateAtom);

  set(drawingStateAtom, {
    ...prevState,
    ...nextState,
  });
});
