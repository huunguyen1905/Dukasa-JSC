
import React, { useEffect, useState, useRef } from 'react';
import { Target, Eye, Zap, Award, Users, Globe, Rocket, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

// Helper Component for Animated Numbers
const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "", decimals = 0, live = false }: { end: number, duration?: number, suffix?: string, prefix?: string, decimals?: number, live?: boolean }) => {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let startTime: number | null = null;
                    
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        
                        // Ease Out Quart
                        const ease = 1 - Math.pow(1 - progress, 4);
                        
                        const currentVal = progress === 1 ? end : end * ease;
                        setCount(currentVal);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else if (live) {
                            // Live Drift Effect: Slowly increase after finishing
                            const driftInterval = setInterval(() => {
                                setCount(prev => prev + (Math.random() * (end * 0.001)));
                            }, 3000);
                            return () => clearInterval(driftInterval);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) observer.observe(elementRef.current);
        return () => observer.disconnect();
    }, [end, duration, live]);

    return (
        <span ref={elementRef} className="tabular-nums">
            {prefix}{count.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
        </span>
    );
};

const About: React.FC = () => {
  return (
    <section id="about-info" className="bg-brand-black py-24 relative overflow-hidden">
      {/* Background Abstract Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 1. THE MANIFESTO */}
        <div className="mb-32 text-center max-w-5xl mx-auto">
            <FadeIn>
                <span className="text-brand-yellow font-bold tracking-widest uppercase text-sm mb-4 block">Câu Chuyện Của Chúng Tôi</span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
                    Không Chỉ Làm Marketing. <br/>
                    Chúng Tôi <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-600">Kiến Tạo Sự Thống Trị.</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                    DUHAVA được sinh ra từ khát vọng định hình lại bản đồ Digital tại Việt Nam. Chúng tôi tin rằng, trong kỷ nguyên số, "tốt" là chưa đủ. Bạn phải là "duy nhất" hoặc bạn sẽ bị lãng quên.
                </p>
            </FadeIn>
        </div>

        {/* 2. THE PHILOSOPHY (BENTO GRID) */}
        <div className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mission Card */}
                <FadeIn delay={0} className="md:col-span-2">
                    <div className="bg-gray-900/30 border border-gray-800 p-10 rounded-3xl h-full flex flex-col justify-between hover:border-brand-yellow/30 transition-all duration-500 group">
                        <div className="w-14 h-14 bg-brand-yellow/10 rounded-full flex items-center justify-center text-brand-yellow mb-6 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                            <Target size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase mb-4">Sứ Mệnh (Mission)</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Biến dữ liệu thô thành lợi nhuận ròng. Chúng tôi cung cấp vũ khí chiến lược để các doanh nghiệp Việt Nam không chỉ cạnh tranh sòng phẳng mà còn vươn tầm quốc tế.
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* Vision Card */}
                <FadeIn delay={200}>
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-10 rounded-3xl h-full flex flex-col justify-between hover:border-brand-yellow/30 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Eye size={120} />
                        </div>
                        <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-black transition-colors relative z-10">
                            <Eye size={28} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-white uppercase mb-4">Tầm Nhìn (Vision)</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Trở thành Top 1 Growth Agency tại ĐNA vào năm 2028, nơi hội tụ những bộ óc sáng tạo điên rồ nhất.
                            </p>
                        </div>
                    </div>
                </FadeIn>

                 {/* Core Values */}
                 <FadeIn delay={400} className="md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: Zap, title: "Tốc Độ", desc: "Triển khai thần tốc, đi trước thị trường." },
                            { icon: Award, title: "Chất Lượng", desc: "Cam kết KPI bằng văn bản pháp lý." },
                            { icon: Users, title: "Con Người", desc: "Lấy khách hàng làm trọng tâm phục vụ." },
                            { icon: Globe, title: "Toàn Cầu", desc: "Tư duy địa phương, hành động toàn cầu." }
                        ].map((val, idx) => (
                            <div key={idx} className="bg-gray-900/20 border border-gray-800/50 p-6 rounded-2xl flex items-center gap-4 hover:bg-gray-800/40 transition-colors">
                                <div className="p-3 bg-brand-yellow/10 rounded-lg text-brand-yellow">
                                    <val.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase">{val.title}</h4>
                                    <p className="text-gray-500 text-xs">{val.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </FadeIn>
            </div>
        </div>

        {/* 3. THE ODYSSEY (TIMELINE) */}
        <div className="mb-32 relative">
            <FadeIn>
                <h3 className="text-3xl font-black text-white uppercase text-center mb-16">Hành Trình Chinh Phục</h3>
            </FadeIn>
            
            <div className="relative max-w-4xl mx-auto">
                {/* Center Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-yellow to-transparent md:-translate-x-1/2 opacity-30"></div>

                {[
                    { year: "2018", title: "Khởi Nguyên", desc: "Thành lập DUHAVA với 5 thành viên tại một văn phòng nhỏ, tập trung vào SEO & Content." },
                    { year: "2020", title: "Bứt Phá", desc: "Mở rộng sang Performance Marketing. Đạt mốc 100 khách hàng SME đầu tiên." },
                    { year: "2022", title: "Khẳng Định", desc: "Trở thành Google Partner Premium. Quy mô nhân sự đạt 50+ chuyên gia." },
                    { year: "2024", title: "Vươn Tầm", desc: "Ra mắt hệ sinh thái DUHAVA Group. Mở rộng thị trường sang Singapore & Thái Lan." }
                ].map((item, index) => (
                    <FadeIn key={index} delay={index * 100} direction="up">
                        <div className={`flex flex-col md:flex-row items-start mb-12 relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                            {/* Dot */}
                            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-brand-yellow rounded-full border-4 border-black shadow-[0_0_20px_rgba(250,204,21,0.8)] transform -translate-x-[7px] md:-translate-x-1/2 mt-1.5 z-10"></div>
                            
                            {/* Content */}
                            <div className={`pl-8 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                <span className="text-brand-yellow font-black text-4xl block mb-2 opacity-50">{item.year}</span>
                                <h4 className="text-xl font-bold text-white uppercase mb-2">{item.title}</h4>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>

        {/* 4. THE DNA (WHY US) */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             <div className="relative z-10">
                <h3 className="text-3xl font-black text-white uppercase mb-8">Tại Sao 500+ Thương Hiệu Chọn DUHAVA?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="group">
                        <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-brand-yellow transition-colors">
                            <AnimatedCounter end={98} suffix="%" />
                        </div>
                        <div className="text-brand-yellow font-bold uppercase text-sm mb-4">Tỷ lệ gia hạn hợp đồng</div>
                        <p className="text-gray-500 text-sm">Khách hàng ở lại vì hiệu quả thực tế, không phải vì ràng buộc pháp lý.</p>
                    </div>
                    <div className="group">
                         <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-brand-yellow transition-colors">
                            <AnimatedCounter end={300} suffix="%" prefix="+" />
                        </div>
                        <div className="text-brand-yellow font-bold uppercase text-sm mb-4">ROI Trung Bình</div>
                        <p className="text-gray-500 text-sm">Mỗi 1 đồng bạn bỏ ra, chúng tôi nỗ lực mang về ít nhất 3 đồng doanh thu.</p>
                    </div>
                    <div className="group">
                         <div className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-brand-yellow transition-colors">
                            <AnimatedCounter end={300000} suffix="+" live={true} />
                        </div>
                        <div className="text-brand-yellow font-bold uppercase text-sm mb-4">Cộng Đồng AI Lớn Nhất</div>
                        <p className="text-gray-500 text-sm">Sở hữu cộng đồng 300.000+ thành viên, dẫn đầu xu hướng công nghệ.</p>
                    </div>
                </div>

                <div className="mt-12 pt-12 border-t border-gray-800">
                    <button 
                        onClick={() => document.getElementById('contact-trigger')?.click()} 
                        className="inline-flex items-center gap-2 bg-white text-black font-bold uppercase py-3 px-6 text-xs md:text-base md:py-4 md:px-10 rounded-full hover:bg-brand-yellow transition-all duration-300 shadow-lg hover:shadow-brand-yellow/50 whitespace-nowrap"
                    >
                        Làm Việc Cùng Chúng Tôi <Rocket size={16} />
                    </button>
                </div>
             </div>
        </div>

      </div>
    </section>
  );
};

export default About;
