"use client";

import React, { useState, useRef, useCallback } from 'react';
import { parseTimesheetCsv, DaySummary, exportToWeeklyCsv } from '@/utils/csvParser';
import DailyTrendChart from './_components/DailyTrendChart';
import LogList from './_components/LogList';

export default function TimesheetPage() {
  const [data, setData] = useState<DaySummary[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('请上传 .csv 格式的文件');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      const results = parseTimesheetCsv(csvText);
      setData(results);
      const total = results.reduce((acc, curr) => acc + curr.dailyTotal, 0);
      setTotalHours(total);
    };
    reader.readAsText(file);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleExport = () => {
    if (data.length === 0) return;
    const csvContent = exportToWeeklyCsv(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `周报分析_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div 
      className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 sm:p-10 transition-colors duration-500"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="max-w-5xl mx-auto space-y-12 relative">
        
        {/* 背景光晕装饰 */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* 拖拽上传覆盖层 */}
        {isDragging && (
          <div className="fixed inset-0 z-50 bg-teal-500/10 backdrop-blur-sm flex items-center justify-center p-10 border-[6px] border-dashed border-teal-400 pointer-events-none animate-in fade-in zoom-in duration-300">
            <div className="bg-slate-900 px-12 py-8 rounded-[3rem] shadow-[0_0_50px_rgba(20,184,166,0.2)] text-center scale-110">
              <div className="text-teal-400 text-6xl mb-4">📥</div>
              <p className="text-2xl font-black text-white italic">Drop to Parse CSV</p>
            </div>
          </div>
        )}
        
        {/* Header & Upload Section */}
        <header className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 pb-10 border-b border-white/5 relative z-10">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-white mb-2 italic">工时分析<span className="text-teal-400">中台</span></h1>
            <p className="text-slate-500 text-sm tracking-wide">支持拖拽导入 CSV 并自动生成矩阵式周报</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end mr-2">
               <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1 opacity-50">Impact Total</span>
               <span className="text-4xl font-mono font-black text-teal-400 tracking-tighter">{totalHours.toFixed(1)}h</span>
            </div>
            
            <div className="flex items-center gap-3">
              {data.length > 0 && (
                <button 
                  onClick={handleExport}
                  className="bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-2xl font-black transition-all duration-300 border border-white/10 hover:scale-105 active:scale-95 flex items-center gap-3 backdrop-blur-md whitespace-nowrap"
                >
                  <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  导出周报 (CSV)
                </button>
              )}

              <label className="relative cursor-pointer group">
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   onChange={handleFileUpload} 
                   accept=".csv" 
                   className="hidden" 
                 />
                 <div className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-10 py-3.5 rounded-2xl font-black transition-all duration-300 shadow-[0_10px_30px_rgba(20,184,166,0.3)] hover:scale-105 active:scale-95 flex items-center gap-3 whitespace-nowrap">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                   </svg>
                   导入 CSV 
                 </div>
              </label>
            </div>
          </div>
        </header>

        {/* 统计趋势图 (仅在有数据时显示) */}
        {data.length > 0 && (
          <section className="bg-white/[0.02] p-8 rounded-[3rem] border border-white/5 shadow-inner animate-in fade-in duration-1000">
            <div className="flex items-center gap-3 mb-8">
               <span className="w-2 h-6 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]"></span>
               <h2 className="text-lg font-black text-slate-100 uppercase tracking-[0.2em]">投入负荷趋势</h2>
            </div>
            <DailyTrendChart data={data.map(d => ({ date: d.date, total: d.dailyTotal }))} />
          </section>
        )}

        {/* 主数据列表 */}
        <section className="relative z-10">
          <LogList data={data} />
        </section>

        <footer className="pt-20 pb-10 text-center border-t border-white/5 opacity-50">
            <p className="text-slate-700 text-[10px] uppercase tracking-widest font-black">Weekly Grid Export // High-Fidelity CSV // Powered by Anti-Gravity</p>
        </footer>
      </div>
    </div>
  );
}
