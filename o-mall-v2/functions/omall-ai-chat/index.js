const http = require("node:http");

const SILICONFLOW_API_URL = "https://api.siliconflow.cn/v1/chat/completions";
const DEFAULT_PROMPTS = [
  "经常熬夜怎么选？",
  "应酬前后怎么吃？",
  "给父母送礼推荐什么？",
  "冲剂和口服液有什么区别？",
];

function toJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        req.destroy();
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function stringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function messages(value) {
  if (!Array.isArray(value)) return null;
  const parsed = value
    .filter((item) => item && typeof item === "object")
    .filter((item) => ["system", "user", "assistant"].includes(item.role) && typeof item.content === "string")
    .map((item) => ({ role: item.role, content: item.content }));
  return parsed.length ? parsed : null;
}

function catalog(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => item && typeof item === "object" && typeof item.id === "string" && typeof item.name === "string")
    .map((item) => ({
      id: item.id,
      name: item.name,
      summary: typeof item.summary === "string" ? item.summary : "",
      price: typeof item.price === "number" ? item.price : 0,
      suitable: stringArray(item.suitable),
    }));
}

function systemPrompt(items, productName) {
  const catalogText = items
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
4. 结尾加上：健康建议仅供选品参考；肝病、用药、孕哺期或过敏史请先咨询医生。`;
}

function answerFrom(value) {
  return value?.choices?.[0]?.message?.content?.trim() || "";
}

async function handleChat(req, res) {
  if (req.method === "OPTIONS") {
    toJson(res, 200, { ok: true });
    return;
  }
  if (req.method !== "POST") {
    toJson(res, 405, { error: { code: "METHOD_NOT_ALLOWED", message: "Only POST is supported" } });
    return;
  }

  const apiKey = process.env.SILICONFLOW_API_KEY?.trim();
  if (!apiKey) {
    toJson(res, 503, { error: { code: "AI_PROXY_NOT_CONFIGURED", message: "AI proxy is not configured" } });
    return;
  }

  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    toJson(res, 400, { error: { code: "INVALID_REQUEST", message: "Request body must be JSON" } });
    return;
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  const items = catalog(body.catalog);
  const directMessages = messages(body.messages);
  const history = messages(body.history) || [];
  const chatMessages =
    directMessages ||
    [
      { role: "system", content: systemPrompt(items, typeof body.productName === "string" ? body.productName : undefined) },
      ...history.filter((message) => message.role !== "system").slice(-8),
    ];

  if (!directMessages && question && !chatMessages.some((message) => message.role === "user" && message.content === question)) {
    chatMessages.push({ role: "user", content: question });
  }

  if (!chatMessages.some((message) => message.role === "user")) {
    toJson(res, 400, { error: { code: "INVALID_REQUEST", message: "At least one user message is required" } });
    return;
  }

  const upstream = await fetch(SILICONFLOW_API_URL, {
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

  if (!upstream.ok) {
    console.error("SiliconFlow API error:", upstream.status);
    toJson(res, 502, { error: { code: "AI_UPSTREAM_ERROR", message: "AI service is temporarily unavailable" } });
    return;
  }

  const answer = answerFrom(await upstream.json());
  if (!answer) {
    toJson(res, 502, { error: { code: "AI_EMPTY_RESPONSE", message: "AI service returned an empty response" } });
    return;
  }

  const productIds = items
    .filter((product) => answer.includes(product.name) || answer.includes(product.id))
    .map((product) => product.id)
    .slice(0, 3);

  toJson(res, 200, { answer, productIds, prompts: DEFAULT_PROMPTS, source: "proxy" });
}

const server = http.createServer((req, res) => {
  handleChat(req, res).catch((error) => {
    console.error("AI chat error:", error);
    toJson(res, 500, { error: { code: "INTERNAL_ERROR", message: "Internal server error" } });
  });
});

server.listen(9000, "0.0.0.0", () => {
  console.log("omall-ai-chat listening on 9000");
});
