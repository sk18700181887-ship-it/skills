'use client';

import { useState } from 'react';
import { Timer, TrendingUp, Users, Play, Trophy, BarChart3, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_PAPERS, RECENT_MOCKS } from '@/lib/data';

export default function MockPage() {
  const [tab, setTab] = useState<'schedule' | 'results' | 'predict'>('schedule');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Timer className="w-5 h-5 text-primary" /> 模考中心
        </h1>
        <p className="text-sm text-muted-foreground mt-1">全国模考 + 成绩预测 + 上岸概率分析</p>
      </div>

      {/* Tab */}
      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit animate-fade-up delay-75">
        {(['schedule', 'results', 'predict'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${tab === t ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}>
            {t === 'schedule' ? '模考排期' : t === 'results' ? '历史成绩' : 'AI 预测'}
          </button>
        ))}
      </div>

      {/* 模考排期 */}
      {tab === 'schedule' && (
        <div className="grid md:grid-cols-2 gap-4 animate-fade-up delay-100">
          {MOCK_PAPERS.map((exam, i) => (
            <Card key={i} className="p-5 card-hover animate-slide-up" style={{animationDelay: `${i*0.08}s`}}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{exam.tag}</span>
                <span className="text-[10px] text-muted-foreground">{exam.date}</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{exam.name}</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
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
            </Card>
          ))}
        </div>
      )}

      {/* 历史成绩 */}
      {tab === 'results' && (
        <div className="space-y-4 animate-fade-up delay-100">
          {RECENT_MOCKS.map((r, i) => (
            <Card key={i} className="p-5 animate-slide-up" style={{animationDelay: `${i*0.08}s`}}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{r.name}</h3>
                  <span className="text-[10px] text-muted-foreground">{r.date} · {r.duration}</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{r.score}<span className="text-xs font-normal text-muted-foreground">/100</span></div>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{width: `${r.score}%`}} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                <Trophy className="w-3 h-3 text-amber-500" />
                <span className="text-xs text-muted-foreground">全国排名 #{r.rank}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* AI 预测 */}
      {tab === 'predict' && (
        <div className="grid md:grid-cols-3 gap-4 animate-fade-up delay-100">
          {[
            { icon: BarChart3, label: '预测行测分', value: '72.5', color: 'text-primary', sub: '基于模考趋势推算' },
            { icon: TrendingUp, label: '上岸概率', value: '41%', color: 'text-emerald-600', sub: '综合排名与岗位竞争' },
            { icon: Sparkles, label: 'AI 评语', value: '稳步上升', color: 'text-amber-600', sub: '近 3 次模考均提升 5 分+' },
          ].map((item, i) => (
            <Card key={i} className="p-5 text-center card-hover animate-scale-in" style={{animationDelay: `${i*0.1}s`}}>
              <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
              <div className={`text-2xl font-bold ${item.color} animate-count-up`}>{item.value}</div>
              <div className="text-xs font-medium mt-1">{item.label}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{item.sub}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
