# AGENTS.md · 上岸引擎（SaaS 商业版 v2）

## 项目概览
面向公务员 / 事业单位 / 选调生考生的 **AI 智能公考备考 SaaS**。覆盖从"了解考公"到"面试上岸"的完整 7 阶段路径，每个环节嵌入 AI 能力，形成免费引流 → 单点付费 → VIP 订阅 → 协议班高客单的商业闭环。

- 品牌名：**上岸引擎**
- 定位：AI 陪练 + 智能推题 + 全国模考排名 + 申论批改 + 面试模拟 + 协议班陪跑
- 技术栈：Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui + Supabase (Auth + DB)
- 端口：`process.env.DEPLOY_RUN_PORT`（默认 5000）
- 运行模式：Next.js 服务器模式（已移除 `output: 'export'`），支持 API Routes
- 数据：Supabase 后端（用户认证 + 数据持久化），展示数据仍为 Mock（`src/lib/data.ts`）
- 认证：Supabase Auth，支持手机号（+86）验证码登录 + 邮箱密码登录

## 7 阶段产品架构

| 阶段 | 页面 | AI 能力 | 商业模型 |
| --- | --- | --- | --- |
| 一·了解考公 | `/explore` | AI 考公百科问答 + 6 类考试对比 | 免费引流 |
| 二·岗位匹配 | `/match` | 专业→岗位推荐 + 竞争预测 + 上岸概率 | 免费预览 → ¥29.9 深度报告 |
| 三·报名决策 | `/apply` | 冲稳保组合 + 竞争比预测 + 岗位筛选建议 | VIP 解锁 |
| 四·备考规划 | `/plan` | AI 四阶段规划 + 周课表 + 动态调整 | 免费基础 → VIP 智能调整 |
| 五·笔试训练 | `/practice` `/shenlun` `/gongji` | AI 推题 + 申论批改 + 公基知识图谱 | 免费额度 → VIP 无限 |
| 六·模考冲刺 | `/mock` | AI 成绩预测 + 上岸概率 | 免费 1 次 → VIP |
| 七·面试上岸 | `/interview` | AI 面试模拟 + 实时点评 + 高分技巧 | ¥19.9/次 → VIP 无限 |

## 商业模型
| 层级 | 定位 | 关键页面 |
| --- | --- | --- |
| 免费引流 | AI 岗位匹配预览、每日 10 题、公开课、错题本、上岸榜 | `/`、`/explore`、`/match`、`/practice`、`/rank` |
| 单点付费 | 深度岗位报告 ¥29.9、AI 申论批改 ¥9.9/次、AI 面试模拟 ¥19.9/次、真人批改 ¥199/篇 | `/match`、`/shenlun`、`/interview` |
| VIP 订阅 | 月卡 ¥68 / 季卡 ¥168 / 年卡 ¥498 | `/vip` |
| 协议班 | ¥9800，笔试不过退 ¥8000 | `/vip` |
| 增长机制 | 老带新双向返现、限时倒计时、排行榜社交激励 | `/vip`、`/rank` |

