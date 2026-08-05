import { useEffect, useRef } from 'react';

export function GlobalMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const drawBackground = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mouseX = mousePos.current.x;
      const mouseY = mousePos.current.y;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Base gradient for a modern AI light theme (light blues to whites)
      const baseGradient = ctx.createLinearGradient(0, 0, 0, h);
      baseGradient.addColorStop(0, '#fdfdfd'); // Light cyan
      baseGradient.addColorStop(0.5, '#efdafa'); // Very light blue
      baseGradient.addColorStop(1, '#edcff8'); // White
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, w, h);

      // Subtle overlay for depth
      ctx.globalAlpha = 0.1;
      const overlayGradient = ctx.createLinearGradient(0, 0, w, 0);
      overlayGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      overlayGradient.addColorStop(1, 'rgba(255, 255, 255, 0.13)');
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      // Animated sound waves with interaction
      const waves = [
        { amp: 40, freq: 0.005, speed: 0.8, color: 'rgba(112, 0, 216, 0.5)', phaseOffset: 0 },
        { amp: 30, freq: 0.008, speed: 1.2, color: 'rgba(8, 0, 255, 0.3)', phaseOffset: 1.5 },
        { amp: 20, freq: 0.012, speed: 1.6, color: 'rgba(173, 216, 230, 0.2)', phaseOffset: 3 },
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, h / 2);

        for (let x = 0; x < w; x += 2) { // Step by 2 for performance
          const baseY = wave.amp * Math.sin(x * wave.freq + time * wave.speed + wave.phaseOffset);

          // Interactive distortion: Gaussian bump near mouse, pulsing like a voice wave
          const distToMouse = x - mouseX;
          const gaussian = Math.exp(-(distToMouse ** 2) / (w * 0.2) ** 2); // Wider spread
          const interactiveAmp = 60 * gaussian * Math.sin(time * 3 + x * 0.01); // Pulsing effect

          const y = h / 2 + baseY + interactiveAmp;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      time += 0.02; // Smooth animation speed

      animationFrameId = requestAnimationFrame(drawBackground);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    drawBackground();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}