import React, { useEffect, useState } from 'react';

export default function Header() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTimeStr(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-20 flex items-center justify-between px-6 relative mb-4">
      {/* Background shape mimicking typical dashboard headers */}
      <div className="absolute inset-0 top-0 pointer-events-none flex justify-center">
        {/* A header glow/bg */}
        <div 
          className="w-2/3 h-full"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(30, 58, 138, 0.5) 0%, rgba(15, 23, 42, 0) 70%)',
          }}
        />
        <div className="absolute bottom-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_#3b82f6]" />
      </div>

      <div className="flex items-center space-x-2 z-10 w-1/3">
        {/* simple Home icon placeholder */}
        <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-900/40 border border-blue-500/30 text-blue-400 cursor-pointer hover:bg-blue-800/60 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 text-center z-10 relative">
        <h1 className="text-4xl font-bold tracking-widest text-[#e2e8f0] pb-2 text-shadow-glow">
          资管综合数据大屏
        </h1>
      </div>

      <div className="w-1/3 flex justify-end z-10 text-xl font-mono text-blue-100 tracking-wider">
        {timeStr}
      </div>
    </div>
  );
}
