import { canvasId } from '@/settings';

export function downloadCanvas(filename: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;

  if (canvas == null) {
    return;
  }

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
