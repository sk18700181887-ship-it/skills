// 上岸引擎 · Mock 数据层
// 商业化前端展示所需的所有假数据集中管理，方便后续替换为真实 API

export const BRAND = {
  name: '上岸引擎',
  slogan: 'AI 陪练，稳步上岸',
  logo: '上岸',
};

export const USER = {
  id: 'u_2081',
  nickname: '备考中的小李',
  avatar: '',
  school: '齐鲁工业大学',
  major: '计算机科学与技术（物联网方向）',
  graduation: '2027-07',
  province: '山东省',
  isVip: false,
  vipExpiredAt: null as string | null,
  streakDays: 27, // 连续打卡
  totalMinutes: 4826, // 累计学习分钟
  totalQuestions: 3872,
  correctRate: 0.71,
  nationalRank: 8642,
  provinceRank: 512,
};

// 距离下次核心考试的天数（省考 2026-12-20，以 TODAY = 2026-06-23 为基准计算 → 180 天）
export const NEXT_EXAM = {
  name: '2026 山东省考',
  date: '2026-12-20',
  daysLeft: 180,
};

export const KPI = {
  daysLeft: NEXT_EXAM.daysLeft,
  totalMinutes: USER.totalMinutes,
  correctRate: Math.round(USER.correctRate * 100),
  nationalRank: USER.nationalRank,
};

// 每日 AI 智能推荐任务
export const TODAY_TASKS = [
  {
    id: 't1',
    time: '上午 · 09:00',
    module: '资料分析',
    title: '增长率速算 20 题',
    goal: '限时 25 分钟，正确率 ≥ 85%',
    minutes: 25,
    done: true,
    vipOnly: false,
  },
  {
    id: 't2',
    time: '下午 · 14:30',
    module: '判断推理',
    title: '图形推理专项 15 题',
    goal: '掌握"位置类"3 种规律',
    minutes: 30,
    done: true,
    vipOnly: false,
  },
  {
    id: 't3',
    time: '下午 · 16:00',
    module: '申论',
    title: '综合分析题 AI 批改',
    goal: '限时 45 分钟 + AI 逐句点评',
    minutes: 60,
    done: false,
    vipOnly: true,
  },
  {
    id: 't4',
    time: '晚上 · 20:00',
    module: '错题回顾',
    title: '本周错题智能三遍法',
    goal: 'AI 挑选 12 道薄弱题重做',
    minutes: 30,
    done: false,
    vipOnly: false,
  },
];

// 五大模块能力（雷达图）
export const RADAR = [
  { name: '资料分析', score: 88 },
  { name: '判断推理', score: 82 },
  { name: '言语理解', score: 68 },
  { name: '数量关系', score: 55 },
  { name: '常识判断', score: 61 },
];

// 近 7 日打卡与做题量
export const WEEKLY = [
  { day: '06-17', done: true, minutes: 118, questions: 92, correct: 74 },
  { day: '06-18', done: true, minutes: 152, questions: 128, correct: 79 },
  { day: '06-19', done: true, minutes: 96, questions: 68, correct: 66 },
  { day: '06-20', done: true, minutes: 174, questions: 142, correct: 81 },
  { day: '06-21', done: true, minutes: 136, questions: 108, correct: 72 },
  { day: '06-22', done: true, minutes: 208, questions: 168, correct: 84 },
  { day: '06-23', done: false, minutes: 62, questions: 48, correct: 68 },
];

