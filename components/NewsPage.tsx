
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';
import { NewsItem } from '../types';
import { Calendar, ArrowRight, Search, TrendingUp, Tag } from 'lucide-react';
import FadeIn from './FadeIn';
import WorldClassBackground from './WorldClassBackground';

interface NewsPageProps {
  news: NewsItem[];
  onOpenAdmin?: () => void;
}

const NewsPage: React.FC<NewsPageProps> = ({ news, onOpenAdmin }) => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract categories
  const categories = ['All', ...Array.from(new Set(news.map(n => n.category)))];

  // Filter Logic
  const filteredNews = news.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
  });

  useEffect(() => {
      window.scrollTo(0, 0);
      document.title = "Tin Tức & Sự Kiện - DUHAVA Agency";
  }, []);

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
      <WorldClassBackground />
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 relative border-b border-gray-800">
          <div className="container mx-auto text-center relative z-10">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-6">
                    <TrendingUp size={12} />
                    <span>Insights Center</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                    Tin Tức & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Góc Nhìn Chuyên Gia</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Cập nhật xu hướng Digital Marketing, công nghệ AI và các chiến lược tăng trưởng doanh thu mới nhất từ DUHAVA.
                </p>
              </FadeIn>
          </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="sticky top-20 z-40 bg-brand-black/80 backdrop-blur-xl border-b border-white/5 py-4">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Categories */}
              <div className="flex overflow-x-auto hide-scrollbar gap-2 w-full md:w-auto pb-2 md:pb-0">
                  {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all
                            ${activeCategory === cat 
                                ? 'bg-brand-yellow text-black' 
                                : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'}
                        `}
                      >
                          {cat}
                      </button>
                  ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80 group">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bài viết..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:border-brand-yellow focus:outline-none transition-colors"
                  />
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-yellow transition-colors" />
              </div>
          </div>
      </section>

      {/* NEWS GRID */}
      <section className="py-16 px-6 min-h-[50vh]">
          <div className="container mx-auto">
              {filteredNews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredNews.map((item, index) => (
                          <FadeIn key={item.id} delay={index * 50}>
                              <div 
                                onClick={() => navigate(`/news/${item.id}`)}
                                className="group cursor-pointer flex flex-col bg-gray-900/30 border border-gray-800 rounded-2xl overflow-hidden hover:border-brand-yellow/50 transition-all duration-300 h-full hover:-translate-y-1"
                              >
                                  <div className="relative h-56 overflow-hidden shrink-0">
                                      <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black text-[10px] font-black px-3 py-1 rounded z-10 uppercase tracking-wider shadow-lg">
                                          {item.category}
                                      </div>
                                      <img 
                                          src={item.imageUrl} 
                                          alt={item.title} 
                                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                                  </div>
                                  
                                  <div className="p-6 flex-1 flex flex-col">
                                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-3 font-bold uppercase tracking-wider">
                                          <Calendar size={12} className="text-brand-yellow" />
                                          <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                                      </div>
                                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2 leading-tight">
                                          {item.title}
                                      </h3>
                                      <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                          {item.summary}
                                      </p>
                                      <div className="mt-auto border-t border-gray-800 pt-4 flex justify-between items-center">
                                          <span className="text-xs font-bold text-gray-500 flex items-center gap-1 group-hover:text-white transition-colors">
                                              <Tag size={12}/> {item.category}
                                          </span>
                                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-brand-yellow group-hover:text-black transition-all">
                                              <ArrowRight size={14} />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </FadeIn>
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-24 border border-dashed border-gray-800 rounded-3xl bg-gray-900/20">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                          <Search size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Không tìm thấy bài viết</h3>
                      <p className="text-gray-500">Thử tìm kiếm với từ khóa khác hoặc chọn danh mục "All".</p>
                  </div>
              )}
          </div>
      </section>

      <Footer onOpenAdmin={onOpenAdmin || (() => navigate('/admin-login'))} />
      
      {/* Modal is handled internally or via App level, here we use local for simplicity if direct page */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default NewsPage;
