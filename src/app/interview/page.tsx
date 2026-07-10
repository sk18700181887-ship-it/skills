'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Sparkles, Clock, MessageSquare, Star, RotateCcw, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INTERVIEW_TYPES, INTERVIEW_QUESTION } from '@/lib/data';

export default function InterviewPage() {
  const [activeType, setActiveType] = useState(0);
  const [phase, setPhase] = useState<'ready' | 'answering' | 'feedback'>('ready');
  const [recording, setRecording] = useState(false);
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const q = INTERVIEW_QUESTION;

  useEffect(() => {
    if (phase === 'answering') {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  const formatTime = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const startAnswering = () => { setPhase('answering'); setTimer(0); setRecording(true); };
  const submitAnswer = () => { setRecording(false); setPhase('feedback'); if (timerRef.current) clearInterval(timerRef.current); };
  const reset = () => { setPhase('ready'); setAnswer(''); setTimer(0); setRecording(false); };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="animate-fade-up">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Mic className="w-6 h-6 text-[#b4ff39]" /> AI 面试模拟
        </h1>
        <p className="text-sm text-zinc-500 mt-1">4 大题型实战 + 实时点评 + 高分技巧</p>
      </div>

      {/* 题型选择 */}
      <div className="flex gap-2 flex-wrap animate-fade-up delay-75">
        {INTERVIEW_TYPES.map((t, i) => (
          <button key={i} onClick={() => { setActiveType(i); reset(); }}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
              i === activeType ? 'bg-[#b4ff39] text-black shadow-md' : 'bg-white/[0.04] card-hover'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {/* 题目区 */}
        <div className="md:col-span-3 space-y-4">
          <div className="topo-card p-5 animate-fade-up delay-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#b4ff39]/10 text-[#b4ff39] font-medium">{INTERVIEW_TYPES[activeType].name}</span>
              <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> 建议时长 3 分钟</span>
            </div>
            <p className="text-sm leading-relaxed font-medium">{q.question}</p>
            <p className="text-xs text-zinc-500 mt-2">{INTERVIEW_TYPES[activeType].structure}</p>
          </div>

          {/* 答题区 */}
          {phase === 'ready' && (
            <div className="topo-card p-5 text-center animate-fade-up delay-150">
              <Mic className="w-12 h-12 text-[#b4ff39] mx-auto mb-3 animate-pulse-glow" />
              <p className="text-sm text-zinc-500 mb-4">点击开始作答，AI 将实时记录你的回答</p>
              <Button onClick={startAnswering} className="btn-press"><Mic className="w-4 h-4 mr-2" /> 开始作答</Button>
            </div>
          )}

          {phase === 'answering' && (
            <div className="topo-card p-5 border-[#b4ff39]/30 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {recording ? <Mic className="w-4 h-4 text-rose-500 animate-pulse" /> : <MicOff className="w-4 h-4 text-zinc-500" />}
                  <span className="text-xs font-medium">{recording ? '正在录音...' : '已暂停'}</span>
                </div>
                <span className="text-lg font-mono font-bold text-[#b4ff39]">{formatTime(timer)}</span>
              </div>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder="在此输入你的口头作答要点..."
                className="w-full h-36 p-3 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#b4ff39]/30 bg-transparent"
              />
              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => setRecording(!recording)} className="flex-1">
                  {recording ? <><MicOff className="w-3 h-3 mr-1" /> 暂停</> : <><Mic className="w-3 h-3 mr-1" /> 继续</>}
                </Button>
                <Button onClick={submitAnswer} className="flex-1 btn-press">
                  <Send className="w-3 h-3 mr-1" /> 提交作答
                </Button>
              </div>
            </div>
          )}

          {phase === 'feedback' && (
            <div className="space-y-3 animate-fade-up">
              <div className="topo-card p-5 border-emerald-200 bg-emerald-400/10/50">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" /> AI 点评
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>优点：</strong>答题结构清晰，逻辑层次分明，能从多角度分析问题。</p>
                  <p><strong>不足：</strong>对策部分略显空泛，建议更具体化；可增加个人理解与岗位结合的深度。</p>
                </div>
              </div>
              <div className="topo-card p-5">
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#b4ff39]" /> 高分示范
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  这道综合分析题，建议采用"表态→分析→对策→升华"四步法。首先明确观点，其次从原因和影响两个维度深入分析，然后提出2-3条具体可行的对策，最后升华到更高站位。注意对策要有针对性，避免泛泛而谈。
                </p>
              </div>
              <Button variant="outline" onClick={reset} className="w-full">
                <RotateCcw className="w-3 h-3 mr-1" /> 再练一题
              </Button>
            </div>
          )}
        </div>

        {/* 侧边：题型技巧 */}
        <div className="md:col-span-2 space-y-3">
          <div className="topo-card p-4 animate-fade-up delay-150">
            <h3 className="font-semibold text-xs mb-3 flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-[#b4ff39]" /> 题型技巧
            </h3>
            <div className="space-y-2">
              {INTERVIEW_TYPES.map((t, i) => (
                <div key={i} className={`p-2.5 rounded-lg text-xs transition-all duration-300 ${i === activeType ? 'bg-[#b4ff39]/10 border border-[#b4ff39]/20' : 'bg-white/[0.03]'}`}>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{t.structure}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
