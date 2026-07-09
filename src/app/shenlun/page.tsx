'use client'
import { useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/common'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SHENLUN_TOPICS, SHENLUN_RESULT, SHENLUN_SAMPLES } from '@/lib/data'
import { PenLine, Sparkles, Clock, FileText, ChevronDown, ChevronUp, Star, MessageCircle, Lightbulb } from 'lucide-react'

const scoreColor = (s: number) => s >= 80 ? 'text-[oklch(0.72_0.14_145)]' : s >= 60 ? 'text-[oklch(0.75_0.15_85)]' : 'text-[oklch(0.65_0.2_25)]'

export default function ShenlunPage() {
  const [activeTopic, setActiveTopic] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showSample, setShowSample] = useState(-1)

  const topic = SHENLUN_TOPICS[activeTopic]
  const result = SHENLUN_RESULT
  const pct = Math.round((result.score / result.fullScore) * 100)

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader title="申论 AI 批改" subtitle="AI 五维评分 + 逐句点评，快速提升申论写作能力" />

      {/* 题型切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {SHENLUN_TOPICS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setActiveTopic(i); setShowResult(false) }}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${i === activeTopic ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' : 'bg-card border hover:border-primary/30 hover:shadow-sm'}`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 左侧 - 作答区 */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-5 animate-fade-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{topic.name}</span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.freq}</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">{topic.method}</p>

            {!showResult ? (
              <div className="space-y-3">
                <textarea
                  className="w-full h-48 rounded-xl border bg-background p-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="在此作答..."
                />
                <div className="flex gap-3">
                  <Button className="flex-1 gap-2 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all" onClick={() => setShowResult(true)}>
                    <Sparkles className="w-4 h-4" /> AI 智能批改
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <FileText className="w-4 h-4" /> 查看范文
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-up">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Sparkles className="w-4 h-4 animate-pulse" /> AI 批改完成
                </div>
                <textarea
                  className="w-full h-48 rounded-xl border bg-background p-4 text-sm leading-relaxed resize-none focus:outline-none"
                  defaultValue={"近年来，我国城市化进程不断加快，但也带来了交通拥堵、环境污染、住房紧张等一系列城市病..."}
                />
              </div>
            )}
          </Card>

          {/* 批改结果 */}
          {showResult && (
            <Card className="p-5 animate-fade-up">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" /> 批改结果
              </h3>

              {/* 总分 */}
              <div className="flex items-center gap-6 mb-5">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${scoreColor(result.score)}`}>{result.score}</div>
                  <div className="text-xs text-muted-foreground mt-1">/ {result.fullScore} 分</div>
                </div>
                <div className="flex-1">
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.72_0.14_85)] transition-all duration-1000" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0</span><span>超越 {pct - 10}% 考生</span><span>{result.fullScore}</span>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{result.tag}</span>
              </div>

              {/* 亮点与待改进 */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[oklch(0.72_0.14_145)]/8 border border-[oklch(0.72_0.14_145)]/15">
                  <div className="text-xs font-medium text-[oklch(0.72_0.14_145)] mb-2 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> 亮点</div>
                  {result.highlights.map((h, i) => (
                    <div key={i} className="text-xs text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* 右侧 - 写作指南 & 历史样本 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 写作方法论 */}
          <Card className="p-5 animate-fade-up delay-100">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-sm">
              <PenLine className="w-4 h-4 text-primary" /> {topic.name}写作方法
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{topic.method}</p>
            <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> 建议练习频率：{topic.freq}
            </div>
          </Card>

          {/* 历史批改样本 */}
          <Card className="p-5 animate-fade-up delay-200">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4 text-primary" /> 历史批改样本
            </h3>
            <div className="space-y-2">
              {SHENLUN_SAMPLES.map((s, i) => (
                <div key={s.id}>
                  <button
                    onClick={() => setShowSample(showSample === i ? -1 : i)}
                    className="w-full flex items-center justify-between p-3 rounded-lg border hover:border-primary/30 hover:shadow-sm transition-all text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${scoreColor(s.score)}`}>{s.score}</span>
                      <span className="text-xs text-muted-foreground">{s.title}</span>
                    </div>
                    {showSample === i ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  {showSample === i && (
                    <div className="p-3 text-xs text-muted-foreground leading-relaxed border-x border-b rounded-b-lg animate-fade-up">
                      <div className="mb-2 text-[10px] text-primary">{s.tag}</div>
                      {s.highlights.map((h, j) => (
                        <div key={j} className="mb-1">• {h}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* VIP 入口 */}
          <Card className="p-5 vip-gradient text-white animate-fade-up delay-300">
            <h3 className="font-medium mb-2">VIP 无限批改</h3>
            <p className="text-xs text-white/70 mb-3">AI 批改 ¥9.9/次，VIP 每日无限次批改</p>
            <Link href="/vip">
              <Button size="sm" variant="secondary" className="vip-text font-bold">开通 VIP</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
