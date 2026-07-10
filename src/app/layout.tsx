import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import { SupabaseConfigProvider } from '@/lib/supabase-config-inject';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '上岸引擎 · AI 智能公考备考平台',
    template: '%s | 上岸引擎',
  },
  description:
    '上岸引擎是面向公务员、事业单位、选调生的 AI 智能备考 SaaS。AI 岗位匹配、智能题库、模考排名、申论 AI 批改、协议班一站式陪跑上岸。',
  keywords: [
    '公务员考试',
    '国考',
    '省考',
    '事业单位',
    '选调生',
    'AI 备考',
    '申论批改',
    '智能题库',
    '模考',
    '协议班',
  ],
  authors: [{ name: '上岸引擎教研' }],
  openGraph: {
    title: '上岸引擎 · AI 智能公考备考平台',
    description:
      'AI 陪练 · 智能推题 · 全国模考排名 · 申论批改 · 协议班陪跑上岸。',
    siteName: '上岸引擎',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        <SupabaseConfigProvider>
          {isDev && <Inspector />}
          {children}
        </SupabaseConfigProvider>
      </body>
    </html>
  );
}
