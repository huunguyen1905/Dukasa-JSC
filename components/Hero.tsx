
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particleCount = width < 768 ? 400 : 1000; 
    const connectionDistance = 100;
    const mouseDistance = 200;
    
    const noise = (x: number, y: number, t: number) => {
        return Math.sin(x * 0.002 + t) * Math.cos(y * 0.002 + t);
    };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      baseX: number; baseY: number; density: number; color: string; alpha: number;

      constructor() {
        this.x = Math.random() * width; this.y = Math.random() * height;
        this.baseX = this.x; this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 1; this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 0.5; this.density = (Math.random() * 30) + 1;
        const colors = ['#FACC15', '#FDE047', '#EAB308', '#FFFFFF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update(mouse: { x: number, y: number }, time: number) {
        const angle = noise(this.x, this.y, time * 0.0005) * Math.PI * 4;
        const force = 0.2;
        this.vx += Math.cos(angle) * force * 0.1;
        this.vy += Math.sin(angle) * force * 0.1;

        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouseDistance;
        let forceMouse = (maxDistance - distance) / maxDistance;
        
        if (distance < maxDistance) {
          this.vx -= (dx / distance) * forceMouse * this.density * 0.8;
          this.vy -= (dy / distance) * forceMouse * this.density * 0.8;
        }
        this.vx *= 0.96; this.vy *= 0.96;
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
      }
      draw(context: CanvasRenderingContext2D) {
        context.beginPath(); context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color; context.globalAlpha = this.alpha;
        context.fill(); context.globalAlpha = 1;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }

    const mouse = { x: -1000, y: -1000 };
    let time = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    };
    const handleTouchMove = (e: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        if(e.touches.length > 0) {
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        }
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, width, height); // Clear to let background show through
      // Removed the fillStyle background to make it transparent for the new nebula background
      
      particles.forEach(p => { p.update(mouse, time); p.draw(ctx); });
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.15)'; ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const dxMouse = mouse.x - p1.x; const dyMouse = mouse.y - p1.y;
        if (Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse) > 300) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x; const dy = p1.y - p2.y;
          const dist = dx * dx + dy * dy;
          if (dist < connectionDistance * connectionDistance) {
             ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="hero" className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Canvas for Particles (Foreground Interaction) */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-60 pointer-events-none" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/20 to-brand-black z-10 pointer-events-none"></div>

      <div className="relative z-20 text-center px-4 max-w-7xl mx-auto pt-24 pb-12 flex flex-col justify-center h-full">
        
        <div className="inline-block mb-6 md:mb-10 animate-in fade-in slide-in-from-top-8 duration-1000">
            <span className="py-2 px-6 md:py-3 md:px-8 rounded-full border border-brand-yellow/30 bg-white/5 text-brand-yellow font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase backdrop-blur-md shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                Đối Tác Chiến Lược Cấp Cao
            </span>
        </div>
        
        {/* Adjusted Typography with Glow */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white uppercase leading-tight md:leading-normal tracking-tight mb-8 md:mb-16 drop-shadow-2xl animate-in zoom-in-90 duration-1000">
          Định Hình <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-8 bg-brand-yellow/10 blur-3xl rounded-full"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-white to-brand-yellow pb-2 animate-pulse-slow drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              Tương Lai Số
            </span>
          </span>
        </h1>
        
        <p className="text-gray-300 text-sm md:text-2xl max-w-3xl mx-auto mb-10 md:mb-14 font-light leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-200 px-4">
          DUHAVA biến dữ liệu thành lợi nhuận. Chúng tôi kiến tạo những trải nghiệm kỹ thuật số 
          <span className="text-white font-semibold border-b border-brand-yellow mx-1">độc bản</span>, giúp thương hiệu của bạn thống trị thị trường.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center animate-in slide-in-from-bottom-8 duration-1000 delay-300 pb-4 w-full max-w-sm md:max-w-none mx-auto">
          {/* Magnetic Primary Button */}
          <MagneticButton>
            <button 
                onClick={onCtaClick}
                className="w-full md:w-auto group relative bg-brand-yellow text-brand-black text-sm md:text-xl font-black py-3 px-6 md:py-5 md:px-12 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(250,204,21,0.6)] whitespace-nowrap"
            >
                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                <span className="relative flex items-center justify-center gap-2">
                    NHẬN TƯ VẤN <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
          </MagneticButton>
          
          {/* Magnetic Secondary Button */}
          <MagneticButton>
            <button 
                onClick={() => {
                const el = document.getElementById('services');
                if (el) {
                    window.scrollTo({
                        top: el.offsetTop,
                        behavior: 'smooth'
                    });
                }
                }}
                className="w-full md:w-auto group text-white text-sm md:text-xl font-bold py-3 px-6 md:py-5 md:px-10 rounded-full border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-md whitespace-nowrap"
            >
                Khám Phá Dịch Vụ
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
