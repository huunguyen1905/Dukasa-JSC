
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, X, ArrowUpRight } from 'lucide-react';
import { NewsItem } from '../types';
import FadeIn from './FadeIn';
import NewsModal from './NewsModal';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // URL Params handling
  const { newsId } = useParams();
  const navigate = useNavigate();

  // Handle Deep Linking
  useEffect(() => {
    if (newsId && news.length > 0) {
        const found = news.find(n => n.id === newsId);
        if (found) {
            // Optional scroll
            const element = document.getElementById('tin-tuc');
            if(element) element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }, [newsId, news]);

  const handleNewsClick = (item: NewsItem) => {
    navigate(`/news/${item.id}`);
  };

  const handleCloseModal = () => {
    setSelectedNews(null);
    navigate('/tin-tuc', { replace: true, preventScrollReset: true });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // View All Overlay
  const ViewAllOverlay = () => {
    if (!isViewAllOpen) return null;
    
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-[9990] bg-brand-black overflow-y-auto animate-in fade-in duration-300">
            <div className="container mx-auto px-6 py-12">
                 <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Thư Viện Bài Viết</h2>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            Tin Tức <span className="text-gray-600">Mới Nhất</span>
                        </h3>
                    </div>
                    <button 
                        onClick={() => setIsViewAllOpen(false)}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {news.map((item, index) => (
                        <div 
                            key={item.id}
                            className="group cursor-pointer flex flex-col bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-yellow/50 transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in"
                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                            onClick={() => {
                                setIsViewAllOpen(false);
                                handleNewsClick(item);
                            }}
                        >
                            <div className="relative h-48 overflow-hidden shrink-0">
                                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded z-10 uppercase tracking-wider">
                                    {item.category}
                                </div>
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                                    <Calendar size={12} />
                                    <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2">
                                    {item.title}
                                </h4>
                                <div className="mt-auto text-brand-yellow text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    Đọc Thêm <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
  };

  return (
    <>
        <section id="tin-tuc" className="bg-brand-black py-24 border-t border-gray-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <FadeIn>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Tin Tức & Sự Kiện</h2>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Góc Nhìn <span className="text-gray-600">Chuyên Gia</span>
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                             <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ChevronLeft size={20}/></button>
                            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ChevronRight size={20}/></button>
                        </div>
                        <button 
                            onClick={() => setIsViewAllOpen(true)}
                            className="text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors flex items-center gap-2 ml-4 uppercase text-sm font-bold tracking-wider"
                        >
                            Xem Tất Cả <ArrowUpRight size={16} />
                        </button>
                    </div>
                </div>
            </FadeIn>

            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {news.map((item, index) => (
                <div 
                    key={item.id} 
                    className="min-w-[85vw] md:min-w-[380px] snap-center"
                >
                    <FadeIn delay={index * 100} className="h-full">
                        <article 
                            className="group cursor-pointer h-full flex flex-col bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-yellow/50 transition-all duration-300 hover:-translate-y-2"
                            onClick={() => handleNewsClick(item)}
                        >
                            <div className="relative h-56 overflow-hidden">
                                <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded z-10 uppercase tracking-wider">
                                    {item.category}
                                </div>
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="border border-white px-4 py-2 rounded-full text-white font-bold text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors">Đọc Chi Tiết</span>
                                </div>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                                    <Calendar size={12} />
                                    <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2">
                                    {item.title}
                                </h4>
                                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                                    {item.summary}
                                </p>
                                <div className="flex items-center gap-2 text-brand-yellow text-sm font-bold uppercase tracking-wider mt-auto group/btn">
                                    Đọc Thêm <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </article>
                    </FadeIn>
                </div>
            ))}
            </div>
        </div>
        </section>

        <ViewAllOverlay />
    </>
  );
};

export default NewsSection;
