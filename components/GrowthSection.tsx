
import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, ArrowUpRight, Activity, Zap, Cpu, Layers, BarChart3, Globe } from 'lucide-react';
import FadeIn from './FadeIn';

const GrowthSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [revenue, setRevenue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Constants
  const TARGET_REVENUE = 2450290;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          
          if (!hasAnimated.current) {
            hasAnimated.current = true;
            // Revenue Count Up Animation
            let startTime: number | null = null;
            const duration = 2500;
            
            const animateRevenue = (time: number) => {
                if (!startTime) startTime = time;
                const progress = Math.min((time - startTime) / duration, 1);
                // Ease Out Expo for dramatic effect
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                setRevenue(Math.floor(TARGET_REVENUE * ease));

                if (progress < 1) {
                    requestAnimationFrame(animateRevenue);
                } else {
                    // Start drift after main animation
                     setInterval(() => {
                        setRevenue(prev => prev + Math.floor(Math.random() * 50));
                    }, 2000);
                }
            };
            requestAnimationFrame(animateRevenue);
          }
        }
      },
      { threshold: 0.3 }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
        observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-brand-black py-32 relative overflow-hidden" ref={containerRef}>
      {/* 1. Ambient Background Effects */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* LEFT: Content Narrative */}
            <div className="lg:col-span-5">
                <FadeIn>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-6">
                        <Cpu size={12} className="animate-spin-slow" />
                        <span>AI-Driven Growth Engine</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9] mb-8 tracking-tighter">
                        Tăng Trưởng <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-white to-brand-yellow animate-gradient-x">
                            Phi Tuyến Tính
                        </span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light border-l border-gray-800 pl-6">
                        Trong khi thị trường tăng trưởng theo cấp số cộng, DUHAVA giúp bạn kích hoạt <strong className="text-white">"Điểm Bùng Phát" (Tipping Point)</strong> bằng hệ thống ma trận dữ liệu độc quyền. Chúng tôi không chỉ chạy quảng cáo, chúng tôi hack tăng trưởng.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900/40 border border-gray-800 p-5 rounded-2xl flex flex-col gap-3 group hover:border-brand-yellow/30 transition-all duration-300">
                            <Activity className="text-gray-500 group-hover:text-brand-yellow transition-colors" size={24} />
                            <div>
                                <div className="text-2xl font-black text-white tabular-nums">99.9%</div>
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">Uptime System</div>
                            </div>
                        </div>
                        <div className="bg-gray-900/40 border border-gray-800 p-5 rounded-2xl flex flex-col gap-3 group hover:border-brand-yellow/30 transition-all duration-300">
                            <Zap className="text-gray-500 group-hover:text-brand-yellow transition-colors" size={24} />
                            <div>
                                <div className="text-2xl font-black text-white tabular-nums">~2ms</div>
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">Latency Speed</div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* RIGHT: The "Holographic" Chart */}
            <div className="lg:col-span-7 relative perspective-1000">
                <FadeIn direction="left" delay={200}>
                    {/* Glass Container */}
                    <div className="relative w-full aspect-[16/10] bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-x-2 hover:scale-[1.01] group">
                        
                        {/* Inner Lighting */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

                        {/* Chart Area */}
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col">
                            
                            {/* Header Widget */}
                            <div className="flex justify-between items-start mb-8 relative z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center border border-white/10 text-brand-yellow shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                                        <BarChart3 size={20} />
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Total Revenue</div>
                                        <div className="text-2xl font-black text-white tracking-tight flex items-center gap-2 tabular-nums">
                                            ${revenue.toLocaleString()} <span className="text-brand-yellow text-xs bg-brand-yellow/10 px-1.5 py-0.5 rounded flex items-center gap-1">+34% <ArrowUpRight size={10}/></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <Globe size={12} className="text-brand-yellow animate-pulse"/> Live Data
                                </div>
                            </div>

                            {/* THE GRAPH (SVG) */}
                            <div className="relative flex-1 w-full">
                                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <defs>
                                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#FACC15" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                                        </linearGradient>
                                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Grid Lines (Perspective) */}
                                    <path d="M0,20 L100,20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
                                    <path d="M0,50 L100,50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />
                                    <path d="M0,80 L100,80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />

                                    {/* The Exponential Curve */}
                                    {/* M 0,90: Start bottom left */}
                                    {/* C 40,90 60,80 100,10: Curve up aggressively */}
                                    <path 
                                        d="M0,100 L0,90 C30,90 60,80 100,10 L100,100 Z" 
                                        fill="url(#chartFill)" 
                                        className={`transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                    
                                    <path 
                                        d="M0,90 C30,90 60,80 100,10" 
                                        stroke="#FACC15" 
                                        strokeWidth="0.8" 
                                        fill="none"
                                        filter="url(#glow)"
                                        strokeLinecap="round"
                                        strokeDasharray="150"
                                        strokeDashoffset={animate ? '0' : '150'}
                                        className="transition-all duration-[2000ms] ease-out"
                                    />
                                    
                                    {/* Pulsing Orb at End */}
                                    {animate && (
                                        <g className="animate-pulse">
                                            <circle cx="100" cy="10" r="1.5" fill="#FACC15" />
                                            <circle cx="100" cy="10" r="4" fill="rgba(250,204,21,0.3)" />
                                        </g>
                                    )}
                                </svg>

                                {/* Floating Tooltip (Dynamic) */}
                                <div className={`absolute top-[10%] right-[0%] transform translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}>
                                     <div className="bg-gray-900/90 border border-brand-yellow/50 backdrop-blur-md px-4 py-2 rounded-xl shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                                        <div className="text-[10px] text-gray-400 font-bold uppercase">ROI Index</div>
                                        <div className="text-xl font-black text-white tabular-nums">
                                            +{Math.floor(revenue / 20000)}%
                                        </div>
                                     </div>
                                     {/* Connector Line */}
                                     <div className="w-px h-8 bg-brand-yellow/50 mx-auto"></div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative HUD Elements */}
                        <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-brand-yellow/20 rounded-tr-3xl pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-brand-yellow/20 rounded-bl-3xl pointer-events-none"></div>
                        
                    </div>
                </FadeIn>

                {/* Background Glow Behind Chart */}
                <div className="absolute -inset-10 bg-brand-yellow/20 rounded-full blur-[100px] pointer-events-none z-[-1]"></div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
