"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Bot } from "lucide-react";

export default function TrialPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background blobs */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
          <div className="glass-card py-12 px-4 shadow-xl sm:rounded-3xl sm:px-10 border border-emerald-100 flex flex-col items-center bg-white/60 backdrop-blur-xl">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">账号创建成功！</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              我们已将初始登录凭证发送至您的邮箱，请查收并即刻开启您的云端办公之旅。
            </p>
            <Link 
              href="/"
              className="w-full flex justify-center py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* 玻璃拟态动态背景 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* 极简顶导 Logo */}
      <div className="relative z-10 flex-shrink-0 flex items-center p-6 lg:p-10 cursor-pointer">
        <Link href="/" className="flex items-center group">
          <ArrowLeft className="w-5 h-5 text-slate-400 mr-4 group-hover:text-cyan-600 transition-colors" />
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-500 flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg shadow-cyan-500/30">
            N
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900">NexSaaS</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          
          {/* 左侧价值主张 (Hero Description + Bullets) */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 border border-cyan-100 mb-6 shadow-sm">
              <span className="text-sm font-semibold text-cyan-700">🚀 新用户专享 14 天完整版</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              开启全新工作流<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
                驱动业务指数级增长
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0">
              无需信用卡绑定，全量功能开放。与全球 10,000+ 顶尖团队一起，重塑企业的数据管理与协同体验。
            </p>

            <div className="space-y-8 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shadow-sm">
                    <Zap className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-slate-900">极致的数据同步</h3>
                  <p className="mt-1.5 text-slate-500 leading-relaxed">毫秒级数据通道，跨端零延迟，告别远程协作焦虑。</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-slate-900">军工级安全隔离</h3>
                  <p className="mt-1.5 text-slate-500 leading-relaxed">SOC2 合规认证，每一条核心数据皆经过端到端加密固化。</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shadow-sm">
                    <Bot className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-slate-900">AI 效能副驾护航</h3>
                  <p className="mt-1.5 text-slate-500 leading-relaxed">内置专属语言模型深度分析流，秒级生成决策建议与报表。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧极简注册表单 */}
          <div className="w-full max-w-md mt-10 lg:mt-0 glass-card bg-white/60 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] border border-white/60 shadow-[0_20px_60px_-15px_rgba(8,145,178,0.15)]">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">免费创建工作空间</h2>
              <p className="text-slate-500 text-sm">三十秒完成注册，随时取消，无隐性消费</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                  公司或团队名称
                </label>
                <input
                  id="company"
                  type="text"
                  required
                  placeholder="例如：NexSaaS 创新科技"
                  className="appearance-none block w-full px-5 py-4 border border-slate-200/80 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-white/90 transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  工作邮箱地址
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="appearance-none block w-full px-5 py-4 border border-slate-200/80 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-white/90 transition-shadow"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-cyan-500/30 text-lg font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      正在配置专属空间...
                    </span>
                  ) : (
                    "开始免费体验"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-xs text-slate-500">
              继续即代表您同意我们的{' '}
              <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-500">服务条款</a>{' '}
              和{' '}
              <a href="#" className="font-semibold text-cyan-600 hover:text-cyan-500">隐私政策</a>。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
