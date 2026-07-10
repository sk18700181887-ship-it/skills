'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseConfig } from '@/lib/supabase-config-inject';
import { getSupabaseBrowserClientAsync } from '@/lib/supabase-browser';
import Image from 'next/image';

const APP_ICON = 'https://coze-coding-project.tos.coze.site/gen_project_icon/2026-07-09/7660409568081575945_1783579729.png?sign=4905735284-fa92342d9d-0-70786fa10c0e29f0d8e369a77d8c4de1ecbae8381e31ee8089f0b8c5c6c07eaf';
const APP_NAME = '上岸引擎';

export default function LoginPage() {
  const router = useRouter();
  const { isLoading: configLoading, error: configError } = useSupabaseConfig();

  const [loginTab, setLoginTab] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // 倒计时
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // 发送验证码
  const handleSendOtp = useCallback(async () => {
    if (!phone || phone.length !== 11) {
      setMessage({ type: 'error', text: '请输入11位手机号' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const supabase = await getSupabaseBrowserClientAsync();
      const { error } = await supabase.auth.signInWithOtp({ phone: `+86${phone}` });
      if (error) throw error;
      setCountdown(60);
      setMessage({ type: 'success', text: '验证码已发送' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : '发送验证码失败' });
    } finally {
      setLoading(false);
    }
  }, [phone]);

  // 手机号验证码登录
  const handlePhoneLogin = useCallback(async () => {
    if (!phone || phone.length !== 11) {
      setMessage({ type: 'error', text: '请输入11位手机号' });
      return;
    }
    if (!otpCode || otpCode.length < 4) {
      setMessage({ type: 'error', text: '请输入验证码' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const supabase = await getSupabaseBrowserClientAsync();
      const { error } = await supabase.auth.verifyOtp({
        phone: `+86${phone}`,
        token: otpCode,
        type: 'sms',
      });
      if (error) throw error;
      router.push('/onboarding');
    } catch (err) {
      setMessage({ type: 'error', text: '验证码错误或已过期，请重试或重新获取' });
    } finally {
      setLoading(false);
    }
  }, [phone, otpCode, router]);

  // 邮箱登录
  const handleEmailLogin = useCallback(async () => {
    if (!email) {
      setMessage({ type: 'error', text: '请输入邮箱' });
      return;
    }
    if (!password) {
      setMessage({ type: 'error', text: '请输入密码' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const supabase = await getSupabaseBrowserClientAsync();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/onboarding');
    } catch (err) {
      setMessage({ type: 'error', text: '邮箱或密码错误' });
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  // 邮箱注册
  const handleEmailSignUp = useCallback(async () => {
    if (!email) {
      setMessage({ type: 'error', text: '请输入邮箱' });
      return;
    }
    if (!password || password.length < 6) {
      setMessage({ type: 'error', text: '密码至少6位' });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: '两次密码不一致' });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const supabase = await getSupabaseBrowserClientAsync();
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      router.push('/onboarding');
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : '注册失败' });
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, router]);

  if (configLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-zinc-400 text-sm">加载中...</div>
      </div>
    );
  }

  if (configError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-rose-400 text-sm">配置加载失败</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* 应用图标 */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 relative rounded-none overflow-hidden border border-white/10">
            <Image src={APP_ICON} alt={APP_NAME} fill className="object-cover" />
          </div>
        </div>

        {/* 应用名称 */}
        <h1 className="text-center text-xl font-serif font-light text-white mb-8">{APP_NAME}</h1>

        {/* 登录方式 Tab */}
        <div className="flex border-b border-white/10 mb-6">
          <button
            onClick={() => { setLoginTab('phone'); setMessage(null); }}
            className={`flex-1 pb-3 text-sm transition-colors ${
              loginTab === 'phone'
                ? 'text-[#b4ff39] border-b-2 border-[#b4ff39]'
                : 'text-zinc-500 border-b-2 border-transparent'
            }`}
          >
            手机号登录
          </button>
          <button
            onClick={() => { setLoginTab('email'); setMessage(null); }}
            className={`flex-1 pb-3 text-sm transition-colors ${
              loginTab === 'email'
                ? 'text-[#b4ff39] border-b-2 border-[#b4ff39]'
                : 'text-zinc-500 border-b-2 border-transparent'
            }`}
          >
            邮箱登录
          </button>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-4 px-3 py-2 text-xs border rounded-none ${
            message.type === 'error'
              ? 'text-rose-400 border-rose-400/20 bg-rose-400/5'
              : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'
          }`}>
            {message.text}
          </div>
        )}

        {/* 手机号登录表单 */}
        {loginTab === 'phone' && (
          <div className="space-y-4">
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-zinc-900 border border-white/10 border-r-0 text-zinc-400 text-sm rounded-none">
                +86
              </span>
              <input
                type="tel"
                maxLength={11}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="请输入手机号"
                className="flex-1 px-3 py-2.5 bg-zinc-950 border border-white/10 text-white text-sm placeholder:text-zinc-600 rounded-none focus:outline-none focus:border-[#b4ff39]/40"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                placeholder="验证码"
                className="flex-1 px-3 py-2.5 bg-zinc-950 border border-white/10 text-white text-sm placeholder:text-zinc-600 rounded-none focus:outline-none focus:border-[#b4ff39]/40"
              />
              <button
                onClick={handleSendOtp}
                disabled={countdown > 0 || loading}
                className="px-4 py-2.5 text-xs border border-white/10 text-zinc-400 rounded-none hover:border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </button>
            </div>
            <button
              onClick={handlePhoneLogin}
              disabled={loading}
              className="w-full py-2.5 bg-[#b4ff39] text-black text-sm font-medium rounded-none hover:bg-[#c5ff6b] transition-colors disabled:opacity-50 btn-press"
            >
              {loading ? '登录中...' : '登录/注册'}
            </button>
            <p className="text-xs text-zinc-600 text-center">
              未注册手机号将自动创建账号
            </p>
          </div>
        )}

        {/* 邮箱登录表单 */}
        {loginTab === 'email' && !isSignUp && (
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              className="w-full px-3 py-2.5 bg-zinc-950 border border-white/10 text-white text-sm placeholder:text-zinc-600 rounded-none focus:outline-none focus:border-[#b4ff39]/40"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full px-3 py-2.5 bg-zinc-950 border border-white/10 text-white text-sm placeholder:text-zinc-600 rounded-none focus:outline-none focus:border-[#b4ff39]/40 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                )}
              </button>
            </div>
            <button
              onClick={handleEmailLogin}
              disabled={loading}
              className="w-full py-2.5 bg-[#b4ff39] text-black text-sm font-medium rounded-none hover:bg-[#c5ff6b] transition-colors disabled:opacity-50 btn-press"
            >
              {loading ? '登录中...' : '登录'}
            </button>
            <p className="text-center text-xs text-zinc-600">
              还没有账号？{' '}
              <button onClick={() => { setIsSignUp(true); setMessage(null); }} className="text-[#b4ff39] hover:underline">
                去注册
              </button>
            </p>
          </div>
        )}

        {/* 邮箱注册表单 */}
        {loginTab === 'email' && isSignUp && (
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              className="w-full px-3 py-2.5 bg-zinc-950 border border-white/10 text-white text-sm placeholder:text-zinc-600 rounded-none focus:outline-none focus:border-[#b4ff39]/40"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="设置密码（至少6位）"
                className="w-full px-3 py-2.5 bg-zinc-950 border border-white/10 text-white text-sm placeholder:text-zinc-600 rounded-none focus:outline-none focus:border-[#b4ff39]/40 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                )}
              </button>
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="确认密码"
              className="w-full px-3 py-2.5 bg-zinc-950 border border-white/10 text-white text-sm placeholder:text-zinc-600 rounded-none focus:outline-none focus:border-[#b4ff39]/40"
            />
            <button
              onClick={handleEmailSignUp}
              disabled={loading}
              className="w-full py-2.5 bg-[#b4ff39] text-black text-sm font-medium rounded-none hover:bg-[#c5ff6b] transition-colors disabled:opacity-50 btn-press"
            >
              {loading ? '注册中...' : '注册'}
            </button>
            <p className="text-center text-xs text-zinc-600">
              已有账号？{' '}
              <button onClick={() => { setIsSignUp(false); setMessage(null); }} className="text-[#b4ff39] hover:underline">
                去登录
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
