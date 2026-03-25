import React from 'react';

interface GlassCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  rightNode?: React.ReactNode;
}

export default function GlassCard({ title, children, className = '', rightNode }: GlassCardProps) {
  return (
    <div className={`relative flex flex-col bg-[#0b1736]/60 backdrop-blur-md border border-blue-500/20 shadow-[inset_0_0_20px_rgba(30,58,138,0.1)] ${className}`}>
      {/* 4 Corners decorative borders */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500/80"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500/80"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400"></div>

      {title && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-transparent">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-4 bg-cyan-400 shadow-[0_0_8px_#22d3ee] rounded-full"></div>
            <h3 className="text-slate-100 font-semibold tracking-wide text-[15px]">{title}</h3>
          </div>
          {rightNode && <div>{rightNode}</div>}
        </div>
      )}
      <div className="flex-1 p-3 relative z-10 flex flex-col">
        {children}
      </div>
    </div>
  );
}
