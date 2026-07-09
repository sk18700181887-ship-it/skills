'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass, Target, ClipboardList, CalendarDays, BookOpen,
  PenTool, Timer, Mic, Trophy, Crown, ArrowRight, Zap,
  Flame, TrendingUp, Users, Star
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { USER, RANK_SUCCESS } from '@/lib/data';

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

const KPI = [
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
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* 顶部 Hero */}
      <div className="relative overflow-hidden rounded-2xl brand-gradient p-8 text-white animate-fade-up">
        <div className="absolute inset-0 animate-gradient" style={{background:'linear-gradient(135deg,rgba(243,160,76,0.9),rgba(229,133,34,0.95),rgba(200,100,20,0.9))',backgroundSize:'200% 200%'}} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">欢迎回来，{USER.nickname}</h1>
            <p className="text-white/80 text-sm">当前阶段：<span className="font-semibold text-white">四·笔试训练</span> — 坚持每天刷题，上岸在望</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold font-serif">168<span className="text-base font-normal ml-1">天</span></div>
              <div className="text-white/70 text-xs">距 2027 国考笔试</div>
            </div>
          </div>
        </div>
        {/* 装饰圆 */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 animate-float" />
        <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full bg-white/5" />
      </div>

      {/* KPI 四宫格 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPI.map((k, i) => (
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
        {/* AI 智能任务 */}
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

        {/* 上岸榜样 */}
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

      {/* 学习进度总览 */}
      <Card className="p-5 animate-fade-up delay-500">
        <h3 className="font-semibold mb-4">五大模块正确率</h3>
        <div className="grid grid-cols-5 gap-4">
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
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className={`h-full rounded-full ${m.color} animate-progress`} style={{ width: `${m.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
