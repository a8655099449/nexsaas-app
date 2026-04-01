"use client";

import React from 'react';
import * as echarts from 'echarts';
import useEchart from '@/app/hooks/useEcharts';

export default function BusinessCompareChart({ 
  xAxis, expected, collected, lineData 
}: { 
  xAxis: string[], expected: number[], collected: number[], lineData: number[] 
}) {
  const { wrapDom } = useEchart({
    options: {
      tooltip: { 
        trigger: 'axis', 
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: '#334155',
        textStyle: { color: '#f8fafc' },
        formatter: (params: { seriesName: string; value: string | number; color: string; axisValue: string }[]) => {
          let html = `<div class="mb-1 text-slate-400 text-[10px]">${params[0].axisValue}</div>`;
          params.forEach((item) => {
            const val = item.seriesName === '占比' 
              ? (parseFloat(String(item.value)) * 100).toFixed(1) + '%' 
              : item.value;
            html += `
              <div class="flex items-center justify-between gap-4 text-xs mt-1">
                <div class="flex items-center gap-1.5">
                  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background-color:${item.color};"></span>
                  <span class="text-slate-400">${item.seriesName}</span>
                </div>
                <span class="font-medium text-slate-200">${val}</span>
              </div>
            `;
          });
          return html;
        }
      },
      legend: {
        bottom: 5,
        textStyle: { color: '#cbd5e1' },
        itemWidth: 12, itemHeight: 12,
        data: ['今年实收', '今年应收', '占比']
      },
      grid: { top: 30, right: 40, bottom: 50, left: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8', interval: 0 },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          splitLine: { show: false },
          axisLabel: { color: '#94a3b8' },
        },
        {
          type: 'value',
          name: '百分比',
          nameTextStyle: { color: '#94a3b8', align: 'left', padding: [0, 0, 0, 10] },
          splitLine: { lineStyle: { color: '#1e293b', type: 'dashed' } },
          axisLabel: { 
            color: '#94a3b8',
            formatter: (value: number) => (value * 100).toFixed(0) + '%'
          },
        }
      ],
      series: [
        {
          name: '今年实收',
          type: 'bar',
          barWidth: 12,
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2dd4bf' },
              { offset: 1, color: '#0d9488' }
            ]),
            borderRadius: [4, 4, 0, 0]
          },
          data: collected
        },
        {
          name: '今年应收',
          type: 'bar',
          barWidth: 12,
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#94a3b8' },
              { offset: 1, color: '#475569' }
            ]),
            borderRadius: [4, 4, 0, 0]
          },
          data: expected
        },
        {
          name: '占比',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          symbolSize: 6,
          itemStyle: { color: '#fbbf24' },
          lineStyle: { color: '#fbbf24', width: 2 },
          data: lineData
        }
      ]
    }
  });

  return <div ref={wrapDom} className="w-full h-full min-h-[220px]" />;
}
