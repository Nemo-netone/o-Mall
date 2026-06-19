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
    id: "p4",
    name: "肽源精萃® 小麦低聚肽精华饮",
    badge: "新品",
    summary: "每日一瓶，内调底层营养",
    spec: "规格 30ml/瓶 × 8瓶",
    tags: ["小分子肽", "0蔗糖", "果味顺口"],
    price: 168,
    originalPrice: 198,
    image: "/images/product_essence.png",
    categoryId: "peptide",
    theme: "#6a4c93",
    sales: "420+",
    repurchase: "55%",
    features: [
      { icon: "🫐", title: "蓝莓果味", desc: "顺口好喝" },
      { icon: "✨", title: "小分子肽", desc: "易吸收" },
      { icon: "🍃", title: "0蔗糖", desc: "无负担" },
    ],
    suitable: ["注重日常保养人群", "追求口感的年轻群体", "需要长期内调人群"],
    steps: [
      "取 1 瓶摇匀。",
      "常温或冰镇后饮用风味更佳。",
      "每日 1 瓶，建议固定时段。",
      "可作为日常营养补充长期服用。",
    ],
    certs: ["SC食品生产许可", "第三方检测报告"],
    ingredientTable: [
      { name: "小麦低聚肽", amount: "1200mg", effect: "底层营养" },
      { name: "胶原蛋白肽", amount: "800mg", effect: "弹润支持" },
      { name: "蓝莓浓缩汁", amount: "适量", effect: "花青素·风味" },
      { name: "维生素C", amount: "60mg", effect: "抗氧化" },
      { name: "烟酰胺", amount: "适量", effect: "亮泽支持" },
    ],
    params: [
      { label: "肽含量", value: "2000mg/瓶", highlight: true },
      { label: "蔗糖", value: "0添加", highlight: true },
      { label: "剂型", value: "精华饮" },
      { label: "规格", value: "30ml/瓶 × 8瓶" },
      { label: "保质期", value: "12个月" },
    ],
    usage: "每日 1 瓶，常温或冰镇后饮用风味更佳；可作为日常营养补充长期服用。",
    ingredients: "小麦低聚肽、胶原蛋白肽、蓝莓浓缩汁、维生素C、烟酰胺。",
    reviews: [
      { user: "周**", rating: 5, text: "果味的，比想象好喝，坚持喝看看。", date: "2026-06-02", tag: "新客" },
      { user: "吴**", rating: 5, text: "新品尝鲜，包装很精致，送礼也合适。", date: "2026-05-18" },
    ],
  },
  {
    id: "p5",
    name: "元气肽® 多维营养胶囊",
    summary: "一粒多维，日常营养随身补",
    spec: "规格 0.5g/粒 × 60粒",
    tags: ["多维营养", "小粒易吞", "60天量"],
    price: 128,
    image: "/images/product_capsules.png",
    categoryId: "nutrition",
    theme: "#2f6a52",
    sales: "1,580+",
    repurchase: "72%",
    features: [
      { icon: "💊", title: "小粒易吞", desc: "0.5g/粒" },
      { icon: "🗓️", title: "60天量", desc: "随身补给" },
      { icon: "🧬", title: "多维配方", desc: "A/C/E/B族" },
    ],
    suitable: ["三餐不规律人群", "需要日常营养补充的全家人", "外食偏多人群"],
    steps: [
      "每日 2 粒。",
      "温水送服，建议随餐服用。",
      "请按推荐量食用，不超过推荐量。",
    ],
    certs: ["SC食品生产许可", "保健食品备案", "第三方检测报告"],
    ingredientTable: [
      { name: "小麦低聚肽", amount: "500mg", effect: "营养基底" },
      { name: "复合维生素", amount: "适量", effect: "A/C/E/B族" },
      { name: "锌", amount: "5mg", effect: "免疫支持" },
      { name: "硒", amount: "适量", effect: "抗氧化" },
      { name: "牛磺酸", amount: "适量", effect: "活力支持" },
    ],
    params: [
      { label: "维生素种类", value: "11种", highlight: true },
      { label: "每瓶用量", value: "60天", highlight: true },
      { label: "剂型", value: "胶囊" },
      { label: "规格", value: "0.5g/粒 × 60粒" },
      { label: "保质期", value: "24个月" },
    ],
    usage: "每日 2 粒，温水送服，建议随餐服用；请按推荐量食用，不超过推荐量。",
    ingredients: "小麦低聚肽、复合维生素（A/C/E/B族）、锌、硒、牛磺酸。",
    reviews: [
      { user: "郑**", rating: 4, text: "胶囊不大好吞咽，性价比可以。", date: "2026-05-25" },
      { user: "冯**", rating: 5, text: "全家都在吃的日常补充，方便。", date: "2026-04-30", tag: "回购用户" },
    ],
  },
  {
    id: "p6",
    name: "肽配膳道® 益生菌固体饮料礼盒",
    badge: "礼盒",
    summary: "改善肠道微生态·助力营养吸收",
    spec: "礼盒装 2g/袋 × 30袋",
    tags: ["益生菌", "益生元", "肠道养护"],
    price: 138,
    originalPrice: 168,
    image: "/images/gift_box.png",
    categoryId: "gift",
    theme: "#c0392b",
    sales: "640+",
    repurchase: "59%",
    features: [
      { icon: "🦠", title: "复合益生菌", desc: "双歧+乳酸菌" },
      { icon: "🌾", title: "益生元", desc: "助菌定植" },
      { icon: "🎁", title: "礼盒装", desc: "送礼有面" },
    ],
    suitable: ["肠胃敏感人群", "营养吸收欠佳人群", "送长辈礼品场景"],
    steps: [
      "取 1 袋，用不超过 40℃ 温水或常温水冲调。",
      "避免高温破坏活性菌。",
      "建议早晨空腹饮用，每日 1 袋。",
    ],
    certs: ["SC食品生产许可", "进口菌株溯源", "第三方检测报告"],
    ingredientTable: [
      { name: "复合益生菌", amount: "100亿CFU", effect: "双歧+乳酸菌" },
      { name: "低聚果糖", amount: "适量", effect: "益生元" },
      { name: "抗性糊精", amount: "适量", effect: "膳食纤维" },
      { name: "小麦低聚肽", amount: "300mg", effect: "营养协同" },
    ],
    params: [
      { label: "活菌数", value: "100亿CFU/袋", highlight: true },
      { label: "菌株", value: "进口复合", highlight: true },
      { label: "剂型", value: "固体饮料" },
      { label: "规格", value: "2g/袋 × 30袋" },
      { label: "保质期", value: "18个月" },
    ],
    usage:
      "每日 1 袋，用不超过 40℃ 的温水或常温水冲调，避免高温破坏活性菌；建议早晨空腹饮用。",
    ingredients:
      "进口复合益生菌（含双歧杆菌、乳酸菌）、低聚果糖、抗性糊精、小麦低聚肽。",
    reviews: [
      { user: "钱**", rating: 5, text: "送长辈的礼盒，很有面子，包装精美。", date: "2026-06-05" },
      { user: "卫**", rating: 5, text: "肠胃舒服了不少，温水冲注意不能太烫。", date: "2026-05-15", tag: "回购用户" },
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
  { id: "fc1", title: "肽产品专区", subtitle: "科技肽能·精准滋养", cta: "进入专区", image: "/images/product_essence.png", href: "/products?cat=peptide" },
  { id: "fc2", title: "护肝专区", subtitle: "多维守护·肝净身轻", cta: "进入专区", image: "/images/product_granule.png", href: "/products?cat=liver" },
  { id: "fc3", title: "营养调理", subtitle: "均衡营养·内调外养", cta: "进入专区", image: "/images/product_capsules.png", href: "/products?cat=nutrition" },
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
  title: "国泰民安",
  subtitle: "肝安人安 · 肽养身心",
  cta: "探索健康之道",
  href: "/products",
};

/** 品牌标识 */
export const BRAND = {
  name: "国肽民安·肽护中华",
  sub: "科技肽能·健康守护每一刻",
  seal: ["国泰", "民安"] as const,
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
  id: "p6",
  name: "肽配膳道® 益生菌",
  detail: "改善肠道微生态·助力营养吸收",
  price: 138,
  originalPrice: 168,
  image: "/images/gift_box.png",
};

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
