'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  Check,
  Sparkles,
  Shield,
  ShieldCheck,
  Users,
  MessageCircle,
  Award,
  ArrowRight,
  Timer,
  X,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/common';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VIP_PLANS, AGREEMENT_PLAN, RANK_SUCCESS } from '@/lib/data';
import { cn } from '@/lib/utils';

const BENEFITS_TABLE = [
  { name: '每日免费 10 题', free: true, vip: '无限', pro: '无限' },
  { name: '真题库 3.4w+ 道', free: '预览', vip: '全解锁', pro: '全解锁' },
  { name: '模考 · 全国排名', free: '每周 1 场', vip: '每日不限', pro: '每日不限' },
  { name: '申论 AI 批改', free: '¥9.9/次', vip: '无限次', pro: '无限次' },
  { name: '深度岗位报告', free: '¥29.9/次', vip: '全解锁', pro: '全解锁' },
  { name: '错题智能推题', free: false, vip: true, pro: true },
  { name: '直播课回放', free: '公开课', vip: '全部课程', pro: '全部课程' },
  { name: '教研老师 1v1 规划', free: false, vip: '每季 1 次', pro: '每周 1 次' },
  { name: '面试真人模拟', free: false, vip: false, pro: '不限' },
  { name: '真人申论批改', free: '¥199/篇', vip: '每季 3 篇', pro: '20 篇' },
  { name: '不过退款保障', free: false, vip: false, pro: '¥8000' },
];

