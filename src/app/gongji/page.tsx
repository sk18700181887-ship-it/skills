'use client';

import { useState } from 'react';
import { Globe, Sparkles, Brain, ChevronRight, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { GONGJI_MODULES, GONGJI_KNOWLEDGE } from '@/lib/data';

export default function GongjiPage() {
  const [activeModule, setActiveModule] = useState(0);
  const [askAi, setAskAi] = useState(false);

  const mod = GONGJI_MODULES[activeModule];
  const knowledge = GONGJI_KNOWLEDGE.filter(k => k.module === mod.name);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" /> 公基 AI 图谱
        </h1>
        <p className="text-sm text-muted-foreground mt-1">6 大模块知识图谱 + AI 记忆助手，公基不再靠死记</p>
      </div>

      {/* 模块选择 */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 animate-fade-up delay-75">
        {GONGJI_MODULES.map((m, i) => (
          <button
            key={i}
            onClick={() => { setActiveModule(i); setAskAi(false); }}
            className={`p-3 rounded-xl text-center transition-all duration-300 ${
              i === activeModule
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-muted card-hover'
            }`}
          >
            <div className="text-sm font-semibold">{m.name}</div>
            <div className={`text-[10px] mt-1 ${i === activeModule ? 'text-white/70' : 'text-muted-foreground'}`}>
              {m.coverage}% 覆盖
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-white/20 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${i === activeModule ? 'bg-white' : 'bg-primary'}`} style={{width: `${m.coverage}%`}} />
            </div>
          </button>
        ))}
      </div>

      {/* 全模块覆盖率环形图 */}
      <Card className="p-5 animate-fade-up delay-100">
        <h3 className="font-semibold mb-4">全模块覆盖率总览</h3>
        <div className="flex items-center gap-6 justify-center">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {GONGJI_MODULES.reduce<{ offset: number; elements: React.ReactNode[] }>((acc, m, i) => {
                const segLen = 100 / GONGJI_MODULES.length;
                const filled = (m.coverage / 100) * segLen;
                const colors = ['#F3A04C', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4'];
                const el = (
                  <g key={i}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="12"
                      strokeDasharray={`${segLen} ${100 - segLen}`} strokeDashoffset={-acc.offset} />
                    <circle cx="50" cy="50" r="40" fill="none" stroke={colors[i]} strokeWidth="12"
                      strokeDasharray={`${filled} ${100 - filled}`} strokeDashoffset={-acc.offset} strokeLinecap="round" />
                  </g>
                );
                return { offset: acc.offset + segLen, elements: [...acc.elements, el] };
              }, { offset: 0, elements: [] }).elements}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold font-serif">{Math.round(GONGJI_MODULES.reduce((s, m) => s + m.coverage, 0) / GONGJI_MODULES.length)}%</span>
              <span className="text-[9px] text-muted-foreground">总覆盖率</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {GONGJI_MODULES.map((m, i) => {
              const colors = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-cyan-500'];
              return (
                <div key={m.name} className="flex items-center gap-2 text-xs">
                  <div className={`w-2.5 h-2.5 rounded-sm shrink-0 ${colors[i]}`} />
                  <span className="w-16">{m.name}</span>
                  <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${colors[i]}`} style={{ width: `${m.coverage}%` }} />
                  </div>
                  <span className="text-muted-foreground w-8 text-right">{m.coverage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* 模块详情 */}
      <Card className="p-5 animate-fade-up delay-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> {mod.name}
          </h2>
          <button
            onClick={() => setAskAi(!askAi)}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium transition-all duration-300 hover:bg-primary/20"
          >
            <Sparkles className="w-3 h-3 animate-pulse-glow" /> AI 记忆助手
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{mod.aiFeature}</p>

        {/* AI 问答区 */}
        {askAi && (
          <div className="mb-4 p-4 rounded-xl bg-primary/5 border border-primary/10 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">AI 记忆助手</span>
            </div>
            <p className="text-sm text-foreground/80">{mod.aiFeature}</p>
          </div>
        )}

        {/* 知识点列表 */}
        <div className="space-y-3">
          {knowledge.map((k, i) => (
            <div key={i} className="p-3 rounded-lg border bg-background card-hover animate-slide-up" style={{animationDelay: `${i*0.05}s`}}>
              <div className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${i < Math.ceil(knowledge.length * mod.coverage / 100) ? 'text-emerald-500' : 'text-muted-foreground/30'}`} />
                <div>
                  <h4 className="text-sm font-medium">{k.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{k.content}</p>
                  {k.aiTip && (
                    <p className="text-[10px] text-primary mt-1 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> {k.aiTip}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
