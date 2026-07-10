# AGENTS.md · 上岸引擎 — 项目全需求描述

## 一、项目定位

**上岸引擎（Anan Engine）** 是一款面向公务员 / 事业单位 / 选调生考生的 **AI 智能公考备考 SaaS 平台**。覆盖从"了解考公"到"面试上岸"的完整 7 阶段路径，每个环节嵌入 AI 能力，形成免费引流 → 单点付费 → VIP 订阅 → 协议班高客单的商业闭环。

- 品牌名：**上岸引擎**
- 英文标识：**Anan Engine**
- Slogan：**"AI 智能陪练，稳步上岸"**

---

## 二、用户核心路径（强制流程）

用户进入平台后，**必须按以下顺序完成流程**，不允许跳步：

```
/ (开场Hero + 示例报告 + 全国可视化)
  → /login (手机号注册/登录)
    → /onboarding (4步填写个人信息)
      → /report (AI 生成专属报考岗位报告)
        → /dashboard (学习中心，7阶段全路径)
```

### 各环节详细需求

#### 1. 首页 `/` — 引导 + 展示
- **开场 Hero**：数字雨背景 + 网格线 + 扫描线 + 打字机品牌名 + 统计指标飞入动画
- **左侧固定引导栏**（sticky）：品牌标识 + "填写信息，生成专属报告" CTA + 手机号注册按钮 + 登录入口
- **示例报告区**：展示一份完整的 Mock 案例报告（某考生综合评估、推荐岗位、竞争分析、冲稳保策略、AI 建议），让用户直观看到报告效果
- **全国可视化区**：省份排行动态条形图 Top15 + 岗位分布 + 国考系统柱状图
- **底部 CTA**："这是他的报告，你的呢？" + 大号 lime 按钮 → `/login`
- 附加入口：学习中心、考公全景、全国可视化独立页

#### 2. 登录注册 `/login` — 手机号 + 邮箱
- **手机号验证码登录**（主推）：输入 +86 手机号 → 发送 SMS OTP → 输入验证码 → 登录
- **邮箱密码登录**（备选）：邮箱 + 密码，支持注册新账号
- 登录成功后**必须跳转 `/onboarding`**（而非 `/dashboard`）
- 使用 Supabase Auth，`x-session` header 携带 access_token
- topology.vc 暗色风格：纯黑底 + 直角 + 衬线标题 + lime 强调色

#### 3. 信息填写 `/onboarding` — 4 步表单
- **Step 1 基本信息**：姓名、年龄、学历（专科/本科/硕士/博士）
- **Step 2 教育背景**：专业（6 大类 30+ 细分专业）、专业类别
- **Step 3 考试意向**：考试类型（国考/省考/选调/事业编/军转/三支一扶，可多选）、目标省份（可多选）
- **Step 4 补充信息**：政治面貌、工作经验、证书资质
- 交互方式：卡片式 Chip 选择 + 输入框，01/02/03/04 编号进度条
- **必须登录**：未登录自动跳转 `/login`
- 提交后保存到 Supabase `user_profiles` 表 → 2.5 秒加载动画 → 跳转 `/report`

#### 4. 个人报告 `/report` — AI 专属报告
- **3 秒 AI 生成动画** → 展示完整报告
- 报告内容 5 大板块：
  1. **综合评估**：3 个 SVG 环形图（上岸指数/竞争压力/匹配度）
  2. **推荐岗位 Top5**：岗位名/级别/竞争比/上岸概率/匹配度
  3. **竞争分析**：目标省份横向条形图 + 学历竞争对比
  4. **冲稳保策略**：3 档岗位组合建议
  5. **AI 专属建议**：个性化备考方向文字
- **必须登录**：未登录跳转 `/login`
- 底部"进入学习中心"按钮 → `/dashboard`

#### 5. 学习中心 `/dashboard` — 7 阶段全路径
- 7 阶段路径进度条（了解考公 → 岗位匹配 → 报名决策 → 备考规划 → 笔试训练 → 模考冲刺 → 面试上岸）
- 心情选择器 + AI 鼓励语
- 打卡徽章系统（7 个里程碑）
- 能量金句轮播
- AI 每日任务建议
- **必须登录**

---

## 三、7 阶段产品架构

