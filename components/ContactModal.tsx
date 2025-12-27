import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, ArrowLeft, Check, Send, ChevronRight } from 'lucide-react';
import { createLead } from '../services/supabaseService';
import { Lead } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: [] as string[],
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setIsSuccess(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
        setDirection('next');
        setStep(step + 1);
    } else {
        handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
        setDirection('prev');
        setStep(step - 1);
    }
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
        ...prev,
        service: prev.service.includes(service) 
            ? prev.service.filter(s => s !== service)
            : [...prev.service, service]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Combine details
    const combinedDetails = `
      Dịch vụ quan tâm: ${formData.service.join(', ')}
      Ngân sách: ${formData.budget}
      Lời nhắn: ${formData.message}
    `;

    try {
        const newLead: Lead = {
            id: Date.now().toString(),
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
             setFormData({ name: '', email: '', phone: '', service: [], budget: '', message: '' });
             setIsSuccess(false);
             setStep(1);
        }, 3000);
    } catch (error) {
        console.error("Lỗi gửi form:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
        setIsSubmitting(false);
    }
  };

  // Validation for current step
  const isStepValid = () => {
      if (step === 1) return formData.service.length > 0;
      if (step === 2) return formData.budget !== '';
      if (step === 3) return formData.name && formData.phone && formData.email;
      return true;
  };

  const servicesList = ["Branding", "Web Design", "SEO", "Ads Performance", "Social Media", "Khác"];
  const budgetList = ["< 50 Triệu", "50 - 200 Triệu", "200 - 500 Triệu", "> 500 Triệu"];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300" onClick={onClose}></div>
      
      <div className="relative bg-gray-900 border border-gray-800 w-full max-w-2xl min-h-[500px] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header: Progress Bar & Close */}
        <div className="flex justify-between items-center p-8 border-b border-gray-800">
            <div className="flex items-center gap-3">
                <div className="text-brand-yellow font-black text-xl">DUHAVA</div>
                <div className="h-4 w-px bg-gray-700"></div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tư Vấn Chiến Lược</div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-gray-800 h-1">
            <div 
                className="bg-brand-yellow h-full transition-all duration-500 ease-out"
                style={{ width: isSuccess ? '100%' : `${(step / totalSteps) * 100}%` }}
            ></div>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
            {isSuccess ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 p-8">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 ring-1 ring-green-500/30">
                        <Check size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2">Yêu Cầu Đã Gửi!</h3>
                    <p className="text-gray-400 max-w-md">Chúng tôi đã nhận được thông tin. Chuyên gia chiến lược của DUHAVA sẽ liên hệ với bạn trong ít phút tới.</p>
                </div>
            ) : (
                <>
                    {/* Step 1: Services */}
                    <div className={`transition-all duration-500 absolute inset-0 p-8 md:p-12 overflow-y-auto
                        ${step === 1 ? 'opacity-100 translate-x-0' : step > 1 ? 'opacity-0 -translate-x-full pointer-events-none' : 'opacity-0 translate-x-full pointer-events-none'}
                    `}>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Bạn đang quan tâm dịch vụ nào?</h2>
                        <p className="text-gray-500 text-sm mb-8">Chọn một hoặc nhiều dịch vụ để chúng tôi tư vấn chính xác nhất.</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {servicesList.map(item => (
                                <button
                                    key={item}
                                    onClick={() => toggleService(item)}
                                    className={`p-4 rounded-xl border text-left transition-all duration-200 group relative overflow-hidden
                                        ${formData.service.includes(item) 
                                            ? 'bg-brand-yellow text-black border-brand-yellow font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)]' 
                                            : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                        }
                                    `}
                                >
                                    <span className="relative z-10">{item}</span>
                                    {formData.service.includes(item) && <Check size={18} className="absolute top-4 right-4" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Budget */}
                    <div className={`transition-all duration-500 absolute inset-0 p-8 md:p-12 overflow-y-auto
                        ${step === 2 ? 'opacity-100 translate-x-0' : step > 2 ? 'opacity-0 -translate-x-full pointer-events-none' : step < 2 ? 'opacity-0 translate-x-full pointer-events-none' : ''}
                    `}>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Ngân sách dự kiến cho dự án?</h2>
                        <p className="text-gray-500 text-sm mb-8">Giúp chúng tôi đề xuất gói giải pháp tối ưu ROI nhất.</p>
                        
                        <div className="space-y-3">
                            {budgetList.map(item => (
                                <button
                                    key={item}
                                    onClick={() => setFormData({...formData, budget: item})}
                                    className={`w-full p-5 rounded-xl border text-left transition-all duration-200 flex justify-between items-center
                                        ${formData.budget === item
                                            ? 'bg-white text-black border-white font-bold' 
                                            : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'
                                        }
                                    `}
                                >
                                    <span>{item}</span>
                                    {formData.budget === item && <div className="w-3 h-3 bg-black rounded-full"></div>}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 3: Contact Info */}
                    <div className={`transition-all duration-500 absolute inset-0 p-8 md:p-12 overflow-y-auto
                        ${step === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
                    `}>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Thông tin liên hệ của bạn</h2>
                        <p className="text-gray-500 text-sm mb-8">Chúng tôi cam kết bảo mật thông tin tuyệt đối.</p>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Họ và Tên</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:border-brand-yellow focus:outline-none text-lg placeholder-gray-800"
                                    placeholder="Nhập tên của bạn"
                                    autoFocus={step === 3}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Số Điện Thoại</label>
                                    <input 
                                        type="tel" 
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                        className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:border-brand-yellow focus:outline-none text-lg placeholder-gray-800"
                                        placeholder="090..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                                    <input 
                                        type="email" 
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                        className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:border-brand-yellow focus:outline-none text-lg placeholder-gray-800"
                                        placeholder="abc@company.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Lời nhắn (Tùy chọn)</label>
                                <textarea 
                                    rows={2}
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                    className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:border-brand-yellow focus:outline-none text-lg placeholder-gray-800 resize-none"
                                    placeholder="Ghi chú thêm..."
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>

        {/* Footer: Navigation Buttons */}
        {!isSuccess && (
            <div className="p-8 border-t border-gray-800 flex justify-between items-center bg-gray-900 z-10">
                {step > 1 ? (
                    <button 
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-bold text-sm uppercase tracking-wide"
                    >
                        <ArrowLeft size={16} /> Quay Lại
                    </button>
                ) : (
                    <div></div>
                )}

                <button 
                    onClick={handleNext}
                    disabled={!isStepValid() || isSubmitting}
                    className={`
                        flex items-center gap-2 px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300
                        ${isStepValid() && !isSubmitting
                            ? 'bg-brand-yellow text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)]' 
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }
                    `}
                >
                    {isSubmitting ? 'Đang Gửi...' : step === totalSteps ? 'Hoàn Tất' : 'Tiếp Tục'} 
                    {!isSubmitting && (step === totalSteps ? <Send size={16} /> : <ChevronRight size={16} />)}
                </button>
            </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;