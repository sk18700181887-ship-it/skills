'use client';
import { useState } from 'react';
import Link from 'next/link';
import { JOB_CATEGORIES, matchCategory, AI_PREDICTION, CITY_TIERS, USER } from '@/lib/data';
import { PageHeader, VipLock, PriceTag } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Crown, MapPin, Users, BarChart3, Lock } from 'lucide-react';

export default function MatchPage() {
  const [major, setMajor] = useState('计算机科学与技术');
  const [province, setProvince] = useState('山东省');
  const matched = matchCategory(major);
  const tiers = CITY_TIERS.find((c) => c.province === province) || CITY_TIERS[0];

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="AI 岗位匹配" subtitle="输入专业和省份，AI 智能推荐最适合你的岗位方向" />

      {/* Input form */}
      <Card>
        <CardContent className="p-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground font-medium">专业方向</label>
              <input value={major} onChange={(e) => setMajor(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="输入你的专业" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium">目标省份</label>
              <select value={province} onChange={(e) => setProvince(e.target.value)}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white">
                {CITY_TIERS.map((c) => <option key={c.province}>{c.province}</option>)}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Matched Category */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                匹配结果：{matched.name}
                <Badge variant="secondary" className="text-[10px]">{matched.posts.length} 个岗位方向</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {matched.posts.map((p) => (
                  <div key={p.name} className="rounded-lg border p-3 flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-[11px] text-muted-foreground">{p.unit} · {p.content}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-[10px]">
                        <Users className="w-3 h-3 mr-1" />{p.ratio}
                      </Badge>
                      <Badge variant={p.competition === '较低' ? 'secondary' : p.competition === '中等' ? 'outline' : 'destructive'} className="text-[10px]">
                        {p.competition}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* City Tiers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {province} 城市梯队
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: '冲刺', cities: tiers.sprint, color: 'var(--err)' },
                  { label: '稳定', cities: tiers.stable, color: 'var(--warn)' },
                  { label: '保底', cities: tiers.safety, color: 'var(--ok)' },
                ].map((tier) => (
                  <div key={tier.label} className="rounded-lg border p-3">
                    <div className="text-xs font-bold mb-2" style={{ color: tier.color }}>{tier.label}</div>
                    <div className="space-y-1">
                      {tier.cities.map((c) => (
                        <div key={c} className="text-sm text-muted-foreground">{c}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Prediction (Paid) */}
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI 竞争预测
                <Badge className="text-[9px] bg-primary/15 text-primary">AI</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!USER.isVip && <VipLock message="开通 VIP 查看 AI 竞争预测与上岸概率" />}
              {USER.isVip && (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-bold font-serif text-primary">{AI_PREDICTION['上岸概率']}</div>
                    <div className="text-xs text-muted-foreground">综合上岸概率</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--ok)] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />优势</div>
                    <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                      {AI_PREDICTION.strengths.map((s, i) => <li key={i}>· {s}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--err)] flex items-center gap-1"><AlertTriangle className="w-3 h-3" />风险</div>
                    <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                      {AI_PREDICTION.risks.map((r, i) => <li key={i}>· {r}</li>)}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-primary flex items-center gap-1"><TrendingUp className="w-3 h-3" />建议</div>
                    <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                      {AI_PREDICTION.suggestions.map((s, i) => <li key={i}>· {s}</li>)}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Deep report CTA */}
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-sm font-medium">深度岗位分析报告</div>
              <div className="text-xs text-muted-foreground mt-1">个性化岗位推荐 + 竞争分析 + 薪资预估</div>
              <div className="mt-2"><PriceTag price={29.9} /></div>
              <Link href="/vip">
                <Button className="mt-3 w-full" size="sm">购买报告</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
