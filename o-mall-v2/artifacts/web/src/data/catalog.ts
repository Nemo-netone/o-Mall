// O-Mall 商城静态数据（草本 / 肽养生主题，借鉴 shopTwo-main 业务，独立维护）
// 图片来自 public/images/，发布到 CloudBase 静态托管时随 dist 一起上传。
import type {
  Product,
  Category,
  FeatureCard,
  TrustBadge,
  Stat,
  QuickNavItem,
  VipBenefit,
  PayMethod,
} from "../types";

export const CATEGORIES: Category[] = [
  { id: "peptide", title: "肽饮系列", subtitle: "速吸收·高活性", icon: "💧" },
  { id: "liver", title: "护肝保健", subtitle: "多维养护·肝净身轻", icon: "🛡️" },
  { id: "food", title: "功能食品", subtitle: "科学配方·营养加持", icon: "📦" },
  { id: "nutrition", title: "营养补充", subtitle: "精准营养·每日补给", icon: "❤️" },
  { id: "herbal", title: "草本养生", subtitle: "草本精萃·平衡养生", icon: "🌿" },
  { id: "gift", title: "礼盒专区", subtitle: "甄选礼盒·健康心意", icon: "🎁" },
];

export const DISCONTINUED_PRODUCT_IDS = new Set(["p4", "p5", "p6"]);

