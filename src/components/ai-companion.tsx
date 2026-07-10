'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Heart } from 'lucide-react';
import { AI_ENCOURAGEMENTS } from '@/lib/data';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  time: string;
}

const QUICK_REPLIES = [
  '今天学得好累',
  '模考成绩不理想',
  '有点焦虑',
  '想放弃怎么办',
  '申论总是写不好',
  '给自己打打气',
];

const AI_RESPONSES: Record<string, string> = {
  '今天学得好累': '累了说明你真的在认真付出。给自己泡杯热水，今晚早点休息。明天带着好状态再战，效率比硬撑更重要。',
  '模考成绩不理想': '模考的目的是发现问题，不是定义你。每一道错题都是你提分的机会。把今天的错题复盘一遍，你就已经比考前的自己更强了。',
  '有点焦虑': '焦虑是考公路上的老朋友，它来了，说明你很在乎。试着深呼吸三次，然后做一道你最擅长的题找找手感。你比自己想象的要强。',
  '想放弃怎么办': '放弃的念头每个人都有过。但你已经走到了这里，回头和向前走一样难。不如再试一天，一天就够了。也许明天就是转折点。',
  '申论总是写不好': '申论是最需要积累的模块，进步不会一夜之间。但每写一篇，你都在靠近目标。坚持用 AI 批改，找到自己的"假大空"陷阱，突破就是时间问题。',
  '给自己打打气': '你已经坚持了这么多天，打败了无数次想放弃的念头，这本身就是了不起的成就。上岸不是一个终点，你在这个过程中成长的力量，会陪你走很远。加油！',
};

function getTimeStr() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function AICompanion() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'ai', content: '嗨，我是你的备考伙伴。学习累了、心情不好、想聊聊，随时点我。我会一直在。', time: getTimeStr() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const msgCounterRef = useRef(0);

  const getUniqueId = () => {
    msgCounterRef.current += 1;
    return `msg-${msgCounterRef.current}`;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: getUniqueId(), role: 'user', content: text, time: getTimeStr() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const aiText = AI_RESPONSES[text] || AI_ENCOURAGEMENTS['normal'][0];
      const aiMsg: Message = { id: getUniqueId(), role: 'ai', content: aiText, time: getTimeStr() };
      setMessages(prev => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 btn-press ${
          open ? 'bg-zinc-700 text-zinc-200' : 'bg-[#b4ff39] text-zinc-900 animate-pulse-glow'
        }`}
        aria-label="AI 陪伴"
      >
        {open ? <X className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#09090b]" />
        )}
      </button>

      {/* 聊天窗口 */}
      {open && (
        <div className="fixed bottom-22 right-6 z-50 w-[340px] max-h-[480px] bg-[#0f0f12] rounded-2xl shadow-2xl border border-[rgba(255,255,255,0.08)] flex flex-col animate-scale-in overflow-hidden">
          {/* 头部 */}
          <div className="shrink-0 p-4 border-b border-[rgba(255,255,255,0.06)] bg-[#b4ff39]/5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#b4ff39]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#b4ff39]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">备考伙伴</h4>
                <p className="text-[10px] text-zinc-500">AI 陪你走过每一段情绪</p>
              </div>
            </div>
          </div>

          {/* 消息区 */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 thin-scroll" style={{ maxHeight: '300px' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#b4ff39] text-zinc-900 rounded-br-md'
                    : 'bg-[var(--surface-2)] text-zinc-300 rounded-bl-md'
                }`}>
                  {msg.content}
                  <div className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-zinc-600' : 'text-zinc-600'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[var(--surface-2)] rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 快捷回复 */}
          <div className="shrink-0 px-3 py-2 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex gap-1.5 overflow-x-auto thin-scroll pb-1">
              {QUICK_REPLIES.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 hover:bg-[#b4ff39]/10 hover:text-[#b4ff39] transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* 输入框 */}
          <div className="shrink-0 p-3 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="说说你的感受…"
                className="flex-1 px-3 py-2 rounded-xl bg-[var(--surface-2)] text-xs text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#b4ff39]/30 placeholder:text-zinc-600"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-[#b4ff39] text-zinc-900 flex items-center justify-center disabled:opacity-30 btn-press"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
