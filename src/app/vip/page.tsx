'use client';

import { useState } from 'react';
import { Crown, Check, X, Sparkles, Gift, TrendingUp, Shield, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VIP_PLANS, VIP_BENEFITS, EXAM_TYPES, ASHORE_CASES } from '@/lib/data';

export default function VipPage() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Crown className="w-5 h-5 text-primary" /> 会员中心
        </h1>
        <p className="text-sm text-muted-foreground mt-1">开通 VIP，解锁全部 AI 能力</p>
      </div>

      {/* 套餐选择 */}
      <div className="grid md:grid-cols-3 gap-4">
        {VIP_PLANS.map((plan, i) => (
          <Card key={i} onClick={() => setSelected(i)}
            className={`p-5 cursor-pointer transition-all duration-500 animate-scale-in relative overflow-hidden ${
              selected === i ? 'ring-2 ring-primary shadow-lg scale-[1.02]' : 'card-hover'
            }`}
            style={{animationDelay: `${i*0.1}s`}}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-medium">推荐</div>
            )}
            <h3 className="font-bold text-base mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-2xl font-bold text-primary">¥{plan.price}</span>
              <span className="text-xs text-muted-foreground">/{plan.unit}</span>
            </div>
            {plan.highlight && (
              <div className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded-lg mb-3 inline-block">
                相当于每天仅 ¥{(plan.price / 90).toFixed(1)}
              </div>
            )}
            <Button className={`w-full btn-press ${selected === i ? '' : 'bg-muted text-foreground hover:bg-muted/80'}`} variant={selected === i ? 'default' : 'outline'}>
              {selected === i ? '已选择' : '选择套餐'}
            </Button>
          </Card>
        ))}
      </div>

      {/* 权益对比 */}
      <Card className="p-5 animate-fade-up delay-100">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> 权益对比</h3>
        <div className="space-y-2">
          {VIP_BENEFITS.map((b, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center py-2 border-b last:border-0 text-xs">
              <div className="col-span-4 font-medium">{b.name}</div>
              <div className="col-span-2 text-center text-muted-foreground">{b.free}</div>
              <div className="col-span-3 text-center text-primary font-medium">{b.vip}</div>
              <div className="col-span-3 text-center text-amber-700">--</div>
            </div>
          ))}
          <div className="grid grid-cols-12 gap-2 items-center pt-2 text-[10px] font-medium text-muted-foreground">
            <div className="col-span-4" />
            <div className="col-span-2 text-center">免费</div>
            <div className="col-span-3 text-center">VIP</div>
            <div className="col-span-3 text-center">协议班</div>
          </div>
        </div>
      </Card>

      {/* 协议班 */}
      <Card className="p-5 vip-gradient text-white animate-fade-up delay-150">
        <div className="flex items-start gap-4">
          <Shield className="w-10 h-10 text-amber-300 shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-base flex items-center gap-2">
              协议班 <span className="text-xs px-2 py-0.5 bg-amber-500/30 rounded-full">不过退 ¥8000</span>
            </h3>
            <p className="text-sm text-white/80 mt-1">¥9800 · 笔试 + 面试全程陪跑 · 1 对 1 班主任 · 未上岸退 ¥8000</p>
            <div className="flex gap-2 mt-3">
              {['1对1规划', '每日督学', '申论人工批改', '面试模拟无限'].map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-1 bg-white/10 rounded-lg">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 上岸案例 */}
      <div className="animate-fade-up delay-200">
        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /> 真实上岸案例</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {ASHORE_CASES.map((c, i) => (
            <Card key={i} className="p-4 card-hover animate-slide-up" style={{animationDelay: `${i*0.08}s`}}>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-xs">{c.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">{c.exam}</span>
              </div>
              <p className="text-xs text-muted-foreground">{c.post}</p>
              <p className="text-xs text-foreground/70 mt-1 italic">"{c.quote}"</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 老带新 */}
      <Card className="p-5 border-primary/20 animate-fade-up delay-250">
        <div className="flex items-center gap-4">
          <Gift className="w-8 h-8 text-primary shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">老带新双向返现</h3>
            <p className="text-xs text-muted-foreground mt-1">邀请好友开通 VIP，双方各得 ¥20 返现 · 上不封顶</p>
          </div>
          <Button size="sm" className="ml-auto shrink-0 btn-press">立即邀请</Button>
        </div>
      </Card>
    </div>
  );
}
