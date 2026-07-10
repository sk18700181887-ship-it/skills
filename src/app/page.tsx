'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Compass, Target, ClipboardList, CalendarDays, BookOpen,
  PenTool, Timer, Mic, Trophy, Crown, ArrowRight, Zap,
  Flame, TrendingUp, Users, Star, Heart, Sparkles,
  MessageCircle, Quote, ChevronRight, CheckCircle2,
  BookHeart, TreePine, MapPin
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { USER, RANK_SUCCESS, MOOD_OPTIONS, AI_ENCOURAGEMENTS, ENERGY_QUOTES, CHECKIN_MILESTONES } from '@/lib/data';

const STAGES = [
  { icon: Compass, label: '了解考公', href: '/explore', num: '01', desc: '6 类考试对比 + AI 百科' },
  { icon: Target, label: '岗位匹配', href: '/match', num: '02', desc: '专业→岗位 + 竞争预测' },
  { icon: ClipboardList, label: '报名决策', href: '/apply', num: '03', desc: '冲稳保组合 + 竞争比' },
  { icon: CalendarDays, label: '备考规划', href: '/plan', num: '04', desc: 'AI 四阶段 + 周课表' },
  { icon: BookOpen, label: '笔试训练', href: '/practice', num: '05', desc: 'AI 推题 + 错题归因' },
  { icon: PenTool, label: '申论批改', href: '/shenlun', num: '06', desc: '五维评分 + 逐句点评' },
  { icon: Timer, label: '模考冲刺', href: '/mock', num: '07', desc: '全国排名 + 成绩预测' },
  { icon: Mic, label: '面试模拟', href: '/interview', num: '08', desc: 'AI 面试 + 实时点评' },
];

const KPI_DATA = [
  { label: '距国考', value: 168, unit: '天', icon: Flame },
  { label: '累计做题', value: 2847, unit: '题', icon: Zap },
  { label: '正确率', value: 72.3, unit: '%', icon: TrendingUp, decimal: true },
  { label: '全国排名', value: 3421, unit: '名', icon: Users },
];

const AI_TASKS = [
  { text: '今日言语理解薄弱点：逻辑填空关联词搭配，建议专项 30 题', tag: '弱项推题' },
  { text: '申论大作文素材已更新：乡村振兴 + 基层治理最新政策要点', tag: '素材推送' },
  { text: '距省考报名仅 23 天，冲稳保岗位组合建议已生成', tag: '报名提醒' },
  { text: '本周模考成绩上升 5.2%，资料分析正确率达 88%', tag: '成绩分析' },
];

/* 数字滚动 Hook */
function useCountUp(target: number, duration = 1200, decimal = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setValue(decimal ? parseFloat(current.toFixed(1)) : Math.round(current));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, decimal]);
  return decimal ? value.toFixed(1) : value.toLocaleString();
}

