"use client";

import React, { useEffect, useState } from 'react';

export default function ScaleContainer({ children }: { children: React.ReactNode }) {
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const designWidth = 1920;
      const designHeight = 1080;
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      
      const scaleX = clientWidth / designWidth;
      const scaleY = clientHeight / designHeight;
      setScaleX(scaleX);
      setScaleY(scaleY);
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Use slightly brighter tech-blue background #0B1938
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#0A1128] font-sans selection:bg-blue-500/30 z-50">
      <div
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: 'left top',
        }}
        className="absolute top-0 left-0 bg-[#0B1938] text-slate-50 flex flex-col overflow-hidden shadow-2xl shadow-blue-900/20"
      >
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,138,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        {/* Radial Glow Tops */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
        
        {children}
      </div>
    </div>
  );
}
