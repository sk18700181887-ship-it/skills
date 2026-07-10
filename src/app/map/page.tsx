'use client';

import { useState } from 'react';
import {
  MapPin, BarChart3, TrendingUp, ArrowLeft, ChevronRight,
  Filter, Building2, Users, Flame, Target, AlertTriangle,
  ChevronDown, Search, Layers
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PROVINCE_DATA, DIFFICULTY_SCALE, CITY_DETAIL_SD, POST_DISTRIBUTION, GUOKAO_SYSTEMS } from '@/lib/data';
import type { DiffLevel } from '@/lib/data';

type View = 'province' | 'city' | 'posts' | 'guokao';

const diffColorMap: Record<DiffLevel, string> = {
  '极难': 'bg-red-400/100', '难': 'bg-orange-400/100', '中高': 'bg-yellow-400/100',
  '中等': 'bg-lime-400/100', '中低': 'bg-green-400/100', '较易': 'bg-teal-400/100',
};
const diffBgMap: Record<DiffLevel, string> = {
  '极难': 'bg-red-400/10', '难': 'bg-orange-400/10', '中高': 'bg-yellow-400/10',
  '中等': 'bg-lime-400/10', '中低': 'bg-green-400/10', '较易': 'bg-teal-400/10',
};
const diffTextMap: Record<DiffLevel, string> = {
  '极难': 'text-red-400', '难': 'text-orange-400', '中高': 'text-yellow-400',
  '中等': 'text-lime-700', '中低': 'text-green-400', '较易': 'text-teal-700',
};

