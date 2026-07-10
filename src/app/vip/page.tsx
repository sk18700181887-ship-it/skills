'use client';

import { useState } from 'react';
import { Crown, Check, X, Sparkles, Gift, TrendingUp, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VIP_PLANS, VIP_BENEFITS, EXAM_TYPES, ASHORE_CASES } from '@/lib/data';

export default function VipPage() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="hero-reveal space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-serif font-light tracking-tight card-pop flex items-center gap-3">
          <Crown className="w-6 h-6 text-[#b4ff39]" /> 会员中心
        </h1>
        <p className="text-sm text-zinc-500 mt-1">开通 VIP，解锁全部 AI 能力</p>
      </div>

      {/* 套餐选择 */}
      <div className="grid md:grid-cols-3 gap-4">
        {VIP_PLANS.map((plan, i) => (
          <div key={i} onClick={() => setSelected(i)}
            className={`topo-card p-5 cursor-pointer transition-all duration-500 animate-scale-in relative overflow-hidden ${
              selected === i ? 'ring-2 ring-[#b4ff39]  scale-[1.02]' : 'card-hover'
            }`}
            style={{animationDelay: `${i*0.1}s`}}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-[#b4ff39] text-black text-[9px] px-2 py-0.5 rounded-bl-lg font-medium">推荐</div>
            )}
            <h3 className="font-bold text-base mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold text-[#b4ff39]">¥{plan.price}</span>
              <span className="text-xs text-zinc-500">/{plan.unit}</span>
            </div>
            {plan.highlight && (
              <div className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-1 rounded-none mb-3 inline-block">
                相当于每天仅 ¥{(plan.price / 90).toFixed(1)}
              </div>
            )}
            <Button className={`w-full btn-press ${selected === i ? '' : 'bg-zinc-900 text-white hover:bg-muted/80'}`} variant={selected === i ? 'default' : 'outline'}>
              {selected === i ? '已选择' : '选择套餐'}
            </Button>
          </div>
        ))}
      </div>

      {/* 权益对比 */}
      <div className="topo-card p-5 animate-fade-up delay-100">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#b4ff39]" /> 权益对比</h3>
        <div className="hero-reveal space-y-2">
          {VIP_BENEFITS.map((b, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center py-2 border-b last:border-0 text-xs">
              <div className="col-span-4 font-medium">{b.name}</div>
              <div className="col-span-2 text-center text-zinc-500">{b.free}</div>
              <div className="col-span-3 text-center text-[#b4ff39] font-medium">{b.vip}</div>
              <div className="col-span-3 text-center text-amber-400">--</div>
            </div>
          ))}
          <div className="grid grid-cols-12 gap-2 items-center pt-2 text-[10px] font-medium text-zinc-500">
            <div className="col-span-4" />
            <div className="col-span-2 text-center">免费</div>
            <div className="col-span-3 text-center">VIP</div>
            <div className="col-span-3 text-center">协议班</div>
          </div>
        </div>
      </div>

      {/* 协议班 */}
      <div className="topo-card p-5 vip-gradient text-white animate-fade-up delay-150">
        <div className="flex items-start gap-4">
          <Shield className="w-10 h-10 text-amber-300 shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-base flex items-center gap-2">
              协议班 <span className="text-xs px-2 py-0.5 bg-amber-400/100/30 rounded-none">不过退 ¥8000</span>
            </h3>
            <p className="text-sm text-white/80 mt-1">¥9800 · 笔试 + 面试全程陪跑 · 1 对 1 班主任 · 未上岸退 ¥8000</p>
            <div className="flex gap-2 mt-3">
              {['1对1规划', '每日督学', '申论人工批改', '面试模拟无限'].map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-1 bg-white/10 rounded-none">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 上岸案例 */}
      <div className="animate-fade-up delay-200">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /> 真实上岸案例</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {ASHORE_CASES.map((c, i) => (
            <div key={i} className="topo-card p-4 card-hover animate-slide-up" style={{animationDelay: `${i*0.08}s`}}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-xs">{c.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-400">{c.exam}</span>
              </div>
              <p className="text-xs text-zinc-500">{c.post}</p>
              <p className="text-xs text-zinc-400 mt-1 italic">"{c.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* 老带新 */}
      <div className="topo-card p-5 border-[#b4ff39]/20 animate-fade-up delay-250">
        <div className="flex items-center gap-4">
          <Gift className="w-8 h-8 text-[#b4ff39] shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">老带新双向返现</h3>
            <p className="text-xs text-zinc-500 mt-1">邀请好友开通 VIP，双方各得 ¥20 返现 · 上不封顶</p>
          </div>
          <Button className="btn-press ml-auto shrink-0 btn-press" size="sm">立即邀请</Button>
        </div>
      </div>
    </div>
  );
}
