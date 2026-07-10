'use client';

import Link from 'next/link';
import { Crown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/* PageHeader — topology style: sec-num + 衬线标题 */
export function PageHeader({
  title,
  subtitle,
  action,
  sectionNum,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  sectionNum?: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-10', className)}>
      {sectionNum && <div className="sec-num mb-2">{sectionNum}</div>}
      <h1 className="heading-section">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-sm text-zinc-500 max-w-lg">{subtitle}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* VipLock — topology style: no blur, no rounded, border */
export function VipLock({
  message = '开通 VIP 解锁完整内容',
  ctaLabel = '开通 VIP',
  href = '/vip',
  compact = false,
}: {
  message?: string;
  ctaLabel?: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex flex-col items-center justify-center gap-2',
        'bg-black/90 border border-[rgba(255,255,255,0.06)]'
      )}
    >
      <Lock className="w-4 h-4 text-zinc-600" />
      <div className={cn('text-center px-4', compact ? 'text-xs' : 'text-sm')}>
        <div className="font-medium text-zinc-300">{message}</div>
        {!compact && (
          <div className="text-[11px] text-zinc-600 mt-0.5">月卡 ¥68 起</div>
        )}
      </div>
      <Button
        asChild
        size="sm"
        className="vip-gradient border-0 hover:opacity-90 btn-press"
      >
        <Link href={href}>
          <Crown className="size-3 mr-1 text-amber-200" />
          <span className="vip-text font-medium">{ctaLabel}</span>
        </Link>
      </Button>
    </div>
  );
}

/* PriceTag */
export function PriceTag({
  price,
  origin,
  size = 'sm',
}: {
  price: number;
  origin?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const bigCls = size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-base';
  return (
    <div className="flex items-baseline gap-2">
      <span className={cn(bigCls, 'font-bold text-white font-serif')}>
        ¥{price}
      </span>
      {origin && origin > price && (
        <span className="text-xs text-zinc-600 line-through">¥{origin}</span>
      )}
    </div>
  );
}

/* Stat — topology: mono number + label */
export function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">{label}</div>
      <div className={cn('stat-value', accent && 'text-[#b4ff39]')}>{value}</div>
      {sub && <div className="text-[10px] text-zinc-600 mt-0.5">{sub}</div>}
    </div>
  );
}
