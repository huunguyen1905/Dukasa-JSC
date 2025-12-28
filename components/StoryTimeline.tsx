
import React, { useEffect, useRef, useState } from 'react';

const milestones = [
  { year: '2018', title: 'Khởi Nguyên', description: 'Thành lập tại Sài Gòn với 5 thành viên cốt cán, tập trung vào SEO & Content Marketing.' },
  { year: '2020', title: 'Mở Rộng', description: 'Đạt mốc 100 khách hàng SME. Mở rộng dịch vụ sang Performance Marketing & Branding.' },
  { year: '2022', title: 'Vươn Tầm', description: 'Trở thành Google Premium Partner. Đội ngũ nhân sự cán mốc 50 chuyên gia.' },
  { year: '2024', title: 'Hệ Sinh Thái', description: 'Ra mắt DUHAVA Group với hệ sinh thái công nghệ & marketing khép kín. Mở rộng sang thị trường SEA.' }
];

const StoryTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !innerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // MANUAL STICKY IMPLEMENTATION
      // Fixes compatibility issues with SmoothScroll transform
      const maxOffset = height - viewportHeight;
      const scrollY = Math.max(0, Math.min(-top, maxOffset));
      
      // Use translate3d for hardware acceleration
      innerRef.current.style.transform = `translate3d(0, ${scrollY}px, 0)`;

      // Progress calculation
      if (maxOffset <= 0) return;
      const progress = scrollY / maxOffset;
      
      // Calculate active index based on scroll progress
      const idx = Math.floor(progress * (milestones.length + 0.5)); 
      setActiveIdx(Math.min(milestones.length - 1, Math.max(0, idx)));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-brand-black relative h-[250vh] border-t border-gray-900">
        <div ref={innerRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden w-full will-change-transform">
            {/* Background Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-yellow/30 to-transparent -translate-x-1/2 z-0"></div>
            
            {/* Ambient Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 w-full max-w-4xl">
                <div className="relative h-[400px] flex justify-center items-center perspective-1000">
                    {milestones.map((item, index) => {
                        const isActive = index === activeIdx;
                        let transformClass = 'translate-y-[150px] opacity-0 scale-90 blur-sm pointer-events-none'; // Future state
                        
                        if (isActive) {
                            transformClass = 'translate-y-0 opacity-100 scale-100 blur-0 z-10'; // Active state
                        } else if (index < activeIdx) {
                            transformClass = '-translate-y-[150px] opacity-0 scale-90 blur-sm pointer-events-none'; // Past state
                        }

                        return (
                            <div 
                                key={index}
                                className={`absolute transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) w-full flex justify-center ${transformClass}`}
                            >
                                <div className="bg-gray-900/80 border border-gray-800 backdrop-blur-xl p-8 md:p-14 rounded-3xl text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group w-full max-w-2xl">
                                    {/* Top decorative line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-brand-yellow to-gray-800"></div>
                                    
                                    {/* Giant Year Watermark */}
                                    <span className="text-[120px] md:text-[200px] font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none tracking-tighter leading-none z-0">
                                        {item.year}
                                    </span>
                                    
                                    <div className="relative z-10">
                                        <div className="inline-block px-4 py-1 rounded-full border border-brand-yellow/30 text-brand-yellow font-bold uppercase tracking-widest text-xs mb-6 bg-brand-yellow/5">
                                            Milestone {item.year}
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-6 leading-tight drop-shadow-xl">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light max-w-lg mx-auto">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
                <span className="text-[10px] text-brand-yellow font-bold uppercase tracking-[0.2em] animate-pulse">Scroll Journey</span>
                <div className="w-px h-12 bg-gradient-to-b from-brand-yellow to-transparent"></div>
            </div>
        </div>
    </section>
  );
};

export default StoryTimeline;
