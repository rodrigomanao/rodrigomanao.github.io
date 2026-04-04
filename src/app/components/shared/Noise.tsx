import React, { useRef, useEffect } from 'react';

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

const Noise: React.FC<NoiseProps> = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 8,
  patternAlpha = 15
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Use a smaller internal resolution for better performance,
    // the canvas is scaled up via CSS.
    const canvasSize = 512;
    let frame = 0;
    let animationId = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      'matchMedia' in window &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSafari =
      typeof navigator !== 'undefined' &&
      /Safari/.test(navigator.userAgent) &&
      !/Chrome|Chromium|Android/.test(navigator.userAgent);

    const refreshEvery = isSafari ? patternRefreshInterval * 2 : patternRefreshInterval;

    window.addEventListener('resize', resize);
    resize();

    // For users who prefer reduced motion, render a single static grain frame
    // instead of an animated noise texture.
    if (prefersReducedMotion || isSafari) {
      drawGrain();
      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    const loop = () => {
      if (frame % refreshEvery === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="pointer-events-none absolute top-0 left-0 w-full h-full"
      ref={grainRef}
      style={{
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default Noise;