// 岗位库
export const JOB_CATEGORIES = [
  {
    id: 'it',
    name: '计算机信息类',
    keys: [
      '计算机',
      '软件',
      '网络',
      '物联网',
      '数据',
      '信息',
      '人工智能',
      '通信',
      '电子',
    ],
    posts: [
      {
        name: '信息化管理',
        unit: '大数据局 / 政府办 / 行政审批局',
        content: '数字政府、数据治理、系统建设',
        competition: '中等',
        salary: '8-12万',
        ratio: '38 : 1',
      },
      {
        name: '网络安全',
        unit: '公安网安 / 网信部门',
        content: '安全监管、技术侦察、系统安全',
        competition: '较高',
        salary: '10-15万',
        ratio: '72 : 1',
      },
      {
        name: '税务信息化',
        unit: '税务局信息中心',
        content: '系统运维、数据分析',
        competition: '中等',
        salary: '9-13万',
        ratio: '46 : 1',
      },
      {
        name: '统计信息化',
        unit: '统计局 / 调查队',
        content: '数据处理、平台维护',
        competition: '中低',
        salary: '8-11万',
        ratio: '22 : 1',
      },
      {
        name: '事业技术岗',
        unit: '信息中心 / 高校 / 医院信息科',
        content: '运维、开发、信息化服务',
        competition: '较低',
        salary: '7-10万',
        ratio: '14 : 1',
      },
      {
        name: '司法信息化',
        unit: '法院 / 检察院',
        content: '智慧法院、电子卷宗、技术保障',
        competition: '中等',
        salary: '9-13万',
        ratio: '35 : 1',
      },
    ],
  },
  {
    id: 'finance',
    name: '财会经管类',
    keys: ['会计', '财务', '金融', '经济', '管理', '工商', '审计'],
    posts: [
      {
        name: '财务管理',
        unit: '财政局 / 审计局',
        content: '预算、核算、审计监督',
        competition: '中等',
        salary: '9-13万',
        ratio: '52 : 1',
      },
      {
        name: '税务征管',
        unit: '税务局',
        content: '税收征管、纳税服务',
        competition: '中等',
        salary: '9-14万',
        ratio: '48 : 1',
      },
      {
        name: '经济管理',
        unit: '发改 / 商务 / 市场监管',
        content: '产业、项目、市场监管',
        competition: '中等',
        salary: '9-13万',
        ratio: '58 : 1',
      },
      {
        name: '事业财务岗',
        unit: '高校 / 医院 / 中心站所',
        content: '财务核算、资产管理',
        competition: '中低',
        salary: '7-10万',
        ratio: '18 : 1',
      },
    ],
  },
  {
    id: 'law',
    name: '法学类',
    keys: ['法学', '法律', '知识产权', '政治学'],
    posts: [
      {
        name: '行政执法',
        unit: '市场监管 / 司法 / 城管',
        content: '执法办案、法制审核',
        competition: '中等',
        salary: '8-12万',
        ratio: '42 : 1',
      },
      {
        name: '司法行政',
        unit: '司法局 / 法院 / 检察院',
        content: '法治宣传、案件辅助',
        competition: '较高',
        salary: '9-13万',
        ratio: '68 : 1',
      },
      {
        name: '纪检监察辅助',
        unit: '纪检 / 审计相关单位',
        content: '监督检查、材料整理',
        competition: '中等',
        salary: '8-12万',
        ratio: '39 : 1',
      },
    ],
  },
  {
    id: 'chinese',
    name: '中文新闻类',
    keys: ['汉语言', '新闻', '传播', '秘书', '中文', '文秘'],
    posts: [
      {
        name: '文字综合',
        unit: '办公室 / 宣传部',
        content: '公文、调研、综合材料',
        competition: '中等',
        salary: '8-12万',
        ratio: '55 : 1',
      },
      {
        name: '宣传文化',
        unit: '宣传 / 文旅 / 融媒体',
        content: '宣传策划、内容生产',
        competition: '中等',
        salary: '8-11万',
        ratio: '48 : 1',
      },
      {
        name: '基层综合岗',
        unit: '街道 / 乡镇',
        content: '材料、协调、群众工作',
        competition: '中低',
        salary: '7-9万',
        ratio: '20 : 1',
      },
    ],
  },
  {
    id: 'sci',
    name: '理工科通用类',
    keys: ['建筑', '土木', '化工', '生物', '物理', '数学', '机械', '电气'],
    posts: [
      {
        name: '工程技术岗',
        unit: '住建 / 水利 / 交通 / 自然资源',
        content: '工程管理、技术保障',
        competition: '中等',
        salary: '9-13万',
        ratio: '32 : 1',
      },
      {
        name: '检验检测',
        unit: '质量监管 / 市场监管',
        content: '技术检验、标准执行',
        competition: '中低',
        salary: '8-11万',
        ratio: '18 : 1',
      },
      {
        name: '事业专业岗',
        unit: '研究机构 / 事业单位',
        content: '专业研究、技术服务',
        competition: '中低',
        salary: '7-10万',
        ratio: '15 : 1',
      },
    ],
  },
  {
    id: 'general',
    name: '通用综合类',
    keys: [],
    posts: [
      {
        name: '综合管理',
        unit: '各级机关事业单位',
        content: '综合事务、协调执行',
        competition: '中等',
        salary: '8-11万',
        ratio: '52 : 1',
      },
      {
        name: '公共服务',
        unit: '街道 / 基层单位',
        content: '窗口服务、基层治理',
        competition: '中低',
        salary: '7-9万',
        ratio: '22 : 1',
      },
      {
        name: '事业综合岗',
        unit: '学校 / 医院 / 中心站所',
        content: '行政管理、项目执行',
        competition: '较低',
        salary: '7-10万',
        ratio: '14 : 1',
      },
    ],
  },
];

