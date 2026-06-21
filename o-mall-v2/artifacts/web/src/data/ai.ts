import type { Product } from "../types";

export type AiRole = "user" | "assistant";

export interface AiMessageInput {
  role: AiRole;
  content: string;
}

export interface AiReply {
  answer: string;
  productIds: string[];
  prompts: string[];
  source: "proxy" | "local";
}

interface AskAiInput {
  question: string;
  products: Product[];
  history: AiMessageInput[];
  productName?: string;
}

const SAFETY_NOTE = "健康建议仅供选品参考；肝病、用药、孕哺期或过敏史请先咨询医生。";

const DEFAULT_PROMPTS = [
  "经常熬夜怎么选？",
  "应酬前后怎么吃？",
  "给父母送礼推荐什么？",
  "冲剂和口服液有什么区别？",
];

const SCENARIO_RULES = [
  {
    keys: ["应酬", "喝酒", "酒", "醒酒", "护肝", "熬夜", "肝"],
    productIds: ["p2", "p3"],
    intro: "如果重点是应酬、熬夜和日常护肝，优先看护肝冲剂和口服液。",
  },
  {
    keys: ["出差", "方便", "便携", "懒", "开盖", "口服液"],
    productIds: ["p3", "p2"],
    intro: "如果你更在意方便和携带，口服液比冲剂更省步骤。",
  },
  {
    keys: ["肠胃", "肠道", "消化", "益生菌", "吸收", "礼盒", "送礼", "父母", "长辈"],
    productIds: ["p2", "p3"],
    intro: "如果是长辈、送礼场景，护肝冲剂和口服液都是不错的选择。",
  },
  {
    keys: ["维生素", "营养", "胶囊", "日常", "全家", "补充"],
    productIds: ["p2", "p3"],
    intro: "如果是日常营养补充，可优先看护肝冲剂和口服液。",
  },
  {
    keys: ["美容", "蓝莓", "胶原", "精华", "肽饮", "年轻", "好喝"],
    productIds: ["p3", "p2"],
    intro: "如果想要低聚肽补给，可优先看开盖即饮的口服液。",
  },
  {
    keys: ["企业", "采购", "原料", "定制", "代工", "oem"],
    productIds: ["p1"],
    intro: "如果是企业采购或配方定制，应走原料询价和技术支持流程。",
  },
] as const;

function uniq<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

function compactProduct(product: Product) {
  return {
    id: product.id,
    name: product.name,
    summary: product.summary,
    spec: product.spec,
    price: product.price,
    tags: product.tags,
    suitable: product.suitable,
    usage: product.usage,
  };
}

function scoreProduct(product: Product, question: string): number {
  const haystack = normalize(
    [
      product.name,
      product.summary,
      product.spec,
      product.usage,
      product.ingredients,
      product.categoryId,
      ...product.tags,
      ...product.suitable,
      ...product.features.map((feature) => `${feature.title}${feature.desc}`),
    ].join(" "),
  );
  const tokens = uniq(question.split(/[\s,，。.!！?？、；;：:]+/).map(normalize).filter(Boolean));
  return tokens.reduce((score, token) => score + (haystack.includes(token) ? 2 : 0), 0);
}

function findScenario(question: string) {
  const normalized = normalize(question);
  return SCENARIO_RULES.find((rule) => rule.keys.some((key) => normalized.includes(key)));
}

function pickProducts(question: string, products: Product[], productName?: string): Product[] {
  const byId = new Map(products.map((product) => [product.id, product]));
  const scenario = findScenario(question);
  const scenarioProducts = scenario?.productIds.map((id) => byId.get(id)).filter(Boolean) as Product[] | undefined;
  const current = productName ? products.find((product) => product.name === productName) : undefined;
  const scored = products
    .map((product) => ({ product, score: scoreProduct(product, question) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);

  return uniq([current, ...(scenarioProducts ?? []), ...scored, ...products.slice(0, 2)].filter(Boolean) as Product[]).slice(0, 3);
}

function productLabel(product: Product): string {
  const price = product.price > 0 ? `¥${product.price}` : "企业询价";
  return `${product.name}（${price}）`;
}

function buildLocalReply({ question, products, productName }: AskAiInput): AiReply {
  const scenario = findScenario(question);
  const picks = pickProducts(question, products, productName);
  const lead = scenario?.intro ?? "我先按你的问题，从商品用途、食用方式和购买场景三个角度给你建议。";
  const productText = picks.slice(0, 2).map(productLabel).join("；");
  const primary = picks[0];
  const usageHint = primary
    ? `${primary.steps[0] ?? primary.usage} ${primary.steps[1] ?? ""}`.trim()
    : "先明确你的场景，再按商品详情页的食用方法使用。";

  return {
    source: "local",
    productIds: picks.map((product) => product.id),
    prompts: DEFAULT_PROMPTS,
    answer: `${lead}\n\n推荐：${productText}。\n\n用法：${usageHint}\n\n${SAFETY_NOTE}`,
  };
}

function normalizeProxyReply(data: unknown, products: Product[]): AiReply | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  const answer = typeof record.answer === "string" ? record.answer : typeof record.text === "string" ? record.text : "";
  if (!answer.trim()) return null;
  const validIds = new Set(products.map((product) => product.id));
  const productIds = Array.isArray(record.productIds)
    ? record.productIds.filter((id): id is string => typeof id === "string" && validIds.has(id)).slice(0, 3)
    : [];
  const prompts = Array.isArray(record.prompts)
    ? record.prompts.filter((prompt): prompt is string => typeof prompt === "string").slice(0, 4)
    : DEFAULT_PROMPTS;

  return {
    answer,
    productIds,
    prompts: prompts.length ? prompts : DEFAULT_PROMPTS,
    source: "proxy",
  };
}

async function askProxy(input: AskAiInput): Promise<AiReply | null> {
  const endpoint = import.meta.env.VITE_AI_PROXY_URL?.trim();
  const apiUrl = endpoint || (import.meta.env.DEV ? "/api/ai/chat" : "");
  if (!apiUrl) return null;

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        question: input.question,
        productName: input.productName,
        history: input.history.slice(-8),
        catalog: input.products.map(compactProduct),
      }),
    });

    if (!response.ok) {
      return null;
    }

    return normalizeProxyReply(await response.json(), input.products);
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

export async function askOmallAi(input: AskAiInput): Promise<AiReply> {
  const proxyReply = await askProxy(input);
  return proxyReply ?? buildLocalReply(input);
}

export { DEFAULT_PROMPTS };
