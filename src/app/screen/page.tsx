import React from 'react';
import { Home, Map, Grid, Layers, CheckSquare } from 'lucide-react';
import ScaleContainer from '@/app/screen/_components/ScaleContainer';

// 引入图表组件
import AssetPieChart from '@/app/screen/_components/charts/AssetPieChart';
import TrendLineChart from '@/app/screen/_components/charts/TrendLineChart';
import BusinessCompareChart from '@/app/screen/_components/charts/BusinessCompareChart';

import { dashboardMockData } from '@/app/screen/_mock/mockData';

interface GlassCardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const GlassCard = ({ title, extra, children, className = '' }: GlassCardProps) => (
  <div className={`bg-[#0d1b3e]/80 border border-blue-500/30 rounded-md backdrop-blur-sm p-3 xl:p-4 flex flex-col shadow-[0_0_15px_rgba(0,100,255,0.1)] ${className}`}>
    {(title || extra) && (
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        {title && (
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.5)]"></div>
            <h3 className="text-white text-sm lg:text-base font-medium tracking-wide">{title}</h3>
          </div>
        )}
        {extra && <div className="text-sky-300 text-xs lg:text-sm font-medium">{extra}</div>}
      </div>
    )}
    <div className="flex-1 w-full relative min-h-0">{children}</div>
  </div>
);

