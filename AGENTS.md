# AGENTS.md · 考编备考全攻略生成器

## 项目概览
纯前端「单页 HTML」应用。用户填写学校/专业/毕业时间/备考起点/目标省份/考试类型等基本信息，页面右侧多 Tab 实时渲染专业匹配、城市梯队、月度计划、周课表、行测/申论/公基专项、考试倒排和完整报告。

- 技术栈：原生 HTML + CSS + Vanilla JS（无构建、无依赖、无网络字体）。
- 模板：`native-static`，通过 `python -m http.server` 提供静态服务。
- 端口：从环境变量 `DEPLOY_RUN_PORT` 读取（默认 5000）。

## 目录结构
```
.
├── index.html          # 全部页面、样式与脚本都在这一份文件（单文件应用）
├── DESIGN.md           # 视觉与交互设计规范
├── AGENTS.md           # 本文档
├── assets/             # 原始产品文档与原型（参考用，不参与运行）
│   ├── 考编备考全攻略生成器.html
│   └── 考编备考全攻略生成器_产品文档.md
└── .coze               # 构建与运行配置（native-static，勿改）
```

## 常用命令
| 场景 | 命令 |
| --- | --- |
| 启动开发预览 | `coze dev`（主仓沙箱已常驻，无需手动启动） |
| 构建生产版本 | `coze build` |
| 启动生产版本 | `coze start` |

## index.html 代码地图
| 区块 | 起始特征 | 说明 |
| --- | --- | --- |
| CSS 变量与 Tokens | `:root{` | 色彩、字体、圆角等 Design Tokens，参见 `DESIGN.md` |
| 布局样式 | `.page{`、`.lpanel{`、`.rmain{` | 左栏 308px + 右栏自适应 |
| 打印样式 | `@media print{` | 打印时隐藏左栏、Tabs 与按钮，所有 Tab 内容一起展开 |
| 左栏表单 | `<aside class="lpanel">` | 输入字段与 checkbox |
| 右栏 Hero + KPI | `<div class="hero">` | 顶部标题与 4 个关键数字 |
| Tab 导航 | `<nav class="tabs">` | 9 个 Tab 切换按钮 |
| 数据常量 | `LIBS` / `PROVINCES` / `EVENTS` | 专业库 / 城市梯队 / 考试节点 |
| 渲染函数 | `renderMatch/renderCity/renderMonth/renderWeek/renderXingce/renderShenlun/renderGongji/renderCountdown/renderReport` | 每个 Tab 一个 render 函数 |
| 事件与主渲染 | `render()`、末尾 `document.querySelectorAll('input,select')` | `input/change` 立即触发 `render()` |

## 修改指南
- **改数据（专业库/省份城市/考试节点）**：定位 `LIBS`、`PROVINCES`、`EVENTS` 数组，保持格式一致即可，无需改渲染逻辑。
- **改视觉 Token**：先读 `DESIGN.md`，再改 `:root` 中的 CSS 变量。禁止引入外部字体或彩色渐变按钮。
- **加新 Tab**：
  1. `<nav class="tabs">` 内加 `<button class="tab" data-tab="xxx">`；
  2. `<div class="content">` 内加 `<div id="xxx" class="view hide"></div>`；
  3. 新增 `renderXxx()` 函数并在 `render()` 里调用。
- **参考基准日期**：脚本内 `TODAY = new Date('2026-06-23T00:00:00')` 与 `EVENTS` 中的日期配套，如需切换基准日期请同步调整。

## 交付前检查
- 静态服务器可访问：`curl -I -s --max-time 3 http://localhost:${DEPLOY_RUN_PORT}` 应返回 200。
- 页面在桌面 / 移动端断点（820px）下布局正确。
- 无外部依赖：`index.html` 不引入任何 CDN、字体、JS 库。
- 打印预览：仅右栏内容随打印铺满，所有 Tab 内容一起展开。

## 已知约束
- 产品文档明确要求「独立 HTML，无外部依赖」，禁止改为多文件工程或引入 npm 依赖。
- 备考基准日期为 2026-06-23（与考试节点年份配套），不接入实时 `new Date()`。
- 输入均为客户端表单，无后端接口，无接口冒烟测试项。
