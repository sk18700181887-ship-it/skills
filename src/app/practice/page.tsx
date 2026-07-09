'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Timer,
  Users,
  ChevronRight,
  Flame,
  Crown,
  Lock,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  PRACTICE_CATEGORIES,
  DEMO_QUESTIONS,
  FREE_DAILY_LIMIT,
  USED_TODAY,
  USER,
} from '@/lib/data';
import { cn } from '@/lib/utils';

export default function PracticePage() {
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const q = DEMO_QUESTIONS[qIndex % DEMO_QUESTIONS.length];
  const answered = picked !== null;
  const correct = picked === q.answer;
  const remaining = Math.max(0, FREE_DAILY_LIMIT - USED_TODAY);
  const usedRate = Math.min(100, Math.round((USED_TODAY / FREE_DAILY_LIMIT) * 100));

  const onNext = () => {
    setPicked(null);
    setShowAnalysis(false);
    setQIndex((i) => i + 1);
  };

  return (
    <AppShell>
      <PageHeader
        title="智能题库"
        subtitle="AI 推题引擎，专攻你最薄弱的模块"
        action={
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
            <Link href="/mock">
              <Timer className="size-4 mr-1.5" />
              限时模考
            </Link>
          </Button>
        }
      />

      {/* 每日额度 */}
      <Card className="mb-5">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Flame className="size-4 text-primary" />
              <span className="text-sm font-medium">今日免费额度</span>
              <span className="tabular-nums text-sm text-muted-foreground">
                {USED_TODAY} / {FREE_DAILY_LIMIT}
              </span>
            </div>
            {!USER.isVip && (
              <Button asChild size="sm" className="h-8 vip-gradient border-0">
                <Link href="/vip">
                  <Crown className="size-3.5 mr-1 text-amber-200" />
                  <span className="vip-text text-xs font-medium">
                    VIP 解锁无限刷题
                  </span>
                </Link>
              </Button>
            )}
          </div>
          <Progress value={usedRate} className="h-1.5" />
          <p className="mt-2 text-[11px] text-muted-foreground">
            免费用户每日 {FREE_DAILY_LIMIT} 题 · 剩余{' '}
            <span className="text-primary font-medium">{remaining}</span> 题 ·
            开通 VIP 后不限量并解锁 <strong>全部 34,960 道</strong> 精选真题
          </p>
        </CardContent>
      </Card>

      {/* 分类 */}
      <h2 className="font-serif text-base font-semibold mb-3">按模块练习</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {PRACTICE_CATEGORIES.map((c, i) => {
          const isVipOnly = i >= 3;
          return (
            <div
              key={c.id}
              className="relative rounded-xl border bg-card p-4 group hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-sm">{c.name}</span>
                {c.hot && (
                  <Badge
                    variant="outline"
                    className="text-[10px] h-4 px-1 border-primary/30 text-primary"
                  >
                    热
                  </Badge>
                )}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                共 {c.count.toLocaleString()} 题 · 难度 {c.difficulty}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[11px] text-muted-foreground">
                  已练 {Math.floor(c.count * 0.08).toLocaleString()}
                </div>
                {isVipOnly && !USER.isVip ? (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                  >
                    <Link href="/vip">
                      <Lock className="size-3 mr-1" />
                      VIP
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-primary hover:text-primary"
                  >
                    开始
                    <ChevronRight className="size-3 ml-0.5" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 每日一题 (演示做题体验) */}
      <div className="mt-6 flex items-baseline justify-between mb-3">
        <h2 className="font-serif text-base font-semibold">今日推荐 · AI 智推</h2>
        <Badge variant="outline" className="text-[11px]">
          <Sparkles className="size-3 mr-1 text-primary" />
          基于你的薄弱模块
        </Badge>
      </div>

      <Card>
        <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              {q.module}
            </Badge>
            <Badge variant="outline" className="font-normal">
              难度 {q.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Users className="size-3" />
              {Math.round(q.stat.correct * 1000)}人作答
            </span>
            <span className="inline-flex items-center gap-1">
              <Timer className="size-3" />
              平均 {q.stat.avgTime}s
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[15px] leading-7">{q.stem}</p>
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              const isRight = i === q.answer;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (!answered) {
                      setPicked(i);
                      setShowAnalysis(false);
                    }
                  }}
                  disabled={answered}
                  className={cn(
                    'w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all',
                    !answered && 'hover:border-primary hover:bg-primary/5',
                    answered && isRight && 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
                    answered && isPicked && !isRight && 'border-rose-400 bg-rose-50 dark:bg-rose-950/30',
                    answered && !isRight && !isPicked && 'opacity-60'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1">{opt}</span>
                    {answered && isRight && (
                      <CheckCircle2 className="size-4 text-emerald-600" />
                    )}
                    {answered && isPicked && !isRight && (
                      <XCircle className="size-4 text-rose-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="rounded-lg border bg-secondary/50 p-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {correct ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                      <CheckCircle2 className="size-4" />
                      答对了
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600">
                      <XCircle className="size-4" />
                      答错了，已加入错题本
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    正确答案：{q.options[q.answer].split('.')[0]}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => setShowAnalysis((v) => !v)}
                >
                  {showAnalysis ? '收起解析' : '查看解析'}
                </Button>
              </div>
              {showAnalysis && (
                <>
                  <div className="mt-3 text-sm leading-6">{q.analysis}</div>
                  {!USER.isVip && (
                    <div className="mt-3 pt-3 border-t border-dashed flex items-center gap-2 text-[11px] text-muted-foreground">
                      <Lock className="size-3 text-primary" />
                      VIP 独享：视频精讲、同类题变式 8 道 ·{' '}
                      <Link
                        href="/vip"
                        className="text-primary font-medium hover:underline"
                      >
                        开通解锁
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-muted-foreground">
              本题耗时 · 已用 <span className="tabular-nums">28s</span>
            </span>
            {answered ? (
              <Button size="sm" onClick={onNext} className="h-8">
                下一题
                <ChevronRight className="size-3.5 ml-0.5" />
              </Button>
            ) : (
              <span className="text-[11px] text-muted-foreground">
                选择一个选项开始
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 错题本入口 */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">错题本</div>
          <div className="font-serif text-2xl font-semibold tabular-nums mt-1">
            186
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            AI 三遍法 · 还剩 42 道待巩固
          </div>
          <Button asChild size="sm" variant="outline" className="w-full h-7 mt-3 text-xs">
            <Link href="/practice">立即巩固</Link>
          </Button>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">收藏题</div>
          <div className="font-serif text-2xl font-semibold tabular-nums mt-1">
            68
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            难题精选 · 建议二刷频率 7 天
          </div>
          <Button asChild size="sm" variant="outline" className="w-full h-7 mt-3 text-xs">
            <Link href="/practice">查看收藏</Link>
          </Button>
        </Card>
        <Card className="p-4 relative overflow-hidden vip-gradient text-amber-100">
          <div className="text-xs text-amber-100/80">深度学习报告</div>
          <div className="font-serif text-2xl font-semibold tabular-nums mt-1 vip-text">
            周报 v12
          </div>
          <div className="text-[11px] text-amber-100/80 mt-1">
            AI 逐模块分析 · VIP 专享
          </div>
          <Button
            asChild
            size="sm"
            className="w-full h-7 mt-3 text-xs bg-amber-50 text-amber-900 hover:bg-amber-100"
          >
            <Link href="/vip">
              <Crown className="size-3 mr-1" />
              开通 VIP
            </Link>
          </Button>
        </Card>
      </div>
    </AppShell>
  );
}
