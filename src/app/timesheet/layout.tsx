import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日报工具 | NexSaaS 效率中心',
  description: '支持拖拽导入 CSV 并自动生成矩阵式周报',
};

export default function TimesheetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
