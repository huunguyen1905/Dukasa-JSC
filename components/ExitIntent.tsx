import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, FileText, Download } from 'lucide-react';

const ExitIntent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse left the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        // Check localStorage to avoid annoying returning users too often
        const lastShown = localStorage.getItem('duhava_exit_intent_shown');
        const now = Date.now();
        
        // Show once every 24 hours
        if (!lastShown || now - parseInt(lastShown) > 24 * 60 * 60 * 1000) {
            setIsOpen(true);
            setHasShown(true);
            localStorage.setItem('duhava_exit_intent_shown', now.toString());
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        
        <div className="relative bg-gradient-to-br from-gray-900 to-black border border-brand-yellow w-full max-w-md rounded-2xl p-1 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent"></div>
            <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-3 right-3 text-gray-500 hover:text-white"
            >
                <X size={20} />
            </button>

            <div className="bg-gray-900/50 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-yellow animate-bounce">
                    <FileText size={32} />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase mb-2">Khoan đã!</h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    Đừng rời đi tay trắng. Nhận ngay <strong>"Checklist Audit Website & SEO 2024"</strong> trị giá 5.000.000 VNĐ hoàn toàn miễn phí.
                </p>

                <div className="space-y-3">
                    <input 
                        type="email" 
                        placeholder="Nhập Email nhận tài liệu..." 
                        className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-yellow focus:outline-none"
                    />
                    <button className="w-full bg-brand-yellow text-black font-bold uppercase py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                        <Download size={18} /> Gửi Cho Tôi Ngay
                    </button>
                </div>
                
                <p className="mt-4 text-[10px] text-gray-600">
                    *Chúng tôi cam kết không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
                </p>
            </div>
        </div>
    </div>,
    document.body
  );
};

export default ExitIntent;