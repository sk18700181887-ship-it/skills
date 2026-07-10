'use client';

import { useState } from 'react';
import {
  BookHeart, Sparkles, Heart, MessageCircle, TreePine,
  Send, ChevronRight, Quote, Star, Flame, Plus,
  ArrowLeft, Tag, Clock, Users
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MOOD_OPTIONS, AI_ENCOURAGEMENTS, DIARY_ENTRIES, ENERGY_QUOTES, TREE_HOLE_TOPICS, CHECKIN_MILESTONES } from '@/lib/data';

type Tab = 'diary' | 'write' | 'treehole' | 'energy';

export default function DiaryPage() {
  const [activeTab, setActiveTab] = useState<Tab>('diary');
  const [writeMood, setWriteMood] = useState<string>('');
  const [writeContent, setWriteContent] = useState('');
  const [writeTags, setWriteTags] = useState<string[]>([]);
  const [aiReply, setAiReply] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const TAG_OPTIONS = ['行测', '申论', '公基', '模考', '焦虑', '突破', '打卡', '面试', '生活', '决心'];

  const handleSaveDiary = () => {
    if (!writeContent.trim()) return;
    const msgs = AI_ENCOURAGEMENTS[writeMood || 'normal'] || AI_ENCOURAGEMENTS['normal'];
    setAiReply(msgs[0]);
    setShowReply(true);
  };

  const toggleTag = (tag: string) => {
    setWriteTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'diary', label: '我的日记', icon: BookHeart },
    { key: 'write', label: '写日记', icon: Plus },
    { key: 'treehole', label: '情绪树洞', icon: TreePine },
    { key: 'energy', label: '能量站', icon: Star },
  ];

  return (
    <div className="hero-reveal space-y-6 max-w-4xl">
      {/* 页头 */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <Link href="/" className="text-zinc-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold">上岸日记</h1>
        </div>
        <p className="text-sm text-zinc-500">记录备考心路，AI 陪你走过每一段情绪</p>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-1 p-1 bg-white/[0.03] rounded-xl animate-fade-up delay-100">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.key
                ? 'bg-card shadow-sm text-[#b4ff39]'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            <t.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* 日记列表 */}
      {activeTab === 'diary' && (
        <div className="hero-reveal space-y-4 animate-fade-up">
          {/* 打卡里程碑进度 */}
          <div className="topo-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold">打卡徽章墙</span>
              <span className="text-xs text-zinc-500 ml-auto">连续 25 天</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CHECKIN_MILESTONES.map(m => (
                <div
                  key={m.days}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    m.days <= 25
                      ? 'bg-[#b4ff39]/10 text-[#b4ff39] border border-[#b4ff39]/20'
                      : 'bg-white/[0.04] text-zinc-500 border border-[rgba(255,255,255,0.06)]/50'
                  }`}
                >
                  <span>{m.icon}</span>
                  <span>{m.title}</span>
                  {m.days > 25 && <span className="text-[10px] opacity-60">({m.days}天)</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 日记条目 */}
          {DIARY_ENTRIES.map((entry) => {
            const mood = MOOD_OPTIONS.find(m => m.id === entry.mood);
            const isExpanded = expandedEntry === entry.id;
            return (
              <div key={entry.id} className="topo-card p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{mood?.emoji || '📝'}</span>
                    <div>
                      <span className="text-sm font-medium">{entry.date}</span>
                      <span className="text-xs text-zinc-500 ml-2">{mood?.label}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className={`text-sm text-zinc-300 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                  {entry.content}
                </p>
                {!isExpanded && entry.content.length > 80 && (
                  <button
                    onClick={() => setExpandedEntry(entry.id)}
                    className="text-xs text-[#b4ff39] mt-1 hover:underline"
                  >
                    展开全文
                  </button>
                )}
                {isExpanded && (
                  <button
                    onClick={() => setExpandedEntry(null)}
                    className="text-xs text-[#b4ff39] mt-1 hover:underline"
                  >
                    收起
                  </button>
                )}
                {/* AI 回复 */}
                <div className="mt-3 p-3 bg-[#b4ff39]/5 rounded-lg border border-[#b4ff39]/10">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#b4ff39]" />
                    <span className="text-xs font-semibold text-[#b4ff39]">AI 陪你聊</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{entry.aiReply}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 写日记 */}
      {activeTab === 'write' && (
        <div className="hero-reveal space-y-4 animate-fade-up">
          <div className="topo-card p-5">
            <h3 className="font-semibold mb-4">今天想写点什么？</h3>

            {/* 心情选择 */}
            <div className="mb-4">
              <label className="text-sm text-zinc-500 mb-2 block">现在的心情</label>
              <div className="flex flex-wrap gap-2">
                {MOOD_OPTIONS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setWriteMood(m.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                      writeMood === m.id
                        ? 'bg-[#b4ff39]/10 border-2 border-[#b4ff39]/30 ring-1 ring-[#b4ff39]/20'
                        : 'bg-white/[0.03] border border-transparent hover:bg-muted'
                    }`}
                  >
                    <span className="text-lg">{m.emoji}</span>
                    <span className={writeMood === m.id ? 'text-[#b4ff39] font-medium' : 'text-zinc-500'}>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 内容 */}
            <div className="mb-4">
              <label className="text-sm text-zinc-500 mb-2 block">日记内容</label>
              <textarea
                value={writeContent}
                onChange={e => setWriteContent(e.target.value)}
                placeholder="写下今天的感受、学习进度、遇到的困难……AI 会在你保存后回复你"
                className="w-full h-40 p-3 rounded-xl border bg-transparent text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-[#b4ff39]/30 placeholder:text-zinc-500/60"
              />
            </div>

            {/* 标签 */}
            <div className="mb-4">
              <label className="text-sm text-zinc-500 mb-2 block">标签（可选）</label>
              <div className="flex flex-wrap gap-2">
                {TAG_OPTIONS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-3 py-1 rounded-full transition-all ${
                      writeTags.includes(tag)
                        ? 'bg-[#b4ff39]/10 text-[#b4ff39] border border-[#b4ff39]/20'
                        : 'bg-white/[0.04] text-zinc-500 border border-transparent hover:bg-muted/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSaveDiary}
              disabled={!writeContent.trim()}
              className="w-full btn-press"
            >
              <Send className="w-4 h-4 mr-2" />
              保存日记，让 AI 陪你聊
            </Button>

            {/* AI 回复 */}
            {showReply && aiReply && (
              <div className="mt-4 p-4 bg-[#b4ff39]/5 rounded-xl border border-[#b4ff39]/10 animate-scale-in">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#b4ff39]" />
                  <span className="text-sm font-semibold text-[#b4ff39]">AI 陪你聊</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{aiReply}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 情绪树洞 */}
      {activeTab === 'treehole' && (
        <div className="hero-reveal space-y-4 animate-fade-up">
          <div className="topo-card p-5 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 opacity-5">
              <TreePine className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-5 h-5 text-emerald-500" />
              <h3 className="font-semibold">情绪树洞</h3>
            </div>
            <p className="text-sm text-zinc-500 mb-4">
              匿名分享你的备考心事，这里没有评判，只有理解和陪伴。
            </p>
          </div>

          <div className="hero-reveal space-y-3">
            {TREE_HOLE_TOPICS.map(topic => (
              <div key={topic.id} className="topo-card p-4 card-hover cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium truncate group-hover:text-[#b4ff39] transition-colors">{topic.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-500">{topic.tag}</span>
                        <span className="text-[10px] text-zinc-500 flex items-center gap-0.5">
                          <MessageCircle className="w-3 h-3" />
                          {topic.replies}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#b4ff39] transition-colors shrink-0" />
                </div>
              </div>
            ))}
          </div>

          <div className="topo-card p-5 border-dashed border-2">
            <div className="text-center">
              <Plus className="w-8 h-8 text-zinc-500/40 mx-auto mb-2" />
              <p className="text-sm text-zinc-500 mb-3">有话想说？匿名发布你的心事</p>
              <Button className="btn-press btn-press" size="sm">
                <Plus className="w-4 h-4 mr-1" /> 发布话题
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 能量站 */}
      {activeTab === 'energy' && (
        <div className="hero-reveal space-y-4 animate-fade-up">
          {/* 前辈寄语 */}
          <div className="topo-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold">前辈寄语</h3>
            </div>
            <div className="hero-reveal space-y-4">
              {ENERGY_QUOTES.slice(0, 4).map((q, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/30 hover:bg-white/[0.03] transition-colors">
                  <Quote className="w-4 h-4 text-[#b4ff39]/40 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/85 leading-relaxed">「{q.text}」</p>
                    <p className="text-xs text-zinc-500 mt-1">—— {q.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 上岸故事 */}
          <div className="topo-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="font-semibold">上岸故事</h3>
            </div>
            <div className="hero-reveal space-y-3">
              {[
                { name: '张同学', from: '行测 58 → 78', story: '从迷茫到上岸，我用了 168 天。最难的不是做题，是每天对自己说"再坚持一天"。', days: 168 },
                { name: '刘同学', from: '申论 28 → 42', story: '申论 AI 批改帮我找到了"假大空"的问题，从 28 分到 42 分，每一篇批改都是一次蜕变。', days: 232 },
                { name: '赵同学', from: '面试小白 → 86 分', story: 'AI 面试模拟练了 40+ 次，从张不开嘴到对答如流。最后一次模拟打了 83 分，真实面试 86 分。', days: 195 },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-xl border border-[rgba(255,255,255,0.06)]/50 card-hover">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#b4ff39]/10 flex items-center justify-center text-xs font-bold text-[#b4ff39]">
                        {s.name[0]}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{s.name}</span>
                        <div className="text-[10px] text-emerald-400">{s.from}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.days} 天
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{s.story}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 备考金句卡片 */}
          <div className="topo-card p-5 relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-amber-50/30">
            <div className="absolute -bottom-8 -right-8 opacity-5">
              <Sparkles className="w-32 h-32" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#b4ff39]" />
              <h3 className="font-semibold">今日金句</h3>
            </div>
            <div className="text-center py-4">
              <p className="text-lg font-serif text-white/90 leading-relaxed mb-2">
                「那些你熬过的夜，终将变成上岸的光。」
              </p>
              <p className="text-xs text-zinc-500">—— 上岸学员·王同学</p>
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <Button className="btn-press text-xs btn-press" size="sm">
                <Heart className="w-3 h-3 mr-1" /> 收藏
              </Button>
              <Button className="btn-press text-xs btn-press" size="sm">
                换一句
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
