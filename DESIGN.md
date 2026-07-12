# DESIGN.md · 上岸引擎（AI 智能公考备考平台 · 商业版 v4）

## 产品灵魂 · 意象锚点
**"拓扑降维的精准导航台"**：参考 topology.vc 的设计哲学——将复杂的高维信息降维到极致清晰的结构中。纯黑背景，白色标题，lime 绿为唯一强调色。无圆角、无模糊、无阴影——所有元素以最原始的直线和直角呈现。信息密度高但秩序感极强，数据以 chip/grid 矩阵排列。

严格回避：圆角卡片、玻璃拟态、彩色渐变、模糊效果、装饰性阴影、浅色背景。

## 品牌
- 中文品牌名：**上岸引擎**
- 英文标识：**Anan Engine**
- Slogan：**"AI 智能陪练，稳步上岸"**

## 视觉策略
- **纯黑基底 + Lime 唯一强调**：`#000` 背景 + `#b4ff39` lime 绿为交互锚点
- **直角方正**：所有卡片、按钮、chip 无圆角（`rounded-none`），几何严谨
- **超细边框**：`1px solid rgba(255,255,255,0.08)` 极细分隔线
- **衬线标题**：`font-serif font-light` 大号衬线体标题，戏剧性排版
- **01/02 编号**：段落前加序号标注，清晰的信息层级
- **Chip Grid 布局**：数据以 chip（小矩形标签）在网格中精确排列
- **极简色彩**：黑白 + lime，语义色仅用于状态标签（amber/emerald/rose）
- **VIP 视觉**：深墨底 + 烫金文字，克制使用

## Design Tokens

### 色彩
- 背景基底：`#000000`
- Surface（卡片）：`#0a0a0a`（zinc-950）
- 强调色 Accent：`#b4ff39`（lime-400）
- 强调色 hover：`#c5ff6b`
- 前景文字：`#ffffff`
- 次要文字：`#a1a1aa`（zinc-400）
- 弱文字：`#71717a`（zinc-500）
- 边框：`rgba(255, 255, 255, 0.08)`
- 语义色：ok = emerald-400 / warn = amber-400 / err = rose-400

### 字体
- 标题：`Instrument Serif`（衬线体，Google Fonts），大字号，tracking-tight
- 品牌标题发光：text-glow-lime / text-glow-white
- 正文：系统栈 `PingFang SC / Hiragino Sans GB / Microsoft YaHei`
- 正文：系统栈 `PingFang SC / Hiragino Sans GB / Microsoft YaHei`
- 编号标注：`font-mono` 等宽字体，zinc-600 色
- 页面标题：text-4xl font-serif font-light tracking-tight
- 段落标题：text-xl font-serif
- 正文：text-sm / 辅助 text-xs

### 圆角 / 阴影 / 间距
- 圆角：全部 `rounded-none`（0px）
- 卡片：`border: 1px solid rgba(255,255,255,0.08)`，无阴影
- 间距节奏：16 / 24 / 32 / 48 / 64（px），比常规更宽松

### 动效
- 入场：`fade-up` 从下方淡入 + `stagger` 依次出现
- Hover：边框从 `0.08` 亮到 `0.2`，微上移 1px
- 按钮：按下 `scale(0.98)`
- 数据：数字从 0 滚动到目标值
- 渐变背景：缓慢流动的深色渐变
- 浮动光球：3 个半透明 lime 光球缓慢漂浮
- 无粒子、无视差、无弹跳

## 布局
- 全宽居中布局，max-w-7xl
- 顶部导航栏：黑色底 + 极细底边框 + Logo 左 + 导航中 + 用户右
- 无侧边栏，内容区从导航栏下方开始
- 大量 padding（py-24 / py-32）

## 组件规范
- **卡片**：`.topo-card` = 纯黑底 + 极细白边框 + 无圆角 + 无阴影
- **Chip**：小矩形标签，细边框 + zinc-500 文字
- **按钮主**：lime 绿底 + 黑字 + 无圆角
- **按钮次**：透明底 + 白字 + 细边框 + 无圆角
- **编号标注**：`01.` `02.` 等宽 mono + zinc-600 + 小字号
- **VIP 徽章**：深墨底 + 烫金字
- **进度条**：轨道 zinc-900，填充 lime 线性渐变，无圆角

## 内容 / 文案调性
- 简体中文，语气务实、专业、克制
- 数字半角，中文标点全角
- 不用口语化表达

## 设计禁忌
- 不使用圆角（rounded-none 为唯一选择）
- 不使用模糊/毛玻璃效果
- 不使用阴影
- 不使用渐变按钮（除 VIP 烫金）
- 不使用浅色背景/米灰色
- 不使用多个强调色（只有 lime）
- 不使用粗体标题（标题用 light 字重）
- 不加入场粒子、滚动视差

## 情绪陪伴视觉规范
- 心情选择器：Emoji + 文字标签，选中态 lime 底 + zinc-600 描边
- AI 陪伴回复区：zinc-900 底 + 极细 lime 边框
- 打卡徽章：已解锁 lime/10 底 + lime 文字，未解锁 zinc-900
- 情绪树洞：emerald 主色调（安全倾诉）
- AI 陪伴浮窗：纯黑底 + 细白边框，固定右下角 z-50
