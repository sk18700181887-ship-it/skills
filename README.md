# 公考申论规范词 AI Skills

由 cangjie-skill 从 8 个公考规范词课程 PDF 蒸馏产出的 5 个可执行 AI Skill。

## Skills

| # | Skill | 核心能力 |
|---|-------|---------|
| 1 | [三模式翻译框架](skills/sanmoshi-fanyi/SKILL.md) | 先分类材料→用对应模式翻译规范词 |
| 2 | [问题-对策映射](skills/wenti-celue-yinghe/SKILL.md) | 精准选词 + 近义词区分 |
| 3 | [信号词触发链](skills/xinhao-ci-fanyi/SKILL.md) | 快速翻译，建立条件反射 |
| 4 | [分维度模板](skills/fen-weidu-moban/SKILL.md) | 5 套预制结构模板 |
| 5 | [跨领域组合](skills/kua-lingyu-zuhe/SKILL.md) | 多领域融合的高分答案组织 |

## 快速开始

- **不想看全部？** 读 [DIGEST.md](DIGEST.md) 精华长文（~5700字）
- **想看索引？** [INDEX.md](INDEX.md) 含学习路径和依赖关系图
- **查术语？** [GLOSSARY.md](GLOSSARY.md) 128 条公考规范词

## 推荐学习顺序

1. **sanmoshi-fanyi** — 基础翻译方法（最重要）
2. **xinhao-ci-fanyi** + **wenti-celue-yinghe** — 练速度和精度
3. **fen-weidu-moban** — 结构化答题
4. **kua-lingyu-zuhe** — 跨领域组合答题

## 文件结构

```
├── DIGEST.md              # 精华长文
├── INDEX.md               # Skill 索引 + 学习路径
├── GLOSSARY.md            # 术语词典 (128条)
├── test-results.md        # 压力测试报告
├── test-cross-skill.json  # 跨skill混淆测试
└── skills/
    ├── sanmoshi-fanyi/
    │   ├── SKILL.md
    │   └── test-prompts.json
    ├── wenti-celue-yinghe/
    │   ├── SKILL.md
    │   └── test-prompts.json
    ├── xinhao-ci-fanyi/
    │   ├── SKILL.md
    │   └── test-prompts.json
    ├── fen-weidu-moban/
    │   ├── SKILL.md
    │   └── test-prompts.json
    └── kua-lingyu-zuhe/
        ├── SKILL.md
        └── test-prompts.json
```

## 蒸馏方法

使用 [cangjie-skill](https://github.com/anthropics/cangjie-skill) RIA-TV++ 流水线蒸馏。
45 条测试用例，100% 通过率。
