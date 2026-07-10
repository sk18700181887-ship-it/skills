'use client';

import { useState } from 'react';
import { Compass, Search, ChevronRight, Sparkles, BookOpen, GraduationCap, Shield, Building2, Heart, Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EXAM_TYPES = [
  { name: '国考', icon: Shield, accent: 'text-rose-400', desc: '中央及国家机关公务员', salary: '15-25万/年', difficulty: '★★★★★', ratio: '60:1', period: '每年11月底笔试' },
  { name: '省考', icon: Building2, accent: 'text-sky-400', desc: '省、市、县、乡四级机关', salary: '10-20万/年', difficulty: '★★★★☆', ratio: '40:1', period: '各省不同，多为4月' },
  { name: '事业单位', icon: Heart, accent: 'text-emerald-400', desc: '教育、医疗、科研等公益岗', salary: '8-15万/年', difficulty: '★★★☆☆', ratio: '25:1', period: '全年分散招录' },
  { name: '选调生', icon: GraduationCap, accent: 'text-violet-400', desc: '党政领导干部后备人才', salary: '12-22万/年', difficulty: '★★★★☆', ratio: '20:1', period: '每年12月-次年1月' },
  { name: '三支一扶', icon: BookOpen, accent: 'text-amber-400', desc: '支教、支农、支医、帮扶', salary: '5-8万/年', difficulty: '★★☆☆☆', ratio: '10:1', period: '每年4-6月' },
  { name: '军队文职', icon: Swords, accent: 'text-indigo-400', desc: '军队编制非现役岗位', salary: '10-18万/年', difficulty: '★★★☆☆', ratio: '15:1', period: '每年3-4月' },
];

const FAQ = [
  { q: '应届生身份有多重要？', a: '非常重要！国考约70%岗位限应届，省考约40%。不要随便签劳动合同或三方协议，否则失去应届资格。' },
  { q: '考公和考研怎么选？', a: '看你的核心诉求。想进体制选考公，想深造选考研。如果本科专业冷门，考研换专业后再考公也是常见策略。' },
  { q: '行测申论各占多少分？', a: '国考/省考行测申论各100分，总分200。行测全是客观题，申论为主观题。事业单位考公基+综合写作。' },
  { q: '备考需要多长时间？', a: '零基础建议6-8个月系统备考。3-4个月适合有基础的。1个月突击仅适合部分模块提分。' },
  { q: '党员对考公有多大优势？', a: '选调生必须党员或预备党员。普通岗位有部分限党员岗位，竞争比一般低30%。建议在校积极入党。' },
];

export default function ExplorePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [typing, setTyping] = useState(false);

  const handleAsk = () => {
    if (!query.trim()) return;
    setTyping(true);
    setAiAnswer('');
    const answer = `关于"${query}"：考公报名需关注国家公务员局官网，每年10月中旬发布公告，11月底笔试。建议先确认自身条件（专业、学历、政治面貌），再筛选合适岗位。如需更详细分析，可使用「AI 岗位匹配」功能获取个性化推荐。`;
    let i = 0;
    const timer = setInterval(() => {
      setAiAnswer(answer.slice(0, i + 1));
      i++;
      if (i >= answer.length) { clearInterval(timer); setTyping(false); }
    }, 20);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* 页面头部 */}
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Compass className="w-6 h-6 text-[#b4ff39]" /> 了解考公
        </h1>
        <p className="text-sm text-zinc-500 mt-2">6 类公职考试全景对比 + AI 考公百科，帮你找到最适合的路</p>
      </div>

      {/* AI 考公百科 */}
      <div className="topo-card p-6 animate-fade-up delay-75">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-[#b4ff39]/10 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-[#b4ff39]" />
          </div>
          <h2 className="font-semibold text-lg">AI 考公百科</h2>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#b4ff39]/10 text-[#b4ff39] font-medium">免费</span>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="输入考公问题，如：应届生能报哪些岗位？"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            className="flex-1 bg-[var(--surface-1)] border-[rgba(255,255,255,0.06)] text-white placeholder:text-zinc-600"
          />
          <Button onClick={handleAsk} disabled={typing} className="bg-[#b4ff39] text-black hover:bg-[#c5ff6b] btn-press font-medium">
            <Search className="w-4 h-4 mr-1" /> 提问
          </Button>
        </div>
        {aiAnswer && (
          <div className="mt-4 p-4 rounded-xl bg-[#b4ff39]/5 border border-[#b4ff39]/10 animate-fade-up">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#b4ff39] mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed text-zinc-300">{aiAnswer}<span className={typing ? 'typing-caret' : ''} /></p>
            </div>
          </div>
        )}
      </div>

      {/* 6 类考试对比 */}
      <div className="animate-fade-up delay-150">
        <h2 className="text-lg font-bold mb-5">6 类公职考试对比</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXAM_TYPES.map((exam, i) => (
            <div key={exam.name} className={`topo-card p-5 card-hover animate-scale-in`} style={{animationDelay:`${(i+1)*75}ms`}}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${exam.accent}`}>
                  <exam.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{exam.name}</h3>
                  <p className="text-[10px] text-zinc-500">{exam.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/[0.03]">
                  <span className="text-zinc-500">薪资范围</span>
                  <p className="font-semibold mt-0.5 text-zinc-200">{exam.salary}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03]">
                  <span className="text-zinc-500">竞争比</span>
                  <p className="font-semibold mt-0.5 text-zinc-200">{exam.ratio}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03]">
                  <span className="text-zinc-500">难度</span>
                  <p className="font-semibold mt-0.5 text-zinc-200">{exam.difficulty}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03]">
                  <span className="text-zinc-500">笔试时间</span>
                  <p className="font-semibold mt-0.5 text-zinc-200">{exam.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 常见问题 FAQ */}
      <div className="animate-fade-up delay-300">
        <h2 className="text-lg font-bold mb-5">考公常见问题</h2>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <div
              key={i}
              className={`topo-card overflow-hidden transition-all duration-300 cursor-pointer ${faqOpen === i ? 'ring-1 ring-[#b4ff39]/20' : ''}`}
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="p-4 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#b4ff39]/10 flex items-center justify-center text-xs font-bold text-[#b4ff39] shrink-0">Q</span>
                <span className="text-sm font-medium flex-1">{f.q}</span>
                <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${faqOpen === i ? 'rotate-90' : ''}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${faqOpen === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4 text-sm text-zinc-400 leading-relaxed" style={{paddingLeft: '52px'}}>
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
