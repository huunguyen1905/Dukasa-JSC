
import React, { useState, useEffect } from 'react';
import { ZoomIn, X, Image as ImageIcon } from 'lucide-react';
import { fetchGalleryImages } from '../services/supabaseService';
import { GalleryImage } from '../types';

const RealResultsGallery: React.FC = () => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
      const loadGallery = async () => {
          const imgs = await fetchGalleryImages();
          setGalleryImages(imgs);
      };
      loadGallery();
  }, []);

  // Use existing images or fallback if empty to ensure UI shows something
  const images = galleryImages.length > 0 ? galleryImages : [];
  
  if (images.length === 0) return null;

  // Duplicate for seamless loop
  const row1 = [...images, ...images, ...images]; 
  const row2 = [...images, ...images, ...images].reverse();

  return (
    <section className="relative border-t border-gray-800 bg-brand-black pt-16 pb-20 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
         
         <div className="container mx-auto px-6 mb-12 text-center relative z-10">
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
                 <button className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 bg-black/50 rounded-full">
                     <X size={32} />
                 </button>
                 <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                     <img 
                        src={zoomedImage} 
                        alt="Zoomed Proof" 
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-gray-800"
                     />
                 </div>
             </div>
         )}
    </section>
  );
};

export default RealResultsGallery;
