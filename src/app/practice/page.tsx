'use client';
import { useState } from 'react';
import Link from 'next/link';
import { QUESTIONS, USER, FREE_QUOTA } from '@/lib/data';
import { PageHeader, VipLock } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Brain, BookmarkPlus } from 'lucide-react';

export default function PracticePage() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongSet, setWrongSet] = useState<Set<string>>(new Set());
  const q = QUESTIONS[idx];
  const used = Math.min(idx + 1, FREE_QUOTA.daily);
  const isFreeLimit = !USER.isVip && used >= FREE_QUOTA.daily;

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowAnswer(true);
    if (i !== q.answer) setWrongSet((s) => new Set(s).add(q.id));
  };

  const next = () => {
    if (isFreeLimit && !USER.isVip) return;
    setIdx((v) => Math.min(v + 1, QUESTIONS.length - 1));
    setSelected(null);
    setShowAnswer(false);
  };
  const prev = () => {
    setIdx((v) => Math.max(v - 1, 0));
    setSelected(null);
    setShowAnswer(false);
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="智能题库" subtitle="AI 精准推题，每道题都有详细解析和同类题推荐" />

      {/* Quota bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {USER.isVip ? 'VIP 无限刷题' : `今日免费额度 ${used}/${FREE_QUOTA.daily}`}
            </span>
            <div className="flex items-center gap-2">
              {!USER.isVip && (
                <Link href="/vip"><Button size="sm" variant="outline">开通 VIP 无限刷</Button></Link>
              )}
            </div>
          </div>
          {!USER.isVip && (
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(used / FREE_QUOTA.daily) * 100}%` }} />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {isFreeLimit ? (
            <VipLock message="今日免费额度已用完，开通 VIP 继续刷题" />
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">{q.module}</Badge>
                  <span className="text-xs text-muted-foreground">第 {idx + 1}/{QUESTIONS.length} 题</span>
                </div>
                <CardTitle className="text-sm leading-relaxed mt-2">{q.stem}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {q.options.map((opt, i) => {
                  const isCorrect = i === q.answer;
                  const isSelected = selected === i;
                  let cls = 'border hover:border-primary/50 cursor-pointer';
                  if (showAnswer) {
                    if (isCorrect) cls = 'border-[var(--ok)] bg-[var(--ok)]/8';
                    else if (isSelected) cls = 'border-[var(--err)] bg-[var(--err)]/8';
                    else cls = 'border opacity-60 cursor-default';
                  } else if (isSelected) {
                    cls = 'border-primary bg-primary/8';
                  }
                  return (
                    <div key={i} className={`rounded-lg p-3 transition-all text-sm ${cls}`}
                      onClick={() => handleSelect(i)}>
                      <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                      {showAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 text-[var(--ok)] inline ml-2" />}
                      {showAnswer && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-[var(--err)] inline ml-2" />}
                    </div>
                  );
                })}
                {showAnswer && (
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-3 mt-4">
                    <div className="text-xs font-medium text-primary">解析</div>
                    <div className="text-sm text-muted-foreground mt-1">{q.analysis}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={prev} disabled={idx === 0}>
              <ChevronLeft className="w-4 h-4 mr-1" />上一题
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setWrongSet(new Set()); setIdx(0); setSelected(null); setShowAnswer(false); }}>
              重新开始
            </Button>
            <Button variant="outline" size="sm" onClick={next} disabled={idx === QUESTIONS.length - 1 || (isFreeLimit && !USER.isVip)}>
              下一题<ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/3">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />AI 弱项诊断
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1">
              <li>数量关系正确率偏低（40%），建议专项突破</li>
              <li>资料分析已连续 5 题全对，可降低频率</li>
              <li>判断推理图形推理待加强</li>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookmarkPlus className="w-4 h-4 text-[var(--warn)]" />错题本
                <Badge variant="secondary" className="text-[10px]">{wrongSet.size} 题</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {wrongSet.size === 0 ? '暂无错题，继续加油' : `已收录 ${wrongSet.size} 道错题，VIP 可查看错因归因`}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
