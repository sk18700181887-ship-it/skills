'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MAJOR_CATEGORIES, EDUCATION_OPTIONS, EXAM_TYPE_OPTIONS,
  TARGET_PROVINCES, POLITICAL_STATUS, WORK_EXP_OPTIONS, CERT_OPTIONS,
} from '@/lib/data';

const STEPS = [
  { id: 1, title: '基本信息', sub: '你的身份和学历' },
  { id: 2, title: '专业方向', sub: '你的专业背景' },
  { id: 3, title: '报考意向', sub: '目标考试和地区' },
  { id: 4, title: '补充信息', sub: '证书和政治面貌' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', age: '', education: '', major: '', majorCategory: '',
    examTypes: [] as string[], provinces: [] as string[],
    politicalStatus: '', workExp: '', certs: [] as string[],
  });
  const [generating, setGenerating] = useState(false);

  const update = (key: string, value: string | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleArray = (key: 'examTypes' | 'provinces' | 'certs', val: string) => {
    setForm(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(val)
        ? (prev[key] as string[]).filter(v => v !== val)
        : [...(prev[key] as string[]), val],
    }));
  };

  const canNext = () => {
    if (step === 1) return form.name && form.education;
    if (step === 2) return form.major;
    if (step === 3) return form.examTypes.length > 0 && form.provinces.length > 0;
    return true;
  };

  const handleSubmit = () => {
    setGenerating(true);
    setTimeout(() => {
      router.push('/report');
    }, 2500);
  };

  /* ───── Chip 按钮 ───── */
  const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm border rounded-none transition-all duration-200
        ${active
          ? 'bg-[#b4ff39]/15 border-[#b4ff39]/40 text-[#b4ff39]'
          : 'bg-transparent border-white/8 text-zinc-400 hover:border-white/20 hover:text-zinc-300'}
      `}
    >
      {children}
    </button>
  );

  /* ───── 生成报告动画 ───── */
  if (generating) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-8">
          {/* 旋转的扫描圆环 */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border border-[#b4ff39]/20 rounded-none" />
            <div className="absolute inset-2 border-t-2 border-[#b4ff39] animate-spin" style={{ animationDuration: '1.5s' }} />
            <div className="absolute inset-4 border-r border-[#b4ff39]/40 animate-spin" style={{ animationDuration: '2.5s', animationDirection: 'reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#b4ff39] text-2xl font-mono">AI</span>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-serif font-light text-white">正在生成你的报考报告</h2>
            <p className="text-zinc-500 text-sm">AI 分析专业匹配 · 竞争预测 · 上岸概率</p>
          </div>
          {/* 进度条 */}
          <div className="w-64 mx-auto h-[2px] bg-zinc-800 overflow-hidden">
            <div className="h-full bg-[#b4ff39] animate-progress" style={{ animationDuration: '2.5s' }} />
          </div>
          {/* 分析步骤 */}
          <div className="space-y-2 text-xs font-mono text-zinc-600">
            <p className="animate-[fadeIn_0.3s_0.5s_both]">▸ 解析专业对口岗位池…</p>
            <p className="animate-[fadeIn_0.3s_1s_both]">▸ 匹配竞争比 & 上岸概率…</p>
            <p className="animate-[fadeIn_0.3s_1.5s_both]">▸ 生成冲稳保策略…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-10">

        {/* ── 步骤指示器 ── */}
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className={`
                w-8 h-8 flex items-center justify-center text-xs font-mono border rounded-none transition-all duration-300
                ${step > s.id ? 'bg-[#b4ff39] text-black border-[#b4ff39]'
                  : step === s.id ? 'border-[#b4ff39] text-[#b4ff39]'
                  : 'border-white/10 text-zinc-600'}
              `}>
                {step > s.id ? '✓' : `0${s.id}`}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px transition-colors duration-300 ${step > s.id ? 'bg-[#b4ff39]' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* ── 步骤标题 ── */}
        <div className="space-y-1">
          <p className="text-xs font-mono text-zinc-600">0{step}.</p>
          <h1 className="text-3xl font-serif font-light text-white">{STEPS[step - 1].title}</h1>
          <p className="text-zinc-500 text-sm">{STEPS[step - 1].sub}</p>
        </div>

        {/* ── 表单内容 ── */}
        <div className="min-h-[320px]">

          {/* Step 1: 基本信息 */}
          {step === 1 && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease_both]">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">姓名</label>
                <input
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  placeholder="输入你的姓名"
                  className="w-full bg-transparent border border-white/8 rounded-none px-4 py-3 text-white text-sm placeholder-zinc-700 focus:border-[#b4ff39]/40 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">年龄</label>
                <input
                  value={form.age}
                  onChange={e => update('age', e.target.value)}
                  placeholder="如 23"
                  type="number"
                  className="w-full bg-transparent border border-white/8 rounded-none px-4 py-3 text-white text-sm placeholder-zinc-700 focus:border-[#b4ff39]/40 focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">学历</label>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION_OPTIONS.map(e => (
                    <Chip key={e.id} active={form.education === e.id} onClick={() => update('education', e.id)}>
                      {e.label}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 专业方向 */}
          {step === 2 && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease_both]">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">专业大类</label>
                <div className="grid grid-cols-2 gap-2">
                  {MAJOR_CATEGORIES.map(c => (
                    <Chip key={c.id} active={form.majorCategory === c.id} onClick={() => { update('majorCategory', c.id); update('major', ''); }}>
                      {c.label}
                    </Chip>
                  ))}
                </div>
              </div>
              {form.majorCategory && (
                <div className="space-y-2 animate-[fadeIn_0.3s_ease_both]">
                  <label className="text-xs font-mono text-zinc-500">具体专业</label>
                  <div className="flex flex-wrap gap-2">
                    {MAJOR_CATEGORIES.find(c => c.id === form.majorCategory)?.majors.map(m => (
                      <Chip key={m} active={form.major === m} onClick={() => update('major', m)}>
                        {m}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: 报考意向 */}
          {step === 3 && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease_both]">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">目标考试类型（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {EXAM_TYPE_OPTIONS.map(e => (
                    <Chip key={e.id} active={form.examTypes.includes(e.id)} onClick={() => toggleArray('examTypes', e.id)}>
                      <span>{e.label}</span>
                      <span className="ml-1 text-zinc-600 text-xs">{e.desc}</span>
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">目标省份（可多选，最多 3 个）</label>
                <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto">
                  {TARGET_PROVINCES.map(p => (
                    <button
                      key={p}
                      onClick={() => form.provinces.length < 3 || form.provinces.includes(p) ? toggleArray('provinces', p) : undefined}
                      disabled={form.provinces.length >= 3 && !form.provinces.includes(p)}
                      className={`
                        px-2 py-1.5 text-xs border rounded-none transition-all duration-200
                        ${form.provinces.includes(p)
                          ? 'bg-[#b4ff39]/15 border-[#b4ff39]/40 text-[#b4ff39]'
                          : form.provinces.length >= 3
                            ? 'border-white/5 text-zinc-700 cursor-not-allowed'
                            : 'border-white/8 text-zinc-500 hover:border-white/20'}
                      `}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 补充信息 */}
          {step === 4 && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease_both]">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">政治面貌</label>
                <div className="flex flex-wrap gap-2">
                  {POLITICAL_STATUS.map(p => (
                    <Chip key={p} active={form.politicalStatus === p} onClick={() => update('politicalStatus', p)}>
                      {p}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">工作经历</label>
                <div className="flex flex-wrap gap-2">
                  {WORK_EXP_OPTIONS.map(w => (
                    <Chip key={w} active={form.workExp === w} onClick={() => update('workExp', w)}>
                      {w}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-500">已获证书（可多选）</label>
                <div className="flex flex-wrap gap-2">
                  {CERT_OPTIONS.map(c => (
                    <Chip key={c} active={form.certs.includes(c)} onClick={() => toggleArray('certs', c)}>
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 底部按钮 ── */}
        <div className="flex items-center justify-between pt-6 border-t border-white/6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← 上一步
            </button>
          ) : <div />}
          {step < 4 ? (
            <button
              onClick={() => canNext() && setStep(step + 1)}
              disabled={!canNext()}
              className={`
                px-8 py-2.5 text-sm rounded-none transition-all duration-200
                ${canNext()
                  ? 'bg-[#b4ff39] text-black hover:brightness-110'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}
              `}
            >
              下一步 →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-8 py-2.5 text-sm bg-[#b4ff39] text-black rounded-none hover:brightness-110 transition-all duration-200 animate-breathe"
            >
              生成报考报告
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
