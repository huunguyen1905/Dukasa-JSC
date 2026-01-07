
import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  duration?: number; // Duration in ms
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '',
  duration = 1000 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Trigger slightly before the element is fully in view (10% visibility)
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // Trigger animation slightly before bottom of screen
    });

    if (domRef.current) observer.observe(domRef.current);

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  // Determine initial state based on direction
  const getInitialState = () => {
    switch (direction) {
      case 'up': return 'translate-y-16 opacity-0 blur-[2px] scale-[0.98]';
      case 'down': return '-translate-y-16 opacity-0 blur-[2px] scale-[0.98]';
      case 'left': return '-translate-x-16 opacity-0 blur-[2px]';
      case 'right': return 'translate-x-16 opacity-0 blur-[2px]';
      case 'none': return 'opacity-0 blur-[4px] scale-95';
      default: return 'opacity-0';
    }
  };

  const getVisibleState = () => {
    return 'translate-x-0 translate-y-0 opacity-100 blur-0 scale-100';
  };

  return (
    <div
      ref={domRef}
      className={`
        ${className} 
        transform-gpu 
        transition-all 
        ease-out-expo 
        will-change-[transform,opacity,filter]
        ${isVisible ? getVisibleState() : getInitialState()}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
