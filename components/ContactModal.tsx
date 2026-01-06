
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Check, Zap, ShieldCheck } from 'lucide-react';
import { createLead } from '../services/supabaseService';
import { Lead } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSuccess(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Auto-fill details for simple form
    const combinedDetails = `
      Nguồn: Form Đăng Ký Nhanh (Popup)
      Lời nhắn: ${formData.message || 'Khách hàng yêu cầu gọi lại ngay.'}
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
        setTimeout(() => {
             onClose();
             setFormData({ name: '', email: '', phone: '', message: '' });
             setIsSuccess(false);
        }, 3000);
    } catch (error: any) {
        console.error("Lỗi gửi form:", error);
        alert(`Có lỗi xảy ra: ${error.message || 'Vui lòng thử lại sau.'}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 w-full max-w-4xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 border border-gray-800">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 text-gray-400 hover:text-white hover:bg-black/50 transition-colors">
            <X size={20} />
        </button>

        {/* Left Side: Visual / Value Prop */}
        <div className="md:w-5/12 bg-brand-yellow p-10 flex flex-col justify-between relative overflow-hidden">
             {/* Decor Patterns */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-brand-yellow font-black">D</div>
                    <span className="font-black text-black tracking-tighter uppercase">Duhava Agency</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-black uppercase leading-none mb-4">
                    Tư Vấn <br/>Chiến Lược
                </h3>
                <p className="text-black/80 font-medium text-sm leading-relaxed">
                    Để lại thông tin để nhận cuộc gọi tư vấn trực tiếp từ chuyên gia của chúng tôi trong vòng 30 phút.
                </p>
             </div>

             <div className="relative z-10 mt-10 space-y-3">
                <div className="flex items-center gap-3 text-black/70 text-sm font-bold">
                    <Check size={16} strokeWidth={3} /> Bảo mật thông tin 100%
                </div>
                <div className="flex items-center gap-3 text-black/70 text-sm font-bold">
                    <Check size={16} strokeWidth={3} /> Không spam quảng cáo
                </div>
                <div className="flex items-center gap-3 text-black/70 text-sm font-bold">
                    <Check size={16} strokeWidth={3} /> Tư vấn giải pháp miễn phí
                </div>
             </div>
        </div>

        {/* Right Side: Simple Form */}
        <div className="md:w-7/12 p-8 md:p-12 bg-brand-dark relative">
            {isSuccess ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-brand-dark z-20 animate-in fade-in">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 ring-1 ring-green-500/30">
                        <ShieldCheck size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">Đã Gửi Thành Công</h3>
                    <p className="text-gray-400 text-sm">Cảm ơn {formData.name}!<br/>Chúng tôi sẽ liên hệ lại qua số {formData.phone} sớm nhất.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full justify-center space-y-6">
                    <div>
                        <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-brand-yellow rounded-full"></span>
                            Thông Tin Liên Hệ
                        </h4>
                        
                        <div className="space-y-4">
                            <div className="group relative">
                                <input 
                                    required
                                    type="text" 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-brand-yellow focus:bg-gray-800 focus:outline-none transition-all placeholder-gray-600 font-medium"
                                    placeholder="Họ và tên của bạn"
                                />
                            </div>
                            <div className="group relative">
                                <input 
                                    required
                                    type="tel" 
                                    value={formData.phone}
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-brand-yellow focus:bg-gray-800 focus:outline-none transition-all placeholder-gray-600 font-medium"
                                    placeholder="Số điện thoại (Zalo)"
                                />
                            </div>
                            <div className="group relative">
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-5 py-4 text-white focus:border-brand-yellow focus:bg-gray-800 focus:outline-none transition-all placeholder-gray-600 font-medium"
                                    placeholder="Email doanh nghiệp (nếu có)"
                                />
                            </div>
                             <div className="group relative">
                                <input 
                                    type="text" 
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-transparent border-b border-gray-700 px-2 py-3 text-white focus:border-brand-yellow focus:outline-none transition-all placeholder-gray-600 text-sm"
                                    placeholder="Lời nhắn (Tùy chọn)..."
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            w-full bg-white text-black font-black uppercase py-4 rounded-xl hover:bg-brand-yellow transition-all shadow-lg flex items-center justify-center gap-2 mt-4
                            ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02]'}
                        `}
                    >
                        {isSubmitting ? 'Đang Xử Lý...' : 'Gửi Thông Tin Ngay'} <Send size={18} />
                    </button>
                    
                    <p className="text-center text-[10px] text-gray-600">
                        *Bằng việc gửi thông tin, bạn đồng ý để DUHAVA liên hệ tư vấn.
                    </p>
                </form>
            )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
