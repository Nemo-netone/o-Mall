// O-Mall 前端领域类型（静态 MVP 阶段，数据来自本地 catalog，不依赖 API）

export interface Review {
  user: string;
  rating: number; // 1-5
  text: string;
  date: string;
  tag?: string; // 如 "回购用户" / "新客"
}

/** 商品三大特性（详情页特性行，图标用 emoji） */
export interface ProductFeature {
  icon: string;
  title: string;
  desc: string;
}

/** 配方成分表一行 */
export interface IngredientRow {
  name: string;
  amount: string;
  effect: string;
}

/** 产品参数一行；highlight 为核心指标，详情页高亮显示 */
export interface ProductParam {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface Product {
  id: string;
  name: string;
  badge?: string;
  /** 一句话卖点 */
  summary: string;
  /** 规格，如 净含量/规格 */
  spec: string;
  tags: string[];
  /** 价格；0 表示企业专供/询价 */
  price: number;
  originalPrice?: number;
  /** public 下的图片路径，如 /images/product_granule.png */
  image: string;
  categoryId: string;
  /** 商品主题色（hex），详情页据此着色 */
  theme: string;
  /** 销量文案，如 "1,230+" */
  sales?: string;
  /** 复购率文案，如 "68%" */
  repurchase?: string;
  /** 详情页：三大特性 */
  features: ProductFeature[];
  /** 详情页·使用说明：适用人群 */
  suitable: string[];
  /** 详情页·使用说明：食用方法步骤 */
  steps: string[];
  /** 详情页·使用说明：资质认证 */
  certs: string[];
  /** 详情页·配方成分：成分表 */
  ingredientTable: IngredientRow[];
  /** 详情页·配方成分：产品参数 */
  params: ProductParam[];
  /** 兼容旧字段：纯文本使用说明 */
  usage: string;
  /** 兼容旧字段：纯文本配方成分 */
  ingredients: string;
  /** 用户评价 */
  reviews: Review[];
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  href: string;
}

export interface TrustBadge {
  title: string;
  sub: string;
  icon: string;
}

/** 首页科学数据条 / 科学 banner 的单项统计 */
export interface Stat {
  value: string;
  label: string;
}

/** 首页快捷导航项（链到内容展示页） */
export interface QuickNavItem {
  label: string;
  href: string;
  icon: string;
  /** 圆形图标底色 */
  bg: string;
  /** 图标色 */
  color: string;
}

/** VIP 权益项 */
export interface VipBenefit {
  label: string;
  sub: string;
  icon: string;
}

/** 购物车行：商品 + 数量 + 是否勾选 */
export interface CartLine {
  product: Product;
  qty: number;
  selected: boolean;
}

/** 支付方式 */
export interface PayMethod {
  key: string;
  label: string;
  icon: string;
  color: string;
}
