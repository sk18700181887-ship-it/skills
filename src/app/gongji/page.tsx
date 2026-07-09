'use client';
import { useState } from 'react';
import Link from 'next/link';
import { GONGJI_MODULES, GONGJI_KNOWLEDGE, USER } from '@/lib/data';
import { PageHeader, VipLock } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Brain, CheckCircle2, Circle, ChevronDown, ChevronRight } from 'lucide-react';

export default function GongjiPage() {
  const [expandedMod, setExpandedMod] = useState<string | null>(GONGJI_MODULES[0]?.name ?? null);
  const [selectedKp, setSelectedKp] = useState<string | null>(null);

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="公基 AI 图谱" subtitle="事业单位/三支一扶公共基础知识，AI 知识图谱 + 记忆曲线" />

      {/* Module Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GONGJI_MODULES.map((m) => (
          <Card key={m.name} className={`cursor-pointer transition-all ${expandedMod === m.name ? 'border-primary ring-2 ring-primary/20' : ''}`}
            onClick={() => setExpandedMod(expandedMod === m.name ? null : m.name)}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{m.name}</CardTitle>
                <Badge variant="outline" className="text-[10px]">优先级 {m.priority}</Badge>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{m.aiFeature}</div>
              <div className="mt-2 flex items-center gap-1">
                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${m.coverage}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{m.coverage}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Knowledge Points */}
        <div className="lg:col-span-2 space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                {expandedMod || '选择模块'} · 知识点
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {GONGJI_KNOWLEDGE.filter((k) => !expandedMod || k.module === expandedMod).map((kp) => (
                  <div key={kp.title} className="rounded-lg border overflow-hidden">
                    <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedKp(selectedKp === kp.title ? null : kp.title)}>
                      {selectedKp === kp.title ? <ChevronDown className="w-3.5 h-3.5 text-primary" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                      <Badge variant="outline" className="text-[10px]">{kp.module}</Badge>
                      <span className="text-sm font-medium">{kp.title}</span>
                    </div>
                    {selectedKp === kp.title && (
                      <div className="px-3 pb-3 border-t bg-muted/30">
                        <div className="text-sm text-muted-foreground mt-2">{kp.content}</div>
                        <div className="mt-2 rounded-lg bg-primary/5 border border-primary/10 p-2">
                          <Sparkles className="w-3 h-3 text-primary inline mr-1" />
                          <span className="text-xs text-primary font-medium">AI 记忆提示：</span>
                          <span className="text-xs text-muted-foreground">{kp.aiTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Memory Curve */}
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/3">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />AI 记忆曲线
                <Badge className="text-[9px] bg-primary/15 text-primary">AI</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!USER.isVip ? (
                <>
                  <VipLock message="AI 记忆曲线复习提醒为 VIP 专属" />
                  <Link href="/vip"><Button className="w-full mt-2" size="sm">开通 VIP</Button></Link>
                </>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded bg-white border">
                    <Circle className="w-3 h-3 text-[var(--err)] fill-[var(--err)]" />
                    <span>今日需复习 <strong>12</strong> 个知识点</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-white border">
                    <Circle className="w-3 h-3 text-[var(--warn)] fill-[var(--warn)]" />
                    <span>3 天内到期 <strong>8</strong> 个</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-white border">
                    <CheckCircle2 className="w-3 h-3 text-[var(--ok)]" />
                    <span>已掌握 <strong>45</strong> 个知识点</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium">学习统计</div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="text-center"><div className="text-xl font-bold font-serif text-primary">87</div><div className="text-[10px] text-muted-foreground">已学知识点</div></div>
                <div className="text-center"><div className="text-xl font-bold font-serif text-primary">62%</div><div className="text-[10px] text-muted-foreground">掌握率</div></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
