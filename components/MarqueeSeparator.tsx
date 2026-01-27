
import React from 'react';

const MarqueeSeparator: React.FC = () => {
  const words = ["STRATEGY", "CREATIVE", "TECHNOLOGY", "GROWTH", "DATA-DRIVEN"];
  
  return (
    <section className="w-full bg-brand-black border-y border-white/5 py-10 md:py-16 overflow-hidden relative select-none z-10">
        {/* Background Texture for depth */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        
        {/* Vignettes for smooth edge fading */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>

        <div 
            className="flex whitespace-nowrap animate-scroll-right w-max items-center"
            style={{ 
                animationDirection: 'reverse', 
                animationDuration: '45s' 
            }}
        >
            {/* Render duplicated sets to ensure seamless loop on large screens */}
            {[...Array(4)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-8 md:gap-16 mx-4 md:mx-8">
                    {words.map((word, index) => (
                        <React.Fragment key={index}>
                            <span 
                                className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-transparent transition-all duration-700 hover:text-brand-yellow cursor-default"
                                style={{ 
                                    WebkitTextStroke: '1px #FACC15', // Brand Yellow Outline
                                    opacity: 0.3 // Subtle look
                                }}
                            >
                                {word}
                            </span>
                            <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-brand-yellow/20"></div>
                        </React.Fragment>
                    ))}
                </div>
            ))}
        </div>
    </section>
  );
};

export default MarqueeSeparator;
