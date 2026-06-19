// 内容展示页数据：企业简介 / 首创技术 / 爱心助农 / 护肝知识 / 健康评测
// 借鉴 shopTwo-main 各内容页的结构与排版风格，文案为草本/肽养生领域示例内容。
import type { Stat } from "../types";

/* ---------- 企业简介 company ---------- */
export interface PersonCard {
  name: string;
  title: string;
  desc: string;
  /** 顾问标签，如 "科研顾问" */
  tag?: string;
  /** 团队成员专业领域 */
  field?: string;
}
export const COMPANY = {
  title: "国肽民安生物科技",
  intro: [
    "国肽民安生物科技专注于小麦低聚肽的酶解、分离与应用，以「肝安人安·肽养身心」为理念，把实验室的科研成果转化为日常可及的健康产品。",
    "公司构建了从原料筛选、定向酶解到成品检测的完整链条，面向消费者提供护肝、营养、肠道等系列产品，同时向食品与保健品企业稳定供应高纯度低聚肽原料。",
  ],
  stats: [
    { value: "15+", label: "年研发沉淀" },
    { value: "12项", label: "发明专利" },
    { value: "50+", label: "合作企业" },
  ] as Stat[],
  partners: [
    { name: "华东某食品集团", role: "原料长期供应" },
    { name: "西南高校营养实验室", role: "联合研发" },
    { name: "华南连锁药房", role: "渠道合作" },
    { name: "某跨境健康品牌", role: "代工与配方" },
  ],
  advisors: [
    { name: "张教授", tag: "科研顾问", title: "食品生物工程 博士生导师", desc: "长期从事蛋白质酶解与生物活性肽研究，主持多项国家级课题。" },
    { name: "李医师", tag: "健康顾问", title: "临床营养 主任医师", desc: "聚焦肝脏健康与营养干预，负责产品的人群适配建议。" },
  ] as PersonCard[],
  team: [
    { name: "王工", title: "研发负责人", field: "酶解工艺", desc: "主导高F值定向酶解工艺的产业化落地。" },
    { name: "陈工", title: "质量负责人", field: "质量体系", desc: "搭建从原料到成品的全链路检测与追溯体系。" },
    { name: "刘工", title: "生产负责人", field: "智能制造", desc: "负责 GMP 车间运行与批次稳定性管理。" },
  ] as PersonCard[],
  contact: [
    { icon: "📍", label: "公司地址", value: "中国 · 健康产业园区" },
    { icon: "📞", label: "企业采购", value: "400-000-0000" },
    { icon: "✉️", label: "商务邮箱", value: "sales@o-mall.example" },
  ],
};

/* ---------- 首创技术 tech ---------- */
export interface TechCard {
  name: string;
  intro: string;
  highlights: string[];
  maturity: number; // 0-100
  detail: string;
}
export const TECH = {
  banner: {
    chip: "肽科技 · 生命力",
    title: "三大核心技术",
    sub: "从原料到活性肽，工艺决定吸收",
    stats: [
      { value: "45.3", label: "F值" },
      { value: "97%", label: "纯度" },
      { value: "12项", label: "专利" },
    ] as Stat[],
  },
  techs: [
    {
      name: "定向酶解技术",
      intro: "以小麦谷朊粉为底物，定向控制酶切位点，富集高F值低聚肽。",
      highlights: ["定向酶切", "高F值富集", "批次稳定"],
      maturity: 96,
      detail:
        "通过复合蛋白酶的分级控制，将大分子蛋白定向切割为以支链氨基酸为主的小分子肽段，使F值稳定达到 45.3 以上，兼顾活性与口感。",
    },
    {
      name: "膜分离纯化",
      intro: "多级膜分离去杂留肽，提升纯度并控制分子量分布。",
      highlights: ["多级膜分离", "分子量可控", "去杂留肽"],
      maturity: 92,
      detail:
        "采用超滤与纳滤组合，按分子量切割保留目标肽段，去除盐分与杂质，使肽纯度≥97%，分子量集中在 200Da 附近，更易被人体吸收。",
    },
    {
      name: "低温干燥工艺",
      intro: "低温喷雾干燥保留活性，速溶不结块。",
      highlights: ["低温保活", "速溶颗粒", "长期稳定"],
      maturity: 90,
      detail:
        "在低温条件下进行喷雾干燥，最大程度保留肽的生物活性，得到速溶、易冲调的颗粒，常温下保持长期稳定。",
    },
  ] as TechCard[],
  process: ["原料筛选", "定向酶解", "膜分离", "层析纯化", "低温干燥", "成品检测"],
  indicators: [
    { label: "F值", value: "≥45.3" },
    { label: "肽纯度", value: "≥97%" },
    { label: "平均分子量", value: "≈200Da" },
    { label: "重金属", value: "未检出" },
  ],
  patents: [
    { no: "ZL·001", name: "一种高F值小麦低聚肽的制备方法" },
    { no: "ZL·002", name: "低聚肽膜分离纯化工艺" },
    { no: "ZL·003", name: "低温保活喷雾干燥方法" },
  ],
};

