
import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, ArrowUpRight, Activity, Zap, Crosshair, Cpu, Lock } from 'lucide-react';
import FadeIn from './FadeIn';

const GrowthSection: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [ticker, setTicker] = useState(1240);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (containerRef.current) observer.observe(containerRef.current);

    // Simulate live data ticker
    const interval = setInterval(() => {
        setTicker(prev => prev + Math.floor(Math.random() * 50) - 20);
    }, 100);

    return () => {
        observer.disconnect();
        clearInterval(interval);
    };
  }, []);

  return (
    <section className="bg-brand-black py-24 relative overflow-hidden border-y border-gray-900" ref={containerRef}>
      {/* Tech Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
               backgroundImage: 'linear-gradient(rgba(250, 204, 21, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 204, 21, 0.1) 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: Content (4 Columns) */}
            <div className="lg:col-span-4">
                <FadeIn>
                    <div className="flex items-center gap-2 text-brand-yellow mb-6">
                        <Cpu className="animate-spin-slow" size={16} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">System Analysis</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none mb-6">
                        Tăng Trưởng <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white text-6xl">Phi Tuyến Tính</span>
                    </h2>
                    
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed border-l-2 border-brand-yellow/30 pl-4">
                        Chúng tôi phá vỡ quy luật tăng trưởng tịnh tiến. DUHAVA kích hoạt "Điểm Bùng Phát" (Tipping Point) bằng thuật toán tối ưu hoá độc quyền.
                    </p>

                    <div className="space-y-4">
                        <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg flex justify-between items-center group hover:border-brand-yellow/50 transition-colors">
                            <div>
                                <div className="text-gray-500 text-xs font-bold uppercase">Tốc độ xử lý dữ liệu</div>
                                <div className="text-white font-mono text-xl font-bold">~2ms / request</div>
                            </div>
                            <Activity className="text-gray-600 group-hover:text-brand-yellow transition-colors" />
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg flex justify-between items-center group hover:border-brand-yellow/50 transition-colors">
                            <div>
                                <div className="text-gray-500 text-xs font-bold uppercase">Độ chính xác AI</div>
                                <div className="text-white font-mono text-xl font-bold">99.8%</div>
                            </div>
                            <Crosshair className="text-gray-600 group-hover:text-brand-yellow transition-colors" />
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* RIGHT: The "Dangerous" Tech Chart (8 Columns) */}
            <div className="lg:col-span-8 relative">
                <FadeIn direction="left" delay={200}>
                    {/* Main HUD Container */}
                    <div className="relative bg-[#080808] border border-gray-800 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
                        
                        {/* Header Bar */}
                        <div className="bg-gray-900/80 border-b border-gray-800 p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">LIVE MONITORING // SESSION ID: 8X-299</span>
                            </div>
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-gray-700 rounded-sm"></div>)}
                            </div>
                        </div>

                        {/* Chart Canvas Area */}
                        <div className="relative h-[450px] w-full bg-[radial-gradient(circle_at_center,#111_0%,#000_100%)]">
                            
                            {/* Grid Overlay */}
                            <div className="absolute inset-0" 
                                style={{ 
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', 
                                    backgroundSize: '50px 50px',
                                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                                }}>
                            </div>

                            {/* SVG CHART */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 400">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FACC15" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                                    </linearGradient>
                                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
                                        <path d="M0,3 l4,0" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
                                    </pattern>
                                </defs>

                                {/* Base Line (Market Standard) */}
                                <path 
                                    d="M0,350 L800,250" 
                                    stroke="#333" 
                                    strokeWidth="2" 
                                    strokeDasharray="5 5" 
                                    fill="none" 
                                />
                                <text x="750" y="240" fill="#666" fontSize="10" fontFamily="monospace" fontWeight="bold">MARKET AVG</text>

                                {/* DUHAVA Line (Exponential) */}
                                <path 
                                    d="M0,350 C300,350 500,300 800,50" 
                                    fill="url(#areaGradient)" 
                                    className={`transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}
                                />
                                <path 
                                    d="M0,350 C300,350 500,300 800,50" 
                                    stroke="#FACC15" 
                                    strokeWidth="3" 
                                    fill="none"
                                    filter="url(#neonGlow)"
                                    strokeDasharray="1000"
                                    strokeDashoffset={animate ? '0' : '1000'}
                                    className="transition-all duration-[2000ms] ease-out"
                                />

                                {/* Moving Scanner Line */}
                                <line x1="0" y1="0" x2="0" y2="400" stroke="rgba(250,204,21,0.3)" strokeWidth="1">
                                    <animate attributeName="x1" from="0" to="800" dur="3s" repeatCount="indefinite" />
                                    <animate attributeName="x2" from="0" to="800" dur="3s" repeatCount="indefinite" />
                                </line>

                                {/* Data Points */}
                                {animate && (
                                    <>
                                        <circle cx="400" cy="270" r="4" fill="#000" stroke="#FACC15" strokeWidth="2" />
                                        <circle cx="650" cy="130" r="4" fill="#000" stroke="#FACC15" strokeWidth="2" />
                                        <circle cx="800" cy="50" r="6" fill="#FACC15" className="animate-pulse" />
                                    </>
                                )}
                            </svg>

                            {/* Floating HUD Widgets */}
                            
                            {/* Top Right: ROI Counter */}
                            <div className="absolute top-8 right-8 bg-black/80 backdrop-blur border border-brand-yellow/30 p-4 rounded-lg">
                                <div className="text-gray-500 text-[10px] uppercase font-bold mb-1 font-mono tracking-wider">Net Revenue Growth</div>
                                <div className="text-3xl font-black text-brand-yellow font-mono tabular-nums tracking-tighter flex items-center gap-2">
                                    <ArrowUpRight size={24} />
                                    {ticker}%
                                </div>
                            </div>

                            {/* Center Floating Label */}
                            <div className={`absolute top-[40%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-500 ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                                <div className="flex items-center gap-2 bg-brand-yellow text-black px-4 py-1.5 rounded-sm font-bold text-xs uppercase shadow-[0_0_20px_rgba(250,204,21,0.6)]">
                                    <Zap size={12} fill="currentColor"/> Hyper-Growth Mode
                                </div>
                                <div className="h-8 w-px bg-brand-yellow mx-auto mt-0"></div>
                            </div>

                            {/* Bottom Left: Terminal Code */}
                            <div className="absolute bottom-6 left-6 font-mono text-[10px] text-green-500/80 pointer-events-none opacity-60">
                                <div>> DETECTING MARKET OPPORTUNITY...</div>
                                <div>> OPTIMIZING CONVERSION RATE...</div>
                                <div>> SCALING AD SPEND... [OK]</div>
                                <div>> ROI CALCULATION: POSITIVE</div>
                            </div>
                        </div>

                        {/* Footer Status Bar */}
                        <div className="bg-gray-900 border-t border-gray-800 p-2 flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1 text-green-500"><Lock size={10}/> SECURE CONNECTION</span>
                                <span>LATENCY: 12ms</span>
                            </div>
                            <div className="animate-pulse text-brand-yellow">SYSTEM OPTIMAL</div>
                        </div>
                        
                        {/* Decorative Corner Borders */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-yellow"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-yellow"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-yellow"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-yellow"></div>

                    </div>
                </FadeIn>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
