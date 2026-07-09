'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  BookOpenText,
  Timer,
  PenLine,
  Trophy,
  Crown,
  GraduationCap,
  Menu,
  X,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND, USER, NEXT_EXAM } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NAV = [
  { href: '/', label: '学习中心', icon: LayoutDashboard, tag: '' },
  { href: '/match', label: 'AI 岗位匹配', icon: Sparkles, tag: '免费' },
  { href: '/practice', label: '智能题库', icon: BookOpenText, tag: '' },
  { href: '/mock', label: '模考中心', icon: Timer, tag: '排名' },
  { href: '/shenlun', label: '申论 AI 批改', icon: PenLine, tag: '¥9.9' },
  { href: '/rank', label: '排行榜 & 上岸榜', icon: Trophy, tag: '' },
  { href: '/vip', label: '会员 & 协议班', icon: Crown, tag: '限时' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-card border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="stamp size-8 grid place-items-center text-sm">
            {BRAND.logo}
          </div>
          <span className="font-semibold tracking-wide">{BRAND.name}</span>
        </Link>
        <button
          aria-label="切换菜单"
          className="p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      <div className="lg:flex">
        {/* Sidebar */}
        <aside
          className={cn(
            'lg:sticky lg:top-0 lg:h-screen lg:w-[236px] shrink-0 border-r bg-card',
            'lg:block',
            open ? 'block' : 'hidden'
          )}
        >
          <div className="hidden lg:flex items-center gap-2 px-5 h-16 border-b">
            <div className="stamp size-9 grid place-items-center text-sm">
              {BRAND.logo}
            </div>
            <div>
              <div className="font-semibold leading-tight">{BRAND.name}</div>
              <div className="text-[11px] text-muted-foreground leading-tight">
                {BRAND.slogan}
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="mx-3 mt-3 rounded-xl border bg-secondary/60 p-3">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full brand-gradient text-white grid place-items-center font-semibold shrink-0">
                {USER.nickname.slice(0, 1)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">
                  {USER.nickname}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {USER.school} · {USER.major.split('（')[0]}
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              {USER.isVip ? (
                <Badge className="vip-gradient border-0 h-5 px-2 text-[10px]">
                  <span className="vip-text">VIP 会员</span>
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="h-5 px-2 text-[10px] font-normal"
                >
                  免费用户
                </Badge>
              )}
              <Badge
                variant="outline"
                className="h-5 px-2 text-[10px] font-normal border-primary/30 text-primary"
              >
                <Flame className="size-2.5 mr-0.5" /> {USER.streakDays} 天连击
              </Badge>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-3 px-2 pb-4">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                    active
                      ? 'bg-primary/12 text-primary font-medium'
                      : 'text-foreground/78 hover:bg-secondary'
                  )}
                >
                  <Icon
                    className={cn(
                      'size-4 shrink-0',
                      active ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.tag && (
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded font-normal',
                        item.tag === '免费'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : item.tag === '限时'
                            ? 'bg-primary/15 text-primary'
                            : item.tag.startsWith('¥')
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {item.tag}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Bottom · Next Exam */}
          <div className="mx-3 mb-4 rounded-xl border p-3 bg-gradient-to-br from-primary/6 to-transparent">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <GraduationCap className="size-3.5" />
              距离最近考试
            </div>
            <div className="mt-1 font-serif text-2xl font-semibold tabular-nums">
              {NEXT_EXAM.daysLeft}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                天
              </span>
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {NEXT_EXAM.name} · {NEXT_EXAM.date}
            </div>
            {!USER.isVip && (
              <Button
                asChild
                size="sm"
                className="w-full mt-2.5 h-8 vip-gradient hover:opacity-90 border-0"
              >
                <Link href="/vip">
                  <Crown className="size-3.5 mr-1" />
                  <span className="vip-text font-medium">开通 VIP</span>
                </Link>
              </Button>
            )}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-6xl px-4 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