| 阶段 | 路由 | 页面功能 | AI 能力 | 商业模型 |
|------|------|----------|---------|----------|
| 一·了解考公 | `/explore` | 考公全景（6 类考试对比表 + AI 百科问答） | AI 考公百科问答 | 免费引流 |
| 二·岗位匹配 | `/match` | AI 岗位匹配（专业库 + 竞争预测 + 上岸概率） | 专业→岗位推荐 + 竞争预测 | 免费预览 → ¥29.9 深度报告 |
| 三·报名决策 | `/apply` | 报名决策（冲稳保组合 + 竞争比预测 + 岗位筛选） | 冲稳保组合建议 | VIP 解锁 |
| 四·备考规划 | `/plan` | AI 备考规划（四阶段 + 周课表 + 动态调整） | AI 四阶段规划 | 免费基础 → VIP 智能调整 |
| 五·笔试训练 | `/practice` `/shenlun` `/gongji` | 智能题库 / 申论 AI 批改 / 公基 AI 图谱 | AI 推题 + 申论批改 + 知识图谱 | 免费额度 → VIP 无限 |
| 六·模考冲刺 | `/mock` | 模考中心（全国排名 + 成绩预测） | AI 成绩预测 + 上岸概率 | 免费 1 次 → VIP |
| 七·面试上岸 | `/interview` | AI 面试模拟（4 大题型 + 实时点评） | AI 面试模拟 + 实时点评 | ¥19.9/次 → VIP 无限 |

---

## 四、其他核心页面

| 页面 | 路由 | 功能描述 |
|------|------|----------|
| 上岸日记 | `/diary` | 心情记录 + AI 陪伴鼓励 + 情绪树洞 + 能量站 + 打卡徽章 |
| 全国可视化 | `/map` | 省份热力图 + 地市难度 + 岗位分布 + 国考系统分析（4 Tab） |
| 排行榜 | `/rank` | 全国模考排名 + 上岸榜 + 社交激励 |
| VIP 会员 | `/vip` | 月卡¥68 / 季卡¥168 / 年卡¥498 + 协议班¥9800 + 老带新返现 |

---

## 五、商业模型

| 层级 | 定价 | 关键入口 |
|------|------|----------|
| 免费引流 | — | AI 岗位匹配预览、每日 10 题、公开课、错题本、上岸榜 |
| 单点付费 | ¥9.9~¥29.9 | 深度岗位报告 ¥29.9、申论批改 ¥9.9/次、面试模拟 ¥19.9/次、真人批改 ¥199/篇 |
| VIP 订阅 | 月¥68/季¥168/年¥498 | 全部 AI 能力无限使用 |
| 协议班 | ¥9800 | 笔试不过退 ¥8000 |
| 增长机制 | — | 老带新双向返现、限时倒计时、排行榜社交激励 |

---

## 六、技术栈与架构

### 核心技术栈
- **Framework**: Next.js 16 (App Router，服务端模式)
- **UI**: React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui
- **后端**: Supabase (Auth + PostgreSQL + RLS)
- **认证**: Supabase Auth，手机号(+86)验证码登录 + 邮箱密码登录
- **端口**: `process.env.DEPLOY_RUN_PORT`（默认 5000）

### 运行模式
- Next.js **App Router 服务端模式**（已移除 `output: 'export'`）
- 支持 API Routes
- 开发环境：`pnpm next dev --port ${DEPLOY_RUN_PORT}`

### 数据库表结构
| 表名 | 用途 | 关键字段 |
|------|------|----------|
| `user_profiles` | 用户个人信息 | user_id, name, age, education, major, major_category, exam_type, target_province, political_status, work_experience, certificates |
| `reports` | AI 报告存储 | user_id, recommended_posts, competition_analysis, strategy_advice, overall_score,上岸概率 |
| 两表均启用 RLS | 用户只能访问自己的数据 | — |

### API 接口
| 路由 | 方法 | 功能 | 鉴权 |
|------|------|------|------|
| `/api/supabase-config` | GET | 返回 Supabase URL + AnonKey | 无 |
| `/api/user-profile` | POST | 保存用户档案 | x-session |
| `/api/user-profile` | GET | 获取用户档案 | x-session |
| `/api/report` | GET | 获取用户报告 | x-session |

### 认证机制
- Header: `x-session` = Supabase `access_token`
- 前端：`supabase.auth.getSession()` 获取 token
- 后端：`supabase.auth.getUser(token)` 验证身份
- 未登录访问需鉴权页面 → 重定向 `/login`

---

## 七、目录结构

