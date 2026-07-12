'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { RECOMMENDED_POSTS, COMPETITION_ANALYSIS, STRATEGY_ADVICE, REPORT_SECTIONS, PROVINCE_DATA, POST_DISTRIBUTION, GUOKAO_SYSTEMS, DIFFICULTY_SCALE } from '@/lib/data';
import type { DiffLevel } from '@/lib/data';

/* ===== 数字雨 Canvas ===== */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const w = c.width = window.innerWidth;
    const h = c.height = window.innerHeight;
    const cols = Math.floor(w / 20);
    const drops = Array(cols).fill(1);
    const chars = '上岸公务员选调申论行测判断推理数量资料面试笔试试卷'.split('');
    let frame = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(180,255,57,0.12)';
      ctx.font = '14px monospace';
      for (let i = 0; i < cols; i++) {
        const txt = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(txt, i * 20, drops[i] * 20);
        if (drops[i] * 20 > h && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
      frame++;
      if (frame < 300) requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ===== SVG 环形图 ===== */
function RingChart({ percent, color, label, size, loaded }: { percent: number; color: string; label: string; size: number; loaded: boolean }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={c} strokeDashoffset={loaded ? c - (c * percent) / 100 : c}
          strokeLinecap="square"
          className="transition-all duration-[1500ms] ease-out"
        />
      </svg>
      <span className="text-lg font-mono text-white">{percent}<span className="text-xs text-zinc-500">%</span></span>
      <span className="text-[10px] text-zinc-500">{label}</span>
    </div>
  );
}

/* ===== 动态条形图 ===== */
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

/* ===== 岗位分布横向条 ===== */
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

/* ===== 国考系统柱状图 ===== */
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

/* ===== IntersectionObserver hook ===== */
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

/* ===== Province Rank Panel ===== */
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

/* ===== Posts Distribution Panel ===== */
function PostsPanel() {
  const { setRef, inView } = useInView();
  return (
    <div ref={setRef} className="space-y-6">
      <div className="space-y-3">
        {POST_DISTRIBUTION.map((p, i) => (
          <PostBar key={p.type} type={p.type} count={p.count} ratio={p.ratio} color={p.color} delay={i * 80} inView={inView} />
        ))}
      </div>
      <div className="border border-white/6 p-6 rounded-none">
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

/* ===== Guokao System Panel ===== */
function GuokaoPanel() {
  const { setRef, inView } = useInView();
  return (
    <div ref={setRef} className="space-y-6">
      <div className="border border-white/6 p-6 rounded-none">
        <h3 className="text-sm text-zinc-400 font-medium mb-4">各系统岗位数对比</h3>
        <div className="flex items-end gap-2 h-48">
          {GUOKAO_SYSTEMS.map((s, i) => (
            <GuokaoBar key={s.name} name={s.name} posts={s.posts} ratio={s.ratio} difficulty={s.difficulty} delay={i * 70} inView={inView} />
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {[...GUOKAO_SYSTEMS].sort((a, b) => b.ratio - a.ratio).map((s, i) => (
          <div key={s.name} className="border border-white/6 p-4 hover:border-[#b4ff39]/20 transition-all duration-300 rounded-none">
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

/* ===== Parallax Quote Section (Serene-style) ===== */
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
        if (Math.abs(currentProgress - target) > 0.001) {
          rafId = requestAnimationFrame(animate);
        }
      };
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const mainY = progress * -160 + 120;
  const cloudLeftX = progress > 0.12 && progress < 0.92
    ? Math.max(-200, -200 + (progress - 0.12) / 0.8 * 400)
    : progress >= 0.92 ? 200 : -200;
  const cloudY = progress * -50;
  const cloudRightX = progress > 0.12 && progress < 0.92
    ? Math.min(200, 200 - (progress - 0.12) / 0.8 * 400)
    : progress >= 0.92 ? -200 : 200;
  const cloudOpacity = Math.max(0, 1 - Math.abs(cloudLeftX) / 200);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden section-gradient-deep">
      {/* Mesh orbs */}
      <div className="mesh-orb mesh-orb-1" />
      <div className="mesh-orb mesh-orb-2" />
      <div className="mesh-orb mesh-orb-3" />

      {/* Floating geometric shapes — parallax driven */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Main image band — parallax vertical */}
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
            <p className="text-3xl font-serif font-light text-white text-glow-white leading-tight">
              精准<br/>上岸
            </p>
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

      {/* Center quote content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center" style={{ opacity: Math.min(1, progress * 3), transform: `translate3d(0, ${(1 - Math.min(1, progress * 2)) * 30}px, 0)`, willChange: 'transform' }}>
          <p className="text-[11px] font-mono text-[#b4ff39]/60 tracking-[0.3em] mb-6">ANAN ENGINE — AI INTELLIGENT COMPANION</p>
          <p className="quote-text text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5]">
            &ldquo;上岸引擎基于一个信念：每个考生都值得拥有<strong className="text-[#b4ff39] text-glow-lime">精准导航</strong>。我们追求清晰的结构、缜密的策略、持久的进步。我们花时间了解你的背景，再决定什么最适合你。没有盲目，没有浪费——只有让你<strong className="text-[#b4ff39] text-glow-lime">稳步上岸</strong>的支撑。&rdquo;
          </p>
          <p className="mt-6 md:mt-8 text-white/60 text-sm tracking-wide">上岸引擎 · AI 智能陪练 · 精准导航</p>
        </div>
      </div>
    </section>
  );
}

/* ===== 主页面 ===== */
export default function LandingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mapTab, setMapTab] = useState<'rank' | 'posts' | 'guokao'>('rank');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (phase >= 4) {
      const t = setTimeout(() => setLoaded(true), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleCTA = () => router.push('/login');

  return (
    <div className="min-h-screen bg-black">
      <MatrixRain />

      {/* ═══════ SECTION 1: Hero — Full-screen Immersive ═══════ */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 z-[1]" />

        {/* Mesh orbs */}
        <div className="absolute inset-0 z-[0] pointer-events-none">
          <div className="mesh-orb mesh-orb-1" />
          <div className="mesh-orb mesh-orb-2" />
          <div className="mesh-orb mesh-orb-3" />
        </div>

        {/* Grid pattern */}
        <div className={`fixed inset-0 z-[1] transition-opacity duration-[2000ms] ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Scan line */}
        <div className={`fixed top-0 left-0 w-full h-[2px] z-[2] transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#b4ff39]/40 to-transparent animate-[scanLine_2s_ease-in-out_infinite]" />
        </div>

        {/* Center content */}
        <div className="relative z-[3] text-center px-6" style={{ marginTop: '-120px' }}>
          {/* Top label */}
          <div className={`mb-6 transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[11px] font-mono text-zinc-600 tracking-[0.3em]">AI-POWERED CIVIL SERVICE EXAM PLATFORM</span>
          </div>

          {/* Main heading — with text glow */}
          <h1 className={`transition-all duration-[1500ms] ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[110px] font-serif font-light text-white tracking-tight leading-[0.9] text-glow-white">
              拓扑降维
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[110px] font-serif font-light tracking-tight leading-[0.9] mt-2">
              <span className="text-[#b4ff39] text-glow-lime">精准</span>
              <span className="text-white text-glow-white">上岸</span>
            </span>
          </h1>

          {/* Subtitle */}
          <div className={`mt-5 md:mt-7 max-w-xl mx-auto transition-all duration-1000 delay-200 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              将复杂的公考信息降维到极致清晰的结构中<br />
              从了解考公到面试上岸，7 阶段 AI 智能导航
            </p>
          </div>

          {/* Chip tags */}
          <div className={`mt-4 flex items-center justify-center gap-3 transition-all duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="topo-chip text-[10px]">上岸引擎</span>
            <span className="topo-chip text-[10px]">Anan Engine</span>
            <span className="topo-chip topo-chip-lime text-[10px]">v2.0</span>
          </div>

          {/* CTA Button — pill style with glow */}
          <div className={`mt-6 md:mt-9 transition-all duration-1000 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={() => document.getElementById('demo-report')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-pill btn-pill-lime"
            >
              查看示例报告 ↓
            </button>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className={`fixed bottom-0 left-0 right-0 z-[3] border-t border-white/6 transition-all duration-1000 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between px-6 md:px-12 py-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400" /><span className="text-[9px] font-mono text-zinc-600">7 阶段路径</span></div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#b4ff39]" /><span className="text-[9px] font-mono text-zinc-600">AI 全程陪练</span></div>
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-amber-400" /><span className="text-[9px] font-mono text-zinc-600">全国 28 省份数据</span></div>
            </div>
            <span className="text-[9px] font-mono text-zinc-700">拓扑降维 · 精准上岸</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 z-[3] scroll-indicator transition-opacity duration-1000 ${phase >= 4 ? 'opacity-60' : 'opacity-0'}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ═══════ SECTION 2: Parallax Quote ═══════ */}
      <ParallaxSection />

      {/* ═══════ SECTION 3: 示例报告 ═══════ */}
      <section id="demo-report" className="relative z-10 bg-black">
        <div className={`sticky top-0 z-20 border-b border-white/6 px-6 py-4 flex items-center justify-between transition-colors duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-black'}`}>
          <div className="flex items-center gap-3">
            <span className="text-[#b4ff39] font-serif text-lg">上岸引擎</span>
            <span className="text-zinc-600 text-xs font-mono">DEMO REPORT</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/login')} className="btn-pill btn-pill-outline !py-2 !px-5 !text-xs">登录</button>
            <button onClick={handleCTA} className="btn-pill btn-pill-lime !py-2 !px-5 !text-xs">注册生成报告</button>
          </div>
        </div>

        {/* 左侧固定引导栏 + 右侧内容 */}
        <div className="relative">
          {/* 左侧固定引导栏 */}
          <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-30 w-[220px]">
            <div className="liquid-glass p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#b4ff39] animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500">AI 实时分析</span>
              </div>
              <h3 className="text-sm font-serif text-white leading-snug">
                填写信息<br />生成<span className="text-[#b4ff39] text-glow-lime">专属</span>报告
              </h3>
              <p className="text-[10px] text-zinc-600 leading-relaxed">
                这是示例报告<br />你的报告需要填写个人信息后由 AI 生成
              </p>
              <button onClick={handleCTA} className="btn-pill btn-pill-lime w-full !py-2.5 !text-xs justify-center">
                填写信息 →
              </button>
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#b4ff39" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  <span className="text-[9px] text-zinc-500">手机号注册</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#b4ff39" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="text-[9px] text-zinc-500">数据安全保障</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#b4ff39" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <span className="text-[9px] text-zinc-500">1 分钟快速生成</span>
                </div>
              </div>
            </div>
          </div>

          {/* 报告 Hero */}
          <div className="px-6 lg:pl-[260px] py-16 md:py-24 max-w-4xl lg:max-w-5xl mx-auto">
            <p className="text-xs font-mono text-zinc-600 mb-4">01.</p>
            <h1 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight mb-6 text-glow-lime">
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
                <a key={s.id} href={`#${s.id}`} className="px-4 py-2 text-xs whitespace-nowrap border rounded-none border-white/6 text-zinc-500 hover:text-zinc-300 hover:border-white/15 transition-all duration-200">
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
              <h2 className="text-2xl font-serif font-light text-white mb-6 text-glow-lime">推荐岗位 Top 5</h2>
              <div className="space-y-3">
                {RECOMMENDED_POSTS.map((p, i) => (
                  <div key={i} className="liquid-glass p-5 rounded-none transition-all duration-300 hover:border-[#b4ff39]/20" style={{ animation: `fadeIn 0.4s ease both`, animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-mono text-zinc-600">0{i + 1}</span>
                        <h3 className="text-base text-white font-medium">{p.name}</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{p.dept} · {p.location}</p>
                      </div>
                      <span className={`text-sm font-mono px-2 py-0.5 border rounded-none ${p.level === '冲' ? 'border-rose-400/30 text-rose-400' : p.level === '稳' ? 'border-[#b4ff39]/30 text-[#b4ff39]' : 'border-amber-400/30 text-amber-400'}`}>{p.level}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div><p className="text-xs text-zinc-600">竞争比</p><p className="text-sm font-mono text-white">{p.competition}:1</p></div>
                      <div><p className="text-xs text-zinc-600">招录人数</p><p className="text-sm font-mono text-white">{p.headcount}人</p></div>
                      <div><p className="text-xs text-zinc-600">上岸概率</p><p className="text-sm font-mono text-[#b4ff39]">{p.probability}%</p></div>
                      <div><p className="text-xs text-zinc-600">专业匹配</p><p className="text-sm font-mono text-white">{p.matchRate}%</p></div>
                    </div>
                    <div className="mt-3 h-1 bg-white/5 overflow-hidden rounded-none">
                      <div className="h-full bg-[#b4ff39] rounded-none transition-all duration-1000 ease-out" style={{ width: loaded ? `${p.probability}%` : '0%', transitionDelay: `${0.5 + i * 0.15}s` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 竞争分析 */}
            <section id="competition">
              <p className="text-xs font-mono text-zinc-600 mb-2">03.</p>
              <h2 className="text-2xl font-serif font-light text-white mb-6 text-glow-lime">竞争分析</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="liquid-glass p-5 rounded-none space-y-4">
                  <h3 className="text-sm text-zinc-400 font-medium">目标省份竞争比</h3>
                  {COMPETITION_ANALYSIS.provinces.map(p => (
                    <div key={p.region} className="space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">{p.region}</span><span className="font-mono" style={{ color: p.highlight ? '#b4ff39' : 'white' }}>{p.avgCompetition}:1</span></div>
                      <div className="h-1.5 bg-white/5 rounded-none overflow-hidden">
                        <div className="h-full rounded-none transition-all duration-1000 ease-out" style={{ width: loaded ? `${(p.avgCompetition / 120) * 100}%` : '0%', backgroundColor: p.highlight ? '#b4ff39' : 'rgba(255,255,255,0.2)', transitionDelay: '0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="liquid-glass p-5 rounded-none space-y-4">
                  <h3 className="text-sm text-zinc-400 font-medium">学历竞争力分布</h3>
                  {COMPETITION_ANALYSIS.education.map(e => (
                    <div key={e.level} className="space-y-1">
                      <div className="flex justify-between text-xs"><span className="text-zinc-400">{e.level}</span><span className="font-mono" style={{ color: e.highlight ? '#b4ff39' : 'white' }}>{e.rate}%</span></div>
                      <div className="h-1.5 bg-white/5 rounded-none overflow-hidden">
                        <div className="h-full rounded-none transition-all duration-1000 ease-out" style={{ width: loaded ? `${e.rate}%` : '0%', backgroundColor: e.highlight ? '#b4ff39' : 'rgba(255,255,255,0.2)', transitionDelay: '0.3s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 冲稳保策略 */}
            <section id="strategy">
              <p className="text-xs font-mono text-zinc-600 mb-2">04.</p>
              <h2 className="text-2xl font-serif font-light text-white mb-6 text-glow-lime">冲稳保策略</h2>
              <div className="grid grid-cols-3 gap-4">
                {STRATEGY_ADVICE.map((s, i) => (
                  <div key={i} className={`liquid-glass p-5 rounded-none space-y-3 ${s.type === '冲' ? 'border-rose-400/20' : s.type === '稳' ? 'border-[#b4ff39]/20' : 'border-amber-400/20'}`} style={{ animation: `fadeIn 0.4s ease both`, animationDelay: `${i * 0.15}s` }}>
                    <span className={`text-xs font-mono px-2 py-0.5 border rounded-none ${s.type === '冲' ? 'border-rose-400/30 text-rose-400 bg-rose-400/5' : s.type === '稳' ? 'border-[#b4ff39]/30 text-[#b4ff39] bg-[#b4ff39]/5' : 'border-amber-400/30 text-amber-400 bg-amber-400/5'}`}>{s.type}</span>
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
              <h2 className="text-2xl font-serif font-light text-white mb-6 text-glow-lime">AI 专属建议</h2>
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
              <h2 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight text-glow-lime">
                全国公考<span className="text-[#b4ff39]">可视化</span>
              </h2>
              <p className="text-zinc-500 text-sm mt-3 max-w-lg leading-relaxed">
                全国 28 省份竞争热度 · 岗位类型分布 · 国考系统竞争分析<br />
                实时数据，动态条形图呈现
              </p>
            </div>

            <div className="flex gap-1 p-1 bg-white/3 rounded-none">
              {([{ key: 'rank' as const, label: '省份排行' }, { key: 'posts' as const, label: '岗位分布' }, { key: 'guokao' as const, label: '国考系统' }]).map(t => (
                <button key={t.key} onClick={() => setMapTab(t.key)} className={`flex-1 px-4 py-2.5 text-xs font-medium rounded-none transition-all ${mapTab === t.key ? 'bg-[#b4ff39] text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {mapTab === 'rank' && <ProvinceRankPanel />}
            {mapTab === 'posts' && <PostsPanel />}
            {mapTab === 'guokao' && <GuokaoPanel />}

            <div className="text-center pt-4">
              <button onClick={() => router.push('/map')} className="btn-pill btn-pill-outline !text-[#b4ff39]" style={{ borderColor: 'rgba(180,255,57,0.3)' }}>
                查看完整全国可视化 →
              </button>
            </div>
          </div>

          {/* ═══════ CTA: 生成你的专属报告 ═══════ */}
          <div className="border-t border-white/6" />
          <section className="py-20 text-center space-y-6 max-w-4xl lg:max-w-5xl mx-auto px-6 lg:pl-[260px]">
            <div className="inline-block px-4 py-1 border border-[#b4ff39]/20 text-[10px] font-mono text-[#b4ff39] tracking-wider mb-4 rounded-none text-glow-lime">YOUR TURN</div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight text-glow-white">
              这是他的报告<br /><span className="text-[#b4ff39] text-glow-lime">你的呢？</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
              手机号注册 · 填写专业、学历、目标省份等信息<br />AI 将为你生成专属的报考岗位报告
            </p>
            <button onClick={handleCTA} className="btn-pill btn-pill-lime mt-6">
              手机号注册，生成专属报告 →
            </button>
            <div className="pt-4"><span className="text-[9px] text-zinc-700 font-mono">免费生成 · 仅需 1 分钟 · AI 智能匹配</span></div>

            <div className="pt-8 border-t border-white/5 mt-8">
              <p className="text-zinc-600 text-xs mb-3">已有账号？直接进入</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => router.push('/login')} className="btn-pill btn-pill-outline !py-2 !px-6 !text-xs">登录</button>
                <button onClick={() => router.push('/dashboard')} className="btn-pill btn-pill-outline !py-2 !px-6 !text-xs">学习中心</button>
                <button onClick={() => router.push('/explore')} className="btn-pill btn-pill-outline !py-2 !px-6 !text-xs">考公全景</button>
              </div>
            </div>
          </section>

          {/* 底部 */}
          <div className="border-t border-white/6 px-6 py-6 text-center">
            <span className="text-[9px] font-mono text-zinc-700">上岸引擎 · Anan Engine · 拓扑降维 · 精准上岸 · © 2026</span>
          </div>
        </div>{/* 关闭 relative 容器 */}
      </section>
    </div>
  );
}
