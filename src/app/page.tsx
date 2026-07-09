'use client';

import { useState, useEffect } from 'react';
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
  { icon: Compass, label: '了解考公', href: '/explore', color: 'text-amber-600', bg: 'bg-amber-50', desc: '6 类考试对比 + AI 百科' },
  { icon: Target, label: '岗位匹配', href: '/match', color: 'text-rose-600', bg: 'bg-rose-50', desc: '专业→岗位 + 竞争预测' },
  { icon: ClipboardList, label: '报名决策', href: '/apply', color: 'text-violet-600', bg: 'bg-violet-50', desc: '冲稳保组合 + 竞争比' },
  { icon: CalendarDays, label: '备考规划', href: '/plan', color: 'text-sky-600', bg: 'bg-sky-50', desc: 'AI 四阶段 + 周课表' },
  { icon: BookOpen, label: '笔试训练', href: '/practice', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'AI 推题 + 错题归因' },
  { icon: PenTool, label: '申论批改', href: '/shenlun', color: 'text-orange-600', bg: 'bg-orange-50', desc: '五维评分 + 逐句点评' },
  { icon: Timer, label: '模考冲刺', href: '/mock', color: 'text-indigo-600', bg: 'bg-indigo-50', desc: '全国排名 + 成绩预测' },
  { icon: Mic, label: '面试模拟', href: '/interview', color: 'text-pink-600', bg: 'bg-pink-50', desc: 'AI 面试 + 实时点评' },
];

const KPI_DATA = [
  { label: '距国考', value: '168', unit: '天', icon: Flame, color: 'text-rose-500' },
  { label: '累计做题', value: '2,847', unit: '题', icon: Zap, color: 'text-amber-500' },
  { label: '正确率', value: '72.3', unit: '%', icon: TrendingUp, color: 'text-emerald-500' },
  { label: '全国排名', value: '3,421', unit: '名', icon: Users, color: 'text-sky-500' },
];

