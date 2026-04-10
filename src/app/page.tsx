"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  FileText, 
  Image as ImageIcon,
  Sparkles,
  Github,
  LayoutGrid,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tools = [
    {
      title: "日报工具",
      description: "一键分析 CSV 数据，智能提取工时投入。支持矩阵式周报导出，让汇报不再繁琐。",
      icon: <FileText className="w-8 h-8 md:w-10 md:h-10" />,
      color: "blue",
      href: "/timesheet",
      tag: "自动化",
    },
    {
      title: "图片处理",
      description: "纯前端高清无损压缩，支持 WebP 批量转换与拼音重命名。专为地图 Marker 精确优化。",
      icon: <ImageIcon className="w-8 h-8 md:w-10 md:h-10" />,
      color: "orange",
      href: "/image-optimizer",
      tag: "高效率",
    }
  ];

  return (
    <div className="relative min-h-screen bg-background-app selection:bg-primary/20">
      {/* 动态背景层 */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="blob bg-blue-200/40 w-[600px] h-[600px] -top-52 -left-52" />
        <div 
          className="blob bg-indigo-200/30 w-[500px] h-[500px] top-1/2 right-[-200px]"
          style={{ animationDelay: "2s" }}
        />
        <div 
          className="blob bg-orange-100/40 w-[400px] h-[400px] bottom-0 left-1/4"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* 导航栏 */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-md glass-card py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              N
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 italic">NexSaaS<span className="text-primary not-italic">.</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" className="text-slate-400 hover:text-slate-900 transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="relative z-10 max-w-2xl pl-8 border-l-4 border-orange-500/20">
            <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-primary to-transparent rounded-full" />
            
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-md rounded-full px-4 py-1.5 border border-white mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">NexSaaS 效能中心 v3.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
              只做 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">有用</span> 的工具<br />拒绝多余操作
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
              这里没有复杂的 SaaS 订阅，只有开箱即用的高效率。
              <br className="hidden md:block" />
              纯前端运行，数据永不离岸。
            </p>
          </div>

          {/* New Decorative Background Area */}
          <div className="relative flex-1 w-full max-w-lg hidden lg:block">
            {/* Main Hero Image */}
            <div className="relative z-10 animate-float">
               <img 
                 src="/hero-bg.png" 
                 alt="Abstract Background" 
                 className="w-full h-auto drop-shadow-2xl rounded-3xl"
               />
            </div>
            
            {/* Contrasting Color Block / Accents */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/20 blur-3xl rounded-full" />
            
            {/* Geometric Accent Line */}
            <div className="absolute top-1/2 -right-4 w-1 h-32 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50" />
          </div>
        </div>
      </section>

      {/* Tools Portal Grid */}
      <section className="relative z-10 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {tools.map((tool) => (
              <Link 
                key={tool.title} 
                href={tool.href}
                className="group relative"
              >
                <div className={`glass-card p-1 items-start rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] bg-white/40 overflow-hidden`}>
                  <div className="p-8 md:p-12 relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                        tool.color === 'blue' 
                        ? 'bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white shadow-xl shadow-blue-500/10' 
                        : 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white shadow-xl shadow-orange-500/10'
                      }`}>
                        {tool.icon}
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-white/80 border border-white text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                        {tool.tag}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        {tool.title}
                        <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-2 transition-all" />
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed text-lg">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-12 flex items-center gap-2 text-sm font-black text-slate-900">
                      <span className="group-hover:mr-2 transition-all duration-300">立即进入</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>

                  {/* Decorative Background for Card */}
                  <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 ${
                    tool.color === 'blue' ? 'bg-primary' : 'bg-orange-500'
                  }`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="relative pt-20 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-slate-200/50 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-50">
             <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">N</div>
             <span className="font-bold text-sm tracking-tight">NexSaaS Tools Portal</span>
          </div>
          <p className="text-slate-400 text-xs font-medium">
            &copy; 2026 NexSaaS Inc. 开源工具集 · 隐私至上
          </p>
          <div className="flex gap-8 text-xs font-bold text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors uppercase tracking-widest">Help</a>
            <a href="#" className="hover:text-slate-900 transition-colors uppercase tracking-widest">Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
