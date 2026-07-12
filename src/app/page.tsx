'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RECOMMENDED_POSTS, COMPETITION_ANALYSIS, STRATEGY_ADVICE, REPORT_SECTIONS, PROVINCE_DATA, POST_DISTRIBUTION, GUOKAO_SYSTEMS, DIFFICULTY_SCALE } from '@/lib/data';
import type { DiffLevel } from '@/lib/data';
import { Globe, ArrowRight, ChevronDown, Phone, Shield, Zap, Menu, X, Instagram, Twitter } from 'lucide-react';

/* ═══════════════════════════════════════════
   Video Fade System (Asme-style)
   ═══════════════════════════════════════════ */
function useVideoFade(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const fadeRef = useRef<number>(0);
  const fadingOutRef = useRef(false);
  const currentOpacityRef = useRef(0);

  const fadeTo = useCallback((target: number, duration: number) => {
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const start = currentOpacityRef.current;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const opacity = start + (target - start) * progress;
      currentOpacityRef.current = opacity;
      if (videoRef.current) videoRef.current.style.opacity = String(opacity);
      if (progress < 1) fadeRef.current = requestAnimationFrame(animate);
    };
    fadeRef.current = requestAnimationFrame(animate);
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (!video) return;
      if (video.duration - video.currentTime <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };
    const onEnded = () => {
      if (!video) return;
      video.style.opacity = '0';
      currentOpacityRef.current = 0;
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadingOutRef.current = false;
        fadeTo(1, 500);
      }, 100);
    };
    const onPlay = () => { fadingOutRef.current = false; fadeTo(1, 500); };
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('play', onPlay);
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('play', onPlay);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, [videoRef, fadeTo]);
}

/* ═══════════════════════════════════════════
   SVG 环形图
   ═══════════════════════════════════════════ */