/* ---------- 爱心助农 charity ---------- */
export const CHARITY = {
  banner: {
    chip: "肽护中华 · 反哺乡土",
    title: "爱心助农计划",
    sub: "优质原料从田间来，发展成果向乡村去",
  },
  intro:
    "小麦是低聚肽的源头。我们与小麦产区的合作社建立长期订单，以高于市场的标准收购优质原料，让科研与产业的成果回馈耕种者。",
  stats: [
    { value: "8", label: "帮扶产区" },
    { value: "1200+", label: "受益农户" },
    { value: "30万+", label: "年采购吨" },
  ] as Stat[],
  projects: [
    { title: "订单农业", place: "华北小麦产区", desc: "以保底价签订长期收购订单，稳定农户收益。" },
    { title: "技术下乡", place: "西部合作社", desc: "派驻技术人员指导种植与仓储，提升原料品质。" },
    { title: "健康公益", place: "乡村学校", desc: "捐赠营养物资并开展健康科普讲座。" },
  ],
  activities: [
    { date: "2026-05", title: "春耕订单签约", desc: "与 3 个合作社完成新一季订单签约。" },
    { date: "2026-03", title: "健康科普进校园", desc: "为 5 所乡村学校带去营养课程。" },
    { date: "2025-11", title: "丰收采购季", desc: "完成年度优质小麦集中采购。" },
  ],
};

/* ---------- 护肝知识 knowledge ---------- */
export interface Article {
  id: string;
  cat: string;
  title: string;
  summary: string;
  readTime: string;
  views: string;
  body: string[];
}
export const KNOWLEDGE_CATS = ["全部", "护肝养肝", "营养科普", "肽科技", "生活方式"];
export const ARTICLES: Article[] = [
  {
    id: "k1",
    cat: "护肝养肝",
    title: "应酬多、熬夜多，肝脏在悄悄承压",
    summary: "了解日常生活里肝脏的负担来源，以及可以怎样温和养护。",
    readTime: "4 分钟",
    views: "3.2k",
    body: [
      "肝脏是人体重要的代谢器官，长期应酬、熬夜与高油饮食都会增加它的工作量。",
      "温和养护的关键在于规律作息、控制饮酒，并适当补充有助于代谢的营养。",
      "高F值小麦低聚肽富含支链氨基酸，常被用于日常的肝脏营养支持。",
    ],
  },
  {
    id: "k2",
    cat: "肽科技",
    title: "什么是高F值低聚肽？",
    summary: "F值代表什么，为什么数值越高越受关注。",
    readTime: "5 分钟",
    views: "2.7k",
    body: [
      "F值指支链氨基酸与芳香族氨基酸的摩尔比，是衡量肽营养特性的重要指标。",
      "F值越高，意味着支链氨基酸占比越高，更适合在代谢压力较大时补充。",
      "我们的原料 F值稳定达到 45.3 以上，并保持 97% 以上的纯度。",
    ],
  },
  {
    id: "k3",
    cat: "营养科普",
    title: "小分子肽为什么更容易吸收？",
    summary: "从分子量角度理解吸收效率。",
    readTime: "3 分钟",
    views: "1.9k",
    body: [
      "蛋白质需要被消化成更小的肽和氨基酸才能被吸收。",
      "小分子肽分子量小、无需复杂消化，可被肠道更高效地利用。",
      "把平均分子量控制在 200Da 附近，是工艺优化的目标之一。",
    ],
  },
  {
    id: "k4",
    cat: "生活方式",
    title: "三餐不规律，如何科学补营养",
    summary: "外食、加班场景下的实用补给思路。",
    readTime: "4 分钟",
    views: "2.1k",
    body: [
      "不规律的三餐容易造成营养摄入不均衡。",
      "可以借助多维营养补充，覆盖维生素与微量元素的日常缺口。",
      "补充应遵循推荐量，均衡饮食仍是基础。",
    ],
  },
];