```
src/
├── app/
│   ├── layout.tsx               # RootLayout + SupabaseConfigProvider
│   ├── globals.css              # Tailwind + Design Tokens + 20+ 动画
│   ├── page.tsx                 # / 开场Hero + 示例报告 + 左侧引导栏 + 全国可视化
│   ├── login/page.tsx           # /login 手机号/邮箱登录注册
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
│   ├── diary/page.tsx           # /diary 上岸日记 + 情绪陪伴
│   ├── map/page.tsx             # /map 全国公考可视化
│   ├── rank/page.tsx            # /rank 排行榜
│   ├── vip/page.tsx             # /vip 会员套餐
│   └── api/
│       ├── supabase-config/route.ts  # GET Supabase 配置
│       ├── user-profile/route.ts     # POST/GET 用户档案
│       └── report/route.ts           # GET 用户报告
├── components/
│   ├── layout/app-shell.tsx     # 全站导航栏（极简顶部导航 + MouseGlow）
│   ├── ai-companion.tsx         # AI 陪伴浮窗（全局右下角）
│   ├── common.tsx               # PageHeader / VipLock / PriceTag / Stat
│   └── ui/                      # shadcn/ui 组件库（Radix）
├── lib/
│   ├── data.ts                  # 全站 Mock 数据（777 行）
│   ├── utils.ts                 # cn() 等工具
│   ├── supabase-browser.ts      # Supabase 浏览器客户端
│   └── supabase-config-inject.tsx  # Supabase 配置注入 Provider
├── storage/
│   └── database/
│       ├── shared/schema.ts     # Drizzle ORM Schema（user_profiles + reports）
│       └── supabase-client.ts   # 服务端 Supabase 客户端
DESIGN.md                        # 设计规范
AGENTS.md                        # 本文档
.coze                            # 预置，勿改
```

---

## 八、设计规范（核心约束）

详见 `DESIGN.md`，关键要点：

- **纯黑基底 #000 + Lime #b4ff39 唯一强调色**
- **全站无圆角**：`rounded-none`（0px）
- **无模糊/毛玻璃/阴影**
- **衬线标题**：`font-serif font-light`，正文系统栈
- **01/02 编号标注**：`font-mono` + zinc-600
- **超细边框**：`1px solid rgba(255,255,255,0.08)`
- **Chip Grid 布局**：小矩形标签网格排列
- **VIP 视觉**：深墨底 + 烫金文字，克制使用

### 动效体系
- 入场：fade-up + stagger 依次出现
- Hover：边框 0.08→0.2，微上移 1px
- 按钮：按下 scale(0.98)
- 数据：数字从 0 滚动到目标值（CountUp）
- 条形图：IntersectionObserver 触发进入动画
- 背景：gradient-flow 缓慢流动 + 3 个半透明 lime 光球漂浮
- 数字雨：Matrix 风格字符下落
- 扫描线：水平亮线从上到下扫过

### 设计禁忌
- 不使用圆角 / 模糊 / 阴影 / 渐变按钮 / 浅色背景 / 多强调色 / 粗体标题 / 粒子视差

---

## 九、常用命令

| 场景 | 命令 |
|------|------|
| 开发 | `pnpm next dev --port ${DEPLOY_RUN_PORT}` |
| 构建 | `pnpm build` |
| 类型检查 | `pnpm ts-check` |
| Lint | `pnpm lint --quiet` |

---

## 十、修改指南

- **改数据**：改 `src/lib/data.ts`，重新 build
- **改视觉 Token**：先读 `DESIGN.md`，再改 `globals.css`
- **新增页面**：
  1. 在 `src/app/<slug>/page.tsx` 创建 client 页面
  2. 在 `src/components/layout/app-shell.tsx` 的 `NAV` 数组追加导航项
  3. 需要鉴权的页面加 `useEffect` 检查 `supabase.auth.getSession()`
- **付费按钮**：所有 VIP CTA 使用 `<Link href="/vip">`
- **VIP 锁定态**：使用 `<VipLock />` 或 `USER.isVip` 判断
- **新增 API**：在 `src/app/api/<slug>/route.ts`，必须校验 `x-session` header

---

## 十一、已知限制 & 后续工作

1. 报告内容仍为 Mock 数据，需接入 LLM 集成实现 AI 真实生成
2. 支付按钮当前为占位，需接入支付通道
3. AI 批改/面试模拟结果为固定 mock，需接入 LLM
4. 错题本持久化需要完善
5. 移动端优化：底部 Tab bar、Sheet 抽屉
6. 登录页未使用 AppShell 布局（独立全屏）
7. 首页"学习中心"入口可直接访问 /dashboard，dashboard 需完善登录守卫