export function matchCategory(major: string) {
  const m = major.trim();
  for (let i = 0; i < JOB_CATEGORIES.length - 1; i++) {
    const c = JOB_CATEGORIES[i];
    if (c.keys.some((k) => m.indexOf(k) > -1)) return c;
  }
  return JOB_CATEGORIES[JOB_CATEGORIES.length - 1];
}

// 题库分类与免费额度
export const PRACTICE_CATEGORIES = [
  { id: 'ziliao', name: '资料分析', count: 4820, difficulty: '中', hot: true },
  { id: 'judge', name: '判断推理', count: 6350, difficulty: '中高', hot: true },
  { id: 'yanyu', name: '言语理解', count: 5210, difficulty: '中', hot: false },
  { id: 'shuliang', name: '数量关系', count: 3980, difficulty: '难', hot: false },
  { id: 'changshi', name: '常识判断', count: 8420, difficulty: '中低', hot: false },
  { id: 'gongji', name: '公共基础知识', count: 6180, difficulty: '中', hot: true },
];

export const FREE_DAILY_LIMIT = 10;
export const USED_TODAY = 7;

// 演示题（用于练习页面）
export const DEMO_QUESTIONS = [
  {
    id: 'q1',
    module: '资料分析',
    difficulty: '中',
    stem:
      '2025 年 A 市地区生产总值达到 12680 亿元，同比增长 6.2%。其中第三产业增加值 7420 亿元，同比增长 7.1%。则 2024 年 A 市第三产业增加值约为？',
    options: [
      'A. 6928 亿元',
      'B. 7010 亿元',
      'C. 7156 亿元',
      'D. 7284 亿元',
    ],
    answer: 0,
    analysis:
      '2024 年第三产业 = 7420 ÷ (1 + 7.1%) ≈ 7420 ÷ 1.071 ≈ 6928 亿元。速算技巧：错位加减法（1/x 近似）。',
    stat: { correct: 0.72, avgTime: 82 },
  },
  {
    id: 'q2',
    module: '判断推理',
    difficulty: '中高',
    stem:
      '所有的公务员都通过了行测考试。小张通过了行测考试。以下哪项一定为真？',
    options: [
      'A. 小张是公务员',
      'B. 小张一定不是公务员',
      'C. 小张可能是公务员',
      'D. 无法判断',
    ],
    answer: 2,
    analysis:
      '"所有 A 都是 B" 不能反推 "B 都是 A"。小张通过考试不必然是公务员，但仍有可能。这是典型的"逆否命题"陷阱。',
    stat: { correct: 0.58, avgTime: 46 },
  },
  {
    id: 'q3',
    module: '言语理解',
    difficulty: '中',
    stem:
      '文化建设需要____，不能____，更不能急功近利。填入横线处最恰当的一项是：',
    options: [
      'A. 循序渐进 一蹴而就',
      'B. 精益求精 敷衍了事',
      'C. 千锤百炼 浅尝辄止',
      'D. 厚积薄发 半途而废',
    ],
    answer: 0,
    analysis:
      '第二空与"急功近利"构成语义呼应链，"一蹴而就"最贴切；第一空"循序渐进"与之构成"稳步 vs 求快"的对照。',
    stat: { correct: 0.81, avgTime: 38 },
  },
];

