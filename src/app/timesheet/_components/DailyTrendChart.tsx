"use client";

import React from 'react';
import * as echarts from 'echarts';
import useEchart from '@/app/hooks/useEcharts';

interface Props {
  data: { date: string, total: number }[];
}

export default function DailyTrendChart({ data }: Props) {
  const { wrapDom } = useEchart({
    options: {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: '#334155',
        textStyle: { color: '#f8fafc' },
        formatter: '{b}: <span class="font-bold text-teal-400">{c}h</span>'
      },
      grid: { top: 20, right: 20, bottom: 40, left: 40, containLabel: false },
      xAxis: {
        type: 'category',
        data: data.map(d => d.date.split('-').slice(1).join('.')), // MM.DD
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        name: 'Hours',
        nameTextStyle: { color: '#64748b', fontSize: 10 },
        splitLine: { lineStyle: { color: '#1e293b', type: 'dashed' } },
        axisLabel: { color: '#94a3b8' }
      },
      series: [{
        data: data.map(d => d.total),
        type: 'bar',
        barWidth: 16,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2dd4bf' },
            { offset: 1, color: '#0d9488' }
          ]),
          borderRadius: [4, 4, 0, 0]
        }
      }]
    }
  });

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-sm h-[200px]">
      <div ref={wrapDom} className="w-full h-full" />
    </div>
  );
}
