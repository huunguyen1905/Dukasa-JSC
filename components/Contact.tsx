
import React from 'react';
import { MapPin, Phone, Mail, ArrowUpRight, Clock, Globe, MessageSquare } from 'lucide-react';
import FadeIn from './FadeIn';

const Contact: React.FC = () => {
  // Trigger global modal open (assuming standard button interaction)
  const openGlobalModal = () => {
      const btn = document.querySelector('button[aria-label="Nhận Tư Vấn"]') as HTMLButtonElement; // Fallback trigger
      if(btn) btn.click();
      // Or if you have a custom event/ID
      const trigger = document.getElementById('contact-trigger');
      if(trigger) trigger.click();
  };

  return (
    <section id="lien-he" className="relative min-h-[85vh] flex items-center py-20 overflow-hidden bg-black group">
      
      {/* 1. FULL SCREEN CINEMATIC MAP */}
      <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.326746200236!2d106.690553314749!3d10.78626699231494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d2d6c06a7f%3A0x634260d1396c429d!2zOCBUaOG6oWNoIFRo4buLIFRoYW5oLCBUw6JuIMSQ4buLbmgsIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s"
            width="100%" 
            height="100%" 
            style={{ 
                border: 0, 
                filter: 'grayscale(100%) invert(100%) contrast(80%) brightness(0.7)' 
            }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Map"
            className="w-full h-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 ease-in-out"
        ></iframe>
        
        {/* Cinematic Vignette Overlay to blend map with site */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: Contact Info Panel */}
            <div className="lg:col-span-6">
                <FadeIn>
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                            <Globe size={12} className="animate-spin-slow" />
                            <span>Global Headquarters</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                            Kết Nối <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">Với DUHAVA</span>
                        </h2>
                        {/* High Contrast Description Box */}
                        <div className="bg-black/80 border-l-4 border-brand-yellow p-6 rounded-r-xl backdrop-blur-md">
                            <p className="text-white text-lg leading-relaxed font-medium">
                                Sẵn sàng cho cú hích tăng trưởng? Ghé thăm văn phòng của chúng tôi hoặc đặt lịch tư vấn trực tuyến ngay hôm nay.
                            </p>
                        </div>
                    </div>

                    {/* Contact Cards Grid */}
                    <div className="space-y-6">
                        {/* Address Card */}
                        <div className="group bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl hover:border-brand-yellow/50 transition-all duration-300 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-start gap-4 relative z-10">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-yellow shrink-0 group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-black uppercase text-sm tracking-widest mb-2">Văn Phòng Chính</h4>
                                    <p className="text-gray-200 text-base leading-snug font-medium">
                                        Số 8 Thạch Thị Thanh, Phường Tân Định,<br/> Quận 1, TP. Hồ Chí Minh
                                    </p>
                                    <a href="https://maps.app.goo.gl/..." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-black text-brand-yellow mt-4 uppercase tracking-wider hover:text-white transition-colors bg-brand-yellow/10 px-3 py-1.5 rounded-full">
                                        Chỉ đường <ArrowUpRight size={14}/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="tel:0906291941" className="group bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl hover:bg-brand-yellow hover:border-brand-yellow transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden">
                                <div className="flex flex-col h-full justify-between relative z-10">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white mb-4 group-hover:bg-black/20 group-hover:text-black transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1 group-hover:text-black/70">Hotline 24/7</h4>
                                        <p className="text-white font-black text-xl group-hover:text-black">0906 291 941</p>
                                    </div>
                                </div>
                            </a>

                            <a href="mailto:duhavajsc@gmail.com" className="group bg-[#0A0A0A] border border-gray-800 p-6 rounded-2xl hover:bg-white hover:border-white transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden">
                                <div className="flex flex-col h-full justify-between relative z-10">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white mb-4 group-hover:bg-black/10 group-hover:text-black transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1 group-hover:text-black/70">Email Hợp Tác</h4>
                                        <p className="text-white font-bold text-sm truncate group-hover:text-black">duhavajsc@gmail.com</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* RIGHT: Quick Action Glass Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <FadeIn delay={200} direction="left" className="w-full max-w-md">
                    <div className="bg-[#050505] border border-gray-800 p-8 rounded-3xl relative overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        {/* Decor */}
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-yellow/10 rounded-full blur-3xl group-hover:bg-brand-yellow/20 transition-colors"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-white uppercase mb-4">Bạn có dự án mới?</h3>
                            <p className="text-gray-200 text-sm mb-8 leading-relaxed font-medium">
                                Đừng để ý tưởng mãi nằm trên giấy. Hãy chia sẻ với chúng tôi, các chuyên gia của DUHAVA sẽ giúp bạn hiện thực hóa nó.
                            </p>

                            <div className="space-y-4">
                                <button 
                                    onClick={openGlobalModal}
                                    className="w-full py-4 bg-brand-yellow text-black font-black uppercase tracking-wider rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] flex items-center justify-center gap-3"
                                >
                                    <MessageSquare size={18} /> Đăng Ký Tư Vấn
                                </button>
                                
                                <div className="flex items-center justify-center gap-3 text-gray-400 text-xs py-2 bg-gray-900/50 rounded-lg">
                                    <Clock size={14} className="text-brand-yellow" />
                                    <span className="font-bold">Phản hồi nhanh trong vòng 30 phút</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
