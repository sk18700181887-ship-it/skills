'use client';

import Link from 'next/link';
import { Crown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PageHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-6', className)}>
      <div className="min-w-0">
        <h1 className="heading-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

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
        'absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl',
        'bg-gradient-to-b from-[#0f0f12]/40 via-[#0f0f12]/85 to-[#0f0f12] backdrop-blur-[1.5px]'
      )}
    >
      <div className="rounded-full vip-gradient p-2">
        <Lock className="size-4 text-amber-300" />
      </div>
      <div
        className={cn(
          'text-center px-4',
          compact ? 'text-xs' : 'text-sm'
        )}
      >
        <div className="font-medium text-zinc-200">{message}</div>
        {!compact && (
          <div className="text-[11px] text-zinc-500 mt-0.5">
            月卡 ¥68 起 · 首月立减 ¥60
          </div>
        )}
      </div>
      <Button
        asChild
        size="sm"
        className={cn(
          'vip-gradient border-0 hover:opacity-90',
          compact ? 'h-7 px-3 text-xs' : 'h-8 px-4'
        )}
      >
        <Link href={href}>
          <Crown className="size-3.5 mr-1 text-amber-200" />
          <span className="vip-text font-medium">{ctaLabel}</span>
        </Link>
      </Button>
    </div>
  );
}

export function PriceTag({
  price,
  origin,
  size = 'sm',
}: {
  price: number;
  origin?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const bigCls =
    size === 'lg'
      ? 'text-[32px]'
      : size === 'md'
        ? 'text-2xl'
        : 'text-lg';
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-sm text-zinc-500">¥</span>
      <span className={cn('font-mono font-semibold tabular-nums text-[#b4ff39]', bigCls)}>
        {price}
      </span>
      {origin != null && origin > price && (
        <span className="text-xs text-zinc-500 line-through">
          ¥{origin}
        </span>
      )}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  className,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={cn('space-y-1', className)}>
      <div className="text-[11px] text-zinc-500 flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div className="stat-value">{value}</div>
      {hint && (
        <div className="text-[11px] text-zinc-600">{hint}</div>
      )}
    </div>
  );
}