// 模考套卷
export const MOCK_PAPERS = [
  {
    id: 'mp1',
    name: '2026 山东省考仿真模考 · 第 12 期',
    tag: '省考',
    module: '行测',
    date: '2026-06-25 20:00',
    duration: 120,
    joined: 8642,
    peakRank: 3,
    difficulty: '难',
    vipOnly: false,
    highlight: '本周主推',
  },
  {
    id: 'mp2',
    name: '国考行测冲刺卷 · 判断推理专项',
    tag: '国考',
    module: '行测',
    date: '2026-06-26 20:00',
    duration: 60,
    joined: 5231,
    peakRank: null,
    difficulty: '中高',
    vipOnly: true,
  },
  {
    id: 'mp3',
    name: '事业单位综合应用能力模考',
    tag: '事业单位',
    module: '综合',
    date: '2026-06-27 09:30',
    duration: 90,
    joined: 3128,
    peakRank: null,
    difficulty: '中',
    vipOnly: true,
  },
  {
    id: 'mp4',
    name: '申论限时训练 · 综合分析专项',
    tag: '省考',
    module: '申论',
    date: '2026-06-28 14:00',
    duration: 180,
    joined: 2044,
    peakRank: null,
    difficulty: '难',
    vipOnly: false,
  },
];

// 申论批改样本
export const SHENLUN_SAMPLES = [
  {
    id: 's1',
    title: '论"绿水青山"与高质量发展',
    score: 42,
    fullScore: 40,
    date: '2026-06-19',
    tag: '大作文',
    highlights: [
      '论点鲜明，"三位一体"结构清晰',
      '第三段论据略单薄，缺少具体数据',
      '结尾升华可再抬升 1-2 个层次',
    ],
  },
  {
    id: 's2',
    title: '关于基层治理创新的调研报告',
    score: 24,
    fullScore: 25,
    date: '2026-06-18',
    tag: '贯彻执行',
    highlights: [
      '格式规范，标题 / 主送 / 落款完整',
      '措施部分条目化，主体明确',
      '第 4 条建议可再具体化',
    ],
  },
];

// 会员套餐
export const VIP_PLANS = [
  {
    id: 'monthly',
    name: '月卡',
    price: 68,
    origin: 128,
    unit: '/ 月',
    subtitle: '轻体验，先试用',
    features: [
      '题库无限刷',
      '每周 2 场模考',
      '错题智能推题',
      '基础学习报告',
    ],
    highlight: false,
  },
  {
    id: 'quarter',
    name: '季卡',
    price: 168,
    origin: 384,
    unit: '/ 3 月',
    subtitle: '省 ¥36，最热门',
    features: [
      '包含月卡全部权益',
      '申论 AI 批改 无限次',
      '深度岗位竞争报告',
      '专属学习顾问社群',
    ],
    highlight: true,
    tag: '👑 最超值',
  },
  {
    id: 'year',
    name: '年卡',
    price: 498,
    origin: 1536,
    unit: '/ 年',
    subtitle: '省 ¥318，陪你上岸',
    features: [
      '包含季卡全部权益',
      '面试 1v1 模拟 3 次',
      '人工申论批改 5 篇',
      '协议班减免 ¥500',
    ],
    highlight: false,
    tag: '陪跑一年',
  },
];

export const AGREEMENT_PLAN = {
  id: 'agreement',
  name: '协议班 · 稳过上岸',
  price: 9800,
  refund: 8000,
  subtitle: '笔试未过，全额退款 ¥8000',
  features: [
    '全套 VIP 权益（含年卡）',
    '教研老师 1v1 学习规划',
    '每周 4 次直播精讲',
    '专属申论人工批改 20 篇',
    '面试全真模拟 8 次',
    '未上岸退 ¥8000（签订电子协议）',
  ],
};