function CountUpKPI({ kpi, delay }: { kpi: typeof KPI_DATA[0]; delay: number }) {
  const [visible, setVisible] = useState(false);
  const countVal = useCountUp(kpi.value, 1400, !!kpi.decimal);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return <div className="topo-card p-4 h-[88px]" />;

  return (
    <div className="topo-card p-4 card-pop" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-2 mb-2">
        <kpi.icon className="w-4 h-4 text-zinc-500" />
        <span className="text-xs text-zinc-500">{kpi.label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="stat-value num-roll" key={String(countVal)}>{countVal}</span>
        <span className="text-xs text-zinc-500">{kpi.unit}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [encouragement, setEncouragement] = useState<string>('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [showEncourage, setShowEncourage] = useState(false);
  const [dailyQuote] = useState(() => ENERGY_QUOTES[0]);
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    const msgs = AI_ENCOURAGEMENTS[moodId] || AI_ENCOURAGEMENTS['normal'];
    setEncouragement(msgs[0]);
    setShowEncourage(true);
  };

  const handleCheckIn = () => {
    setCheckedIn(true);
  };

  if (!mounted) return null;

  const currentMood = MOOD_OPTIONS.find(m => m.id === selectedMood);
  const streakDays = 25;
  const nextMilestone = CHECKIN_MILESTONES.find(m => m.days > streakDays);

  return (
    <div className="space-y-8 max-w-6xl px-4 lg:px-8 py-6">
      {/* Hero section */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--surface-1)] border border-[rgba(255,255,255,0.06)] p-8 hero-reveal">
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* 扫描线 */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none scanline" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="section-number">Dashboard</div>
              <h1 className="heading-xl">
                欢迎回来<br/>
                <span className="text-[#b4ff39] animate-gradient inline-block" style={{backgroundSize:'200% 200%',background:'linear-gradient(90deg,#b4ff39,#22d3ee,#b4ff39)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',animation:'gradient-flow 4s ease infinite'}}>{USER.nickname}</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-2">当前阶段：<span className="text-zinc-200 font-medium">四·笔试训练</span></p>
            </div>
            <div className="hidden md:block text-right">
              <div className="relative">
                <div className="font-mono text-5xl font-bold text-[#b4ff39] tabular-nums animate-count-up">{168}</div>
                <div className="absolute -top-1 -right-3 w-2 h-2 rounded-full bg-[#b4ff39] pulse-dot" />
              </div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1">Days to 2027 国考</div>
            </div>
          </div>

          <div className="divider my-5" />

          {/* 心情选择 */}
          <div className="bg-[var(--surface-2)] rounded-xl p-4">
            <p className="text-zinc-400 text-sm mb-3">今天心情怎么样？</p>
            <div className="flex items-center gap-3 flex-wrap">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMoodSelect(m.id)}
                  className={`mood-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${
                    selectedMood === m.id
                      ? 'bg-[#b4ff39]/15 ring-1 ring-[#b4ff39]/40 text-[#b4ff39]'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/8 hover:text-zinc-300'
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span className="text-xs">{m.label}</span>
                </button>
              ))}
            </div>
            {showEncourage && encouragement && (
              <div className="mt-3 p-3 bg-[#b4ff39]/5 border border-[#b4ff39]/10 rounded-lg card-pop">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#b4ff39] shrink-0 mt-0.5 animate-sparkle" />
                  <p className="text-sm text-zinc-300 leading-relaxed">{encouragement}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 装饰性浮动光斑 */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#b4ff39]/3 animate-float" />
        <div className="absolute -left-4 bottom-0 w-20 h-20 rounded-full bg-[#22d3ee]/3 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* 打卡 + 能量金句 */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 连续打卡 */}
        <div className="topo-card p-5 card-pop" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#b4ff39]/10 flex items-center justify-center animate-pulse-glow">
                <Flame className="w-4 h-4 text-[#b4ff39]" />
              </div>
              <h3 className="font-semibold text-sm text-zinc-200">今日打卡</h3>
            </div>
            <span className="text-xs text-zinc-500">已连续 {streakDays} 天</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < 5 ? 'bg-[#b4ff39]/10 text-[#b4ff39] scale-in' : i === 5 ? (checkedIn ? 'bg-[#b4ff39]/10 text-[#b4ff39] card-zoom' : 'bg-zinc-800 text-zinc-600') : 'bg-zinc-800 text-zinc-600'
                  }`} style={{ animationDelay: `${i * 80}ms` }}>
                    {i < 5 || (i === 5 && checkedIn) ? '✓' : ''}
                  </div>
                ))}
                <span className="text-[10px] text-zinc-500 ml-1">本周</span>
              </div>
              {nextMilestone && (
                <div className="text-xs text-zinc-500">
                  距「<span className="text-[#b4ff39] font-medium">{nextMilestone.title}</span>」还需 <span className="font-medium">{nextMilestone.days - streakDays}</span> 天
                  <span className="ml-1">{nextMilestone.icon}</span>
                </div>
              )}
            </div>
            <Button
              onClick={handleCheckIn}
              disabled={checkedIn}
              className={`btn-press shrink-0 ${checkedIn ? 'bg-[#b4ff39]/20 text-[#b4ff39] hover:bg-[#b4ff39]/20' : 'bg-[#b4ff39] text-zinc-900 hover:bg-[#b4ff39]/90 animate-pulse-glow'}`}
              size="sm"
            >
              {checkedIn ? (
                <><CheckCircle2 className="w-4 h-4 mr-1" />已打卡</>
              ) : (
                <><Flame className="w-4 h-4 mr-1" />立即打卡</>
              )}
            </Button>
          </div>
          {checkedIn && (
            <div className="mt-3 p-2 bg-[#b4ff39]/5 border border-[#b4ff39]/10 rounded-lg text-xs text-[#b4ff39] text-center card-pop">
              打卡成功！坚持就是胜利，你已经连续 {streakDays + 1} 天了
            </div>
          )}
        </div>

        {/* 能量金句 */}
        <div className="topo-card p-5 card-pop beam-sweep relative overflow-hidden" style={{ animationDelay: '200ms' }}>
          <div className="absolute top-3 right-3 opacity-5">
            <Quote className="w-16 h-16 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">每日能量</h3>
          </div>
          <blockquote className="relative">
            <p className="text-base font-serif leading-relaxed text-zinc-200 mb-3">
              「{dailyQuote.text}」
            </p>
            <footer className="text-xs text-zinc-500">—— {dailyQuote.author}</footer>
          </blockquote>
          <Link href="/diary" className="mt-3 inline-flex items-center gap-1 text-xs text-[#b4ff39] hover:underline">
            <BookHeart className="w-3.5 h-3.5" /> 写日记记录今天
          </Link>
        </div>
      </div>

      {/* KPI 四宫格 - 数字滚动 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPI_DATA.map((k, i) => (
          <CountUpKPI key={k.label} kpi={k} delay={(i + 1) * 150} />
        ))}
      </div>

      {/* 7 阶段全路径 */}
      <div>
        <div className="section-number card-pop">Journey</div>
        <h2 className="heading-lg mb-5 card-pop" style={{ animationDelay: '100ms' }}>考公全路径</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger">
          {STAGES.map((s, i) => (
            <Link key={s.href} href={s.href}>
              <div
                className={`topo-card p-4 card-hover cursor-pointer group relative overflow-hidden transition-all duration-300 ${hoveredStage === s.href ? 'ring-1 ring-[#b4ff39]/30' : ''}`}
                onMouseEnter={() => setHoveredStage(s.href)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* hover 时的光晕 */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#b4ff39]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="text-[10px] font-mono text-[#b4ff39]/50 mb-3">{s.num}</div>
                  <s.icon className="w-5 h-5 text-zinc-400 mb-3 group-hover:text-[#b4ff39] group-hover:scale-110 transition-all duration-300" />
                  <h3 className="font-semibold text-sm text-zinc-200 mb-1 group-hover:text-white transition-colors">{s.label}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                  <ArrowRight className="w-3 h-3 text-zinc-600 mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI 智能任务 + 上岸榜样 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="topo-card p-5 card-pop" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#b4ff39]/10 flex items-center justify-center animate-pulse-glow">
              <Zap className="w-4 h-4 text-[#b4ff39]" />
            </div>
            <h3 className="font-semibold text-zinc-200">AI 智能任务</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#b4ff39]/10 text-[#b4ff39] font-semibold animate-breathe">实时</span>
          </div>
          <div className="space-y-3">
            {AI_TASKS.map((t, i) => (
              <div key={i} className="p-3 rounded-xl bg-[var(--surface-2)] border border-[rgba(255,255,255,0.04)] card-hover animate-slide-right group/item" style={{ animationDelay: `${(i + 1) * 100 + 300}ms` }}>
                <div className="flex items-start gap-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#b4ff39]/8 text-[#b4ff39] font-medium shrink-0">{t.tag}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed group-hover/item:text-zinc-300 transition-colors">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="topo-card p-5 card-pop" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="font-semibold text-zinc-200">上岸榜样</h3>
          </div>
          <div className="space-y-3">
            {RANK_SUCCESS.slice(0, 4).map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-all duration-200 group/s">
                <div className="w-8 h-8 rounded-full bg-[#b4ff39]/10 flex items-center justify-center text-xs font-bold text-[#b4ff39] group-hover/s:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200 truncate group-hover/s:text-white transition-colors">{s.name}</span>
                    {s.isVip && <Crown className="w-3 h-3 text-amber-400" />}
                  </div>
                  <span className="text-[10px] text-zinc-500">{s.unit}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-[#b4ff39] animate-breathe">已上岸</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/rank">
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-white/5 btn-press">
              查看完整榜单 <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 学习雷达图 + 五大模块 + 情绪树洞 */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 能力雷达图 */}
        <div className="topo-card p-5 card-pop" style={{ animationDelay: '500ms' }}>
          <h3 className="font-semibold text-sm text-zinc-200 mb-4">能力雷达图</h3>
          <div className="relative w-full aspect-square max-w-[220px] mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* 网格线 */}
              {[0.2, 0.4, 0.6, 0.8, 1.0].map(scale => {
                const pts = [
                  [100, 100 - 80 * scale], [100 + 76 * scale, 100 - 25 * scale],
                  [100 + 47 * scale, 100 + 65 * scale], [100 - 47 * scale, 100 + 65 * scale],
                  [100 - 76 * scale, 100 - 25 * scale],
                ];
                return (
                  <polygon key={scale} points={pts.map(p => p.join(',')).join(' ')}
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                );
              })}
              {/* 数据区域 */}
              {(() => {
                const values = [0.88, 0.82, 0.76, 0.65, 0.58];
                const pts = [
                  [100, 100 - 80 * values[0]], [100 + 76 * values[1], 100 - 25 * values[1]],
                  [100 + 47 * values[2], 100 + 65 * values[2]], [100 - 47 * values[3], 100 + 65 * values[3]],
                  [100 - 76 * values[4], 100 - 25 * values[4]],
                ];
                return (
                  <polygon points={pts.map(p => p.join(',')).join(' ')}
                    fill="rgba(180,255,57,0.08)" stroke="rgba(180,255,57,0.6)" strokeWidth="1.5"
                    className="animate-scale-in" />
                );
              })()}
              {/* 数据点 - 带脉冲 */}
              {(() => {
                const values = [0.88, 0.82, 0.76, 0.65, 0.58];
                const positions = [
                  [100, 100 - 80 * values[0]], [100 + 76 * values[1], 100 - 25 * values[1]],
                  [100 + 47 * values[2], 100 + 65 * values[2]], [100 - 47 * values[3], 100 + 65 * values[3]],
                  [100 - 76 * values[4], 100 - 25 * values[4]],
                ];
                return positions.map((p, i) => (
                  <g key={i}>
                    <circle cx={p[0]} cy={p[1]} r="4" fill="#b4ff39" opacity="0.6" />
                    <circle cx={p[0]} cy={p[1]} r="4" fill="#b4ff39" opacity="0.3" className="animate-ping-slow" />
                  </g>
                ));
              })()}
              {/* 标签 */}
              {[
                { label: '资料分析', x: 100, y: 14, anchor: 'middle' as const },
                { label: '判断推理', x: 190, y: 78, anchor: 'start' as const },
                { label: '言语理解', x: 158, y: 175, anchor: 'start' as const },
                { label: '数量关系', x: 42, y: 175, anchor: 'end' as const },
                { label: '常识判断', x: 10, y: 78, anchor: 'end' as const },
              ].map(l => (
                <text key={l.label} x={l.x} y={l.y} textAnchor={l.anchor}
                  fill="#71717a" fontSize="9" fontFamily="system-ui">
                  {l.label}
                </text>
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-5 gap-1 mt-3">
            {[
              { name: '资料', rate: 88 },
              { name: '判断', rate: 82 },
              { name: '言语', rate: 76 },
              { name: '数量', rate: 65 },
              { name: '常识', rate: 58 },
            ].map(m => (
              <div key={m.name} className="text-center">
                <div className="text-sm font-bold font-mono text-[#b4ff39]">{m.rate}%</div>
                <div className="text-[9px] text-zinc-500">{m.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 五大模块 + 全国入口 */}
        <div className="topo-card p-5 card-pop" style={{ animationDelay: '550ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-zinc-200">五大模块正确率</h3>
            <Link href="/map" className="flex items-center gap-1 text-xs text-[#b4ff39] hover:underline btn-press">
              <MapPin className="w-3 h-3" /> 全国可视化
            </Link>
          </div>
          <div className="space-y-3 bar-stagger">
            {[
              { name: '资料分析', rate: 88, color: '#b4ff39' },
              { name: '判断推理', rate: 82, color: '#22d3ee' },
              { name: '言语理解', rate: 76, color: '#f59e0b' },
              { name: '数量关系', rate: 65, color: '#a78bfa' },
              { name: '常识判断', rate: 58, color: '#fb7185' },
            ].map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-500">{m.name}</span>
                  <span className="font-semibold text-zinc-300">{m.rate}%</span>
                </div>
                <div className="h-5 rounded-lg bg-zinc-800 overflow-hidden relative">
                  <div className="h-full rounded-lg animate-progress transition-all" style={{ width: `${m.rate}%`, backgroundColor: m.color }} />
                  <div className="absolute inset-0 flex items-center pl-2">
                    <span className="text-[9px] font-bold text-zinc-900">{m.rate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 全国难度速览 */}
          <div className="mt-4 p-3 rounded-xl bg-[var(--surface-2)] border border-[rgba(255,255,255,0.04)]">
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-3 h-3 text-[#b4ff39]" />
              <span className="text-xs font-medium text-zinc-300">热门省份难度速览</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: '山东', diff: '极难', color: 'bg-red-500/10 text-red-400' },
                { name: '河南', diff: '极难', color: 'bg-red-500/10 text-red-400' },
                { name: '广东', diff: '难', color: 'bg-orange-500/10 text-orange-400' },
                { name: '江苏', diff: '难', color: 'bg-orange-500/10 text-orange-400' },
                { name: '浙江', diff: '中高', color: 'bg-amber-500/10 text-amber-400' },
                { name: '四川', diff: '中等', color: 'bg-[#b4ff39]/10 text-[#b4ff39]' },
              ].map(p => (
                <span key={p.name} className={`text-[10px] px-2 py-0.5 rounded-full ${p.color} font-medium btn-press`}>
                  {p.name}·{p.diff}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 情绪树洞入口 */}
        <div className="topo-card p-5 card-pop relative overflow-hidden" style={{ animationDelay: '600ms' }}>
          <div className="absolute -bottom-4 -right-4 opacity-5">
            <TreePine className="w-24 h-24 text-white animate-gentle-bounce" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#b4ff39]/10 flex items-center justify-center animate-heart-beat">
              <Heart className="w-4 h-4 text-[#b4ff39]" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">情绪树洞</h3>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4">
            备考路上，有压力、有迷茫、有孤独。这里可以倾诉，也可以看看别人的故事。
          </p>
          <div className="space-y-2 mb-4">
            {[
              { text: '考公 vs 秋招，怎么选？', count: 238 },
              { text: '一个人备考太孤独了', count: 112 },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-400 group/st hover:text-zinc-300 transition-colors">
                <MessageCircle className="w-3 h-3 text-[#b4ff39] group-hover/st:scale-110 transition-transform" />
                <span className="truncate">{t.text}</span>
                <span className="text-zinc-600 shrink-0">{t.count}</span>
              </div>
            ))}
          </div>
          <Link href="/diary">
            <Button variant="outline" size="sm" className="w-full text-xs btn-press border-zinc-700 text-zinc-300 hover:bg-white/5 hover:text-zinc-100">
              进入树洞 <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