const AI_TASKS = [
  { text: '今日言语理解薄弱点：逻辑填空关联词搭配，建议专项 30 题', tag: '弱项推题', color: 'bg-rose-50 text-rose-700' },
  { text: '申论大作文素材已更新：乡村振兴 + 基层治理最新政策要点', tag: '素材推送', color: 'bg-amber-50 text-amber-700' },
  { text: '距省考报名仅 23 天，冲稳保岗位组合建议已生成', tag: '报名提醒', color: 'bg-violet-50 text-violet-700' },
  { text: '本周模考成绩上升 5.2%，资料分析正确率达 88%', tag: '成绩分析', color: 'bg-emerald-50 text-emerald-700' },
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [encouragement, setEncouragement] = useState<string>('');
  const [checkedIn, setCheckedIn] = useState(false);
  const [showEncourage, setShowEncourage] = useState(false);
  const [dailyQuote] = useState(() => ENERGY_QUOTES[0]);

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
    <div className="space-y-6 max-w-6xl">
      {/* 顶部 Hero + 心情 */}
      <div className="relative overflow-hidden rounded-2xl brand-gradient p-8 text-white animate-fade-up">
        <div className="absolute inset-0 animate-gradient" style={{background:'linear-gradient(135deg,rgba(243,160,76,0.9),rgba(229,133,34,0.95),rgba(200,100,20,0.9))',backgroundSize:'200% 200%'}} />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">欢迎回来，{USER.nickname}</h1>
              <p className="text-white/80 text-sm">当前阶段：<span className="font-semibold text-white">四·笔试训练</span> — 坚持每天刷题，上岸在望</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl font-bold font-serif">168<span className="text-base font-normal ml-1">天</span></div>
                <div className="text-white/70 text-xs">距 2027 国考笔试</div>
              </div>
            </div>
          </div>
          {/* 心情选择 */}
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mt-2">
            <p className="text-white/90 text-sm mb-3">今天心情怎么样？</p>
            <div className="flex items-center gap-3 flex-wrap">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMoodSelect(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    selectedMood === m.id
                      ? 'bg-white/30 ring-2 ring-white scale-105'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span className="text-white/90 text-xs">{m.label}</span>
                </button>
              ))}
            </div>
            {showEncourage && encouragement && (
              <div className="mt-3 p-3 bg-white/10 rounded-lg animate-fade-up">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/95 leading-relaxed">{encouragement}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 animate-float" />
        <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full bg-white/5" />
      </div>

      {/* 打卡 + 能量金句 */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 连续打卡 */}
        <Card className="p-5 card-hover animate-fade-up delay-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <h3 className="font-semibold text-sm">今日打卡</h3>
            </div>
            <span className="text-xs text-muted-foreground">已连续 {streakDays} 天</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    i < 5 ? 'bg-primary/15 text-primary' : i === 5 ? (checkedIn ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground') : 'bg-muted text-muted-foreground'
                  }`}>
                    {i < 5 || (i === 5 && checkedIn) ? '✓' : ''}
                  </div>
                ))}
                <span className="text-[10px] text-muted-foreground ml-1">本周</span>
              </div>
              {nextMilestone && (
                <div className="text-xs text-muted-foreground">
                  距「<span className="text-primary font-medium">{nextMilestone.title}</span>」还需打卡 <span className="font-medium">{nextMilestone.days - streakDays}</span> 天
                  <span className="ml-1">{nextMilestone.icon}</span>
                </div>
              )}
            </div>
            <Button
              onClick={handleCheckIn}
              disabled={checkedIn}
              className={`btn-press shrink-0 ${checkedIn ? 'bg-emerald-500 hover:bg-emerald-500' : ''}`}
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
            <div className="mt-3 p-2 bg-emerald-50 rounded-lg text-xs text-emerald-700 text-center animate-scale-in">
              打卡成功！坚持就是胜利，你已经连续 {streakDays + 1} 天了
            </div>
          )}
        </Card>

        {/* 能量金句 */}
        <Card className="p-5 card-hover animate-fade-up delay-200 relative overflow-hidden">
          <div className="absolute top-3 right-3 opacity-5">
            <Quote className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="font-semibold text-sm">每日能量</h3>
          </div>
          <blockquote className="relative">
            <p className="text-base font-serif leading-relaxed text-foreground/90 mb-3">
              「{dailyQuote.text}」
            </p>
            <footer className="text-xs text-muted-foreground">—— {dailyQuote.author}</footer>
          </blockquote>
          <Link href="/diary" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <BookHeart className="w-3.5 h-3.5" /> 写日记记录今天
          </Link>
        </Card>
      </div>

      {/* KPI 四宫格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPI_DATA.map((k, i) => (
          <Card key={k.label} className={`p-4 card-hover animate-fade-up delay-${(i+1)*100}`}>
            <div className="flex items-center gap-2 mb-2">
              <k.icon className={`w-4 h-4 ${k.color}`} />
              <span className="text-xs text-muted-foreground">{k.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-serif animate-count-up">{k.value}</span>
              <span className="text-xs text-muted-foreground">{k.unit}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 7 阶段全路径 */}
      <div>
        <h2 className="text-lg font-bold mb-4 animate-fade-up delay-200">考公全路径</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STAGES.map((s, i) => (
            <Link key={s.href} href={s.href}>
              <Card className={`p-4 card-hover cursor-pointer group animate-scale-in delay-${(i+1)*75}`}>
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{s.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* AI 智能任务 + 上岸榜样 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5 animate-fade-up delay-300">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center animate-pulse-glow">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold">AI 智能任务</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium animate-breathe">实时</span>
          </div>
          <div className="space-y-3">
            {AI_TASKS.map((t, i) => (
              <div key={i} className={`p-3 rounded-xl border border-border/50 card-hover animate-slide-right delay-${(i+1)*100}`}>
                <div className="flex items-start gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${t.color}`}>{t.tag}</span>
                  <p className="text-xs text-foreground/80 leading-relaxed">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 animate-fade-up delay-400">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <h3 className="font-semibold">上岸榜样</h3>
          </div>
          <div className="space-y-3">
            {RANK_SUCCESS.slice(0, 4).map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{s.name}</span>
                    {s.isVip && <Crown className="w-3 h-3 text-amber-500" />}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{s.unit}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-emerald-600">已上岸</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/rank">
            <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
              查看完整榜单 <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* 学习雷达图 + 全国可视化入口 + 情绪树洞 */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 能力雷达图 */}
        <Card className="p-5 md:col-span-1 animate-fade-up delay-500">
          <h3 className="font-semibold mb-4">能力雷达图</h3>
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
                    fill="none" stroke="var(--border)" strokeWidth="0.5" />
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
                    fill="rgba(243,160,76,0.15)" stroke="rgba(243,160,76,0.8)" strokeWidth="2"
                    className="animate-scale-in" />
                );
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
                  fill="var(--muted-foreground)" fontSize="9" fontFamily="system-ui">
                  {l.label}
                </text>
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-5 gap-1 mt-3">
            {[
              { name: '资料', rate: 88, color: 'text-emerald-600' },
              { name: '判断', rate: 82, color: 'text-sky-600' },
              { name: '言语', rate: 76, color: 'text-amber-600' },
              { name: '数量', rate: 65, color: 'text-orange-600' },
              { name: '常识', rate: 58, color: 'text-rose-600' },
            ].map(m => (
              <div key={m.name} className="text-center">
                <div className={`text-sm font-bold font-serif ${m.color}`}>{m.rate}%</div>
                <div className="text-[9px] text-muted-foreground">{m.name}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* 全国可视化入口 + 五大模块条形图 */}
        <Card className="p-5 animate-fade-up delay-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">五大模块正确率</h3>
            <Link href="/map" className="flex items-center gap-1 text-xs text-primary hover:underline">
              <MapPin className="w-3 h-3" /> 全国可视化
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { name: '资料分析', rate: 88, color: 'bg-emerald-500' },
              { name: '判断推理', rate: 82, color: 'bg-sky-500' },
              { name: '言语理解', rate: 76, color: 'bg-amber-500' },
              { name: '数量关系', rate: 65, color: 'bg-orange-500' },
              { name: '常识判断', rate: 58, color: 'bg-rose-500' },
            ].map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-semibold">{m.rate}%</span>
                </div>
                <div className="h-5 rounded-lg bg-muted overflow-hidden relative">
                  <div className={`h-full rounded-lg ${m.color} animate-progress transition-all`} style={{ width: `${m.rate}%` }} />
                  <div className="absolute inset-0 flex items-center pl-2">
                    <span className="text-[9px] font-bold text-white drop-shadow-sm">{m.rate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* 全国难度速览 */}
          <div className="mt-4 p-3 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium">热门省份难度速览</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: '山东', diff: '极难', color: 'bg-red-100 text-red-700' },
                { name: '河南', diff: '极难', color: 'bg-red-100 text-red-700' },
                { name: '广东', diff: '难', color: 'bg-orange-100 text-orange-700' },
                { name: '江苏', diff: '难', color: 'bg-orange-100 text-orange-700' },
                { name: '浙江', diff: '中高', color: 'bg-yellow-100 text-yellow-700' },
                { name: '四川', diff: '中等', color: 'bg-lime-100 text-lime-700' },
              ].map(p => (
                <span key={p.name} className={`text-[10px] px-2 py-0.5 rounded-full ${p.color} font-medium`}>
                  {p.name}·{p.diff}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* 情绪树洞入口 */}
        <Card className="p-5 animate-fade-up delay-500 relative overflow-hidden">
          <div className="absolute -bottom-4 -right-4 opacity-5">
            <TreePine className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Heart className="w-4 h-4 text-emerald-500" />
            </div>
            <h3 className="font-semibold text-sm">情绪树洞</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            备考路上，有压力、有迷茫、有孤独。这里可以倾诉，也可以看看别人的故事。
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-foreground/70">
              <MessageCircle className="w-3 h-3 text-primary" />
              <span className="truncate">考公 vs 秋招，怎么选？</span>
              <span className="text-muted-foreground shrink-0">238 回复</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground/70">
              <MessageCircle className="w-3 h-3 text-primary" />
              <span className="truncate">一个人备考太孤独了</span>
              <span className="text-muted-foreground shrink-0">112 回复</span>
            </div>
          </div>
          <Link href="/diary">
            <Button variant="outline" size="sm" className="w-full text-xs btn-press">
              进入树洞 <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