export default function VipPage() {
  const [chosen, setChosen] = useState('quarter');

  return (
    <AppShell>
      <PageHeader
        title="上岸引擎 VIP"
        subtitle="每天一杯奶茶钱，把上岸的确定性交给我们"
      />

      {/* 顶部横幅：限时 */}
      <div className="rounded-xl vip-gradient p-5 sm:p-6 mb-6 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-white/6" />
        <div className="pointer-events-none absolute -left-6 -bottom-6 size-28 rounded-full bg-white/5" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
          <div>
            <Badge className="bg-white/15 border-0 text-amber-100 text-[10px] mb-2">
              限时活动 · 距结束 03 天 12:48:26
            </Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold vip-text">
              首月立减 ¥60，先试再买
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-1.5 max-w-xl leading-relaxed">
              前 30 天不满意，7 日内原路退款 · 已服务 218,462 位考生 ·
              历年上岸率提升 34%
            </p>
          </div>
          <div className="flex items-center gap-2 text-amber-100/80">
            <Timer className="size-4" />
            <div className="tabular-nums font-serif">
              <div className="text-xs">距活动结束</div>
              <div className="text-xl font-semibold vip-text">03 : 12 : 48</div>
            </div>
          </div>
        </div>
      </div>

      {/* 三档套餐 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {VIP_PLANS.map((p) => {
          const active = chosen === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setChosen(p.id)}
              className={cn(
                'relative rounded-xl p-5 text-left transition-all',
                p.highlight
                  ? 'vip-gradient text-amber-100 border-transparent'
                  : 'bg-card border',
                active && !p.highlight && 'border-primary shadow-sm',
                active && p.highlight && 'ring-2 ring-amber-200/60'
              )}
            >
              {p.tag && (
                <Badge
                  className={cn(
                    'absolute -top-2 right-4 border-0 text-[10px]',
                    p.highlight
                      ? 'bg-amber-50 text-amber-900'
                      : 'bg-primary text-primary-foreground'
                  )}
                >
                  {p.tag}
                </Badge>
              )}
              <div
                className={cn(
                  'text-sm font-medium',
                  p.highlight ? 'vip-text' : ''
                )}
              >
                {p.name}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span
                  className={cn(
                    'text-xs',
                    p.highlight ? 'text-amber-100/70' : 'text-muted-foreground'
                  )}
                >
                  ¥
                </span>
                <span
                  className={cn(
                    'font-serif text-3xl font-semibold tabular-nums',
                    p.highlight ? 'vip-text' : ''
                  )}
                >
                  {p.price}
                </span>
                <span
                  className={cn(
                    'text-xs',
                    p.highlight ? 'text-amber-100/70' : 'text-muted-foreground'
                  )}
                >
                  {p.unit}
                </span>
              </div>
              {p.origin && (
                <div
                  className={cn(
                    'text-[11px] line-through mt-0.5',
                    p.highlight
                      ? 'text-amber-100/60'
                      : 'text-muted-foreground'
                  )}
                >
                  原价 ¥{p.origin}
                </div>
              )}
              <div
                className={cn(
                  'text-xs mt-1',
                  p.highlight ? 'text-amber-100/80' : 'text-muted-foreground'
                )}
              >
                {p.subtitle}
              </div>
              <ul
                className={cn(
                  'mt-3 space-y-1.5 text-xs',
                  p.highlight ? 'text-amber-100/90' : ''
                )}
              >
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <Check
                      className={cn(
                        'size-3.5 shrink-0 mt-0.5',
                        p.highlight ? 'text-amber-200' : 'text-primary'
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="rounded-xl border bg-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            7 日无理由退款 · 支付宝 / 微信 / 花呗分期免息
          </div>
          <div className="font-serif text-lg font-semibold">
            已选择：
            <span className="text-primary">
              {VIP_PLANS.find((p) => p.id === chosen)?.name}
            </span>
            <span className="mx-1.5">·</span>
            <span className="tabular-nums">
              ¥{VIP_PLANS.find((p) => p.id === chosen)?.price}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button size="lg" className="h-10 flex-1 sm:flex-none">
            <Crown className="size-4 mr-1.5" />
            立即支付
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* 权益对比 */}
      <h2 className="font-serif text-lg font-semibold mb-3">权益对比</h2>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left px-4 py-2.5 font-medium text-xs text-muted-foreground w-[38%]">
                  权益项
                </th>
                <th className="px-3 py-2.5 font-medium text-xs text-muted-foreground text-center">
                  免费
                </th>
                <th className="px-3 py-2.5 font-medium text-xs text-primary text-center">
                  <Crown className="size-3 inline mr-0.5" />
                  VIP
                </th>
                <th className="px-3 py-2.5 font-medium text-xs vip-text text-center">
                  协议班
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {BENEFITS_TABLE.map((row) => (
                <tr key={row.name} className="hover:bg-secondary/30">
                  <td className="px-4 py-2.5 text-xs">{row.name}</td>
                  <BenefitCell v={row.free} />
                  <BenefitCell v={row.vip} highlight="vip" />
                  <BenefitCell v={row.pro} highlight="pro" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 协议班 */}
      <Card className="mt-8 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="md:col-span-2 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="size-4 text-primary" />
              <span className="text-xs font-medium text-primary">
                稳过班型 · 上岸引擎旗舰
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-semibold">
              {AGREEMENT_PLAN.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {AGREEMENT_PLAN.subtitle}（电子协议签订 · 全额托管）
            </p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
              {AGREEMENT_PLAN.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5">
                  <Check className="size-3.5 text-primary shrink-0 mt-1" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-secondary/50 border-t md:border-t-0 md:border-l p-5 sm:p-6 flex flex-col justify-center">
            <div className="text-xs text-muted-foreground">总价</div>
            <div className="font-serif text-4xl font-semibold text-primary tabular-nums mt-1">
              ¥{AGREEMENT_PLAN.price.toLocaleString()}
            </div>
            <div className="text-xs mt-1">
              未上岸退{' '}
              <span className="text-primary font-medium tabular-nums">
                ¥{AGREEMENT_PLAN.refund.toLocaleString()}
              </span>
            </div>
            <Button className="mt-4 h-10">
              预约协议班咨询
              <MessageCircle className="size-4 ml-1.5" />
            </Button>
            <p className="text-[11px] text-muted-foreground mt-2 text-center">
              教研老师电话回访 · 24 小时内联系
            </p>
          </div>
        </div>
      </Card>

      {/* 上岸案例 */}
      <div className="flex items-baseline justify-between mt-8 mb-3">
        <h2 className="font-serif text-lg font-semibold flex items-center gap-2">
          <Award className="size-4 text-primary" />
          真实上岸案例
        </h2>
        <Button asChild variant="ghost" size="sm" className="text-xs">
          <Link href="/rank">
            查看上岸榜
            <ArrowRight className="size-3.5 ml-0.5" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {RANK_SUCCESS.slice(0, 4).map((c) => (
          <Card key={c.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="size-9 rounded-full brand-gradient text-white grid place-items-center font-semibold shrink-0">
                {c.name[0]}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{c.name}</span>
                  <Badge className="bg-emerald-50 text-emerald-700 border-0 text-[10px] dark:bg-emerald-950/60 dark:text-emerald-300">
                    已上岸
                  </Badge>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {c.unit}
                </div>
                <p className="text-xs leading-6 mt-2 text-muted-foreground">
                  「{c.quote}」
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>
                    笔试{' '}
                    <span className="text-foreground tabular-nums font-medium">
                      {c.score}
                    </span>
                  </span>
                  <span>·</span>
                  <span>
                    备考{' '}
                    <span className="text-foreground tabular-nums font-medium">
                      {c.days}
                    </span>{' '}
                    天
                  </span>
                  <span>·</span>
                  <span className="text-primary">{c.salary}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 老带新 */}
      <Card className="mt-6 p-4 sm:p-5 bg-gradient-to-br from-primary/8 to-transparent">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <span className="font-medium text-sm">组队上岸 · 双向返现</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              邀请好友开通 VIP，你得 ¥50 现金 + 30 天延长 · TA 立减 ¥30
            </p>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            生成我的邀请卡
            <Sparkles className="size-3.5 ml-1" />
          </Button>
        </div>
      </Card>
    </AppShell>
  );
}

function BenefitCell({
  v,
  highlight,
}: {
  v: boolean | string;
  highlight?: 'vip' | 'pro';
}) {
  const tone =
    highlight === 'vip'
      ? 'text-primary font-medium'
      : highlight === 'pro'
        ? 'vip-text font-medium'
        : 'text-foreground';
  return (
    <td className="px-3 py-2.5 text-center align-middle text-xs">
      {v === true ? (
        <Check className={cn('size-4 mx-auto', tone)} />
      ) : v === false ? (
        <X className="size-4 mx-auto text-muted-foreground/40" />
      ) : (
        <span className={tone}>{v}</span>
      )}
    </td>
  );
}