function RingChart({ percent, color, label, size, loaded }: { percent: number; color: string; label: string; size: number; loaded: boolean }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={c} strokeDashoffset={loaded ? c - (c * percent) / 100 : c}
          strokeLinecap="square" className="transition-all duration-[1500ms] ease-out" />
      </svg>
      <span className="text-lg font-mono text-white">{percent}<span className="text-xs text-zinc-500">%</span></span>
      <span className="text-[10px] text-zinc-500">{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   动态条形图组件
   ═══════════════════════════════════════════ */
function AnimatedBar({ value, max, color, label, rank, delay, inView }: {
  value: number; max: number; color: string; label: string; rank: number; delay: number; inView: boolean;
}) {
  return (
    <div className="flex items-center gap-3 group">
      <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-mono shrink-0 ${
        rank <= 3 ? 'bg-[#b4ff39]/10 text-[#b4ff39]' : 'bg-white/3 text-zinc-600'
      }`}>{rank}</span>
      <span className="text-xs text-zinc-400 w-12 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-6 bg-white/3 overflow-hidden relative">
        <div className="h-full transition-all duration-1000 ease-out" style={{ width: inView ? `${(value / max) * 100}%` : '0%', backgroundColor: color, transitionDelay: `${delay}ms` }} />
        <div className="absolute inset-0 flex items-center pl-3"><span className="text-[10px] font-mono text-white/80">{value}:1</span></div>
      </div>
    </div>
  );
}

function PostBar({ type, count, ratio, color, delay, inView }: {
  type: string; count: number; ratio: number; color: string; delay: number; inView: boolean;
}) {
  return (
    <div style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: color }} /><span className="text-xs text-zinc-300">{type}</span></div>
        <span className="text-[10px] font-mono text-zinc-500">{ratio}% · {count.toLocaleString()}</span>
      </div>
      <div className="h-5 bg-white/3 overflow-hidden"><div className="h-full transition-all duration-1000 ease-out" style={{ width: inView ? `${ratio * 4}%` : '0%', backgroundColor: color, transitionDelay: `${delay}ms` }} /></div>
    </div>
  );
}

function GuokaoBar({ name, posts, ratio, difficulty, delay, inView }: {
  name: string; posts: number; ratio: number; difficulty: DiffLevel; delay: number; inView: boolean;
}) {
  const maxPosts = Math.max(...GUOKAO_SYSTEMS.map(x => x.posts));
  const height = Math.max(8, (posts / maxPosts) * 100);
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <span className="text-[8px] font-mono text-zinc-500">{(posts / 1000).toFixed(1)}k</span>
      <div className="w-full relative overflow-hidden" style={{ height: '160px' }}>
        <div className="absolute bottom-0 w-full transition-all duration-1000 ease-out" style={{
          height: inView ? `${height}%` : '0%',
          backgroundColor: difficulty === '极难' ? '#dc2626' : difficulty === '难' ? '#f97316' : difficulty === '中高' ? '#eab308' : '#84cc16',
          transitionDelay: `${delay}ms`,
        }} />
      </div>
      <span className="text-[7px] text-zinc-600 truncate w-full text-center leading-tight">{name.slice(0, 2)}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   IntersectionObserver hook
   ═══════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const [inView, setInView] = useState(false);
  const callbackRef = useRef<HTMLElement | null>(null);
  const setRef = useCallback((node: HTMLElement | null) => {
    callbackRef.current = node;
    if (node) {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(node); } },
        { threshold }
      );
      obs.observe(node);
    }
  }, [threshold]);
  return { setRef, inView };
}

/* ═══════════════════════════════════════════
   Tab Panels
   ═══════════════════════════════════════════ */
function ProvinceRankPanel() {
  const { setRef, inView } = useInView();
  const sortedProvinces = [...PROVINCE_DATA].sort((a, b) => b.avgRatio - a.avgRatio);
  const maxRatio = sortedProvinces[0]?.avgRatio ?? 100;
  return (
    <div ref={setRef} className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {DIFFICULTY_SCALE.map(d => (
          <div key={d.level} className="flex items-center gap-1.5"><div className="w-3 h-3" style={{ backgroundColor: d.color }} /><span className="text-[10px] text-zinc-500">{d.level} ({d.range})</span></div>
        ))}
      </div>
      <div className="space-y-2">
        {sortedProvinces.slice(0, 15).map((p, i) => (
          <AnimatedBar key={p.id} value={p.avgRatio} max={maxRatio} color={p.color} label={p.name} rank={i + 1} delay={i * 60} inView={inView} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/5">
        <div className="text-center"><p className="text-2xl font-mono text-[#b4ff39]">28</p><p className="text-[10px] text-zinc-500">覆盖省份</p></div>
        <div className="text-center"><p className="text-2xl font-mono text-white">12.9<span className="text-sm text-zinc-500">万</span></p><p className="text-[10px] text-zinc-500">总岗位数</p></div>
        <div className="text-center"><p className="text-2xl font-mono text-rose-400">68:1</p><p className="text-[10px] text-zinc-500">最高竞争比</p></div>
        <div className="text-center"><p className="text-2xl font-mono text-teal-400">8:1</p><p className="text-[10px] text-zinc-500">最低竞争比</p></div>
      </div>
    </div>
  );
}

function PostsPanel() {
  const { setRef, inView } = useInView();
  return (
    <div ref={setRef} className="space-y-6">
      <div className="space-y-3">
        {POST_DISTRIBUTION.map((p, i) => (
          <PostBar key={p.type} type={p.type} count={p.count} ratio={p.ratio} color={p.color} delay={i * 80} inView={inView} />
        ))}
      </div>
      <div className="liquid-glass p-6 rounded-none">
        <h3 className="text-sm text-zinc-400 font-medium mb-4">岗位占比环形图</h3>
        <div className="flex items-center gap-8 justify-center">
          <div className="relative w-44 h-44">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {POST_DISTRIBUTION.reduce<{ offset: number; elements: React.ReactNode[] }>((acc, p) => {
                const dashArray = `${p.ratio} ${100 - p.ratio}`;
                const el = <circle key={p.type} cx="50" cy="50" r="40" fill="none" stroke={p.color} strokeWidth="18" strokeDasharray={dashArray} strokeDashoffset={-acc.offset} className="transition-all duration-700" />;
                return { offset: acc.offset + p.ratio, elements: [...acc.elements, el] };
              }, { offset: 0, elements: [] }).elements}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-mono text-white">12.9<span className="text-xs text-zinc-500">万</span></span>
              <span className="text-[10px] text-zinc-500">总岗位数</span>
            </div>
          </div>
          <div className="space-y-1.5">
            {POST_DISTRIBUTION.slice(0, 5).map(p => (
              <div key={p.type} className="flex items-center gap-2 text-xs"><div className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: p.color }} /><span className="text-zinc-300">{p.type}</span><span className="text-zinc-500">{p.ratio}%</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GuokaoPanel() {
  const { setRef, inView } = useInView();
  return (
    <div ref={setRef} className="space-y-6">
      <div className="liquid-glass p-6 rounded-none">
        <h3 className="text-sm text-zinc-400 font-medium mb-4">各系统岗位数对比</h3>
        <div className="flex items-end gap-2 h-48">
          {GUOKAO_SYSTEMS.map((s, i) => (
            <GuokaoBar key={s.name} name={s.name} posts={s.posts} ratio={s.ratio} difficulty={s.difficulty} delay={i * 70} inView={inView} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {[...GUOKAO_SYSTEMS].sort((a, b) => b.ratio - a.ratio).map((s, i) => (
          <div key={s.name} className="liquid-glass p-4 rounded-none transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-mono ${i < 3 ? 'bg-[#b4ff39]/10 text-[#b4ff39]' : 'bg-white/3 text-zinc-600'}`}>{i + 1}</span>
                <h4 className="text-sm text-white">{s.name}</h4>
                <span className="text-[10px] text-zinc-500">{s.salary}</span>
              </div>
              <span className="text-xs font-mono text-zinc-400">{s.ratio}:1</span>
            </div>
            <div className="h-2 bg-white/3 overflow-hidden">
              <div className="h-full transition-all duration-1000 ease-out" style={{
                width: inView ? `${(s.ratio / 100) * 100}%` : '0%',
                backgroundColor: s.difficulty === '极难' ? '#dc2626' : s.difficulty === '难' ? '#f97316' : s.difficulty === '中高' ? '#eab308' : '#84cc16',
                transitionDelay: `${i * 70}ms`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Parallax Quote Section (Serene-style)
   ═══════════════════════════════════════════ */
function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    let currentProgress = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const target = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const animate = () => {
        currentProgress = lerp(currentProgress, target, 0.06);
        setProgress(currentProgress);
        if (Math.abs(currentProgress - target) > 0.001) rafId = requestAnimationFrame(animate);
      };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const mainY = progress * -160 + 120;
  const cloudLeftX = progress > 0.12 && progress < 0.92
    ? Math.max(-200, -200 + (progress - 0.12) / 0.8 * 400) : progress >= 0.92 ? 200 : -200;
  const cloudY = progress * -50;
  const cloudRightX = progress > 0.12 && progress < 0.92
    ? Math.min(200, 200 - (progress - 0.12) / 0.8 * 400) : progress >= 0.92 ? -200 : 200;
  const cloudOpacity = Math.max(0, 1 - Math.abs(cloudLeftX) / 200);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden section-gradient-deep">
      <div className="mesh-orb mesh-orb-1" />
      <div className="mesh-orb mesh-orb-2" />
      <div className="mesh-orb mesh-orb-3" />
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Main data band — parallax vertical */}
        <div className="absolute inset-x-0 top-0 z-30 opacity-60"
          style={{ transform: `translate3d(0, ${mainY}px, 0)`, willChange: 'transform' }}>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#b4ff39]/30 to-transparent" />
          <div className="w-full py-8 flex items-center justify-center gap-6">
            {PROVINCE_DATA.slice(0, 8).map((p, i) => (
              <span key={p.id} className="text-[10px] font-mono text-[#b4ff39]/40 whitespace-nowrap"
                style={{ transform: `translate3d(0, ${progress * -30 * (i % 3 + 1)}px, 0)`, transition: 'transform 0.1s linear' }}>
                {p.name} {p.avgRatio}:1
              </span>
            ))}
          </div>
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#b4ff39]/30 to-transparent" />
        </div>
        {/* Left floating shape */}
        <div className="absolute left-0 bottom-[10%] z-10 hidden sm:block"
          style={{ width: '400px', marginLeft: '-50%', opacity: cloudOpacity, transform: `translate3d(${cloudLeftX}px, ${cloudY}px, 0)`, willChange: 'transform', transition: 'opacity 0.3s' }}>
          <div className="liquid-glass p-8 rounded-none">
            <p className="text-3xl font-serif font-light text-white text-glow-white leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>精准<br/>上岸</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-3">AI-POWERED</p>
          </div>
        </div>
        {/* Right floating shape */}
        <div className="absolute right-0 bottom-[15%] z-10 hidden sm:block"
          style={{ width: '400px', marginRight: '-75%', opacity: cloudOpacity, transform: `scale(-1,1) translate3d(${cloudRightX}px, ${cloudY}px, 0)`, willChange: 'transform', transition: 'opacity 0.3s' }}>
          <div className="liquid-glass p-8 rounded-none" style={{ transform: 'scale(-1,1)' }}>
            <div className="space-y-3">
              <div className="flex items-center gap-2"><span className="w-2 h-2 bg-[#b4ff39]" /><span className="text-xs text-zinc-400">综合上岸率 73%</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 bg-amber-400" /><span className="text-xs text-zinc-400">岗位匹配度 85%</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 bg-rose-400" /><span className="text-xs text-zinc-400">竞争压力指数 62%</span></div>
            </div>
          </div>
        </div>
      </div>
      {/* Center quote */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center" style={{ opacity: Math.min(1, progress * 3), transform: `translate3d(0, ${(1 - Math.min(1, progress * 2)) * 30}px, 0)`, willChange: 'transform' }}>
          <p className="text-[11px] font-mono text-[#b4ff39]/60 tracking-[0.3em] mb-6">ANAN ENGINE — AI INTELLIGENT COMPANION</p>
          <p className="quote-text text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5]" style={{ fontFamily: "'Instrument Serif', serif" }}>
            &ldquo;上岸引擎基于一个信念：每个考生都值得拥有<strong className="text-[#b4ff39] text-glow-lime">精准导航</strong>。我们追求清晰的结构、缜密的策略、持久的进步。我们花时间了解你的背景，再决定什么最适合你。没有盲目，没有浪费——只有让你<strong className="text-[#b4ff39] text-glow-lime">稳步上岸</strong>的支撑。&rdquo;
          </p>
          <p className="mt-6 md:mt-8 text-white/60 text-sm tracking-wide">上岸引擎 · AI 智能陪练 · 精准导航</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Mobile Menu Component
   ═══════════════════════════════════════════ */
function MobileMenu({ open, onClose, onLogin, onSignup }: {
  open: boolean; onClose: () => void; onLogin: () => void; onSignup: () => void;
}) {
  const links = [
    { label: '首页', href: '/' },
    { label: '示例报告', href: '#demo-report' },
    { label: '全国可视化', href: '/map' },
    { label: '考公全景', href: '/explore' },
  ];
  return (
    <>
      {/* Overlay */}
      <div className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      {/* Panel */}
      <div className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}>
        <div className="p-6 pt-8">
          <button onClick={onClose} className="ml-auto block text-white/60 hover:text-white transition-colors"><X size={24} /></button>
          <div className="mt-12 space-y-6">
            {links.map((link, i) => (
              <a key={link.label} href={link.href}
                className="block text-white/80 text-lg font-medium hover:text-white transition-all"
                style={{ opacity: open ? 1 : 0, transform: open ? 'translateX(0)' : 'translateX(20px)', transition: `opacity 0.4s ${0.15 + i * 0.075}s, transform 0.4s ${0.15 + i * 0.075}s` }}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-12 space-y-3" style={{ opacity: open ? 1 : 0, transform: open ? 'translateX(0)' : 'translateX(20px)', transition: `opacity 0.4s 0.45s, transform 0.4s 0.45s` }}>
            <button onClick={onSignup} className="w-full bg-[#b4ff39] text-black py-3 rounded-full font-medium text-sm tracking-wide hover:bg-[#c5ff6b] transition-colors">注册生成报告</button>
            <button onClick={onLogin} className="w-full liquid-glass rounded-full py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">登录</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   主页面
   ═══════════════════════════════════════════ */
export default function LandingPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoFade(videoRef);

  const [phase, setPhase] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mapTab, setMapTab] = useState<'rank' | 'posts' | 'guokao'>('rank');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (phase >= 4) { const t = setTimeout(() => setLoaded(true), 500); return () => clearTimeout(t); }
  }, [phase]);

  const handleCTA = () => router.push('/login');
  const handleSignup = () => router.push('/login');

  return (
    <div className="min-h-screen bg-black overflow-hidden">

      {/* ═══════ SECTION 1: Hero — Full-screen Video + Liquid Glass ═══════ */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        {/* Background Video with fade system */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
          style={{ opacity: 0 }}
          autoPlay
          muted
          loop
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Grid pattern overlay */}
        <div className={`fixed inset-0 z-[1] transition-opacity duration-[2000ms] ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Scan line */}
        <div className={`fixed top-0 left-0 w-full h-[2px] z-[2] transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#b4ff39]/40 to-transparent animate-[scanLine_2s_ease-in-out_infinite]" />
        </div>

        {/* Mesh orbs */}
        <div className="absolute inset-0 z-[0] pointer-events-none">
          <div className="mesh-orb mesh-orb-1" />
          <div className="mesh-orb mesh-orb-2" />
          <div className="mesh-orb mesh-orb-3" />
        </div>

        {/* ── Fixed Navbar (liquid-glass) ── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="px-6 md:px-12 py-5">
            <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
              {/* Left: Logo */}
              <div className="flex items-center gap-2">
                <Globe size={20} className="text-[#b4ff39]" />
                <span className="text-white font-semibold text-lg" style={{ fontFamily: "'Instrument Serif', serif" }}>上岸引擎</span>
                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-8 ml-8">
                  <a href="#demo-report" className="text-white/80 hover:text-white transition-colors text-sm font-medium">示例报告</a>
                  <a href="/map" className="text-white/80 hover:text-white transition-colors text-sm font-medium">全国可视化</a>
                  <a href="/explore" className="text-white/80 hover:text-white transition-colors text-sm font-medium">考公全景</a>
                </div>
              </div>
              {/* Right: Auth buttons */}
              <div className="flex items-center gap-4">
                <button onClick={handleSignup} className="hidden md:block text-white/80 hover:text-white transition-colors text-sm font-medium">注册</button>
                <button onClick={() => router.push('/login')} className="hidden md:block liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors">登录</button>
                {/* Mobile hamburger */}
                <button onClick={() => setMenuOpen(true)} className="md:hidden text-white p-1" aria-label="菜单">
                  <div className="w-5 flex flex-col gap-[5px]">
                    <span className={`block h-[1.5px] bg-white transition-all duration-300`} style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }} />
                    <span className="block h-[1.5px] bg-white transition-all duration-300" />
                    <span className="block h-[1.5px] bg-white transition-all duration-300" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* ── Center content ── */}
        <div className="relative z-[3] flex-1 flex flex-col items-center justify-center px-6 py-12 text-center" style={{ transform: 'translateY(-20%)' }}>
          {/* Top label */}
          <div className={`mb-6 transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[11px] font-mono text-zinc-500 tracking-[0.3em]">AI-POWERED CIVIL SERVICE EXAM PLATFORM</span>
          </div>

          {/* Main heading — Instrument Serif */}
          <h1 className={`mb-8 transition-all duration-[1500ms] ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            <span className="block text-5xl md:text-6xl lg:text-7xl text-white tracking-tight text-glow-white leading-[0.9]">
              拓扑降维
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9] mt-2">
              <span className="text-[#b4ff39] text-glow-lime">精准</span>
              <span className="text-white text-glow-white">上岸</span>
            </span>
          </h1>

          {/* Phone input bar (liquid-glass pill) */}
          <div className={`max-w-xl w-full space-y-4 transition-all duration-1000 delay-200 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="输入手机号，生成专属报告"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-base outline-none"
              />
              <button onClick={handleSignup}
                className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-all shrink-0 button-glow-white">
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-white/70 text-sm leading-relaxed px-4">
              将复杂的公考信息降维到极致清晰的结构中，从了解考公到面试上岸，7 阶段 AI 智能导航
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => document.getElementById('demo-report')?.scrollIntoView({ behavior: 'smooth' })}
                className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                查看示例报告 ↓
              </button>
            </div>
          </div>
        </div>

        {/* ── Social icons footer ── */}
        <div className={`relative z-10 flex justify-center gap-4 pb-12 transition-all duration-1000 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: <Phone size={20} />, label: '手机号登录' },
            { icon: <Shield size={20} />, label: '数据安全' },
            { icon: <Globe size={20} />, label: '全国数据' },
          ].map(item => (
            <button key={item.label} aria-label={item.label}
              className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
              {item.icon}
            </button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-[3] scroll-indicator transition-opacity duration-1000 ${phase >= 4 ? 'opacity-60' : 'opacity-0'}`}>
          <ChevronDown size={20} className="text-white/40" />
        </div>
      </section>

      {/* ═══════ SECTION 2: Parallax Quote ═══════ */}
      <ParallaxSection />

      {/* ═══════ SECTION 3: 示例报告 ═══════ */}
      <section id="demo-report" className="relative z-10 bg-black">
        {/* Sticky report header */}
        <div className={`sticky top-0 z-20 border-b border-white/6 px-6 py-4 flex items-center justify-between transition-colors duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black'}`}>
          <div className="flex items-center gap-3">
            <Globe size={16} className="text-[#b4ff39]" />
            <span className="text-[#b4ff39] text-lg" style={{ fontFamily: "'Instrument Serif', serif" }}>上岸引擎</span>
            <span className="text-zinc-600 text-xs font-mono">DEMO REPORT</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/login')} className="liquid-glass rounded-full px-5 py-2 text-white text-xs font-medium hover:bg-white/5 transition-colors">登录</button>
            <button onClick={handleCTA} className="bg-[#b4ff39] text-black rounded-full px-5 py-2 text-xs font-medium hover:bg-[#c5ff6b] transition-colors button-glow">注册生成报告</button>
          </div>
        </div>

        <div className="relative">
          {/* 左侧固定引导栏 */}
          <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-30 w-[220px]">
            <div className="liquid-glass p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#b4ff39] animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500">AI 实时分析</span>
              </div>
              <h3 className="text-sm text-white leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                填写信息<br />生成<span className="text-[#b4ff39] text-glow-lime">专属</span>报告
              </h3>
              <p className="text-[10px] text-zinc-600 leading-relaxed">
                这是示例报告<br />你的报告需要填写个人信息后由 AI 生成
              </p>
              <button onClick={handleCTA} className="bg-[#b4ff39] text-black rounded-full w-full py-2.5 text-xs font-medium hover:bg-[#c5ff6b] transition-colors button-glow justify-center">
                填写信息 →
              </button>
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <div className="flex items-center gap-1.5"><Phone size={10} className="text-[#b4ff39]" /><span className="text-[9px] text-zinc-500">手机号注册</span></div>
                <div className="flex items-center gap-1.5"><Shield size={10} className="text-[#b4ff39]" /><span className="text-[9px] text-zinc-500">数据安全保障</span></div>
                <div className="flex items-center gap-1.5"><Zap size={10} className="text-[#b4ff39]" /><span className="text-[9px] text-zinc-500">1 分钟快速生成</span></div>
              </div>
            </div>
          </div>

          {/* 报告 Hero */}
          <div className="px-6 lg:pl-[260px] py-16 md:py-24 max-w-4xl lg:max-w-5xl mx-auto">
            <p className="text-xs font-mono text-zinc-600 mb-4">01.</p>
            <h1 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6 text-glow-lime" style={{ fontFamily: "'Instrument Serif', serif" }}>
              示例·<span className="text-[#b4ff39]">AI 报考报告</span>
            </h1>
            <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
              以下是一位「财政学·本科·中共党员·山东」考生的真实报告示例。<br />填写你的信息后，AI 将为你生成专属报告。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="topo-chip text-[10px]">财政学类</span>
              <span className="topo-chip text-[10px]">本科</span>
              <span className="topo-chip topo-chip-lime text-[10px]">中共党员</span>
              <span className="topo-chip text-[10px]">山东省</span>
              <span className="topo-chip text-[10px]" style={{ borderColor: 'rgba(251,191,36,0.2)', color: '#fbbf24' }}>国考</span>
            </div>
            <div className="flex gap-12 mt-12">
              <RingChart percent={73} color="#b4ff39" label="综合上岸率" size={90} loaded={loaded} />
              <RingChart percent={85} color="#b4ff39" label="岗位匹配度" size={90} loaded={loaded} />
              <RingChart percent={62} color="#fbbf24" label="竞争压力指数" size={90} loaded={loaded} />
            </div>
          </div>

          {/* 目录导航 */}
          <div className="border-y border-white/6 px-6 lg:pl-[260px]">
            <div className="max-w-4xl lg:max-w-5xl mx-auto flex gap-1 overflow-x-auto py-3">
              {REPORT_SECTIONS.map((s, i) => (
                <a key={s.id} href={`#${s.id}`} className="px-4 py-2 text-xs whitespace-nowrap border rounded-full border-white/6 text-zinc-500 hover:text-zinc-300 hover:border-white/15 transition-all duration-200">
                  0{i + 1}. {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* 报告内容 */}
          <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 lg:pl-[260px] py-12 space-y-16">
            {/* 推荐岗位 */}
            <section id="positions">
              <p className="text-xs font-mono text-zinc-600 mb-2">02.</p>
              <h2 className="text-2xl font-light text-white mb-6 text-glow-lime" style={{ fontFamily: "'Instrument Serif', serif" }}>推荐岗位 Top 5</h2>
              <div className="space-y-3">
                {RECOMMENDED_POSTS.map((p, i) => (
                  <div key={i} className="liquid-glass p-5 rounded-none transition-all duration-300 hover:border-[#b4ff39]/20" style={{ animation: `fadeIn 0.4s ease both`, animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-mono text-zinc-600">0{i + 1}</span>
                        <h3 className="text-base text-white font-medium">{p.name}</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{p.dept} · {p.location}</p>
                      </div>
                      <span className={`text-sm font-mono px-2 py-0.5 border rounded-full ${p.level === '冲' ? 'border-rose-400/30 text-rose-400' : p.level === '稳' ? 'border-[#b4ff39]/30 text-[#b4ff39]' : 'border-amber-400/30 text-amber-400'}`}>{p.level}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div><p className="text-xs text-zinc-600">竞争比</p><p className="text-sm font-mono text-white">{p.competition}:1</p></div>
                      <div><p className="text-xs text-zinc-600">招录人数</p><p className="text-sm font-mono text-white">{p.headcount}人</p></div>
                      <div><p className="text-xs text-zinc-600">上岸概率</p><p className="text-sm font-mono text-[#b4ff39]">{p.probability}%</p></div>
                      <div><p className="text-xs text-zinc-600">专业匹配</p><p className="text-sm font-mono text-white">{p.matchRate}%</p></div>
                    </div>
                    <div className="mt-3 h-1 bg-white/5 overflow-hidden rounded-full">
                      <div className="h-full bg-[#b4ff39] rounded-full transition-all duration-1000 ease-out" style={{ width: loaded ? `${p.probability}%` : '0%', transitionDelay: `${0.5 + i * 0.15}s` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 竞争分析 */}
            <section id="competition">
              <p className="text-xs font-mono text-zinc-600 mb-2">03.</p>
              <h2 className="text-2xl font-light text-white mb-6 text-glow-lime" style={{ fontFamily: "'Instrument Serif', serif" }}>竞争分析</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="liquid-glass p-5 rounded-none space-y-4">
                  <h3 className="text-sm text-zinc-400 font-medium">目标省份竞争比</h3>
                  {COMPETITION_ANALYSIS.provinces.map(p => (
                    <div key={p.region} className="space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">{p.region}</span><span className="font-mono" style={{ color: p.highlight ? '#b4ff39' : 'white' }}>{p.avgCompetition}:1</span></div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: loaded ? `${(p.avgCompetition / 120) * 100}%` : '0%', backgroundColor: p.highlight ? '#b4ff39' : 'rgba(255,255,255,0.2)', transitionDelay: '0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="liquid-glass p-5 rounded-none space-y-4">
                  <h3 className="text-sm text-zinc-400 font-medium">学历竞争力分布</h3>
                  {COMPETITION_ANALYSIS.education.map(e => (
                    <div key={e.level} className="space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">{e.level}</span><span className="font-mono" style={{ color: e.highlight ? '#b4ff39' : 'white' }}>{e.rate}%</span></div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: loaded ? `${e.rate}%` : '0%', backgroundColor: e.highlight ? '#b4ff39' : 'rgba(255,255,255,0.2)', transitionDelay: '0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 冲稳保策略 */}
            <section id="strategy">
              <p className="text-xs font-mono text-zinc-600 mb-2">04.</p>
              <h2 className="text-2xl font-light text-white mb-6 text-glow-lime" style={{ fontFamily: "'Instrument Serif', serif" }}>冲稳保策略</h2>
              <div className="grid grid-cols-3 gap-4">
                {STRATEGY_ADVICE.map((s, i) => (
                  <div key={i} className={`liquid-glass p-5 rounded-none space-y-3 ${s.type === '冲' ? 'border-rose-400/20' : s.type === '稳' ? 'border-[#b4ff39]/20' : 'border-amber-400/20'}`} style={{ animation: `fadeIn 0.4s ease both`, animationDelay: `${i * 0.15}s` }}>
                    <span className={`text-xs font-mono px-2 py-0.5 border rounded-full ${s.type === '冲' ? 'border-rose-400/30 text-rose-400 bg-rose-400/5' : s.type === '稳' ? 'border-[#b4ff39]/30 text-[#b4ff39] bg-[#b4ff39]/5' : 'border-amber-400/30 text-amber-400 bg-amber-400/5'}`}>{s.type}</span>
                    <h3 className="text-sm text-white">{s.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                    <div className="pt-2 border-t border-white/5"><p className="text-xs text-zinc-600">目标岗位</p><p className="text-sm text-white">{s.type}</p></div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI 建议 */}
            <section id="timeline">
              <p className="text-xs font-mono text-zinc-600 mb-2">05.</p>
              <h2 className="text-2xl font-light text-white mb-6 text-glow-lime" style={{ fontFamily: "'Instrument Serif', serif" }}>AI 专属建议</h2>
              <div className="liquid-glass p-6 rounded-none space-y-4" style={{ borderLeft: '2px solid rgba(180,255,57,0.3)' }}>
                <div className="flex items-center gap-2"><span className="text-[#b4ff39] text-lg font-mono text-glow-lime">AI</span><span className="text-xs text-zinc-500">根据你的背景生成</span></div>
                <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                  <li className="flex gap-2"><span className="text-[#b4ff39] font-mono text-xs mt-0.5">01</span><span>你的专业在<strong className="text-white">财政学类</strong>中竞争力较强，建议优先报考<strong className="text-[#b4ff39]">税务局、财政局</strong>序列岗位，专业匹配度高达 92%</span></li>
                  <li className="flex gap-2"><span className="text-[#b4ff39] font-mono text-xs mt-0.5">02</span><span>山东竞争比较全国均值高 30%，建议<strong className="text-white">同时报考国考税务系统</strong>作为备选，增加上岸机会</span></li>
                  <li className="flex gap-2"><span className="text-[#b4ff39] font-mono text-xs mt-0.5">03</span><span>党员身份是<strong className="text-white">选调生</strong>的硬性条件，你的政治面貌满足要求，建议<strong className="text-[#b4ff39]">重点冲击选调岗位</strong></span></li>
                  <li className="flex gap-2"><span className="text-[#b4ff39] font-mono text-xs mt-0.5">04</span><span>备考时间约 <strong className="text-white">180 天</strong>，建议使用 AI 四阶段规划，每天学习 <strong className="text-[#b4ff39]">3-4 小时</strong>即可高效覆盖</span></li>
                </ul>
              </div>
            </section>
          </div>

          {/* ═══════ 全国可视化 ═══════ */}
          <div className="border-t border-white/6" />
          <div className="max-w-5xl mx-auto px-6 lg:pl-[260px] py-16 space-y-10">
            <div>
              <p className="text-xs font-mono text-zinc-600 mb-2">06.</p>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-tight text-glow-lime" style={{ fontFamily: "'Instrument Serif', serif" }}>
                全国公考<span className="text-[#b4ff39]">可视化</span>
              </h2>
              <p className="text-zinc-500 text-sm mt-3 max-w-lg leading-relaxed">
                全国 28 省份竞争热度 · 岗位类型分布 · 国考系统竞争分析<br />
                实时数据，动态条形图呈现
              </p>
            </div>
            <div className="flex gap-1 p-1 bg-white/3 rounded-full">
              {([{ key: 'rank' as const, label: '省份排行' }, { key: 'posts' as const, label: '岗位分布' }, { key: 'guokao' as const, label: '国考系统' }]).map(t => (
                <button key={t.key} onClick={() => setMapTab(t.key)} className={`flex-1 px-4 py-2.5 text-xs font-medium rounded-full transition-all ${mapTab === t.key ? 'bg-[#b4ff39] text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>
                  {t.label}
                </button>
              ))}
            </div>
            {mapTab === 'rank' && <ProvinceRankPanel />}
            {mapTab === 'posts' && <PostsPanel />}
            {mapTab === 'guokao' && <GuokaoPanel />}
            <div className="text-center pt-4">
              <button onClick={() => router.push('/map')} className="liquid-glass rounded-full px-6 py-3 text-[#b4ff39] text-sm font-medium hover:bg-white/5 transition-colors">
                查看完整全国可视化 →
              </button>
            </div>
          </div>

          {/* ═══════ CTA: 生成你的专属报告 ═══════ */}
          <div className="border-t border-white/6" />
          <section className="py-20 text-center space-y-6 max-w-4xl lg:max-w-5xl mx-auto px-6 lg:pl-[260px]">
            <div className="inline-block px-4 py-1 border border-[#b4ff39]/20 text-[10px] font-mono text-[#b4ff39] tracking-wider mb-4 rounded-full text-glow-lime">YOUR TURN</div>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight text-glow-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
              这是他的报告<br /><span className="text-[#b4ff39] text-glow-lime">你的呢？</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
              手机号注册 · 填写专业、学历、目标省份等信息<br />AI 将为你生成专属的报考岗位报告
            </p>
            <button onClick={handleCTA} className="bg-[#b4ff39] text-black rounded-full px-8 py-3.5 font-medium text-sm tracking-wide hover:bg-[#c5ff6b] transition-all button-glow mt-6">
              手机号注册，生成专属报告 →
            </button>
            <div className="pt-4"><span className="text-[9px] text-zinc-700 font-mono">免费生成 · 仅需 1 分钟 · AI 智能匹配</span></div>
            <div className="pt-8 border-t border-white/5 mt-8">
              <p className="text-zinc-600 text-xs mb-3">已有账号？直接进入</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => router.push('/login')} className="liquid-glass rounded-full py-2 px-6 text-xs text-white font-medium hover:bg-white/5 transition-colors">登录</button>
                <button onClick={() => router.push('/dashboard')} className="liquid-glass rounded-full py-2 px-6 text-xs text-white font-medium hover:bg-white/5 transition-colors">学习中心</button>
                <button onClick={() => router.push('/explore')} className="liquid-glass rounded-full py-2 px-6 text-xs text-white font-medium hover:bg-white/5 transition-colors">考公全景</button>
              </div>
            </div>
          </section>

          {/* 底部 */}
          <div className="border-t border-white/6 px-6 py-6 text-center">
            <span className="text-[9px] font-mono text-zinc-700">上岸引擎 · Anan Engine · 拓扑降维 · 精准上岸 · © 2026</span>
          </div>
        </div>
      </section>

      {/* Mobile menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onLogin={() => { setMenuOpen(false); router.push('/login'); }} onSignup={() => { setMenuOpen(false); handleSignup(); }} />
    </div>
  );
}