export const PRODUCTS: Product[] = [
  {
    id: "p2",
    name: "肽润肝清® 护肝醒酒冲剂",
    badge: "热销",
    summary: "应酬前后一袋，温水冲服，清爽不负担",
    spec: "净含量 90g（3g/袋 × 30袋）",
    tags: ["高F值低聚肽", "速溶颗粒", "温水冲服"],
    price: 135,
    originalPrice: 168,
    image: "/images/product_granule.png",
    categoryId: "liver",
    theme: "#b8631a",
    sales: "1,230+",
    repurchase: "68%",
    features: [
      { icon: "🌾", title: "高F值肽", desc: "F值≥45.3" },
      { icon: "💧", title: "速溶颗粒", desc: "温水即化" },
      { icon: "🍃", title: "0蔗糖", desc: "清爽不甜腻" },
    ],
    suitable: ["经常应酬人群", "熬夜加班人群", "关注肝脏养护人群"],
    steps: [
      "取 1 袋倒入杯中。",
      "加入 40—60℃ 温水约 150ml。",
      "搅拌至完全溶解后饮用。",
      "应酬前后或熬夜时尤为适宜，每日 1—2 袋。",
    ],
    certs: ["SC食品生产许可", "第三方检测报告", "ISO22000体系"],
    ingredientTable: [
      { name: "小麦低聚肽", amount: "1500mg", effect: "高F值·护肝核心" },
      { name: "葛根提取物", amount: "300mg", effect: "解酒醒神" },
      { name: "枳椇子提取物", amount: "200mg", effect: "草本养护" },
      { name: "低聚异麦芽糖", amount: "适量", effect: "改善口感" },
      { name: "赤藓糖醇", amount: "适量", effect: "0蔗糖代糖" },
    ],
    params: [
      { label: "F值", value: "≥45.3", highlight: true },
      { label: "肽纯度", value: "≥97%", highlight: true },
      { label: "剂型", value: "速溶颗粒" },
      { label: "净含量", value: "90g（3g×30袋）" },
      { label: "保质期", value: "24个月" },
    ],
    usage:
      "每日 1—2 袋，每次 1 袋，用 40—60℃ 温水约 150ml 冲调溶解后饮用；应酬前后或加班熬夜时尤为适宜。",
    ingredients:
      "小麦低聚肽、葛根提取物、枳椇子提取物、低聚异麦芽糖、赤藓糖醇。不添加蔗糖与人工色素。",
    reviews: [
      { user: "王**", rating: 5, text: "应酬党必备，喝完第二天清爽很多，颗粒好溶。", date: "2026-05-21", tag: "回购用户" },
      { user: "李**", rating: 5, text: "回购第三盒了，温水一冲就化，口感淡淡的。", date: "2026-05-09", tag: "回购用户" },
      { user: "陈**", rating: 4, text: "效果因人而异，但配料表干净，给家里人买的。", date: "2026-04-28" },
    ],
  },
  {
    id: "p3",
    name: "珀珀肝宁® 高F值小麦低聚肽口服液",
    badge: "128人付款",
    summary: "开盖即饮，液态直吸，出差携带方便",
    spec: "规格 10ml/支 × 10支",
    tags: ["液态直吸", "高F值肽", "开盖即饮"],
    price: 199,
    originalPrice: 259,
    image: "/images/product_oral.png",
    categoryId: "liver",
    theme: "#1a6896",
    sales: "860+",
    repurchase: "61%",
    features: [
      { icon: "💧", title: "液态直吸", desc: "无需冲泡" },
      { icon: "✈️", title: "独立装", desc: "出差便携" },
      { icon: "🌾", title: "高F值肽", desc: "F值≥45.3" },
    ],
    suitable: ["出差频繁人群", "怕麻烦的上班族", "需要快速补给人群"],
    steps: [
      "撕开外包装取出 1 支。",
      "开盖直接饮用，无需冲泡。",
      "建议餐后服用，每日 1 支。",
      "开封后请尽快饮用完毕。",
    ],
    certs: ["SC食品生产许可", "第三方检测报告", "GMP车间生产"],
    ingredientTable: [
      { name: "小麦低聚肽", amount: "2000mg", effect: "F值≥45.3" },
      { name: "葛根提取物", amount: "300mg", effect: "草本护肝" },
      { name: "柠檬酸", amount: "适量", effect: "调节风味" },
      { name: "甜菊糖苷", amount: "适量", effect: "天然代糖" },
    ],
    params: [
      { label: "F值", value: "≥45.3", highlight: true },
      { label: "肽含量", value: "2000mg/支", highlight: true },
      { label: "剂型", value: "口服液" },
      { label: "规格", value: "10ml/支 × 10支" },
      { label: "保质期", value: "18个月" },
    ],
    usage: "每日 1 支，开盖直接饮用，无需冲泡；建议餐后服用，开封后请尽快饮用完毕。",
    ingredients: "小麦低聚肽（F值≥45.3）、水、葛根提取物、柠檬酸、甜菊糖苷。",
    reviews: [
      { user: "赵**", rating: 5, text: "出差带着方便，一支一支独立装，卫生。", date: "2026-05-30", tag: "回购用户" },
      { user: "孙**", rating: 4, text: "味道能接受，比冲剂更省事。", date: "2026-05-12" },
    ],
  },
  {
    id: "p1",
    name: "小麦低聚肽原料",
    badge: "企业专供",
    summary: "面向企业客户的高纯度低聚肽原料，支持定制",
    spec: "规格 25kg/袋，可定制",
    tags: ["F值≥45.3", "肽纯度≥97%", "12项专利"],
    price: 0,
    image: "/images/product_powder.png",
    categoryId: "food",
    theme: "#b8924b",
    sales: "企业客户",
    repurchase: "稳定供货",
    features: [
      { icon: "🔬", title: "高纯度", desc: "纯度≥97%" },
      { icon: "📜", title: "12项专利", desc: "工艺护航" },
      { icon: "🤝", title: "支持定制", desc: "配方/规格" },
    ],
    suitable: ["食品生产企业", "保健品生产企业", "代工与配方客户"],
    steps: [
      "提交需求与配方意向。",
      "按客户配方与工艺要求添加。",
      "提供检测报告与技术支持。",
      "签订供货协议，稳定批次交付。",
    ],
    certs: ["SC食品生产许可", "ISO22000体系", "批次检测报告", "12项发明专利"],
    ingredientTable: [
      { name: "小麦低聚肽", amount: "≥97%", effect: "高纯度原料" },
      { name: "F值", amount: "≥45.3", effect: "高F值指标" },
    ],
    params: [
      { label: "肽纯度", value: "≥97%", highlight: true },
      { label: "F值", value: "≥45.3", highlight: true },
      { label: "专利", value: "12项" },
      { label: "规格", value: "25kg/袋，可定制" },
      { label: "供货", value: "稳定批次" },
    ],
    usage:
      "面向食品、保健品生产企业供应，按客户配方与工艺要求添加；提供检测报告与技术支持。",
    ingredients: "小麦低聚肽（纯度≥97%，F值≥45.3），无添加。",
    reviews: [
      { user: "某食品企业", rating: 5, text: "批次稳定，指标达标，配合定制需求。", date: "2026-03-20", tag: "企业客户" },
    ],
  },
];

export const FEATURE_CARDS: FeatureCard[] = [
  { id: "fc2", title: "护肝专区", subtitle: "多维守护·肝净身轻", cta: "进入专区", image: "/images/product_granule.png", href: "/products?cat=liver" },
  { id: "fc4", title: "会员权益", subtitle: "专享礼遇·健康相伴", cta: "立即查看", image: "/images/vip_card.png", href: "/profile" },
];

export const TRUST_BADGES: TrustBadge[] = [
  { title: "正品保障", sub: "品牌直供 假一赔十", icon: "🛡️" },
  { title: "科研支持", sub: "专业科研 科学验证", icon: "🔬" },
  { title: "严选原料", sub: "全球优选 安全可追溯", icon: "🌿" },
  { title: "无忧售后", sub: "7天无理由 贴心服务", icon: "🎧" },
];

