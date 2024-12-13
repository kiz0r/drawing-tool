import { LINE_WIDTH_PROPERTIES } from '../constants';

export function downloadCanvas(filename: string) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export function getBorderWidth(lineWidth: number): number {
  if (lineWidth < LINE_WIDTH_PROPERTIES.MIN) {
    return LINE_WIDTH_PROPERTIES.MIN * 0.25;
  } else if (lineWidth > LINE_WIDTH_PROPERTIES.MAX) {
    return LINE_WIDTH_PROPERTIES.MAX * 0.25;
  } else {
    return lineWidth * 0.25;
  }
}
