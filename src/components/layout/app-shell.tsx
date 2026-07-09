'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { USER, BRAND, NEXT_EXAM, ANNOUNCEMENTS, JOURNEY_PHASES } from '@/lib/data';
import {
  Compass, Sparkles, ClipboardCheck, BookOpen, Timer, Mic, ShieldCheck,
  Home, Trophy, Crown, ChevronRight, Bell, Flame, BookHeart, MapPin,
} from 'lucide-react';
import { useState } from 'react';
import { AICompanion } from '@/components/ai-companion';

const ICON_MAP: Record<string, React.ElementType> = {
  Compass, Sparkles, ClipboardCheck, BookOpen, Timer, Mic, ShieldCheck,
};

const NAV = [
  { group: '考公全路径', items: JOURNEY_PHASES },
  { group: '更多', items: [
    { id: 'map', label: '全国可视化', icon: 'Home', href: '/map', desc: '省份热力图 + 岗位难度', aiFeature: 'AI 难度预测', free: true },
    { id: 'diary', label: '上岸日记', icon: 'Home', href: '/diary', desc: '心情记录 + AI 陪伴', aiFeature: 'AI 情绪陪伴', free: true },
    { id: 'rank', label: '排行榜', icon: 'Home', href: '/rank', desc: '学习排名 + 上岸榜', aiFeature: '', free: true },
    { id: 'vip', label: '会员中心', icon: 'Home', href: '/vip', desc: 'VIP 套餐 + 协议班', aiFeature: '', free: true },
  ]},
];

// Replace generic 'Home' icons in "更多" section
const MORE_ICON_FIX: Record<string, React.ElementType> = { rank: Trophy, vip: Crown, diary: BookHeart, map: MapPin };

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const daysLeft = NEXT_EXAM.daysLeft;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[228px] shrink-0 border-r bg-card overflow-y-auto">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-card shadow-xl overflow-y-auto">
            <SidebarContent pathname={pathname} onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 shrink-0 flex items-center gap-3 border-b px-4 lg:px-6 bg-card">
          <button className="lg:hidden p-1.5 -ml-1.5 rounded-md hover:bg-muted" onClick={() => setMobileOpen(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bell className="w-3.5 h-3.5" />
            <span className="truncate max-w-[260px] lg:max-w-[480px]">{ANNOUNCEMENTS[0]?.title}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">距{NEXT_EXAM.name} <b className="text-[var(--primary)]">{daysLeft}</b> 天</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <AICompanion />
    </div>
  );
}

function SidebarContent({ pathname, onNav }: { pathname: string; onNav?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 py-4 border-b">
        <div className="flex items-center gap-2.5">
          <span className="stamp text-base">{BRAND.logo}</span>
          <div>
            <div className="font-serif font-bold text-base leading-tight">{BRAND.name}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{BRAND.slogan}</div>
          </div>
        </div>
      </div>

      {/* User card */}
      <div className="mx-3 mt-3 p-3 rounded-xl border bg-[var(--background)]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
            {USER.nickname.slice(-1)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">{USER.nickname}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <Flame className="w-3 h-3 text-orange-500" />
              <span className="text-[11px] text-muted-foreground">连续 {USER.streakDays} 天</span>
            </div>
          </div>
          {!USER.isVip && (
            <Link href="/vip" onClick={onNav} className="vip-gradient px-2 py-0.5 rounded text-[10px] font-bold vip-text">
              开通VIP
            </Link>
          )}
          {USER.isVip && (
            <span className="vip-gradient px-2 py-0.5 rounded text-[10px] font-bold vip-text">VIP</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-2 pb-4">
        {NAV.map((section) => (
          <div key={section.group} className="mt-2">
            <div className="px-5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {section.group}
            </div>
            {section.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = MORE_ICON_FIX[item.id] || ICON_MAP[item.icon] || Compass;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onNav}
                  className={cn(
                    'mx-2 flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                    isActive ? 'bg-primary/8 text-primary font-medium' : 'text-foreground/75 hover:bg-muted',
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.aiFeature && (
                    <span className="shrink-0 text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">AI</span>
                  )}
                  {!item.free && !USER.isVip && (
                    <Crown className="w-3 h-3 text-amber-500 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Countdown */}
      <div className="mx-3 mb-3 p-3 rounded-xl border bg-[var(--background)]">
        <div className="text-[10px] text-muted-foreground">距{NEXT_EXAM.name}</div>
        <div className="mt-1 font-serif text-2xl font-bold text-primary tabular-nums">{NEXT_EXAM.daysLeft} <span className="text-sm font-normal">天</span></div>
        <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.max(8, 100 - NEXT_EXAM.daysLeft / 3)}%` }} />
        </div>
      </div>
    </div>
  );
}
