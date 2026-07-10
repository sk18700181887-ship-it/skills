'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { REPORT_SECTIONS, RECOMMENDED_POSTS, COMPETITION_ANALYSIS, STRATEGY_ADVICE } from '@/lib/data';

/* ─── SVG 环形图 ─── */
function RingChart({ percent, color, label, size = 80, loaded }: { percent: number; color: string; label: string; size?: number; loaded: boolean }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={c} strokeDashoffset={loaded ? offset : c}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="text-lg font-mono text-white">{percent}%</span>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}

/* ─── 横向条形图 ─── */
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
          style={{
            width: loaded ? `${(value / max) * 100}%` : '0%',
            backgroundColor: color,
            transitionDelay: '0.3s',
          }}
        />
      </div>
    </div>
  );
}

export default function ReportPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);



  return (
    <div className="min-h-screen bg-black">
      {/* ── 顶部导航 ── */}
      <div className="border-b border-white/6 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#b4ff39] font-serif text-lg">上岸引擎</span>
          <span className="text-zinc-600 text-xs font-mono">PERSONAL REPORT</span>
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          进入学习中心 →
        </button>
      </div>

      {/* ── Hero 区域 ── */}
      <div className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
        <p className="text-xs font-mono text-zinc-600 mb-4 animate-[fadeIn_0.3s_ease_both]">01.</p>
        <h1
          className="text-4xl md:text-5xl font-serif font-light text-white leading-tight mb-6"
          style={{ animation: 'hero-title 0.8s ease both', animationDelay: '0.2s' }}
        >
          你的<br />
          <span className="text-[#b4ff39]">AI 报考报告</span>
        </h1>
        <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
          基于你的专业、学历和报考意向，AI 为你匹配最佳岗位组合、竞争分析与上岸策略
        </p>

        {/* 三大数据环 */}
        <div className="flex gap-12 mt-12">
          <RingChart percent={73} color="#b4ff39" label="综合上岸率" size={90} loaded={loaded} />
          <RingChart percent={85} color="#b4ff39" label="岗位匹配度" size={90} loaded={loaded} />
          <RingChart percent={62} color="#fbbf24" label="竞争压力指数" size={90} loaded={loaded} />
        </div>
      </div>

      {/* ── 目录导航 ── */}
      <div className="border-y border-white/6 px-6">
        <div className="max-w-4xl mx-auto flex gap-1 overflow-x-auto py-3">
          {REPORT_SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(i)}
              className={`
                px-4 py-2 text-xs whitespace-nowrap border rounded-none transition-all duration-200
                ${activeSection === i
                  ? 'bg-[#b4ff39]/10 border-[#b4ff39]/30 text-[#b4ff39]'
                  : 'border-white/6 text-zinc-500 hover:text-zinc-300 hover:border-white/15'}
              `}
            >
              0{s.id}. {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* ── 报告内容区 ── */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* 推荐岗位 */}
        <section>
          <p className="text-xs font-mono text-zinc-600 mb-2">02.</p>
          <h2 className="text-2xl font-serif font-light text-white mb-6">推荐岗位 Top 5</h2>
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
                  <div className="text-right">
                    <span className={`text-sm font-mono px-2 py-0.5 border rounded-none
                      ${p.level === '冲' ? 'border-rose-400/30 text-rose-400' :
                        p.level === '稳' ? 'border-[#b4ff39]/30 text-[#b4ff39]' :
                        'border-amber-400/30 text-amber-400'}`}
                    >
                      {p.level}
                    </span>
                  </div>
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
                {/* 概率条 */}
                <div className="mt-3 h-1 bg-white/5 overflow-hidden rounded-none">
                  <div
                    className="h-full bg-[#b4ff39] rounded-none transition-all duration-1000 ease-out"
                    style={{
                      width: loaded ? `${p.probability}%` : '0%',
                      transitionDelay: `${0.5 + i * 0.15}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 竞争分析 */}
        <section>
          <p className="text-xs font-mono text-zinc-600 mb-2">03.</p>
          <h2 className="text-2xl font-serif font-light text-white mb-6">竞争分析</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 目标省份竞争比 */}
            <div className="border border-white/6 p-5 rounded-none space-y-4">
              <h3 className="text-sm text-zinc-400 font-medium">目标省份竞争比</h3>
              {COMPETITION_ANALYSIS.provinces.map(p => (
                <HBar key={p.region} label={p.region} value={p.avgCompetition} max={120} color="#b4ff39" loaded={loaded} />
              ))}
            </div>
            {/* 学历竞争力 */}
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
                      style={{
                        width: loaded ? `${e.rate}%` : '0%',
                        backgroundColor: e.highlight ? '#b4ff39' : 'rgba(255,255,255,0.2)',
                        transitionDelay: '0.3s',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 冲稳保策略 */}
        <section>
          <p className="text-xs font-mono text-zinc-600 mb-2">04.</p>
          <h2 className="text-2xl font-serif font-light text-white mb-6">冲稳保策略</h2>
          <div className="grid grid-cols-3 gap-4">
            {STRATEGY_ADVICE.map((s, i) => (
              <div
                key={i}
                className={`border p-5 rounded-none space-y-3 ${
                  s.type === '冲' ? 'border-rose-400/20' :
                  s.type === '稳' ? 'border-[#b4ff39]/20' :
                  'border-amber-400/20'
                }`}
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
        <section>
          <p className="text-xs font-mono text-zinc-600 mb-2">05.</p>
          <h2 className="text-2xl font-serif font-light text-white mb-6">AI 专属建议</h2>
          <div className="border border-[#b4ff39]/15 bg-[#b4ff39]/3 p-6 rounded-none space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[#b4ff39] text-lg">AI</span>
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

        {/* 底部 CTA */}
        <div className="text-center py-12 space-y-4">
          <h2 className="text-2xl font-serif font-light text-white">开始你的上岸之旅</h2>
          <p className="text-zinc-500 text-sm">AI 智能陪练，稳步上岸</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 px-10 py-3 bg-[#b4ff39] text-black text-sm rounded-none hover:brightness-110 transition-all duration-200 animate-breathe"
          >
            进入学习中心
          </button>
        </div>
      </div>
    </div>
  );
}