export const HERO = {
  image: "/images/hero_banner.png",
  chip: "高F值低聚肽 · 科学护肝",
  title: "一肽当先",
  subtitle: "肝安人安 · 肽养身心",
  cta: "探索健康之道",
  href: "/products",
};

/** 品牌标识 */
export const BRAND = {
  name: "一肽当先",
  sub: "科技肽能·健康守护每一刻",
  seal: ["一肽", "当先"] as const,
};

/** 首页 hero 下方科学数据条 */
export const HOME_STATS: Stat[] = [
  { value: "12+", label: "专利技术" },
  { value: "5K+", label: "用户选择" },
  { value: "97%", label: "好评率" },
  { value: "15Y", label: "研发经验" },
];

/** 首页科学护肝 banner */
export const SCIENCE_BANNER = {
  chip: "肽科技 · 生命力",
  title: "科学配比 · 激活健康因子",
  sub: "小麦谷朊粉酶解 · F值≥45.3 · 精准护肝",
  cta: "了解更多",
  href: "/tech",
  stats: [
    { value: "45.3", label: "F值" },
    { value: "97%", label: "纯度" },
    { value: "200Da", label: "分子量" },
  ] as Stat[],
};

/** 首页快捷导航（链到内容展示页） */
export const QUICK_NAV: QuickNavItem[] = [
  { label: "健康评测", href: "/health-assessment", icon: "🩺", bg: "#e0f0ea", color: "#1d4d3a" },
  { label: "护肝知识", href: "/knowledge", icon: "📖", bg: "#fdf6e7", color: "#b8924b" },
  { label: "产品功能", href: "/functions", icon: "✨", bg: "#e8efe7", color: "#2f6a52" },
  { label: "企业简介", href: "/company", icon: "🏢", bg: "#f4ede0", color: "#8b6040" },
  { label: "首创技术", href: "/tech", icon: "🔬", bg: "#eaf3fb", color: "#1a6896" },
  { label: "爱心助农", href: "/charity", icon: "🌾", bg: "#fdecea", color: "#c0392b" },
];

/** VIP 权益 */
export const VIP_BENEFITS: VipBenefit[] = [
  { label: "肽产品", sub: "专享折扣", icon: "💧" },
  { label: "护肝产品", sub: "专属优惠", icon: "🛡️" },
  { label: "健康管理", sub: "专业指导", icon: "❤️" },
  { label: "专属折扣", sub: "会员价更优", icon: "％" },
  { label: "极速发货", sub: "优先发货", icon: "🚚" },
  { label: "售后无忧", sub: "专属客服", icon: "🎧" },
];

/** 结算支付方式 */
export const PAY_METHODS: PayMethod[] = [
  { key: "wechat", label: "微信支付", icon: "💚", color: "#07C160" },
  { key: "alipay", label: "支付宝", icon: "🅰️", color: "#1677FF" },
  { key: "bank", label: "银行卡", icon: "💳", color: "#FF6B35" },
];

/** 购物车搭配推荐 */
export const RECOMMEND = {
  id: "p3",
  name: "珀珀肝宁® 高F值小麦低聚肽口服液",
  detail: "开盖即饮·15分钟入血·高效修复",
  price: 199,
  originalPrice: 248,
  image: "/images/product_oral.png",
};

export const COUPONS = [
  { id: "new-user", value: "¥20", title: "新人健康礼", desc: "满 129 可用，结算页自动演示优惠" },
  { id: "liver-care", value: "9折", title: "护肝专区券", desc: "适用于护肝保健分类商品" },
  { id: "free-ship", value: "包邮", title: "满额包邮券", desc: "满 299 元免运费" },
] as const;

export const ORDER_PREVIEW = [
  { id: "om-260618", title: "肽润肝清® 护肝醒酒冲剂", status: "待发货", amount: "¥135" },
  { id: "om-260602", title: "小麦低聚肽原料", status: "已完成", amount: "企业询价" },
  { id: "om-260521", title: "珀珀肝宁® 高F值小麦低聚肽口服液", status: "待评价", amount: "¥199" },
] as const;

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getCategory(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/** 价格展示：0 表示企业专供（询价） */
export function formatPrice(price: number): string {
  return price > 0 ? `¥${price}` : "企业专供";
}

/** 由 reviews 计算平均分与 5/4/3 星占比，用于详情页评分摘要 */
export function ratingSummary(product: Product): {
  avg: string;
  count: number;
  bars: { star: number; pct: number }[];
} {
  const rs = product.reviews;
  const count = rs.length;
  const avg = count ? rs.reduce((s, r) => s + r.rating, 0) / count : 0;
  const bars = [5, 4, 3].map((star) => ({
    star,
    pct: count ? Math.round((rs.filter((r) => r.rating === star).length / count) * 100) : 0,
  }));
  return { avg: avg.toFixed(1), count, bars };
}
