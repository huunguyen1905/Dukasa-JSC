import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, MousePointer } from 'lucide-react';
import FadeIn from './FadeIn';

const ROICalculator: React.FC = () => {
  const [budget, setBudget] = useState(50); // Triệu VNĐ
  const [conversionRate, setConversionRate] = useState(2.5); // %
  const [dealValue, setDealValue] = useState(5); // Triệu VNĐ

  const [metrics, setMetrics] = useState({
    traffic: 0,
    leads: 0,
    revenue: 0,
    roi: 0
  });

  useEffect(() => {
    // Logic giả lập (Simulation Logic)
    // CPC trung bình giả định: 5,000 VNĐ
    const cpc = 5000; 
    const traffic = Math.floor((budget * 1000000) / cpc);
    const leads = Math.floor(traffic * (conversionRate / 100));
    const revenue = leads * (dealValue * 1000000); // Giả sử 1 lead = 1 deal (đơn giản hóa) hoặc cần thêm Close Rate
    
    // Close Rate giả định: 20% từ Lead -> Deal
    const closeRate = 0.2;
    const actualDeals = Math.floor(leads * closeRate);
    const actualRevenue = actualDeals * (dealValue * 1000000);
    const roi = ((actualRevenue - (budget * 1000000)) / (budget * 1000000)) * 100;

    setMetrics({
        traffic,
        leads,
        revenue: actualRevenue,
        roi: roi > 0 ? roi : 0
    });
  }, [budget, conversionRate, dealValue]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section className="bg-gray-900 py-24 border-t border-gray-800 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-yellow/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="text-center mb-16">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Dự Toán Hiệu Quả</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                    Tính Toán <span className="text-gray-600">ROI Của Bạn</span>
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Kéo thanh trượt để xem doanh thu tiềm năng khi hợp tác cùng DUHAVA.
                    <br/><span className="text-xs italic text-gray-600">(Số liệu mang tính chất tham khảo dựa trên mức trung bình ngành)</span>
                </p>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-black border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* INPUT SECTION */}
            <div className="lg:col-span-5 space-y-10">
                {/* Budget Slider */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-white font-bold uppercase text-sm flex items-center gap-2">
                            <DollarSign size={16} className="text-brand-yellow" /> Ngân Sách Marketing / Tháng
                        </label>
                        <span className="text-brand-yellow font-black text-2xl">{budget} Tr</span>
                    </div>
                    <input 
                        type="range" 
                        min="10" max="500" step="10"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>10 Tr</span>
                        <span>500 Tr</span>
                    </div>
                </div>

                {/* Conversion Rate Slider */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-white font-bold uppercase text-sm flex items-center gap-2">
                            <MousePointer size={16} className="text-blue-500" /> Tỷ Lệ Chuyển Đổi Web
                        </label>
                        <span className="text-blue-500 font-black text-2xl">{conversionRate}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0.5" max="10" step="0.5"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0.5%</span>
                        <span>10%</span>
                    </div>
                </div>

                {/* Deal Value Slider */}
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <label className="text-white font-bold uppercase text-sm flex items-center gap-2">
                            <TrendingUp size={16} className="text-green-500" /> Giá Trị Đơn Hàng TB
                        </label>
                        <span className="text-green-500 font-black text-2xl">{dealValue} Tr</span>
                    </div>
                    <input 
                        type="range" 
                        min="1" max="100" step="1"
                        value={dealValue}
                        onChange={(e) => setDealValue(Number(e.target.value))}
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>1 Tr</span>
                        <span>100 Tr</span>
                    </div>
                </div>
            </div>

            {/* DIVIDER (Desktop) */}
            <div className="hidden lg:block lg:col-span-1 border-r border-gray-800 transform rotate-12 h-full mx-auto"></div>

            {/* OUTPUT SECTION */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                        <div className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                            <Users size={14} /> Traffic Ước Tính
                        </div>
                        <div className="text-3xl font-black text-white">{metrics.traffic.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                         <div className="text-gray-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                            <Users size={14} /> Leads Tiềm Năng
                        </div>
                        <div className="text-3xl font-black text-white">{metrics.leads.toLocaleString()}</div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-brand-yellow/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 blur-[50px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="text-brand-yellow text-sm font-bold uppercase tracking-widest mb-2">Doanh Thu Dự Kiến / Tháng</div>
                        <div className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            {formatCurrency(metrics.revenue)}
                        </div>
                        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-bold">
                            <TrendingUp size={14} /> ROI Ước Tính: +{metrics.roi.toFixed(0)}%
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => document.getElementById('contact-trigger')?.click()}
                    className="w-full bg-brand-yellow text-black font-bold uppercase py-4 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-brand-yellow/30"
                >
                    Hiện Thực Hóa Con Số Này
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;