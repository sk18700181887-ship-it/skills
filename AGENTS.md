# AGENTS.md · 上岸引擎（SaaS 商业版）

## 项目概览
面向公务员 / 事业单位 / 选调生考生的 **AI 智能公考备考 SaaS**。核心商业闭环：免费引流 → 单点付费 → VIP 订阅 → 协议班高客单。

- 品牌名：**上岸引擎**（原型迭代自"考编备考全攻略生成器"）
- 定位：AI 陪练 + 智能推题 + 全国模考排名 + 申论批改 + 协议班陪跑
- 技术栈：Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui
- 端口：`process.env.DEPLOY_RUN_PORT`（默认 5000）
- 数据：目前所有数据为客户端 Mock（`src/lib/data.ts`），未接入后端

## 商业模型
| 层级 | 定位 | 关键页面 |
| --- | --- | --- |
| 免费引流 | AI 岗位匹配（预览）、每日 10 题、公开课、错题本、上岸榜 | `/`、`/match`、`/practice`、`/rank` |
| 单点付费 | 深度岗位报告 ¥29.9、AI 批改 ¥9.9/次、真人批改 ¥199/篇 | `/match`、`/shenlun` |
| VIP 订阅 | 月卡 ¥68 / 季卡 ¥168 / 年卡 ¥498 | `/vip` |
| 协议班 | ¥9800，笔试不过退 ¥8000 | `/vip` |
| 增长机制 | 老带新双向返现、限时倒计时、排行榜社交激励 | `/vip`、`/rank` |

## 目录结构
```
src/
├── app/
│   ├── layout.tsx           # RootLayout · 挂载 AppShell（侧边栏 + 主区）
│   ├── globals.css          # Tailwind + Design Tokens + 自定义类（vip-gradient / brand-gradient / stamp / vip-text）
│   ├── page.tsx             # / 学习中心 Dashboard
│   ├── match/page.tsx       # /match AI 岗位匹配
│   ├── practice/page.tsx    # /practice 智能题库（含每日一题）
│   ├── shenlun/page.tsx     # /shenlun 申论 AI 批改（核心付费点）
│   ├── mock/page.tsx        # /mock 模考中心
│   ├── vip/page.tsx         # /vip 会员套餐 & 协议班（核心转化页）
│   └── rank/page.tsx        # /rank 排行榜 + 上岸榜
├── components/
│   ├── layout/app-shell.tsx # 全站侧边栏 + Logo + 用户卡片 + 倒计时
│   ├── common.tsx           # 通用 PageHeader / VipLock / PriceTag / Stat
│   └── ui/                  # shadcn/ui 组件（Radix）
├── lib/
│   ├── data.ts              # 全站 Mock 数据（USER、TODAY_TASKS、JOB_CATEGORIES、VIP_PLANS 等）
│   └── utils.ts             # cn() 等工具
DESIGN.md                    # 商业版设计规范（视觉/交互）
AGENTS.md                    # 本文档
.coze                        # 预置，勿改
```

## 常用命令
| 场景 | 命令 |
| --- | --- |
| 启动开发服务 | `coze dev`（主仓沙箱已常驻） |
| 构建生产 | `coze build` |
| 启动生产 | `coze start` |
| 类型检查 | `pnpm ts-check` |
| Lint | `pnpm lint --quiet` |

## 修改指南
- **改数据（岗位库 / 城市梯队 / 套餐价格 / 排行榜）**：直接改 `src/lib/data.ts` 中对应的常量导出，无需改渲染。价格调整需同步更新 `VIP_PLANS`、`AGREEMENT_PLAN` 以及页面里的一次性引用。
- **改视觉 Token**：先读 `DESIGN.md`，再改 `globals.css` 中的 `:root` CSS 变量与 `.vip-gradient / .brand-gradient / .stamp` 等自定义类。
- **新增页面**：
  1. 在 `src/app/<slug>/page.tsx` 创建 client 页面（如需交互）；
  2. 在 `src/components/layout/app-shell.tsx` 的 `NAV` 数组中追加导航项；
  3. 页面不需再包 `AppShell`，`layout.tsx` 已自动挂载。
- **付费按钮跳转**：所有 VIP CTA 使用 `<Link href="/vip">` 收敛，方便未来替换为真实支付流程。
- **VIP 锁定态**：使用 `<VipLock />`（`src/components/common.tsx`）覆盖内容，或者用 `USER.isVip` 判断分支渲染。

## 设计约束
- 视觉基调延续"档案纸秩序感 + 朱砂橘印章"，商业版新增"金黑对比"用于 VIP 权益（`.vip-gradient`），务必只在付费元素使用，避免全站过度商业化。
- 严禁引入图表库、字体 CDN、彩色霓虹按钮；卡片以细描边 + 极浅底色为主。
- 打印样式（如有）仅隐藏侧栏，正文铺满，与 DESIGN.md 保持一致。

## 已知限制 & 后续工作
1. 数据均为 Mock，未接入后端（真实用户 / 支付 / 题库 API 待接）。
2. 支付按钮当前为占位，需接入微信 / 支付宝 SDK 或后端下单接口。
3. AI 批改结果为固定 mock，需接入 LLM 集成（预留 `/shenlun` 页面的 `runReview` 调用位）。
4. 用户认证、订单、错题本持久化需要后端与数据库（推荐后续接入 Supabase）。
5. 移动端可进一步优化：底部 Tab bar、Sheet 抽屉替代 Sidebar。
