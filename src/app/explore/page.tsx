'use client';

import { useState } from 'react';
import { Compass, Search, ChevronRight, Sparkles, BookOpen, GraduationCap, Shield, Building2, Heart, Swords } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EXAM_TYPES = [
  { name: '国考', icon: Shield, color: 'text-rose-600 bg-rose-50', desc: '中央及国家机关公务员', salary: '15-25万/年', difficulty: '★★★★★', ratio: '60:1', period: '每年11月底笔试' },
  { name: '省考', icon: Building2, color: 'text-sky-600 bg-sky-50', desc: '省、市、县、乡四级机关', salary: '10-20万/年', difficulty: '★★★★☆', ratio: '40:1', period: '各省不同，多为4月' },
  { name: '事业单位', icon: Heart, color: 'text-emerald-600 bg-emerald-50', desc: '教育、医疗、科研等公益岗', salary: '8-15万/年', difficulty: '★★★☆☆', ratio: '25:1', period: '全年分散招录' },
  { name: '选调生', icon: GraduationCap, color: 'text-violet-600 bg-violet-50', desc: '党政领导干部后备人才', salary: '12-22万/年', difficulty: '★★★★☆', ratio: '20:1', period: '每年12月-次年1月' },
  { name: '三支一扶', icon: BookOpen, color: 'text-amber-600 bg-amber-50', desc: '支教、支农、支医、帮扶', salary: '5-8万/年', difficulty: '★★☆☆☆', ratio: '10:1', period: '每年4-6月' },
  { name: '军队文职', icon: Swords, color: 'text-indigo-600 bg-indigo-50', desc: '军队编制非现役岗位', salary: '10-18万/年', difficulty: '★★★☆☆', ratio: '15:1', period: '每年3-4月' },
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
    const answer = `关于"${query}"：考公报名需关注国家公务员局官网（bm.scs.gov.cn），每年10月中旬发布公告，11月底笔试。建议先确认自身条件（专业、学历、政治面貌），再筛选合适岗位。如需更详细分析，可使用「AI 岗位匹配」功能获取个性化推荐。`;
    let i = 0;
    const timer = setInterval(() => {
      setAiAnswer(answer.slice(0, i + 1));
      i++;
      if (i >= answer.length) { clearInterval(timer); setTyping(false); }
    }, 20);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* 页面头部 */}
      <div className="animate-fade-up">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Compass className="w-5 h-5 text-primary" /> 了解考公
        </h1>
        <p className="text-sm text-muted-foreground mt-1">6 类公职考试全景对比 + AI 考公百科，帮你找到最适合的路</p>
      </div>

      {/* AI 考公百科 */}
      <Card className="p-5 animate-fade-up delay-75">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-semibold">AI 考公百科</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">免费</span>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="输入考公问题，如：应届生能报哪些岗位？"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            className="flex-1"
          />
          <Button onClick={handleAsk} disabled={typing} className="btn-press">
            <Search className="w-4 h-4 mr-1" /> 提问
          </Button>
        </div>
        {aiAnswer && (
          <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/50 animate-fade-up">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed">{aiAnswer}<span className={typing ? 'typing-caret' : ''} /></p>
            </div>
          </div>
        )}
      </Card>

      {/* 6 类考试对比 */}
      <div className="animate-fade-up delay-150">
        <h2 className="text-lg font-bold mb-4">6 类公职考试对比</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXAM_TYPES.map((exam, i) => (
            <Card key={exam.name} className={`p-4 card-hover animate-scale-in delay-${(i+1)*75}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${exam.color} flex items-center justify-center`}>
                  <exam.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{exam.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{exam.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">薪资范围</span>
                  <p className="font-semibold mt-0.5">{exam.salary}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">竞争比</span>
                  <p className="font-semibold mt-0.5">{exam.ratio}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">难度</span>
                  <p className="font-semibold mt-0.5">{exam.difficulty}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">笔试时间</span>
                  <p className="font-semibold mt-0.5">{exam.period}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 常见问题 FAQ */}
      <div className="animate-fade-up delay-300">
        <h2 className="text-lg font-bold mb-4">考公常见问题</h2>
        <div className="space-y-2">
          {FAQ.map((f, i) => (
            <Card
              key={i}
              className={`overflow-hidden transition-all duration-300 cursor-pointer ${faqOpen === i ? 'ring-1 ring-primary/30' : ''}`}
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <div className="p-4 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">Q</span>
                <span className="text-sm font-medium flex-1">{f.q}</span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${faqOpen === i ? 'rotate-90' : ''}`} />
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${faqOpen === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4 pl-13 text-sm text-muted-foreground leading-relaxed" style={{paddingLeft: '52px'}}>
                  {f.a}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
