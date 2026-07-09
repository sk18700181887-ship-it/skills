'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STUDY_PLAN, USER } from '@/lib/data';
import { PageHeader, VipLock } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Calendar, BookOpen, Clock, Target, TrendingUp, ChevronRight } from 'lucide-react';

export default function PlanPage() {
  const [dailyHours, setDailyHours] = useState(6);
  const [phase, setPhase] = useState(0);

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="AI 备考规划" subtitle="根据你的时间和基础，智能生成四阶段备考方案" />

      {/* Time Config */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">每日学习时间</div>
              <div className="text-xs text-muted-foreground">调整后课表将自动更新</div>
            </div>
            <div className="flex items-center gap-3">
              <input type="range" min={3} max={12} step={1} value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-32 accent-primary" />
              <span className="text-sm font-bold text-primary w-8">{dailyHours}h</span>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            {['压缩型 3-5h', '标准型 6-8h', '冲刺型 9-12h'].map((t, i) => (
              <Badge key={t} variant={dailyHours <= 5 && i === 0 ? 'default' : dailyHours >= 6 && dailyHours <= 8 && i === 1 ? 'default' : dailyHours >= 9 && i === 2 ? 'default' : 'outline'} className="text-[10px]">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4-Phase Plan */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STUDY_PLAN.map((sp, i) => (
          <Card key={i} className={`cursor-pointer transition-all ${phase === i ? 'border-primary ring-2 ring-primary/20' : ''}`}
            onClick={() => setPhase(i)}>
            <CardContent className="p-4">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">第{i + 1}阶段</div>
              <div className="text-sm font-bold mt-1">{sp.phase}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />{sp.ratio}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />{sp.duration}
              </div>
              {phase === i && <ChevronRight className="w-4 h-4 text-primary mt-2" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Phase Detail */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {STUDY_PLAN[phase].phase} · 详细任务
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">核心任务</div>
              <div className="space-y-2">
                {STUDY_PLAN[phase].tasks.map((task, i) => (
                  <div key={i} className="rounded-lg border p-3 flex items-start gap-2">
                    <Target className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-xs">{task}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" />AI 建议
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <p className="text-xs text-foreground leading-relaxed">{STUDY_PLAN[phase].ai}</p>
              </div>
              {!USER.isVip && phase >= 2 && (
                <div className="mt-3">
                  <VipLock message="开通 VIP 解锁完整 AI 个性化规划" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Modules Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            五大模块训练目标
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: '资料分析', target: 90 },
              { name: '判断推理', target: 85 },
              { name: '言语理解', target: 80 },
              { name: '数量关系', target: 70 },
              { name: '常识判断', target: 60 },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-3 text-sm">
                <span className="w-20 font-medium shrink-0">{m.name}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full brand-gradient" style={{ width: `${m.target}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-12 text-right">目标 {m.target}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            标准周课表（{dailyHours <= 5 ? '压缩型' : dailyHours <= 8 ? '标准型' : '冲刺型'}）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium text-muted-foreground">星期</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">上午</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">下午</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">晚上</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['周一', '言语理解', '申论·归纳概括', '错题复盘+常识'],
                  ['周二', '判断推理', '数量关系', '行测限时60题'],
                  ['周三', '资料分析', '申论·综合分析', '申论素材+练字'],
                  ['周四', '判断推理', '言语理解', '错题三遍法'],
                  ['周五', '数量关系', '公基·法律/政治', '弱项补充'],
                  ['周六', '行测全真模考', '错题归因分析', '常识+时政'],
                  ['周日', '申论限时模考', '大作文修改', '休整+下周计划'],
                ].map(([day, am, pm, eve]) => (
                  <tr key={day} className="border-b last:border-0">
                    <td className="p-2 font-medium">{day}</td>
                    <td className="p-2">{am}</td>
                    <td className="p-2">{pm}</td>
                    <td className="p-2">{eve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI CTA */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex items-center gap-4">
          <Sparkles className="w-8 h-8 text-primary shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-bold">AI 智能调整规划</div>
            <div className="text-xs text-muted-foreground mt-0.5">根据你的模考成绩和错题分布，AI 实时优化备考策略</div>
          </div>
          {USER.isVip ? (
            <Button size="sm">生成规划</Button>
          ) : (
            <Link href="/vip"><Button size="sm" className="vip-gradient text-white">开通 VIP</Button></Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
