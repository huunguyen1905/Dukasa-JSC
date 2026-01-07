
import React from 'react';
import { Target, Eye, Zap, Award, Users, Globe, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="ve-chung-toi" className="bg-[#050505] py-32 relative overflow-hidden">
      
      {/* --- BACKGROUND LAYER: CLEAN & TECH --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* 1. MANIFESTO SECTION - TYPOGRAPHY FOCUSED */}
        <div className="max-w-4xl mx-auto text-center mb-32">
            <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">The Duhava DNA</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                    Không làm Marketing. <br/>
                    <span className="text-gray-700">Chúng tôi kiến tạo</span> <span className="text-brand-yellow">Đế Chế.</span>
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                    Trong kỷ nguyên số, "tốt" là chưa đủ. Bạn phải là <strong className="text-white">duy nhất</strong>. DUHAVA kết hợp tư duy chiến lược đỉnh cao với công nghệ dữ liệu để biến thương hiệu của bạn thành biểu tượng không thể thay thế.
                </p>
            </FadeIn>
        </div>

        {/* 2. VISION & MISSION - CLEAN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
            
            {/* Mission Card */}
            <FadeIn delay={100} className="h-full">
                <div className="group relative h-full bg-gray-900/20 border border-white/10 p-10 md:p-14 rounded-3xl overflow-hidden hover:bg-gray-900/40 transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                        <Target size={200} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-brand-yellow rounded-2xl flex items-center justify-center text-black mb-8 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                            <Target size={28} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tight">Sứ Mệnh (Mission)</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Trao quyền cho doanh nghiệp Việt Nam bằng vũ khí công nghệ hạng nặng. Chúng tôi giúp bạn không chỉ cạnh tranh sòng phẳng mà còn thiết lập luật chơi mới trên thị trường.
                        </p>
                    </div>
                </div>
            </FadeIn>

            {/* Vision Card */}
            <FadeIn delay={200} className="h-full">
                <div className="group relative h-full bg-gray-900/20 border border-white/10 p-10 md:p-14 rounded-3xl overflow-hidden hover:bg-gray-900/40 transition-colors duration-500">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
                        <Eye size={200} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <Eye size={28} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tight">Tầm Nhìn 2028</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Trở thành Top 1 Growth Agency tại Đông Nam Á. Nơi hội tụ của những bộ óc sáng tạo nhất, định hình lại chuẩn mực của ngành Digital Marketing.
                        </p>
                    </div>
                </div>
            </FadeIn>
        </div>

        {/* 3. CORE VALUES - MINIMALIST GRID */}
        <div className="mb-32">
            <FadeIn>
                <h3 className="text-center text-2xl font-black text-white uppercase mb-12 tracking-widest">Giá Trị Cốt Lõi</h3>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Zap, title: "Tốc Độ", desc: "Triển khai thần tốc, chính xác từng giây." },
                    { icon: Award, title: "Cam Kết", desc: "KPI rõ ràng, nói được làm được." },
                    { icon: Users, title: "Con Người", desc: "Khách hàng là trung tâm của mọi chiến lược." },
                    { icon: Globe, title: "Toàn Cầu", desc: "Tư duy không biên giới, chuẩn quốc tế." }
                ].map((val, idx) => (
                    <FadeIn key={idx} delay={idx * 100}>
                        <div className="h-full p-8 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] rounded-2xl transition-all duration-300 hover:border-brand-yellow/30 group">
                            <val.icon className="text-gray-500 group-hover:text-brand-yellow transition-colors mb-4" size={32} strokeWidth={1.5} />
                            <h4 className="text-white font-bold uppercase mb-2 text-lg">{val.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>

        {/* 4. HISTORY TIMELINE - CLEAN VERTICAL LINE */}
        <div className="max-w-3xl mx-auto">
             <div className="relative border-l border-gray-800 ml-4 md:ml-0 space-y-16">
                {[
                    { year: "2018", title: "Khởi Nguyên", desc: "Thành lập DUHAVA với 5 thành viên cốt cán, tập trung vào thị trường SEO ngách." },
                    { year: "2020", title: "Bứt Phá", desc: "Mở rộng sang Performance Marketing. Đạt mốc 100 khách hàng SME đầu tiên bất chấp đại dịch." },
                    { year: "2022", title: "Khẳng Định", desc: "Trở thành Google Partner Premium. Quy mô nhân sự đạt 50+ chuyên gia." },
                    { year: "2024", title: "Vươn Tầm", desc: "Ra mắt hệ sinh thái DUHAVA Group. Tích hợp AI vào quy trình vận hành." }
                ].map((item, index) => (
                    <div key={index} className="relative pl-12 md:pl-16 group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-gray-800 border border-gray-600 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300 shadow-[0_0_0_4px_#050505]"></div>
                        
                        <FadeIn delay={index * 100} direction="right">
                            <span className="text-brand-yellow font-mono text-xs font-bold tracking-widest mb-1 block">{item.year}</span>
                            <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
                        </FadeIn>
                    </div>
                ))}
            </div>
        </div>

        {/* 5. BOTTOM CTA */}
        <div className="mt-32 text-center">
            <FadeIn>
                <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8 w-full max-w-xs"></div>
                <p className="text-gray-400 mb-6 font-medium">Bạn đã sẵn sàng viết tiếp câu chuyện thành công?</p>
                <button 
                    onClick={() => navigate('/lien-he')} 
                    className="inline-flex items-center gap-2 text-white border-b border-brand-yellow pb-1 font-bold uppercase tracking-widest hover:text-brand-yellow transition-colors"
                >
                    Trở thành đối tác <ArrowUpRight size={16} />
                </button>
            </FadeIn>
        </div>

      </div>
    </section>
  );
};

export default About;
