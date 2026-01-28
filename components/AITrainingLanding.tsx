
import React from 'react';
import { 
  BrainCircuit, Users, Zap, TrendingUp, 
  MessageSquare, PenTool, Settings, Code2, 
  CheckCircle2, Clock, Award, BookOpen, 
  Video, Monitor, ArrowRight, Sparkles, Target
} from 'lucide-react';
import FadeIn from './FadeIn';
import MagneticButton from './MagneticButton';

interface AITrainingLandingProps {
  onCtaClick?: () => void;
}

const AITrainingLanding: React.FC<AITrainingLandingProps> = ({ onCtaClick }) => {
  
  const scrollToPrograms = () => {
    document.getElementById('ai-programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION: BRAIN POWER */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center border-b border-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
                <BrainCircuit size={14} /> AI Workforce Transformation
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-[1.1]">
                Trang Bị <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-brand-yellow">
                    Năng Lực AI
                </span> Cho Đội Ngũ
            </h1>
            
            <p className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Đừng để AI thay thế nhân sự của bạn. Hãy để nhân sự của bạn <strong className="text-white">làm chủ AI</strong> để tăng năng suất gấp 10 lần.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <MagneticButton>
                    <button 
                        onClick={scrollToPrograms}
                        className="bg-brand-yellow text-black font-black uppercase py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all flex items-center gap-2"
                    >
                        Xem Chương Trình Đào Tạo <ArrowRight size={18}/>
                    </button>
                </MagneticButton>
                <button 
                    onClick={onCtaClick}
                    className="px-8 py-4 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors font-bold uppercase text-sm tracking-wider"
                >
                    Tư vấn doanh nghiệp
                </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. WHY IN-HOUSE TRAINING? */}
      <section className="py-24 px-6 relative border-b border-gray-900 bg-gray-900/20">
        <div className="container mx-auto">
            <FadeIn>
                <div className="text-center mb-16">
                    <h2 className="text-purple-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">The New Standard</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Tại Sao Cần <span className="text-gray-700">Đào Tạo Inhouse?</span>
                    </h3>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: Zap, title: "Tăng Năng Suất", desc: "Giảm thời gian xử lý các tác vụ lặp lại từ hàng giờ xuống còn vài phút." },
                    { icon: Target, title: "Giảm Phụ Thuộc", desc: "Nhân viên tự chủ động xử lý công việc, không cần chờ đợi IT hay Agency." },
                    { icon: TrendingUp, title: "Lợi Thế Cạnh Tranh", desc: "Doanh nghiệp có đội ngũ thành thạo AI sẽ luôn đi trước đối thủ một bước." },
                    { icon: CheckCircle2, title: "Tiết Kiệm Chi Phí", desc: "Cắt giảm chi phí thuê ngoài (Outsource) nhờ nâng cao năng lực nội bộ." }
                ].map((item, idx) => (
                    <FadeIn key={idx} delay={idx * 100} direction="up">
                        <div className="bg-black border border-gray-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all group h-full">
                            <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-gray-400 mb-6 group-hover:text-purple-400 group-hover:bg-purple-900/20 transition-all">
                                <item.icon size={28} />
                            </div>
                            <h4 className="text-xl font-bold text-white uppercase mb-3">{item.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* 3. TRAINING PROGRAMS */}
      <section id="ai-programs" className="py-24 px-6 relative">
        <div className="container mx-auto">
            <FadeIn>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-700 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <BookOpen size={12} /> Curriculum
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Các Chương Trình <span className="text-brand-yellow">Đào Tạo</span>
                    </h3>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Program 1: Foundation */}
                <FadeIn delay={100} className="md:col-span-2">
                    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 font-black text-9xl text-white select-none">01</div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-1/3">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                                    <Sparkles size={32} />
                                </div>
                                <h4 className="text-2xl font-black text-white uppercase mb-2">AI Foundations</h4>
                                <p className="text-blue-400 font-bold text-sm uppercase tracking-wide mb-4">Nền Tảng AI Cho Mọi Nhân Viên</p>
                                <p className="text-gray-400 text-sm mb-6">Khóa học nhập môn giúp toàn bộ nhân sự hiểu đúng và bắt đầu ứng dụng AI vào công việc văn phòng hàng ngày.</p>
                                <div className="text-xs font-mono text-gray-500 border-t border-gray-800 pt-4">
                                    <p>Thời lượng: 4 giờ</p>
                                    <p>Chi phí: 8.000.000 VNĐ / lớp</p>
                                </div>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Hiểu đúng tư duy & cách AI vận hành",
                                    "Làm quen: ChatGPT, Claude, Gemini, Copilot",
                                    "Kỹ thuật Prompting cơ bản (Ra lệnh cho AI)",
                                    "Soạn thảo Email, Báo cáo, Dịch thuật",
                                    "Tóm tắt tài liệu & Brainstorm ý tưởng",
                                    "Thực hành bài tập thực tế tại lớp"
                                ].map((pt, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-gray-800/30 p-3 rounded-lg border border-white/5">
                                        <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-300">{pt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Program 2: Marketing */}
                <FadeIn delay={200} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-pink-500/50 transition-all group h-full flex flex-col">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 mb-4 border border-pink-500/20">
                                <PenTool size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase mb-1">AI For Marketing & Content</h4>
                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wide">Dành cho: Marketing, Social, Brand Team</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {[
                                "Quy trình sáng tạo Content với AI",
                                "Viết Blog, Social Post, Script Video thần tốc",
                                "Tạo hình ảnh với Midjourney/DALL-E",
                                "Nghiên cứu đối thủ & Phân tích Trend",
                                "Xây dựng Content Calendar tự động"
                            ].map((pt, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                    <CheckCircle2 size={16} className="text-pink-500 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-500">
                            <span>8 giờ (2 buổi)</span>
                            <span className="text-pink-400 font-bold">15.000.000 VNĐ</span>
                        </div>
                    </div>
                </FadeIn>

                {/* Program 3: Sales */}
                <FadeIn delay={300} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-green-500/50 transition-all group h-full flex flex-col">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-4 border border-green-500/20">
                                <TrendingUp size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase mb-1">AI For Sales & CSKH</h4>
                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wide">Dành cho: Sales, Telesales, Account</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {[
                                "Research khách hàng & Chuẩn bị kịch bản sale",
                                "Cá nhân hóa Email/Tin nhắn chào hàng",
                                "Xử lý từ chối (Objection Handling) với AI",
                                "Tóm tắt cuộc họp & Ghi chú CRM",
                                "Xây dựng thư viện Prompt cho Sales"
                            ].map((pt, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                    <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-500">
                            <span>6 giờ (2 buổi)</span>
                            <span className="text-green-400 font-bold">12.000.000 VNĐ</span>
                        </div>
                    </div>
                </FadeIn>

                {/* Program 4: Operations */}
                <FadeIn delay={400} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-brand-yellow/50 transition-all group h-full flex flex-col">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-brand-yellow/10 rounded-xl flex items-center justify-center text-brand-yellow mb-4 border border-brand-yellow/20">
                                <Settings size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase mb-1">AI For Operations</h4>
                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wide">Dành cho: HR, Admin, Kế toán, Back-office</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {[
                                "Tự động hóa xử lý văn bản & tài liệu",
                                "Phân tích dữ liệu & Tạo báo cáo Excel",
                                "Soạn thảo quy trình, chính sách nhân sự",
                                "Quản lý dự án & Theo dõi tiến độ",
                                "Kết hợp AI với Excel/Google Sheets"
                            ].map((pt, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                    <CheckCircle2 size={16} className="text-brand-yellow shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-500">
                            <span>6 giờ (2 buổi)</span>
                            <span className="text-brand-yellow font-bold">12.000.000 VNĐ</span>
                        </div>
                    </div>
                </FadeIn>

                {/* Program 5: Advanced */}
                <FadeIn delay={500} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all group h-full flex flex-col">
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                                <Code2 size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase mb-1">AI Power User (Nâng Cao)</h4>
                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wide">Dành cho: Nhân sự nòng cốt, Quản lý</p>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            {[
                                "Kỹ thuật Prompting nâng cao (Chain-of-thought)",
                                "Xây dựng Custom GPTs / AI Agents riêng",
                                "Workflow Automation (Zapier/Make + AI)",
                                "Phân tích dữ liệu lớn & Insight doanh nghiệp",
                                "Kiểm soát rủi ro & Bảo mật dữ liệu"
                            ].map((pt, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                    <CheckCircle2 size={16} className="text-purple-500 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4 border-t border-gray-800 flex justify-between items-center text-xs font-mono text-gray-500">
                            <span>12 giờ (3 buổi)</span>
                            <span className="text-purple-400 font-bold">25.000.000 VNĐ</span>
                        </div>
                    </div>
                </FadeIn>

            </div>
        </div>
      </section>

      {/* 4. PACKAGES & DELIVERY */}
      <section className="py-24 px-6 bg-black relative border-t border-gray-900">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  
                  {/* Left: Pricing Table */}
                  <div className="lg:col-span-2">
                      <FadeIn>
                        <h3 className="text-2xl font-black text-white uppercase mb-8">Gói Đào Tạo Doanh Nghiệp</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider">
                                        <th className="p-4 rounded-tl-lg">Gói</th>
                                        <th className="p-4">Nội Dung</th>
                                        <th className="p-4">Thời Lượng</th>
                                        <th className="p-4 rounded-tr-lg text-right">Chi Phí</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-bold text-white">Starter</td>
                                        <td className="p-4 text-gray-400">AI Foundations (Toàn công ty)</td>
                                        <td className="p-4 text-gray-400">4 giờ</td>
                                        <td className="p-4 text-right font-bold text-brand-yellow">8.000.000 đ</td>
                                    </tr>
                                    <tr className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-bold text-white">Professional</td>
                                        <td className="p-4 text-gray-400">Foundations + 1 Module Chuyên Sâu</td>
                                        <td className="p-4 text-gray-400">10-12 giờ</td>
                                        <td className="p-4 text-right font-bold text-brand-yellow">18.000.000 đ</td>
                                    </tr>
                                    <tr className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                                        <td className="p-4 font-bold text-white">Enterprise</td>
                                        <td className="p-4 text-gray-400">Foundations + 2 Module + Power User</td>
                                        <td className="p-4 text-gray-400">24-30 giờ</td>
                                        <td className="p-4 text-right font-bold text-brand-yellow">Liên Hệ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                      </FadeIn>
                  </div>

                  {/* Right: Benefits & Format */}
                  <div className="lg:col-span-1 space-y-8">
                      <FadeIn delay={200}>
                          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                              <h4 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><Monitor size={18} className="text-blue-400"/> Hình Thức Đào Tạo</h4>
                              <ul className="space-y-3 text-sm text-gray-400">
                                  <li className="flex items-start gap-2"><span className="text-white font-bold">• Onsite:</span> Giảng viên đến trực tiếp văn phòng (Nhóm >8 người).</li>
                                  <li className="flex items-start gap-2"><span className="text-white font-bold">• Online:</span> Qua Zoom/Meet, linh hoạt thời gian.</li>
                                  <li className="flex items-start gap-2"><span className="text-white font-bold">• Hybrid:</span> Kết hợp theo yêu cầu.</li>
                              </ul>
                          </div>
                      </FadeIn>

                      <FadeIn delay={300}>
                          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                              <h4 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><Award size={18} className="text-brand-yellow"/> Quyền Lợi Học Viên</h4>
                              <div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
                                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-yellow"/> Slide bài giảng</div>
                                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-yellow"/> Bộ Prompt Template</div>
                                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-yellow"/> Video Recap</div>
                                  <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-yellow"/> Chứng nhận</div>
                                  <div className="col-span-2 flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-yellow"/> Support group 2 tuần sau học</div>
                              </div>
                          </div>
                      </FadeIn>
                  </div>

              </div>
          </div>
      </section>

      {/* 5. PROCESS & WHY US */}
      <section className="py-24 px-6">
          <div className="container mx-auto">
              <FadeIn>
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-white uppercase mb-4">Quy Trình Triển Khai</h3>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-sm text-gray-400">
                        <div className="px-6 py-3 bg-gray-900 rounded-full border border-gray-800">1. Khảo sát nhu cầu</div>
                        <ArrowRight className="hidden md:block text-gray-600" size={16} />
                        <div className="px-6 py-3 bg-gray-900 rounded-full border border-gray-800">2. Thiết kế chương trình</div>
                        <ArrowRight className="hidden md:block text-gray-600" size={16} />
                        <div className="px-6 py-3 bg-gray-900 rounded-full border border-gray-800 text-brand-yellow border-brand-yellow">3. Triển khai đào tạo</div>
                        <ArrowRight className="hidden md:block text-gray-600" size={16} />
                        <div className="px-6 py-3 bg-gray-900 rounded-full border border-gray-800">4. Đánh giá & Support</div>
                    </div>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
                  <FadeIn delay={100} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center text-brand-yellow mb-4 border border-gray-800">
                          <Target size={32} />
                      </div>
                      <h4 className="text-white font-bold mb-2">Thực Chiến 70%</h4>
                      <p className="text-xs text-gray-500">Tập trung thực hành trên case study thật của doanh nghiệp.</p>
                  </FadeIn>
                  <FadeIn delay={200} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center text-blue-500 mb-4 border border-gray-800">
                          <Users size={32} />
                      </div>
                      <h4 className="text-white font-bold mb-2">Giảng Viên Expert</h4>
                      <p className="text-xs text-gray-500">Có kinh nghiệm triển khai AI vào business thực tế.</p>
                  </FadeIn>
                  <FadeIn delay={300} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center text-green-500 mb-4 border border-gray-800">
                          <Zap size={32} />
                      </div>
                      <h4 className="text-white font-bold mb-2">Cập Nhật Liên Tục</h4>
                      <p className="text-xs text-gray-500">Giáo trình update theo công nghệ mới nhất hàng tuần.</p>
                  </FadeIn>
                  <FadeIn delay={400} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center text-purple-500 mb-4 border border-gray-800">
                          <Settings size={32} />
                      </div>
                      <h4 className="text-white font-bold mb-2">May Đo Riêng</h4>
                      <p className="text-xs text-gray-500">Customize nội dung phù hợp với từng phòng ban.</p>
                  </FadeIn>
              </div>
          </div>
      </section>

      {/* 6. STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-t border-gray-800 py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
              <div className="hidden md:block">
                  <span className="text-white font-bold uppercase text-sm">Đầu tư vào năng lực AI hôm nay?</span>
                  <span className="text-gray-500 text-xs ml-2">Thu hoạch năng suất & lợi thế cạnh tranh ngày mai.</span>
              </div>
              <button 
                onClick={onCtaClick}
                className="w-full md:w-auto bg-brand-yellow text-black font-black uppercase py-3 px-8 rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                  Đăng Ký Tư Vấn Đào Tạo <ArrowRight size={16}/>
              </button>
          </div>
      </div>
      <div className="h-24"></div>

    </div>
  );
};

export default AITrainingLanding;
