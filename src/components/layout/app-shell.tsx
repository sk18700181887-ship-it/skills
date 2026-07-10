'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { USER, BRAND, NEXT_EXAM, JOURNEY_PHASES } from '@/lib/data';
import {
  Compass, Sparkles, ClipboardCheck, BookOpen, Timer, Mic, ShieldCheck,
  Home, Trophy, Crown, ChevronRight, Bell, Flame, BookHeart, MapPin,
  Menu, X,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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

const MORE_ICON_FIX: Record<string, React.ElementType> = { rank: Trophy, vip: Crown, diary: BookHeart, map: MapPin };

/* 鼠标光晕 */
function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.left = (e.clientX - rect.left) + 'px';
      el.style.top = (e.clientY - rect.top) + 'px';
    };
    parent.addEventListener('mousemove', onMove);
    return () => parent.removeEventListener('mousemove', onMove);
  }, []);
  return <div ref={ref} className="mouse-glow" />;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      {/* Desktop Sidebar — 纯黑 + 极细边框 + 衬线品牌 */}
      <aside className="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-[rgba(255,255,255,0.06)] bg-black overflow-y-auto thin-scroll">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-black border-r border-[rgba(255,255,255,0.06)] overflow-y-auto">
            <SidebarContent pathname={pathname} onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar — 极简 */}
        <header className="h-11 shrink-0 flex items-center border-b border-[rgba(255,255,255,0.06)] px-5 bg-black">
          <button className="lg:hidden p-1 -ml-1 text-zinc-500 hover:text-zinc-300" onClick={() => setMobileOpen(true)}>
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <Flame className="w-3 h-3 text-[#b4ff39]" />
            <span>距{NEXT_EXAM.name} <span className="text-[#b4ff39] font-medium">{NEXT_EXAM.daysLeft}天</span></span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-[11px] text-zinc-600 hidden sm:inline">{USER.nickname}</span>
            {!USER.isVip ? (
              <Link href="/vip" className="text-[10px] font-medium text-zinc-400 hover:text-[#b4ff39] transition-colors border border-[rgba(255,255,255,0.1)] px-2 py-0.5">VIP</Link>
            ) : (
              <span className="vip-text text-[10px] font-bold">VIP</span>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto thin-scroll relative bg-black">
          <MouseGlow />
          <div className="dot-grid absolute inset-0 pointer-events-none" />
          <div className="relative z-10">{children}</div>
        </main>
      </div>
      <AICompanion />
    </div>
  );
}

function SidebarContent({ pathname, onNav }: { pathname: string; onNav?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Brand — 衬线大标题 style */}
      <div className="px-5 pt-6 pb-4">
        <Link href="/" onClick={onNav} className="group">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#b4ff39] flex items-center justify-center">
              <span className="text-black font-bold text-xs font-serif">上</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white tracking-tight group-hover:text-[#b4ff39] transition-colors">{BRAND.name}</div>
              <div className="text-[10px] text-zinc-600 mt-0.5 tracking-wide">{BRAND.slogan}</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="divider mx-4" />

      {/* 7阶段路径条 — 极简横排 */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-0.5">
          {JOURNEY_PHASES.map((phase, i) => {
            const isActive = pathname === phase.href;
            const isCompleted = i < JOURNEY_PHASES.findIndex(p => pathname === p.href);
            return (
              <div key={phase.id} className="flex items-center">
                <Link
                  href={phase.href}
                  onClick={onNav}
                  className={cn(
                    'w-6 h-6 flex items-center justify-center text-[9px] font-medium transition-all border',
                    isActive
                      ? 'bg-[#b4ff39] text-black border-[#b4ff39]'
                      : isCompleted
                        ? 'bg-white/5 text-zinc-400 border-[rgba(255,255,255,0.08)]'
                        : 'bg-transparent text-zinc-600 border-[rgba(255,255,255,0.06)]',
                  )}
                >
                  {isCompleted ? '✓' : i + 1}
                </Link>
                {i < JOURNEY_PHASES.length - 1 && (
                  <div className="w-2 h-px bg-[rgba(255,255,255,0.06)]" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="divider mx-4" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-1 pb-4 thin-scroll">
        {NAV.map((section) => (
          <div key={section.group} className="mt-1">
            <div className="px-5 py-1.5 text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-700">
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
                    'mx-3 flex items-center gap-2 px-3 py-1.5 text-[13px] transition-all duration-150 border-l-2',
                    isActive
                      ? 'border-[#b4ff39] text-white bg-white/[0.03] font-medium'
                      : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]',
                  )}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.aiFeature && (
                    <span className="text-[8px] px-1 py-0.5 bg-[#b4ff39]/8 text-[#b4ff39] font-medium border border-[rgba(180,255,57,0.15)]">AI</span>
                  )}
                  {!item.free && !USER.isVip && (
                    <Crown className="w-3 h-3 text-zinc-600 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom countdown */}
      <div className="mx-3 mb-3 p-3 border border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]">
        <div className="text-[9px] text-zinc-600 uppercase tracking-[0.15em]">距{NEXT_EXAM.name}</div>
        <div className="mt-1.5 font-mono text-2xl font-bold text-[#b4ff39] tabular-nums">{NEXT_EXAM.daysLeft}<span className="text-xs font-normal text-zinc-600 ml-1">天</span></div>
        <div className="mt-2 h-px bg-zinc-900 overflow-hidden">
          <div className="h-full bg-[#b4ff39]/40 transition-all" style={{ width: `${Math.max(8, 100 - NEXT_EXAM.daysLeft / 3)}%` }} />
        </div>
      </div>
    </div>
  );
}
