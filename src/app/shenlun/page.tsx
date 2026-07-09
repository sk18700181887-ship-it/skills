'use client';

import { useState } from 'react';
import { SHENLUN_TYPES, SHENLUN_SAMPLES, SHENLUN_RESULT, ASHORE_CASES, USER } from '@/lib/data';
import { PageHeader, VipLock, PriceTag } from '@/components/common';
import { PenLine, Sparkles, User, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ShenlunPage() {
  const [selectedType, setSelectedType] = useState(SHENLUN_TYPES[0]?.id || '');
  const [submitted, setSubmitted] = useState(false);
  const [essay, setEssay] = useState('');
  const [isVip] = useState(USER.isVip);
  const currentType = SHENLUN_TYPES.find((t) => t.id === selectedType);

  const handleReview = () => {
    if (!essay.trim()) return;
    setSubmitted(true);
  };

  const result = SHENLUN_RESULT;

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="申论 AI 批改" subtitle="五大维度逐句批改，精准提分" />

      {/* 批改方式选择 */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className={`rounded-xl border p-4 cursor-pointer transition-colors ${!isVip ? 'border-[var(--primary)] bg-primary/5' : 'border hover:border-[var(--primary)]'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <span className="font-bold text-sm">AI 批改</span>
            <PriceTag price={9.9} />
          </div>
          <p className="text-xs text-muted-foreground">五维评分+逐句点评+修改建议</p>
        </div>
        <div className={`rounded-xl border p-4 ${isVip ? 'border-[var(--primary)] bg-primary/5' : 'border opacity-60'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 vip-text" />
            <span className="font-bold text-sm">VIP 无限批改</span>
            <Badge className="text-[8px] vip-gradient vip-text">VIP</Badge>
          </div>
          <p className="text-xs text-muted-foreground">VIP 会员无限次 AI 批改</p>
        </div>
        <div className="rounded-xl border p-4 opacity-80">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-bold text-sm">真人批改</span>
            <PriceTag price={199} />
          </div>
          <p className="text-xs text-muted-foreground">资深讲师 48h 内精批返回</p>
        </div>
      </div>

      {/* 申论题型选择 */}
      <div className="flex gap-2 flex-wrap">
        {SHENLUN_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => { setSelectedType(t.id); setSubmitted(false); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedType === t.id
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-card border hover:border-[var(--primary)]'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* 写作区域 */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="rounded-xl border p-4">
            <h3 className="font-bold text-sm mb-2 flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {currentType?.name || '题目'} · 写作要求
            </h3>
            <p className="text-xs text-muted-foreground">
              {currentType?.method || '请根据给定材料完成作答'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              建议字数：800-1000 字 · 建议用时：{currentType?.freq || '60 分钟'}
            </p>
          </div>

          <textarea
            className="w-full rounded-xl border p-4 text-sm min-h-[300px] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 bg-card"
            placeholder="在此输入申论作答内容..."
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{essay.length} 字</span>
            <Button
              onClick={handleReview}
              disabled={!essay.trim() || submitted}
              className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              {submitted ? '批改完成' : 'AI 批改'}
            </Button>
          </div>
        </div>

        {/* 批改结果 */}
        <div className="space-y-3">
          {submitted ? (
            <>
              <div className="rounded-xl border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm">AI 批改结果</h3>
                  <span className="text-2xl font-bold font-serif text-[var(--primary)]">
                    {result.score}<span className="text-sm text-muted-foreground">/{result.fullScore}</span>
                  </span>
                </div>

                {/* 分数条 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16 shrink-0">内容要点</span>
                    <div className="flex-1 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${(result.score / result.fullScore) * 100}%` }} />
                    </div>
                    <span className="text-xs w-8 text-right font-serif">{Math.round(result.score / result.fullScore * 100 * 0.3)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16 shrink-0">逻辑结构</span>
                    <div className="flex-1 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[var(--ok)]" style={{ width: `${(result.score / result.fullScore) * 90}%` }} />
                    </div>
                    <span className="text-xs w-8 text-right font-serif">{Math.round(result.score / result.fullScore * 100 * 0.25)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16 shrink-0">语言表达</span>
                    <div className="flex-1 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[var(--warn)]" style={{ width: `${(result.score / result.fullScore) * 80}%` }} />
                    </div>
                    <span className="text-xs w-8 text-right font-serif">{Math.round(result.score / result.fullScore * 100 * 0.2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16 shrink-0">格式规范</span>
                    <div className="flex-1 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${(result.score / result.fullScore) * 95}%` }} />
                    </div>
                    <span className="text-xs w-8 text-right font-serif">{Math.round(result.score / result.fullScore * 100 * 0.15)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16 shrink-0">卷面书写</span>
                    <div className="flex-1 h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-[var(--ok)]" style={{ width: `${(result.score / result.fullScore) * 85}%` }} />
                    </div>
                    <span className="text-xs w-8 text-right font-serif">{Math.round(result.score / result.fullScore * 100 * 0.1)}</span>
                  </div>
                </div>
              </div>

              {/* 亮点与待改进 */}
              <div className="rounded-xl border p-4 space-y-2">
                <h4 className="font-bold text-sm text-[var(--ok)]">亮点 & 待改进</h4>
                {result.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex gap-2 text-xs">
                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-[var(--primary)]" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-xl border p-8 text-center text-muted-foreground text-sm">
              <PenLine className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>输入申论作答后，点击「AI 批改」查看结果</p>
            </div>
          )}
        </div>
      </div>

      {/* 历史批改样本 */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm">历史批改样本</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {SHENLUN_SAMPLES.map((s) => (
            <div key={s.id} className="rounded-xl border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm truncate">{s.title}</span>
                <Badge variant="outline" className="text-[10px] shrink-0">{s.tag}</Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{s.date}</span>
                <span>·</span>
                <span className="font-bold font-serif text-[var(--primary)]">{s.score}/{s.fullScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 上岸案例 */}
      <div className="rounded-xl border bg-primary/5 p-4">
        <h3 className="font-bold text-sm mb-3">AI 批改 · 上岸学员说</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {ASHORE_CASES.slice(0, 2).map((c, i) => (
            <div key={i} className="text-sm">
              <div className="font-medium">{c.name} · {c.exam}</div>
              <div className="text-xs text-muted-foreground">{c.post}</div>
              <div className="text-xs mt-1 italic">&ldquo;{c.quote}&rdquo;</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!isVip && (
        <div className="rounded-xl vip-gradient p-4 flex items-center justify-between">
          <div>
            <div className="vip-text font-bold">开通 VIP · 申论无限次 AI 批改</div>
            <div className="text-xs text-white/70 mt-1">月卡 ¥68 起，平均每篇不到 ¥1</div>
          </div>
          <Link href="/vip">
            <Button size="sm" className="bg-white text-black hover:bg-white/90">立即开通</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
