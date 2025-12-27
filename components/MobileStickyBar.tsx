
import React, { useState, useEffect } from 'react';
import { Phone, Zap } from 'lucide-react';

interface MobileStickyBarProps {
    onCtaClick: () => void;
}

const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onCtaClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past the Hero section (approx 600px)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`
        fixed bottom-0 left-0 w-full z-[9990] bg-black/90 backdrop-blur-xl border-t border-gray-800 px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden transition-transform duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
    `}>
        <div className="flex gap-3">
            <a 
                href="tel:0906291941"
                className="flex-1 bg-gray-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform whitespace-nowrap text-[10px] sm:text-xs"
            >
                <Phone size={14} /> Gọi Ngay
            </a>
            <button 
                onClick={onCtaClick}
                className="flex-[2] bg-brand-yellow text-black font-black uppercase py-3 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.3)] whitespace-nowrap text-[10px] sm:text-xs"
            >
                <Zap size={14} fill="currentColor" /> Nhận Báo Giá
            </button>
        </div>
    </div>
  );
};

export default MobileStickyBar;
