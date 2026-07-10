// 上岸引擎 · 全量 Mock 数据层
// 覆盖考公全路径 7 大阶段：了解→匹配→报名→备考→模考→面试→政审

/* ========== 品牌与用户 ========== */
export const BRAND = { name: '上岸引擎', slogan: 'AI 陪练，稳步上岸', logo: '上岸' };

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
  streakDays: 27,
  totalMinutes: 4826,
  totalQuestions: 3872,
  correctRate: 0.71,
  nationalRank: 8642,
  provinceRank: 512,
  // 阶段进度（0~100）
  phaseProgress: { explore: 90, match: 60, apply: 20, prepare: 45, sprint: 15, interview: 0, review: 0 },
};

/* ========== 考公全路径 7 阶段 ========== */
export const JOURNEY_PHASES = [
  { id: 'explore', label: '了解考公', icon: 'Compass', href: '/explore', desc: '考试类型、流程、时间线', aiFeature: 'AI 考公百科', free: true },
  { id: 'match', label: '岗位匹配', icon: 'Sparkles', href: '/match', desc: '专业→岗位→竞争预测', aiFeature: 'AI 智能推荐', free: true },
  { id: 'apply', label: '报名决策', icon: 'ClipboardCheck', href: '/apply', desc: '冲稳保策略、竞争比分析', aiFeature: 'AI 报名组合推荐', free: false },
  { id: 'prepare', label: '笔试备考', icon: 'BookOpen', href: '/plan', desc: '学习规划、题库、申论、公基', aiFeature: 'AI 推题+批改+图谱', free: true },
  { id: 'sprint', label: '模考冲刺', icon: 'Timer', href: '/mock', desc: '全真模考、成绩预测', aiFeature: 'AI 上岸概率', free: true },
  { id: 'interview', label: '面试备战', icon: 'Mic', href: '/interview', desc: '结构化面试、实时点评', aiFeature: 'AI 面试模拟', free: false },
  { id: 'review', label: '政审体检', icon: 'ShieldCheck', href: '/explore#review', desc: '材料清单、流程指导', aiFeature: 'AI 材料检查', free: false },
];

/* ========== 距考倒计时 ========== */
export const EXAM_COUNTDOWNS = [
  { name: '2027 国考报名', date: '2026-10-15', type: '报名', color: 'ok' as const },
  { name: '2027 国考笔试', date: '2026-11-29', type: '笔试', color: 'warn' as const },
  { name: '2027 山东省考报名', date: '2026-11-15', type: '报名', color: 'ok' as const },
  { name: '2027 山东省考笔试', date: '2026-12-20', type: '笔试', color: 'warn' as const },
  { name: '选调生笔试', date: '2026-12-25', type: '笔试', color: 'warn' as const },
  { name: '事业单位报名', date: '2027-02-15', type: '报名', color: 'ok' as const },
  { name: '军队文职报名', date: '2027-03-15', type: '报名', color: 'ok' as const },
  { name: '三支一扶报名', date: '2027-04-15', type: '报名', color: 'ok' as const },
];

export const NEXT_EXAM = { name: '2027 山东省考', date: '2026-12-20', daysLeft: 180 };

/* ========== 一、考公全景（Explore）========== */
export const EXAM_TYPES = [
  { id: 'guokao', name: '国家公务员考试', short: '国考', period: '每年 10 月报名 / 11 月底笔试', subjects: '行测 + 申论', difficulty: '★★★★☆', avgRatio: '60:1', feature: '中央部委 + 垂管系统', tip: '应届+限制专业岗位竞争最低' },
  { id: 'shengkao', name: '各省公务员考试', short: '省考', period: '各省不同，多为 3-4 月', subjects: '行测 + 申论', difficulty: '★★★★☆', avgRatio: '45:1', feature: '省内主战场，岗位最多', tip: '山东/广东/江苏为竞争前三省份' },
  { id: 'sydw', name: '事业单位招聘', short: '事业单位', period: '全年分散，集中在 2-5 月', subjects: '公基 + 综合写作 / 职测 + 综合', difficulty: '★★★☆☆', avgRatio: '30:1', feature: '门槛较低，竞争相对小', tip: '公基占大头，必须单独备考' },
  { id: 'xuandiao', name: '选调生考试', short: '选调生', period: '11-12 月报名 / 12-1 月笔试', subjects: '行测 + 申论 + 综合知识', difficulty: '★★★★★', avgRatio: '20:1', feature: '门槛高（党员+干部+名校）', tip: '满足条件一定要报，竞争比远低于国省考' },
  { id: 'junwen', name: '军队文职', short: '军文', period: '1-2 月报名 / 3-4 月笔试', subjects: '公共科目 + 专业科目', difficulty: '★★★☆☆', avgRatio: '25:1', feature: '技术岗待遇好，体测要求严', tip: '计算机/医学类专业岗位最多' },
  { id: 'sanyi', name: '三支一扶', short: '三支一扶', period: '3-5 月报名 / 5-6 月笔试', subjects: '公基 + 农业农村知识', difficulty: '★★☆☆☆', avgRatio: '15:1', feature: '基层服务 2 年，期满转编', tip: '保底首选，可同时参加其他考试' },
];

export const EXAM_TIMELINE = [
  { month: '1月', events: ['各省省考公告陆续发布', '军队文职备考启动'] },
  { month: '2月', events: ['事业单位联考报名', '军队文职报名', '省考备考黄金期'] },
  { month: '3月', events: ['多省联考笔试', '三支一扶公告', '事业单位备考'] },
  { month: '4月', events: ['省考成绩查询', '三支一扶报名', '事业单位笔试'] },
  { month: '5月', events: ['省考面试', '三支一扶笔试', '国考备考启动'] },
  { month: '6月', events: ['省考面试尾声', '国考备考第一轮'] },
  { month: '7-8月', events: ['国考暑期强化', '选调生资格准备', '事业编补录'] },
  { month: '9月', events: ['国考大纲发布', '秋招 vs 考公抉择', '选调生公告'] },
  { month: '10月', events: ['国考报名', '选调生报名', '省考提前批'] },
  { month: '11月', events: ['国考笔试冲刺', '省考报名', '考前最后刷题'] },
  { month: '12月', events: ['国考笔试', '省考笔试', '选调生笔试'] },
];