export default function AssetDashboard() {
  return (
    <ScaleContainer width={1920} height={1080}>
      <div className="w-full h-full bg-[#050a1f] flex flex-col relative text-white font-sans overflow-hidden">
        {/* === Header === */}
        <header className="h-[80px] flex-shrink-0 relative flex justify-between items-center px-6">
          <div className="absolute inset-0 border-b border-blue-800/40 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
          
          <div className="flex items-center gap-4 z-10 w-[30%]">
            <div className="p-2 border border-blue-500/40 rounded bg-blue-900/30 text-cyan-400 cursor-pointer hover:bg-blue-800/50 transition-colors">
              <Home size={20} />
            </div>
          </div>
          
          <div className="flex-1 text-center z-10">
            <h1 className="text-3xl xl:text-4xl font-bold tracking-widest bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent transform -skew-x-6">
              资管综合数据大屏
            </h1>
          </div>
          
          <div className="flex items-center justify-end gap-6 z-10 w-[30%] text-sky-200 font-mono text-lg">
            <span>2024-09-09 10:00:00</span>
          </div>
        </header>

        {/* === Main Layout === */}
        <main className="flex-1 p-3 flex flex-col min-h-0 mx-auto w-full max-w-[1920px]">
          
          {/* Top Section Headers */}
          <div className="flex w-full mb-1 px-1 items-center flex-shrink-0">
            {/* Header for Left Col (28%) */}
            <div className="w-[28%] flex gap-4 text-xs xl:text-sm text-sky-200 font-medium items-center pl-2">
              <span className="text-white bg-blue-900/60 border border-blue-500/30 px-3 py-1 rounded cursor-pointer">全部</span>
              <span className="cursor-pointer hover:text-white transition-colors">自有</span>
              <span className="cursor-pointer hover:text-white transition-colors">受托管理</span>
            </div>
            
            {/* Header for Middle Col (47%) */}
            <div className="w-[47%] flex justify-between items-end px-4">
               <span className="text-lg xl:text-xl text-white font-bold tracking-widest pl-[10%] drop-shadow-md">存量资产 (已入库)</span>
               <span className="text-sky-200 text-xs xl:text-sm">方量 <span className="text-yellow-400 font-bold ml-1 text-base">200 万㎡</span></span>
            </div>
            
            {/* Header for Right Col (25%) */}
            <div className="w-[25%] flex justify-between items-end px-3">
               <span className="text-lg xl:text-xl text-white font-bold tracking-widest pl-[10%] drop-shadow-md">在建资产</span>
               <span className="text-sky-200 text-xs xl:text-sm">方量 <span className="text-yellow-400 font-bold ml-1 text-base">42 万㎡</span></span>
            </div>
          </div>

          {/* Grid Layout taking remaining height */}
          <div className="flex-1 grid grid-cols-[28%_47%_minmax(0,1fr)] grid-rows-[35%_34%_minmax(0,1fr)] gap-3 min-h-0">
            
            {/* ======================= LEFT COLUMN (Col 1) ======================= */}
            
            {/* 1. 资产规模 (Col 1, Row 1) */}
            <GlassCard title="资产规模" className="col-start-1 row-start-1">
              <div className="flex h-full gap-2 text-xs xl:text-sm items-center">
                {/* Left dark block */}
                <div className="w-[35%] h-full bg-[#0a2345]/60 border border-blue-500/30 rounded flex flex-col justify-center items-center py-2 text-center">
                  <div className="text-sky-300 mb-2 whitespace-nowrap">方量 (面积)</div>
                  <div className="text-xl xl:text-2xl text-cyan-400 font-bold mb-4">200<span className="text-xs">万㎡</span></div>
                  <div className="flex w-full justify-around items-end px-1 text-sky-200">
                    <div className="text-center"><div className="text-lg text-white font-bold mb-1">50</div><div className="text-[10px] xl:text-xs">资产总数</div></div>
                    <div className="text-center"><div className="text-cyan-400 flex justify-center mb-1"><Map size={20}/></div><div className="text-[10px] xl:text-xs">资产地图</div></div>
                  </div>
                </div>
                {/* Right block */}
                <div className="flex-1 h-full flex flex-col gap-2 justify-center text-sky-200">
                  {['自有', '受托管理'].map(type => (
                    <div key={type} className="flex-1 flex bg-blue-900/30 p-2 rounded items-center border border-blue-500/20">
                      <div className="w-6 flex flex-col items-center justify-center font-bold text-white border-r border-blue-500/50 pr-2 mr-2 text-[10px] xl:text-xs" style={{writingMode: 'vertical-rl', letterSpacing: '1px'}}>{type}</div>
                      <div className="flex-1 flex flex-col justify-around h-full text-[10px] xl:text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span>资产数 <span className="text-cyan-400 font-bold xl:text-sm">50</span><span className="text-cyan-400 scale-75 inline-block">个</span></span>
                          <span>面积 <span className="text-cyan-400 font-bold xl:text-sm">200</span><span className="text-cyan-400 scale-75 inline-block">万㎡</span></span>
                          <span className="text-white bg-blue-500/20 border border-blue-500/40 px-1 rounded flex items-center">总价值 <span className="font-bold ml-1">2.3 万元</span></span>
                        </div>
                        <div className="flex justify-between text-[10px] bg-black/30 px-1 py-1 rounded">
                          <span className="text-sky-400 whitespace-nowrap">权证数</span>
                          <span className="whitespace-nowrap">有证 10</span>
                          <span className="whitespace-nowrap">无证 10</span>
                          <span className="whitespace-nowrap">使用权 10</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* 2. 租赁指标完成率 (Col 1, Row 2) */}
            <GlassCard title="租赁指标完成率" className="col-start-1 row-start-2">
              <div className="flex h-full gap-2 text-[10px] xl:text-xs min-w-0">
                <div className="w-[32%] flex flex-col items-center justify-center gap-2 bg-blue-900/40 rounded border border-blue-500/20 p-2 overflow-hidden text-center self-stretch">
                  <div>
                    <div className="text-sky-300 mb-1 leading-tight">年度租赁实收</div>
                    <div className="text-teal-400 text-base font-bold whitespace-nowrap">1.38 <span className="text-[10px] font-normal">亿元</span></div>
                  </div>
                  <div>
                    <div className="text-sky-300 mb-1 leading-tight">年度计划指标</div>
                    <div className="text-teal-400 text-base font-bold whitespace-nowrap">2.8 <span className="text-[10px] font-normal">亿元</span></div>
                  </div>
                  <div className="mt-1">
                    <div className="text-sky-300 mb-1 leading-tight">完成率</div>
                    <div className="text-teal-400 text-xl font-bold">90%</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-around px-1 overflow-hidden min-w-0 h-full py-1">
                  <div className="flex justify-between w-full">
                    <div className="w-[48%] flex justify-between items-center pr-1 text-sky-200 border-b border-blue-800/40 pb-1.5 whitespace-nowrap">
                      当前出租率 <span className="text-cyan-400 font-bold ml-1">90%</span>
                    </div>
                    <div className="w-[48%] flex justify-between items-center pl-1 text-sky-200 border-b border-blue-800/40 pb-1.5 border-l border-blue-500/40 whitespace-nowrap">
                      总收缴率 <span className="text-cyan-400 font-bold ml-1">90%</span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-[48%] flex justify-between items-center pr-1 text-sky-200 whitespace-nowrap">
                      已出租面积 <span className="text-teal-300 font-bold ml-1">2.5<span className="text-[10px]">万㎡</span></span>
                    </div>
                    <div className="w-[48%] flex justify-between items-center pl-1 text-sky-200 border-l border-blue-500/40 whitespace-nowrap">
                      租金总应收 <span className="text-teal-300 font-bold ml-1">2.44<span className="text-[10px]">亿元</span></span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-[48%] flex justify-between items-center pr-1 text-sky-200 whitespace-nowrap">
                      待出租面积 <span className="text-white font-bold ml-1">3.5<span className="text-[10px]">万㎡</span></span>
                    </div>
                    <div className="w-[48%] flex justify-between items-center pl-1 text-sky-200 border-l border-blue-500/40 whitespace-nowrap">
                      租金总实收 <span className="text-teal-300 font-bold ml-1">1.38<span className="text-[10px]">亿元</span></span>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-[48%] flex justify-between items-center pr-1 text-sky-200 whitespace-nowrap">
                      不可租面积 <span className="text-white font-bold ml-1">3.5<span className="text-[10px]">万㎡</span></span>
                    </div>
                    <div className="w-[48%] flex justify-between items-center pl-1 text-sky-200 border-l border-blue-500/40 whitespace-nowrap">
                      逾期未收款 <span className="text-rose-400 font-bold ml-1">0.18<span className="text-[10px]">亿元</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>


            {/* ======================= MIDDLE COLUMN (Col 2) ======================= */}
            
            {/* 3. 存量资产 (Col 2, Row 1) */}
            <GlassCard className="col-start-2 row-start-1">
              <div className="flex h-full gap-4 relative">
                <div className="w-1/2 flex flex-col relative border-r border-blue-500/30 pr-4 h-full">
                  <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                    <div className="w-1 h-3 bg-cyan-400 rounded-full"></div><h3 className="text-white text-sm">业态分类</h3>
                  </div>
                  <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 place-items-stretch text-xs min-h-0">
                      <div className="flex flex-col items-center justify-center bg-blue-900/20 rounded border border-blue-500/20 hover:bg-blue-800/30 transition-colors">
                         <div className="text-cyan-400 font-bold text-base xl:text-lg mb-1 whitespace-nowrap">0.84<span className="text-white text-[10px] font-normal ml-1">(10%)</span><span className="text-[10px] text-sky-300 ml-1">万㎡</span></div>
                         <div className="text-sky-300">住宅及公寓类</div>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-blue-900/20 rounded border border-blue-500/20 hover:bg-blue-800/30 transition-colors">
                         <div className="text-cyan-400 font-bold text-base xl:text-lg mb-1 whitespace-nowrap">9.41<span className="text-white text-[10px] font-normal ml-1">(30%)</span><span className="text-[10px] text-sky-300 ml-1">万㎡</span></div>
                         <div className="text-sky-300">办公及园区类</div>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-blue-900/20 rounded border border-blue-500/20 hover:bg-blue-800/30 transition-colors">
                         <div className="text-cyan-400 font-bold text-base xl:text-lg mb-1 whitespace-nowrap">0<span className="text-white text-[10px] font-normal ml-1">(0%)</span><span className="text-[10px] text-sky-300 ml-1">万㎡</span></div>
                         <div className="text-sky-300">工业及市政类</div>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-blue-900/20 rounded border border-blue-500/20 hover:bg-blue-800/30 transition-colors">
                         <div className="text-cyan-400 font-bold text-base xl:text-lg mb-1 whitespace-nowrap">10.99<span className="text-white text-[10px] font-normal ml-1">(20%)</span><span className="text-[10px] text-sky-300 ml-1">万㎡</span></div>
                         <div className="text-sky-300">商业及其他类</div>
                      </div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col pl-2 h-full">
                  <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                    <div className="w-1 h-3 bg-cyan-400 rounded-full"></div><h3 className="text-white text-sm">资产状态</h3>
                  </div>
                  <div className="flex-1 w-full relative min-h-0">
                     <div className="absolute inset-0">
                       <AssetPieChart data={dashboardMockData.assetStatus} />
                     </div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 4. 租赁运营 (Col 2, Row 2) */}
            <GlassCard title="租赁运营" extra={<>方量 <span className="text-yellow-400">50 万㎡</span></>} className="col-start-2 row-start-2">
              <div className="flex h-full gap-4 text-xs items-center relative py-1">
                <div className="w-[30%] flex flex-col justify-center gap-4 text-sky-200 h-full border-r border-blue-500/20 pr-4">
                  <div className="flex flex-col items-start gap-1 border-b border-blue-800/50 pb-3 w-full">
                    <div className="text-sky-300 text-xs">本年度收缴率</div>
                    <div className="text-cyan-400 font-bold text-3xl">90%</div>
                  </div>
                  <div className="flex flex-col gap-2 w-full text-[11px] xl:text-xs">
                    <div className="flex justify-between items-center bg-blue-900/30 px-2 py-1.5 rounded border border-blue-500/20 whitespace-nowrap">
                      <span>今年应收</span>
                      <span className="text-teal-400 font-bold text-sm ml-1">1.2 <span className="font-normal text-[10px]">亿元</span></span>
                    </div>
                    <div className="flex justify-between items-center pl-2 whitespace-nowrap">
                      <span className="text-sky-300">其中: 今年新增</span>
                      <span className="text-teal-300 font-bold ml-1">1.0 亿元</span>
                    </div>
                    <div className="flex justify-between items-center pl-2 whitespace-nowrap">
                      <span className="text-sky-300">其中: 历史签约</span>
                      <span className="text-teal-300 font-bold ml-1">0.2 亿元</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 h-full flex flex-col min-w-0 pl-1">
                  <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                    <div className="w-1 h-3 bg-cyan-400 rounded-full"></div><h3 className="text-white text-sm">本年度及后续收缴趋势图</h3>
                  </div>
                  <div className="flex-1 min-h-0 relative bg-blue-900/20 rounded-lg p-1 border border-blue-500/20">
                    <div className="absolute inset-1">
                      <TrendLineChart 
                         xAxis={dashboardMockData.collectionTrend.xAxis}
                         seriesData={dashboardMockData.collectionTrend.series}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>


            {/* ======================= BOTTOM SPANNING CARD (Col 1-2, Row 3) ======================= */}
            
            <GlassCard title="各业态出租率&amp;收缴率" className="col-start-1 col-end-3 row-start-3">
              <div className="flex h-full items-stretch justify-center gap-1 xl:gap-4 text-[11px] xl:text-xs divide-x divide-blue-500/40">
                {['住宅及公寓类', '办公及园区类', '工业及市政类', '商业及其他类'].map((name) => (
                  <div key={name} className="flex-1 flex flex-col h-full px-2 xl:px-4 text-sky-200 group overflow-hidden">
                    <div className="text-center font-bold text-white mb-2 xl:mb-3 text-sm">{name}</div>
                    <div className="flex-1 flex gap-2 xl:gap-3 items-center min-h-0">
                      {/* Left Side (Rates) */}
                      <div className="w-[35%] xl:w-[38%] h-full flex flex-col justify-center items-center gap-2 xl:gap-3 border border-blue-500/20 p-1 xl:p-2 bg-blue-900/20 rounded group-hover:bg-blue-800/40 transition-colors">
                        <div className="text-center w-full">
                          <div className="mb-0.5 xl:mb-1 text-sky-400 text-[10px]">出租率</div>
                          <div className="text-lg xl:text-xl text-cyan-400 font-bold">70%</div>
                        </div>
                        <div className="w-2/3 h-px bg-blue-500/40 my-1 xl:my-2"></div>
                        <div className="text-center w-full">
                          <div className="mb-0.5 xl:mb-1 text-sky-400 text-[10px]">收缴率</div>
                          <div className="text-lg xl:text-xl text-cyan-400 font-bold">70%</div>
                        </div>
                      </div>
                      {/* Right Side (Metrics) */}
                      <div className="flex-1 flex flex-col justify-around gap-1 h-full py-1 text-[10px] xl:text-xs">
                        <div className="flex justify-between items-center whitespace-nowrap w-full"><span className="opacity-80">已出租面积</span><span className="text-teal-300 font-bold">2.5<span className="scale-75 inline-block">万㎡</span></span></div>
                        <div className="flex justify-between items-center whitespace-nowrap w-full"><span className="opacity-80">待出租面积</span><span className="text-white font-bold">3.5<span className="scale-75 inline-block">万㎡</span></span></div>
                        <div className="flex justify-between items-center whitespace-nowrap w-full"><span className="opacity-80">不可租面积</span><span className="text-white font-bold">3.5<span className="scale-75 inline-block">万㎡</span></span></div>
                        
                        <div className="w-full h-px bg-blue-800/60 my-0.5 xl:my-1"></div>
                        
                        <div className="flex justify-between items-center whitespace-nowrap w-full"><span className="opacity-80">应收</span><span className="text-teal-300 font-bold">1.2<span className="scale-75 inline-block">亿元</span></span></div>
                        <div className="flex justify-between items-center whitespace-nowrap w-full"><span className="opacity-80">待收</span><span className="text-white font-bold">1.2<span className="scale-75 inline-block">亿元</span></span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>


            {/* ======================= RIGHT COLUMN (Col 3, Rows 1-3) ======================= */}
            
            {/* 6. 项目规模 (Col 3, Row 1) */}
            <GlassCard title="项目规模" className="col-start-3 row-start-1">
              <div className="flex flex-col h-full text-xs">
                <div className="flex justify-between items-end text-sky-200 px-2 mt-1 border-b border-blue-800/60 pb-2">
                   <div className="w-[20%]"></div>
                   <div className="w-[40%] text-center font-bold text-white flex flex-col items-center">
                     <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center mb-1 shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                       <Map className="w-4 h-4 text-cyan-400" />
                     </div>
                     开发类
                   </div>
                   <div className="w-[40%] text-center font-bold text-white flex flex-col items-center">
                     <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center mb-1 shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                       <Grid className="w-4 h-4 text-cyan-400" />
                     </div>
                     微更新类
                   </div>
                </div>
                <div className="flex-1 flex flex-col justify-around py-2 px-2 bg-gradient-to-b from-blue-900/10 to-transparent">
                   <div className="flex justify-between items-center text-sky-200">
                     <div className="w-[22%] bg-blue-900/40 py-1 rounded border border-blue-500/20 text-center text-[10px]">项目数</div>
                     <div className="w-[39%] text-center text-cyan-400 font-bold xl:text-lg">3 <span className="text-[10px] font-normal">个</span></div>
                     <div className="w-[39%] text-center text-cyan-400 font-bold xl:text-lg">3 <span className="text-[10px] font-normal">个</span></div>
                   </div>
                   <div className="flex justify-between items-center text-sky-200">
                     <div className="w-[22%] bg-blue-900/40 py-1 rounded border border-blue-500/20 text-center text-[10px]">面积</div>
                     <div className="w-[39%] text-center text-teal-300 font-bold xl:text-base">21 <span className="text-[10px] font-normal">万㎡</span></div>
                     <div className="w-[39%] text-center text-teal-300 font-bold xl:text-base">21 <span className="text-[10px] font-normal">万㎡</span></div>
                   </div>
                   <div className="flex justify-between items-center text-sky-200">
                     <div className="w-[22%] bg-blue-900/40 py-1 rounded border border-blue-500/20 text-center text-[10px]">总投资</div>
                     <div className="w-[39%] text-center text-cyan-400 font-bold xl:text-base">0.1 <span className="text-[10px] font-normal">万元</span></div>
                     <div className="w-[39%] text-center text-cyan-400 font-bold xl:text-base">0.1 <span className="text-[10px] font-normal">万元</span></div>
                   </div>
                </div>
              </div>
            </GlassCard>

            {/* 7. 物业项目 (物业服务类, Col 3, Row 2) */}
            <GlassCard title="物业服务类" extra={<>方量 <span className="text-yellow-400">10 万㎡</span></>} className="col-start-3 row-start-2">
              <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                 <div className="w-1 h-3 bg-cyan-400 rounded-full"></div><h3 className="text-white text-sm">物业项目</h3>
              </div>
              
              <div className="flex-1 flex flex-col justify-between text-[11px] xl:text-xs">
                 <div className="flex justify-around items-center text-sky-200 bg-blue-900/10 py-2 rounded-lg border border-blue-500/10 mb-2">
                    <div className="flex flex-col items-center gap-1">
                       <div className="w-8 h-8 rounded-full bg-blue-800/50 border border-blue-500/40 flex items-center justify-center text-cyan-300 mb-1"><Map size={14}/></div>
                       <div className="whitespace-nowrap">项目总数</div>
                       <div className="text-teal-300 font-bold text-sm xl:text-base">50<span className="text-[10px] ml-1 font-normal">个</span></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                       <div className="w-8 h-8 rounded-full bg-blue-800/50 border border-blue-500/40 flex items-center justify-center text-cyan-300 mb-1"><Layers size={14}/></div>
                       <div className="whitespace-nowrap">新签合同</div>
                       <div className="text-teal-300 font-bold text-sm xl:text-base">50<span className="text-[10px] ml-1 font-normal">万元</span></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                       <div className="w-8 h-8 rounded-full bg-blue-800/50 border border-blue-500/40 flex items-center justify-center text-cyan-300 mb-1"><CheckSquare size={14}/></div>
                       <div className="whitespace-nowrap">今年实收</div>
                       <div className="text-teal-300 font-bold text-sm xl:text-base">50<span className="text-[10px] ml-1 font-normal">万元</span></div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-[38%_62%] gap-x-2 text-sky-200 items-center bg-blue-900/20 p-2 rounded border border-blue-500/20 mb-2">
                    <div className="text-center">今年应收 <br/><span className="text-cyan-400 font-bold text-lg leading-tight mt-1 inline-block">71 <span className="text-[10px] font-normal">万元</span></span></div>
                    <div className="flex flex-col gap-1 border-l border-blue-500/40 pl-2">
                       <div className="flex justify-between items-center pr-1"><span className="text-[10px]">其中: 历史签约</span> <span className="text-white font-bold ml-1">51万</span></div>
                       <div className="flex justify-between items-center pr-1"><span className="text-[10px]">其中: 今年新增</span> <span className="text-white font-bold ml-1">20万</span></div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-[38%_62%] gap-x-2 text-sky-200 items-center bg-blue-900/20 p-2 rounded border border-blue-500/20">
                    <div className="text-center">后续应收 <br/><span className="text-cyan-400 font-bold text-lg leading-tight mt-1 inline-block">66 <span className="text-[10px] font-normal">万元</span></span></div>
                    <div className="flex flex-col gap-1 border-l border-blue-500/40 pl-2">
                       <div className="flex justify-between items-center pr-1"><span className="text-[10px]">其中: 历史签约</span> <span className="text-white font-bold ml-1">26万</span></div>
                       <div className="flex justify-between items-center pr-1"><span className="text-[10px]">其中: 今年新增</span> <span className="text-white font-bold ml-1">40万</span></div>
                    </div>
                 </div>
              </div>
            </GlassCard>

            {/* 8. 业务分类 (Col 3, Row 3) */}
            <GlassCard title="业务分类" className="col-start-3 row-start-3">
              <div className="absolute inset-2 pt-1">
                <BusinessCompareChart 
                  xAxis={dashboardMockData.businessCategoryChart.xAxis}
                  expected={dashboardMockData.businessCategoryChart.expected}
                  collected={dashboardMockData.businessCategoryChart.collected}
                  lineData={dashboardMockData.businessCategoryChart.lineData}
                />
              </div>
            </GlassCard>

          </div>
        </main>
      </div>
    </ScaleContainer>
  );
}