export default function MapPage() {
  const [activeView, setActiveView] = useState<View>('province');
  const [selectedProvince, setSelectedProvince] = useState<string | null>('sd');
  const [diffFilter, setDiffFilter] = useState<DiffLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedData = PROVINCE_DATA.find(p => p.id === selectedProvince);
  const filteredProvinces = PROVINCE_DATA.filter(p => {
    const matchDiff = diffFilter === 'all' || p.difficulty === diffFilter;
    const matchSearch = !searchQuery || p.name.includes(searchQuery) || p.short.includes(searchQuery);
    return matchDiff && matchSearch;
  });

  const views: { key: View; label: string; icon: React.ElementType }[] = [
    { key: 'province', label: '全国概览', icon: MapPin },
    { key: 'city', label: '地市详情', icon: Building2 },
    { key: 'posts', label: '岗位分布', icon: BarChart3 },
    { key: 'guokao', label: '国考系统', icon: Layers },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* 页头 */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold">全国公考可视化</h1>
        </div>
        <p className="text-sm text-zinc-500">全国 28 省份竞争热度 · 地市难度分布 · 岗位类型可视化</p>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-1 p-1 bg-white/[0.03] rounded-xl animate-fade-up delay-100">
        {views.map(v => (
          <button
            key={v.key}
            onClick={() => setActiveView(v.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
              activeView === v.key ? 'bg-card shadow-sm text-[#b4ff39]' : 'text-zinc-500 hover:text-white'
            }`}
          >
            <v.icon className="w-4 h-4" />
            {v.label}
          </button>
        ))}
      </div>

      {/* 全国概览 - 省份热力图 */}
      {activeView === 'province' && (
        <div className="space-y-5 animate-fade-up">
          {/* 图例 */}
          <div className="topo-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold">难度图例</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {DIFFICULTY_SCALE.map(d => (
                <div key={d.level} className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded ${diffColorMap[d.level]}`} />
                  <span className="text-xs">{d.level}</span>
                  <span className="text-[10px] text-zinc-500">({d.range})</span>
                </div>
              ))}
            </div>
          </div>

          {/* 筛选 + 搜索 */}
          <div className="flex gap-3 items-center flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => setDiffFilter('all')}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  diffFilter === 'all' ? 'bg-[#b4ff39] text-black' : 'bg-white/[0.04] text-zinc-500 hover:bg-muted/80'
                }`}
              >全部</button>
              {DIFFICULTY_SCALE.map(d => (
                <button
                  key={d.level}
                  onClick={() => setDiffFilter(d.level)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    diffFilter === d.level ? `${diffBgMap[d.level]} ${diffTextMap[d.level]} font-medium border ${diffColorMap[d.level]}/20` : 'bg-white/[0.04] text-zinc-500 hover:bg-muted/80'
                  }`}
                >{d.level}</button>
              ))}
            </div>
            <div className="relative ml-auto">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索省份"
                className="pl-9 pr-3 py-1.5 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-[#b4ff39]/30 w-32"
              />
            </div>
          </div>

          {/* 省份网格热力图 */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {filteredProvinces.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelectedProvince(p.id)}
                className={`relative p-3 rounded-xl border-2 transition-all card-hover text-center animate-scale-in ${
                  selectedProvince === p.id
                    ? 'border-[#b4ff39] shadow-md ring-2 ring-[#b4ff39]/20'
                    : 'border-transparent hover:border-[rgba(255,255,255,0.06)]'
                }`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ${diffColorMap[p.difficulty]}`} />
                <div className="text-lg font-serif font-bold mb-0.5">{p.short}</div>
                <div className="text-[10px] text-zinc-500 truncate">{p.name}</div>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${diffColorMap[p.difficulty]} animate-progress`}
                    style={{ width: `${Math.min(100, p.avgRatio * 1.3)}%` }}
                  />
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">{p.avgRatio}:1</div>
              </button>
            ))}
          </div>

          {/* 选中省份详情 */}
          {selectedData && (
            <div className="topo-card p-5 animate-fade-up">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${diffBgMap[selectedData.difficulty]} flex items-center justify-center`}>
                  <span className="text-xl font-serif font-bold">{selectedData.short}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedData.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${diffBgMap[selectedData.difficulty]} ${diffTextMap[selectedData.difficulty]} font-medium`}>
                      {selectedData.difficulty}
                    </span>
                    <span className="text-xs text-zinc-500">平均竞争比 {selectedData.avgRatio}:1</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <div className="text-2xl font-bold font-serif text-[#b4ff39]">{selectedData.posts.toLocaleString()}</div>
                  <div className="text-[10px] text-zinc-500 mt-1">招录岗位</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <div className="text-2xl font-bold font-serif">{selectedData.avgRatio}:1</div>
                  <div className="text-[10px] text-zinc-500 mt-1">平均竞争比</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-muted/30">
                  <div className="text-sm font-bold font-serif">{selectedData.salary}</div>
                  <div className="text-[10px] text-zinc-500 mt-1">薪资范围</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-zinc-500 mb-2">热门城市</div>
                <div className="flex gap-2 flex-wrap">
                  {selectedData.hotCities.map(c => (
                    <span key={c} className="text-xs px-3 py-1 rounded-full bg-[#b4ff39]/8 text-[#b4ff39]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              {/* 竞争比柱状图 */}
              <div className="mt-4">
                <div className="text-xs font-medium text-zinc-500 mb-2">竞争比可视化</div>
                <div className="h-4 rounded-full bg-white/[0.04] overflow-hidden relative">
                  <div
                    className={`h-full rounded-full ${diffColorMap[selectedData.difficulty]} animate-progress transition-all`}
                    style={{ width: `${Math.min(100, selectedData.avgRatio * 1.3)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white drop-shadow-sm">{selectedData.avgRatio}:1</span>
                  </div>
                </div>
                <div className="flex justify-between text-[9px] text-zinc-500 mt-1">
                  <span>0:1</span>
                  <span>35:1</span>
                  <span>70:1</span>
                </div>
              </div>
            </div>
          )}

          {/* 全国竞争比排行 */}
          <div className="topo-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#b4ff39]" />
              <h3 className="font-semibold">各省竞争比排行</h3>
            </div>
            <div className="space-y-2">
              {[...PROVINCE_DATA].sort((a, b) => b.avgRatio - a.avgRatio).slice(0, 10).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i < 3 ? 'bg-red-100 text-red-400' : 'bg-white/[0.04] text-zinc-500'
                  }`}>{i + 1}</span>
                  <span className="text-sm w-16 shrink-0">{p.name}</span>
                  <div className="flex-1 h-5 rounded-full bg-white/[0.04] overflow-hidden relative">
                    <div
                      className={`h-full rounded-full ${diffColorMap[p.difficulty]} animate-progress transition-all`}
                      style={{ width: `${Math.min(100, p.avgRatio * 1.3)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center pl-2">
                      <span className="text-[10px] font-bold text-white drop-shadow-sm">{p.avgRatio}:1</span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 w-20 text-right">{p.posts} 岗</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 地市详情 - 以山东为例 */}
      {activeView === 'city' && (
        <div className="space-y-5 animate-fade-up">
          <div className="topo-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-[#b4ff39]" />
              <h3 className="font-semibold">山东省地市难度分布</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#b4ff39]/10 text-[#b4ff39] ml-auto">示例省份</span>
            </div>
            <p className="text-xs text-zinc-500">点击各省概览页的省份卡片，可查看该省地市详情（当前以山东省为示例）</p>
          </div>

          {/* 地市热力网格 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CITY_DETAIL_SD.map((c, i) => (
              <div key={c.city} className={`topo-card p-4 card-hover border-l-4 animate-scale-in`} style={{ borderLeftColor: diffColorMap[c.difficulty].replace('bg-', '#'), animationDelay: `${i * 40}ms` }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{c.city}</h4>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${diffBgMap[c.difficulty]} ${diffTextMap[c.difficulty]} font-medium`}>
                    {c.difficulty}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${diffColorMap[c.difficulty]} animate-progress`}
                    style={{ width: `${Math.min(100, c.ratio * 1.2)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>{c.ratio}:1</span>
                  <span>{c.posts} 岗</span>
                </div>
                <div className="mt-2 text-[10px] text-zinc-500 truncate">
                  热门：{c.topPost} ({c.topRatio})
                </div>
              </div>
            ))}
          </div>

          {/* 地市竞争比柱状图 */}
          <div className="topo-card p-5">
            <h3 className="font-semibold mb-4">16 地市竞争比柱状图</h3>
            <div className="flex items-end gap-1 h-48 px-2">
              {CITY_DETAIL_SD.map((c, i) => {
                const height = Math.max(10, (c.ratio / 90) * 100);
                return (
                  <div key={c.city} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[8px] text-zinc-500 font-medium">{c.ratio}</span>
                    <div
                      className={`w-full rounded-t-md ${diffColorMap[c.difficulty]} animate-bar-rise transition-all`}
                      style={{ height: `${height}%`, animationDelay: `${i * 50}ms` }}
                    />
                    <span className="text-[8px] text-zinc-500 truncate w-full text-center">{c.city}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 岗位分布 */}
      {activeView === 'posts' && (
        <div className="space-y-5 animate-fade-up">
          {/* 岗位类型分布 - 横向条形图 */}
          <div className="topo-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-[#b4ff39]" />
              <h3 className="font-semibold">全国岗位类型分布</h3>
            </div>
            <div className="space-y-3">
              {POST_DISTRIBUTION.map((p, i) => (
                <div key={p.type} className="animate-slide-right" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.color }} />
                      <span className="text-sm">{p.type}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${diffBgMap[p.difficulty as DiffLevel] || 'bg-muted'} ${diffTextMap[p.difficulty as DiffLevel] || 'text-zinc-500'}`}>
                        {p.difficulty}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{p.count.toLocaleString()}</span>
                      <span className="text-[10px] text-zinc-500 ml-1">({p.ratio}%)</span>
                    </div>
                  </div>
                  <div className="h-6 rounded-lg bg-white/[0.03] overflow-hidden relative">
                    <div
                      className="h-full rounded-lg animate-progress transition-all"
                      style={{ width: `${p.ratio * 4}%`, backgroundColor: p.color }}
                    />
                    <div className="absolute inset-0 flex items-center pl-3">
                      <span className="text-[10px] font-bold text-white drop-shadow-sm">{p.ratio}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 饼图式占比（CSS实现） */}
          <div className="topo-card p-5">
            <h3 className="font-semibold mb-4">岗位占比环形图</h3>
            <div className="flex items-center gap-6 justify-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {POST_DISTRIBUTION.reduce<{ offset: number; elements: React.ReactNode[] }>((acc, p, i) => {
                    const dashArray = `${p.ratio} ${100 - p.ratio}`;
                    const el = (
                      <circle
                        key={p.type}
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke={p.color}
                        strokeWidth="18"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-acc.offset}
                        className="transition-all duration-700"
                      />
                    );
                    return { offset: acc.offset + p.ratio, elements: [...acc.elements, el] };
                  }, { offset: 0, elements: [] }).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold font-serif">12.9万</span>
                  <span className="text-[10px] text-zinc-500">总岗位数</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {POST_DISTRIBUTION.slice(0, 5).map(p => (
                  <div key={p.type} className="flex items-center gap-2 text-xs">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: p.color }} />
                    <span>{p.type}</span>
                    <span className="text-zinc-500">{p.ratio}%</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <div className="w-2.5 h-2.5 rounded-sm bg-gray-400 shrink-0" />
                  <span>其他 4 类合计</span>
                  <span>15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 国考系统 */}
      {activeView === 'guokao' && (
        <div className="space-y-5 animate-fade-up">
          <div className="topo-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-[#b4ff39]" />
              <h3 className="font-semibold">国考热门系统竞争分析</h3>
            </div>

            <div className="space-y-3">
              {[...GUOKAO_SYSTEMS].sort((a, b) => b.ratio - a.ratio).map((s, i) => (
                <div key={s.name} className="p-4 rounded-xl border border-[rgba(255,255,255,0.06)]/50 card-hover animate-slide-right" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        i < 3 ? 'bg-red-100 text-red-400' : 'bg-white/[0.04] text-zinc-500'
                      }`}>{i + 1}</span>
                      <h4 className="font-semibold text-sm">{s.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${diffBgMap[s.difficulty]} ${diffTextMap[s.difficulty]} font-medium`}>
                        {s.difficulty}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">{s.salary}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                        <span>竞争比</span>
                        <span>{s.ratio}:1</span>
                      </div>
                      <div className="h-3 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${diffColorMap[s.difficulty]} animate-progress`}
                          style={{ width: `${Math.min(100, s.ratio * 1.2)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-center w-20 shrink-0">
                      <div className="text-sm font-bold font-serif">{s.posts.toLocaleString()}</div>
                      <div className="text-[9px] text-zinc-500">岗位数</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 国考系统岗位数对比 */}
          <div className="topo-card p-5">
            <h3 className="font-semibold mb-4">各系统岗位数对比</h3>
            <div className="flex items-end gap-2 h-44 px-2">
              {GUOKAO_SYSTEMS.map((s, i) => {
                const maxPosts = Math.max(...GUOKAO_SYSTEMS.map(x => x.posts));
                const height = Math.max(8, (s.posts / maxPosts) * 100);
                return (
                  <div key={s.name} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[8px] text-zinc-500">{(s.posts / 1000).toFixed(1)}k</span>
                    <div
                      className={`w-full rounded-t-md ${diffColorMap[s.difficulty]} animate-bar-rise`}
                      style={{ height: `${height}%`, animationDelay: `${i * 60}ms` }}
                    />
                    <span className="text-[7px] text-zinc-500 truncate w-full text-center leading-tight">{s.name.slice(0, 2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
