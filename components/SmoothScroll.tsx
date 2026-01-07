
import React, { useEffect, useRef } from 'react';

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElem = scrollRef.current;
    if (!scrollElem || !heightRef.current) return;

    let current = 0;
    let target = 0;
    // Lower ease factor = heavier, more luxurious feel (0.05 is standard for luxury sites)
    let ease = 0.05; 
    let isMobile = window.matchMedia('(pointer: coarse)').matches;

    // If mobile, don't run custom scroll (performance & UX)
    if (isMobile) {
        scrollElem.style.position = 'relative';
        heightRef.current.style.display = 'none';
        return;
    }

    // Update virtual height for the native scrollbar
    const updateHeight = () => {
        if (heightRef.current && scrollElem) {
            const contentHeight = scrollElem.getBoundingClientRect().height;
            // Ensure we don't set a height smaller than window to avoid glitches
            const minHeight = window.innerHeight;
            const finalHeight = Math.max(contentHeight, minHeight);
            
            heightRef.current.style.height = `${finalHeight}px`;
        }
    };
    
    // Observe changes in the content size (e.g., images loading, accordions opening)
    const observer = new ResizeObserver(() => {
        updateHeight();
    });
    observer.observe(scrollElem);
    
    // Also update on window resize
    window.addEventListener('resize', updateHeight);
    
    // Initial update
    updateHeight();

    let requestAnimationFrameId: number;

    // Animation Loop
    const animate = () => {
      target = window.scrollY;
      
      // Linear interpolation for smooth effect
      // If difference is small, snap to target to save CPU
      if (Math.abs(target - current) < 0.1) {
          current = target;
      } else {
          current = current * (1 - ease) + target * ease;
      }
      
      // Apply transform
      if (scrollElem) {
          scrollElem.style.transform = `translate3d(0, -${current}px, 0)`;
      }
      
      requestAnimationFrameId = requestAnimationFrame(animate);
    };

    requestAnimationFrameId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('resize', updateHeight);
        cancelAnimationFrame(requestAnimationFrameId);
        observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Ghost div to create scrollable height */}
      <div ref={heightRef} style={{ width: '100%', pointerEvents: 'none' }} />
      
      {/* Fixed container that moves via transform */}
      <div 
        ref={scrollRef} 
        className="will-change-transform"
        style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            zIndex: 1,
            overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SmoothScroll;
