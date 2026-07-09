'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CITY_TIERS, APPLY_WISDOM, AI_PREDICTION, USER } from '@/lib/data';
import { PageHeader, VipLock, PriceTag } from '@/components/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Target, Sparkles, TrendingUp, Users, AlertTriangle, CheckCircle2, Copy, Check } from 'lucide-react';

export default function ApplyPage() {
  const [province, setProvince] = useState('山东省');
  const [copied, setCopied] = useState(false);
  const tiers = CITY_TIERS.find((c) => c.province === province) || CITY_TIERS[0];

  const handleCopy = () => {
    const text = APPLY_WISDOM.map((w) => `${w.type}：${w.desc}\n提示：${w.tip}`).join('\n\n');
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="报名决策" subtitle="AI 帮你分析冲稳保组合，避免全灭翻车" />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 冲稳保组合 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  冲稳保组合推荐 · {province}
                </CardTitle>
                <select value={province} onChange={(e) => setProvince(e.target.value)}
                  className="text-xs rounded border px-2 py-1 bg-white">
                  {CITY_TIERS.map((c) => <option key={c.province}>{c.province}</option>)}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: '冲刺岗位', desc: '1-2个，竞争激烈但上限高', cities: tiers.sprint.slice(0, 2), color: 'var(--err)', bg: 'var(--err)' },
                  { label: '稳定岗位', desc: '2-3个，中等竞争有把握', cities: tiers.stable.slice(0, 3), color: 'var(--warn)', bg: 'var(--warn)' },
                  { label: '保底岗位', desc: '1-2个，低竞争兜底', cities: tiers.safety.slice(0, 2), color: 'var(--ok)', bg: 'var(--ok)' },
                ].map((tier) => (
                  <div key={tier.label} className="rounded-xl border-2 p-4" style={{ borderColor: `${tier.bg}30` }}>
                    <div className="text-sm font-bold" style={{ color: tier.color }}>{tier.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{tier.desc}</div>
                    <div className="mt-3 space-y-1.5">
                      {tier.cities.map((c) => (
                        <div key={c} className="text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: tier.color }} />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 报名须知 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  报名避坑须知
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? '已复制' : '复制'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {APPLY_WISDOM.map((w) => (
                <div key={w.type}>
                  <div className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className={`w-3.5 h-3.5 text-[var(--${w.color})]`} />{w.type}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground pl-5.5">{w.desc}</div>
                  <div className="text-xs text-primary pl-5.5">提示：{w.tip}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: AI Advisor */}
        <div className="space-y-4">
          <Card className="border-primary/30 bg-primary/3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI 报名顾问
                <Badge className="text-[9px] bg-primary/15 text-primary">AI</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!USER.isVip ? (
                <>
                  <VipLock message="AI 报名顾问为 VIP 专属" />
                  <Link href="/vip">
                    <Button className="w-full mt-2" size="sm">开通 VIP</Button>
                  </Link>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="text-center p-3 rounded-lg bg-white">
                    <div className="text-xs text-muted-foreground">当前方案推荐指数</div>
                    <div className="text-2xl font-bold font-serif text-primary">92</div>
                    <div className="text-[10px] text-[var(--ok)]">冲稳保组合合理，上岸概率较高</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div className="font-medium text-foreground">AI 建议</div>
                    <ul className="mt-1 space-y-1">
                      <li>· 建议保底岗位选择限制专业+应届的岗位</li>
                      <li>· 冲刺岗位竞争比超 200:1，需谨慎</li>
                      <li>· 省考报名期后 3 天可查看实时竞争比</li>
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
