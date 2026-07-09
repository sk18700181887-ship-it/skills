'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Lock,
  MapPin,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Crown,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { PageHeader, PriceTag } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { matchCategory, USER } from '@/lib/data';

export default function MatchPage() {
  const [major, setMajor] = useState(USER.major);
  const [province, setProvince] = useState(USER.province);
  const [degree, setDegree] = useState('本科');
  const [role, setRole] = useState('应届');
  const [analyzing, setAnalyzing] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const category = useMemo(() => matchCategory(major || ''), [major]);
  const previewCount = 3;

  const runMatch = () => {
    setAnalyzing(true);
    window.setTimeout(() => {
      setAnalyzing(false);
      setReportOpen(true);
    }, 900);
  };

  return (
    <AppShell>
      <PageHeader
        title="AI 岗位智能匹配"
        subtitle="基于 260 万条历史招录数据，2 分钟找到最适合你的岗位方向"
        action={
          <Badge
            variant="outline"
            className="hidden sm:inline-flex text-[11px]"
          >
            <Sparkles className="size-3 mr-1 text-primary" />
            v3.2 · 匹配精度 92.7%
          </Badge>
        }
      />

      {/* 输入表单 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            填写基础信息
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            越准确的信息，匹配质量越高。所有信息仅用于本次匹配，不做保存。
          </p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs">专业方向</Label>
            <Input
              className="mt-1.5 h-9"
              value={major}
              placeholder="例如：计算机科学与技术、法学、汉语言文学"
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">目标省份</Label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger className="mt-1.5 h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['山东省', '江苏省', '浙江省', '广东省', '全国国考'].map(
                  (p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">最高学历</Label>
            <Select value={degree} onValueChange={setDegree}>
              <SelectTrigger className="mt-1.5 h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['专科', '本科', '硕士', '博士'].map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">身份</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mt-1.5 h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['应届', '往届（2 年内）', '往届（2 年以上）', '在职'].map(
                  (p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <Button
              onClick={runMatch}
              disabled={!major || analyzing}
              className="h-9 w-full sm:w-auto"
            >
              {analyzing ? (
                <>
                  <Loader2 className="size-4 mr-1.5 animate-spin" />
                  AI 正在分析…
                </>
              ) : (
                <>
                  <Sparkles className="size-4 mr-1.5" />
                  开始智能匹配（免费）
                </>
              )}
            </Button>
            <p className="text-[11px] text-muted-foreground">
              已服务 <span className="tabular-nums font-medium">218,462</span>{' '}
              位考生 · 上岸率提升 34%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 匹配结果 */}
      {reportOpen && (
        <>
          <div className="mt-6 flex items-baseline justify-between">
            <h2 className="font-serif text-lg font-semibold">
              匹配结果 · {category.name}
            </h2>
            <span className="text-xs text-muted-foreground">
              命中关键词：
              {category.keys.slice(0, 3).join(' / ') || '兜底通用类'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {category.posts.slice(0, previewCount).map((p, i) => (
              <PostCard key={p.name} post={p} rank={i + 1} />
            ))}
          </div>

          {/* 付费深度报告 */}
          <Card className="mt-4 overflow-hidden">
            <div className="relative bg-gradient-to-br from-primary/10 via-background to-background p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lock className="size-4 text-primary" />
                    <span className="text-xs font-medium text-primary">
                      深度岗位报告（余{' '}
                      {category.posts.length - previewCount} 个方向）
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold">
                    解锁完整《{category.name}·上岸策略报告》
                  </h3>
                  <ul className="mt-2 text-xs text-muted-foreground space-y-1">
                    <li>
                      · 全部{' '}
                      <span className="text-foreground font-medium">
                        {category.posts.length}
                      </span>{' '}
                      个岗位方向 + 近 3 年招录人数 / 分数线
                    </li>
                    <li>
                      · {province} 报考限制 · 学历专业硬门槛 · 政审要求
                    </li>
                    <li>
                      · AI 生成的《冲稳保 3-2-1 报考清单》 + 排期建议
                    </li>
                  </ul>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <PriceTag price={29.9} origin={49} size="md" />
                  <Button className="h-9" size="sm">
                    单次购买
                    <ArrowRight className="size-3.5 ml-1" />
                  </Button>
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-xs vip-text"
                  >
                    <Link href="/vip">
                      <Crown className="size-3 mr-0.5" />
                      VIP 免费查看
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* 冲稳保 */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                tier: '冲刺梯队',
                cities: '济南 / 青岛',
                ratio: '55 : 1',
                tone: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40',
              },
              {
                tier: '稳定梯队',
                cities: '烟台 / 潍坊 / 临沂 / 淄博',
                ratio: '32 : 1',
                tone: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40',
              },
              {
                tier: '保底梯队',
                cities: '德州 / 聊城 / 菏泽 / 枣庄',
                ratio: '18 : 1',
                tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40',
              },
            ].map((t) => (
              <Card key={t.tier} className="p-4">
                <div
                  className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded ${t.tone}`}
                >
                  <MapPin className="size-3" />
                  {t.tier}
                </div>
                <div className="mt-2 text-sm font-medium">{t.cities}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  近 3 年平均竞争比{' '}
                  <span className="font-serif tabular-nums text-foreground">
                    {t.ratio}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* 未跑匹配时的空态引导 */}
      {!reportOpen && !analyzing && (
        <div className="mt-6 rounded-xl border border-dashed p-8 lg:p-10 text-center bg-secondary/30">
          <Sparkles className="size-6 mx-auto text-primary mb-3" />
          <div className="font-medium text-sm">
            填写左侧信息，点击「开始智能匹配」
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            AI 将从 6 大专业分类 · 5 省城市梯队 · 260 万条历史数据中，为你定位
            3 个最优岗位方向
          </div>
        </div>
      )}
    </AppShell>
  );
}

function PostCard({
  post,
  rank,
}: {
  post: {
    name: string;
    unit: string;
    content: string;
    competition: string;
    salary: string;
    ratio: string;
  };
  rank: number;
}) {
  const tone =
    post.competition === '较高'
      ? 'text-rose-600'
      : post.competition === '中等'
        ? 'text-amber-600'
        : 'text-emerald-600';
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="stamp px-1.5 py-0 text-[10px] rounded font-serif">
              TOP {rank}
            </span>
            <ShieldCheck className="size-3" />
            AI 推荐
          </div>
          <h4 className="font-serif text-base font-semibold mt-1.5">
            {post.name}
          </h4>
        </div>
        <span className={`text-xs font-medium ${tone}`}>
          {post.competition}
        </span>
      </div>
      <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Briefcase className="size-3" />
          {post.unit}
        </div>
        <div>{post.content}</div>
      </div>
      <div className="mt-3 pt-3 border-t flex items-center justify-between">
        <div>
          <div className="text-[10px] text-muted-foreground">薪资参考</div>
          <div className="font-serif text-sm font-semibold">{post.salary}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground">近 3 年竞争</div>
          <div className="font-serif text-sm font-semibold tabular-nums flex items-center gap-1">
            <TrendingUp className="size-3 text-muted-foreground" />
            {post.ratio}
          </div>
        </div>
      </div>
    </Card>
  );
}
