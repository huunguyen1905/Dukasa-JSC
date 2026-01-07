
import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, TrendingUp, Users, MousePointer, Activity, ArrowRight, Calculator, Zap } from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';

const ROICalculator: React.FC = () => {
  // Input States
  const [budget, setBudget] = useState(50); // Triệu VNĐ
  const [conversionRate, setConversionRate] = useState(2.5); // %
  const [dealValue, setDealValue] = useState(5); // Triệu VNĐ
  const navigate = useNavigate();

  // Target Metrics (Calculated values)
  const [targets, setTargets] = useState({
    traffic: 0,
    leads: 0,
    revenue: 0,
    roi: 0
  });

  // Display Metrics (For animation smoothing)
  const [display, setDisplay] = useState({
    traffic: 0,
    leads: 0,
    revenue: 0,
    roi: 0
  });

  // Calculation Logic
  useEffect(() => {
    const cpc = 5000; 
    const traffic = Math.floor((budget * 1000000) / cpc);
    const leads = Math.floor(traffic * (conversionRate / 100));
    const closeRate = 0.2; // 20%
    const actualDeals = Math.floor(leads * closeRate);
    const revenue = actualDeals * (dealValue * 1000000);
    const roi = budget > 0 ? ((revenue - (budget * 1000000)) / (budget * 1000000)) * 100 : 0;

    setTargets({
        traffic,
        leads,
        revenue,
        roi: roi > 0 ? roi : 0
    });
  }, [budget, conversionRate, dealValue]);

  // Animation Loop (Lerp for smooth number transition)
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
        setDisplay(prev => ({
            traffic: prev.traffic + (targets.traffic - prev.traffic) * 0.1,
            leads: prev.leads + (targets.leads - prev.leads) * 0.1,
            revenue: prev.revenue + (targets.revenue - prev.revenue) * 0.1,
            roi: prev.roi + (targets.roi - prev.roi) * 0.1
        }));
        animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [targets]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(val);
  };

  const formatNumber = (val: number) => {
    return Math.round(val).toLocaleString('vi-VN');
  };

  // Custom Slider Component
  const Slider = ({ label, value, min, max, step, onChange, icon: Icon, colorClass, suffix }: any) => {
      const percentage = ((value - min) / (max - min)) * 100;
      return (
          <div className="group">
            <div className="flex justify-between items-end mb-3">
                <label className="text-gray-400 font-bold uppercase text-xs flex items-center gap-2 group-hover:text-white transition-colors">
                    <Icon size={14} className={colorClass} /> {label}
                </label>
                <span className={`font-black text-xl tabular-nums ${colorClass}`}>{value}{suffix}</span>
            </div>
            <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                 {/* Track Fill */}
                 <div 
                    className={`absolute top-0 left-0 h-full rounded-full ${colorClass.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}
                    style={{ width: `${percentage}%` }}
                 ></div>
                 <input 
                    type="range" min={min} max={max} step={step} value={value} onChange={onChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                 />
            </div>
          </div>
      );
  };

  return (
    <section className="bg-brand-black py-24 border-t border-gray-900 relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Calculator size={12} />
                    <span>Simulator 2.0</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                    Dự Toán <span className="text-gray-600">Hiệu Quả Đầu Tư</span>
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
                    Điều chỉnh ngân sách và mục tiêu để xem sức mạnh tăng trưởng của hệ thống DUHAVA.
                </p>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gray-900/40 border border-white/5 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* INPUT PANEL (LEFT) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-10 relative z-10">
                <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 space-y-8">
                    <Slider 
                        label="Ngân Sách / Tháng" 
                        value={budget} 
                        min={10} max={500} step={10} 
                        onChange={(e: any) => setBudget(Number(e.target.value))}
                        icon={DollarSign}
                        colorClass="text-brand-yellow"
                        suffix=" Tr"
                    />
                    <Slider 
                        label="Tỷ Lệ Chuyển Đổi Web" 
                        value={conversionRate} 
                        min={0.5} max={10} step={0.5} 
                        onChange={(e: any) => setConversionRate(Number(e.target.value))}
                        icon={MousePointer}
                        colorClass="text-blue-500"
                        suffix="%"
                    />
                    <Slider 
                        label="Giá Trị Đơn Hàng TB" 
                        value={dealValue} 
                        min={1} max={100} step={1} 
                        onChange={(e: any) => setDealValue(Number(e.target.value))}
                        icon={TrendingUp}
                        colorClass="text-green-500"
                        suffix=" Tr"
                    />
                </div>
                
                <p className="text-xs text-gray-500 italic px-2">
                    *Giả định: CPC trung bình ngành 5.000đ, Tỷ lệ chốt sale từ Lead 20%. Số liệu mang tính tham khảo.
                </p>
            </div>

            {/* DIVIDER */}
            <div className="hidden lg:block lg:col-span-1 relative">
                <div className="absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border border-gray-700 rounded-full flex items-center justify-center text-gray-500">
                    <ArrowRight size={14} />
                </div>
            </div>

            {/* OUTPUT PANEL (RIGHT - THE REACTOR) */}
            <div className="lg:col-span-6 flex flex-col gap-6 relative z-10">
                
                {/* Top Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-blue-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase">Traffic Ước Tính</span>
                            <Activity size={14} className="text-blue-500" />
                        </div>
                        <div className="text-2xl font-black text-white tabular-nums group-hover:text-blue-400 transition-colors">
                            {formatNumber(display.traffic)}
                        </div>
                    </div>
                    <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex flex-col justify-between group hover:border-green-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase">Leads Tiềm Năng</span>
                            <Users size={14} className="text-green-500" />
                        </div>
                        <div className="text-2xl font-black text-white tabular-nums group-hover:text-green-400 transition-colors">
                            {formatNumber(display.leads)}
                        </div>
                    </div>
                </div>

                {/* Main Reactor Core (Revenue) */}
                <div className="flex-1 bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-brand-yellow/20 relative overflow-hidden group">
                    {/* Animated Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[60px] group-hover:bg-brand-yellow/20 transition-all duration-700"></div>
                    
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                        <span className="text-brand-yellow font-bold uppercase tracking-[0.2em] text-xs mb-4 animate-pulse">Doanh Thu Dự Kiến</span>
                        
                        <div className="text-4xl md:text-6xl font-black text-white mb-6 tabular-nums tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            {formatCurrency(display.revenue)}
                        </div>

                        {/* ROI Circular Gauge (SVG) */}
                        <div className="relative w-48 h-24 overflow-hidden mt-4">
                             {/* Half Circle Gauge */}
                             <svg viewBox="0 0 200 100" className="w-full h-full">
                                <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#333" strokeWidth="20" strokeLinecap="round" />
                                <path 
                                    d="M 20 100 A 80 80 0 0 1 180 100" 
                                    fill="none" 
                                    stroke="#FACC15" 
                                    strokeWidth="20" 
                                    strokeLinecap="round"
                                    strokeDasharray="251.2" // Circumference of half circle r=80
                                    strokeDashoffset={251.2 - (Math.min(display.roi, 1000) / 1000) * 251.2} // Cap visual at 1000% ROI for gauge
                                    className="transition-[stroke-dashoffset] duration-300"
                                />
                             </svg>
                             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                                <div className="text-2xl font-black text-white">+{Math.round(display.roi)}%</div>
                                <div className="text-[10px] text-gray-500 uppercase font-bold">ROI Index</div>
                             </div>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/lien-he')}
                    className="w-full bg-white text-black font-black uppercase py-4 rounded-xl hover:bg-brand-yellow transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                >
                    <Zap size={18} fill="black" /> Hiện Thực Hóa Con Số Này
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
