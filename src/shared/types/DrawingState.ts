import type { HexColor } from './HexColor';
import type { Tool } from './Tool';

export type DrawingState = {
  readonly isDrawing: boolean;
  readonly paletteColors: readonly HexColor[];
  readonly tool: Tool;
  readonly color: HexColor;
  readonly lineWidth: number;
  readonly canvasBackground: HexColor;
};
