'use client';

import { RANK_LIST, ASHORE_LIST, USER } from '@/lib/data';
import { PageHeader, VipLock } from '@/components/common';
import { Flame, Trophy, Crown, Medal, Star, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function RankPage() {
  const myList = RANK_LIST.find((r) => r.self);

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="排行榜" subtitle="全国备考排行 · 上岸英雄榜" />

      {/* 我的位置 */}
      {myList && (
        <div className="rounded-xl border bg-primary/5 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              {myList.rank}
            </div>
            <div>
              <div className="font-medium">{myList.name}</div>
              <div className="text-xs text-muted-foreground">{myList.school}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>{myList.questions} 题</span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-[var(--err)]" />{myList.streak}天
            </span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 学习榜 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Flame className="w-5 h-5 text-[var(--err)]" />本周学习榜
          </h2>
          <div className="rounded-xl border divide-y">
            {RANK_LIST.map((r) => (
              <div
                key={r.rank}
                className={`flex items-center gap-3 px-4 py-3 text-sm ${r.self ? 'bg-primary/5' : ''}`}
              >
                <div className={`w-6 text-center font-bold font-serif ${r.rank <= 3 ? 'text-[var(--primary)]' : 'text-muted-foreground'}`}>
                  {r.rank <= 3 ? ['🥇','🥈','🥉'][r.rank-1] : r.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.school}</div>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[var(--err)]" />{r.streak}天
                </div>
                <div className="text-sm font-bold font-serif w-16 text-right">{r.questions}题</div>
              </div>
            ))}
          </div>
        </section>

        {/* 上岸榜 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[var(--ok)]" />上岸英雄榜
          </h2>
          {!USER.isVip ? (
            <VipLock message="开通 VIP 查看上岸榜" />
          ) : (
            <div className="rounded-xl border divide-y">
              {ASHORE_LIST.map((a) => (
                <div key={a.id} className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{a.name}</span>
                    {a.isVip && <Badge className="text-[8px] vip-gradient vip-text">VIP</Badge>}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {a.unit} · 笔试 {a.score} 分 · 备考 {a.days} 天
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 italic">&ldquo;{a.quote}&rdquo;</div>
                </div>
              ))}
            </div>
          )}

          {/* VIP 上岸率数据 */}
          <div className="rounded-xl border bg-primary/5 p-4 space-y-2">
            <h3 className="font-bold text-sm flex items-center gap-1">
              <Crown className="w-4 h-4 text-[var(--primary)]" />VIP 学员上岸数据
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl font-bold font-serif text-[var(--primary)]">41%</div>
                <div className="text-[10px] text-muted-foreground">VIP 上岸率</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif text-[var(--ok)]">3.2x</div>
                <div className="text-[10px] text-muted-foreground">对比免费学员</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif">89天</div>
                <div className="text-[10px] text-muted-foreground">平均备考周期</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 老带新 */}
      <div className="rounded-xl border p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm flex items-center gap-1">
            <Star className="w-4 h-4 text-[var(--primary)]" />邀请好友，双方各得 7 天 VIP
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            分享专属链接，好友注册后双方自动获赠 VIP 时长
          </p>
        </div>
        <Link href="/vip" className="shrink-0 text-xs font-bold text-[var(--primary)] hover:underline">
          生成邀请链接 →
        </Link>
      </div>
    </div>
  );
}