/* ---------- 健康评测 health-assessment ---------- */
export interface AssessQuestion {
  q: string;
  options: { label: string; score: number }[];
}
export interface AssessResult {
  min: number;
  level: string;
  advice: string;
}
export const ASSESSMENT = {
  intro: "用 5 个问题，快速了解你的肝脏与营养状态，并获得温和的养护建议。仅供参考，不替代医学诊断。",
  questions: [
    {
      q: "你平均每周应酬或饮酒的次数？",
      options: [
        { label: "几乎没有", score: 0 },
        { label: "1—2 次", score: 1 },
        { label: "3 次及以上", score: 2 },
      ],
    },
    {
      q: "你通常几点入睡？",
      options: [
        { label: "23 点前", score: 0 },
        { label: "23—1 点", score: 1 },
        { label: "1 点以后", score: 2 },
      ],
    },
    {
      q: "三餐是否规律？",
      options: [
        { label: "比较规律", score: 0 },
        { label: "偶尔不规律", score: 1 },
        { label: "经常不规律", score: 2 },
      ],
    },
    {
      q: "近期是否常感到疲惫？",
      options: [
        { label: "很少", score: 0 },
        { label: "偶尔", score: 1 },
        { label: "经常", score: 2 },
      ],
    },
    {
      q: "是否有日常营养补充的习惯？",
      options: [
        { label: "有，且规律", score: 0 },
        { label: "偶尔补充", score: 1 },
        { label: "几乎没有", score: 2 },
      ],
    },
  ] as AssessQuestion[],
  results: [
    { min: 0, level: "状态良好", advice: "继续保持规律作息与均衡饮食，可把肽营养作为日常加分项。" },
    { min: 4, level: "略有压力", advice: "建议控制应酬与熬夜，适当补充高F值低聚肽与多维营养。" },
    { min: 7, level: "需要关注", advice: "肝脏与营养负担偏高，建议调整作息、规律补给，并在需要时咨询专业医师。" },
  ] as AssessResult[],
};

/* ---------- 产品功能 functions（保留原内容页，改为结构化） ---------- */
export const FUNCTIONS = [
  { icon: "🛡️", title: "护肝养护", body: "高F值小麦低聚肽富含支链氨基酸，适配应酬、熬夜等场景的日常肝脏养护。" },
  { icon: "🧬", title: "营养调理", body: "多维营养与小分子肽组合，帮助覆盖日常营养缺口，内调外养。" },
  { icon: "🦠", title: "肠道养护", body: "复合益生菌与益生元协同，改善肠道微生态，助力营养吸收。" },
  { icon: "🏭", title: "企业原料", body: "面向食品与保健品企业供应高纯度低聚肽原料，支持配方与规格定制。" },
];
