# DESIGN.md · 上岸引擎（AI 智能公考备考平台 · 商业版 v3）

## 产品灵魂 · 意象锚点
**"深空中的精准导航台"**：深邃暗色背景如宇宙深空，lime 绿色交互元素如导航信标，信息以极简秩序排布。每个功能模块是一个独立的控制面板——冷静、专注、极致清晰。参考 topology.vc 的设计语言：暗色基底 + 高对比度强调色 + 极简排版 + 克制动效。

严格回避：浅色档案纸、朱砂橘暖色调、装饰性描边、花哨渐变按钮。

## 品牌
- 中文品牌名：**上岸引擎**
- 英文标识：**Anan Engine**
- Slogan：**"AI 智能陪练，稳步上岸"**

## 视觉策略
- **深空暗色基底 + Lime 信标**：近乎纯黑背景 + `#b4ff39` lime 绿强调色，所有交互元素以此为锚点。
- **玻璃感卡片**：`backdrop-filter: blur(12px)` + 极浅白色边框 + 微透明背景，悬浮于深色基底之上。
- **极简排版**：大字号标题 + 宽松行距 + 充裕留白，信息层级完全靠字重/尺寸/颜色区分。
- **VIP 视觉**：保留深墨 + 烫金渐变，作为付费层级的视觉锚点。
- **7 阶段路径**：顶部横向路径条，Lime 高亮当前阶段。

## Design Tokens

### 色彩（globals.css :root）
- 背景基底：`#09090b`（zinc-950）
- Surface-1（卡片/输入框）：`rgba(24, 24, 27, 0.6)`（zinc-900/60% + blur）
- Surface-2（hover/active）：`rgba(39, 39, 42, 0.5)`（zinc-800/50%）
- 强调色 Accent：`#b4ff39`（lime-400）
- 强调色 hover：`#c5ff6b`
- 前景文字：`#fafafa`（zinc-50）
- 次要文字：`#a1a1aa`（zinc-400）
- 弱文字：`#71717a`（zinc-500）
- 边框：`rgba(255, 255, 255, 0.06)`
- 语义色：ok = emerald-400 / warn = amber-400 / err = rose-400

### 字体
- 主体：系统栈 `PingFang SC` / `Hiragino Sans GB` / `Microsoft YaHei`
- 品牌/数字标题：`font-serif`，KPI 用 24-32px 大字号
- 页面标题：24px bold tracking-tight
- 卡片标题：16px semibold
- 正文：14px / 辅助 12px / 微标注 10px

### 圆角 / 阴影 / 间距
- 圆角：控件 8px、卡片 12px、Chip 999px
- 卡片：无彩色阴影，仅 `border: 1px solid rgba(255,255,255,0.06)` + `backdrop-filter: blur(12px)`
- 间距节奏：8 / 12 / 16 / 20 / 24 / 32（px）

### 动效
- hover/press：`.15s ease` 过渡
- 卡片 hover：微上移 + 边框亮起 `card-hover`
- 按钮 press：`.btn-press` scale(0.97)
- VIP 微光：`.shimmer` 扫过
- 无入场粒子、无滚动视差

## 布局
- 桌面（≥ 1024px）：Sidebar 220px 暗色 + 主内容 max-w-6xl
- 侧边栏：深黑底 + lime 高亮 active + 极细分隔线
- Logo：lime 绿 + 白色文字，几何极简

## 组件规范
- **按钮**：主按钮 lime 绿底 + 黑字；次按钮透明底 + 白字
- **卡片**：`.topo-card` = 暗色玻璃 + 细描边 + blur
- **状态标签**：语义色 10% 透明底 + 语义色文字
- **VIP 徽章**：`.vip-gradient` 深墨底 + `.vip-text` 烫金字
- **进度条**：轨道 zinc-800，填充 lime 线性渐变
- **阶段路径条**：横排 7 步，lime 高亮当前，emerald 打勾完成

## 内容 / 文案调性
- 简体中文，语气务实、专业、克制
- 数字半角，中文标点全角
- 不用口语化表达

## 设计禁忌
- 不使用浅色卡片/米灰背景
- 不使用朱砂橘/暖色主色调
- 不使用彩色渐变按钮（除 VIP 烫金）
- 不使用玻璃拟态以外的装饰效果
- 不加入场动画、滚动视差、粒子背景

## 情绪陪伴视觉规范
- 心情选择器：Emoji + 文字标签，选中态 lime 底 + ring
- AI 陪伴回复区：lime/5 底 + 细描边 lime/10
- 打卡徽章：已解锁 lime/10 + lime 文字，未解锁 zinc-700
- 情绪树洞：emerald 主色调（安全倾诉）
- AI 陪伴浮窗：暗色玻璃 + shadow-2xl，固定右下角 z-50
