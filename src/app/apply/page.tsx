'use client';

import { useState } from 'react';
import { ClipboardList, Shield, CheckCircle2, TrendingUp, AlertTriangle, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APPLY_STRATEGY } from '@/lib/data';

export default function ApplyPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    setShowResult(false);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <ClipboardList className="w-6 h-6 text-[#b4ff39]" /> 报名决策
        </h1>
        <p className="text-sm text-zinc-500 mt-2">AI 冲稳保组合推荐 + 竞争比预测，帮你科学填报</p>
      </div>

      {/* 冲稳保策略 */}
      <div className="grid md:grid-cols-3 gap-4 animate-fade-up delay-75">
        {APPLY_STRATEGY.map((s, i) => (
          <div
            key={s.type}
            className={`topo-card p-5 cursor-pointer transition-all duration-300 ${
              selected.includes(s.type) ? 'ring-2 ring-[#b4ff39] shadow-lg shadow-[#b4ff39]/5 scale-[1.02]' : 'card-hover'
            } animate-scale-in`}
            style={{animationDelay:`${(i+1)*75}ms`}}
            onClick={() => toggle(s.type)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                s.type === '冲' ? 'bg-rose-400/10 text-rose-400' :
                s.type === '稳' ? 'bg-amber-400/10 text-amber-400' :
                'bg-emerald-400/10 text-emerald-400'
              }`}>
                {s.type === '冲' ? <TrendingUp className="w-5 h-5" /> :
                 s.type === '稳' ? <CheckCircle2 className="w-5 h-5" /> :
                 <Shield className="w-5 h-5" />}
              </div>
              {selected.includes(s.type) && (
                <div className="w-5 h-5 rounded-full bg-[#b4ff39] text-black flex items-center justify-center animate-scale-in">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              )}
            </div>
            <h3 className="font-bold text-lg mb-1">{s.type}·{s.color === 'err' ? '冲刺' : s.color === 'warn' ? '稳妥' : '保底'}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">{s.desc}</p>
            <div className="p-2 rounded-lg bg-white/[0.03]">
              <p className="text-[10px] text-[#b4ff39] font-medium">💡 {s.tip}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 生成组合 */}
      <div className="topo-card p-5 animate-fade-up delay-150">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-4 h-4 text-[#b4ff39] animate-pulse-glow" />
          <h2 className="font-semibold text-lg">AI 组合推荐</h2>
        </div>
        <p className="text-sm text-zinc-500 mb-4">选择你需要的策略组合，AI 将生成最优报名方案</p>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {selected.map(s => (
            <span key={s} className="px-3 py-1 rounded-full bg-[#b4ff39]/10 text-[#b4ff39] text-sm font-medium flex items-center gap-1 animate-scale-in">
              {s}策略
              <X className="w-3 h-3 cursor-pointer" onClick={() => toggle(s)} />
            </span>
          ))}
          {selected.length === 0 && <span className="text-sm text-zinc-600">请先选择策略组合</span>}
        </div>
        <Button onClick={() => setShowResult(true)} disabled={selected.length === 0} className="bg-[#b4ff39] text-black hover:bg-[#c5ff6b] btn-press font-medium">
          <Sparkles className="w-4 h-4 mr-1" /> 生成报名方案
        </Button>
      </div>

      {/* 推荐结果 */}
      {showResult && (
        <div className="space-y-3 animate-fade-up">
          <h3 className="font-semibold">推荐岗位组合</h3>
          {[
            { type: '冲', name: '省发改委综合管理', ratio: '68:1', city: '济南', tip: '专业对口但竞争激烈' },
            { type: '稳', name: '市统计局信息管理', ratio: '32:1', city: '烟台', tip: '专业匹配度高，竞争适中' },
            { type: '保', name: '县行政审批局', ratio: '15:1', city: '泰安', tip: '限制条件多，上岸概率高' },
          ].filter(j => selected.includes(j.type)).map((job, i) => (
            <div key={i} className={`topo-card p-4 card-hover animate-slide-right border-l-4 ${
              job.type === '冲' ? 'border-l-rose-400' : job.type === '稳' ? 'border-l-amber-400' : 'border-l-emerald-400'
            }`} style={{animationDelay:`${(i+1)*100}ms`}}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      job.type === '冲' ? 'bg-rose-400/10 text-rose-400' :
                      job.type === '稳' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-emerald-400/10 text-emerald-400'
                    }`}>{job.type}</span>
                    <h4 className="font-semibold text-sm">{job.name}</h4>
                  </div>
                  <p className="text-xs text-zinc-500">{job.city} · 竞争比 {job.ratio}</p>
                  <p className="text-[10px] text-[#b4ff39] mt-1">💡 {job.tip}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="topo-card p-4 bg-amber-400/5 border-amber-400/10 animate-fade-up delay-300">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-400">报名策略提醒</p>
                <p className="text-xs text-zinc-400 mt-1">每次报名务必配置冲稳保组合，避免全部押注同一城市。建议冲刺 1 个、稳定 1-2 个、保底 1 个。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
