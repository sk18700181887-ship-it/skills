'use client';

import { CalendarDays, Sparkles, Clock, BookOpen, Target, ChevronRight } from 'lucide-react';
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
    <div className="hero-reveal space-y-8 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-serif font-light tracking-tight card-pop flex items-center gap-3">
          <CalendarDays className="w-6 h-6 text-[#b4ff39]" /> AI 备考规划
        </h1>
        <p className="text-sm text-zinc-500 mt-2">智能四阶段规划 + 周课表 + 动态调整，备考节奏一目了然</p>
      </div>

      {/* 四阶段时间线 */}
      <div className="animate-fade-up delay-75">
        <div className="flex items-center gap-3 mb-5">
          <Sparkles className="w-4 h-4 text-[#b4ff39] animate-pulse-glow" />
          <h2 className="font-semibold text-lg">AI 四阶段规划</h2>
        </div>
        <div className="relative">
          <div className="absolute top-6 left-6 right-6 h-0.5 bg-white/[0.06] hidden md:block" />
          <div className="grid md:grid-cols-4 gap-4">
            {STUDY_PLAN.map((phase, i) => (
              <div key={i} className="topo-card p-4 card-hover animate-slide-up relative" style={{animationDelay:`${(i+1)*100}ms`}}>
                <div className={`w-8 h-8 rounded-none flex items-center justify-center text-xs font-bold text-black mb-3 ${
                  i === 0 ? 'bg-[#b4ff39]' : i === 1 ? 'bg-amber-400' : i === 2 ? 'bg-rose-400' : 'bg-emerald-400'
                }`}>
                  {i + 1}
                </div>
                <h3 className="font-semibold text-sm mb-1">{phase.phase}</h3>
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-2">
                  <Clock className="w-3 h-3" /> {phase.ratio} · {phase.duration}
                </div>
                <ul className="space-y-1">
                  {phase.tasks.map((t, j) => (
                    <li key={j} className="text-xs text-zinc-400 flex items-start gap-1">
                      <span className="text-[#b4ff39] mt-0.5">•</span> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 p-2 rounded-none bg-[#b4ff39]/5 border border-[#b4ff39]/10">
                  <p className="text-[10px] text-[#b4ff39] flex items-start gap-1">
                    <Sparkles className="w-3 h-3 mt-0.5 shrink-0" /> {phase.ai}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 周课表 */}
      <div className="animate-fade-up delay-200">
        <h2 className="font-semibold mb-5 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#b4ff39]" /> 每周标准课表
        </h2>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-4 gap-0 text-center">
              <div className="p-2 text-xs font-medium text-zinc-500 bg-zinc-900 rounded-tl-lg">星期</div>
              <div className="p-2 text-xs font-medium text-zinc-500 bg-zinc-900">上午/主时段</div>
              <div className="p-2 text-xs font-medium text-zinc-500 bg-zinc-900">下午/副时段</div>
              <div className="p-2 text-xs font-medium text-zinc-500 bg-zinc-900 rounded-tr-lg">晚上/复盘</div>
            </div>
            {WEEKLY.map((d, i) => (
              <div key={d.day} className={`grid grid-cols-4 gap-0 ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                <div className={`p-3 text-xs font-semibold ${i === 5 || i === 6 ? 'text-[#b4ff39]' : 'text-zinc-300'}`}>
                  {d.day}
                </div>
                <div className="p-3 text-xs text-zinc-400">{d.am}</div>
                <div className="p-3 text-xs text-zinc-400">{d.pm}</div>
                <div className="p-3 text-xs text-zinc-400">{d.eve}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 考场策略 */}
      <div className="topo-card p-5 animate-fade-up delay-300">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-[#b4ff39]" /> 考场做题顺序
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {['常识判断 10min', '资料分析 25min', '判断推理 35min', '言语理解 35min', '数量关系 15min'].map((step, i) => (
            <div key={i} className="flex items-center gap-2 animate-slide-right" style={{animationDelay: `${i*0.1}s`}}>
              <span className={`px-3 py-1.5 rounded-none text-xs font-medium ${
                i === 1 ? 'bg-[#b4ff39] text-black' : 'bg-zinc-900 text-zinc-300'
              }`}>{step}</span>
              {i < 4 && <ChevronRight className="w-3 h-3 text-zinc-600" />}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-zinc-600 mt-3">资料分析是满分区，优先做；数量关系最耗时，最后做</p>
      </div>
    </div>
  );
}
