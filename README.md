# 上岸引擎（Anan Engine）

AI 智能公考备考 SaaS 平台 — "AI 智能陪练，稳步上岸"

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router, 服务端模式) |
| UI | React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui |
| 认证 | Supabase Auth (手机号验证码 + 邮箱密码) |
| 数据库 | Supabase PostgreSQL + RLS |
| 图标 | Lucide React |
| 包管理 | pnpm (禁止 npm/yarn) |

---

## 本地运行

### 1. 环境要求

- Node.js 20+
- pnpm 8+

### 2. 克隆并安装依赖

```bash
git clone <仓库地址>
cd <项目目录>
pnpm install
```

### 3. 配置环境变量

复制环境变量模板并填写：

```bash
cp .env.example .env
```

编辑 `.env` 填入你的 Supabase 配置：

```env
# Supabase（必须）
COZE_SUPABASE_URL=https://your-project.supabase.co
COZE_SUPABASE_ANON_KEY=your-anon-key
COZE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 端口（可选，默认 5000）
DEPLOY_RUN_PORT=5000
```

**获取 Supabase 凭证**：
1. 注册 [supabase.com](https://supabase.com)，创建一个项目
2. 进入 Settings → API，复制 `Project URL` 和 `anon public` key
3. 复制 `service_role` key（仅服务端使用，不要暴露到前端）
4. 开启手机号认证：Authentication → Providers → Phone → Enable

### 4. 创建数据库表

在 Supabase SQL Editor 中执行：

```sql
-- 用户档案表
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT,
  age INTEGER,
  education TEXT,
  major TEXT,
  major_category TEXT,
  exam_type TEXT[],
  target_province TEXT[],
  political_status TEXT,
  work_experience TEXT,
  certificates TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- AI 报告表
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_score INTEGER,
  competition_score INTEGER,
  match_score INTEGER,
  recommended_posts JSONB,
  competition_analysis JSONB,
  strategy_advice JSONB,
  ai_advice TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 策略（用户只能访问自己的数据）
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_profiles_读写自己的数据" ON user_profiles
  FOR ALL USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "reports_读写自己的数据" ON reports
  FOR ALL USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);
```

### 5. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:5000](http://localhost:5000) 查看应用。

### 6. 构建生产版本

```bash
pnpm build
pnpm start
```

---

## 部署到云

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入仓库
3. 配置环境变量（同 `.env.example` 中的变量）
4. 部署

**注意**：Vercel 会自动识别 Next.js 项目，无需额外配置。

### Docker 部署

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 5000
CMD ["node", "server.js"]
```

> Docker 部署需要在 `next.config.ts` 中添加 `output: 'standalone'`。

### 其他平台

本项目是标准 Next.js App Router 项目，可部署到任何支持 Node.js 的平台：
- Railway / Render / Fly.io
- 阿里云函数计算 / 腾讯云 Webify
- 自有服务器（需 Node.js 20+）

---

## 项目结构

```
src/
├── app/
│   ├── layout.tsx               # RootLayout + SupabaseConfigProvider
│   ├── globals.css              # Tailwind + Design Tokens + 动画
│   ├── page.tsx                 # / 开场Hero + 示例报告 + 全国可视化
│   ├── login/page.tsx           # /login 手机号/邮箱登录
│   ├── onboarding/page.tsx      # /onboarding 4步信息填写（需登录）
│   ├── report/page.tsx          # /report AI 专属报告（需登录）
│   ├── dashboard/page.tsx       # /dashboard 学习中心（需登录）
│   ├── explore/page.tsx         # /explore 考公全景
│   ├── match/page.tsx           # /match AI 岗位匹配
│   ├── apply/page.tsx           # /apply 报名决策
│   ├── plan/page.tsx            # /plan AI 备考规划
│   ├── practice/page.tsx        # /practice 智能题库
│   ├── shenlun/page.tsx         # /shenlun 申论 AI 批改
│   ├── gongji/page.tsx          # /gongji 公基 AI 图谱
│   ├── mock/page.tsx            # /mock 模考中心
│   ├── interview/page.tsx       # /interview AI 面试模拟
│   ├── diary/page.tsx           # /diary 上岸日记
│   ├── map/page.tsx             # /map 全国可视化
│   ├── rank/page.tsx            # /rank 排行榜
│   ├── vip/page.tsx             # /vip 会员套餐
│   └── api/
│       ├── supabase-config/route.ts  # GET Supabase 配置
│       ├── user-profile/route.ts     # POST/GET 用户档案
│       └── report/route.ts           # GET 用户报告
├── components/
│   ├── layout/app-shell.tsx     # 全站导航栏
│   ├── ai-companion.tsx         # AI 陪伴浮窗
│   ├── common.tsx               # PageHeader/VipLock/PriceTag/Stat
│   └── ui/                      # shadcn/ui 组件库
├── lib/
│   ├── data.ts                  # 全站 Mock 数据
│   ├── utils.ts                 # cn() 等工具
│   ├── supabase-browser.ts      # Supabase 浏览器客户端
│   └── supabase-config-inject.tsx  # Supabase 配置 Provider
├── storage/database/
│   ├── shared/schema.ts         # Drizzle ORM Schema
│   └── supabase-client.ts       # 服务端 Supabase 客户端
AGENTS.md                        # 项目需求文档
DESIGN.md                        # 设计规范
```

---

## 用户核心路径

```
/ (开场Hero + 示例报告 + 全国可视化)
  → /login (手机号注册/登录)
    → /onboarding (4步填写个人信息)
      → /report (AI 生成专属报考岗位报告)
        → /dashboard (学习中心，7阶段全路径)
```

---

## 常用命令

| 场景 | 命令 |
|------|------|
| 开发 | `pnpm dev` |
| 构建 | `pnpm build` |
| 生产启动 | `pnpm start` |
| 类型检查 | `pnpm ts-check` |
| Lint | `pnpm lint --quiet` |

---

## 设计规范

详见 `DESIGN.md`，核心要点：

- 纯黑基底 `#000` + Lime `#b4ff39` 唯一强调色
- 全站无圆角 (`rounded-none`)，无模糊/阴影
- 衬线标题 (`Instrument Serif`)，`font-serif font-light`
- 01/02 编号标注，`font-mono` + zinc-600
- 超细边框 `1px solid rgba(255,255,255,0.08)`
- 液态玻璃卡片 (`liquid-glass`) 用于首页
- 动效：fade-up 入场 + CountUp 数字 + lerp 视差 + mesh-orb 光球
