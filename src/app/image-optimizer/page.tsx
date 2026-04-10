'use client';

import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  Settings, 
  Trash2, 
  Download, 
  Zap, 
  FileImage, 
  CheckCircle2, 
  MinusCircle,
  AlertCircle,
  ArrowRight,
  Maximize2,
  Package
} from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ImageFile, OptimizerSettings, ExportFormat } from './types';
import { processImage, generateNewName, getImageDimensions } from './utils';

export default function ImageOptimizerPage() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<OptimizerSettings>({
    format: 'webp',
    quality: 80,
    renameMode: 'original',
    prefix: '',
    isMarkerMode: false,
    targetSize: 200,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;

    const newImageFiles = await Promise.all(
      uploadedFiles.map(async (file) => {
        const dimensions = await getImageDimensions(file);
        return {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          file,
          originalSize: file.size,
          originalDimensions: dimensions,
          status: 'pending' as const,
        };
      })
    );

    setFiles((prev) => [...prev, ...newImageFiles]);
  }, []);

  const onFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    await addFiles(uploadedFiles);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [addFiles]);

  const [isHovering, setIsHovering] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);
    await addFiles(uploadedFiles);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      const removed = prev.find((f) => f.id === id);
      if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
      return filtered;
    });
  };

  const clearAll = () => {
    files.forEach(f => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  const handleProcessAll = async () => {
    setIsProcessing(true);
    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status === 'done' && !settings.isMarkerMode) continue;

      try {
        updatedFiles[i].status = 'processing';
        setFiles([...updatedFiles]);

        const result = await processImage(updatedFiles[i], settings);
        const newName = generateNewName(updatedFiles[i].name, settings);

        updatedFiles[i] = {
          ...updatedFiles[i],
          ...result,
          newName,
          status: 'done',
        };
      } catch (err) {
        updatedFiles[i].status = 'error';
        updatedFiles[i].error = (err as Error).message;
      }
      setFiles([...updatedFiles]);
    }
    setIsProcessing(false);
  };

  const downloadZip = async () => {
    const zip = new JSZip();
    files.forEach((f) => {
      if (f.outputBlob && f.newName) {
        zip.file(f.newName, f.outputBlob);
      }
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `optimized_assets_${new Date().getTime()}.zip`);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background-app p-6 md:p-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="blob bg-primary w-96 h-96 -top-20 -left-20" />
      <div className="blob bg-cta w-80 h-80 bottom-0 right-0 opacity-40" />

      <main className="max-w-6xl mx-auto space-y-8 relative z-10">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Zap size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-text-app">图片优化大师</h1>
          </div>
          <p className="text-slate-500 font-medium">针对 H5 活动与地图 Marker 的高性能极致压缩工具</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Panel */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/40">
                <Settings className="text-primary" size={20} />
                <h2 className="font-bold text-lg">导出配置</h2>
              </div>

              <div className="space-y-5">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-600 block">导出格式</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['webp', 'png', 'jpeg'] as ExportFormat[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setSettings({ ...settings, format: f })}
                        className={`py-2 px-3 rounded-xl text-sm font-bold transition-all ${
                          settings.format === f
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white/50 hover:bg-white text-slate-600'
                        }`}
                      >
                        {f.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-bold text-slate-600">压缩质量</label>
                    <span className="text-primary font-black">{settings.quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={settings.quality}
                    onChange={(e) => setSettings({ ...settings, quality: parseInt(e.target.value) })}
                    className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-600 block">命名模式</label>
                  <div className="flex p-1 bg-slate-100 rounded-xl">
                    <button
                      onClick={() => setSettings({ ...settings, renameMode: 'original' })}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        settings.renameMode === 'original' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'
                      }`}
                    >
                      原始名称
                    </button>
                    <button
                      onClick={() => setSettings({ ...settings, renameMode: 'pinyin' })}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        settings.renameMode === 'pinyin' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'
                      }`}
                    >
                      拼音缩写
                    </button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Maximize2 size={16} className="text-slate-400" />
                      <label className="text-sm font-bold text-slate-600">Marker 模式 (正方形填充)</label>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.isMarkerMode} 
                        onChange={e => setSettings({...settings, isMarkerMode: e.target.checked})}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {settings.isMarkerMode && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                      <p className="text-[10px] text-slate-500 font-medium">统一输出尺寸 (px)</p>
                      <input
                        type="number"
                        value={settings.targetSize}
                        onChange={e => setSettings({...settings, targetSize: parseInt(e.target.value) || 0})}
                        className="w-full bg-white/50 border border-white p-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
               onClick={handleProcessAll}
               disabled={isProcessing || files.length === 0}
               className="w-full py-4 bg-primary text-white rounded-3xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isProcessing ? <Zap className="animate-spin" /> : <Zap />}
              一键执行优化
            </button>
          </aside>

          {/* Main Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Dropzone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`glass-panel p-12 rounded-[2.5rem] border-2 border-dashed transition-all group flex flex-col items-center justify-center gap-4 cursor-pointer ${
                isHovering ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-white/60 hover:bg-white/40'
              }`}
            >
              <input type="file" ref={fileInputRef} onChange={onFileUpload} multiple accept="image/*" className="hidden" />
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-slate-200/50">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-text-app">拖拽图片到这里</p>
                <p className="text-slate-500 font-medium">支持 PNG, JPG, WEBP 批量上传</p>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between px-4">
                  <h3 className="font-bold flex items-center gap-2">
                    队列列表 <span className="text-slate-400 font-medium text-sm">({files.length} 个文件)</span>
                  </h3>
                  <div className="flex items-center gap-3">
                    <button onClick={clearAll} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={downloadZip}
                      disabled={!files.some(f => f.status === 'done')}
                      className="py-2 px-4 bg-cta/10 text-cta rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-cta hover:text-white transition-all disabled:opacity-30"
                    >
                      <Package size={16} />
                      打包下载
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="glass-card p-4 rounded-3xl flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden flex-shrink-0 border border-slate-100">
                        {file.previewUrl ? (
                          <img src={file.previewUrl} className="w-full h-full object-contain" alt="preview" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <FileImage size={24} />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-sm truncate uppercase tracking-wider">{file.status === 'done' ? (file.newName || file.name) : file.name}</p>
                          {file.status === 'processing' && <Zap size={12} className="text-primary animate-pulse" />}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold mt-1">
                          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{formatSize(file.originalSize)}</span>
                          <span className="text-slate-300">/</span>
                          <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                            {file.originalDimensions.width}x{file.originalDimensions.height}
                          </span>
                          {file.status === 'done' && file.outputSize && (
                            <>
                              <ArrowRight size={10} className="text-primary" />
                              <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                {formatSize(file.outputSize)} (-{Math.round((1 - file.outputSize / file.originalSize) * 100)}%)
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-4">
                        {file.status === 'pending' && <MinusCircle className="text-slate-300" size={20} />}
                        {file.status === 'done' && <CheckCircle2 className="text-green-500" size={20} />}
                        {file.status === 'error' && <AlertCircle className="text-red-500" size={20} />}
                        
                        <button onClick={() => removeFile(file.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
