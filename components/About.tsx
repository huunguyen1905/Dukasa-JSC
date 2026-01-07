
import React from 'react';
import { Target, Zap, Globe, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="ve-chung-toi" className="bg-[#050505] py-24 md:py-32 relative overflow-hidden border-t border-gray-900">
      
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: The Manifesto (The Hook) */}
            <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">The Duhava DNA</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                    Không làm Marketing. <br/>
                    <span className="text-gray-700">Chúng tôi kiến tạo</span> <br/>
                    <span className="text-brand-yellow">Đế Chế Số.</span>
                </h2>
                
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-xl mb-10 border-l-2 border-brand-yellow pl-6">
                    Trong kỷ nguyên số, "tốt" là chưa đủ. Bạn phải là <strong className="text-white">duy nhất</strong>. DUHAVA kết hợp tư duy chiến lược đỉnh cao với công nghệ dữ liệu để biến thương hiệu của bạn thành biểu tượng không thể thay thế.
                </p>

                <MagneticButton>
                    <button 
                        onClick={() => navigate('/ve-chung-toi')} 
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black uppercase tracking-wider hover:bg-brand-yellow transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        Khám Phá DNA <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </MagneticButton>
            </FadeIn>

            {/* RIGHT: High-Impact Visuals / Mini Stats */}
            <div className="relative">
                <FadeIn delay={200} direction="left">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Card 1 */}
                        <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-brand-yellow/30 transition-all duration-500 group cursor-default">
                            <div className="flex justify-between items-start mb-4">
                                <Zap className="text-brand-yellow" size={32} />
                                <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">01</span>
                            </div>
                            <h4 className="text-xl font-bold text-white uppercase mb-2">Tốc Độ & Hiệu Suất</h4>
                            <p className="text-gray-500 text-sm">Triển khai thần tốc. Tối ưu hóa từng đồng chi phí với công nghệ AI Tracking độc quyền.</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-brand-yellow/30 transition-all duration-500 group cursor-default ml-0 md:ml-12">
                            <div className="flex justify-between items-start mb-4">
                                <Target className="text-blue-500" size={32} />
                                <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">02</span>
                            </div>
                            <h4 className="text-xl font-bold text-white uppercase mb-2">Chiến Lược May Đo</h4>
                            <p className="text-gray-500 text-sm">Không rập khuôn. Mỗi doanh nghiệp là một bài toán riêng biệt với lời giải độc bản.</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-brand-yellow/30 transition-all duration-500 group cursor-default">
                            <div className="flex justify-between items-start mb-4">
                                <Globe className="text-green-500" size={32} />
                                <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">03</span>
                            </div>
                            <h4 className="text-xl font-bold text-white uppercase mb-2">Tư Duy Toàn Cầu</h4>
                            <p className="text-gray-500 text-sm">Áp dụng tiêu chuẩn quốc tế vào thị trường nội địa để tạo lợi thế cạnh tranh tuyệt đối.</p>
                        </div>
                    </div>
                </FadeIn>
            </div>

        </div>
      </div>
    </section>
  );
};

export default About;
