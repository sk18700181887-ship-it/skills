'use client';
import Link from 'next/link';
import { USER, JOURNEY_PHASES, ENERGY_QUOTES, MOOD_OPTIONS, AI_ENCOURAGEMENTS, CHECKIN_MILESTONES, PROVINCE_DATA, SUBJECT_MODULES } from '@/lib/data';
import { Flame, ChevronRight, Sparkles, BookOpen, Timer, Mic, Compass, ShieldCheck, ClipboardCheck, Heart, MapPin, Trophy, Crown, BookHeart, Zap } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const ICON_MAP: Record<string, React.ElementType> = {
  Compass, Sparkles, ClipboardCheck, BookOpen, Timer, Mic, ShieldCheck,
};

/* 数字滚动组件 */
function AnimatedNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span className="stat-value">{display}</span>;
}

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [encourageMsg, setEncourageMsg] = useState('');
  const [showEncourage, setShowEncourage] = useState(false);
  const [quoteIdx] = useState(() => (new Date().getDate()) % ENERGY_QUOTES.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleMood = useCallback((moodId: string) => {
    setSelectedMood(moodId);
    const msgs = AI_ENCOURAGEMENTS[moodId] || AI_ENCOURAGEMENTS['normal'];
    setEncourageMsg(msgs[Math.floor(msgs.length / 2)]);
    setShowEncourage(true);
  }, []);

  if (!mounted) return null;

  const quote = ENERGY_QUOTES[quoteIdx];

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
      {/* ===== Hero Section — 衬线大标题 ===== */}
      <div className="hero-reveal mb-16">
        <div className="sec-num mb-4">学习中心</div>
        <h1 className="heading-serif mb-6">
          AI 智能陪练<br />稳步上岸
        </h1>
        <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
          从了解考公到面试上岸的完整 7 阶段路径。每个环节嵌入 AI 能力，精准导航你的上岸之路。
        </p>
      </div>

      {/* ===== 01. 今日状态 ===== */}
      <section className="mb-16 animate-fade-up delay-100">
        <div className="flex items-center gap-3 mb-6">
          <span className="sec-num">01.</span>
          <h2 className="text-lg font-medium text-white">今日状态</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)]">
          {/* KPI 卡片 */}
          <div className="bg-[#0a0a0a] p-6">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">已刷题数</div>
            <AnimatedNumber value={USER.totalQuestions} />
            <div className="mt-2 text-[11px] text-zinc-600">目标 3000</div>
            <div className="mt-3 h-px bg-zinc-900 overflow-hidden">
              <div className="h-full bg-[#b4ff39]/40 animate-progress" style={{ width: `${Math.min(100, USER.totalQuestions / 30)}%` }} />
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">正确率</div>
            <AnimatedNumber value={Math.round(USER.correctRate * 100)} />
            <span className="text-sm text-zinc-500 ml-1">%</span>
            <div className="mt-2 text-[11px] text-zinc-600">行测 + 申论综合</div>
          </div>
          <div className="bg-[#0a0a0a] p-6">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-3">连续打卡</div>
            <div className="flex items-baseline gap-1">
              <AnimatedNumber value={USER.streakDays} />
              <span className="text-sm text-zinc-500">天</span>
            </div>
            <div className="mt-3 flex gap-1">
              {CHECKIN_MILESTONES.slice(0, 5).map((b) => {
                const unlocked = USER.streakDays >= b.days;
                return (
                  <div key={b.days} className={cn('w-5 h-5 flex items-center justify-center text-[8px] border', unlocked ? 'bg-[#b4ff39]/8 text-[#b4ff39] border-[rgba(180,255,57,0.2)]' : 'bg-transparent text-zinc-700 border-[rgba(255,255,255,0.04)]')}>
                    {unlocked ? b.icon : b.days}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 02. 七阶段路径 ===== */}
      <section className="mb-16 animate-fade-up delay-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="sec-num">02.</span>
          <h2 className="text-lg font-medium text-white">七阶段路径</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)] stagger">
          {JOURNEY_PHASES.map((phase, i) => {
            const Icon = ICON_MAP[phase.icon] || Compass;
            return (
              <Link key={phase.id} href={phase.href} className="group bg-[#0a0a0a] p-5 hover:bg-[#111] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 font-mono">{String(i + 1).padStart(2, '0')}</span>
                    <Icon className="w-4 h-4 text-zinc-500 group-hover:text-[#b4ff39] transition-colors" />
                  </div>
                  {phase.aiFeature && (
                    <span className="text-[8px] px-1 py-0.5 bg-[#b4ff39]/8 text-[#b4ff39] border border-[rgba(180,255,57,0.15)]">AI</span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{phase.label}</h3>
                <p className="text-[11px] text-zinc-600 mt-1 line-clamp-2">{phase.desc}</p>
                <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-[#b4ff39] mt-2 transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== 03. 能力维度 ===== */}
      <section className="mb-16 animate-fade-up delay-300">
        <div className="flex items-center gap-3 mb-6">
          <span className="sec-num">03.</span>
          <h2 className="text-lg font-medium text-white">能力维度</h2>
        </div>
        <div className="topo-card p-6">
          <div className="space-y-4">
            {SUBJECT_MODULES.map((m, i) => {
              const acc = [78, 65, 72, 55, 80, 68][i] || 70;
              return (
                <div key={m.id} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] text-zinc-300">{m.name}</span>
                    <span className="text-[11px] text-zinc-600 font-mono">{acc}%</span>
                  </div>
                  <div className="h-1 bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full bg-[#b4ff39]/50 group-hover:bg-[#b4ff39] transition-all animate-progress"
                      style={{ width: `${acc}%`, animationDelay: `${i * 80}ms` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 04. 心情 & 能量 ===== */}
      <section className="mb-16 animate-fade-up delay-400">
        <div className="flex items-center gap-3 mb-6">
          <span className="sec-num">04.</span>
          <h2 className="text-lg font-medium text-white">心情 & 能量</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.06)]">
          {/* 心情选择 */}
          <div className="bg-[#0a0a0a] p-6">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-4">今天感觉如何？</div>
            <div className="flex gap-3 mb-4">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMood(m.id)}
                  className={`mood-btn flex flex-col items-center gap-1 p-2 border transition-all ${
                    selectedMood === m.id
                      ? 'border-[#b4ff39] bg-[#b4ff39]/8'
                      : 'border-[rgba(255,255,255,0.06)] bg-transparent hover:border-[rgba(255,255,255,0.12)]'
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span className={`text-[9px] ${selectedMood === m.id ? 'text-[#b4ff39]' : 'text-zinc-600'}`}>{m.label}</span>
                </button>
              ))}
            </div>
            {showEncourage && (
              <div className="p-3 border border-[rgba(180,255,57,0.1)] bg-[#b4ff39]/[0.03] animate-fade-up">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#b4ff39] shrink-0 mt-0.5" />
                  <p className="text-[12px] text-zinc-300 leading-relaxed">{encourageMsg}</p>
                </div>
              </div>
            )}
          </div>
          {/* 每日金句 */}
          <div className="bg-[#0a0a0a] p-6">
            <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-4">每日能量</div>
            <div className="border-l-2 border-[#b4ff39]/30 pl-4">
              <p className="text-sm text-zinc-300 leading-relaxed font-serif italic">&ldquo;{quote.text}&rdquo;</p>
              <p className="text-[11px] text-zinc-600 mt-2">— {quote.author}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05. 热门省份难度速览 ===== */}
      <section className="mb-16 animate-fade-up delay-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="sec-num">05.</span>
            <h2 className="text-lg font-medium text-white">热门省份</h2>
          </div>
          <Link href="/map" className="topo-chip text-[10px]">
            查看全部 <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {PROVINCE_DATA.filter(p => p.difficulty === '极难').slice(0, 8).map((p) => (
            <Link href="/map" key={p.id} className="topo-chip hover:text-white">
              {p.name}
              <span className="text-[9px] text-zinc-600 ml-1">{p.avgRatio}:1</span>
              <span className={`w-1.5 h-1.5 rounded-none ${
                p.difficulty === '极难' ? 'bg-rose-400' : p.difficulty === '难' ? 'bg-amber-400' : 'bg-emerald-400'
              }`} />
            </Link>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[9px] text-zinc-600">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400" /> 简单</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-amber-400" /> 中等</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-rose-400" /> 困难</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] pt-6 pb-4 text-center">
        <p className="text-[10px] text-zinc-700">上岸引擎 · Anan Engine · AI 智能陪练，稳步上岸</p>
      </footer>
    </div>
  );
}

function cn(...args: (string | undefined | false)[]) {
  return args.filter(Boolean).join(' ');
}
