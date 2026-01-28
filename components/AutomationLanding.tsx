
import React from 'react';
import { 
  Workflow, Zap, Repeat, Clock, CheckCircle2, 
  ArrowRight, GitMerge, Layers, Database, 
  MessageSquare, ShoppingCart, UserCheck, 
  Settings, RefreshCw, Server, MousePointer,
  PlayCircle, GitPullRequest, ShieldCheck
} from 'lucide-react';
import FadeIn from './FadeIn';
import MagneticButton from './MagneticButton';

interface AutomationLandingProps {
  onCtaClick?: () => void;
}

const AutomationLanding: React.FC<AutomationLandingProps> = ({ onCtaClick }) => {
  
  const scrollToPricing = () => {
    document.getElementById('auto-pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION: UNLEASH THE TEAM */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center border-b border-gray-900 overflow-hidden">
        {/* Background Flows */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        {/* Animated Connector Line */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent opacity-30"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent opacity-30 delay-700"></div>

        <div className="container mx-auto relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-900/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
                <Workflow size={14} /> Workflow Automation
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-[1.1]">
                Giải Phóng <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-brand-yellow">
                    Đội Ngũ Nhân Sự
                </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Đừng để nhân tài của bạn làm việc của cái máy. <br/>
                Chúng tôi <strong className="text-white">tự động hóa những việc lặp lại</strong> để họ tập trung vào những việc thực sự quan trọng.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <MagneticButton>
                    <button 
                        onClick={onCtaClick}
                        className="bg-orange-500 text-white font-black uppercase py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all flex items-center gap-2"
                    >
                        Khảo Sát Quy Trình Miễn Phí <ArrowRight size={18}/>
                    </button>
                </MagneticButton>
                <button onClick={scrollToPricing} className="px-8 py-4 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors font-bold uppercase text-sm tracking-wider">
                    Xem Chi Phí
                </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. BENEFITS GRID */}
      <section className="py-24 px-6 relative border-b border-gray-900 bg-gray-900/20">
        <div className="container mx-auto">
            <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[
                        { icon: Clock, label: "Tiết Kiệm Thời Gian", sub: "30p -> 5 giây" },
                        { icon: ShieldCheck, label: "Giảm Sai Sót", sub: "Máy không quên" },
                        { icon: Zap, label: "Tăng Tốc Độ", sub: "Phản hồi 24/7" },
                        { icon: GitMerge, label: "Scale Không Giới Hạn", sub: "10 hay 10k đơn" },
                        { icon: UserCheck, label: "Giải Phóng Nhân Sự", sub: "Tập trung sáng tạo" },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-black border border-gray-800 p-6 rounded-2xl text-center group hover:border-orange-500/30 transition-colors">
                            <div className="w-12 h-12 mx-auto bg-gray-900 rounded-full flex items-center justify-center text-gray-400 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors mb-4">
                                <item.icon size={20} />
                            </div>
                            <h4 className="text-white font-bold text-sm uppercase mb-1">{item.label}</h4>
                            <p className="text-gray-500 text-xs">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </div>
      </section>

      {/* 3. DOMAINS OF AUTOMATION */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
            <FadeIn>
                <div className="text-center mb-16">
                    <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">Scope of Work</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Các Lĩnh Vực <span className="text-gray-700">Tự Động Hóa</span>
                    </h3>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 1. Marketing */}
                <FadeIn delay={100} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-orange-500/50 transition-all group h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 border border-orange-500/20">
                                <MegaphoneIcon />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase">Marketing & Lead Gen</h4>
                                <p className="text-gray-500 text-xs">Không để lọt lưới bất kỳ khách hàng nào</p>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {[
                                "Tự động nurture lead (Email/Zalo sequence)",
                                "Đồng bộ lead Facebook/Google về CRM",
                                "Tự động post & schedule content đa kênh",
                                "Báo cáo marketing tự động hàng ngày"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                                    <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

                {/* 2. Sales */}
                <FadeIn delay={200} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all group h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                                <ShoppingCart size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase">Sales & CRM</h4>
                                <p className="text-gray-500 text-xs">Chốt deal nhanh hơn, chăm sóc kỹ hơn</p>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {[
                                "Tự động chia lead (Round-robin) cho Sales",
                                "Nhắc nhở Sales follow-up đúng lịch",
                                "Gửi báo giá/Hợp đồng tự động khi chốt deal",
                                "Cập nhật trạng thái Deal theo thời gian thực"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

                {/* 3. Operations */}
                <FadeIn delay={300} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-green-500/50 transition-all group h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 border border-green-500/20">
                                <Settings size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase">Vận Hành (Ops)</h4>
                                <p className="text-gray-500 text-xs">Trơn tru, chính xác, không ma sát</p>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {[
                                "Xử lý đơn hàng: Invoice -> Kho -> Ship",
                                "Đồng bộ tồn kho đa sàn TMĐT",
                                "Quy trình duyệt chi/nghỉ phép tự động",
                                "Báo cáo doanh thu P&L tự động về Sếp"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                                    <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

                {/* 4. Customer Service */}
                <FadeIn delay={400} className="h-full">
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-brand-yellow/50 transition-all group h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-brand-yellow/10 rounded-xl flex items-center justify-center text-brand-yellow border border-brand-yellow/20">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase">CSKH & Support</h4>
                                <p className="text-gray-500 text-xs">Phản hồi tức thì, hài lòng tối đa</p>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {[
                                "Auto-reply thông minh ngoài giờ làm việc",
                                "Phân loại Ticket gửi đúng bộ phận",
                                "Gửi SMS/Email cập nhật trạng thái đơn hàng",
                                "Tự động gửi Survey lấy feedback sau mua"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300">
                                    <CheckCircle2 size={16} className="text-brand-yellow shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

            </div>
        </div>
      </section>

      {/* 4. CASE STUDY: BEFORE & AFTER */}
      <section className="py-24 px-6 bg-black border-y border-gray-900">
          <div className="container mx-auto">
              <FadeIn>
                <h3 className="text-3xl font-black text-white uppercase mb-16 text-center">Ví Dụ Thực Tế</h3>
              </FadeIn>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {[
                      {
                          case: "Quy Trình Xử Lý Lead",
                          before: "Nhân viên xuất file Excel từ Facebook Ads, copy vào CRM, gửi email thủ công cho Sales. Mất 30 phút/ngày.",
                          after: "Lead từ Ads tự động đổ về CRM, chia ngay cho Sales, Sales nhận thông báo Zalo tức thì. Mất 0 phút.",
                          timeSaved: "Tiết kiệm 15h/tháng"
                      },
                      {
                          case: "Báo Cáo Doanh Thu",
                          before: "Kế toán mất 2 tiếng mỗi sáng để tổng hợp số liệu từ Web, Shopee, Lazada và cửa hàng để gửi báo cáo.",
                          after: "7:00 AM mỗi sáng, Sếp nhận tin nhắn báo cáo tự động với đầy đủ biểu đồ doanh thu đa kênh.",
                          timeSaved: "Tiết kiệm 60h/tháng"
                      },
                      {
                          case: "Chăm Sóc Sau Bán",
                          before: "Khách mua xong phải chờ nhân viên check đơn, soạn tin nhắn xác nhận. Phản hồi chậm nếu ngoài giờ.",
                          after: "Khách đặt -> Nhận Zalo xác nhận ngay -> Cập nhật vận chuyển -> Nhận voucher khi hoàn thành.",
                          timeSaved: "Tăng 20% khách quay lại"
                      }
                  ].map((item, idx) => (
                      <FadeIn key={idx} delay={idx * 100}>
                          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden h-full flex flex-col">
                              <div className="p-6 border-b border-gray-800 bg-gray-800/50">
                                  <h4 className="text-lg font-bold text-white">{item.case}</h4>
                              </div>
                              <div className="p-6 flex-1 flex flex-col gap-4">
                                  <div className="bg-red-900/10 border border-red-900/30 p-4 rounded-xl">
                                      <span className="text-red-500 text-xs font-bold uppercase mb-1 block">Trước (Thủ công)</span>
                                      <p className="text-gray-400 text-sm line-through decoration-red-500/50">{item.before}</p>
                                  </div>
                                  <div className="bg-green-900/10 border border-green-900/30 p-4 rounded-xl flex-1">
                                      <span className="text-green-500 text-xs font-bold uppercase mb-1 block">Sau (Tự động hóa)</span>
                                      <p className="text-gray-200 text-sm">{item.after}</p>
                                  </div>
                              </div>
                              <div className="p-4 bg-orange-500/10 border-t border-orange-500/20 text-center">
                                  <span className="text-orange-500 font-bold text-sm uppercase flex items-center justify-center gap-2">
                                      <Zap size={14} fill="currentColor"/> {item.timeSaved}
                                  </span>
                              </div>
                          </div>
                      </FadeIn>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. IMPLEMENTATION PROCESS */}
      <section className="py-24 px-6 relative">
          <div className="container mx-auto">
              <FadeIn>
                <h3 className="text-3xl font-black text-white uppercase mb-16 text-center">Quy Trình Triển Khai</h3>
              </FadeIn>

              <div className="space-y-8 max-w-4xl mx-auto">
                  {[
                      { step: "01", title: "Khảo Sát & Mapping", desc: "Phỏng vấn nhân sự, vẽ sơ đồ quy trình hiện tại, tìm điểm nghẽn.", price: "3 - 5 Tr VNĐ" },
                      { step: "02", title: "Thiết Kế Blueprint", desc: "Lên Logic Automation chi tiết (Trigger -> Action), xử lý ngoại lệ.", price: "2 - 4 Tr VNĐ" },
                      { step: "03", title: "Xây Dựng & Kiểm Thử", desc: "Build trên Zapier/Make/n8n, kết nối API, test các kịch bản lỗi.", price: "5 - 15 Tr VNĐ/flow" },
                      { step: "04", title: "Go-live & Chuyển Giao", desc: "Triển khai thực tế, đào tạo nhân sự, bàn giao tài liệu hướng dẫn.", price: "2 - 3 Tr VNĐ" }
                  ].map((item, idx) => (
                      <FadeIn key={idx} delay={idx * 100} direction="right">
                          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-gray-900/30 border border-gray-800 p-6 rounded-2xl hover:bg-gray-900 transition-colors group">
                              <div className="text-4xl font-black text-gray-800 group-hover:text-orange-500 transition-colors font-mono">{item.step}</div>
                              <div className="flex-1">
                                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                  <p className="text-gray-400 text-sm">{item.desc}</p>
                              </div>
                              <div className="text-right shrink-0">
                                  <span className="text-xs text-gray-500 uppercase font-bold block mb-1">Chi phí ước tính</span>
                                  <span className="text-orange-400 font-bold">{item.price}</span>
                              </div>
                          </div>
                      </FadeIn>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. TECH STACK */}
      <section className="py-16 border-t border-gray-900 bg-black text-center">
          <div className="container mx-auto px-6">
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">Nền Tảng Chúng Tôi Sử Dụng</p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Text representation for logos since we don't have images */}
                  <span className="text-2xl font-black text-white">Make</span>
                  <span className="text-2xl font-black text-orange-500">Zapier</span>
                  <span className="text-2xl font-black text-red-500">n8n</span>
                  <span className="text-2xl font-black text-blue-500">Power Automate</span>
                  <span className="text-2xl font-black text-green-500">Google Script</span>
              </div>
          </div>
      </section>

      {/* 7. PRICING PACKAGES */}
      <section id="auto-pricing" className="py-24 px-6 border-t border-gray-900">
          <div className="container mx-auto">
              <FadeIn>
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-white uppercase mb-4">Gói Dịch Vụ</h3>
                    <p className="text-gray-400 text-sm">Chi phí linh hoạt theo quy mô và độ phức tạp.</p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  <div className="bg-gray-900/20 border border-gray-800 p-8 rounded-2xl flex flex-col">
                      <h4 className="text-xl font-black text-white uppercase mb-2">Starter</h4>
                      <div className="text-2xl font-bold text-orange-500 mb-6">10 - 15tr <span className="text-xs text-gray-500 font-normal">VNĐ</span></div>
                      <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-400">
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-gray-500"/> 1-2 Automation đơn giản</li>
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-gray-500"/> Tích hợp 2-3 ứng dụng</li>
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-gray-500"/> Bàn giao tài liệu cơ bản</li>
                      </ul>
                      <button onClick={onCtaClick} className="w-full py-3 border border-gray-700 text-white rounded-xl font-bold text-sm hover:bg-white hover:text-black transition-all">Tư Vấn</button>
                  </div>

                  <div className="bg-gray-900/60 border border-orange-500 p-8 rounded-2xl flex flex-col relative transform md:scale-105 shadow-2xl">
                      <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                      <h4 className="text-xl font-black text-white uppercase mb-2">Business</h4>
                      <div className="text-2xl font-bold text-orange-500 mb-6">25 - 40tr <span className="text-xs text-gray-500 font-normal">VNĐ</span></div>
                      <ul className="space-y-3 mb-8 flex-1 text-sm text-white">
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> 3-5 Automation phức tạp</li>
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> Tích hợp 4-6 ứng dụng</li>
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> Xử lý lỗi (Error Handling)</li>
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-orange-500"/> Support 1 tháng sau Go-live</li>
                      </ul>
                      <button onClick={onCtaClick} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-white hover:text-black transition-all">Tư Vấn Gói Này</button>
                  </div>

                  <div className="bg-gray-900/20 border border-gray-800 p-8 rounded-2xl flex flex-col">
                      <h4 className="text-xl font-black text-white uppercase mb-2">Enterprise</h4>
                      <div className="text-2xl font-bold text-orange-500 mb-6">Liên Hệ</div>
                      <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-400">
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Hệ thống toàn diện</li>
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Custom Code / API riêng</li>
                          <li className="flex gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Tích hợp không giới hạn</li>
                      </ul>
                      <button onClick={onCtaClick} className="w-full py-3 border border-gray-700 text-white rounded-xl font-bold text-sm hover:bg-blue-500 hover:border-blue-500 transition-all">Liên Hệ</button>
                  </div>
              </div>
          </div>
      </section>

      {/* 8. STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-t border-gray-800 py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
              <div className="hidden md:block">
                  <span className="text-white font-bold uppercase text-sm">Để máy làm việc của máy?</span>
                  <span className="text-gray-500 text-xs ml-2">Còn con người tập trung vào việc của con người.</span>
              </div>
              <button 
                onClick={onCtaClick}
                className="w-full md:w-auto bg-orange-500 text-white font-black uppercase py-3 px-8 rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              >
                  <PlayCircle size={16}/> Đăng Ký Khảo Sát
              </button>
          </div>
      </div>
      <div className="h-24"></div>

    </div>
  );
};

// Simple Icon Helper
const MegaphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
);

export default AutomationLanding;