// 学习排行榜（本周做题量）
export const RANK_STUDY = [
  { rank: 1, name: '呼呼学长', school: '山东大学', questions: 3820, streak: 88, badge: 'VIP' },
  { rank: 2, name: '公考小柚子', school: '中国海洋大学', questions: 3640, streak: 65, badge: 'VIP' },
  { rank: 3, name: '备考中的小李', school: '齐鲁工业大学', questions: 2872, streak: 27, badge: '', self: true },
  { rank: 4, name: 'Miku上岸', school: '青岛大学', questions: 2681, streak: 52, badge: 'VIP' },
  { rank: 5, name: '公考队长', school: '济南大学', questions: 2438, streak: 41, badge: 'VIP' },
  { rank: 6, name: '烟台阿黎', school: '烟台大学', questions: 2192, streak: 30, badge: '' },
  { rank: 7, name: '半月谈鱼', school: '山东财大', questions: 2098, streak: 23, badge: 'VIP' },
  { rank: 8, name: '临沂张同学', school: '临沂大学', questions: 1874, streak: 18, badge: '' },
];

// 上岸榜（学员案例）
export const RANK_SUCCESS = [
  {
    id: 'a1',
    name: '王同学',
    unit: '济南市大数据局 · 信息化管理岗',
    salary: '11.2 万 / 年',
    days: 168,
    score: 148.6,
    quote: '错题本 + 模考排名让我实实在在看到自己在进步。',
  },
  {
    id: 'a2',
    name: '刘同学',
    unit: '青岛海关 · 税务征管岗',
    salary: '12.8 万 / 年',
    days: 232,
    score: 145.2,
    quote: '协议班的教研规划把我拉出了半年瓶颈期。',
  },
  {
    id: 'a3',
    name: '张同学',
    unit: '烟台某区法院 · 司法信息化',
    salary: '10.4 万 / 年',
    days: 195,
    score: 142.8,
    quote: '申论 AI 批改是真正的分数增长点，写作从 28 涨到 38。',
  },
  {
    id: 'a4',
    name: '陈同学',
    unit: '山东省某厅 · 综合管理',
    salary: '13.5 万 / 年',
    days: 285,
    score: 151.4,
    quote: '每天 20 题 + 模考坚持，600 天后终于上岸。',
  },
];

// 直播 / 录播课
export const COURSES = [
  {
    id: 'c1',
    title: '资料分析 · 15 天速算冲刺',
    teacher: '崔老师',
    students: 12480,
    duration: '15 讲',
    price: 0,
    tag: '免费公开课',
  },
  {
    id: 'c2',
    title: '申论大作文 · 五段三分式全套',
    teacher: '林老师',
    students: 8620,
    duration: '20 讲',
    price: 199,
  },
  {
    id: 'c3',
    title: '2026 国考岗位精析',
    teacher: '罗老师',
    students: 5210,
    duration: '8 讲',
    price: 0,
    tag: '限时免费',
  },
];

// 五大模块能力（含目标线）
export const MODULE_SCORES = [
  { name: '资料分析', value: 88, target: 90 },
  { name: '判断推理', value: 82, target: 85 },
  { name: '言语理解', value: 68, target: 80 },
  { name: '数量关系', value: 55, target: 70 },
  { name: '常识判断', value: 61, target: 60 },
];

// 近期模考成绩
export const RECENT_MOCKS = [
  {
    id: 'rm1',
    name: '省考仿真第 11 期',
    date: '06-20',
    duration: '118 分',
    score: 76.5,
    rank: 512,
  },
  {
    id: 'rm2',
    name: '国考行测冲刺',
    date: '06-16',
    duration: '120 分',
    score: 71.2,
    rank: 892,
  },
  {
    id: 'rm3',
    name: '判断推理专项',
    date: '06-12',
    duration: '58 分',
    score: 82.0,
    rank: 246,
  },
];

// 教研公告
export const ANNOUNCEMENTS = [
  {
    id: 'n1',
    tag: '教研',
    title: '2026 山东省考大纲深度解读直播，本周六 19:30 开讲',
    date: '06-23',
  },
  {
    id: 'n2',
    tag: '题库',
    title: '资料分析新增 2025 年 6 月最新真题 320 道',
    date: '06-22',
  },
  {
    id: 'n3',
    tag: '活动',
    title: '老带新组队上岸：每邀请 1 位好友返 ¥50 现金',
    date: '06-20',
  },
  {
    id: 'n4',
    tag: '公告',
    title: 'AI 申论批改模型升级至 v2.3，批改精度提升 12%',
    date: '06-18',
  },
];

// 派生 User 便捷字段
export const USER_STATS = {
  accuracy: Math.round(USER.correctRate * 100),
  rank: USER.nationalRank,
};
