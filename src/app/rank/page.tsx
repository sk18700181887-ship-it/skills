'use client';

import { useState } from 'react';
import { Trophy, Flame, Medal, TrendingUp, Crown, Sparkles } from 'lucide-react';
import { RANK_STUDY, RANK_SUCCESS } from '@/lib/data';

export default function RankPage() {
  const [tab, setTab] = useState<'study' | 'success'>('study');

  return (
    <div className="hero-reveal space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-serif font-light tracking-tight card-pop flex items-center gap-3">
          <Trophy className="w-6 h-6 text-[#b4ff39]" /> 排行榜 & 上岸榜
        </h1>
        <p className="text-sm text-zinc-500 mt-1">学习排名激励 + 上岸数据背书</p>
      </div>

      {/* Tab */}
      <div className="flex gap-1 bg-zinc-900 p-1 rounded-none w-fit animate-fade-up delay-75">
        <button onClick={() => setTab('study')} className={`px-4 py-2 rounded-none text-xs font-medium transition-all duration-300 ${tab === 'study' ? 'bg-white shadow text-white' : 'text-zinc-500'}`}>
          <Flame className="w-3 h-3 inline mr-1" /> 学习榜
        </button>
        <button onClick={() => setTab('success')} className={`px-4 py-2 rounded-none text-xs font-medium transition-all duration-300 ${tab === 'success' ? 'bg-white shadow text-white' : 'text-zinc-500'}`}>
          <Medal className="w-3 h-3 inline mr-1" /> 上岸榜
        </button>
      </div>

      {/* 学习榜 */}
      {tab === 'study' && (
        <div className="topo-card p-0 overflow-hidden animate-fade-up delay-100">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-zinc-900 text-[10px] font-medium text-zinc-500">
            <div className="col-span-1">排名</div>
            <div className="col-span-3">考生</div>
            <div className="col-span-3">学校</div>
            <div className="col-span-2">本周做题</div>
            <div className="col-span-3">连续打卡</div>
          </div>
          {RANK_STUDY.map((item, i) => (
            <div key={i}
              className={`grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm border-b last:border-0 transition-all duration-300 hover:bg-muted/30 animate-slide-up ${
                item.self ? 'bg-[#b4ff39]/5 border-l-2 border-l-primary' : ''
              }`}
              style={{animationDelay: `${i*0.03}s`}}
            >
              <div className="col-span-1">
                {i < 3 ? (
                  <div className={`w-6 h-6 rounded-none flex items-center justify-center text-[10px] font-bold text-white ${
                    i === 0 ? 'bg-amber-400/100' : i === 1 ? 'bg-slate-400' : 'bg-amber-700'
                  }`}>
                    {i + 1}
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500">{i + 1}</span>
                )}
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <span className="font-medium text-xs">{item.name}</span>
                {item.self && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#b4ff39] text-black">我</span>}
                {item.badge === 'VIP' && <span className="text-[9px] px-1.5 py-0.5 rounded vip-gradient vip-text">VIP</span>}
              </div>
              <div className="col-span-3 text-xs text-zinc-500">{item.school}</div>
              <div className="col-span-2 text-xs font-medium">{item.questions}题</div>
              <div className="col-span-3 text-xs flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-500" /> {item.streak}天
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 上岸榜 */}
      {tab === 'success' && (
        <div className="topo-card p-0 overflow-hidden animate-fade-up delay-100">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-zinc-900 text-[10px] font-medium text-zinc-500">
            <div className="col-span-1">#</div>
            <div className="col-span-2">考生</div>
            <div className="col-span-4">上岸岗位</div>
            <div className="col-span-2">分数</div>
            <div className="col-span-3">感言</div>
          </div>
          {RANK_SUCCESS.map((item, i) => (
            <div key={item.id}
              className="grid grid-cols-12 gap-2 px-4 py-3 items-center text-sm border-b last:border-0 transition-all duration-300 hover:bg-muted/30 animate-slide-up"
              style={{animationDelay: `${i*0.03}s`}}
            >
              <div className="col-span-1">
                <div className="w-6 h-6 rounded-none flex items-center justify-center text-[10px] font-bold bg-emerald-400/100 text-white">
                  {i + 1}
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <span className="font-medium text-xs">{item.name}</span>
                {item.isVip && <Crown className="w-3 h-3 text-amber-500" />}
              </div>
              <div className="col-span-4 text-xs text-emerald-400 font-medium">{item.unit}</div>
              <div className="col-span-2 text-xs font-bold">{item.score}分</div>
              <div className="col-span-3 text-[10px] text-zinc-500 line-clamp-2">{item.quote}</div>
            </div>
          ))}
        </div>
      )}

      {/* VIP 上岸率背书 */}
      <div className="topo-card p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white animate-fade-up delay-150">
        <div className="flex items-center gap-3">
          <Crown className="w-8 h-8 text-amber-300 shrink-0" />
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              VIP 上岸率 41%
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">普通用户上岸率 12.8% · VIP 用户上岸率 41.2% · 数据来源：上岸引擎 2025 年度报告</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-2xl font-bold text-amber-300">3.2x</span>
          </div>
        </div>
      </div>
    </div>
  );
}
