"use client";

import React from 'react';
import { DaySummary } from '@/utils/csvParser';

interface Props {
  data: DaySummary[];
}

export default function LogList({ data }: Props) {
  return (
    <div className="space-y-10">
      {data.map((day) => (
        <div key={day.date} className="relative group">
          {/* 日期标题 */}
          <div className="sticky top-0 z-10 flex items-center justify-between py-4 px-6 bg-[#0f172a] border-b border-white/5 mb-6 shadow-2xl">
            <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
              <span className="w-2 h-8 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]"></span>
              {day.date}
            </h3>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-800/50 rounded-full border border-white/5">
               <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Daily Total</span>
               <span className="text-teal-400 font-mono font-bold text-lg">{day.dailyTotal.toFixed(1)}h</span>
            </div>
          </div>

          {/* 项目分组列表 */}
          <div className="space-y-8 ml-6 border-l border-white/5 pl-8 pb-4">
            {day.projectGroups.map((group, gIdx) => (
              <div key={`${day.date}-${group.projectName}-${gIdx}`} className="relative">
                {/* 项目名与总小时数 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    <h4 className="text-xl font-bold text-slate-100 tracking-tight">{group.projectName}</h4>
                  </div>
                  <div className="text-amber-400 font-mono font-bold bg-amber-500/10 px-4 py-1 rounded-xl border border-amber-500/20 shadow-inner">
                    {group.totalHours.toFixed(1)} 小时
                  </div>
                </div>

                {/* 处理说明明细 */}
                <div className="grid gap-4">
                  {group.items.map((item, iIdx) => (
                    <div 
                      key={`${day.date}-${group.projectName}-${iIdx}`} 
                      className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-2xl p-6 transition-all duration-300 group-hover:border-teal-500/20"
                    >
                       <div className="flex justify-between items-start mb-4">
                          <span className="text-slate-200 text-sm font-medium leading-relaxed max-w-[80%]">{item.summary}</span>
                          <span className="text-[10px] font-mono text-slate-600 bg-black/20 px-2 py-0.5 rounded tracking-tighter">#{item.key}</span>
                       </div>
                       
                       {item.description && (
                         <div className="mt-2 p-5 bg-black/20 rounded-2xl border border-white/5 text-[13px] text-slate-400 leading-relaxed font-sans">
                            <div className="text-[10px] text-slate-600 uppercase mb-3 font-black tracking-widest flex items-center gap-2">
                               <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                               处理说明
                            </div>
                            <div className="whitespace-pre-wrap">{item.description}</div>
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/5 text-slate-600">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
             </svg>
          </div>
          <p className="text-slate-500 text-sm italic font-medium">拽入 CSV 或点击上方按钮开始分析</p>
        </div>
      )}
    </div>
  );
}
