
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, CheckCircle, Users, ExternalLink, ArrowRight } from 'lucide-react';
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
    <section id="lien-he" className="bg-[#050505] py-32 border-t border-white/5 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[200px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-gray-800 pb-12">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-brand-yellow"></span> Contact Us
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        Khởi Tạo <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Vị Thế Mới.</span>
                    </h3>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                        Sẵn sàng bứt phá? Hãy để lại thông tin, chiến lược gia của DUHAVA sẽ liên hệ trong vòng 30 phút.
                    </p>
                </div>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* LEFT COLUMN: Luxury Minimalist Form */}
            <div className="lg:col-span-7">
                <FadeIn delay={100}>
                    {isSuccess ? (
                        <div className="h-full flex flex-col justify-center items-center text-center p-12 border border-brand-yellow/30 bg-brand-yellow/5 rounded-3xl animate-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                                <CheckCircle size={40} className="text-black" />
                            </div>
                            <h4 className="text-3xl font-black text-white uppercase mb-4 tracking-tight">Yêu Cầu Đã Gửi</h4>
                            <p className="text-gray-400 text-lg mb-8 max-w-md">
                                Cảm ơn bạn đã chọn DUHAVA. Đội ngũ chuyên gia đang phân tích yêu cầu và sẽ phản hồi sớm nhất.
                            </p>
                            <button 
                                onClick={() => setIsSuccess(false)}
                                className="text-brand-yellow font-bold uppercase tracking-widest text-sm border-b border-brand-yellow pb-1 hover:text-white hover:border-white transition-colors"
                            >
                                Gửi yêu cầu khác
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="group relative">
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white text-lg focus:border-brand-yellow focus:outline-none transition-colors placeholder-transparent"
                                        placeholder="Name"
                                        id="name"
                                    />
                                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-500 text-xs uppercase font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-brand-yellow peer-focus:text-xs">
                                        Họ và Tên *
                                    </label>
                                </div>
                                <div className="group relative">
                                    <input 
                                        required
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                        className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white text-lg focus:border-brand-yellow focus:outline-none transition-colors placeholder-transparent"
                                        placeholder="Phone"
                                        id="phone"
                                    />
                                    <label htmlFor="phone" className="absolute left-0 -top-3.5 text-gray-500 text-xs uppercase font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-brand-yellow peer-focus:text-xs">
                                        Số Điện Thoại *
                                    </label>
                                </div>
                            </div>
                            
                            <div className="group relative">
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white text-lg focus:border-brand-yellow focus:outline-none transition-colors placeholder-transparent"
                                    placeholder="Email"
                                    id="email"
                                />
                                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-500 text-xs uppercase font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-brand-yellow peer-focus:text-xs">
                                    Email Doanh Nghiệp *
                                </label>
                            </div>

                            <div className="group relative">
                                <textarea 
                                    rows={3}
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                    className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white text-lg focus:border-brand-yellow focus:outline-none transition-colors placeholder-transparent resize-none"
                                    placeholder="Message"
                                    id="message"
                                />
                                <label htmlFor="message" className="absolute left-0 -top-3.5 text-gray-500 text-xs uppercase font-bold tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-brand-yellow peer-focus:text-xs">
                                    Nhu Cầu Của Bạn...
                                </label>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`
                                        group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-none text-sm font-black uppercase tracking-widest hover:bg-brand-yellow transition-all duration-300
                                        ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
                                    `}
                                >
                                    {isSubmitting ? 'Đang Xử Lý...' : 'Gửi Yêu Cầu'} 
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    )}
                </FadeIn>
            </div>

            {/* RIGHT COLUMN: Info & Map */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <FadeIn delay={200} direction="left">
                    <div className="space-y-10 mb-12">
                        <div className="group">
                            <div className="flex items-center gap-3 text-brand-yellow mb-2">
                                <MapPin size={18} />
                                <span className="font-mono text-xs text-gray-500 uppercase tracking-wider group-hover:text-brand-yellow transition-colors">Văn Phòng Chính</span>
                            </div>
                            <p className="text-white text-xl font-bold leading-snug">
                                Số 8 Thạch Thị Thanh,<br/>
                                Phường Tân Định, Quận 1,<br/>
                                TP. Hồ Chí Minh
                            </p>
                        </div>

                        <div className="group">
                            <div className="flex items-center gap-3 text-brand-yellow mb-2">
                                <Phone size={18} />
                                <span className="font-mono text-xs text-gray-500 uppercase tracking-wider group-hover:text-brand-yellow transition-colors">Hotline 24/7</span>
                            </div>
                            <p className="text-white text-3xl font-black tracking-tight">0906 291 941</p>
                        </div>

                        <div className="group">
                            <div className="flex items-center gap-3 text-brand-yellow mb-2">
                                <Mail size={18} />
                                <span className="font-mono text-xs text-gray-500 uppercase tracking-wider group-hover:text-brand-yellow transition-colors">Email</span>
                            </div>
                            <p className="text-white text-xl font-medium">duhavajsc@gmail.com</p>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={300} direction="left" className="flex-1 min-h-[350px]">
                    <div className="w-full h-full rounded-none overflow-hidden border border-gray-800 relative group grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Map Overlay for Dark Mode styling */}
                        <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 pointer-events-none z-10 transition-colors duration-300"></div>
                        
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.326746200236!2d106.690553314749!3d10.78626699231494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d2d6c06a7f%3A0x634260d1396c429d!2zOCBUaOG6oWNoIFRo4buLIFRoYW5oLCBUw6JuIMSQ4buLbmgsIFF14bqtbiAxLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s"
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Map"
                            className="opacity-80 hover:opacity-100 transition-opacity"
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
