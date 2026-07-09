'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Crown,
  Flame,
  Sparkles,
  Users,
  MapPin,
  Star,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RANK_STUDY, RANK_SUCCESS } from '@/lib/data';
import { cn } from '@/lib/utils';

type Tab = 'study' | 'success';

export default function RankPage() {
  const [tab, setTab] = useState<Tab>('study');

  return (
    <AppShell>
      <PageHeader
        title="排行榜 & 上岸榜"
        subtitle="努力可视化，让每一天的进步都被看见"
        action={
          <Badge variant="outline" className="hidden sm:inline-flex text-[11px]">
            <Users className="size-3 mr-1" />
            本期共 8.4w 人上榜
          </Badge>
        }
      />

      {/* Tabs */}
      <div className="inline-flex items-center rounded-lg border p-0.5 mb-5 text-sm bg-card">
        {(
          [
            { id: 'study', label: '本周学习榜', icon: Flame },
            { id: 'success', label: '上岸榜', icon: Trophy },
          ] as { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[]
        ).map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'flex items-center gap-1.5 h-8 px-3 rounded-md transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="size-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'study' && (
        <>
          {/* 前三名 */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {RANK_STUDY.slice(0, 3).map((r, i) => {
              const tone =
                i === 0
                  ? 'from-amber-100 to-transparent border-amber-200'
                  : i === 1
                    ? 'from-slate-100 to-transparent border-slate-200'
                    : 'from-orange-100 to-transparent border-orange-200';
              return (
                <div
                  key={r.rank}
                  className={cn(
                    'rounded-xl border p-4 bg-gradient-to-b relative',
                    tone
                  )}
                >
                  <div className="absolute top-2 right-2">
                    <span className="font-serif text-3xl font-semibold text-primary/20">
                      #{r.rank}
                    </span>
                  </div>
                  <div className="size-9 rounded-full brand-gradient text-white grid place-items-center font-semibold">
                    {r.name[0]}
                  </div>
                  <div className="mt-2 text-sm font-medium truncate">
                    {r.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {r.school}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <Flame className="size-3 text-primary" />
                    <span className="tabular-nums font-medium">
                      {r.questions.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">题</span>
                  </div>
                </div>
              );
            })}
          </div>

          <Card>
            <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-semibold">
                本周做题量排行 · Top 100
              </CardTitle>
              <Badge variant="outline" className="text-[11px]">
                <Sparkles className="size-3 mr-1 text-primary" />
                更新于 06-23 08:00
              </Badge>
            </CardHeader>
            <CardContent className="pt-0 divide-y">
              {RANK_STUDY.map((r) => (
                <div
                  key={r.rank}
                  className={cn(
                    'flex items-center gap-3 py-2.5',
                    r.self && '-mx-4 px-4 bg-primary/6'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 text-center font-serif font-semibold tabular-nums',
                      r.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {r.rank}
                  </div>
                  <div className="size-8 rounded-full brand-gradient text-white grid place-items-center text-xs font-medium shrink-0">
                    {r.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium truncate">
                        {r.name}
                      </span>
                      {r.self && (
                        <Badge className="bg-primary/12 text-primary border-0 text-[10px] h-4">
                          你
                        </Badge>
                      )}
                      {r.badge === 'VIP' && (
                        <Badge className="vip-gradient border-0 h-4 px-1 text-[9px]">
                          <span className="vip-text">VIP</span>
                        </Badge>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">
                      {r.school} · 连击 {r.streak} 天
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-serif text-sm font-semibold tabular-nums">
                      {r.questions.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      题 / 周
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-5 rounded-xl border border-dashed p-4 flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              你目前 <span className="text-primary font-medium">第 3 名</span>
              ，距离榜首还差{' '}
              <span className="tabular-nums font-medium text-foreground">
                948
              </span>{' '}
              题 · 继续冲刺！
            </div>
            <Button asChild size="sm" className="h-8 shrink-0">
              <Link href="/practice">
                <Flame className="size-3.5 mr-1" />
                去刷题
              </Link>
            </Button>
          </div>
        </>
      )}

      {tab === 'success' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatMini
              label="累计上岸"
              value="4,286"
              hint="截至 2026-06"
              tone="text-primary"
            />
            <StatMini
              label="平均备考时长"
              value="228 天"
              hint="覆盖国考/省考"
            />
            <StatMini
              label="VIP 上岸率"
              value="41%"
              hint="是免费用户 3.2 倍"
              tone="text-emerald-600"
            />
            <StatMini
              label="协议班上岸率"
              value="82%"
              hint="未上岸退 ¥8000"
              tone="text-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RANK_SUCCESS.map((c) => (
              <Card key={c.id} className="p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 stamp text-[10px] px-2 py-0.5 rounded-bl-lg font-serif">
                  已上岸
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-full brand-gradient text-white grid place-items-center font-semibold shrink-0">
                    {c.name[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <MapPin className="size-3" />
                      {c.unit}
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                      <MiniCell label="笔试分数" value={c.score} />
                      <MiniCell label="备考天数" value={c.days} />
                      <MiniCell
                        label="岗位待遇"
                        value={c.salary}
                        primary
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 leading-6 border-l-2 border-primary/40 pl-2.5">
                      「{c.quote}」
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5 sm:p-6 vip-gradient text-amber-100 relative overflow-hidden">
            <div className="pointer-events-none absolute -right-6 -top-6 size-32 rounded-full bg-white/6" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-100/80 mb-2">
                  <Star className="size-3.5" />
                  加入下一批上岸榜
                </div>
                <h3 className="font-serif text-xl font-semibold vip-text">
                  上岸引擎 · 协议班
                </h3>
                <p className="text-xs text-amber-100/80 mt-1 leading-relaxed max-w-lg">
                  1v1 教研规划、专属申论人工批改 20 篇、面试全真模拟 8 次，
                  未上岸退 ¥8000
                </p>
              </div>
              <Button
                asChild
                className="bg-amber-50 text-amber-900 hover:bg-amber-100 h-10 shrink-0"
              >
                <Link href="/vip">
                  <Crown className="size-4 mr-1.5" />
                  <span>了解协议班</span>
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      )}
    </AppShell>
  );
}

function StatMini({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: string;
}) {
  return (
    <Card className="p-3.5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={cn(
          'mt-1 font-serif text-xl font-semibold tabular-nums',
          tone
        )}
      >
        {value}
      </div>
      {hint && (
        <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>
      )}
    </Card>
  );
}

function MiniCell({
  label,
  value,
  primary,
}: {
  label: string;
  value: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <div className="rounded-lg bg-secondary/60 py-1.5 px-2 text-center">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div
        className={cn(
          'font-serif text-sm font-semibold tabular-nums',
          primary && 'text-primary'
        )}
      >
        {value}
      </div>
    </div>
  );
}
