import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { drawingStateAtom, updateDrawingStateAtom } from '@/store';

/**
 * Atom to store the reference of the drawing canvas element.
 * @internal
 */
const canvasAtom = atom<HTMLCanvasElement | null>(null);
/**
 * Atom to store the context of the canvas element.
 * @internal
 */
const ctxAtom = atom<CanvasRenderingContext2D | null>(null);
/**
 * Atom to store the reference of the background canvas element.
 * @internal
 */
const backgroundCanvasAtom = atom<HTMLCanvasElement | null>(null);

/**
 * Hook to manage canvas drawing state and interactions.
 * Provides methods to `start`, `draw`, `stop` and `download` drawing,
 * as well as to `reset` canvas properties and `resize` the canvas.
 */
export const useCanvas = () => {
  const drawingState = useAtomValue(drawingStateAtom);
  const updateDrawingState = useSetAtom(updateDrawingStateAtom);

  const [backgroundCanvas, setBackgroundCanvas] = useAtom(backgroundCanvasAtom);
  const [drawingCanvas, setDrawingCanvas] = useAtom(canvasAtom);
  const [ctx, setCtx] = useAtom(ctxAtom);

  const createBackgroundCanvasRef = React.useCallback(
    (element: HTMLCanvasElement | null) => {
      if (element == null) {
        return;
      }

      setBackgroundCanvas(element);
    },
    [setBackgroundCanvas]
  );

  const createDrawingCanvasRef = React.useCallback(
    (element: HTMLCanvasElement | null) => {
      if (element) {
        setDrawingCanvas(element);
        setCtx(element.getContext('2d', { willReadFrequently: true }));
      }
    },
    [setDrawingCanvas, setCtx]
  );

  const resetCanvasProperties = React.useCallback(() => {
    if (ctx == null) {
      return;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = drawingState.lineWidth;
    ctx.strokeStyle =
      drawingState.tool === 'eraser' ? drawingState.canvasBackground : drawingState.color;
  }, [drawingState, ctx]);

  // const resizeCanvas = React.useCallback(() => {
  //   const clientRect = window.document.body.getBoundingClientRect();

  //   if (backgroundCanvas != null) {
  //     backgroundCanvas.width = clientRect.width;
  //     backgroundCanvas.height = clientRect.height;
  //     const bgCtx = backgroundCanvas.getContext('2d');
  //     if (bgCtx) {
  //       bgCtx.fillStyle = drawingState.canvasBackground;
  //       bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  //     }
  //   }

  //   if (drawingCanvas != null) {
  //     drawingCanvas.width = clientRect.width;
  //     drawingCanvas.height = clientRect.height;
  //   }
  // }, [backgroundCanvas, drawingCanvas, drawingState.canvasBackground]);

  const resizeCanvas = React.useCallback(() => {
    const rect = window.document.body.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    if (backgroundCanvas) {
      backgroundCanvas.width = rect.width * dpr;
      backgroundCanvas.height = rect.height * dpr;
      backgroundCanvas.style.width = `${rect.width}px`;
      backgroundCanvas.style.height = `${rect.height}px`;

      const bgCtx = backgroundCanvas.getContext('2d');
      if (bgCtx) {
        bgCtx.setTransform(1, 0, 0, 1, 0, 0); // сброс
        bgCtx.scale(dpr, dpr);
        bgCtx.fillStyle = drawingState.canvasBackground;
        bgCtx.fillRect(0, 0, rect.width, rect.height);
      }
    }

    if (drawingCanvas) {
      drawingCanvas.width = rect.width * dpr;
      drawingCanvas.height = rect.height * dpr;
      drawingCanvas.style.width = `${rect.width}px`;
      drawingCanvas.style.height = `${rect.height}px`;

      const ctx = drawingCanvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    }
  }, [backgroundCanvas, drawingCanvas, drawingState.canvasBackground]);

  const getCanvasCoordinates = React.useCallback(
    (event: React.MouseEvent) => {
      if (drawingCanvas == null) {
        return [0, 0] as const;
      }

      const rect = drawingCanvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return [x, y] as const;
    },
    [drawingCanvas]
  );

  React.useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  React.useEffect(() => {
    if (backgroundCanvas == null) {
      return;
    }

    const bgCtx = backgroundCanvas.getContext('2d');

    if (bgCtx == null) {
      return;
    }

    bgCtx.fillStyle = drawingState.canvasBackground;
    bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  }, [drawingState.canvasBackground, backgroundCanvas]);

  const startDrawing = React.useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const [x, y] = getCanvasCoordinates(event);
      updateDrawingState({ isDrawing: true });

      if (ctx == null) {
        return;
      }

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = drawingState.lineWidth;
      ctx.strokeStyle =
        drawingState.tool === 'eraser' ? drawingState.canvasBackground : drawingState.color;
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [ctx, drawingState, getCanvasCoordinates, updateDrawingState]
  );

  const draw = React.useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!drawingState.isDrawing || ctx == null) {
        return;
      }

      const [x, y] = getCanvasCoordinates(event);

      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [drawingState, ctx, getCanvasCoordinates]
  );

  const stopDrawing = React.useCallback(() => {
    updateDrawingState({ isDrawing: false });
  }, [updateDrawingState]);

  const clearCanvas = React.useCallback(() => {
    if (ctx && drawingCanvas) {
      ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }
  }, [ctx, drawingCanvas]);

  const download = React.useCallback(
    (imageName: string) => {
      if (backgroundCanvas == null || drawingCanvas == null) {
        return;
      }

      const merged = document.createElement('canvas');
      merged.width = backgroundCanvas.width;
      merged.height = backgroundCanvas.height;
      const ctx = merged.getContext('2d');

      if (ctx == null) {
        return;
      }

      ctx.drawImage(backgroundCanvas, 0, 0);
      ctx.drawImage(drawingCanvas, 0, 0);

      const link = document.createElement('a');
      link.href = merged.toDataURL('image/png');
      link.download = `${imageName}.png`;
      link.click();
    },
    [backgroundCanvas, drawingCanvas]
  );

  return {
    /**
     * Reference of the target drawing canvas element.
     */
    createDrawingCanvasRef,
    /**
     * Reference of the target background canvas element.
     */
    createBackgroundCanvasRef,
    /**
     * Utility to start drawing on the canvas.
     */
    startDrawing,
    /**
     * Utility to draw on the canvas.
     */
    draw,
    /**
     * Utility to stop drawing on the canvas.
     */
    stopDrawing,
    /**
     * Utility to clear the canvas.
     */
    clearCanvas,
    /**
     * Utility to reset the canvas properties.
     */
    resetCanvasProperties,
    /**
     * Utility to resize the canvas.
     */
    resizeCanvas,
    /**
     * Utility to download the canvas as an image.
     *
     *
     * @example
     * ```tsx
     * // MyComponent.tsx
     * const MyComponent = React.memo(() => {
     *  const canvas = useCanvas();
     *
     *  return <button onClick={() => canvas.download('my-drawing')}>Download</button>;
     * });
     * ```
     */
    download,
  } as const;
};
