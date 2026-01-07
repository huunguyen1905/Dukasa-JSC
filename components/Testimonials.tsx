
import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, TrendingUp, ArrowUpRight, ShieldCheck, X, ZoomIn, MessageCircle, Image as ImageIcon } from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';
import { fetchGalleryImages } from '../services/supabaseService';
import { GalleryImage } from '../types';

const testimonials = [
  {
    id: 1,
    quote: "Doanh số E-commerce của chúng tôi tăng 300% chỉ sau 3 tháng triển khai. Chiến lược Performance của DUHAVA thực sự ở đẳng cấp khác, tối ưu từng đồng chi phí.",
    name: "Trần Minh Tuấn",
    role: "CEO, TechViet Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    metric: "+300% ROI",
    featured: true
  },
  {
    id: 2,
    quote: "Giao diện website mới không chỉ đẹp mà trải nghiệm người dùng (UX) quá mượt mà. Tỷ lệ thoát trang giảm hẳn 40%.",
    name: "Nguyễn Lan Hương",
    role: "Director, Beauty Spa",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100",
    metric: "-40% Bounce Rate",
    featured: false
  },
  {
    id: 3,
    quote: "Chưa thấy bên nào support nhiệt tình như DUHAVA. Bất kể ngày đêm, team đều phản hồi và xử lý vấn đề ngay lập tức.",
    name: "Lê Văn Nam",
    role: "Founder, Real Estate Gold",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    metric: "24/7 Support",
    featured: false
  }
];

const AnimatedCounter = ({ end }: { end: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !hasAnimated.current) {
                hasAnimated.current = true;
                let start = 0;
                const duration = 2000;
                const startTime = performance.now();
                
                const animate = (currentTime: number) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
                    
                    setCount(Math.floor(end * ease));
                    
                    if(progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        });
        if(ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);

    return <span ref={ref}>{count}</span>;
}

