import type { HexColor } from './shared/types/HexColor';

export const PALETTE_COLORS: readonly HexColor[] = [
  '#B80000',
  '#DB3E00',
  '#FCCB00',
  '#008B02',
  '#006B76',
  '#1273DE',
  '#004DCF',
  '#5300EB',
  '#EB9694',
  '#FAD0C3',
  '#FEF3BD',
  '#C1E1C5',
  '#BEDADC',
  '#C4DEF6',
  '#BED3F3',
  '#D4C4FB',
];

export const DEFAULT_CANVAS_BACKGROUND_COLOR = '#ffffff';

export const LINE_WIDTH_PROPERTIES = {
  SMALL: 3,
  MEDIUM: 5,
  LARGE: 7,
} as const;

export const APP_ICON_SIZE = 20;

export const canvasId = 'canvas';
export const backgroundCanvasId = `${canvasId}-background`;
