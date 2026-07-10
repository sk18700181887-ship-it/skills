'use client';

import { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ChevronRight, Sparkles, Brain, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QUESTIONS, FREE_QUOTA } from '@/lib/data';

export default function PracticePage() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongSet, setWrongSet] = useState<Set<string>>(new Set());
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);

  const q = QUESTIONS[idx];
  if (!q) return <div className="p-8 text-center text-zinc-500">今日题目已做完</div>;

  const handleSelect = (opt: string) => {
    if (showAnswer) return;
    setSelected(opt);
    setShowAnswer(true);
    setDoneSet(prev => new Set(prev).add(q.id));
    if (opt === q.answer.toString()) {
      setStreak(s => s + 1);
    } else {
      setStreak(0);
      setWrongSet(prev => new Set(prev).add(q.id));
    }
  };

  const next = () => { setIdx(i => i + 1); setSelected(null); setShowAnswer(false); };
  const reset = () => { setIdx(0); setSelected(null); setShowAnswer(false); setWrongSet(new Set()); setDoneSet(new Set()); setStreak(0); };

  const isCorrect = selected === q.answer.toString();
  const progress = Math.round((doneSet.size / QUESTIONS.length) * 100);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-[#b4ff39]" /> 智能题库
        </h1>
        <p className="text-sm text-zinc-500 mt-1">AI 推题 · 弱项诊断 · 错题归因</p>
      </div>

      {/* 进度条 + 统计 */}
      <div className="flex items-center gap-4 animate-fade-up delay-75">
        <div className="flex-1 h-2 rounded-full bg-white/[0.04] overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-700 ease-out" style={{width: `${progress}%`}} />
        </div>
        <span className="text-xs text-zinc-500 whitespace-nowrap">{doneSet.size}/{QUESTIONS.length} 题</span>
        {streak > 0 && (
          <span className="text-xs font-medium text-[#b4ff39] animate-scale-in">🔥 连对 {streak} 题</span>
        )}
      </div>

      {/* 模块进度可视化 */}
      <div className="grid grid-cols-5 gap-2 animate-fade-up delay-100">
        {[
          { name: '言语', done: 3, total: 3, color: 'bg-amber-400/100' },
          { name: '判断', done: 2, total: 3, color: 'bg-sky-400/100' },
          { name: '数量', done: 1, total: 2, color: 'bg-orange-400/100' },
          { name: '资料', done: 1, total: 1, color: 'bg-emerald-400/100' },
          { name: '常识', done: 0, total: 1, color: 'bg-rose-400/100' },
        ].map(m => (
          <div key={m.name} className="p-2 rounded-lg border border-[rgba(255,255,255,0.06)]/50 text-center card-hover">
            <div className="text-xs font-medium mb-1">{m.name}</div>
            <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden mb-1">
              <div className={`h-full rounded-full ${m.color} animate-progress`} style={{ width: m.total > 0 ? `${(m.done / m.total) * 100}%` : '0%' }} />
            </div>
            <div className="text-[9px] text-zinc-500">{m.done}/{m.total}</div>
          </div>
        ))}
      </div>

      {/* 题目卡片 */}
      <div className="topo-card p-6 animate-fade-up delay-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#b4ff39]/10 text-[#b4ff39] font-medium">{q.module}</span>
          <span className="text-xs text-zinc-500">第 {idx + 1} 题</span>
        </div>
        <h2 className="text-base font-semibold mb-6 leading-relaxed">{q.stem}</h2>

        <div className="space-y-3">
          {q.options.map((opt) => {
            const isSelected = selected === opt;
            const isAns = opt === q.answer.toString();
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={showAnswer}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  showAnswer
                    ? isAns ? 'border-emerald-400 bg-emerald-400/10' : isSelected ? 'border-rose-400 bg-rose-400/10' : 'border-[rgba(255,255,255,0.06)] opacity-50'
                    : isSelected ? 'border-[#b4ff39] bg-[#b4ff39]/5' : 'border-[rgba(255,255,255,0.06)] card-hover'
                }`}
              >
                <span className={`text-sm ${
                  showAnswer && isAns ? 'text-emerald-800 font-medium' :
                  showAnswer && isSelected ? 'text-rose-800' : ''
                }`}>{opt}</span>
                {showAnswer && isAns && <CheckCircle2 className="w-4 h-4 text-emerald-500 inline ml-2" />}
                {showAnswer && isSelected && !isAns && <XCircle className="w-4 h-4 text-rose-500 inline ml-2" />}
              </button>
            );
          })}
        </div>

        {/* 解析 */}
        {showAnswer && (
          <div className={`mt-5 p-4 rounded-xl animate-fade-in ${isCorrect ? 'bg-emerald-400/10 border border-emerald-400/10' : 'bg-rose-400/10 border border-rose-400/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
              <span className={`text-sm font-semibold ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                {isCorrect ? '回答正确' : '回答错误'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{q.analysis}</p>
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center justify-between animate-fade-up delay-150">
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="w-4 h-4 mr-1" /> 重新开始
        </Button>
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <span>正确 {doneSet.size - wrongSet.size}</span>
          <span>·</span>
          <span>错误 {wrongSet.size}</span>
        </div>
        <Button onClick={next} disabled={idx >= QUESTIONS.length - 1} className="btn-press">
          下一题 <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
