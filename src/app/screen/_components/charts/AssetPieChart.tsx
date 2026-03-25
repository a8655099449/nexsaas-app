"use client";

import React from 'react';
import useEchart from '@/app/hooks/useEcharts';

export default function AssetPieChart({ data }: { data: { name: string, value: number }[] }) {
  const { wrapDom } = useEchart({
    options: {
      tooltip: { trigger: 'item' },
      legend: {
        bottom: '0%',
        left: 'center',
        textStyle: { color: '#cbd5e1' },
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
      },
      // Tech style colors mapping to the screenshot (cyan, yellow, purple-blue)
      color: ['#0ea5e9', '#f59e0b', '#6366f1'],
      series: [
        {
          name: '资产状态',
          type: 'pie',
          radius: ['50%', '75%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: '{c}万㎡',
            color: '#e2e8f0',
          },
          labelLine: { show: true, length: 10, length2: 15, smooth: true },
          data: data,
        }
      ]
    }
  });

  return <div ref={wrapDom} className="w-full h-full min-h-[160px]" />;
}
