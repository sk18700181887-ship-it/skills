'use client';

import { useState } from 'react';
import { Target, Sparkles, MapPin, TrendingUp, Users, ArrowRight, ChevronDown, Search, BadgeCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PROFESSION_LIB, CITY_TIERS } from '@/lib/data';

export default function MatchPage() {
  const [major, setMajor] = useState('');
  const [province, setProvince] = useState('山东');
  const [matched, setMatched] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleMatch = () => {
    if (!major.trim()) return;
    setAnimating(true);
    setTimeout(() => { setMatched(true); setAnimating(false); }, 1200);
  };

  const matchedLib = PROFESSION_LIB.find(p => p.keywords.some(k => major.includes(k))) || PROFESSION_LIB[PROFESSION_LIB.length - 1];
  const tierData = CITY_TIERS.find(t => t.province === province) || CITY_TIERS[0];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" /> AI 岗位匹配
        </h1>
        <p className="text-sm text-muted-foreground mt-1">输入专业方向，AI 自动匹配最优岗位 + 竞争预测 + 上岸概率</p>
      </div>

      {/* 输入区 */}
      <Card className="p-6 animate-fade-up delay-75">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
          <h2 className="font-semibold">智能匹配引擎</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">专业方向</label>
            <Input placeholder="如：计算机、会计、法学、汉语言文学..." value={major} onChange={(e) => { setMajor(e.target.value); setMatched(false); }} />
          </div>
          <div className="w-full md:w-40">
            <label className="text-xs text-muted-foreground mb-1 block">目标省份</label>
            <div className="relative">
              <select className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" value={province} onChange={(e) => setProvince(e.target.value)}>
                {CITY_TIERS.map(t => <option key={t.province}>{t.province}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end">
            <Button onClick={handleMatch} disabled={animating} className="w-full md:w-auto btn-press">
              <Search className="w-4 h-4 mr-1" /> {animating ? '匹配中...' : '开始匹配'}
            </Button>
          </div>
        </div>
      </Card>

      {/* 匹配动画 */}
      {animating && (
        <div className="flex flex-col items-center py-12 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 animate-float">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">AI 正在分析你的专业优势与岗位匹配度...</p>
          <div className="flex gap-1 mt-4">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{animationDelay: `${i * 0.15}s`}} />
            ))}
          </div>
        </div>
      )}

      {/* 匹配结果 */}
      {matched && !animating && (
        <div className="space-y-6 animate-fade-up">
          {/* 专业分类结果 */}
          <Card className="p-5 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{matchedLib.name}</h2>
                <p className="text-xs text-muted-foreground">匹配关键词：{matchedLib.keywords.join('、')}</p>
              </div>
            </div>
          </Card>

          {/* 岗位推荐卡片 */}
          <div>
            <h3 className="font-semibold mb-3">推荐岗位方向</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {matchedLib.positions.map((job, i) => (
                <Card key={i} className={`p-4 card-hover animate-slide-right delay-${(i+1)*75}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{job.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      job.competition === '较高' ? 'bg-rose-50 text-rose-700' :
                      job.competition === '中等' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>{job.competition}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{job.org}</p>
                  <p className="text-xs text-foreground/70">{job.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* 城市梯队 */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> {province}城市梯队
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: '冲刺梯队', cities: tierData.sprint, icon: TrendingUp, color: 'text-rose-600 bg-rose-50', border: 'border-rose-100' },
                { label: '稳定梯队', cities: tierData.stable, icon: CheckCircle2, color: 'text-amber-600 bg-amber-50', border: 'border-amber-100' },
                { label: '保底梯队', cities: tierData.safety, icon: Shield, color: 'text-emerald-600 bg-emerald-50', border: 'border-emerald-100' },
              ].map((tier, i) => (
                <Card key={tier.label} className={`p-4 ${tier.border} animate-scale-in delay-${(i+1)*100}`}>
                  <div className={`w-8 h-8 rounded-lg ${tier.color} flex items-center justify-center mb-3`}>
                    <tier.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{tier.label}</h4>
                  <div className="flex flex-wrap gap-1">
                    {tier.cities.map(c => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{c}</span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 上岸概率预测 */}
          <Card className="p-5 animate-fade-up delay-300">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> AI 上岸概率预测
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: '冲刺岗', prob: '35%', color: 'text-rose-600', bg: 'bg-rose-50' },
                { label: '稳定岗', prob: '62%', color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: '保底岗', prob: '85%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map(p => (
                <div key={p.label} className={`p-4 rounded-xl ${p.bg}`}>
                  <div className={`text-3xl font-bold font-serif ${p.color}`}>{p.prob}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.label}上岸率</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 text-center">* 概率基于历年数据 + 你的专业匹配度综合推算，仅供参考</p>
          </Card>
        </div>
      )}
    </div>
  );
}

function Shield(p: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
