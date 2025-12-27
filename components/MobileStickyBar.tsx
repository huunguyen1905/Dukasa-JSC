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
        fixed bottom-0 left-0 w-full z-[9990] bg-black/90 backdrop-blur-lg border-t border-gray-800 p-3 md:hidden transition-transform duration-300
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
    `}>
        <div className="flex gap-3">
            <a 
                href="tel:0901234567"
                className="flex-1 bg-gray-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                <Phone size={18} /> Gọi Ngay
            </a>
            <button 
                onClick={onCtaClick}
                className="flex-[2] bg-brand-yellow text-black font-black uppercase py-3 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.3)]"
            >
                <Zap size={18} fill="currentColor" /> Nhận Báo Giá
            </button>
        </div>
    </div>
  );
};

export default MobileStickyBar;