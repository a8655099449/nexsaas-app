import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '图片处理 | NexSaaS 效率中心',
  description: '针对 H5 活动与地图 Marker 的高性能极致压缩工具',
};

export default function ImageOptimizerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
