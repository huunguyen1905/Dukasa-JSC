import React, { useState } from 'react';
import { Plus, Minus, Search, MessageCircle, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

const allFaqs = [
  {
    category: "General",
    question: "DUHAVA có cam kết KPI doanh số không?",
    answer: "Có. Chúng tôi làm việc dựa trên số liệu thực tế (Data-driven). Trước khi bắt đầu dự án, DUHAVA sẽ ký hợp đồng cam kết các chỉ số KPI rõ ràng (Traffic, Leads, Conversion Rate, Revenue) và chịu trách nhiệm nếu không đạt được mục tiêu."
  },
  {
    category: "Pricing",
    question: "Chi phí dịch vụ được tính như thế nào?",
    answer: "Chúng tôi không áp dụng bảng giá cố định rập khuôn vì mỗi doanh nghiệp có bài toán khác nhau. Chi phí được tính dựa trên Scope of Work (Phạm vi công việc) và mục tiêu tăng trưởng của bạn. Chúng tôi sẽ đề xuất gói giải pháp tối ưu ROI nhất sau buổi Audit đầu tiên."
  },
  {
    category: "Services",
    question: "Thời gian để thấy hiệu quả của chiến dịch SEO?",
    answer: "SEO là cuộc chơi bền vững. Thông thường cần 3-6 tháng để thấy sự tăng trưởng Traffic tự nhiên (Organic) rõ rệt và ổn định. Tuy nhiên, chúng tôi kết hợp với các kênh Paid Ads (Google/Facebook) để bạn có doanh số ngay trong tháng đầu tiên."
  },
  {
    category: "Support",
    question: "Tôi có được xem báo cáo hàng ngày không?",
    answer: "Chắc chắn. Minh bạch là giá trị cốt lõi của DUHAVA. Chúng tôi cung cấp quyền truy cập Dashboard Real-time (thời gian thực). Bạn có thể xem dòng tiền quảng cáo đang chạy đi đâu và hiệu quả ra sao bất cứ lúc nào, trên mọi thiết bị."
  },
  {
    category: "Services",
    question: "DUHAVA có hỗ trợ làm nội dung (Content) không?",
    answer: "Có. Chúng tôi sở hữu đội ngũ Creative & Content In-house. Từ bài viết chuẩn SEO, kịch bản Video Viral TikTok đến thiết kế Key Visual, chúng tôi lo trọn gói để đảm bảo tính nhất quán cho thương hiệu của bạn."
  },
  {
    category: "General",
    question: "Quy trình bảo mật thông tin như thế nào?",
    answer: "Chúng tôi sẵn sàng ký thỏa thuận bảo mật (NDA) trước khi tiếp nhận bất kỳ dữ liệu nào. Dữ liệu khách hàng được lưu trữ trên hệ thống Server riêng biệt, được mã hóa và phân quyền truy cập nghiêm ngặt."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-brand-black py-24 border-t border-gray-800 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
            
            {/* LEFT COLUMN: Sticky Header & Search */}
            <div className="lg:w-1/3">
                <div className="sticky top-32">
                    <FadeIn direction="right">
                        <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">FAQ</h2>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                            Câu Hỏi <span className="text-gray-600">Thường Gặp</span>
                        </h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Giải đáp nhanh những thắc mắc phổ biến nhất về quy trình, chi phí và hiệu quả hợp tác cùng DUHAVA.
                        </p>

                        {/* Search Box */}
                        <div className="relative mb-10 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-gray-500 group-focus-within:text-brand-yellow transition-colors" size={20} />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm câu hỏi (VD: SEO, Chi phí...)" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-700 text-white rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all placeholder-gray-600"
                            />
                        </div>

                        {/* Support CTA Box */}
                        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hidden lg:block">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-yellow">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Vẫn còn thắc mắc?</h4>
                                    <p className="text-gray-500 text-xs">Chat trực tiếp với chuyên gia</p>
                                </div>
                            </div>
                            <button onClick={() => document.getElementById('contact-trigger')?.click()} className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-all font-bold text-sm flex items-center justify-center gap-2">
                                Liên Hệ Hỗ Trợ <ArrowRight size={16}/>
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* RIGHT COLUMN: Accordion List */}
            <div className="lg:w-2/3">
                <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <FadeIn key={index} delay={index * 50} direction="up">
                                <div 
                                    className={`
                                        group border rounded-xl transition-all duration-300 overflow-hidden
                                        ${openIndex === index 
                                            ? 'border-brand-yellow/50 bg-gray-900 shadow-[0_0_30px_rgba(250,204,21,0.05)]' 
                                            : 'border-gray-800 bg-gray-900/20 hover:border-gray-600 hover:bg-gray-900/40'
                                        }
                                    `}
                                >
                                    <button 
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full flex justify-between items-start p-6 text-left focus:outline-none"
                                    >
                                        <div className="pr-8">
                                            {/* Category Tag (Optional visual cue) */}
                                            {/* <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 block">{faq.category}</span> */}
                                            <span className={`text-lg md:text-xl font-bold transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                                {faq.question}
                                            </span>
                                        </div>
                                        <div className={`
                                            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                                            ${openIndex === index ? 'bg-brand-yellow text-black border-brand-yellow rotate-180' : 'border-gray-600 text-gray-400 group-hover:border-white group-hover:text-white'}
                                        `}>
                                            {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                                        </div>
                                    </button>
                                    
                                    <div 
                                        className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-800/50 mt-2 text-base">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))
                    ) : (
                        <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
                            <p className="text-gray-500">Không tìm thấy kết quả cho "{searchQuery}"</p>
                        </div>
                    )}
                </div>

                {/* Mobile CTA (Visible only on small screens) */}
                <div className="mt-8 lg:hidden text-center">
                    <p className="text-gray-400 mb-4 text-sm">Không tìm thấy câu trả lời bạn cần?</p>
                    <button className="bg-brand-yellow text-black font-bold py-3 px-8 rounded-full uppercase tracking-wider text-sm">
                        Liên Hệ Tư Vấn
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Hidden trigger for scroll behavior or modal opening from other components */}
      <div id="contact-trigger" className="hidden" onClick={() => (document.querySelector('button[aria-label="Nhận Tư Vấn"]') as HTMLElement)?.click()}></div>
    </section>
  );
};

export default FAQ;