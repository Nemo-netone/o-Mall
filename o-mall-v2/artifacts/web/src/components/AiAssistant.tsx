import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { DEFAULT_PROMPTS, askOmallAi, type AiReply } from "../data/ai";
import { formatPrice } from "../data/catalog";
import { useCart } from "../state/cart";
import { useCatalog } from "../state/catalog";
import { useShopUi } from "../state/shop-ui";
import type { Product } from "../types";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  productIds?: string[];
  source?: AiReply["source"];
}

interface AiAssistantProps {
  productName?: string;
}

function suggestedOpening(productName?: string): ChatMessage {
  return {
    id: 1,
    role: "assistant",
    content: productName
      ? `我正在看「${productName}」。你可以问适用人群、怎么吃、和哪些商品搭配。`
      : "我是 O-Mall AI 健康顾问。你可以问我商品怎么选、护肝场景怎么搭配、结算前买哪款更合适。",
  };
}

export function AiAssistant({ productName }: AiAssistantProps) {
  const { products } = useCatalog();
  const { add } = useCart();
  const { closeSheet, showToast } = useShopUi();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [suggestedOpening(productName)]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState(DEFAULT_PROMPTS);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const recommendedProducts = useMemo(() => {
    const latest = [...messages].reverse().find((message) => message.role === "assistant" && message.productIds?.length);
    const ids = latest?.productIds ?? [];
    return ids
      .map((id) => products.find((product) => product.id === id))
      .filter((product): product is Product => Boolean(product));
  }, [messages, products]);

  useEffect(() => {
    const box = scrollRef.current;
    if (!box) return;
    const latest = messages[messages.length - 1];
    const frame = window.requestAnimationFrame(() => {
      if (latest?.role === "assistant" && !loading) {
        const messageNodes = box.querySelectorAll<HTMLElement>(".ai-msg");
        const lastMessage = messageNodes[messageNodes.length - 1];
        if (lastMessage) {
          box.scrollTo({ top: Math.max(0, lastMessage.offsetTop - box.offsetTop - 4), behavior: "smooth" });
          return;
        }
      }
      box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [messages, loading]);

  const ask = async (question: string) => {
    const next = question.trim();
    if (!next || loading) return;
    const userMessage: ChatMessage = { id: Date.now(), role: "user", content: next };
    const history = [...messages, userMessage].map((message) => ({
      role: message.role,
      content: message.content,
    }));

    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setLoading(true);
    const reply = await askOmallAi({ question: next, products, history, productName });
    setPrompts(reply.prompts);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: reply.answer,
        productIds: reply.productIds,
        source: reply.source,
      },
    ]);
    setLoading(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(text);
  };

  return (
    <div className="ai-assistant">
      <div className="ai-context-card">
        <span className="ai-context-orb" aria-hidden="true">
          AI
        </span>
        <div>
          <b>智能选品与健康问答</b>
          <span>基于当前商品库回答；未配置代理时使用本地规则兜底。</span>
        </div>
      </div>

      <div className="ai-chat" ref={scrollRef}>
        {messages.map((message) => (
          <div key={message.id} className={`ai-msg ${message.role}`}>
            {message.content.split("\n").map((line, index) => (
              <p key={`${message.id}-${index}`}>{line}</p>
            ))}
            {message.source && (
              <span className="ai-source">{message.source === "proxy" ? "AI 代理回答" : "本地商品库回答"}</span>
            )}
          </div>
        ))}
        {loading && (
          <div className="ai-msg assistant ai-typing">
            <span /> <span /> <span />
          </div>
        )}
      </div>

      {recommendedProducts.length > 0 && (
        <div className="ai-recos">
          <div className="ai-recos-title">推荐商品</div>
          <div className="ai-reco-list" aria-label="AI 推荐商品列表">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="ai-reco-card">
                <img src={product.image} alt={product.name} />
                <div className="ai-reco-main">
                  <b>{product.name}</b>
                  <span>{product.summary}</span>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
                <div className="ai-reco-actions">
                  <Link href={`/product/${product.id}`} className="mini-btn ai-light-btn" onClick={closeSheet}>
                    详情
                  </Link>
                  {product.price > 0 && (
                    <button
                      className="mini-btn"
                      onClick={() => {
                        add(product);
                        showToast(`${product.name} 已加入购物车`);
                      }}
                    >
                      加购
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="ai-prompts">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => void ask(prompt)} disabled={loading}>
            {prompt}
          </button>
        ))}
      </div>

      <form className="ai-form" onSubmit={submit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="例如：经常应酬，选冲剂还是口服液？"
          aria-label="输入问题"
        />
        <button type="submit" disabled={loading || !text.trim()}>
          发送
        </button>
      </form>
    </div>
  );
}
