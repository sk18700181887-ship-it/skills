'use client';

import { useState } from 'react';
import { Timer, TrendingUp, Users, Play, Trophy, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_PAPERS, RECENT_MOCKS } from '@/lib/data';

export default function MockPage() {
  const [tab, setTab] = useState<'schedule' | 'results' | 'predict'>('schedule');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  return (
    <div className="hero-reveal space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight card-pop flex items-center gap-3">
          <Timer className="w-6 h-6 text-[#b4ff39]" /> 模考中心
        </h1>
        <p className="text-sm text-zinc-500 mt-1">全国模考 + 成绩预测 + 上岸概率分析</p>
      </div>

      {/* Tab */}
      <div className="flex gap-1 bg-white/[0.04] p-1 rounded-xl w-fit animate-fade-up delay-75">
        {(['schedule', 'results', 'predict'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${tab === t ? 'bg-white shadow text-white' : 'text-zinc-500'}`}>
            {t === 'schedule' ? '模考排期' : t === 'results' ? '历史成绩' : 'AI 预测'}
          </button>
        ))}
      </div>

      {/* 模考排期 */}
      {tab === 'schedule' && (
        <div className="grid md:grid-cols-2 gap-4 animate-fade-up delay-100">
          {MOCK_PAPERS.map((exam, i) => (
            <div key={i} className="topo-card p-5 card-hover animate-slide-up" style={{animationDelay: `${i*0.08}s`}}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#b4ff39]/10 text-[#b4ff39] font-medium">{exam.tag}</span>
                <span className="text-[10px] text-zinc-500">{exam.date}</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{exam.name}</h3>
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> {exam.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {exam.joined}人报名</span>
              </div>
              <Button
                onClick={() => setSelectedExam(exam.id)}
                className="w-full btn-press"
                variant={selectedExam === exam.id ? 'outline' : 'default'}
              >
                {selectedExam === exam.id ? '已报名 ✓' : <><Play className="w-3 h-3 mr-1" /> 立即报名</>}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* 历史成绩 */}
      {tab === 'results' && (
        <div className="hero-reveal space-y-5 animate-fade-up delay-100">
          {/* 成绩趋势折线图 */}
          <div className="topo-card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#b4ff39]" /> 模考成绩趋势
            </h3>
            <div className="h-48 relative">
              <svg viewBox="0 0 600 180" className="w-full h-full" preserveAspectRatio="none">
                {/* Y 轴刻度线 */}
                {[0, 1, 2, 3, 4].map(i => (
                  <g key={i}>
                    <line x1="40" y1={20 + i * 35} x2="580" y2={20 + i * 35} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4" />
                    <text x="35" y={24 + i * 35} textAnchor="end" fill="var(--muted-foreground)" fontSize="9">{100 - i * 20}</text>
                  </g>
                ))}
                {/* 趋势线 */}
                {(() => {
                  const data = [58, 62, 59, 67, 71, 68, 74, 78];
                  const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
                  const step = (580 - 40) / (data.length - 1);
                  const points = data.map((v, i) => `${40 + i * step},${180 - (v / 100) * 160}`);
                  return (
                    <>
                      <polyline points={points.join(' ')} fill="none" stroke="var(--color-primary, #F3A04C)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-line" />
                      {/* 渐变填充 */}
                      <defs>
                        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(243,160,76,0.2)" />
                          <stop offset="100%" stopColor="rgba(243,160,76,0)" />
                        </linearGradient>
                      </defs>
                      <polygon points={`${points.join(' ')} ${40 + (data.length - 1) * step},180 40,180`} fill="url(#trendGrad)" />
                      {/* 数据点 */}
                      {data.map((v, i) => (
                        <g key={i}>
                          <circle cx={40 + i * step} cy={180 - (v / 100) * 160} r="4" fill="var(--color-primary, #F3A04C)" stroke="white" strokeWidth="2" />
                          <text x={40 + i * step} y={175 - (v / 100) * 160} textAnchor="middle" fill="var(--muted-foreground)" fontSize="9">{v}</text>
                          <text x={40 + i * step} y="195" textAnchor="middle" fill="var(--muted-foreground)" fontSize="8">{labels[i]}</text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* 历史列表 */}
          {RECENT_MOCKS.map((r, i) => (
            <div key={i} className="topo-card p-5 animate-slide-up" style={{animationDelay: `${i*0.08}s`}}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{r.name}</h3>
                  <span className="text-[10px] text-zinc-500">{r.date} · {r.duration}</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#b4ff39]">{r.score}<span className="text-xs font-normal text-zinc-500">/100</span></div>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{width: `${r.score}%`}} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                <Trophy className="w-3 h-3 text-amber-500" />
                <span className="text-xs text-zinc-500">全国排名 #{r.rank}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI 预测 */}
      {tab === 'predict' && (
        <div className="hero-reveal space-y-5 animate-fade-up delay-100">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: BarChart3, label: '预测行测分', value: '72.5', color: 'text-[#b4ff39]', sub: '基于模考趋势推算' },
              { icon: TrendingUp, label: '上岸概率', value: '41%', color: 'text-emerald-400', sub: '综合排名与岗位竞争' },
              { icon: Sparkles, label: 'AI 评语', value: '稳步上升', color: 'text-amber-400', sub: '近 3 次模考均提升 5 分+' },
            ].map((item, i) => (
              <div key={i} className="topo-card p-5 text-center card-hover animate-scale-in" style={{animationDelay: `${i*0.1}s`}}>
                <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
                <div className={`text-2xl font-bold ${item.color} animate-count-up`}>{item.value}</div>
                <div className="text-xs font-medium mt-1">{item.label}</div>
                <div className="text-[10px] text-zinc-500 mt-1">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* 上岸概率仪表盘 */}
          <div className="topo-card p-5">
            <h3 className="font-semibold mb-4">上岸概率仪表盘</h3>
            <div className="flex items-center gap-8 justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border)" strokeWidth="16" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-primary, #F3A04C)"
                    strokeWidth="16" strokeDasharray={`${41 * 5.03} ${100 * 5.03 - 41 * 5.03}`}
                    strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold font-serif text-[#b4ff39]">41%</span>
                  <span className="text-[10px] text-zinc-500">上岸概率</span>
                </div>
              </div>
              <div className="hero-reveal space-y-3">
                {[
                  { label: '行测能力', value: 72, color: 'bg-primary' },
                  { label: '申论能力', value: 65, color: 'bg-amber-400/100' },
                  { label: '竞争压力', value: 85, color: 'bg-rose-400/100' },
                  { label: '岗位匹配', value: 60, color: 'bg-sky-400/100' },
                ].map(item => (
                  <div key={item.label} className="w-48">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-500">{item.label}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <div className={`h-full rounded-full ${item.color} animate-progress`} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
