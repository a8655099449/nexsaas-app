"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Menu, ArrowRight, TrendingUp, Zap, 
  ShieldCheck, Blocks, BarChart3, Users, 
  Bot, Twitter, Github, Linkedin 
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

  return (
    <div className="relative min-h-screen pb-10">
      {/* 动态背景层 */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-slate-50">
        <div className="blob bg-blue-200 w-96 h-96 rounded-full top-0 left-0 mix-blend-multiply"></div>
        <div 
          className="blob bg-indigo-200 w-96 h-96 rounded-full top-40 right-20 mix-blend-multiply"
          style={{ animationDelay: "2s" }}
        ></div>
        <div 
          className="blob bg-orange-100 w-80 h-80 rounded-full bottom-20 left-40 mix-blend-multiply"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* 导航栏 */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "shadow-md glass-card" : "glass-panel"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xl mr-3 shadow-lg shadow-blue-500/30">
                N
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900">NexSaaS</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">产品功能</a>
              <a href="#solutions" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">解决方案</a>
              <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">价格方案</a>
              <Link href="/login" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">登录</Link>
              <Link href="/trial" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg shadow-blue-500/30 transition-all duration-200 cursor-pointer hover:-translate-y-0.5">
                免费试用
              </Link>
            </div>
            {/* 移动端菜单按钮 */}
            <div className="md:hidden flex items-center">
              <button className="text-slate-600 hover:text-blue-600 focus:outline-none">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-md rounded-full px-4 py-2 border border-blue-100 mb-8 mx-auto shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-700">v2.0 全新版本上线，性能提升 300%</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
              重塑您的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">业务流</span><br />实现指数级增长
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              一体化云端工作台，将混乱的数据转化为清晰的洞察。让您的团队专注于创新，把繁杂流程交给我们。
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/trial" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600 shadow-xl shadow-orange-500/20 transition-all duration-200 cursor-pointer hover:-translate-y-1">
                立即开启免费试用
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="#demo" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-slate-200 text-lg font-medium rounded-full text-slate-700 bg-white/50 hover:bg-white/80 hover:border-slate-300 backdrop-blur-sm transition-all duration-200 cursor-pointer hover:-translate-y-1">
                预约产品演示
              </a>
            </div>
          </div>

          {/* 产品界面预览 (Dashboard Mockup) */}
          <div className="mt-20 relative mx-auto max-w-6xl">
            <div className="glass-panel rounded-2xl p-2 md:p-4 relative">
              <div className="flex space-x-2 absolute top-4 md:top-6 left-4 md:left-6 z-10">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shadow-inner relative aspect-video flex items-center justify-center mt-6">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-white"></div>
                <div className="relative w-full h-full p-8 flex flex-col">
                  <div className="flex justify-between items-end mb-8">
                    <div className="space-y-3">
                      <div className="h-4 w-32 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-8 w-48 bg-slate-300 rounded animate-pulse"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse"></div>
                      <div className="h-8 w-8 bg-slate-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mb-8 h-24">
                    <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
                      <div className="h-3 w-20 bg-slate-100 rounded"></div>
                      <div className="h-6 w-24 bg-slate-200 rounded mt-2"></div>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
                      <div className="h-3 w-20 bg-slate-100 rounded"></div>
                      <div className="h-6 w-24 bg-blue-600/20 rounded mt-2"></div>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-100 shadow-sm p-4 flex flex-col justify-between">
                      <div className="h-3 w-20 bg-slate-100 rounded"></div>
                      <div className="h-6 w-24 bg-orange-500/20 rounded mt-2"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-white border border-slate-100 rounded-lg p-6 shadow-sm flex items-end space-x-4">
                    <div className="w-full bg-slate-100 rounded-t-sm h-[40%]"></div>
                    <div className="w-full bg-blue-600/30 rounded-t-sm h-[70%]"></div>
                    <div className="w-full bg-slate-100 rounded-t-sm h-[50%]"></div>
                    <div className="w-full bg-orange-500/40 rounded-t-sm h-[90%]"></div>
                    <div className="w-full bg-slate-100 rounded-t-sm h-[60%]"></div>
                    <div className="w-full bg-blue-600 rounded-t-sm h-[100%]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className="absolute -right-6 md:-right-12 top-1/4 glass-card p-4 rounded-xl hidden md:flex items-center space-x-4 pointer-events-none animate-bounce" 
              style={{ animationDuration: "3s" }}
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium tracking-wide">本月营收增长</p>
                <p className="text-lg font-bold text-slate-800">+124%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-wide text-blue-600 uppercase animate-pulse">Core Features</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              为您精心打磨的每一个细节
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              摆脱繁杂工具的拼接，在一个平台上搞定全部核心业务流程。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">极致的数据同步</h3>
              <p className="text-slate-600 leading-relaxed">
                毫秒级的数据流传输，无论您的团队在世界何处，告别延迟焦虑。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">银行级安全防护</h3>
              <p className="text-slate-600 leading-relaxed">
                端到端加密、SOC2 认证合规。您的核心数据固若金汤。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Blocks className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">无缝的生态接入</h3>
              <p className="text-slate-600 leading-relaxed">
                开放超过 500+ API 接口，轻松对接主流工具，构建自动化飞轮。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">多维可视化图表</h3>
              <p className="text-slate-600 leading-relaxed">
                内置数十种高可用业务漏斗与增长报表，无需写一行 SQL 洞悉业务健康度。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">智能权限矩阵</h3>
              <p className="text-slate-600 leading-relaxed">
                基于角色的动态权限分配，精确控制每位成员视图与操作权限，大团队首选。
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI 效能副驾</h3>
              <p className="text-slate-600 leading-relaxed">
                利用最新的语言模型为您分析并提供建议策略，您的专属顾问。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section id="cta" className="py-24 relative overflow-hidden z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="glass-panel bg-gradient-to-br from-blue-600/95 to-blue-400/95 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-500 opacity-20 rounded-full blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight relative z-10">
              准备好颠覆您的工作方式了吗？
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
              无需绑定信用卡，即刻获得 14 天全功能免费体验。已有 10,000+ 团队加入。
            </p>
            <div className="flex justify-center mt-8 relative z-10">
              <Link href="/trial" className="w-full sm:w-auto px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-2xl transition-all duration-300 shadow-2xl shadow-orange-500/40 hover:-translate-y-1 cursor-pointer">
                极速创建免费工作空间
              </Link>
            </div>
            <p className="mt-4 text-sm text-blue-200 relative z-10 group cursor-default">
              注册即表明您同意服务条款和隐私政策。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-200/50 pt-16 pb-8 text-slate-600 relative z-10 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-lg mr-2">N</div>
                <span className="font-bold text-xl text-slate-800">NexSaaS</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                我们致力于为现代企业提供最清晰、最高效的数据协同工具箱。
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Twitter className="w-5 h-5"/></a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Github className="w-5 h-5"/></a>
                <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5"/></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">产品</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">核心功能</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">集成中心</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">安全机制</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">资源</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">帮助文档</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">开发者 API</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">设计资源</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider">关于</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">公司简介</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">加入我们 <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Hot</span></a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2026 NexSaaS Inc. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
