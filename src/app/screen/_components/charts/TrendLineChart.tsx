"use client";

import React from 'react';
import useEchart from '@/app/hooks/useEcharts';
import * as echarts from 'echarts';

export default function TrendLineChart({ xAxis, seriesData }: { xAxis: string[], seriesData: number[] }) {
  const { wrapDom } = useEchart({
    options: {
      tooltip: { trigger: 'axis' },
      grid: { top: 40, right: 30, bottom: 20, left: 40, containLabel: true },
      xAxis: {
        type: 'category',
        data: xAxis,
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8' },
        axisTick: { show: false },
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        name: '亿元',
        nameTextStyle: { color: '#94a3b8', align: 'right', padding: [0, 20, 0, 0] },
        splitLine: { lineStyle: { color: '#1e293b', type: 'dashed' } },
        axisLabel: { color: '#94a3b8' }
      },
      series: [
        {
          name: '应收',
          data: seriesData,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#06b6d4' },
          lineStyle: { width: 2, color: '#06b6d4' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(6, 182, 212, 0.4)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0)' }
            ])
          }
        }
      ]
    }
  });

  return <div ref={wrapDom} className="w-full h-full min-h-[200px]" />;
}
