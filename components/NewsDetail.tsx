
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight, Tag } from 'lucide-react';
import { NewsItem } from '../types';
import FadeIn from './FadeIn';
import SEOHead from './SEOHead';

interface NewsDetailProps {
  news: NewsItem[];
  onCtaClick: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, onCtaClick }) => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  
  const article = news.find(n => n.id === newsId);
  
  // Related news logic
  const relatedNews = useMemo(() => {
      if (!article) return [];
      return news.filter(n => n.id !== article.id).slice(0, 3);
  }, [article, news]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [newsId]);

  if (!article) {
      return (
          <div className="min-h-screen bg-brand-black flex items-center justify-center">
              <SEOHead title="Bài viết không tồn tại" />
              <div className="text-center">
                  <h2 className="text-2xl text-white font-bold mb-4">Bài viết không tồn tại</h2>
                  <button onClick={() => navigate('/tin-tuc')} className="text-brand-yellow hover:underline">Về Trang Tin Tức</button>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-brand-black min-h-screen relative overflow-x-hidden selection:bg-brand-yellow selection:text-black">
      <SEOHead 
        title={`${article.title} - Tin Tức DUHAVA`}
        description={article.summary}
        image={article.imageUrl}
        type="article"
        schema={{
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": article.title,
            "image": [article.imageUrl],
            "datePublished": article.date,
            "author": {
                "@type": "Organization",
                "name": "DUHAVA Editorial Team"
            },
            "publisher": {
                "@type": "Organization",
                "name": "DUHAVA Agency",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://duhava.com/logo.png"
                }
            },
            "description": article.summary
        }}
      />
      
      {/* 1. PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800">
          <div className="h-full bg-brand-yellow" style={{width: '0%', animation: 'growWidth auto linear'}} id="readingProgress"></div>
      </div>

      {/* 2. HEADER SECTION */}
      <section className="relative pt-32 pb-20 px-6 border-b border-gray-800">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
              <button 
                onClick={() => navigate('/tin-tuc')}
                className="group flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors uppercase text-xs font-bold tracking-widest"
              >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Quay lại Tin Tức
              </button>

              <FadeIn>
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-bold uppercase tracking-wider">
                      <span className="text-brand-yellow bg-brand-yellow/10 px-3 py-1 rounded border border-brand-yellow/20">{article.category}</span>
                      <span className="text-gray-500 flex items-center gap-2"><Calendar size={14}/> {new Date(article.date).toLocaleDateString('vi-VN')}</span>
                      <span className="text-gray-500 flex items-center gap-2"><Clock size={14}/> 5 phút đọc</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                      {article.title}
                  </h1>

                  <div className="flex items-center justify-between border-t border-gray-800 pt-8">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
                              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" alt="Author" className="w-full h-full object-cover" />
                          </div>
                          <div>
                              <div className="text-white font-bold text-sm">Ban Biên Tập DUHAVA</div>
                              <div className="text-gray-500 text-xs">Digital Insight Team</div>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Facebook size={18}/></button>
                          <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Twitter size={18}/></button>
                          <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Linkedin size={18}/></button>
                      </div>
                  </div>
              </FadeIn>
          </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <section className="py-12">
          <div className="container mx-auto max-w-4xl px-6">
              
              {/* Featured Image */}
              <FadeIn delay={100}>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden mb-16 border border-gray-800 shadow-2xl relative group">
                      <img 
                        src={article.imageUrl} 
                        alt={`${article.title} - Tin tức DUHAVA`}
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  </div>
              </FadeIn>

              {/* Content Body */}
              <article className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-light">
                  <div className="bg-gray-900/50 border-l-4 border-brand-yellow p-8 rounded-r-xl mb-12 italic text-xl text-white font-serif">
                      "{article.summary}"
                  </div>
                  
                  {/* Render content paragraphs safely */}
                  {article.content ? (
                      <div className="whitespace-pre-line space-y-6">
                          {article.content}
                      </div>
                  ) : (
                      <div className="space-y-6">
                          <p>
                              Trong kỷ nguyên số hóa hiện nay, việc nắm bắt các xu hướng công nghệ không chỉ là lợi thế cạnh tranh mà còn là yếu tố sống còn của doanh nghiệp. 
                              Tại DUHAVA, chúng tôi liên tục nghiên cứu và cập nhật những giải pháp mới nhất để mang lại hiệu quả tối ưu cho khách hàng.
                          </p>
                          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tại sao chiến lược này quan trọng?</h3>
                          <p>
                              Dữ liệu cho thấy các doanh nghiệp áp dụng chuyển đổi số sớm có tốc độ tăng trưởng doanh thu cao gấp 3 lần so với đối thủ. 
                              Điều này đặc biệt đúng trong các ngành bán lẻ, bất động sản và dịch vụ tài chính.
                          </p>
                          <img 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000" 
                            alt="Data Chart Analysis" 
                            className="rounded-xl border border-gray-800 my-8 w-full"
                          />
                          <h3 className="text-2xl font-bold text-white mt-8 mb-4">Các bước triển khai hiệu quả</h3>
                          <p>
                              Để bắt đầu, doanh nghiệp cần xác định rõ mục tiêu kinh doanh và chân dung khách hàng mục tiêu. 
                              Tiếp theo là lựa chọn các kênh truyền thông phù hợp (Omnichannel) để tối ưu hóa điểm chạm.
                          </p>
                          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-8">
                              <h4 className="text-brand-yellow font-bold uppercase text-sm mb-2">Key Takeaways</h4>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                  <li>Tập trung vào trải nghiệm người dùng (UX) trên mọi nền tảng.</li>
                                  <li>Sử dụng dữ liệu (Data) để ra quyết định thay vì cảm tính.</li>
                                  <li>Liên tục thử nghiệm (A/B Testing) để tìm ra phương án tối ưu.</li>
                              </ul>
                          </div>
                      </div>
                  )}
              </article>

              {/* Tags */}
              <div className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap gap-2">
                  <Tag size={16} className="text-brand-yellow mr-2"/>
                  {['Marketing', 'Digital Transformation', 'Growth Hacking', 'DUHAVA Insight'].map(tag => (
                      <span key={tag} className="text-xs bg-gray-900 border border-gray-700 px-3 py-1 rounded text-gray-400 hover:text-white hover:border-brand-yellow cursor-pointer transition-colors">
                          #{tag}
                      </span>
                  ))}
              </div>
          </div>
      </section>

      {/* 4. NEWSLETTER CTA */}
      <section className="py-20 border-t border-gray-800 bg-gray-900/20">
          <div className="container mx-auto px-6 max-w-4xl text-center">
              <h3 className="text-3xl font-black text-white uppercase mb-4">Đừng Bỏ Lỡ Xu Hướng Mới</h3>
              <p className="text-gray-400 mb-8">Đăng ký nhận bản tin hàng tuần từ chuyên gia DUHAVA.</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <input type="email" placeholder="Email doanh nghiệp của bạn..." className="px-6 py-4 rounded-full bg-black border border-gray-700 text-white focus:border-brand-yellow focus:outline-none w-full md:w-96" />
                  <button className="px-8 py-4 rounded-full bg-brand-yellow text-black font-bold uppercase tracking-wider hover:bg-white transition-colors">Đăng Ký Ngay</button>
              </div>
          </div>
      </section>

      {/* 5. RELATED NEWS */}
      {relatedNews.length > 0 && (
          <section className="py-24 bg-black border-t border-gray-900">
              <div className="container mx-auto px-6">
                  <div className="flex justify-between items-end mb-12">
                      <h3 className="text-2xl font-black text-white uppercase">Bài Viết Liên Quan</h3>
                      <button onClick={() => navigate('/tin-tuc')} className="text-brand-yellow font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:underline">
                          Xem Tất Cả <ArrowRight size={16}/>
                      </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {relatedNews.map((item) => (
                          <div 
                            key={item.id} 
                            onClick={() => navigate(`/news/${item.id}`)}
                            className="group cursor-pointer flex flex-col bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-yellow/50 transition-all duration-300"
                          >
                              <div className="relative h-48 overflow-hidden shrink-0">
                                  <img 
                                    src={item.imageUrl} 
                                    alt={`${item.title} - Bài viết liên quan`}
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
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

    </div>
  );
};

export default NewsDetail;
