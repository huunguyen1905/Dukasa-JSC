
import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, DollarSign, Users, MousePointer, 
  Activity, RefreshCw, ChevronRight, Zap, Target 
} from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';

const GrowthEngine: React.FC = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [budget, setBudget] = useState(50); // Triệu VND
  const [convRate, setConvRate] = useState(2.0); // %
  const [dealValue, setDealValue] = useState(5); // Triệu VND
  const [isSimulating, setIsSimulating] = useState(false);

  // --- CONSTANTS ---
  const CPC = 5000; // Cost Per Click estimate
  const CLOSE_RATE = 0.2; // 20% lead to deal

  // --- CALCULATIONS ---
  const metrics = useMemo(() => {
    const traffic = Math.floor((budget * 1_000_000) / CPC);
    const leads = Math.floor(traffic * (convRate / 100));
    const deals = Math.floor(leads * CLOSE_RATE);
    const revenue = deals * (dealValue * 1_000_000);
    const profit = revenue - (budget * 1_000_000);
    const roi = budget > 0 ? (profit / (budget * 1_000_000)) * 100 : 0;

    return { traffic, leads, deals, revenue, roi };
  }, [budget, convRate, dealValue]);

  // --- CHART DATA GENERATION ---
  // Generate 6 data points (Month 1 to 6) based on inputs to simulate a growth curve
  const chartPoints = useMemo(() => {
    const points = [];
    const baseRevenue = metrics.revenue;
    // Simulate compounding growth effect of SEO/Brand over time
    const growthFactor = 1 + (metrics.roi > 0 ? 0.1 : 0.05); 

    for (let i = 0; i < 7; i++) {
      // Create a curve: y = base * (growth ^ i) + noise
      const val = baseRevenue * Math.pow(growthFactor, i);
      // Normalize for SVG (0 to 100 height)
      points.push(val);
    }
    return points;
  }, [metrics]);

  const getPath = (points: number[]) => {
    const max = Math.max(...points) * 1.1 || 100;
    const width = 100; // SVG viewBox width
    const stepX = width / (points.length - 1);
    
    // Build Path Command
    let d = `M 0,${100 - (points[0] / max) * 100}`;
    
    // Smooth curve using cubic bezier (simplified)
    for (let i = 1; i < points.length; i++) {
        const x = i * stepX;
        const y = 100 - (points[i] / max) * 100;
        const prevX = (i - 1) * stepX;
        const prevY = 100 - (points[i-1] / max) * 100;
        
        // Control points for smoothing
        const cp1x = prevX + stepX / 2;
        const cp1y = prevY;
        const cp2x = x - stepX / 2;
        const cp2y = y;

        d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
    }
    return { d, max };
  };

  const { d: linePath } = getPath(chartPoints);
  const areaPath = `${linePath} L 100,100 L 0,100 Z`;

  // --- FORMATTERS ---
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumSignificantDigits: 3 }).format(val);
  
  const formatNumber = (val: number) => 
    new Intl.NumberFormat('vi-VN', { notation: "compact", compactDisplay: "short" }).format(val);

  const handleSimulate = () => {
      setIsSimulating(true);
      setTimeout(() => setIsSimulating(false), 800);
  };

  return (
    <section className="bg-brand-black py-24 relative overflow-hidden border-t border-gray-900">
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2 justify-center md:justify-start">
                        <Activity size={14} /> Growth Simulator
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                        Động Cơ <span className="text-gray-600">Tăng Trưởng</span>
                    </h3>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-gray-400 text-sm font-medium">Dữ liệu được mô phỏng dựa trên <br/>hiệu suất trung bình của 500+ dự án.</div>
                </div>
            </div>
        </FadeIn>

        {/* DASHBOARD CONTAINER */}
        <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px] relative group">
            {/* Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

            {/* LEFT: CONTROL PANEL (INPUTS) */}
            <div className="lg:w-1/3 p-8 border-r border-gray-800 bg-gray-900/30 backdrop-blur-sm z-10 flex flex-col">
                <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                    <Target size={16} className="text-brand-yellow"/> Thông Số Đầu Vào
                </h4>

                <div className="space-y-10 flex-1">
                    {/* Budget Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-400 text-xs font-bold uppercase">Ngân Sách (Tháng)</label>
                            <span className="text-brand-yellow font-black text-xl">{budget} <span className="text-xs font-normal text-gray-500">Tr VNĐ</span></span>
                        </div>
                        <input 
                            type="range" min="10" max="500" step="10" 
                            value={budget} 
                            onChange={(e) => setBudget(Number(e.target.value))}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brand-yellow hover:accent-white transition-all"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                            <span>10 Tr</span>
                            <span>500 Tr</span>
                        </div>
                    </div>

                    {/* Conv Rate Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-400 text-xs font-bold uppercase">Tỷ Lệ Chuyển Đổi (CR)</label>
                            <span className="text-blue-400 font-black text-xl">{convRate} <span className="text-xs font-normal text-gray-500">%</span></span>
                        </div>
                        <input 
                            type="range" min="0.5" max="5.0" step="0.1" 
                            value={convRate} 
                            onChange={(e) => setConvRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-white transition-all"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                            <span>0.5%</span>
                            <span>5.0%</span>
                        </div>
                    </div>

                    {/* Deal Value Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-gray-400 text-xs font-bold uppercase">Giá Trị Đơn (AOV)</label>
                            <span className="text-green-400 font-black text-xl">{dealValue} <span className="text-xs font-normal text-gray-500">Tr VNĐ</span></span>
                        </div>
                        <input 
                            type="range" min="1" max="100" step="1" 
                            value={dealValue} 
                            onChange={(e) => setDealValue(Number(e.target.value))}
                            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-white transition-all"
                        />
                        <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                            <span>1 Tr</span>
                            <span>100 Tr</span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handleSimulate}
                    className="mt-8 w-full py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-brand-yellow text-white rounded-xl font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 group/btn"
                >
                    <RefreshCw size={16} className={`group-hover/btn:rotate-180 transition-transform ${isSimulating ? 'animate-spin' : ''}`} /> 
                    {isSimulating ? 'Đang Tính Toán...' : 'Chạy Mô Phỏng'}
                </button>
            </div>

            {/* RIGHT: VISUALIZER (CHART & OUTPUT) */}
            <div className="lg:w-2/3 p-8 relative flex flex-col">
                
                {/* Header Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                        <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Traffic / Mo</div>
                        <div className="text-white font-bold text-xl flex items-center gap-2">
                            {formatNumber(metrics.traffic)} <Users size={14} className="text-gray-600"/>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                        <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Leads / Mo</div>
                        <div className="text-white font-bold text-xl flex items-center gap-2">
                            {formatNumber(metrics.leads)} <MousePointer size={14} className="text-blue-500"/>
                        </div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 md:col-span-2">
                        <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">ROI Dự Kiến</div>
                        <div className="text-brand-yellow font-black text-2xl flex items-center gap-2">
                            +{Math.round(metrics.roi)}% 
                            <span className={`text-[10px] px-2 py-0.5 rounded bg-brand-yellow/10 border border-brand-yellow/20 ${metrics.roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {metrics.roi > 0 ? 'Excellent' : 'Risk'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Chart Area */}
                <div className="flex-1 relative bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl border border-white/5 overflow-hidden min-h-[300px]">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-20">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-full h-px bg-gray-600 dashed"></div>
                        ))}
                    </div>

                    {/* SVG Chart */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full p-0">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FACC15" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        
                        {/* Area Fill */}
                        <path 
                            d={areaPath} 
                            fill="url(#chartGradient)" 
                            className={`transition-all duration-1000 ease-out ${isSimulating ? 'opacity-50' : 'opacity-100'}`}
                        />
                        
                        {/* Line Stroke */}
                        <path 
                            d={linePath} 
                            fill="none" 
                            stroke="#FACC15" 
                            strokeWidth="0.8" 
                            vectorEffect="non-scaling-stroke"
                            className={`transition-all duration-1000 ease-out ${isSimulating ? 'opacity-50' : 'opacity-100'}`}
                        />
                    </svg>

                    {/* Dynamic Revenue Display (Centered) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mb-2 animate-pulse">Doanh Thu Ước Tính</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(250,204,21,0.5)] tracking-tight">
                            {formatCurrency(metrics.revenue)}
                        </h2>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={() => navigate('/lien-he')}
                        className="flex items-center gap-3 text-white hover:text-brand-yellow font-bold uppercase text-xs tracking-widest group transition-colors"
                    >
                        Hiện thực hóa con số này <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthEngine;
