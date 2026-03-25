"use client";

import React from 'react';
import useEchart from '@/app/hooks/useEcharts';

export default function BusinessCompareChart({ 
  xAxis, expected, collected, lineData 
}: { 
  xAxis: string[], expected: number[], collected: number[], lineData: number[] 
}) {
  const { wrapDom } = useEchart({
    options: {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: {
        bottom: 0,
        textStyle: { color: '#cbd5e1' },
        itemWidth: 12, itemHeight: 12,
        data: ['今年实收', '今年应收', '占比']
      },
      grid: { top: 30, right: 40, bottom: 40, left: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8' },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          splitLine: { show: false },
          axisLabel: { color: '#94a3b8' },
          max: 50
        },
        {
          type: 'value',
          name: '100㎡',
          nameTextStyle: { color: '#94a3b8', align: 'left', padding: [0, 0, 0, 10] },
          splitLine: { lineStyle: { color: '#1e293b', type: 'dashed' } },
          axisLabel: { color: '#94a3b8' },
          max: 100
        }
      ],
      series: [
        {
          name: '今年实收',
          type: 'bar',
          barWidth: 16,
          itemStyle: { color: '#2dd4bf' },
          data: collected
        },
        {
          name: '今年应收',
          type: 'bar',
          barWidth: 16,
          itemStyle: { color: '#64748b' },
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
