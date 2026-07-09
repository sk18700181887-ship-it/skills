'use client';
import Link from 'next/link';
import { USER, JOURNEY_PHASES, NEXT_EXAM, TODAY_TASKS, MODULE_SCORES, ANNOUNCEMENTS, COURSES, VIP_PLANS, RANK_SUCCESS, KPI } from '@/lib/data';
import { PageHeader, Stat, PriceTag } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Compass, Sparkles, ClipboardCheck, BookOpen, Timer, Mic, ShieldCheck,
  CheckCircle2, Circle, Crown, ChevronRight, Target, Flame, Zap, TrendingUp, Star,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Compass, Sparkles, ClipboardCheck, BookOpen, Timer, Mic, ShieldCheck,
};

export default function Dashboard() {
  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="学习中心" subtitle={`${USER.nickname}，距${NEXT_EXAM.name}还有 ${NEXT_EXAM.daysLeft} 天`} />

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="距考天数" value={KPI.daysLeft} hint="天" serif />
        <Stat label="累计学习" value={`${Math.round(USER.totalMinutes / 60)}`} hint="小时" />
        <Stat label="正确率" value={`${KPI.correctRate}%`} hint={KPI.correctRate >= 70 ? '优于平均' : '需提升'} />
        <Stat label="全国排名" value={`#${KPI.nationalRank.toLocaleString()}`} hint="本周" />
      </div>

      {/* Journey Progress - 核心卖点：7阶段进度 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            考公全路径进度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {JOURNEY_PHASES.map((phase) => {
              const Icon = ICON_MAP[phase.icon] || Compass;
              const progress = USER.phaseProgress[phase.id as keyof typeof USER.phaseProgress] ?? 0;
              return (
                <Link key={phase.id} href={phase.href}
                  className="group rounded-xl border p-3.5 hover:border-primary/40 hover:bg-primary/3 transition-colors">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium">{phase.label}</span>
                        {phase.aiFeature && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">AI</span>
                        )}
                        {!phase.free && !USER.isVip && <Crown className="w-3 h-3 text-amber-500" />}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{phase.desc}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <Progress value={progress} className="h-1.5 flex-1" />
                        <span className="text-[10px] text-muted-foreground tabular-nums">{progress}%</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today AI Tasks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                今日 AI 智能任务
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {TODAY_TASKS.map((t) => (
                <div key={t.id} className="flex items-start gap-3 rounded-lg border p-3">
                  {t.done ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--ok)] shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={cn('text-sm font-medium', t.done && 'line-through text-muted-foreground')}>{t.title}</span>
                      {t.vipOnly && <Crown className="w-3 h-3 text-amber-500" />}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{t.time} · {t.module} · {t.goal}</div>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">{t.minutes}min</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Module Scores */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                五大模块画像
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MODULE_SCORES.map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="text-sm w-20 shrink-0">{m.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className={cn('h-full rounded-full transition-all',
                        m.value >= m.target ? 'bg-[var(--ok)]' : m.value >= m.target * 0.8 ? 'bg-primary' : 'bg-[var(--warn)]'
                      )} style={{ width: `${m.value}%` }} />
                    </div>
                    <span className={cn('text-sm font-semibold tabular-nums w-10 text-right',
                      m.value >= m.target ? 'text-[var(--ok)]' : 'text-[var(--warn)]'
                    )}>{m.value}%</span>
                    <span className="text-[10px] text-muted-foreground w-10 text-right">目标 {m.target}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Courses */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">推荐课程</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-3">
                {COURSES.map((c) => (
                  <div key={c.id} className="rounded-lg border p-3">
                    <div className="text-sm font-medium truncate">{c.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{c.teacher} · {c.students.toLocaleString()} 人学</div>
                    <div className="mt-2 flex items-center justify-between">
                      <PriceTag price={c.price} />
                      {c.tag && <Badge variant="secondary" className="text-[10px]">{c.tag}</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1/3 */}
        <div className="space-y-6">
          {/* VIP 推广 */}
          <div className="vip-gradient rounded-xl p-4 text-white">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-300" />
              <span className="font-bold text-sm vip-text">VIP 会员</span>
            </div>
            <div className="mt-2 text-sm text-white/80">无限 AI 批改 + 智能推题 + 模考排名</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold vip-text">¥{VIP_PLANS[1].price}</span>
              <span className="text-xs text-white/60 line-through">¥{VIP_PLANS[1].origin}</span>
              <span className="text-xs text-white/50">/3月</span>
            </div>
            <Link href="/vip">
              <Button className="mt-3 w-full bg-amber-400 text-black hover:bg-amber-300 font-bold text-sm h-9">
                立即开通
              </Button>
            </Link>
          </div>

          {/* 上岸案例 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                上岸案例
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {RANK_SUCCESS.slice(0, 3).map((r) => (
                <div key={r.id} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.name}</span>
                    {r.isVip && <span className="vip-gradient px-1.5 py-0.5 rounded text-[9px] vip-text font-bold">VIP</span>}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{r.unit}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 italic">&ldquo;{r.quote}&rdquo;</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 公告 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">最新公告</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ANNOUNCEMENTS.map((n) => (
                <div key={n.id} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="text-[9px] shrink-0 mt-0.5">{n.tag}</Badge>
                  <span className="text-muted-foreground">{n.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Streak */}
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold font-serif">{USER.streakDays} 天</div>
                <div className="text-[11px] text-muted-foreground">连续打卡</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: (string | undefined | false)[]) { return inputs.filter(Boolean).join(' '); }
