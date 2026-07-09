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
