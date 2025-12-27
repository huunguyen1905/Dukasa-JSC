import React, { useEffect, useRef } from 'react';

const WorldClassBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas size
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Configuration
    const orbs = [
      { x: Math.random() * width, y: Math.random() * height, radius: 300, color: 'rgba(250, 204, 21, 0.08)', vx: 0.2, vy: 0.1 },
      { x: Math.random() * width, y: Math.random() * height, radius: 400, color: 'rgba(234, 179, 8, 0.06)', vx: -0.1, vy: 0.2 },
      { x: Math.random() * width, y: Math.random() * height, radius: 250, color: 'rgba(250, 204, 21, 0.05)', vx: -0.2, vy: -0.1 },
      { x: Math.random() * width, y: Math.random() * height, radius: 350, color: 'rgba(161, 98, 7, 0.05)', vx: 0.1, vy: -0.2 },
    ];

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Fill background very dark gray (almost black)
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Draw Orbs (The Nebula Effect)
      orbs.forEach(orb => {
        // Move orbs
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges with buffer
        if (orb.x < -100 || orb.x > width + 100) orb.vx *= -1;
        if (orb.y < -100 || orb.y > height + 100) orb.vy *= -1;

        // Draw Glow
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* 1. Canvas Layer: The Moving Nebula */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 2. Grid Layer: Tech Feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
            backgroundImage: `linear-gradient(#FACC15 1px, transparent 1px), linear-gradient(90deg, #FACC15 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
        }}
      ></div>

      {/* 3. Vignette Layer: Focus Center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80"></div>
    </div>
  );
};

export default WorldClassBackground;