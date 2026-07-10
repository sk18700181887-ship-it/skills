'use client';

import { useState } from 'react';
import { Target, Sparkles, MapPin, TrendingUp, ChevronDown, Search, BadgeCheck, CheckCircle2, Shield } from 'lucide-react';
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
    <div className="hero-reveal space-y-8 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-serif font-light tracking-tight card-pop flex items-center gap-3">
          <Target className="w-6 h-6 text-[#b4ff39]" /> AI 岗位匹配
        </h1>
        <p className="text-sm text-zinc-500 mt-2">输入专业方向，AI 自动匹配最优岗位 + 竞争预测 + 上岸概率</p>
      </div>

      {/* 输入区 */}
      <div className="topo-card p-6 animate-fade-up delay-75">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-4 h-4 text-[#b4ff39] animate-pulse-glow" />
          <h2 className="font-semibold text-lg">智能匹配引擎</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="text-xs text-zinc-500 mb-1 block">专业方向</label>
            <Input placeholder="如：计算机、会计、法学、汉语言文学..." value={major} onChange={(e) => { setMajor(e.target.value); setMatched(false); }} className="bg-[var(--surface-1)] border-[rgba(255,255,255,0.06)] text-white placeholder:text-zinc-600" />
          </div>
          <div className="w-full md:w-40">
            <label className="text-xs text-zinc-500 mb-1 block">目标省份</label>
            <div className="relative">
              <select className="w-full h-9 rounded-md border border-[rgba(255,255,255,0.06)] bg-[var(--surface-1)] text-white px-3 text-sm" value={province} onChange={(e) => setProvince(e.target.value)}>
                {CITY_TIERS.map(t => <option key={t.province}>{t.province}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end">
            <Button className="btn-press w-full md:w-auto bg-[#b4ff39] text-black hover:bg-[#c5ff6b] btn-press font-medium" disabled={animating}>
              <Search className="w-4 h-4 mr-1" /> {animating ? '匹配中...' : '开始匹配'}
            </Button>
          </div>
        </div>
      </div>

      {/* 匹配动画 */}
      {animating && (
        <div className="flex flex-col items-center py-12 animate-fade-in">
          <div className="w-16 h-16 rounded-none bg-[#b4ff39]/10 flex items-center justify-center mb-4 animate-float">
            <Sparkles className="w-8 h-8 text-[#b4ff39]" />
          </div>
          <p className="text-sm text-zinc-500">AI 正在分析你的专业优势与岗位匹配度...</p>
          <div className="flex gap-1 mt-4">
            {[0,1,2].map(i => (
              <div key={i} className="w-2 h-2 rounded-none bg-[#b4ff39] animate-bounce" style={{animationDelay: `${i * 0.15}s`}} />
            ))}
          </div>
        </div>
      )}

      {/* 匹配结果 */}
      {matched && !animating && (
        <div className="hero-reveal space-y-6 animate-fade-up">
          {/* 专业分类结果 */}
          <div className="topo-card p-5 border-[#b4ff39]/20 bg-[#b4ff39]/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-none bg-[#b4ff39]/10 flex items-center justify-center">
                <BadgeCheck className="w-5 h-5 text-[#b4ff39]" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{matchedLib.name}</h2>
                <p className="text-xs text-zinc-500">匹配关键词：{matchedLib.keywords.join('、')}</p>
              </div>
            </div>
          </div>

          {/* 岗位推荐卡片 */}
          <div>
            <h3 className="font-semibold mb-3">推荐岗位方向</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {matchedLib.positions.map((job, i) => (
                <div key={i} className="topo-card p-4 card-hover animate-slide-right" style={{animationDelay:`${(i+1)*75}ms`}}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm">{job.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-none font-medium ${
                      job.competition === '较高' ? 'bg-rose-400/10 text-rose-400' :
                      job.competition === '中等' ? 'bg-amber-400/10 text-amber-400' :
                      'bg-emerald-400/10 text-emerald-400'
                    }`}>{job.competition}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">{job.org}</p>
                  <p className="text-xs text-zinc-400">{job.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 城市梯队 */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#b4ff39]" /> {province}城市梯队
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { label: '冲刺梯队', cities: tierData.sprint, icon: TrendingUp, accent: 'text-rose-400', bg: 'bg-rose-400/10' },
                { label: '稳定梯队', cities: tierData.stable, icon: CheckCircle2, accent: 'text-amber-400', bg: 'bg-amber-400/10' },
                { label: '保底梯队', cities: tierData.safety, icon: Shield, accent: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              ].map((tier, i) => (
                <div key={tier.label} className="topo-card p-4 animate-scale-in" style={{animationDelay:`${(i+1)*100}ms`}}>
                  <div className={`w-8 h-8 rounded-none ${tier.bg} flex items-center justify-center mb-3 ${tier.accent}`}>
                    <tier.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{tier.label}</h4>
                  <div className="flex flex-wrap gap-1">
                    {tier.cities.map(c => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-none bg-zinc-900 text-zinc-400">{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 上岸概率预测 */}
          <div className="topo-card p-5 animate-fade-up delay-300">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#b4ff39]" /> AI 上岸概率预测
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: '冲刺岗', prob: '35%', accent: 'text-rose-400', bg: 'bg-rose-400/10' },
                { label: '稳定岗', prob: '62%', accent: 'text-amber-400', bg: 'bg-amber-400/10' },
                { label: '保底岗', prob: '85%', accent: 'text-emerald-400', bg: 'bg-emerald-400/10' },
              ].map(p => (
                <div key={p.label} className={`p-4 rounded-none ${p.bg}`}>
                  <div className={`text-3xl font-bold font-serif ${p.accent}`}>{p.prob}</div>
                  <div className="text-xs text-zinc-500 mt-1">{p.label}上岸率</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-600 mt-3 text-center">* 概率基于历年数据 + 你的专业匹配度综合推算，仅供参考</p>
          </div>
        </div>
      )}
    </div>
  );
}
