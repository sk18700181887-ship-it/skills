'use client';
import { useState } from 'react';
import Link from 'next/link';
import { INTERVIEW_TYPES, INTERVIEW_QUESTION, USER } from '@/lib/data';
import { PageHeader, PriceTag } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Mic, Video, MessageSquare, Timer, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';

export default function InterviewPage() {
  const [activeType, setActiveType] = useState(0);
  const [recording, setRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const type = INTERVIEW_TYPES[activeType];

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="AI 面试模拟" subtitle="结构化面试 AI 模拟训练，实时点评你的表现" />

      {/* Interview Types */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {INTERVIEW_TYPES.map((t, i) => (
          <Card key={t.name} className={`cursor-pointer transition-all ${activeType === i ? 'border-primary ring-2 ring-primary/20' : ''}`}
            onClick={() => { setActiveType(i); setShowFeedback(false); }}>
            <CardContent className="p-3 text-center">
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{t.structure}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Question */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  {type.name} · 模拟题目
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  3-4 分钟/题
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
                {INTERVIEW_QUESTION.question}
              </div>
              <div className="text-xs text-muted-foreground">
                <Lightbulb className="w-3 h-3 inline mr-1 text-[var(--warn)]" />
                答题结构提示：{type.structure}
              </div>
            </CardContent>
          </Card>

          {/* Recording area */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Mic className="w-4 h-4 text-primary" />
                作答区
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Button
                  variant={recording ? 'destructive' : 'default'}
                  size="lg"
                  className="rounded-full w-16 h-16"
                  onClick={() => {
                    if (recording) {
                      setRecording(false);
                      setShowFeedback(true);
                    } else {
                      setRecording(true);
                    }
                  }}
                >
                  {recording ? <Mic className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </Button>
                <div className="text-sm text-muted-foreground mt-3">
                  {recording ? '正在录音... 点击停止' : '点击开始录音作答'}
                </div>
                {recording && (
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-red-500">REC</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Feedback */}
          {showFeedback && (
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI 实时点评
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {INTERVIEW_QUESTION.aiFeedback.map((fb, i) => (
                  <div key={i} className="rounded-lg border p-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {fb.type === '优点' ? <CheckCircle2 className="w-4 h-4 text-[var(--ok)]" /> : <AlertTriangle className="w-4 h-4 text-[var(--warn)]" />}
                      {fb.type}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{fb.content}</div>
                  </div>
                ))}
                <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                  <Sparkles className="w-3 h-3 text-primary inline mr-1" />
                  <span className="text-xs text-primary font-medium">参考答案要点：</span>
                  <div className="text-xs text-muted-foreground mt-1">{INTERVIEW_QUESTION.referenceAnswer}</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Pricing & Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">面试训练方式</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: 'AI 文字模拟', price: '免费', desc: '文字答题 + AI 点评', current: true },
                { label: 'AI 语音模拟', price: '¥19.9/次', desc: '语音作答 + 实时反馈', current: false },
                { label: 'VIP 无限模拟', price: '季卡 ¥168', desc: '语音+视频不限次数', current: false },
              ].map((opt) => (
                <div key={opt.label} className={`rounded-lg border p-3 ${opt.current ? 'border-primary bg-primary/5' : ''}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{opt.label}</span>
                    <span className="text-sm font-bold text-primary">{opt.price}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium">训练统计</div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="text-center"><div className="text-xl font-bold font-serif text-primary">23</div><div className="text-[10px] text-muted-foreground">已练习</div></div>
                <div className="text-center"><div className="text-xl font-bold font-serif text-primary">4.2</div><div className="text-[10px] text-muted-foreground">平均分</div></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
