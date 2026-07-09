'use client';

import { CalendarDays, Sparkles, Clock, BookOpen, Target, Zap, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { STUDY_PLAN } from '@/lib/data';

const WEEKLY = [
  { day: '周一', am: '言语理解：逻辑填空+片段阅读', pm: '申论：归纳概括（限时）', eve: '错题复盘+常识积累20点' },
  { day: '周二', am: '判断推理：图形+定义', pm: '数量关系：工程/行程', eve: '行测限时60题' },
  { day: '周三', am: '资料分析：增长率/比重/倍数', pm: '申论：综合分析（限时）', eve: '申论素材+每天练字' },
  { day: '周四', am: '判断推理：逻辑判断+类比', pm: '言语理解：语句表达', eve: '错题三遍法·二刷' },
  { day: '周五', am: '数量关系：排列组合/最值', pm: '公基：法律/政治/经济', eve: '本周最薄弱模块补充' },
  { day: '周六', am: '行测全真模考（120分钟）', pm: '全面复盘：错题归因分析', eve: '常识+时政热点整理' },
  { day: '周日', am: '申论限时模考（180分钟）', pm: '大作文修改/公基写作', eve: '半天休整+下周计划' },
];

export default function PlanPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary" /> AI 备考规划
        </h1>
        <p className="text-sm text-muted-foreground mt-1">智能四阶段规划 + 周课表 + 动态调整，备考节奏一目了然</p>
      </div>

      {/* 四阶段时间线 */}
      <div className="animate-fade-up delay-75">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
          <h2 className="font-semibold">AI 四阶段规划</h2>
        </div>
        <div className="relative">
          {/* 连接线 */}
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-border hidden md:block" />
          <div className="grid md:grid-cols-4 gap-4">
            {STUDY_PLAN.map((phase, i) => (
              <Card key={i} className={`p-4 card-hover animate-slide-up delay-${(i+1)*100} relative`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mb-3 ${
                  i === 0 ? 'bg-primary' : i === 1 ? 'bg-amber-500' : i === 2 ? 'bg-rose-500' : 'bg-emerald-500'
                }`}>
                  {i + 1}
                </div>
                <h3 className="font-semibold text-sm mb-1">{phase.phase}</h3>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-2">
                  <Clock className="w-3 h-3" /> {phase.ratio} · {phase.duration}
                </div>
                <ul className="space-y-1">
                  {phase.tasks.map((t, j) => (
                    <li key={j} className="text-xs text-foreground/70 flex items-start gap-1">
                      <span className="text-primary mt-0.5">•</span> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-[10px] text-primary flex items-start gap-1">
                    <Sparkles className="w-3 h-3 mt-0.5 shrink-0" /> {phase.ai}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 周课表 */}
      <div className="animate-fade-up delay-200">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" /> 每周标准课表
        </h2>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-4 gap-0 text-center">
              <div className="p-2 text-xs font-medium text-muted-foreground bg-muted/50 rounded-tl-lg">星期</div>
              <div className="p-2 text-xs font-medium text-muted-foreground bg-muted/50">上午/主时段</div>
              <div className="p-2 text-xs font-medium text-muted-foreground bg-muted/50">下午/副时段</div>
              <div className="p-2 text-xs font-medium text-muted-foreground bg-muted/50 rounded-tr-lg">晚上/复盘</div>
            </div>
            {WEEKLY.map((d, i) => (
              <div key={d.day} className={`grid grid-cols-4 gap-0 ${i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                <div className={`p-3 text-xs font-semibold ${i === 5 || i === 6 ? 'text-primary' : ''}`}>
                  {d.day}{i === 5 ? ' 🎯' : i === 6 ? ' ✍️' : ''}
                </div>
                <div className="p-3 text-xs text-foreground/80">{d.am}</div>
                <div className="p-3 text-xs text-foreground/80">{d.pm}</div>
                <div className="p-3 text-xs text-foreground/80">{d.eve}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 考场策略 */}
      <Card className="p-5 animate-fade-up delay-300">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" /> 考场做题顺序
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {['常识判断 10min', '资料分析 25min', '判断推理 35min', '言语理解 35min', '数量关系 15min'].map((step, i) => (
            <div key={i} className="flex items-center gap-2 animate-slide-right" style={{animationDelay: `${i*0.1}s`}}>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                i === 1 ? 'bg-primary text-white' : 'bg-muted'
              }`}>{step}</span>
              {i < 4 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3">资料分析是满分区，优先做；数量关系最耗时，最后做</p>
      </Card>
    </div>
  );
}
