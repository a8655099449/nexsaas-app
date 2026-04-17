'use client';

import React, { useState } from 'react';
import { 
  Link2, 
  Trash2, 
  Square, 
  Columns, 
  Layout, 
  MoreHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

// Mock data
const members = [
  { id: 1, name: 'Sam', status: 'Online', color: 'bg-pink-400', statusColor: 'bg-green-500' },
  { id: 2, name: 'James', status: 'Idle', color: 'bg-blue-300', statusColor: 'bg-yellow-500' },
  { id: 3, name: 'Kate', status: 'Away', color: 'bg-yellow-400', statusColor: 'bg-gray-400' },
  { id: 4, name: 'Tom', status: 'Do not disturb', color: 'bg-red-400', statusColor: 'bg-red-500' },
  { id: 5, name: 'Max', status: 'Offline', color: 'bg-green-400', statusColor: 'bg-gray-300' },
];

type ViewState = 'summary' | 'list' | 'avatars';

export default function CardDemo() {
  const [view, setView] = useState<ViewState>('summary');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Side Buttons (Appear on Hover) */}
        <div className={`absolute -left-6 top-1/4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
          <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:scale-110 transition-all border border-slate-100">
            <Link2 size={20} />
          </button>
        </div>

        <div className={`absolute -right-6 top-1/4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
          <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-red-300 hover:text-red-500 hover:scale-110 transition-all border border-slate-100">
            <Trash2 size={20} />
          </button>
        </div>

        {/* Main Card */}
        <div 
          className={`
            bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] 
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            overflow-hidden border border-slate-100
            ${view === 'summary' ? 'w-64 h-72' : ''}
            ${view === 'list' ? 'w-80 h-[28rem]' : ''}
            ${view === 'avatars' ? 'w-[26rem] h-56' : ''}
          `}
        >
          {/* Summary View */}
          {view === 'summary' && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                  <div className="text-white">
                    {/* Discord-like Logo Placeholder */}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.27 4.51a14.85 14.85 0 0 0-3.66-1.14l-.17.38c-1.28-.19-2.58-.13-3.86-.01l-.18-.38a14.85 14.85 0 0 0-3.66 1.15C4.06 9.87 2.92 14.84 3.74 19.5c2.3 1.7 4.51 2.76 6.64 3.42l1.19-1.63a10.02 10.02 0 0 1-3.23-1.6c.27-.2.53-.41.78-.63 4 .91 8.16.91 12.16 0 .25.22.51.43.78.63-.98.66-2.07 1.2-3.23 1.6l1.19 1.63c2.13-.66 4.34-1.72 6.64-3.42.92-5.32-.23-10.15-4.44-14.99zM8.5 15c-.83 0-1.5-.75-1.5-1.67 0-.91.66-1.66 1.5-1.66s1.5.75 1.5 1.66c0 .92-.67 1.67-1.5 1.67zm7 0c-.83 0-1.5-.75-1.5-1.67 0-.91.66-1.66 1.5-1.66s1.5.75 1.5 1.66c0 .92-.67 1.67-1.5 1.67z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center animate-bounce-slow">
                   <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.3 4.5l-.1-.4c-1.4-.2-2.7-.1-4 .1l-.1-.4c-1.1-.3-2.3-.4-3.5-.4s-2.4.1-3.5.4l-.1.4c-1.3-.2-2.6-.3-4-.1l-.1.4C1.3 9.7.1 14.2 1 18.2c1.9 1.5 3.7 2.4 5.5 3l1-1.4c-1.1-.3-2.1-.8-2.9-1.4.2-.2.4-.4.6-.6 3.3.8 6.7.8 9.9 0 .2.2.4.4.6.6-.8.6-1.8 1.1-2.9 1.4l1 1.4c1.8-.6 3.6-1.5 5.5-3 .9-4-.3-8.5-2.8-13.7zM7.5 15c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4zm6.5 0c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4z"/></svg>
                   </div>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Quillow</h2>
              <p className="text-slate-400 font-medium">100+ members</p>
            </div>
          )}

          {/* List View */}
          {view === 'list' && (
            <div className="h-full flex flex-col p-6 animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.3 4.5l-.1-.4c-1.4-.2-2.7-.1-4 .1l-.1-.4c-1.1-.3-2.3-.4-3.5-.4s-2.4.1-3.5.4l-.1.4c-1.3-.2-2.6-.3-4-.1l-.1.4C1.3 9.7.1 14.2 1 18.2c1.9 1.5 3.7 2.4 5.5 3l1-1.4c-1.1-.3-2.1-.8-2.9-1.4.2-.2.4-.4.6-.6 3.3.8 6.7.8 9.9 0 .2.2.4.4.6.6-.8.6-1.8 1.1-2.9 1.4l1 1.4c1.8-.6 3.6-1.5 5.5-3 .9-4-.3-8.5-2.8-13.7zM7.5 15c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4zm6.5 0c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Quillow</h3>
                    <p className="text-xs text-slate-400">100+ members</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500"><path d="M19.3 4.5l-.1-.4c-1.4-.2-2.7-.1-4 .1l-.1-.4c-1.1-.3-2.3-.4-3.5-.4s-2.4.1-3.5.4l-.1.4c-1.3-.2-2.6-.3-4-.1l-.1.4C1.3 9.7.1 14.2 1 18.2c1.9 1.5 3.7 2.4 5.5 3l1-1.4c-1.1-.3-2.1-.8-2.9-1.4.2-.2.4-.4.6-.6 3.3.8 6.7.8 9.9 0 .2.2.4.4.6.6-.8.6-1.8 1.1-2.9 1.4l1 1.4c1.8-.6 3.6-1.5 5.5-3 .9-4-.3-8.5-2.8-13.7zM7.5 15c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4zm6.5 0c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4z"/></svg>
                  Join
                </button>
              </div>

              <div className="bg-slate-50 rounded-3xl p-3 flex-1 overflow-y-auto space-y-2">
                {members.map(member => (
                  <div key={member.id} className="flex items-center px-3 py-2 hover:bg-white rounded-2xl transition-all group/item">
                    <div className="relative">
                      <div className={`w-10 h-10 ${member.color} rounded-full border-2 border-white shadow-sm flex items-center justify-center overflow-hidden`}>
                         <div className="w-full h-full bg-slate-200 animate-pulse-slow" />
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 ${member.statusColor} border-2 border-white rounded-full`} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-bold text-slate-700">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{member.status}</p>
                    </div>
                    <ChevronRight className="ml-auto opacity-0 group-hover/item:opacity-30 transition-opacity" size={14} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Avatars Only View */}
          {view === 'avatars' && (
            <div className="h-full flex flex-col p-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.3 4.5l-.1-.4c-1.4-.2-2.7-.1-4 .1l-.1-.4c-1.1-.3-2.3-.4-3.5-.4s-2.4.1-3.5.4l-.1.4c-1.3-.2-2.6-.3-4-.1l-.1.4C1.3 9.7.1 14.2 1 18.2c1.9 1.5 3.7 2.4 5.5 3l1-1.4c-1.1-.3-2.1-.8-2.9-1.4.2-.2.4-.4.6-.6 3.3.8 6.7.8 9.9 0 .2.2.4.4.6.6-.8.6-1.8 1.1-2.9 1.4l1 1.4c1.8-.6 3.6-1.5 5.5-3 .9-4-.3-8.5-2.8-13.7zM7.5 15c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4zm6.5 0c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Quillow</h3>
                    <p className="text-xs text-slate-400">100+ members</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500"><path d="M19.3 4.5l-.1-.4c-1.4-.2-2.7-.1-4 .1l-.1-.4c-1.1-.3-2.3-.4-3.5-.4s-2.4.1-3.5.4l-.1.4c-1.3-.2-2.6-.3-4-.1l-.1.4C1.3 9.7.1 14.2 1 18.2c1.9 1.5 3.7 2.4 5.5 3l1-1.4c-1.1-.3-2.1-.8-2.9-1.4.2-.2.4-.4.6-.6 3.3.8 6.7.8 9.9 0 .2.2.4.4.6.6-.8.6-1.8 1.1-2.9 1.4l1 1.4c1.8-.6 3.6-1.5 5.5-3 .9-4-.3-8.5-2.8-13.7zM7.5 15c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4zm6.5 0c-.7 0-1.3-.6-1.3-1.4 0-.8.6-1.4 1.3-1.4.7 0 1.3.6 1.3 1.4 0 .8-.6 1.4-1.3 1.4z"/></svg>
                  Join
                </button>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-4 flex items-center justify-start gap-3 flex-1 overflow-hidden">
                {members.slice(0, 6).map(member => (
                   <div key={member.id} className="relative group/avatar">
                    <div className={`w-10 h-10 ${member.color} rounded-full border-2 border-white shadow-sm flex items-center justify-center hover:scale-110 transition-transform`}>
                         <div className="w-full h-full bg-slate-200 animate-pulse-slow" />
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 ${member.statusColor} border-2 border-white rounded-full`} />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {member.name}
                      </div>
                   </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Switcher Tab (Appear on Hover) */}
        <div className={`
          absolute left-1/2 -translate-x-1/2 -bottom-6 
          transition-all duration-300 transform
          ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
        `}>
          <div className="bg-white/80 backdrop-blur-md border border-white/50 px-2 py-2 rounded-2xl shadow-2xl flex items-center gap-1">
            <button 
              onClick={() => setView('summary')}
              className={`p-2.5 rounded-xl transition-all ${view === 'summary' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            >
              <Layout size={18} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2.5 rounded-xl transition-all ${view === 'list' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            >
              <Columns size={18} />
            </button>
            <button 
              onClick={() => setView('avatars')}
              className={`p-2.5 rounded-xl transition-all ${view === 'avatars' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            >
              <Square size={18} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
