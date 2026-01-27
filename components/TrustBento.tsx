
import React from 'react';
import { Quote, ArrowUpRight, Star, TrendingUp, Users, ShieldCheck, Award, Newspaper } from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';

const TrustBento: React.FC = () => {
  const navigate = useNavigate();

  // Mock Data locally for self-containment
  const featuredTestimonial = {
    quote: "Doanh số E-commerce tăng 300% chỉ sau 3 tháng. Chiến lược Performance của DUHAVA thực sự ở đẳng cấp khác, tối ưu từng đồng chi phí.",
    name: "Trần Minh Tuấn",
    role: "CEO, TechViet Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    metric: "+300% ROI"
  };

  const pressLogos = [
    { name: "VTV", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/VTV_logo_2013_final.svg/800px-VTV_logo_2013_final.svg.png" },
    { name: "HTV", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/HTV_New_Logo.png/800px-HTV_New_Logo.png" },
    { name: "Forbes", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Forbes_logo.svg/2560px-Forbes_logo.svg.png" },
    { name: "Google Partner", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Google_Partner_logo.svg/1024px-Google_Partner_logo.svg.png" }
  ];

  return (
    <section className="bg-brand-black py-24 relative overflow-hidden border-t border-gray-900">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
                        <ShieldCheck size={14} /> Trust & Credibility
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                        Uy Tín <span className="text-gray-600">Đã Được Kiểm Chứng</span>
                    </h3>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-3xl font-black text-white">500+</div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Dự án thành công</div>
                </div>
            </div>
        </FadeIn>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-4 h-auto md:h-[500px]">
            
            {/* 1. LARGE TESTIMONIAL (2x2) */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Quote size={100} className="text-brand-yellow transform rotate-12" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-brand-yellow/20">
                            <Star size={12} fill="currentColor" /> Top Rated Case Study
                        </div>
                        <p className="text-xl md:text-2xl font-medium text-white leading-relaxed line-clamp-4">
                            "{featuredTestimonial.quote}"
                        </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-800 pt-6 mt-6">
                        <div className="flex items-center gap-4">
                            <img src={featuredTestimonial.avatar} alt={featuredTestimonial.name} className="w-12 h-12 rounded-full border-2 border-gray-700" />
                            <div>
                                <h4 className="text-white font-bold text-sm">{featuredTestimonial.name}</h4>
                                <p className="text-gray-500 text-xs uppercase tracking-wider">{featuredTestimonial.role}</p>
                            </div>
                        </div>
                        <div className="text-brand-yellow font-black text-xl tracking-tighter">
                            {featuredTestimonial.metric}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. PRESS MARQUEE (2x1 Horizontal) */}
            <div className="md:col-span-2 bg-gray-900/40 border border-gray-800 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden">
                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Newspaper size={14} /> Featured On
                </div>
                
                {/* Marquee Container */}
                <div className="w-full overflow-hidden mask-linear-fade">
                    <div className="flex items-center gap-12 animate-scroll-right whitespace-nowrap w-max">
                        {/* Duplicate lists for seamless scroll */}
                        {[...pressLogos, ...pressLogos, ...pressLogos].map((logo, idx) => (
                            <img 
                                key={idx} 
                                src={logo.url} 
                                alt={logo.name} 
                                className="h-8 md:h-10 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. STAT BOX (1x1) */}
            <div className="md:col-span-1 bg-brand-yellow rounded-3xl p-6 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
                <div className="flex justify-between items-start">
                    <Users className="text-black/50" size={24} />
                    <ArrowUpRight className="text-black" size={20} />
                </div>
                <div>
                    <div className="text-4xl font-black text-black tracking-tighter mb-1">98%</div>
                    <div className="text-black/70 text-xs font-bold uppercase tracking-wider">Khách hàng hài lòng</div>
                </div>
            </div>

            {/* 4. CTA BOX (1x1) */}
            <div 
                onClick={() => navigate('/du-an')}
                className="md:col-span-1 bg-gray-800 border border-gray-700 rounded-3xl p-6 flex flex-col justify-center items-center text-center cursor-pointer group hover:bg-gray-700 transition-colors"
            >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-4 group-hover:bg-brand-yellow group-hover:text-black transition-all">
                    <Award size={24} />
                </div>
                <h4 className="text-white font-bold text-sm uppercase mb-1">Hồ Sơ Năng Lực</h4>
                <p className="text-gray-400 text-xs mb-0 group-hover:text-white transition-colors">Xem chi tiết &rarr;</p>
            </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBento;