/* ========== 二、AI 岗位匹配 ========== */
export const JOB_CATEGORIES = [
  {
    id: 'it', name: '计算机信息类',
    keys: ['计算机','软件','网络','物联网','数据','信息','人工智能','通信','电子'],
    posts: [
      { name: '信息化管理', unit: '大数据局/政府办/行政审批局', content: '数字政府、数据治理、系统建设', competition: '中等', salary: '8-12万', ratio: '38:1' },
      { name: '网络安全', unit: '公安网安/网信部门', content: '安全监管、技术侦察', competition: '较高', salary: '10-15万', ratio: '72:1' },
      { name: '税务信息化', unit: '税务局信息中心', content: '系统运维、数据分析', competition: '中等', salary: '9-13万', ratio: '46:1' },
      { name: '统计信息化', unit: '统计局/调查队', content: '数据处理、平台维护', competition: '中低', salary: '8-11万', ratio: '22:1' },
      { name: '事业技术岗', unit: '信息中心/高校/医院', content: '运维、开发、信息化服务', competition: '较低', salary: '7-10万', ratio: '14:1' },
      { name: '司法信息化', unit: '法院/检察院', content: '智慧法院、电子卷宗', competition: '中等', salary: '9-13万', ratio: '35:1' },
    ],
  },
  {
    id: 'finance', name: '财会经管类',
    keys: ['会计','财务','金融','经济','管理','工商','审计'],
    posts: [
      { name: '财务管理', unit: '财政局/审计局', content: '预算、核算、审计监督', competition: '中等', salary: '9-13万', ratio: '52:1' },
      { name: '税务征管', unit: '税务局', content: '税收征管、纳税服务', competition: '中等', salary: '9-14万', ratio: '48:1' },
      { name: '经济管理', unit: '发改/商务/市场监管', content: '产业、项目、市场监管', competition: '中等', salary: '9-13万', ratio: '58:1' },
      { name: '事业财务岗', unit: '高校/医院/中心站所', content: '财务核算、资产管理', competition: '中低', salary: '7-10万', ratio: '18:1' },
    ],
  },
  {
    id: 'law', name: '法学类',
    keys: ['法学','法律','知识产权','政治学'],
    posts: [
      { name: '行政执法', unit: '市场监管/司法/城管', content: '执法办案、法制审核', competition: '中等', salary: '8-12万', ratio: '42:1' },
      { name: '司法行政', unit: '司法局/法院/检察院', content: '法治宣传、案件辅助', competition: '较高', salary: '9-13万', ratio: '68:1' },
      { name: '纪检监察辅助', unit: '纪检/审计相关单位', content: '监督检查、材料整理', competition: '中等', salary: '8-12万', ratio: '39:1' },
    ],
  },
  {
    id: 'chinese', name: '中文新闻类',
    keys: ['汉语言','新闻','传播','秘书','中文','文秘'],
    posts: [
      { name: '文字综合', unit: '办公室/宣传部', content: '公文、调研、综合材料', competition: '中等', salary: '8-12万', ratio: '55:1' },
      { name: '宣传文化', unit: '宣传/文旅/融媒体', content: '宣传策划、内容生产', competition: '中等', salary: '8-11万', ratio: '48:1' },
      { name: '基层综合岗', unit: '街道/乡镇', content: '材料、协调、群众工作', competition: '中低', salary: '7-9万', ratio: '20:1' },
    ],
  },
  {
    id: 'sci', name: '理工科通用类',
    keys: ['建筑','土木','化工','生物','物理','数学','机械','电气'],
    posts: [
      { name: '工程技术岗', unit: '住建/水利/交通/自然资源', content: '工程管理、技术保障', competition: '中等', salary: '9-13万', ratio: '32:1' },
      { name: '检验检测', unit: '质量监管/市场监管', content: '技术检验、标准执行', competition: '中低', salary: '8-11万', ratio: '18:1' },
      { name: '事业专业岗', unit: '研究机构/事业单位', content: '专业研究、技术服务', competition: '中低', salary: '7-10万', ratio: '15:1' },
    ],
  },
  {
    id: 'general', name: '通用综合类', keys: [] as string[],
    posts: [
      { name: '综合管理', unit: '各级机关事业单位', content: '综合事务、协调执行', competition: '中等', salary: '8-11万', ratio: '52:1' },
      { name: '公共服务', unit: '街道/基层单位', content: '窗口服务、基层治理', competition: '中低', salary: '7-9万', ratio: '22:1' },
      { name: '事业综合岗', unit: '学校/医院/中心站所', content: '行政管理、项目执行', competition: '较低', salary: '7-10万', ratio: '14:1' },
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

// AI 竞争预测（mock）
export const AI_PREDICTION = {
  overallScore: 78,
 上岸概率: '65%',
  strengths: ['专业对口（计算机类岗位多）', '应届生身份优势明显', '技术岗竞争低于综合岗'],
  risks: ['山东省整体竞争全国前三', '部分热门岗位竞争比超 100:1', '申论偏弱可能拖分'],
  suggestions: ['优先报考限制专业的技术岗', '山东省内避开济南/青岛核心区', '申论至少拿到 35 分以上'],
};

/* ========== 二、岗位匹配（Match）========== */
export const PROFESSION_LIB = [
  {
    name: '计算机信息类',
    keywords: ['计算机','软件','网络','物联网','数据','信息','人工智能','通信','电子'],
    positions: [
      { title: '信息化管理', org: '大数据局/政府办/行政审批局', desc: '数字政府、数据治理、系统建设', competition: '中等' },
      { title: '网络安全', org: '公安网安/网信部门', desc: '安全监管、技术侦察、系统安全', competition: '较高' },
      { title: '税务信息化', org: '税务局信息中心', desc: '系统运维、数据分析', competition: '中等' },
      { title: '统计信息化', org: '统计局/调查队', desc: '数据处理、平台维护', competition: '中低' },
      { title: '事业技术岗', org: '信息中心/高校/医院信息科', desc: '运维、开发、信息化服务', competition: '较低' },
    ],
  },
  {
    name: '财会经管类',
    keywords: ['会计','财务','金融','经济','管理','工商','审计'],
    positions: [
      { title: '财务管理', org: '财政局/审计局/机关财务', desc: '预算、核算、审计监督', competition: '中等' },
      { title: '税务征管', org: '税务局', desc: '税收征管、纳税服务', competition: '中等' },
      { title: '经济管理', org: '发改/商务/市场监管', desc: '产业、项目、市场监管', competition: '中等' },
      { title: '事业财务岗', org: '高校/医院/中心站所', desc: '财务核算、资产管理', competition: '中低' },
    ],
  },
  {
    name: '法学类',
    keywords: ['法学','法律','知识产权','政治学'],
    positions: [
      { title: '行政执法', org: '市场监管/司法/城管', desc: '执法办案、法制审核', competition: '中等' },
      { title: '司法行政', org: '司法局/法院/检察院', desc: '法治宣传、案件辅助', competition: '较高' },
      { title: '纪检监察辅助', org: '纪检/审计相关单位', desc: '监督检查、材料整理', competition: '中等' },
    ],
  },
  {
    name: '中文新闻类',
    keywords: ['汉语言','新闻','传播','秘书','中文','文秘'],
    positions: [
      { title: '文字综合', org: '办公室/宣传部', desc: '公文、调研、综合材料', competition: '中等' },
      { title: '宣传文化', org: '宣传/文旅/融媒体', desc: '宣传策划、内容生产', competition: '中等' },
      { title: '基层综合岗', org: '街道/乡镇', desc: '材料、协调、群众工作', competition: '中低' },
    ],
  },
  {
    name: '理工科通用类',
    keywords: ['建筑','土木','化工','生物','物理','数学','机械','电气'],
    positions: [
      { title: '工程技术岗', org: '住建/水利/交通/自然资源', desc: '工程管理、技术保障', competition: '中等' },
      { title: '检验检测', org: '质量监管/市场监管', desc: '技术检验、标准执行', competition: '中低' },
      { title: '事业专业岗', org: '研究机构/事业单位', desc: '专业研究、技术服务', competition: '中低' },
    ],
  },
  {
    name: '通用综合类',
    keywords: [] as string[],
    positions: [
      { title: '综合管理', org: '各级机关事业单位', desc: '综合事务、协调执行', competition: '中等' },
      { title: '公共服务', org: '街道/基层单位', desc: '窗口服务、基层治理', competition: '中低' },
      { title: '事业综合岗', org: '学校/医院/中心站所', desc: '行政管理、项目执行', competition: '较低' },
    ],
  },
];

/* ========== 三、报名决策（Apply）========== */
export const CITY_TIERS = [
  {
    province: '山东省',
    sprint: ['济南','青岛'],
    stable: ['烟台','潍坊','临沂','淄博','济宁','威海'],
    safety: ['泰安','德州','聊城','菏泽','枣庄','滨州','东营','日照'],
  },
  {
    province: '江苏省',
    sprint: ['南京','苏州'],
    stable: ['无锡','常州','南通','扬州','镇江'],
    safety: ['盐城','淮安','宿迁','连云港','泰州'],
  },
  {
    province: '浙江省',
    sprint: ['杭州','宁波'],
    stable: ['温州','嘉兴','绍兴','金华'],
    safety: ['湖州','台州','衢州','丽水','舟山'],
  },
  {
    province: '广东省',
    sprint: ['广州','深圳'],
    stable: ['佛山','东莞','珠海','惠州','中山'],
    safety: ['江门','肇庆','清远','韶关','湛江'],
  },
  {
    province: '全国国考',
    sprint: ['中央部委','省会派驻'],
    stable: ['税务系统','海关系统','统计调查队'],
    safety: ['基层税务所','铁路公安','海事局基层'],
  },
];

export const APPLY_STRATEGY = [
  { type: '冲刺', color: 'err' as const, desc: '竞争激烈但发展前景好的核心岗位', tip: '不超过 1-2 个，避免全灭风险' },
  { type: '稳定', color: 'warn' as const, desc: '限制条件多、竞争适中', tip: '主力 2-3 个，最可能上岸' },
  { type: '保底', color: 'ok' as const, desc: '竞争低、门槛低，确保有岗可上', tip: '至少 1 个，防止无岗可面' },
];

// AI 推荐的报名组合（mock）
export const AI_APPLY_COMBO = [
  { type: '冲刺', exam: '国考', position: '济南大数据局·信息化管理', ratio: '86:1', reason: '专业完全对口，但竞争极高' },
  { type: '冲刺', exam: '省考', position: '青岛网信办·网络安全', ratio: '72:1', reason: '限制计算机专业+应届，竞争稍降' },
  { type: '稳定', exam: '省考', position: '烟台统计局·统计信息化', ratio: '28:1', reason: '限制专业+非核心城市' },
  { type: '稳定', exam: '事业单位', position: '淄博信息中心·技术岗', ratio: '18:1', reason: '事业编+专业对口+中等城市' },
  { type: '保底', exam: '三支一扶', position: '德州基层·信息服务', ratio: '8:1', reason: '竞争极低，2年后可转编' },
];

/* ========== 四、笔试备考 ========== */

// KPI
export const KPI = { daysLeft: NEXT_EXAM.daysLeft, totalMinutes: USER.totalMinutes, correctRate: Math.round(USER.correctRate * 100), nationalRank: USER.nationalRank };

// 每日 AI 任务
export const TODAY_TASKS = [
  { id: 't1', time: '上午 09:00', module: '资料分析', title: '增长率速算 20 题', goal: '限时 25 分钟，正确率 ≥ 85%', minutes: 25, done: true, vipOnly: false },
  { id: 't2', time: '下午 14:30', module: '判断推理', title: '图形推理专项 15 题', goal: '掌握"位置类"3 种规律', minutes: 30, done: true, vipOnly: false },
  { id: 't3', time: '下午 16:00', module: '申论', title: '综合分析题 AI 批改', goal: '限时 45 分钟 + AI 逐句点评', minutes: 60, done: false, vipOnly: true },
  { id: 't4', time: '晚上 20:00', module: '错题回顾', title: '本周错题智能三遍法', goal: 'AI 挑选 12 道薄弱题重做', minutes: 30, done: false, vipOnly: false },
];

// 五大模块
export const RADAR = [
  { name: '资料分析', score: 88 }, { name: '判断推理', score: 82 },
  { name: '言语理解', score: 68 }, { name: '数量关系', score: 55 }, { name: '常识判断', score: 61 },
];

export const MODULE_SCORES = [
  { name: '资料分析', value: 88, target: 90 }, { name: '判断推理', value: 82, target: 85 },
  { name: '言语理解', value: 68, target: 80 }, { name: '数量关系', value: 55, target: 70 }, { name: '常识判断', value: 61, target: 60 },
];

// AI 备考规划
export const AI_PLAN_PHASES = [
  { phase: '第一轮·夯实基础', ratio: '35%', duration: '63 天', tasks: ['行测五大模块系统学习', '申论建立归纳/分析/对策框架', '每天 6-8h 学习'], ai: 'AI 每日推送针对性练习' },
  { phase: '第二轮·强化提升', ratio: '25%', duration: '45 天', tasks: ['专项突破弱项', '大量真题训练', '建立错题本'], ai: 'AI 弱项诊断 + 错题归因' },
  { phase: '第三轮·冲刺模考', ratio: '22%', duration: '40 天', tasks: ['全真套卷限时', '申论热点突击', '岗位表研究'], ai: 'AI 成绩预测 + 上岸概率' },
  { phase: '第四轮·面试毕业', ratio: '18%', duration: '32 天', tasks: ['结构化面试训练', '体检政审材料', '毕业论文同步'], ai: 'AI 面试模拟 + 点评' },
];

// 题库
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

export const DEMO_QUESTIONS = [
  { id: 'q1', module: '资料分析', difficulty: '中', stem: '2025 年 A 市地区生产总值达到 12680 亿元，同比增长 6.2%。其中第三产业增加值 7420 亿元，同比增长 7.1%。则 2024 年 A 市第三产业增加值约为？', options: ['A. 6928 亿元','B. 7010 亿元','C. 7156 亿元','D. 7284 亿元'], answer: 0, analysis: '2024 年第三产业 = 7420 ÷ (1+7.1%) ≈ 6928 亿元。速算技巧：错位加减法。', stat: { correct: 0.72, avgTime: 82 } },
  { id: 'q2', module: '判断推理', difficulty: '中高', stem: '所有的公务员都通过了行测考试。小张通过了行测考试。以下哪项一定为真？', options: ['A. 小张是公务员','B. 小张一定不是公务员','C. 小张可能是公务员','D. 无法判断'], answer: 2, analysis: '"所有 A 都是 B" 不能反推 "B 都是 A"。这是典型的逆否命题陷阱。', stat: { correct: 0.58, avgTime: 46 } },
  { id: 'q3', module: '言语理解', difficulty: '中', stem: '文化建设需要____，不能____，更不能急功近利。填入横线处最恰当的一项是：', options: ['A. 循序渐进 一蹴而就','B. 精益求精 敷衍了事','C. 千锤百炼 浅尝辄止','D. 厚积薄发 半途而废'], answer: 0, analysis: '"一蹴而就"与"急功近利"呼应，"循序渐进"与之构成"稳步 vs 求快"对照。', stat: { correct: 0.81, avgTime: 38 } },
];

// 申论批改
export const SHENLUN_TYPES = [
  { id: 'guina', name: '归纳概括', method: '要点化、序号化、用材料原词', freq: '每周 2 次+' },
  { id: 'fenxi', name: '综合分析', method: '解释→原因→影响→对策→升华', freq: '每周 1 次' },
  { id: 'duice', name: '提出对策', method: '问题导向、主体明确、措施可执行', freq: '每周 1 次' },
  { id: 'guanche', name: '贯彻执行', method: '背格式（讲话稿/简报/倡议书）', freq: '每周 1 次' },
  { id: 'dazuowen', name: '大作文', method: '五段三分式+素材积累', freq: '每 2 周 1 篇+批改' },
  { id: 'juansu', name: '卷面表达', method: '每天练字 10-20 分钟', freq: '每天' },
];

export const SHENLUN_SAMPLES = [
  { id: 's1', title: '论"绿水青山"与高质量发展', score: 42, fullScore: 50, date: '06-19', tag: '大作文', highlights: ['论点鲜明，"三位一体"结构清晰','第三段论据略单薄，缺少具体数据','结尾升华可再抬升 1-2 个层次'] },
  { id: 's2', title: '关于基层治理创新的调研报告', score: 24, fullScore: 25, date: '06-18', tag: '贯彻执行', highlights: ['格式规范，标题/主送/落款完整','措施部分条目化，主体明确','第 4 条建议可再具体化'] },
];

// 公基知识图谱
export const GONGJI_MODULES = [
  { id: 'law', name: '法律', coverage: 62, priority: '高', topics: ['宪法','民法典','刑法','行政法','诉讼法'], aiFeature: 'AI 按法条归类错题，推荐关联知识点' },
  { id: 'politics', name: '政治', coverage: 55, priority: '高', topics: ['马克思主义','毛中特','新时代思想','时政'], aiFeature: 'AI 时政每日推送+关键词提取' },
  { id: 'economy', name: '经济', coverage: 48, priority: '中', topics: ['宏观经济','市场经济','财政政策','货币'], aiFeature: 'AI 概念关联图，理解记忆' },
  { id: 'tech', name: '科技', coverage: 70, priority: '中', topics: ['前沿科技','计算机常识','生活科技'], aiFeature: 'AI 热点科技+时政结合' },
  { id: 'culture', name: '人文历史', coverage: 35, priority: '中低', topics: ['历史纪年','地理常识','文学常识'], aiFeature: 'AI 碎片化记忆+专项选择题' },
  { id: 'doc', name: '公文写作', coverage: 40, priority: '高', topics: ['通知/请示/报告/函/总结'], aiFeature: 'AI 格式检查+机关表达优化' },
];

/* ========== 五、模考冲刺 ========== */
export const MOCK_PAPERS = [
  { id: 'mp1', name: '2027 山东省考仿真模考·第 12 期', tag: '省考', module: '行测', date: '2026-06-25 20:00', duration: 120, joined: 8642, difficulty: '难', vipOnly: false, highlight: '本周主推' },
  { id: 'mp2', name: '国考行测冲刺卷·判断推理专项', tag: '国考', module: '行测', date: '2026-06-26 20:00', duration: 60, joined: 5231, difficulty: '中高', vipOnly: true },
  { id: 'mp3', name: '事业单位综合应用能力模考', tag: '事业单位', module: '综合', date: '2026-06-27 09:30', duration: 90, joined: 3128, difficulty: '中', vipOnly: true },
  { id: 'mp4', name: '申论限时训练·综合分析专项', tag: '省考', module: '申论', date: '2026-06-28 14:00', duration: 180, joined: 2044, difficulty: '难', vipOnly: false },
];

export const RECENT_MOCKS = [
  { id: 'rm1', name: '省考仿真第 11 期', date: '06-20', duration: '118 分', score: 76.5, rank: 512 },
  { id: 'rm2', name: '国考行测冲刺', date: '06-16', duration: '120 分', score: 71.2, rank: 892 },
  { id: 'rm3', name: '判断推理专项', date: '06-12', duration: '58 分', score: 82.0, rank: 246 },
];

// AI 成绩预测
export const AI_SCORE_PREDICTION = {
  predicted: 142.8,
  trend: 'up' as const,
  上岸概率: '65%',
  行测预估: 78.5,
  申论预估: 64.3,
  suggestion: '申论是最大提分空间，建议增加每周批改频次',
};

/* ========== 六、AI 面试模拟 ========== */
export const INTERVIEW_TYPES = [
  { id: 'zh', name: '综合分析', structure: '表态→原因→影响→对策→升华', tips: '多角度思考，避免空话', examples: ['如何看待"躺平"现象？','数字化对基层治理的影响'] },
  { id: 'jh', name: '计划组织', structure: '目的→对象→方式→内容→保障→评估', tips: '逻辑清晰，步骤完整', examples: ['组织一次社区安全宣传活动','策划单位年度培训方案'] },
  { id: 'rj', name: '人际沟通', structure: '反思→理解→沟通→推动解决', tips: '先己后人，主动担当', examples: ['同事不配合你的工作怎么办？','领导批评你如何回应？'] },
  { id: 'yj', name: '应急应变', structure: '稳局面→分轻重→逐一解决→复盘预防', tips: '不慌乱，有条理', examples: ['突发事件群众聚集怎么处理？','会议材料临时出错怎么办？'] },
];

export const INTERVIEW_HISTORY = [
  { id: 'ih1', type: '综合分析', question: '如何看待基层"形式主义"问题？', score: 78, duration: '3 分 42 秒', date: '06-22', feedback: ['观点全面，结构清晰','缺少具体案例支撑','结尾可结合自身岗位'] },
  { id: 'ih2', type: '计划组织', question: '组织一次"安全生产月"宣传活动', score: 82, duration: '4 分 08 秒', date: '06-20', feedback: ['步骤完整，逻辑清晰','评估环节可更具体','注意时间控制'] },
];

/* ========== 七、政审体检 ========== */
export const REVIEW_CHECKLIST = [
  { category: '政审材料', items: ['个人自传（手写 2000 字以上）','户籍证明','无犯罪记录证明','个人征信报告','现实表现鉴定材料','党员/团员组织关系转接'] },
  { category: '体检准备', items: ['体检前 3 天清淡饮食','体检当天空腹','携带身份证+准考证+1 寸照片','近视需戴框架眼镜（不可隐形）','女性避开生理期'] },
  { category: '常见淘汰原因', items: ['血压异常（紧张导致）','肝功能指标偏高','色盲/色弱（部分岗位）','纹身（穿短袖可见部位）','征信有逾期记录','直系亲属有刑事案底'] },
];

/* ========== 通用 ========== */
export const WEEKLY = [
  { day: '06-17', done: true, minutes: 118, questions: 92, correct: 74 },
  { day: '06-18', done: true, minutes: 152, questions: 128, correct: 79 },
  { day: '06-19', done: true, minutes: 96, questions: 68, correct: 66 },
  { day: '06-20', done: true, minutes: 174, questions: 142, correct: 81 },
  { day: '06-21', done: true, minutes: 136, questions: 108, correct: 72 },
  { day: '06-22', done: true, minutes: 208, questions: 168, correct: 84 },
  { day: '06-23', done: false, minutes: 62, questions: 48, correct: 68 },
];

export const VIP_PLANS = [
  { id: 'monthly', name: '月卡', price: 68, origin: 128, unit: '/月', subtitle: '轻体验，先试用', features: ['题库无限刷','每周 2 场模考','AI 错题推题','基础学习报告','岗位匹配深度报告'], highlight: false },
  { id: 'quarter', name: '季卡', price: 168, origin: 384, unit: '/3月', subtitle: '省 ¥36，最热门', features: ['月卡全部权益','申论 AI 批改无限次','报名策略 AI 推荐','公基知识图谱完整版','专属学习顾问社群'], highlight: true, tag: '最超值' },
  { id: 'year', name: '年卡', price: 498, origin: 1536, unit: '/年', subtitle: '省 ¥318，陪你上岸', features: ['季卡全部权益','AI 面试模拟无限次','人工申论批改 5 篇','协议班减免 ¥500','政审材料 AI 检查'], highlight: false, tag: '陪跑一年' },
];

export const AGREEMENT_PLAN = {
  id: 'agreement', name: '协议班·稳过上岸', price: 9800, refund: 8000,
  subtitle: '笔试未过，全额退款 ¥8000',
  features: ['全套 VIP 权益（含年卡）','教研老师 1v1 学习规划','每周 4 次直播精讲','申论人工批改 20 篇','面试全真模拟 8 次','AI 面试无限次','政审材料全程指导','未上岸退 ¥8000（签电子协议）'],
};

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

export const RANK_SUCCESS = [
  { id: 'a1', name: '王同学', unit: '济南市大数据局·信息化管理岗', salary: '11.2万/年', days: 168, score: 148.6, quote: '错题本 + 模考排名让我实实在在看到自己在进步。', isVip: true },
  { id: 'a2', name: '刘同学', unit: '青岛海关·税务征管岗', salary: '12.8万/年', days: 232, score: 145.2, quote: '协议班的教研规划把我拉出了半年瓶颈期。', isVip: true },
  { id: 'a3', name: '张同学', unit: '烟台某区法院·司法信息化', salary: '10.4万/年', days: 195, score: 142.8, quote: '申论 AI 批改是真正的分数增长点，写作从 28 涨到 38。', isVip: true },
  { id: 'a4', name: '陈同学', unit: '山东省某厅·综合管理', salary: '13.5万/年', days: 285, score: 151.4, quote: '每天 20 题 + 模考坚持，600 天后终于上岸。', isVip: false },
];

export const ANNOUNCEMENTS = [
  { id: 'n1', tag: '教研', title: '2027 山东省考大纲深度解读直播，本周六 19:30', date: '06-23' },
  { id: 'n2', tag: '题库', title: '资料分析新增 2025 年 6 月最新真题 320 道', date: '06-22' },
  { id: 'n3', tag: '活动', title: '老带新组队上岸：每邀请 1 位好友返 ¥50 现金', date: '06-20' },
  { id: 'n4', tag: 'AI', title: 'AI 申论批改模型升级至 v2.3，批改精度提升 12%', date: '06-18' },
];

export const COURSES = [
  { id: 'c1', title: '资料分析·15 天速算冲刺', teacher: '崔老师', students: 12480, duration: '15 讲', price: 0, tag: '免费公开课' },
  { id: 'c2', title: '申论大作文·五段三分式全套', teacher: '林老师', students: 8620, duration: '20 讲', price: 199 },
  { id: 'c3', title: '2027 国考岗位精析', teacher: '罗老师', students: 5210, duration: '8 讲', price: 0, tag: '限时免费' },
];

export const USER_STATS = { accuracy: Math.round(USER.correctRate * 100), rank: USER.nationalRank };

/* ========== 补充：各页面引用 ========== */
export const APPLY_WISDOM = APPLY_STRATEGY;

export const GONGJI_KNOWLEDGE = [
  { module: '法律', title: '宪法基本原则', content: '人民主权、基本人权、法治原则、民主集中制', aiTip: '注意区分人民主权与民主集中制的适用场景' },
  { module: '法律', title: '行政处罚种类', content: '警告、罚款、没收、责令停产停业、暂扣或吊销许可证、行政拘留', aiTip: '高频考点：区分行政处罚与行政强制' },
  { module: '政治', title: '新时代社会主要矛盾', content: '人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾', aiTip: '十九大报告核心表述，易与旧矛盾表述混淆' },
  { module: '政治', title: '全面深化改革总目标', content: '完善和发展中国特色社会主义制度，推进国家治理体系和治理能力现代化', aiTip: '关键词：制度+治理，常考搭配' },
  { module: '经济', title: '宏观调控三大手段', content: '财政政策、货币政策、产业政策', aiTip: '结合时政：降准降息属于货币政策' },
  { module: '经济', title: '市场经济的共性', content: '自主性、平等性、竞争性、开放性', aiTip: '常与社会主义市场经济特征对比出题' },
  { module: '科技', title: '人工智能三要素', content: '数据、算法、算力', aiTip: '结合 ChatGPT 等热点，科技类时政高频' },
  { module: '公文写作', title: '请示与报告的区别', content: '请示事前行文、一文一事、需批复；报告事后行文、可多事、不需批复', aiTip: '必考区分点，请示不得夹带报告事项' },
];

export const INTERVIEW_QUESTION = {
  type: '综合分析',
  question: '近年来，部分基层干部存在"躺平"现象，工作积极性不高，导致政策落实不到位。对此，你怎么看？',
  referenceAnswer: '1.表态：基层"躺平"是基层治理的痛点，必须高度重视。2.原因：考核机制不完善、晋升通道窄、待遇偏低、问责压力与激励不足并存。3.影响：政策落实打折扣、群众诉求得不到回应、损害政府公信力。4.对策：完善考核激励机制、拓宽晋升通道、加强教育培训、强化问责与关怀并重。5.升华：激发基层活力是实现治理现代化的关键。',
  aiFeedback: [
    { type: '优点', content: '答题结构清晰，表态→原因→影响→对策层次分明' },
    { type: '改进', content: '原因分析可更深入，建议增加制度层面的分析' },
    { type: '改进', content: '对策部分缺少具体可操作的举措，建议给出 2-3 个具体措施' },
    { type: '亮点建议', content: '结尾可结合报考岗位谈自身如何避免"躺平"' },
  ],
};

export const QUESTIONS = DEMO_QUESTIONS;

export const FREE_QUOTA = { daily: FREE_DAILY_LIMIT, used: USED_TODAY };

export const RANK_LIST = RANK_STUDY;
export const ASHORE_LIST = RANK_SUCCESS;

export const STUDY_PLAN = AI_PLAN_PHASES;

export const SUBJECT_MODULES = PRACTICE_CATEGORIES;

export const SHENLUN_TOPICS = SHENLUN_TYPES;
export const SHENLUN_RESULT = SHENLUN_SAMPLES[0] || { score: 0, dimensions: [], highlights: '', improvements: '' };

export const ASHORE_CASES = [
  { name: '张同学', exam: '2026 国考', post: '税务局 · 信息中心', quote: '用 AI 批改练了 28 篇申论，从 55 分提到 72 分，申论拉了 17 分上岸！' },
  { name: '李同学', exam: '2026 山东省考', post: '济南市 · 市场监管局', quote: '模考排名让我知道自己的真实水平，针对性补弱项，行测提升 12 分。' },
  { name: '王同学', exam: '2026 江苏省考', post: '南京市 · 财政局', quote: 'AI 面试模拟太有用了，考前练了 40+ 道，面试 86 分逆袭上岸。' },
  { name: '赵同学', exam: '2026 事业单位', post: '杭州市 · 统计局', quote: '公基知识图谱帮我系统梳理，从 58 分提到 76 分，一次上岸。' },
];

/* ========== 情绪陪伴 ========== */
/* ========== 全国公考可视化 ========== */
export type DiffLevel = '极难' | '难' | '中高' | '中等' | '中低' | '较易';

export const PROVINCE_DATA = [
  { id: 'sd', name: '山东', short: '鲁', difficulty: '极难' as DiffLevel, avgRatio: 68, posts: 4280, hotCities: ['济南','青岛','烟台','潍坊'], salary: '9-14万', color: '#dc2626' },
  { id: 'gd', name: '广东', short: '粤', difficulty: '极难' as DiffLevel, avgRatio: 62, posts: 5620, hotCities: ['广州','深圳','佛山','东莞'], salary: '12-22万', color: '#dc2626' },
  { id: 'js', name: '江苏', short: '苏', difficulty: '极难' as DiffLevel, avgRatio: 58, posts: 4860, hotCities: ['南京','苏州','无锡','常州'], salary: '10-18万', color: '#dc2626' },
  { id: 'zj', name: '浙江', short: '浙', difficulty: '难' as DiffLevel, avgRatio: 52, posts: 3980, hotCities: ['杭州','宁波','温州','嘉兴'], salary: '10-18万', color: '#f97316' },
  { id: 'hb', name: '湖北', short: '鄂', difficulty: '难' as DiffLevel, avgRatio: 48, posts: 3240, hotCities: ['武汉','宜昌','襄阳','荆州'], salary: '8-13万', color: '#f97316' },
  { id: 'sc', name: '四川', short: '川', difficulty: '难' as DiffLevel, avgRatio: 46, posts: 3860, hotCities: ['成都','绵阳','德阳','宜宾'], salary: '8-14万', color: '#f97316' },
  { id: 'hn', name: '河南', short: '豫', difficulty: '难' as DiffLevel, avgRatio: 55, posts: 4120, hotCities: ['郑州','洛阳','开封','新乡'], salary: '7-12万', color: '#f97316' },
  { id: 'he', name: '河北', short: '冀', difficulty: '中高' as DiffLevel, avgRatio: 42, posts: 3180, hotCities: ['石家庄','保定','唐山','廊坊'], salary: '7-11万', color: '#eab308' },
  { id: 'fj', name: '福建', short: '闽', difficulty: '中高' as DiffLevel, avgRatio: 40, posts: 2640, hotCities: ['福州','厦门','泉州','漳州'], salary: '8-14万', color: '#eab308' },
  { id: 'ah', name: '安徽', short: '皖', difficulty: '中高' as DiffLevel, avgRatio: 38, posts: 2860, hotCities: ['合肥','芜湖','蚌埠','马鞍山'], salary: '7-12万', color: '#eab308' },
  { id: 'jx', name: '江西', short: '赣', difficulty: '中等' as DiffLevel, avgRatio: 34, posts: 2240, hotCities: ['南昌','赣州','九江','上饶'], salary: '7-11万', color: '#84cc16' },
  { id: 'ln', name: '辽宁', short: '辽', difficulty: '中等' as DiffLevel, avgRatio: 32, posts: 2480, hotCities: ['沈阳','大连','鞍山','锦州'], salary: '7-11万', color: '#84cc16' },
  { id: 'cq', name: '重庆', short: '渝', difficulty: '中等' as DiffLevel, avgRatio: 36, posts: 1860, hotCities: ['渝中','江北','南岸','沙坪坝'], salary: '8-13万', color: '#84cc16' },
  { id: 'sx', name: '陕西', short: '陕', difficulty: '中等' as DiffLevel, avgRatio: 35, posts: 2080, hotCities: ['西安','咸阳','宝鸡','渭南'], salary: '7-12万', color: '#84cc16' },
  { id: 'gx', name: '广西', short: '桂', difficulty: '中低' as DiffLevel, avgRatio: 28, posts: 1960, hotCities: ['南宁','柳州','桂林','北海'], salary: '7-10万', color: '#22c55e' },
  { id: 'yn', name: '云南', short: '滇', difficulty: '中低' as DiffLevel, avgRatio: 26, posts: 2180, hotCities: ['昆明','曲靖','玉溪','大理'], salary: '7-10万', color: '#22c55e' },
  { id: 'gz', name: '贵州', short: '黔', difficulty: '中低' as DiffLevel, avgRatio: 24, posts: 1680, hotCities: ['贵阳','遵义','六盘水','毕节'], salary: '7-10万', color: '#22c55e' },
  { id: 'gs', name: '甘肃', short: '甘', difficulty: '较易' as DiffLevel, avgRatio: 18, posts: 1420, hotCities: ['兰州','天水','酒泉','白银'], salary: '6-9万', color: '#14b8a6' },
  { id: 'hlj', name: '黑龙江', short: '黑', difficulty: '较易' as DiffLevel, avgRatio: 20, posts: 1860, hotCities: ['哈尔滨','齐齐哈尔','大庆','牡丹江'], salary: '6-10万', color: '#14b8a6' },
  { id: 'nm', name: '内蒙古', short: '蒙', difficulty: '较易' as DiffLevel, avgRatio: 16, posts: 1540, hotCities: ['呼和浩特','包头','鄂尔多斯','赤峰'], salary: '7-11万', color: '#14b8a6' },
  { id: 'xj', name: '新疆', short: '新', difficulty: '较易' as DiffLevel, avgRatio: 12, posts: 1280, hotCities: ['乌鲁木齐','克拉玛依','昌吉','伊犁'], salary: '7-12万', color: '#14b8a6' },
  { id: 'xz', name: '西藏', short: '藏', difficulty: '较易' as DiffLevel, avgRatio: 8, posts: 620, hotCities: ['拉萨','日喀则','林芝','山南'], salary: '10-16万', color: '#14b8a6' },
  { id: 'qh', name: '青海', short: '青', difficulty: '较易' as DiffLevel, avgRatio: 10, posts: 580, hotCities: ['西宁','海东','海西','海南州'], salary: '8-13万', color: '#14b8a6' },
  { id: 'nx', name: '宁夏', short: '宁', difficulty: '较易' as DiffLevel, avgRatio: 14, posts: 480, hotCities: ['银川','石嘴山','吴忠','固原'], salary: '7-11万', color: '#14b8a6' },
  { id: 'hainan', name: '海南', short: '琼', difficulty: '中低' as DiffLevel, avgRatio: 22, posts: 860, hotCities: ['海口','三亚','儋州','琼海'], salary: '7-12万', color: '#22c55e' },
  { id: 'jilin', name: '吉林', short: '吉', difficulty: '中低' as DiffLevel, avgRatio: 22, posts: 1640, hotCities: ['长春','吉林市','四平','延边'], salary: '6-10万', color: '#22c55e' },
  { id: 'shanxi', name: '山西', short: '晋', difficulty: '中等' as DiffLevel, avgRatio: 34, posts: 2180, hotCities: ['太原','大同','临汾','运城'], salary: '7-11万', color: '#84cc16' },
  { id: 'hunan', name: '湖南', short: '湘', difficulty: '难' as DiffLevel, avgRatio: 46, posts: 3240, hotCities: ['长沙','株洲','湘潭','衡阳'], salary: '8-13万', color: '#f97316' },
];

export const DIFFICULTY_SCALE: { level: DiffLevel; range: string; color: string; desc: string }[] = [
  { level: '极难', range: '55+:1', color: '#dc2626', desc: '全国竞争最激烈，岗位少考生多' },
  { level: '难', range: '40-54:1', color: '#f97316', desc: '竞争激烈，热门省份/城市' },
  { level: '中高', range: '30-39:1', color: '#eab308', desc: '竞争偏高，需充分备考' },
  { level: '中等', range: '25-34:1', color: '#84cc16', desc: '竞争适中，认真备考有机会' },
  { level: '中低', range: '18-24:1', color: '#22c55e', desc: '竞争较低，上岸概率较高' },
  { level: '较易', range: '<18:1', color: '#14b8a6', desc: '竞争最低，保底选择' },
];

// 各地市竞争比细分（以山东为例展开）
export const CITY_DETAIL_SD = [
  { city: '济南', ratio: 86, posts: 520, difficulty: '极难' as DiffLevel, topPost: '市发改委·综合管理', topRatio: '128:1' },
  { city: '青岛', ratio: 78, posts: 620, difficulty: '极难' as DiffLevel, topPost: '市大数据局·信息化管理', topRatio: '96:1' },
  { city: '烟台', ratio: 42, posts: 380, difficulty: '难' as DiffLevel, topPost: '市统计局·统计信息化', topRatio: '58:1' },
  { city: '潍坊', ratio: 38, posts: 340, difficulty: '中高' as DiffLevel, topPost: '市行政审批局·综合岗', topRatio: '52:1' },
  { city: '临沂', ratio: 35, posts: 460, difficulty: '中高' as DiffLevel, topPost: '市市场监管局·执法岗', topRatio: '48:1' },
  { city: '淄博', ratio: 30, posts: 280, difficulty: '中等' as DiffLevel, topPost: '市信息中心·技术岗', topRatio: '42:1' },
  { city: '济宁', ratio: 32, posts: 320, difficulty: '中等' as DiffLevel, topPost: '市财政局·财务管理', topRatio: '45:1' },
  { city: '威海', ratio: 28, posts: 180, difficulty: '中等' as DiffLevel, topPost: '市卫健委·综合管理', topRatio: '38:1' },
  { city: '泰安', ratio: 22, posts: 240, difficulty: '中低' as DiffLevel, topPost: '市住建局·工程技术', topRatio: '32:1' },
  { city: '德州', ratio: 18, posts: 220, difficulty: '较易' as DiffLevel, topPost: '市基层·信息服务', topRatio: '22:1' },
  { city: '聊城', ratio: 16, posts: 200, difficulty: '较易' as DiffLevel, topPost: '市司法局·司法辅助', topRatio: '20:1' },
  { city: '菏泽', ratio: 14, posts: 320, difficulty: '较易' as DiffLevel, topPost: '市基层·综合管理', topRatio: '18:1' },
  { city: '枣庄', ratio: 15, posts: 160, difficulty: '较易' as DiffLevel, topPost: '市基层·公共服务', topRatio: '19:1' },
  { city: '滨州', ratio: 17, posts: 180, difficulty: '较易' as DiffLevel, topPost: '市基层·综合岗', topRatio: '21:1' },
  { city: '东营', ratio: 20, posts: 140, difficulty: '中低' as DiffLevel, topPost: '市自然资源局·技术岗', topRatio: '28:1' },
  { city: '日照', ratio: 19, posts: 150, difficulty: '较易' as DiffLevel, topPost: '市基层·窗口服务', topRatio: '24:1' },
];

// 岗位类型分布
export const POST_DISTRIBUTION = [
  { type: '综合管理', count: 28420, ratio: 22, color: '#f3a04c', difficulty: '中高' },
  { type: '行政执法', count: 24180, ratio: 19, color: '#e58522', difficulty: '中等' },
  { type: '专业技术', count: 18640, ratio: 14, color: '#22c55e', difficulty: '中低' },
  { type: '财务管理', count: 15280, ratio: 12, color: '#3b82f6', difficulty: '中高' },
  { type: '信息技术', count: 12680, ratio: 10, color: '#8b5cf6', difficulty: '中等' },
  { type: '文字综合', count: 10420, ratio: 8, color: '#ec4899', difficulty: '难' },
  { type: '法律司法', count: 8640, ratio: 7, color: '#f97316', difficulty: '难' },
  { type: '教育文化', count: 6280, ratio: 5, color: '#14b8a6', difficulty: '中等' },
  { type: '其他', count: 4860, ratio: 3, color: '#6b7280', difficulty: '中等' },
];

// 国考热门系统
export const GUOKAO_SYSTEMS = [
  { name: '税务系统', posts: 14820, ratio: 58, difficulty: '难' as DiffLevel, salary: '9-14万' },
  { name: '海关系统', posts: 4280, ratio: 52, difficulty: '难' as DiffLevel, salary: '10-16万' },
  { name: '统计调查队', posts: 3640, ratio: 38, difficulty: '中高' as DiffLevel, salary: '8-12万' },
  { name: '铁路公安', posts: 2860, ratio: 28, difficulty: '中等' as DiffLevel, salary: '9-13万' },
  { name: '海事局', posts: 1640, ratio: 22, difficulty: '中低' as DiffLevel, salary: '9-14万' },
  { name: '气象局', posts: 1280, ratio: 18, difficulty: '较易' as DiffLevel, salary: '8-12万' },
  { name: '水利系统', posts: 1860, ratio: 24, difficulty: '中低' as DiffLevel, salary: '8-13万' },
  { name: '审计署', posts: 620, ratio: 68, difficulty: '极难' as DiffLevel, salary: '10-15万' },
  { name: '证监会', posts: 380, ratio: 82, difficulty: '极难' as DiffLevel, salary: '15-25万' },
  { name: '银保监', posts: 580, ratio: 72, difficulty: '极难' as DiffLevel, salary: '12-20万' },
];

export const MOOD_OPTIONS = [
  { id: 'great', emoji: '😄', label: '状态很好', color: '#22c55e' },
  { id: 'good', emoji: '🙂', label: '还行', color: '#84cc16' },
  { id: 'normal', emoji: '😐', label: '一般般', color: '#eab308' },
  { id: 'anxious', emoji: '😰', label: '有点焦虑', color: '#f97316' },
  { id: 'down', emoji: '😞', label: '很沮丧', color: '#ef4444' },
];

export const AI_ENCOURAGEMENTS: Record<string, string[]> = {
  great: [
    '状态满分！趁热打铁，今天的高效期千万别浪费。',
    '今天的你就是明天的上岸者，保持这股劲！',
    '好状态值得记录，写几句日记留住这份能量吧。',
  ],
  good: [
    '稳住节奏，不急不躁才是备考最好的姿态。',
    '每天进步一点点，累计起来就是上岸的距离。',
    '你已经比昨天多学了一点，这就够了。',
  ],
  normal: [
    '备考不是百米冲刺，是马拉松。今天跑慢一点没关系。',
    '允许自己偶尔状态平平，明天又是新的一天。',
    '试试换个模块学，新鲜感有时能重新激活状态。',
  ],
  anxious: [
    '焦虑说明你在乎，这份在乎终将变成动力。深呼吸，先做 5 道题找回手感。',
    '你不是一个人，全国 800 万考生都有过这样的时刻。',
    '把焦虑写下来，说出来，它会变得小很多。要不要写篇日记？',
  ],
  down: [
    '低谷之后一定有反弹，今天哪怕只做 1 道题，也是胜利。',
    '放弃很容易，但你已经走了这么远。再坚持一下？',
    '给自己一个拥抱。备考这条路，你已经很勇敢了。',
  ],
};

export const ENERGY_QUOTES = [
  { text: '世上没有白走的路，每一步都算数。', author: '上岸学员·张同学' },
  { text: '你以为的来不及，其实恰好是开始。', author: '上岸学员·刘同学' },
  { text: '考公不是比谁更聪明，是比谁更耐得住。', author: '教研组·林老师' },
  { text: '那些你熬过的夜，终将变成上岸的光。', author: '上岸学员·王同学' },
  { text: '每一道错题都是未来的得分点，别怕做错。', author: '教研组·崔老师' },
  { text: '半年后再回头看，你会感谢现在没有放弃的自己。', author: '上岸学员·赵同学' },
  { text: '行百里者半九十，最难的时候就是离上岸最近的时候。', author: '古训' },
  { text: '你不需要比所有人强，只需要比昨天的自己强。', author: '上岸学员·陈同学' },
];

export const CHECKIN_MILESTONES = [
  { days: 3, title: '初试锋芒', icon: '🌱', desc: '连续打卡 3 天' },
  { days: 7, title: '习惯养成', icon: '🌿', desc: '连续打卡 7 天' },
  { days: 14, title: '稳扎稳打', icon: '🌳', desc: '连续打卡 14 天' },
  { days: 30, title: '月度坚持', icon: '⭐', desc: '连续打卡 30 天' },
  { days: 60, title: '半程勇士', icon: '🔥', desc: '连续打卡 60 天' },
  { days: 100, title: '百日炼钢', icon: '💎', desc: '连续打卡 100 天' },
  { days: 180, title: '上岸候选人', icon: '🏆', desc: '连续打卡 180 天' },
];

export const DIARY_ENTRIES = [
  { id: 'd1', date: '06-22', mood: 'good', content: '今天判断推理模块正确率终于突破 80% 了！虽然图推还是有点蒙，但逻辑判断已经稳了。申论写了一篇综合分析，AI 批改给了 24/25，有点意外。', aiReply: '判断推理的进步很扎实！图推建议按"位置-样式-属性-数量"四步检查法，会减少蒙的成分。申论保持这个节奏，每周 2 篇以上。', tags: ['判断推理', '申论'] },
  { id: 'd2', date: '06-20', mood: 'anxious', content: '今天模考行测只有 68 分，比上周降了 5 分。资料分析居然错了 6 道，平时正确率 88% 的模块。是不是退步了？', aiReply: '单次模考波动很正常，不代表退步。资料分析 6 道错题建议逐题复盘——是计算失误还是审题问题？你的长期趋势线是在上升的，别被一次波动吓到。', tags: ['模考', '焦虑'] },
  { id: 'd3', date: '06-18', mood: 'great', content: '连续打卡 25 天了！今天完成了 3 个模块的训练，还做了一套行测套卷，72 分，破了自己的记录。感觉做题速度在变快。', aiReply: '25 天的坚持本身就是最大的胜利！行测 72 分说明基础阶段已经扎实，接下来可以开始增加限时训练的强度了。你已经在正确轨道上。', tags: ['打卡', '行测'] },
];

export const TREE_HOLE_TOPICS = [
  { id: 'th1', title: '考公 vs 秋招，怎么选？', replies: 238, tag: '抉择' },
  { id: 'th2', title: '申论怎么学都提不上分，好崩溃', replies: 186, tag: '焦虑' },
  { id: 'th3', title: '室友考公上岸了，我好焦虑', replies: 152, tag: '压力' },
  { id: 'th4', title: '备考期间怎么处理恋爱关系？', replies: 134, tag: '生活' },
  { id: 'th5', title: '每天学 10 小时还是觉得不够', replies: 128, tag: '节奏' },
  { id: 'th6', title: '一个人备考太孤独了', replies: 112, tag: '孤独' },
];

/* ========== Onboarding · 个人信息填写 ========== */
export const MAJOR_CATEGORIES = [
  { id: 'cs', label: '计算机/电子信息', majors: ['计算机科学与技术', '软件工程', '信息安全', '人工智能', '电子信息工程', '通信工程'] },
  { id: 'law', label: '法学', majors: ['法学', '知识产权', '社会学', '政治学', '马克思主义理论'] },
  { id: 'econ', label: '经济/金融', majors: ['经济学', '金融学', '财政学', '税收学', '国际经济与贸易'] },
  { id: 'mgmt', label: '管理', majors: ['行政管理', '公共事业管理', '工商管理', '会计学', '人力资源管理'] },
  { id: 'chinese', label: '中文/新闻', majors: ['汉语言文学', '新闻学', '传播学', '编辑出版学'] },
  { id: 'med', label: '医学', majors: ['临床医学', '预防医学', '药学', '护理学', '公共卫生'] },
  { id: 'edu', label: '教育', majors: ['教育学', '心理学', '学前教育', '特殊教育', '体育教育'] },
  { id: 'sci', label: '理学/工学', majors: ['数学', '物理学', '化学', '机械工程', '土木工程', '电气工程'] },
  { id: 'art', label: '艺术/其他', majors: ['设计学', '美术学', '音乐学', '历史学', '哲学'] },
];

export const EDUCATION_OPTIONS = [
  { id: 'college', label: '大专' },
  { id: 'bachelor', label: '本科' },
  { id: 'master', label: '硕士' },
  { id: 'phd', label: '博士' },
];

export const EXAM_TYPE_OPTIONS = [
  { id: 'guokao', label: '国考', desc: '中央机关及其直属机构' },
  { id: 'shengkao', label: '省考', desc: '各省市公务员考试' },
  { id: 'xuandiao', label: '选调生', desc: '面向优秀应届毕业生' },
  { id: 'shiyebian', label: '事业编', desc: '事业单位编制考试' },
  { id: 'junzhuan', label: '军转干', desc: '军队转业干部安置' },
];

export const TARGET_PROVINCES = [
  '北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江',
  '上海','江苏','浙江','安徽','福建','江西','山东','河南',
  '湖北','湖南','广东','广西','海南','重庆','四川','贵州',
  '云南','西藏','陕西','甘肃','青海','宁夏','新疆',
];

export const POLITICAL_STATUS = ['中共党员','中共预备党员','共青团员','群众','民主党派'];
export const WORK_EXP_OPTIONS = ['应届生','1年以下','1-3年','3-5年','5年以上'];
export const CERT_OPTIONS = ['法律职业资格','注册会计师','CFA','教师资格证','执业医师','心理咨询师','无'];

/* ========== Report · 报考岗位报告 ========== */
export const REPORT_SECTIONS = [
  { id: 'profile', title: '个人画像', icon: 'User' },
  { id: 'positions', title: '推荐岗位', icon: 'Target' },
  { id: 'competition', title: '竞争分析', icon: 'BarChart3' },
  { id: 'strategy', title: '报考策略', icon: 'Shield' },
  { id: 'timeline', title: '备考时间线', icon: 'Clock' },
];

export const MOCK_REPORT = {
  summary: '综合你的专业背景、学历层次和目标区域，AI 为你筛选出 3 类共 12 个高匹配度岗位，核心推荐竞争比 1:85 以内的岗位。',
  profile: {
    strengths: ['计算机专业对口面广', '本科满足多数岗位门槛', '山东生源省内岗位优势'],
    weaknesses: ['非 985/211 院校需避开热门岗', '无法律/财会证书限制部分岗位', '应届身份窗口期仅 2 年'],
  },
  positions: [
    { name: '省公安厅·网络安全管理', type: '省考', competition: '1:68', salary: '8-12K', match: 94, tag: '强推', city: '济南', education: '本科及以上' },
    { name: '市大数据局·数据资源管理', type: '省考', competition: '1:52', salary: '7-10K', match: 91, tag: '强推', city: '青岛', education: '本科及以上' },
    { name: '区行政审批服务局·信息化岗', type: '省考', competition: '1:45', salary: '6-9K', match: 88, tag: '推荐', city: '济南', education: '本科及以上' },
    { name: '国家税务总局山东分局·信息技术', type: '国考', competition: '1:156', salary: '9-14K', match: 82, tag: '冲刺', city: '济南', education: '本科及以上' },
    { name: '省纪委监委·网络监察', type: '省考', competition: '1:128', salary: '8-12K', match: 78, tag: '冲刺', city: '济南', education: '本科及以上' },
    { name: '区应急管理局·科技信息化', type: '省考', competition: '1:38', salary: '6-8K', match: 85, tag: '保底', city: '淄博', education: '本科及以上' },
  ],
  strategy: {
    chong: { label: '冲刺岗', count: 2, desc: '竞争比 1:100+，上限突破', color: 'rose' },
    wen: { label: '稳妥岗', count: 3, desc: '竞争比 1:50~80，把握较大', color: 'amber' },
    bao: { label: '保底岗', count: 1, desc: '竞争比 1:40 以下，稳拿', color: 'emerald' },
  },
  timeline: [
    { month: '7-8月', task: '行测基础 + 申论入门', hours: 4 },
    { month: '9-10月', task: '专项突破 + 真题精练', hours: 6 },
    { month: '11月', task: '国考冲刺 + 模考密集', hours: 8 },
    { month: '12月', task: '省考备考 + 弱项补强', hours: 6 },
    { month: '1-2月', task: '省考冲刺 + 面试准备', hours: 8 },
  ],
  probability: {
    overall: 72,
    guokao: 28,
    shengkao: 65,
    xuandiao: 41,
  },
};

/* ========== Report · 推荐岗位/竞争分析/策略 ========== */
export const RECOMMENDED_POSTS = [
  { id: 1, name: '国家税务总局XX区税务局—一级行政执法员', type: '国考', dept: '税务系统', location: '山东·济南', competition: '1:82', match: 95, matchRate: 95, salary: '8-12K', tags: ['计算机对口','应届优先'], level: '冲', headcount: 3, probability: 42 },
  { id: 2, name: 'XX市公安局—网络安全管理岗', type: '省考', dept: '公安系统', location: '山东·青岛', competition: '1:128', match: 88, matchRate: 88, salary: '7-10K', tags: ['计算机对口','需体测'], level: '冲', headcount: 2, probability: 28 },
  { id: 3, name: 'XX区数据局—信息化建设岗', type: '省考', dept: '数据局', location: '山东·济南', competition: '1:65', match: 92, matchRate: 92, salary: '6-9K', tags: ['计算机对口','冷门岗'], level: '稳', headcount: 5, probability: 58 },
  { id: 4, name: 'XX县委办公室—综合文秘', type: '选调生', dept: '党政机关', location: '山东·潍坊', competition: '1:45', match: 78, matchRate: 78, salary: '5-8K', tags: ['不限专业','基层锻炼'], level: '保', headcount: 8, probability: 72 },
  { id: 5, name: 'XX区人社局—劳动监察岗', type: '事业编', dept: '人社系统', location: '山东·烟台', competition: '1:55', match: 82, matchRate: 82, salary: '5-8K', tags: ['管理类','稳定'], level: '稳', headcount: 4, probability: 65 },
  { id: 6, name: 'XX市统计局—数据分析岗', type: '国考', dept: '统计系统', location: '山东·济南', competition: '1:72', match: 90, matchRate: 90, salary: '7-11K', tags: ['计算机对口','数据岗'], level: '稳', headcount: 2, probability: 52 },
];

export const COMPETITION_ANALYSIS = {
  provinces: [
    { region: '济南', avgCompetition: 78, hotPositions: 12, myAdvantage: '省内户籍+对口专业', difficulty: 'medium', highlight: true },
    { region: '青岛', avgCompetition: 112, hotPositions: 18, myAdvantage: '对口专业', difficulty: 'hard', highlight: false },
    { region: '烟台', avgCompetition: 65, hotPositions: 8, myAdvantage: '竞争较低', difficulty: 'easy', highlight: true },
    { region: '潍坊', avgCompetition: 58, hotPositions: 6, myAdvantage: '选调生优势', difficulty: 'easy', highlight: false },
    { region: '北京', avgCompetition: 185, hotPositions: 35, myAdvantage: '对口专业', difficulty: 'very_hard' },
    { region: '上海', avgCompetition: 160, hotPositions: 28, myAdvantage: '对口专业', difficulty: 'hard' },
  ],
  education: [
    { level: '博士', competition: 15, advantage: '高', rate: 82, highlight: true },
    { level: '硕士', competition: 45, advantage: '较高', rate: 68, highlight: true },
    { level: '本科', competition: 85, advantage: '中等', rate: 45, highlight: false },
    { level: '大专', competition: 25, advantage: '较低', rate: 22, highlight: false },
  ],
};

export const STRATEGY_ADVICE = [
  { type: 'chong', title: '冲刺岗', desc: '国税局济南分局 — 竞争适中但发展好，值得冲刺', risk: '中', probability: 35 },
  { type: 'wen', title: '稳妥岗', desc: '数据局信息化岗 — 专业对口、竞争可控，上岸概率较高', risk: '低', probability: 68 },
  { type: 'bao', title: '保底岗', desc: '区委办综合文秘 — 竞争最低、不限专业，确保上岸', risk: '极低', probability: 85 },
];

export const VIP_BENEFITS = [
  { name: '每日刷题', free: '10 题', vip: '无限' },
  { name: 'AI 岗位匹配', free: '预览 3 个', vip: '完整报告' },
  { name: '深度岗位报告', free: false, vip: true },
  { name: 'AI 申论批改', free: false, vip: '无限次' },
  { name: '真人申论批改', free: false, vip: '每月 2 篇' },
  { name: '公基知识图谱', free: false, vip: true },
  { name: '模考次数', free: '每月 1 次', vip: '无限' },
  { name: 'AI 成绩预测', free: false, vip: true },
  { name: 'AI 面试模拟', free: false, vip: '无限次' },
  { name: '报名策略分析', free: false, vip: true },
  { name: '专属学习顾问', free: false, vip: true },
];
