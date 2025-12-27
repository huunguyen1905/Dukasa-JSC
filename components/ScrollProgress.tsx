import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollProgress: React.FC = () => {
  const [completion, setCompletion] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }

      // Show button after scrolling down 300px
      setIsVisible(currentProgress > 300);
    };

    window.addEventListener('scroll', updateScrollCompletion);
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const strokeDashoffset = 100 - completion;

  return (
    <div 
      className={`fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[90] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
    >
      <button 
        onClick={scrollToTop}
        className="group relative w-12 h-12 flex items-center justify-center bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-110 transition-transform duration-300"
        aria-label="Back to top"
      >
        {/* SVG Progress Circle */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
                className="text-gray-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                className="text-brand-yellow transition-all duration-100 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100, 100"
                strokeDashoffset={strokeDashoffset}
            />
        </svg>
        
        {/* Icon */}
        <ArrowUp size={20} className="text-white group-hover:text-brand-yellow transition-colors relative z-10" />
      </button>
    </div>
  );
};

export default ScrollProgress;