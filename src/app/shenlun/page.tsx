'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PenLine,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Bot,
  UserCheck,
  Crown,
  FileText,
  Award,
  ChevronRight,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader, PriceTag } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { SHENLUN_SAMPLES } from '@/lib/data';
import { cn } from '@/lib/utils';

const DEMO_ESSAY = `绿水青山就是金山银山，是新时代生态文明建设的核心理念。要真正做到"绿水青山"与高质量发展的良性循环，需要从制度设计、产业转型、生态补偿三方面协同发力。

首先，制度设计要"立得住"。近年来，从生态红线到河长制、林长制，一系列制度密网正在织密。以浙江"千万工程"为例，20 年久久为功，走出了一条制度化推动生态治理的新路。

其次，产业转型要"接得上"。绿色发展不是不发展，而是发展方式的深刻变革。江苏太仓、山东威海等地探索"生态+产业"模式，将风景变成场景、场景变成产业。

最后，生态补偿要"补得公"。跨区域协同治理，需要以横向财政转移支付为纽带，让保护者不吃亏、受益者有付出。

生态文明建设是关系中华民族永续发展的根本大计，唯有以"钉钉子"精神抓落实，方能让绿水青山真正变成金山银山。`;

export default function ShenlunPage() {
  const [text, setText] = useState<string>(DEMO_ESSAY);
  const [type, setType] = useState('大作文');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    total: number;
    tier: string;
    dims: { name: string; got: number; full: number; comment: string }[];
    high: string[];
    low: string[];
    suggestion: string;
  }>(null);

  const chars = text.length;

  const runReview = () => {
    setAnalyzing(true);
    window.setTimeout(() => {
      setAnalyzing(false);
      setResult({
        score: 34,
        total: 40,
        tier: '省考 65 分位',
        dims: [
          { name: '论点鲜明度', got: 8, full: 9, comment: '中心论点突出，副标题可再收紧' },
          { name: '结构层次', got: 9, full: 10, comment: '五段三分式扎实，转承清晰' },
          { name: '论据充实度', got: 6, full: 10, comment: '案例集中在东部，建议加西部/基层案例' },
          { name: '语言表达', got: 7, full: 8, comment: '排比句到位，个别句式偏口语' },
          { name: '卷面与字数', got: 4, full: 3, comment: `字数 ${chars} 字，控制得当` },
        ],
        high: [
          '开篇立论直击"两山"论核心，无绕圈',
          '浙江千万工程案例典型且时政新',
          '结尾"钉钉子"精神呼应总书记讲话，升华到位',
        ],
        low: [
          '第三段"江苏太仓 / 山东威海"缺具体数据支撑',
          '"制度密网"等表达偏抽象，建议替换为可感受的名词',
          '过渡词"首先/其次/最后"过于机械，可用"从……到……"',
        ],
        suggestion:
          '按当前水平，山东省考申论预计 65-72 分。若能补齐论据数据 + 强化过渡逻辑，可稳定在 72+ 分区间。',
      });
    }, 1400);
  };

  return (
    <AppShell>
      <PageHeader
        title="申论 AI 批改"
        subtitle="教研老师训练的 GPT 模型 · 4 秒出批改 · 已批改 138 万篇"
        action={
          <Badge className="hidden sm:inline-flex bg-emerald-50 text-emerald-700 border-0 dark:bg-emerald-950 dark:text-emerald-300">
            <Sparkles className="size-3 mr-1" />
            与教师批改相关性 0.91
          </Badge>
        }
      />

      {/* 三种批改档位 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <PlanCard
          icon={<Bot className="size-4" />}
          title="AI 单篇批改"
          price={9.9}
          origin={19.9}
          bullets={['4 秒出结果', '五维打分', '逐段点评']}
          cta="立即购买"
          highlight={false}
        />
        <PlanCard
          icon={<Crown className="size-4 text-amber-200" />}
          title="VIP · AI 无限批改"
          price={168}
          unit="/ 季"
          bullets={['无限篇 AI 批改', '批改历史归档', 'VIP 权益一键全解锁']}
          cta="开通 VIP"
          highlight
          href="/vip"
        />
        <PlanCard
          icon={<UserCheck className="size-4" />}
          title="真人教研老师批改"
          price={199}
          bullets={['985 教研老师', '24 小时内出稿', '含 1 次 15 分钟语音复盘']}
          cta="预约老师"
          highlight={false}
        />
      </div>

      {/* 编辑器 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <PenLine className="size-4 text-primary" />
            粘贴或撰写申论作答
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <Label className="text-xs">题型</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-1.5 h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    '归纳概括',
                    '综合分析',
                    '提出对策',
                    '贯彻执行',
                    '大作文',
                  ].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 flex items-end justify-end gap-2 text-xs text-muted-foreground">
              <span>
                字数 <span className="tabular-nums text-foreground">{chars}</span>
              </span>
              <span>·</span>
              <span>建议 800-1200 字</span>
            </div>
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="text-sm leading-7 font-serif"
            placeholder="将你的作答粘贴到这里，AI 将从论点、结构、论据、语言、卷面五个维度打分并给出改进建议…"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button
              onClick={runReview}
              disabled={chars < 30 || analyzing}
              className="w-full sm:w-auto h-9"
            >
              {analyzing ? (
                <>
                  <Loader2 className="size-4 mr-1.5 animate-spin" />
                  AI 逐句分析中…
                </>
              ) : (
                <>
                  <Sparkles className="size-4 mr-1.5" />
                  开始 AI 批改（¥9.9 / 次）
                </>
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              开通 VIP 后本次批改免费 ·{' '}
              <Link href="/vip" className="text-primary hover:underline">
                查看 VIP 权益
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 批改结果 */}
      {result && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 总分 */}
          <Card className="lg:col-span-1 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none brand-gradient opacity-10" />
            <CardContent className="relative py-8 text-center">
              <div className="text-xs text-muted-foreground">AI 综合评分</div>
              <div className="mt-2 font-serif font-semibold flex items-baseline justify-center gap-1">
                <span className="text-5xl text-primary">{result.score}</span>
                <span className="text-muted-foreground text-lg">
                  / {result.total}
                </span>
              </div>
              <Badge className="mt-3 bg-primary/12 text-primary border-0">
                <Award className="size-3 mr-1" />
                {result.tier}
              </Badge>
              <p className="mt-4 text-xs text-muted-foreground leading-6">
                {result.suggestion}
              </p>
            </CardContent>
          </Card>

          {/* 五维打分 */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                五维打分
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.dims.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{d.name}</span>
                    <span className="tabular-nums">
                      <span className="text-foreground font-medium">
                        {d.got}
                      </span>
                      <span className="text-muted-foreground"> / {d.full}</span>
                    </span>
                  </div>
                  <Progress
                    value={(d.got / d.full) * 100}
                    className="h-1.5"
                  />
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {d.comment}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 亮点 & 待改进 */}
          <Card className="lg:col-span-3">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5">
              <div>
                <div className="flex items-center gap-1.5 mb-3 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="size-4" />
                  写得漂亮的地方
                </div>
                <ul className="space-y-2 text-sm">
                  {result.high.map((t, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-600 shrink-0">✓</span>
                      <span className="leading-6">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-3 text-sm font-semibold text-amber-700">
                  <AlertTriangle className="size-4" />
                  可以再打磨的地方
                </div>
                <ul className="space-y-2 text-sm">
                  {result.low.map((t, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-600 shrink-0">!</span>
                      <span className="leading-6">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 批改样本展示 */}
      <div className="mt-8 flex items-baseline justify-between mb-3">
        <h2 className="font-serif text-base font-semibold">往期批改样本</h2>
        <Button asChild variant="ghost" size="sm" className="text-xs">
          <Link href="/shenlun">
            查看全部
            <ChevronRight className="size-3.5 ml-0.5" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SHENLUN_SAMPLES.map((s) => (
          <Card key={s.id} className="p-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-normal text-[11px]">
                <FileText className="size-3 mr-1" />
                {s.tag}
              </Badge>
              <span className="text-[11px] text-muted-foreground">
                {s.date}
              </span>
            </div>
            <h4 className="mt-2 font-medium text-sm truncate">{s.title}</h4>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-serif text-2xl font-semibold text-primary tabular-nums">
                {s.score}
              </span>
              <span className="text-xs text-muted-foreground">
                / {s.fullScore}
              </span>
            </div>
            <ul className="mt-2.5 space-y-1 text-[11px] text-muted-foreground">
              {s.highlights.map((h, i) => (
                <li key={i} className="flex gap-1.5">
                  <span
                    className={cn(
                      'size-1 rounded-full mt-2 shrink-0',
                      i === 1 ? 'bg-amber-500' : 'bg-emerald-500'
                    )}
                  />
                  {h}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function PlanCard({
  icon,
  title,
  price,
  origin,
  unit,
  bullets,
  cta,
  highlight,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  price: number;
  origin?: number;
  unit?: string;
  bullets: string[];
  cta: string;
  highlight: boolean;
  href?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl p-4 border',
        highlight
          ? 'vip-gradient text-amber-100 border-transparent'
          : 'bg-card'
      )}
    >
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        <span className={highlight ? 'vip-text' : ''}>{title}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <PriceTag price={price} origin={origin} size="md" />
        {unit && (
          <span
            className={cn(
              'text-xs',
              highlight ? 'text-amber-100/70' : 'text-muted-foreground'
            )}
          >
            {unit}
          </span>
        )}
      </div>
      <ul
        className={cn(
          'mt-2.5 space-y-1 text-[11px]',
          highlight ? 'text-amber-100/80' : 'text-muted-foreground'
        )}
      >
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-1.5">
            <span>·</span>
            {b}
          </li>
        ))}
      </ul>
      <Button
        asChild={!!href}
        size="sm"
        className={cn(
          'w-full h-8 mt-3',
          highlight
            ? 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            : ''
        )}
        variant={highlight ? 'default' : 'outline'}
      >
        {href ? <Link href={href}>{cta}</Link> : <span>{cta}</span>}
      </Button>
    </div>
  );
}