const Testimonials: React.FC = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
      const loadGallery = async () => {
          const imgs = await fetchGalleryImages();
          setGalleryImages(imgs);
      };
      loadGallery();
  }, []);

  // Split images for dual rows. Duplicate array to ensure seamless infinite scroll
  const images = galleryImages.length > 0 ? galleryImages : []; 
  // If no images (yet), we might render nothing or a loader, but let's assume we have default mock data from service
  const row1 = [...images, ...images]; 
  const row2 = [...images, ...images].reverse();

  return (
    <section className="bg-brand-black py-24 relative overflow-hidden border-t border-gray-900">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 mb-24">
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                        <ShieldCheck size={18} /> Social Proof
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Niềm Tin Từ <span className="text-gray-600">Thương Hiệu Lớn</span>
                    </h3>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-900/50 border border-gray-800 px-4 py-2 rounded-full backdrop-blur-md">
                    <div className="flex text-brand-yellow">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <span className="text-white font-bold text-sm">4.9/5.0</span>
                    <span className="text-gray-500 text-xs uppercase border-l border-gray-700 pl-2 ml-2">Trên Google & Clutch</span>
                </div>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Card (Large) */}
            <div className="md:col-span-2">
                <FadeIn delay={0} className="h-full">
                    <div className="h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 md:p-12 rounded-3xl relative group overflow-hidden hover:border-brand-yellow/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Quote size={120} className="text-brand-yellow transform rotate-12" />
                        </div>
                        
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-brand-yellow/20">
                                    <TrendingUp size={14} /> Case Study Nổi Bật
                                </div>
                                <p className="text-xl md:text-3xl font-medium text-white leading-relaxed">
                                    "{testimonials[0].quote}"
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-between border-t border-gray-800 pt-6">
                                <div className="flex items-center gap-4">
                                    <img src={testimonials[0].avatar} alt={testimonials[0].name} className="w-12 h-12 rounded-full border-2 border-brand-yellow" />
                                    <div>
                                        <h4 className="text-white font-bold">{testimonials[0].name}</h4>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">{testimonials[0].role}</p>
                                    </div>
                                </div>
                                <div className="text-brand-yellow font-black text-2xl md:text-4xl tracking-tighter">
                                    {testimonials[0].metric}
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Right Column Grid */}
            <div className="md:col-span-1 flex flex-col gap-6">
                {/* Metric Card */}
                <FadeIn delay={100}>
                    <div className="bg-brand-yellow p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h4 className="text-brand-black font-black text-6xl mb-2 tracking-tighter">
                            <AnimatedCounter end={500} />+
                        </h4>
                        <p className="text-brand-black font-bold uppercase tracking-widest text-sm">Đối tác hài lòng</p>
                        <ArrowUpRight className="absolute top-6 right-6 text-brand-black opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </FadeIn>

                {/* Second Testimonial */}
                <FadeIn delay={200} className="flex-1">
                    <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl h-full hover:border-gray-700 transition-colors">
                        <div className="flex gap-1 mb-4 text-brand-yellow">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">"{testimonials[1].quote}"</p>
                        <div className="flex items-center gap-3">
                            <img src={testimonials[1].avatar} alt={testimonials[1].name} className="w-10 h-10 rounded-full border border-gray-700" />
                            <div>
                                <h4 className="text-white font-bold text-sm">{testimonials[1].name}</h4>
                                <div className="text-green-400 text-xs font-bold mt-0.5">{testimonials[1].metric}</div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>

            {/* Bottom Row - Wide Card */}
            <div className="md:col-span-3">
                 <FadeIn delay={300}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Third Testimonial */}
                        <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-gray-700 transition-colors">
                             <div className="flex gap-1 mb-4 text-brand-yellow">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">"{testimonials[2].quote}"</p>
                            <div className="flex items-center gap-3">
                                <img src={testimonials[2].avatar} alt={testimonials[2].name} className="w-10 h-10 rounded-full border border-gray-700" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">{testimonials[2].name}</h4>
                                    <div className="text-blue-400 text-xs font-bold mt-0.5">{testimonials[2].metric}</div>
                                </div>
                            </div>
                        </div>

                         {/* CTA Card */}
                         <div 
                            onClick={() => navigate('/lien-he')}
                            className="bg-gray-800/20 border border-dashed border-gray-700 p-8 rounded-3xl flex flex-col items-center justify-center text-center group hover:bg-gray-800/40 transition-colors cursor-pointer"
                         >
                            <h4 className="text-white font-bold text-xl mb-2">Bạn đã sẵn sàng bứt phá?</h4>
                            <p className="text-gray-400 text-sm mb-6 max-w-xs">Hãy để chúng tôi viết tiếp câu chuyện thành công của bạn.</p>
                            <span className="text-brand-yellow uppercase font-bold tracking-widest text-xs border-b border-brand-yellow pb-1 group-hover:text-white group-hover:border-white transition-colors">
                                Trở thành đối tác
                            </span>
                         </div>
                    </div>
                 </FadeIn>
            </div>
        </div>
      </div>

      {/* --- NEW: REAL RESULTS GALLERY (INFINITE SCROLL) --- */}
      {images.length > 0 && (
      <div className="relative border-t border-gray-800 bg-gray-900/30 pt-16 pb-20">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         
         <div className="container mx-auto px-6 mb-12 text-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-4">
                <ImageIcon size={12} />
                <span>Real Results Gallery</span>
             </div>
             <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                Người Thật <span className="text-gray-600 px-2">•</span> Việc Thật
             </h3>
         </div>

         {/* Marquee Container */}
         <div className="flex flex-col gap-6 relative z-10">
            
            {/* Row 1: Left to Right */}
            <div className="flex overflow-hidden w-full mask-linear-fade">
                 <div className="flex animate-scroll-right gap-6 whitespace-nowrap py-2" style={{ animationDuration: '60s' }}>
                    {row1.map((img, idx) => (
                        <div 
                            key={`r1-${idx}`} 
                            onClick={() => setZoomedImage(img.imageUrl)}
                            className="relative w-64 md:w-80 aspect-[16/10] bg-gray-800 rounded-xl overflow-hidden border border-gray-700 cursor-zoom-in group shrink-0"
                        >
                            <img src={img.imageUrl} alt={img.caption || "Result Proof"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white">
                                    <ZoomIn size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Row 2: Right to Left */}
            <div className="flex overflow-hidden w-full mask-linear-fade">
                 <div className="flex animate-scroll-right gap-6 whitespace-nowrap py-2" style={{ animationDirection: 'reverse', animationDuration: '70s' }}>
                    {row2.map((img, idx) => (
                        <div 
                            key={`r2-${idx}`} 
                            onClick={() => setZoomedImage(img.imageUrl)}
                            className="relative w-64 md:w-80 aspect-[16/10] bg-gray-800 rounded-xl overflow-hidden border border-gray-700 cursor-zoom-in group shrink-0"
                        >
                            <img src={img.imageUrl} alt={img.caption || "Result Proof"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                             <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white">
                                    <ZoomIn size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

         </div>

         {/* Lightbox Modal */}
         {zoomedImage && (
             <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setZoomedImage(null)}>
                 <button className="absolute top-6 right-6 text-gray-400 hover:text-white p-2">
                     <X size={32} />
                 </button>
                 <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
                     <img 
                        src={zoomedImage} 
                        alt="Zoomed Proof" 
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-gray-800"
                        onClick={(e) => e.stopPropagation()} 
                     />
                 </div>
             </div>
         )}
      </div>
      )}

    </section>
  );
};

export default Testimonials;
