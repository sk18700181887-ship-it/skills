import Link from 'next/link';
import {
  Timer,
  Users,
  Trophy,
  Play,
  Lock,
  Crown,
  Calendar,
  BarChart3,
  ChevronRight,
} from 'lucide-react';
import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader, Stat } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_PAPERS, RECENT_MOCKS, USER } from '@/lib/data';

export const metadata: Metadata = {
  title: '模考中心 · 上岸引擎',
};

export default function MockPage() {
  return (
    <AppShell>
      <PageHeader
        title="模考中心"
        subtitle="全真限时、全国排名、AI 深度报告 · 每周三/周六 20:00 准点开考"
        action={
          <Badge variant="outline" className="hidden sm:inline-flex text-[11px]">
            <Users className="size-3 mr-1" />
            本周共 3.1w 人参考
          </Badge>
        }
      />

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="累计模考" value="18" hint="近 30 天 +7 场" />
        <Stat
          label="最近模考分数"
          value={<span className="text-primary">76.5</span>}
          hint="较上次 +4.2 分"
        />
        <Stat label="全国最佳排名" value="#246" hint="判断推理专项" />
        <Stat label="平均用时" value="118 分" hint="标准时长 120 分" />
      </div>

      {/* 本周模考排期 */}
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-serif text-base font-semibold">本周模考排期</h2>
        <Button asChild variant="ghost" size="sm" className="text-xs">
          <Link href="/mock">
            查看全部
            <ChevronRight className="size-3.5 ml-0.5" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {MOCK_PAPERS.map((mp) => {
          const locked = mp.vipOnly && !USER.isVip;
          return (
            <Card key={mp.id} className="relative overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="font-normal text-[10px] h-5"
                  >
                    {mp.tag}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="font-normal text-[10px] h-5"
                  >
                    {mp.module}
                  </Badge>
                  {mp.highlight && (
                    <Badge className="bg-primary/12 text-primary border-0 text-[10px] h-5 font-normal">
                      🔥 {mp.highlight}
                    </Badge>
                  )}
                  {mp.vipOnly && (
                    <Badge className="vip-gradient border-0 h-5 text-[10px] font-normal">
                      <span className="vip-text">VIP</span>
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium text-sm leading-snug">{mp.name}</h3>

                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {mp.date.slice(5)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="size-3" />
                    {mp.duration} 分钟
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="size-3" />
                    {mp.joined.toLocaleString()} 人
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">
                    难度 · {mp.difficulty}
                  </span>
                  {locked ? (
                    <Button asChild size="sm" className="h-7 text-xs vip-gradient border-0">
                      <Link href="/vip">
                        <Lock className="size-3 mr-1 text-amber-200" />
                        <span className="vip-text">开通解锁</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" className="h-7 text-xs">
                      <Play className="size-3 mr-1" />
                      立即参加
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 我的模考成绩 + 全国排名 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="size-4 text-primary" />
              我的近期模考
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 divide-y">
            {RECENT_MOCKS.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="text-sm font-medium">{m.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {m.date} · 用时 {m.duration}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-lg font-semibold tabular-nums text-primary">
                    {m.score}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    #{m.rank}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Trophy className="size-4 text-primary" />
              上周省考仿真 · 全国排名
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center py-4">
              <div className="text-[11px] text-muted-foreground">你的名次</div>
              <div className="mt-1 font-serif text-4xl font-semibold text-primary tabular-nums">
                #512
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                共 8,642 人参考 · 超过 94.1% 学员
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2 text-center">
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <div className="text-[10px] text-muted-foreground">你</div>
                <div className="font-serif text-lg font-semibold tabular-nums">
                  76.5
                </div>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <div className="text-[10px] text-muted-foreground">全国均分</div>
                <div className="font-serif text-lg font-semibold tabular-nums">
                  62.8
                </div>
              </div>
              <div className="rounded-lg bg-primary/10 p-2.5">
                <div className="text-[10px] text-muted-foreground">
                  上岸线预估
                </div>
                <div className="font-serif text-lg font-semibold text-primary tabular-nums">
                  74.0
                </div>
              </div>
            </div>
            {!USER.isVip && (
              <div className="mt-3 rounded-lg border border-dashed p-2.5 text-[11px] text-muted-foreground flex items-center justify-between">
                <span>
                  <Crown className="size-3 inline mr-1 text-primary" />
                  查看逐题 AI 诊断报告
                </span>
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="h-6 text-[11px] text-primary hover:text-primary"
                >
                  <Link href="/vip">开通 VIP</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
