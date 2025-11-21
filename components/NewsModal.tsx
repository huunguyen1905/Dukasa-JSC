import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Tag } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsModalProps {
  item: NewsItem | null;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ item, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-brand-dark border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 flex flex-col">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-brand-yellow hover:text-black transition-colors z-50"
        >
          <X size={24} />
        </button>

        {/* Header Image */}
        <div className="relative h-64 md:h-80 shrink-0">
            <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 md:left-10 right-6">
                <span className="inline-block py-1 px-3 rounded bg-brand-yellow text-brand-black text-xs font-bold uppercase tracking-wider mb-3 shadow-lg">
                    {item.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight shadow-black drop-shadow-lg">
                    {item.title}
                </h2>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-10">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-8 border-b border-gray-800 pb-4">
                <Calendar size={16} />
                <span>Đăng ngày: {new Date(item.date).toLocaleDateString('vi-VN')}</span>
            </div>

            {/* Summary Box */}
            <div className="bg-gray-800/30 border-l-4 border-brand-yellow p-6 mb-8 rounded-r-lg italic text-gray-300">
                {item.summary}
            </div>

            {/* Main Content */}
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                {item.content ? item.content : (
                   <p className="text-gray-500 italic">[Nội dung chi tiết chưa được cập nhật cho bài viết này]</p>
                )}
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NewsModal;