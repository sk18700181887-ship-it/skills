'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { RECOMMENDED_POSTS, COMPETITION_ANALYSIS, STRATEGY_ADVICE, REPORT_SECTIONS } from '@/lib/data';

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

/* ===== 横向条形图 ===== */
function HBar({ label, value, max, color, loaded }: { label: string; value: number; max: number; color: string; loaded: boolean }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className="font-mono text-white">{value}:1</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-none overflow-hidden">
        <div
          className="h-full rounded-none transition-all duration-1000 ease-out"
          style={{ width: loaded ? `${(value / max) * 100}%` : '0%', backgroundColor: color, transitionDelay: '0.3s' }}
        />
      </div>
    </div>
  );
}

/* ===== 主页面 ===== */
export default function LandingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const handleCTA = () => router.push('/onboarding');

  return (
    <div className="min-h-screen bg-black">
      <MatrixRain />

      {/* ═══════ Hero 开场 ═══════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* 网格线 */}
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

        {/* 光线扫描 */}
        <div className={`fixed top-0 left-0 w-full h-[2px] z-[2] transition-opacity duration-1000 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#b4ff39]/40 to-transparent animate-[scanLine_2s_ease-in-out_infinite]" />
        </div>

        {/* 中心内容 */}
        <div className="relative z-[3] text-center">
          <div className={`mb-6 transition-all duration-1000 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[11px] font-mono text-zinc-600 tracking-[0.3em]">AI-POWERED CIVIL SERVICE EXAM PLATFORM</span>
          </div>

          <h1 className={`transition-all duration-[1500ms] ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block text-6xl md:text-8xl font-serif font-light text-white tracking-tight leading-[1.1]">
              拓扑降维
            </span>
            <span className="block text-6xl md:text-8xl font-serif font-light tracking-tight leading-[1.1] mt-2">
              <span className="text-[#b4ff39]">精准</span>上岸
            </span>
          </h1>

          <div className={`mt-6 max-w-md mx-auto transition-all duration-1000 delay-200 ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-zinc-500 text-sm leading-relaxed">
              将复杂的公考信息降维到极致清晰的结构中<br />
              从了解考公到面试上岸，7 阶段 AI 智能导航
            </p>
          </div>

          <div className={`mt-4 flex items-center justify-center gap-3 transition-all duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="topo-chip text-[10px]">上岸引擎</span>
            <span className="topo-chip text-[10px]">Anan Engine</span>
            <span className="topo-chip text-[10px] text-[#b4ff39] border-[rgba(180,255,57,0.2)]">v2.0</span>
          </div>

          <div className={`mt-10 transition-all duration-1000 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={() => document.getElementById('demo-report')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-3 bg-[#b4ff39] text-black text-sm font-medium tracking-wider hover:bg-[#c5ff6b] transition-all btn-press"
            >
              查看示例报告 ↓
            </button>
          </div>
        </div>

        {/* 底部统计条 */}
        <div className={`fixed bottom-0 left-0 right-0 z-[3] border-t border-[rgba(255,255,255,0.06)] transition-all duration-1000 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between px-8 py-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400" />
                <span className="text-[9px] font-mono text-zinc-600">7 阶段路径</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#b4ff39]" />
                <span className="text-[9px] font-mono text-zinc-600">AI 全程陪练</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400" />
                <span className="text-[9px] font-mono text-zinc-600">全国 28 省份数据</span>
              </div>
            </div>
            <span className="text-[9px] font-mono text-zinc-700">拓扑降维 · 精准上岸</span>
          </div>
        </div>
      </section>

      {/* ═══════ 示例报告 ═══════ */}
      <section id="demo-report" className="relative z-10 bg-black">
        {/* 顶部导航 */}
        <div className={`sticky top-0 z-20 border-b border-white/6 px-6 py-4 flex items-center justify-between transition-colors duration-300 ${scrolled ? 'bg-black/90' : 'bg-black'}`}>
          <div className="flex items-center gap-3">
            <span className="text-[#b4ff39] font-serif text-lg">上岸引擎</span>
            <span className="text-zinc-600 text-xs font-mono">DEMO REPORT</span>
          </div>
          <button onClick={() => router.push('/dashboard')} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            直接进入学习中心 →
          </button>
        </div>

        {/* Hero */}
        <div className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
          <p className="text-xs font-mono text-zinc-600 mb-4 animate-[fadeIn_0.3s_ease_both]">01.</p>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight mb-6 animate-[glow-text_3s_ease-in-out_infinite]">
            示例·<span className="text-[#b4ff39]">AI 报考报告</span>
          </h1>
          <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
            以下是一位「财政学·本科·中共党员·山东」考生的真实报告示例。<br />
            填写你的信息后，AI 将为你生成专属报告。
          </p>

          {/* 示例考生标签 */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="px-3 py-1 border border-white/8 text-[10px] text-zinc-400 font-mono rounded-none">财政学类</span>
            <span className="px-3 py-1 border border-white/8 text-[10px] text-zinc-400 font-mono rounded-none">本科</span>
            <span className="px-3 py-1 border border-[#b4ff39]/20 text-[10px] text-[#b4ff39] font-mono rounded-none">中共党员</span>
            <span className="px-3 py-1 border border-white/8 text-[10px] text-zinc-400 font-mono rounded-none">山东省</span>
            <span className="px-3 py-1 border border-amber-400/20 text-[10px] text-amber-400 font-mono rounded-none">国考</span>
          </div>

          {/* 三大数据环 */}
          <div className="flex gap-12 mt-12">
            <RingChart percent={73} color="#b4ff39" label="综合上岸率" size={90} loaded={loaded} />
            <RingChart percent={85} color="#b4ff39" label="岗位匹配度" size={90} loaded={loaded} />
            <RingChart percent={62} color="#fbbf24" label="竞争压力指数" size={90} loaded={loaded} />
          </div>
        </div>

        {/* 目录导航 */}
        <div className="border-y border-white/6 px-6">
          <div className="max-w-4xl mx-auto flex gap-1 overflow-x-auto py-3">
            {REPORT_SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 text-xs whitespace-nowrap border rounded-none border-white/6 text-zinc-500 hover:text-zinc-300 hover:border-white/15 transition-all duration-200"
              >
                0{i + 1}. {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* 报告内容区 */}
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

          {/* 推荐岗位 */}
          <section id="positions">
            <p className="text-xs font-mono text-zinc-600 mb-2">02.</p>
            <h2 className="text-2xl font-serif font-light text-white mb-6 animate-[glow-text_3s_ease-in-out_infinite]">推荐岗位 Top 5</h2>
            <div className="space-y-3">
              {RECOMMENDED_POSTS.map((p, i) => (
                <div
                  key={i}
                  className="border border-white/6 p-5 hover:border-[#b4ff39]/20 transition-all duration-300 rounded-none"
                  style={{ animation: `fadeIn 0.4s ease both`, animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-mono text-zinc-600">0{i + 1}</span>
                      <h3 className="text-base text-white font-medium">{p.name}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{p.dept} · {p.location}</p>
                    </div>
                    <span className={`text-sm font-mono px-2 py-0.5 border rounded-none
                      ${p.level === '冲' ? 'border-rose-400/30 text-rose-400' :
                        p.level === '稳' ? 'border-[#b4ff39]/30 text-[#b4ff39]' :
                        'border-amber-400/30 text-amber-400'}`}
                    >
                      {p.level}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xs text-zinc-600">竞争比</p>
                      <p className="text-sm font-mono text-white">{p.competition}:1</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-600">招录人数</p>
                      <p className="text-sm font-mono text-white">{p.headcount}人</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-600">上岸概率</p>
                      <p className="text-sm font-mono text-[#b4ff39]">{p.probability}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-600">专业匹配</p>
                      <p className="text-sm font-mono text-white">{p.matchRate}%</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1 bg-white/5 overflow-hidden rounded-none">
                    <div
                      className="h-full bg-[#b4ff39] rounded-none transition-all duration-1000 ease-out"
                      style={{ width: loaded ? `${p.probability}%` : '0%', transitionDelay: `${0.5 + i * 0.15}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 竞争分析 */}
          <section id="competition">
            <p className="text-xs font-mono text-zinc-600 mb-2">03.</p>
            <h2 className="text-2xl font-serif font-light text-white mb-6 animate-[glow-text_3s_ease-in-out_infinite]">竞争分析</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-white/6 p-5 rounded-none space-y-4">
                <h3 className="text-sm text-zinc-400 font-medium">目标省份竞争比</h3>
                {COMPETITION_ANALYSIS.provinces.map(p => (
                  <HBar key={p.region} label={p.region} value={p.avgCompetition} max={120} color={p.highlight ? '#b4ff39' : 'rgba(255,255,255,0.3)'} loaded={loaded} />
                ))}
              </div>
              <div className="border border-white/6 p-5 rounded-none space-y-4">
                <h3 className="text-sm text-zinc-400 font-medium">学历竞争力分布</h3>
                {COMPETITION_ANALYSIS.education.map(e => (
                  <div key={e.level} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">{e.level}</span>
                      <span className="font-mono" style={{ color: e.highlight ? '#b4ff39' : 'white' }}>{e.rate}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-none overflow-hidden">
                      <div
                        className="h-full rounded-none transition-all duration-1000 ease-out"
                        style={{ width: loaded ? `${e.rate}%` : '0%', backgroundColor: e.highlight ? '#b4ff39' : 'rgba(255,255,255,0.2)', transitionDelay: '0.3s' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 冲稳保策略 */}
          <section id="strategy">
            <p className="text-xs font-mono text-zinc-600 mb-2">04.</p>
            <h2 className="text-2xl font-serif font-light text-white mb-6 animate-[glow-text_3s_ease-in-out_infinite]">冲稳保策略</h2>
            <div className="grid grid-cols-3 gap-4">
              {STRATEGY_ADVICE.map((s, i) => (
                <div
                  key={i}
                  className={`border p-5 rounded-none space-y-3 ${
                    s.type === '冲' ? 'border-rose-400/20' :
                    s.type === '稳' ? 'border-[#b4ff39]/20' :
                    'border-amber-400/20'}`}
                  style={{ animation: `fadeIn 0.4s ease both`, animationDelay: `${i * 0.15}s` }}
                >
                  <span className={`text-xs font-mono px-2 py-0.5 border rounded-none
                    ${s.type === '冲' ? 'border-rose-400/30 text-rose-400 bg-rose-400/5' :
                      s.type === '稳' ? 'border-[#b4ff39]/30 text-[#b4ff39] bg-[#b4ff39]/5' :
                      'border-amber-400/30 text-amber-400 bg-amber-400/5'}`}
                  >
                    {s.type}
                  </span>
                  <h3 className="text-sm text-white">{s.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-xs text-zinc-600">目标岗位</p>
                    <p className="text-sm text-white">{s.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI 建议 */}
          <section id="timeline">
            <p className="text-xs font-mono text-zinc-600 mb-2">05.</p>
            <h2 className="text-2xl font-serif font-light text-white mb-6 animate-[glow-text_3s_ease-in-out_infinite]">AI 专属建议</h2>
            <div className="border border-[#b4ff39]/15 bg-[#b4ff39]/3 p-6 rounded-none space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[#b4ff39] text-lg font-mono">AI</span>
                <span className="text-xs text-zinc-500">根据你的背景生成</span>
              </div>
              <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-[#b4ff39] font-mono text-xs mt-0.5">01</span>
                  <span>你的专业在<strong className="text-white">财政学类</strong>中竞争力较强，建议优先报考<strong className="text-[#b4ff39]">税务局、财政局</strong>序列岗位，专业匹配度高达 92%</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#b4ff39] font-mono text-xs mt-0.5">02</span>
                  <span>山东竞争比较全国均值高 30%，建议<strong className="text-white">同时报考国考税务系统</strong>作为备选，增加上岸机会</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#b4ff39] font-mono text-xs mt-0.5">03</span>
                  <span>党员身份是<strong className="text-white">选调生</strong>的硬性条件，你的政治面貌满足要求，建议<strong className="text-[#b4ff39]">重点冲击选调岗位</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#b4ff39] font-mono text-xs mt-0.5">04</span>
                  <span>备考时间约 <strong className="text-white">180 天</strong>，建议使用 AI 四阶段规划，每天学习 <strong className="text-[#b4ff39]">3-4 小时</strong>即可高效覆盖</span>
                </li>
              </ul>
            </div>
          </section>

          {/* ═══════ CTA: 生成你的专属报告 ═══════ */}
          <section className="py-20 text-center space-y-6">
            <div className="inline-block px-4 py-1 border border-[#b4ff39]/20 text-[10px] font-mono text-[#b4ff39] tracking-wider mb-4 rounded-none">
              YOUR TURN
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              这是他的报告<br />
              <span className="text-[#b4ff39]">你的呢？</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
              填写你的专业、学历、目标省份等信息<br />
              AI 将为你生成专属的报考岗位报告
            </p>
            <button
              onClick={handleCTA}
              className="mt-6 px-14 py-4 bg-[#b4ff39] text-black text-sm font-medium tracking-wider hover:bg-[#c5ff6b] transition-all btn-press animate-breathe"
            >
              填写信息，生成我的专属报告 →
            </button>
            <div className="pt-4">
              <span className="text-[9px] text-zinc-700 font-mono">免费生成 · 仅需 1 分钟 · AI 智能匹配</span>
            </div>

            {/* 附加入口 */}
            <div className="pt-8 border-t border-white/5 mt-8">
              <p className="text-zinc-600 text-xs mb-3">或直接进入</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-2 border border-white/8 text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all rounded-none"
                >
                  学习中心
                </button>
                <button
                  onClick={() => router.push('/explore')}
                  className="px-6 py-2 border border-white/8 text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all rounded-none"
                >
                  考公全景
                </button>
                <button
                  onClick={() => router.push('/map')}
                  className="px-6 py-2 border border-white/8 text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all rounded-none"
                >
                  全国可视化
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* 底部 */}
        <div className="border-t border-white/6 px-6 py-6 text-center">
          <span className="text-[9px] font-mono text-zinc-700">上岸引擎 · Anan Engine · 拓扑降维 · 精准上岸 · © 2026</span>
        </div>
      </section>
    </div>
  );
}