## 目录结构
```
src/
├── app/
│   ├── layout.tsx           # RootLayout · 挂载 AppShell（侧边栏 + 主区）
│   ├── globals.css          # Tailwind + Design Tokens + 自定义类
│   ├── page.tsx             # / 开场Hero + 示例报告 + 全国可视化 + 左侧固定引导栏
│   ├── login/page.tsx       # /login 手机号/邮箱注册登录
│   ├── onboarding/page.tsx  # /onboarding 4步信息填写（需登录）
│   ├── report/page.tsx      # /report AI 报告（需登录）
│   ├── explore/page.tsx     # /explore 考公全景（6 类考试对比 + AI 百科）
│   ├── match/page.tsx       # /match AI 岗位匹配（专业库 + 竞争预测）
│   ├── apply/page.tsx       # /apply 报名决策（冲稳保 + 竞争比）
│   ├── plan/page.tsx        # /plan AI 备考规划（四阶段 + 周课表）
│   ├── practice/page.tsx    # /practice 智能题库（行测 + 免费额度）
│   ├── shenlun/page.tsx     # /shenlun 申论 AI 批改（五维打分 + 逐句点评）
│   ├── gongji/page.tsx      # /gongji 公基 AI 图谱（6 模块 + AI 记忆助手）
│   ├── mock/page.tsx        # /mock 模考中心（全国排名 + 成绩预测）
│   ├── interview/page.tsx   # /interview AI 面试模拟（4 大题型 + 实时点评）
│   ├── diary/page.tsx       # /diary 上岸日记（心情记录 + AI陪伴 + 情绪树洞 + 能量站）
│   ├── map/page.tsx         # /map 全国公考可视化（省份热力图 + 地市难度 + 岗位分布 + 国考系统）
│   ├── dashboard/page.tsx   # /dashboard 学习中心（7 阶段全路径进度 + 情绪陪伴）
│   ├── rank/page.tsx        # /rank 排行榜 + 上岸榜
│   └── vip/page.tsx         # /vip 会员套餐 & 协议班
├── api/
│   └── supabase-config/     # GET /api/supabase-config 返回 Supabase URL+AnonKey
│   └── user-profile/        # POST/GET /api/user-profile 用户信息 CRUD
│   └── report/              # GET /api/report 获取用户报告
├── components/
│   ├── layout/app-shell.tsx # 全站侧边栏 + 7 阶段路径条 + Logo + 用户卡片
│   ├── ai-companion.tsx     # AI 陪伴浮窗（全局右下角可唤起聊天）
│   ├── common.tsx           # 通用 PageHeader / VipLock / PriceTag / Stat
│   └── ui/                  # shadcn/ui 组件（Radix）
├── lib/
│   ├── data.ts              # 全站 Mock 数据（含情绪陪伴数据）
│   ├── utils.ts             # cn() 等工具
│   ├── supabase-browser.ts  # Supabase 浏览器客户端（Auth + 数据库）
│   └── supabase-config-inject.tsx  # Supabase 配置注入 Provider
DESIGN.md                    # 商业版设计规范
AGENTS.md                    # 本文档
.coze                        # 预置，勿改
```

## 常用命令
| 场景 | 命令 |
| --- | --- |
| 构建 | `pnpm build` |
| 类型检查 | `pnpm ts-check` |
| Lint | `pnpm lint --quiet` |

## 服务模式说明
- Next.js **App Router** 服务端模式（已移除 `output: 'export'`）
- 支持 API Routes：`/api/supabase-config`、`/api/user-profile`、`/api/report`
- 开发环境：`pnpm next dev --port ${DEPLOY_RUN_PORT}`
- 认证：Supabase Auth（手机号 + 邮箱登录），前端通过 `x-session` header 携带 access_token
- 数据库：Supabase PostgreSQL，表 `user_profiles` + `reports`，已启用 RLS

## 修改指南
- **改数据**：直接改 `src/lib/data.ts`，重新 build
- **改视觉 Token**：先读 `DESIGN.md`，再改 `globals.css`
- **新增页面**：
  1. 在 `src/app/<slug>/page.tsx` 创建 client 页面
  2. 在 `src/components/layout/app-shell.tsx` 的 `NAV` 数组中追加导航项
  3. 重新 build 并拷贝
- **付费按钮跳转**：所有 VIP CTA 使用 `<Link href="/vip">`
- **VIP 锁定态**：使用 `<VipLock />` 或 `USER.isVip` 判断分支

## 设计约束
- 视觉基调延续"档案纸秩序感 + 朱砂橘印章"
- VIP 视觉（`.vip-gradient`）仅用于付费元素
- 严禁引入图表库、字体 CDN、彩色霓虹按钮
- 卡片以细描边 + 极浅底色为主

## 已知限制 & 后续工作
1. 报告内容仍为 Mock 数据，需接入 LLM 集成实现 AI 生成
2. 支付按钮当前为占位
3. AI 批改结果为固定 mock，需接入 LLM 集成
4. 错题本持久化需要完善
5. 移动端可进一步优化：底部 Tab bar、Sheet 抽屉
6. 登录页面未使用 AppShell 布局，后续可统一
