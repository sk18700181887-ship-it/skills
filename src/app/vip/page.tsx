'use client';

import { useState } from 'react';
import Link from 'next/link';
import { VIP_PLANS, AGREEMENT_PLAN, RANK_SUCCESS, EXAM_TYPES } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader, VipLock } from '@/components/common';
import { Check, Shield, Star, Users, ArrowRight, Clock, Gift } from 'lucide-react';

export default function VipPage() {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const plan = VIP_PLANS[selectedPlan];

  return (
    <div className="space-y-6">
      <PageHeader title="会员中心" subtitle="AI 智能陪练，稳步上岸" />

      {/* VIP 限时倒计时条 */}
      <div className="vip-gradient rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Gift className="w-5 h-5 vip-text" />
          <div>
            <p className="vip-text font-bold text-sm">限时优惠 · 全场 8 折</p>
            <p className="vip-text/70 text-xs">活动截止至 2026 年国考报名前</p>
          </div>
        </div>
        <Link href="#plans">
          <Button size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
            立即开通 <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </Link>
      </div>

      {/* 套餐选择 */}
      <div id="plans">
        <h3 className="text-base font-bold mb-3">选择套餐</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {VIP_PLANS.map((p, i) => (
            <Card
              key={p.id}
              className={`cursor-pointer transition-all ${
                selectedPlan === i ? 'border-primary ring-2 ring-primary/20' : ''
              } ${p.highlight ? 'relative' : ''}`}
              onClick={() => setSelectedPlan(i)}
            >
              {p.highlight && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <Badge className="vip-gradient vip-text text-[10px] border-0">{p.tag}</Badge>
                </div>
              )}
              <CardHeader className="pb-2 pt-4 text-center">
                <CardTitle className="text-base">{p.name}</CardTitle>
                <CardDescription className="text-xs">{p.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mt-1">
                  <span className="text-3xl font-bold font-serif text-primary">¥{p.price}</span>
                  <span className="text-xs text-muted-foreground">{p.unit}</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 line-through">原价 ¥{p.origin}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 当前套餐权益 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{plan.name} 权益</CardTitle>
            {plan.tag && <Badge className="vip-gradient vip-text text-[10px] border-0">{plan.tag}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {plan.features.map((f: string) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold font-serif text-primary">¥{plan.price}</span>
              <span className="text-xs text-muted-foreground">{plan.unit}</span>
            </div>
            <Button className="brand-gradient text-white border-0">
              立即开通
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 协议班 */}
      <Card className="border-[var(--vip)]/30">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[var(--vip)]" />
            <CardTitle className="text-base">{AGREEMENT_PLAN.name}</CardTitle>
          </div>
          <CardDescription>{AGREEMENT_PLAN.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold font-serif text-primary">¥{AGREEMENT_PLAN.price}</span>
            <span className="text-xs text-muted-foreground">未上岸退 ¥{AGREEMENT_PLAN.refund}</span>
          </div>
          <ul className="space-y-2 mb-4">
            {AGREEMENT_PLAN.features.map((f: string) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Button className="vip-gradient vip-text border-0 w-full">
            签署协议 · 稳过上岸
          </Button>
        </CardContent>
      </Card>

      {/* 上岸案例 */}
      <div>
        <h3 className="text-base font-bold mb-3">他们已经上岸</h3>
        <div className="space-y-3">
          {RANK_SUCCESS.map((c) => (
            <Card key={c.id} className="py-0">
              <CardContent className="py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{c.name}</span>
                      {c.isVip && <Badge variant="secondary" className="text-[10px]">VIP</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{c.unit}</p>
                    <p className="text-xs text-muted-foreground">年薪 {c.salary} · 备考 {c.days} 天</p>
                  </div>
                  <div className="text-right">
                    <div className="stamp text-xs">{c.score} 分</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">&ldquo;{c.quote}&rdquo;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 老带新 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <CardTitle className="text-base">老带新 · 双向返现</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            邀请好友开通 VIP，双方各得 <span className="text-primary font-bold">¥20 现金</span>，上不封顶。
          </p>
          <Button variant="outline" size="sm">
            生成邀请链接
          </Button>
        </CardContent>
      </Card>

      {/* 考试日历 */}
      <div>
        <h3 className="text-base font-bold mb-3">考试日历</h3>
        <div className="space-y-2">
          {EXAM_TYPES.map((e) => (
            <div key={e.id} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
              <div>
                <span className="text-sm font-medium">{e.short}</span>
                <span className="text-xs text-muted-foreground ml-2">{e.period}</span>
              </div>
              <span className="text-xs text-muted-foreground">{e.avgRatio}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
