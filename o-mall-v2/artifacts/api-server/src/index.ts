import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const SILICONFLOW_API_URL = "https://api.siliconflow.cn/v1/chat/completions";
const DEFAULT_PROMPTS = [
  "经常熬夜怎么选？",
  "应酬前后怎么吃？",
  "给父母送礼推荐什么？",
  "冲剂和口服液有什么区别？",
];

type ChatRole = "system" | "user" | "assistant";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface CatalogProduct {
  id: string;
  name: string;
  summary: string;
  price: number;
  suitable: string[];
}

app.use(express.json());

// CORS 支持（允许前端调用）
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value)) return null;
  const messages: ChatMessage[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    const role = item.role;
    const content = item.content;
    if ((role === "system" || role === "user" || role === "assistant") && typeof content === "string") {
      messages.push({ role, content });
    }
  }
  return messages.length ? messages : null;
}

function parseCatalog(value: unknown): CatalogProduct[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item): CatalogProduct | null => {
      if (!isRecord(item)) return null;
      const id = item.id;
      const name = item.name;
      if (typeof id !== "string" || typeof name !== "string") return null;
      return {
        id,
        name,
        summary: typeof item.summary === "string" ? item.summary : "",
        price: typeof item.price === "number" ? item.price : 0,
        suitable: toStringArray(item.suitable),
      };
    })
    .filter((item): item is CatalogProduct => Boolean(item));
}

function buildSystemPrompt(catalog: CatalogProduct[], productName?: string): string {
  const catalogText = catalog
    .map(
      (product) => `- ${product.id}: ${product.name}（${product.price > 0 ? `¥${product.price}` : "企业询价"}）
  ${product.summary}
  适用人群：${product.suitable.length ? product.suitable.join("、") : "通用"}`,
    )
    .join("\n\n");

  return `你是一肽当先的 AI 健康顾问，专注于护肝、肽产品咨询。

当前商品目录：
${catalogText}

${productName ? `当前正在查看：${productName}` : ""}

回答要求：
1. 基于用户问题，推荐 1-3 个最合适的商品
2. 简洁专业，控制在 150 字以内
3. 必须包含具体的使用建议
4. 结尾加上：健康建议仅供选品参考；肝病、用药、孕哺期或过敏史请先咨询医生。

回复格式示例：
推荐：[商品名称]（¥价格）
用法：[具体用法]
[安全提示]`;
}

function extractAnswer(value: unknown): string {
  if (!isRecord(value) || !Array.isArray(value.choices)) return "";
  const first = value.choices[0];
  if (!isRecord(first) || !isRecord(first.message)) return "";
  return typeof first.message.content === "string" ? first.message.content.trim() : "";
}

function jsonError(res: express.Response, status: number, code: string, message: string) {
  return res.status(status).json({ error: { code, message } });
}

function healthHandler(_req: express.Request, res: express.Response) {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}

app.get("/health", healthHandler);
app.get("/api/health", healthHandler);

// AI 聊天代理端点
app.post("/api/ai/chat", async (req, res) => {
  const apiKey = process.env.SILICONFLOW_API_KEY?.trim();
  if (!apiKey) {
    return jsonError(res, 503, "AI_PROXY_NOT_CONFIGURED", "AI proxy is not configured");
  }

  try {
    const body = req.body as unknown;
    if (!isRecord(body)) {
      return jsonError(res, 400, "INVALID_REQUEST", "Request body must be JSON");
    }

    const question = typeof body.question === "string" ? body.question.trim() : "";
    const productName = typeof body.productName === "string" ? body.productName : undefined;
    const catalog = parseCatalog(body.catalog);
    const directMessages = parseMessages(body.messages);
    const history = parseMessages(body.history) ?? [];
    const chatMessages = directMessages ?? [
      { role: "system", content: buildSystemPrompt(catalog, productName) },
      ...history.filter((message) => message.role !== "system").slice(-8),
    ];

    if (!directMessages && question && !chatMessages.some((message) => message.role === "user" && message.content === question)) {
      chatMessages.push({ role: "user", content: question });
    }

    if (!chatMessages.some((message) => message.role === "user")) {
      return jsonError(res, 400, "INVALID_REQUEST", "At least one user message is required");
    }

    const response = await fetch(SILICONFLOW_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-ai/DeepSeek-V4-Flash",
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 500,
        stream: false,
      }),
    });

    if (!response.ok) {
      console.error("SiliconFlow API error:", response.status);
      return jsonError(res, 502, "AI_UPSTREAM_ERROR", "AI service is temporarily unavailable");
    }

    const answer = extractAnswer(await response.json());
    if (!answer) {
      return jsonError(res, 502, "AI_EMPTY_RESPONSE", "AI service returned an empty response");
    }

    const productIds = catalog
      .filter((product) => answer.includes(product.name) || answer.includes(product.id))
      .map((product) => product.id)
      .slice(0, 3);

    res.json({
      answer,
      productIds,
      prompts: DEFAULT_PROMPTS,
      source: "proxy",
    });
  } catch (error) {
    console.error("AI chat error:", error);
    jsonError(res, 500, "INTERNAL_ERROR", "Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
