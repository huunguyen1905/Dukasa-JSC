
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, CheckCircle, Users, ExternalLink } from 'lucide-react';
import FadeIn from './FadeIn';
import { createLead } from '../services/supabaseService';
import { Lead } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Combine into details string
    const combinedDetails = `
      Nguồn: Form Liên Hệ (Footer Section)
      Lời nhắn: ${formData.message}
    `;

    try {
        const newLead: Lead = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            details: combinedDetails,
            createdAt: new Date().toISOString()
        };

        await createLead(newLead);
        
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
        console.error("Lỗi gửi form:", error);
        alert(`Có lỗi xảy ra: ${error.message || 'Vui lòng thử lại sau.'}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <section id="lien-he" className="bg-brand-black py-24 border-t border-gray-800 relative">
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="mb-16">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Liên Hệ Hợp Tác</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Bắt Đầu <span className="text-gray-600">Dự Án Mới</span>
                </h3>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN: The Simplified Form */}
            <div className="lg:col-span-7">
                <FadeIn delay={100}>
                    {isSuccess ? (
                        <div className="bg-gray-900 border border-brand-yellow/30 rounded-2xl p-12 text-center animate-in zoom-in duration-300 shadow-[0_0_50px_rgba(250,204,21,0.1)]">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 ring-1 ring-green-500/30">
                                <CheckCircle size={40} />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2">Đã Gửi Thành Công!</h4>
                            <p className="text-gray-400">Cảm ơn bạn đã tin tưởng DUHAVA. Bộ phận chiến lược sẽ liên hệ lại trong vòng 30 phút làm việc.</p>
                            <button 
                                onClick={() => setIsSuccess(false)}
                                className="mt-8 text-brand-yellow font-bold hover:underline"
                            >
                                Gửi yêu cầu khác
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900/20 p-8 rounded-3xl border border-gray-800/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group relative">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1 group-focus-within:text-brand-yellow transition-colors duration-300">Họ và Tên *</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 focus:outline-none transition-all duration-300 text-base placeholder-gray-600"
                                        placeholder="Tên của bạn"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1 group-focus-within:text-brand-yellow transition-colors duration-300">Số Điện Thoại *</label>
                                    <input 
                                        required
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 focus:outline-none transition-all duration-300 text-base placeholder-gray-600"
                                        placeholder="090..."
                                    />
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1 group-focus-within:text-brand-yellow transition-colors duration-300">Email Doanh Nghiệp *</label>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 focus:outline-none transition-all duration-300 text-base placeholder-gray-600"
                                    placeholder="name@company.com"
                                    name="email_contact_duhava"
                                />
                            </div>

                            <div className="group relative">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1 group-focus-within:text-brand-yellow transition-colors duration-300">Lời Nhắn (Tùy chọn)</label>
                                <textarea 
                                    rows={4}
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow/50 focus:outline-none transition-all duration-300 text-base placeholder-gray-600 resize-none"
                                    placeholder="Mô tả sơ lược nhu cầu của bạn..."
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`
                                    w-full bg-brand-yellow text-black font-black uppercase py-4 md:py-5 rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2
                                    ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]'}
                                `}
                            >
                                {isSubmitting ? 'Đang Xử Lý...' : 'Gửi Yêu Cầu Tư Vấn'} <Send size={18} />
                            </button>
                        </form>
                    )}
                </FadeIn>
            </div>

            {/* RIGHT COLUMN: Info & Map */}
            <div className="lg:col-span-5 flex flex-col gap-8">
                <FadeIn delay={200} direction="left">
                    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl">
                        <h4 className="text-xl font-bold text-white mb-6 uppercase border-b border-gray-800 pb-4">Thông Tin Liên Hệ</h4>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">Trụ Sở Chính</div>
                                    <p className="text-gray-300 font-medium">Tầng 72, Landmark 81, Vinhomes Central Park, TP. Hồ Chí Minh</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">Hotline (24/7)</div>
                                    <p className="text-white font-black text-xl">0906 291 941</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">Email Hợp Tác</div>
                                    <p className="text-gray-300 font-medium">duhavajsc@gmail.com</p>
                                </div>
                            </div>

                            <a href="https://www.facebook.com/groups/1342038416404962" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group bg-brand-yellow/5 p-4 rounded-xl border border-brand-yellow/10 hover:bg-brand-yellow/10 transition-colors">
                                <div className="w-10 h-10 bg-brand-yellow/20 rounded flex items-center justify-center text-brand-yellow">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <div className="text-brand-yellow text-xs font-bold uppercase mb-1 flex items-center gap-1">
                                        Cộng Đồng AI Việt Nam <ExternalLink size={10}/>
                                    </div>
                                    <p className="text-white font-black text-lg">300.000+ <span className="text-sm font-medium text-gray-400">Thành viên</span></p>
                                </div>
                            </a>

                             <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <div className="text-gray-500 text-xs font-bold uppercase mb-1">Giờ Làm Việc</div>
                                    <p className="text-gray-300 font-medium">Thứ 2 - Thứ 6: 08:30 - 18:00</p>
                                    <p className="text-gray-500 text-sm">Thứ 7: 08:30 - 12:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={300} direction="left" className="flex-1 min-h-[300px]">
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-800 relative group">
                        {/* Dark Mode Overlay for Map */}
                        <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/10 pointer-events-none z-10 transition-colors duration-300 border-4 border-transparent group-hover:border-brand-yellow/50 rounded-2xl box-border"></div>
                        
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.143763784112!2d106.71963237583863!3d10.799307758752256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a459cb43ab%3A0x6c3d29d370b52a7e!2sLandmark%2081!5e0!3m2!1sen!2s!4v1710323348123!5m2!1sen!2s" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Map"
                        ></iframe>
                    </div>
                </FadeIn>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
