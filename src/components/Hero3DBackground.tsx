import React, { useRef, useEffect } from 'react';
import { Scene } from './Hero3D/Scene';

const Hero3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<Scene | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect mobile devices and adjust quality settings
    const isMobile = window.innerWidth < 768;
    const quality = isMobile ? 'low' : 'high';
    const particleCount = isMobile ? 500 : 1000;
    
    sceneRef.current = new Scene(mountRef.current, {
      particleCount,
      quality
    });

    const handleInteraction = (event: MouseEvent | TouchEvent) => {
      if (!sceneRef.current) return;
      
      if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        if (touch) {
          sceneRef.current.handleMouseMove(touch);
        }
      } else {
        sceneRef.current.handleMouseMove(event);
      }
    };

    const handleResize = () => {
      if (sceneRef.current) {
        sceneRef.current.handleResize();
      }
    };

    // Add event listeners with passive option for better performance
    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('touchmove', handleInteraction, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 overflow-hidden"
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    />
  );
};

export default Hero3DBackground;