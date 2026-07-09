import Link from 'next/link';
import {
  Flame,
  Trophy,
  Clock,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Sparkles,
  Timer,
  PenLine,
  Crown,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';
import type { Metadata } from 'next';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader, Stat } from '@/components/common';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  USER,
  USER_STATS,
  NEXT_EXAM,
  TODAY_TASKS,
  MODULE_SCORES,
  RECENT_MOCKS,
  ANNOUNCEMENTS,
} from '@/lib/data';

export const metadata: Metadata = {
  title: '学习中心 · 上岸引擎',
  description: 'AI 智能公考备考教研平台',
};

export default function DashboardPage() {
  const doneToday = TODAY_TASKS.filter((t) => t.done).length;
  const doneRate = Math.round((doneToday / TODAY_TASKS.length) * 100);

  return (
    <AppShell>
      <PageHeader
        title={`欢迎回来，${USER.nickname}`}
        subtitle="今天是上岸倒排的第 87 天 · 你已连续打卡 24 天，请保持节奏"
        action={
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/match">
              <Sparkles className="size-4 mr-1.5" />
              重跑 AI 岗位匹配
            </Link>
          </Button>
        }
      />

      {/* KPI 卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Stat
          label="距目标考试"
          value={
            <span className="text-primary">
              {NEXT_EXAM.daysLeft}
              <span className="text-sm text-muted-foreground ml-1">天</span>
            </span>
          }
          hint={`${NEXT_EXAM.name} · ${NEXT_EXAM.date}`}
        />
        <Stat
          label="累计做题"
          value={USER.totalQuestions.toLocaleString()}
          hint={
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <TrendingUp className="size-3" />
              昨日 +186
            </span>
          }
        />
        <Stat
          label="平均正确率"
          value={
            <>
              {USER_STATS.accuracy}
              <span className="text-sm text-muted-foreground ml-0.5">%</span>
            </>
          }
          hint="超过全国 78% 学员"
        />
        <Stat
          label="全国排名"
          value={
            <>
              <span className="text-muted-foreground text-lg mr-0.5">#</span>
              {USER_STATS.rank.toLocaleString()}
            </>
          }
          hint={
            <span className="inline-flex items-center gap-1 text-primary">
              <Award className="size-3" />
              山东省第 3,241 名
            </span>
          }
        />
      </div>

      {/* 主体：今日任务 + 侧栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mt-5">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base font-semibold">
                今日 AI 学习计划
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                系统根据你的薄弱模块智能编排 · 完成 {doneToday}/
                {TODAY_TASKS.length}
              </p>
            </div>
            <Badge variant="outline" className="text-[11px]">
              <Zap className="size-3 mr-1 text-primary" />
              完成率 {doneRate}%
            </Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <Progress value={doneRate} className="h-1.5 mb-4" />
            <ul className="divide-y">
              {TODAY_TASKS.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div
                    className={`size-8 shrink-0 rounded-full grid place-items-center ${
                      task.done
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {task.done ? (
                      <CheckCircle2 className="size-4" />
                    ) : (
                      <Clock className="size-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${
                          task.done
                            ? 'text-muted-foreground line-through'
                            : ''
                        }`}
                      >
                        {task.title}
                      </span>
                      {task.vipOnly && (
                        <Badge className="vip-gradient border-0 h-4 px-1.5 text-[9px]">
                          <span className="vip-text">VIP</span>
                        </Badge>
                      )}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {task.time} · 约 {task.minutes} 分钟 · {task.module}
                    </div>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    variant={task.done ? 'ghost' : 'outline'}
                    className="h-7 px-3 text-xs shrink-0"
                  >
                    <Link href={task.vipOnly ? '/vip' : '/practice'}>
                      {task.done ? '回顾' : task.vipOnly ? '解锁' : '开始'}
                      <ChevronRight className="size-3 ml-0.5" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* 快捷入口 */}
        <div className="space-y-4">
          {/* VIP 推广 */}
          <div className="relative overflow-hidden rounded-xl vip-gradient p-5 text-amber-100">
            <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-white/6" />
            <div className="pointer-events-none absolute -left-4 -bottom-4 size-16 rounded-full bg-white/5" />
            <Badge className="bg-white/15 border-0 text-amber-100 text-[10px] mb-2">
              限时 · 首月立减 60
            </Badge>
            <h3 className="font-serif text-xl font-semibold vip-text">
              上岸引擎 VIP
            </h3>
            <p className="text-xs text-amber-100/80 mt-1 leading-relaxed">
              全部题库 · 无限模考 · 申论 AI 无限次批改 · 全国排名
            </p>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-[11px] text-amber-100/80">首月</span>
              <span className="font-serif text-2xl font-semibold vip-text">
                ¥8
              </span>
              <span className="text-[11px] text-amber-100/80 line-through">
                ¥68
              </span>
            </div>
            <Button
              asChild
              className="w-full mt-3 h-8 bg-amber-50 text-amber-900 hover:bg-amber-100"
            >
              <Link href="/vip">
                <Crown className="size-3.5 mr-1" />
                立即开通
              </Link>
            </Button>
          </div>

          {/* 快捷入口 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">快捷入口</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {[
                {
                  href: '/practice',
                  icon: BookOpen,
                  label: '题库',
                  hint: '每日 10 题',
                },
                {
                  href: '/mock',
                  icon: Timer,
                  label: '模考',
                  hint: '本周 3 套',
                },
                {
                  href: '/shenlun',
                  icon: PenLine,
                  label: '申论批改',
                  hint: 'AI ¥9.9',
                },
                {
                  href: '/rank',
                  icon: Trophy,
                  label: '排行榜',
                  hint: '上岸榜',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg border p-2.5 hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className="size-4 text-primary" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      {item.hint}
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 五大模块画像 + 近期模考 + 公告 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mt-5">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-base font-semibold">
                行测五大模块画像
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                数据来自你近 30 天的所有练习和模考
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href="/practice">
                查看详情
                <ChevronRight className="size-3.5 ml-0.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {MODULE_SCORES.map((m) => {
              const gap = m.value - m.target;
              const gapText =
                gap >= 0
                  ? `已达标 +${gap}%`
                  : `距目标 ${Math.abs(gap)}%`;
              const gapColor =
                gap >= 0
                  ? 'text-emerald-600'
                  : gap >= -10
                    ? 'text-amber-600'
                    : 'text-rose-600';
              return (
                <div key={m.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium">{m.name}</span>
                    <div className="flex items-center gap-2 tabular-nums">
                      <span className="text-muted-foreground">
                        目标 {m.target}%
                      </span>
                      <span className={`font-medium ${gapColor}`}>
                        {gapText}
                      </span>
                      <span className="font-serif text-sm font-semibold">
                        {m.value}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full brand-gradient rounded-full"
                      style={{ width: `${m.value}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-px h-3 bg-foreground/50"
                      style={{ left: `${m.target}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">近期模考</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2.5">
            {RECENT_MOCKS.map((mk) => (
              <div
                key={mk.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{mk.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {mk.date} · 用时 {mk.duration}
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="font-serif text-lg font-semibold tabular-nums">
                    {mk.score}
                    <span className="text-[10px] text-muted-foreground">
                      /100
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    #{mk.rank}
                  </div>
                </div>
              </div>
            ))}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full h-8 mt-1"
            >
              <Link href="/mock">
                <Timer className="size-3.5 mr-1" />
                进入模考中心
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 公告 */}
      <Card className="mt-5">
        <CardHeader className="pb-3 flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-semibold">教研公告</CardTitle>
          <Flame className="size-4 text-primary" />
        </CardHeader>
        <CardContent className="pt-0 divide-y">
          {ANNOUNCEMENTS.map((a) => (
            <div
              key={a.id}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center gap-3"
            >
              <Badge
                variant="outline"
                className="text-[10px] shrink-0 font-normal"
              >
                {a.tag}
              </Badge>
              <span className="text-sm flex-1 truncate">{a.title}</span>
              <span className="text-[11px] text-muted-foreground shrink-0">
                {a.date}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
